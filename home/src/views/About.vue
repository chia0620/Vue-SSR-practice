<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import useStore from '../store/index'
import { computed } from 'vue'
import { useHead } from '@vueuse/head'

export default {
  name: 'About',
  setup () {
    useHead({
      // Can be static or computed
      title: 'about.vue',
      meta: [
        {
          name: 'og:title',
          content: 'about'
        }
      ]
    })
    const store = useStore()

    const fetchData = computed(() => store.state.fetchData)

    // if (!fetchData.value) {
    //   store.dispatch('fetchInitialData')
    // }

    return {
      fetchData
    }
  },
  async serverPrefetch () {
    // await this.$store.dispatch('fetchInitialData')
  }
}
</script>
