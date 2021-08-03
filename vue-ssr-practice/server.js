const express = require('express')
const server = express()
const path = require('path')

const { createBundleRenderer } = require('vue-server-renderer')
const serverBundle = require('./.bundle/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: require('fs').readFileSync('./src/index.template.html', 'utf-8'),
  clientManifest
})

server.use('/js', express.static(path.join(__dirname, './dist/js')))
server.use('/css', express.static(path.join(__dirname, './dist/css')))
server.use('/assets', express.static(path.join(__dirname, './src/static/assets')))
server.use('/', express.static(path.join(__dirname, './dist')))
// server.use(express.static('static'))

server.get('*', (req, res) => {
  const ctx = {
    url: req.url
    // title: '123 Vue SSR Practice',
    // meta: '<meta data-n-head content="SSR Page" name="application-name">'
  }
  renderer.renderToString(ctx, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    };
    res.status(200)
    res.end(html)
  })
})

server.listen(8081, function () {
  console.log('Listening app at http://localhost:8081')
})
