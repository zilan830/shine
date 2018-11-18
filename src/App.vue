<template>
  <div id="app">
    <div class="loading-container" v-show="isLoading">
      <cube-loading :size="40"></cube-loading>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      isLoading: state => state.apis.isLoading,
      errorMessage: state => state.apis.errorMessage,
    }),
  },
  watch: {
    errorMessage(val) {
      if (val.length > 0) {
        this.$createToast({
          type: 'warn',
          txt: val,
        }).show();
      }
    },
  },
};
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  color: #333;
  position: relative;

  .loading-container {
    z-index: 999;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    padding-top: 35vh;
  }
}
</style>
