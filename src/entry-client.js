import * as store from './store/index'
import createApp from './app'

const _store = store._createStore()

const { app, router } = createApp({
  store: _store
});

(async (router, app) => {
  await router.isReady()

  if (window.__INITIAL_STATE__) {
    _store.replaceState(window.__INITIAL_STATE__)
  }

  delete window.__INITIAL_STATE__
  app.mount('#app', true)
})(router, app)
