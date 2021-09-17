const path = require('path')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const getTimeStamp = () => {
  const month = `0${new Date().getMonth() + 1}`.slice(-2)
  const date = `0${new Date().getDate()}`.slice(-2)
  const hour = `0${new Date().getHours()}`.slice(-2)
  const min = `0${new Date().getMinutes()}`.slice(-2)

  return `${month}${date} ${hour}${min}`
}

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  // to support older browser (only support ES5)
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

    webpackConfig.plugin('limit').use(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    )
    webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }))

    webpackConfig.optimization.splitChunks(false).minimize(false)

    if (process.env.NODE_ENV === 'production') {
      // webpackConfig.module
      //   .rule('images')
      //   .use('image-webpack-loader')
      //   .loader('image-webpack-loader')
      //   .options({
      //     mozjpeg: { progressive: true, quality: 65 },
      //     optipng: { enabled: false },
      //     pngquant: { quality: [0.65, 0.9], speed: 4 },
      //     gifsicle: { interlaced: false },
      //     webp: { quality: 75 }
      //   })

      webpackConfig.plugins.delete('hmr')
      webpackConfig.plugins.delete('preload')
      webpackConfig.plugins.delete('prefetch')
      webpackConfig.plugins.delete('progress')
      webpackConfig.plugins.delete('friendly-errors')
    }

    const svgRule = webpackConfig.module.rule('svg')
    svgRule.uses.clear()
    svgRule.exclude.add(/node_modules/)
    svgRule.test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })

    const imagesRule = webpackConfig.module.rule('images')
    imagesRule.exclude.add(resolve('src/assets/ico'))
    webpackConfig.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    webpackConfig
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_TITLE : `${process.env.VUE_APP_TITLE} v.${getTimeStamp()}`
        return args
      })
    // console.log(webpackConfig.toConfig())
  }
}
