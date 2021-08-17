import { createSSRApp, createApp, h } from 'vue'
import App from './App.vue'
import createRouter from './router/index'
import { createMetaManager } from 'vue-meta'

import * as store from './store/index'

export default function (args) {
  const rootComponent = {
    render: () => h(App),
    components: { App },
    setup () {
      store.provideStore(args.store)
    }
  }

  const isServer = typeof window === 'undefined'

  const app = (isServer ? createSSRApp : createApp)(rootComponent)

  const router = createRouter()

  const metaManager = createMetaManager()

  app.use(metaManager)
  // app.use(vueMetaPlugin)
  app.use(router)
  app.use(args.store)

  return {
    app,
    router,
    store,
    metaManager
  }
}
