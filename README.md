# vue-ssr-practice

## Project setup
```
npm install
```

### Build server and client parts, start ssr server
```
npm run ssr
```
\*Note: The `pressr` script will create a SSR build before running `src/server.js`.
### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Reference
[vue3](https://v3.vuejs.org/)   
[vue3 SSR](https://v3.vuejs.org/guide/ssr/getting-started.html)   
[vueuse/head](https://github.com/vueuse/head)     
[shenron/vue3-example-ssr](https://github.com/shenron/vue3-example-ssr)   


### 流程
* `vue.config.js`: build檔案  
* `server.js`: server 端 run node 的檔案    
  * 使用`express` `entry-server.js` createApp 取得 app，  透過 `@vue/server-renderer` renderToString 渲染出 HTML，`@vueuse/head` renderHeadToString 渲染出相關 meta     
    ```
    const { renderToString } = require('@vue/server-renderer')
    const { renderHeadToString } = require('@vueuse/head')
    ```
  
    ```
    let appContent = await renderToString(app)
    const { headTags, htmlAttrs, bodyAttrs } = await renderHeadToString(head)
    ```
    
    ```
    appContent = `<div id="app">${renderState(store.state, '__INITIAL_STATE__')}${appContent}</div>`

    html = html.toString().replace('<div id="app"></div>', appContent)
    if (headTags) {
      html = html.replace(/<title>.*?<\/title>/, headTags)
    }
    ```
  
  
  * server 端同時執行 vue 檔案內的 serverPrefetch，取得後全局暴露至 `window.__INITIAL_STATE__`
    ```
    async serverPrefetch () {
      await this.$store.dispatch('fetchInitialData')
    }
    ```

* `entry-client.js`: 將 server 端資料合併至 client 端後createApp
  ```
  if (window.__INITIAL_STATE__) {
    _store.replaceState(window.__INITIAL_STATE__)
  }
  ```