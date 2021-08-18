<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- {{fetchData}} -->
  </div>
</template>

<script>
import useStore from '../store/index'
import HelloWorld from '@/components/HelloWorld.vue'
import { computed } from 'vue'
import { useHead } from '@vueuse/head'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup () {
    const store = useStore()

    const fetchData = computed(() => store.state.fetchData)

    if (!fetchData.value) {
      store.dispatch('fetchInitialData')
    }

    useHead({
      // Can be static or computed
      title: fetchData.value.per_page,
      meta: [
        {
          name: 'og:title',
          content: 'home'
        }
      ]
    })
    return {
      fetchData
    }
  },
  async serverPrefetch () {
    await this.$store.dispatch('fetchInitialData')
  }
}
</script>
