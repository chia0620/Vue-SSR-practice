<template>
  <div class="home">
    <img alt="Vue logo" src="/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{initialData}}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  serverPrefetch  ({ store }) {
    // 触发 action 后，会返回 Promise
    return this.fetchItem()
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    initialData () {
      return this.$store.state.fetchData
    }
  },
  created () {
    if (this.$vnode && this.$vnode.ssrContext && this.initialData) {
      this.$ssrContext.title = 'About'
      this.$ssrContext.meta = '<meta data-n-head content="About Page" name="application-name">'
    }
  },
  methods: {
    async fetchItem () {
      // return the Promise from the action
      await this.$store.dispatch('fetchInitialData')
    }
  }
}
</script>
