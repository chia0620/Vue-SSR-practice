import { createApp } from './main'

export default ctx => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(ctx.url)
    router.onReady(() => {
      // const machedComponents = router.getMatchedComponents()
      // if (!machedComponents.length) {
      //   return reject(new Error({ code: 404 }))
      // }
      // Promise.all(machedComponents.map(component => {
      //   if (component.asyncData) {
      //     return component.asyncData({
      //       store,
      //       route: router.currentRoute
      //     })
      //   }
      // })).then(() => {
      //   ctx.state = store.state
      //   resolve(app)
      // }).catch(reject)

      ctx.rendered = () => {
        // After the app is rendered, our store is now
        // filled with the state from our components.
        // When we attach the state to the context, and the `template` option
        // is used for the renderer, the state will automatically be
        // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
        ctx.state = store.state
      }
      resolve(app)
    }, reject)
  })
}
