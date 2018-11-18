<template>
  <div class="mine">
    <div class="brief-container">
        <div class="avatar-container">头像</div>
        <p class="name">{{name}}</p>
        <!-- <p class="position">移动组-组员</p> -->
    </div>
    <div class="operate-container">
      <cube-button :primary="true" @click="handleLogin">登 出</cube-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'mine',
  data() {
    return {
      name: '',
      department: '',
      position: '',
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    handleLogin() {
      this.signOut({ router: this.$router });
    },
    getUserInfo() {
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      this.name = userInfo.userName;
    },
    ...mapActions(['signOut']),
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@require '~cube-ui/src/common/stylus/variable.styl';
@require '../../theme.styl';

.mine {
  display: flex;
  flex-direction: column;

  .brief-container {
    background-color: $color-orange;
    height: 250px;
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .avatar-container {
      width: 100px;
      height: 100px;
      background-color: $color-grey;
      border-radius: 100%
      line-height: 100px
    }
  }

  .operate-container {
    padding: 15px 15px 30px;
    flex-direction: column-reverse;
    flex: 1;
    display: flex;
    margin-top: 10vh;
  }
}
</style>
