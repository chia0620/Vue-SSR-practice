<template>
  <div id="nav">
    <router-link to="/">
      Home
    </router-link> |
    <router-link to="/about">
      About
    </router-link> |
    <a href="/work">work</a>
  </div>
  <router-view />
</template>

<script>
import { useHead } from '@vueuse/head'

export default {
  setup () {
    useHead({
      // Can be static or computed
      title: 'app.vue',
      meta: [
        {
          name: 'description',
          content: 'app description'
        }
      ]
    })
    return {
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
