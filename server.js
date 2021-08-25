const path = require('path')
const express = require('express')
const fs = require('fs')
const serialize = require('serialize-javascript')
const { renderToString } = require('@vue/server-renderer')
const manifest = require('./home/dist/server/home/ssr-manifest.json')
const { renderHeadToString } = require('@vueuse/head')

const server = express()
const port = process.env.PORT || 3000
console.log(port)

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

const appPath = path.join(__dirname, './home/dist', 'server', manifest['app.js'])
const createApp = require(appPath).default

server.use('/home/js', express.static(path.join(__dirname, './home/dist/client/home', 'js')))
server.use('/home/img', express.static(path.join(__dirname, './home/dist/client/home', 'img')))
server.use('/home/css', express.static(path.join(__dirname, './home/dist/client/home', 'css')))
server.get('/home*', async (req, res) => {
  console.log(req.url)

  const {
    app,
    router,
    store,
    head
  } = await createApp()

  router.push(req.url)

  await router.isReady()

  let appContent = await renderToString(app)
  const { headTags, htmlAttrs, bodyAttrs } = await renderHeadToString(head)

  fs.readFile(path.join(__dirname, '/home/dist/client/home/index.html'), (err, html) => {
    if (err) {
      throw err
    }

    appContent = `<div id="app">${renderState(store.state, '__INITIAL_STATE__')}${appContent}</div>`

    html = html.toString().replace('<div id="app"></div>', appContent)
    if (headTags) {
      html = html.replace(/<title>.*?<\/title>/, headTags)
    }
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
})

server.get('/work*', async (req, res) => {
  fs.readFile(path.join(__dirname, '/work/index.html'), (err, html) => {
    if (err) {
      throw err
    }

    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
})

console.log(`You can navigate to http://localhost:${port}`)

server.listen(port)
