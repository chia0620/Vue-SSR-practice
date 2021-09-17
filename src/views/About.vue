<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Icon name="logo" />
  </div>
</template>

<script>
// import useStore from '../store/index'
// import { computed } from 'vue'
import { useHead } from '@vueuse/head'

export default {
  name: 'About',
  props: {
    id: {
      type: String,
      default: () => ''
    }
  },
  setup () {
    // const store = useStore()

    // const fetchData = computed(() => store.state.fetchData)

    // if (!fetchData.value) {
    //   store.dispatch('fetchInitialData')
    // }

    useHead({
      // Can be static or computed
      title: 'fetchData.value.per_page',
      meta: [
        {
          name: 'og:title',
          content: 'about'
        }
      ]
    })

    return {
      // fetchData
    }
  },
  async serverPrefetch () {
    await this.$store.dispatch('readMetaData', {
      payload: {
        booth_url_id: this.id
      }
    })
  }
}
</script>
