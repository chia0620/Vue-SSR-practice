<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import { useMeta } from 'vue-meta'

export default {
  setup () {
    useMeta({
      title: 'this is about page'
    })

    return {
    }
  }
}
</script>
