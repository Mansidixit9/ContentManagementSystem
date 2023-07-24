<template>
  <NavBar/>
  <router-view></router-view>
</template>

<script>
// import CreateBlog from './components/CreateBlog.vue'
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
 background-color: rgb(223, 220, 216);
 padding-bottom: 50px;
  /* margin-top: 60px; */
}
</style>
