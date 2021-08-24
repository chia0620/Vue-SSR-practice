const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const path = require('path');
module.exports = {
  publicPath: '/',
  outputDir: "/home/dist",
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  // to support older browser (only support ES5)
  configureWebpack: {
    resolve: { mainFields: ['main', 'module'] ,
  
    alias: {
      '@': path.join(__dirname, 'home/src')
    }}
  },
  chainWebpack: webpackConfig => {
    webpackConfig.module.rule('vue').uses.delete('cache-loader')
    webpackConfig.module.rule('js').uses.delete('cache-loader')
    webpackConfig.module.rule('ts').uses.delete('cache-loader')
    webpackConfig.module.rule('tsx').uses.delete('cache-loader')

    if (!process.env.SSR) {
      // This is required for repl.it to play nicely with the Dev Server
      webpackConfig.devServer.disableHostCheck(true)

      webpackConfig
        .entry('app')
        .clear()
        .add('./home/src/entry-client.js')
      return
    }

    webpackConfig
      .entry('app')
      .clear()
      .add('./home/src/entry-server.js')

    webpackConfig.target('node')
    webpackConfig.output.libraryTarget('commonjs2')

    webpackConfig
      .plugin('manifest')
      .use(new WebpackManifestPlugin({ fileName: 'ssr-manifest.json' }))

    webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }))

    webpackConfig.optimization.splitChunks(false).minimize(false)

    webpackConfig.plugins.delete('hmr')
    webpackConfig.plugins.delete('preload')
    webpackConfig.plugins.delete('prefetch')
    webpackConfig.plugins.delete('progress')
    webpackConfig.plugins.delete('friendly-errors')

    webpackConfig.plugin('limit').use(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    )

    // console.log(webpackConfig.toConfig())
  }
}
