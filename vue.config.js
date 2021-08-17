const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

module.exports = {
  transpileDependencies: [/^vue-meta*/],
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  configureWebpack: {
    resolve: { mainFields: ['main', 'module'] }
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
        .add('./src/entry-client.js')
      return
    }

    webpackConfig
      .entry('app')
      .clear()
      .add('./src/entry-server.js')

    webpackConfig.target('node')
    webpackConfig.output.libraryTarget('commonjs2')

    webpackConfig
      .plugin('manifest')
      .use(new WebpackManifestPlugin({ fileName: 'ssr-manifest.json' }))

    webpackConfig.externals(nodeExternals({
      allowlist: [
        /^vue-meta*/,
        /\.(css|sass|scss)$/,
        /\.(vue)$/,
        /\.(html)$/
      ]
    }))

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
