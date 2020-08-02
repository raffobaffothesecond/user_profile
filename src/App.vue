<template>
  <div id="app">

    <div class="navigation"
         v-if="$route.name !== 'All users'">
      <router-link to="/">
        <b-icon-arrow-left-circle class="back-icon" variant="secondary" font-scale="1.8"/>
      </router-link>
    </div>

    <router-view/>
  </div>
</template>

<script>

  import {BIconArrowLeftCircle} from 'bootstrap-vue'

  export default {
      name: "App.vue",
      components: {BIconArrowLeftCircle}
  }
</script>

<style lang="scss">
#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: $light;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  position: relative;
}

  .navigation {

    margin: 0;
    display: flex;
    position: sticky;
    top: 0;
    background-color: $light;
    z-index: 10;
    box-shadow: 0 0 10px rgba($dark,.1);

    .back-icon {
      margin: 10px;
    }
  }


</style>
