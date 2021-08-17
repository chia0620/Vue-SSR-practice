require('core-js')
const path = require('path')
const express = require('express')
const fs = require('fs')
const serialize = require('serialize-javascript')
const { renderToString } = require('@vue/server-renderer')
const { renderMetaToString } = require('vue-meta/ssr')
const manifest = require('./dist/server/ssr-manifest.json')

const server = express()

const appPath = path.join(__dirname, './dist', 'server', manifest['app.js'])
const createApp = require(appPath).default

server.use('/img', express.static(path.join(__dirname, './dist/client', 'img')))
server.use('/js', express.static(path.join(__dirname, './dist/client', 'js')))
server.use('/css', express.static(path.join(__dirname, './dist/client', 'css')))
server.use(
  '/favicon.ico',
  express.static(path.join(__dirname, './dist/client', 'favicon.ico'))
)

const renderState = (store, windowKey) => {
  const state = serialize(store)
  const autoRemove =
        ';(function(){var s;(s=document.currentScript||document.scripts[document.scripts.length-1]).parentNode.removeChild(s);}());'
  const nonceAttr = store.nonce ? ' nonce="' + store.nonce + '"' : ''
  return store
    ? '<script' + nonceAttr + '>window.' + windowKey + '=' + state + autoRemove + '</script>'
    : ''
}

server.get('*', async (req, res) => {
  const {
    app,
    router,
    store
  } = await createApp()

  router.push(req.url)

  await router.isReady()

  // req.meta = meta

  const ctx = {}
  let appContent = await renderToString(app)
  await renderMetaToString(app, ctx)
  if (!ctx.teleports) {
    ctx.teleports = {}
  }
  fs.readFile(path.join(__dirname, '/dist/client/index.html'), (err, html) => {
    if (err) {
      throw err
    }

    appContent = `<div id="app">${renderState(store.state, '__INITIAL_STATE__')}${appContent}</div>`

    html = html.toString().replace('<div id="app"></div>', `${appContent}`)

    if (ctx.teleports.headAttrs) {
      // console.log(html)
      // html = html
      html = html.replace('<head>', `<head ${ctx.teleports.headAttrs}>`)
    }

    if (ctx.teleports.title) {
      // console.log(html)
      // html = html
      html = html.replace(/<title>.*?<\/title>/, `${ctx.teleports.title || '<title></title>'}`)
    }

    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  //   res.send(`
  // <html ${ctx.teleports.htmlAttrs || ''}>
  //   <head ${ctx.teleports.headAttrs || ''}>
  //    ${ctx.teleports.head || ''}
  //   </head>
  //   <body ${ctx.teleports.bodyAttrs || ''}>
  //     <div id="app">${renderState(store.state, '__INITIAL_STATE__')}${appContent}</div>
  //    ${ctx.teleports.body || ''}
  //   </body>
  // </html>`)
  })
  // appContent = `<div id="app">${renderState(store.state, '__INITIAL_STATE__')}${appContent}</div>`

  // res.setHeader('Content-Type', 'text/html')
  // res.send()
  // res.send(`
  // <html ${ctx.teleports.htmlAttrs || ''}>
  //   <head ${ctx.teleports.headAttrs || ''}>
  //    ${ctx.teleports.head || ''}
  //   </head>
  //   <body ${ctx.teleports.bodyAttrs || ''}>
  //     <div id="app">${appContent}</div>
  //    ${ctx.teleports.body || ''}
  //   </body>
  // </html>`)
})

console.log('You can navigate to http://localhost:8001')

server.listen(8001)
