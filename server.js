const path = require('path')
const express = require('express')
const fs = require('fs')
const serialize = require('serialize-javascript')
const { renderToString } = require('@vue/server-renderer')
const manifest = require('./dist/server/ssr-manifest.json')
const { renderHeadToString } = require('@vueuse/head')

const server = express()
const port = process.env.PORT || 3001
console.log(port)

const appPath = path.join(__dirname, './dist', 'server', manifest['app.js'])
const createApp = require(appPath).default

// get doc path
server.use('/img', express.static(path.join(__dirname, './dist/client', 'img')))
server.use('/js', express.static(path.join(__dirname, './dist/client', 'js')))
server.use('/css', express.static(path.join(__dirname, './dist/client', 'css')))
server.use(
  '/favicon.ico',
  express.static(path.join(__dirname, './dist/client', 'favicon.ico'))
)

// render server state to show in body
const renderState = (store, windowKey) => {
  const state = serialize(store)
  const autoRemove =
        ';(function(){var s;(s=document.currentScript||document.scripts[document.scripts.length-1]).parentNode.removeChild(s);}());'
  const nonceAttr = store.nonce ? ' nonce="' + store.nonce + '"' : ''
  return store
    ? '<script' +
        nonceAttr +
        '>window.' +
        windowKey +
        '=' +
        state +
        autoRemove +
        '</script>'
    : ''
}

// execute when server receive request from '*'
server.get('*', async (req, res) => {
  const {
    app,
    router,
    store,
    head,
    svgContent
  } = await createApp()

  router.push(req.url)

  await router.isReady()

  // render to html
  let appContent = await renderToString(app)
  // render to meta tags
  const { headTags } = await renderHeadToString(head)
  // const { headTags, htmlAttrs, bodyAttrs } = await renderHeadToString(head)

  fs.readFile(path.join(__dirname, '/dist/client/index.html'), (err, html) => {
    if (err) {
      throw err
    }
    // add svgContent tags into body
    appContent = `${svgContent}<div id="app">${renderState(store.state, '__INITIAL_STATE__')}${appContent}</div>`

    html = html.toString().replace('<div id="app"></div>', appContent)
    if (headTags) {
      html = html.replace(/<title>.*?<\/title>/, headTags)
    }
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
})

console.log(`You can navigate to http://localhost:${port}`)

server.listen(port)
