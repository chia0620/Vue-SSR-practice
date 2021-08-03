<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  created () {
    if (this.$vnode && this.$vnode.ssrContext) {
      this.$ssrContext.title = 'About'
      this.$ssrContext.meta = '<meta data-n-head content="About Page" name="application-name">'
    }
  }
}
</script>
