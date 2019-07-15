<template>
  <div id="app">
    <div v-if="processing">
      <BlockUI :message="'Processando la petición...'"></BlockUI>
    </div>
    <Navegation v-if="isLogged"></Navegation>
    <main class="container">
      <!-- Content here -->
      <router-view/>
    </main>
  </div>
</template>

<script>
  import 'bootstrap';
  import globalTypes from '@/types/global'
  import authTypes from '@/types/auth'
  import {mapGetters} from 'vuex'
  import Navegation from '@/components/Navegation.vue';
  export default {
    name: "Home",
    components: {
      Navegation
    },
    computed: {
      ...mapGetters({
        processing: globalTypes.getters.processing,
        isLogged: authTypes.getters.logged
      })
    }
  }
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '@/assets/scss/style.scss';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*margin-top: 60px;*/
  }
</style>
