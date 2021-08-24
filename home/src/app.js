import { createSSRApp, createApp, h } from 'vue'
import App from './App.vue'
import createRouter from './router'
import * as store from './store/index'
import { createHead } from '@vueuse/head'

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
  const head = createHead()

  app.use(router)
  app.use(head)
  app.use(args.store)

  return {
    app,
    head,
    router
  }
}
