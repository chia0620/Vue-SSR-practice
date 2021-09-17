import createApp from './app'
import * as store from './store/index'
import getSvgContent from '@/components/Icon.js'

export default function () {
  const _store = store._createStore()
  const svgContent = getSvgContent()

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
    store: _store,
    svgContent
  }
}
