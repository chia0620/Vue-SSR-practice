# vue-ssr-practice

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start
```

### Compiles and minifies for production
```
npm run build:server
npm run build:client
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### devDependencies
nodemon
node.js 熱重啟

cross-env
用來透過指令跨平台設置環境變數
用法 cross-env WEBPACK_TARGET=node

webpack-merge
合併各自環境的 Webpack 配置檔，
達到在不造成結構混亂的前提下區分不同環境。

webpack-node-externals
伺服器支援套件


### Reference

[vue-cli-3-ssr-example](https://github.com/janumedia/vue-cli-3-ssr-example)