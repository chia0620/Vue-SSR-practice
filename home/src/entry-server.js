import createApp from './app'
import * as store from './store/index'

export default function () {
  const _store = store._createStore()

  const {
    router,
    head,
    app
  } = createApp({
    store: _store
  })

  return {
    app,
    router,
    head,
    store: _store
  }
}
