<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{fetchData}}
  </div>
</template>

<script>
// @ is an alias to /src
import useStore from '../store/index'
import HelloWorld from '@/components/HelloWorld.vue'
import { computed } from 'vue'
import { useMeta } from 'vue-meta'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup () {
    const store = useStore()

    const fetchData = computed(() => store.state.fetchData)

    useMeta({
      title: 'this is home page'
    })

    // const _fetch = async () => {
    //   console.log('fetching ...')

    //   const { data: res } = await axios.get('/users?page=2')

    //   store.commit('setUsers', res.data)
    // }

    if (!fetchData.value) {
      store.dispatch('fetchInitialData')
    }

    return {
      fetchData
    }
  },
  async serverPrefetch () {
    await this.$store.dispatch('fetchInitialData')
  }
}
</script>
