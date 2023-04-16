<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  created() {
    // this.$router.replace({
    //   "path": "/"
    // })
    this.$router.push({
      path:"/"
    })
  }
}
</script>

<style>
#app {
  overflow: hidden;
  position: absolute;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
