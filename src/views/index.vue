<template>
    <div class="wrapperContainer">
      <!-- <transition :name="`vux-pop-${style}`"> -->
        <hx-header
        v-if="headerName !== '首页'"
        @on-click-back="handlerBack()"
        :left-options="{showBack :isShowBack,preventGoBack:true}">
          {{headerName}}
        </hx-header>
      <!-- </transition> -->
        <main class="content">
            <transition :name="`fold-pop-${style}`">
                <router-view class="router-view"/>
            </transition>
        </main>
        <footer v-show="!isShowBack" class="footerContainer">
            <hx-tarbar :tab-column="tabColumn"></hx-tarbar>
        </footer>
    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';
import _ from 'lodash';
import Menus from '../assets/common/menus';

export default {
  name: 'index',
  data() {
    return {
      tabColumn: _.cloneDeep(Menus.tabColumn),
      headerName: '',
      menu: _.cloneDeep(Menus.menuList),
    };
  },
  // 刷新问题可暂不考虑，因为手机中不会出现，但是后期可以加上
  computed: {
    ...mapState({
      style: state => state.route.style,
    }),
    isShowBack() {
      const { index } = this.$route.meta;
      return index.toString().length > 2;
    },
  },
  watch: {
    $route(to, from) {
      this.transitionStyle({
        fromIndex: from.meta.index,
        toIndex: to.meta.index,
      });
      this.changeHeaderName(to.meta.index);
      // this.jumpLogin();
    },
  },
  mounted() {
    this.changeHeaderName(this.$route.meta.index);
    // this.jumpLogin();
  },
  methods: {
    ...mapActions(['transitionStyle']),
    handlerBack() {
      switch (this.$route.name) {
        case 'nextapprove':
          this.$router.push('/leave');
          break;
        case 'leave':
          this.$router.push('/apply');
          break;
        default:
          this.$router.back();
          break;
      }
    },
    changeHeaderName(index) {
      // 尾递归查找对应index并给名字
      let stack = [];
      this.menu.forEach((obj) => {
        stack.push(obj);
      });
      let item = {};
      while (stack.length) {
        item = stack.shift();
        if (item && item.index === index) {
          this.headerName = item.label;
          this.tabColumn.selectedLabelDefault = item.label;
        }
        if (item.children && item.children.length) {
          stack = stack.concat(item.children);
        }
      }
    },
    jumpLogin() {
      // 获取本地用户信息
      const loginUser = window.localStorage.getItem('userInfo');
      // 若没有 则跳转到登录页
      if (!loginUser) {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.fold-pop-out-enter-active,
.fold-pop-out-leave-active,
.fold-pop-in-enter-active,
.fold-pop-in-leave-active {
  overflow: hidden;
  will-change: transform;
  transition: all 300ms;
  // height: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.fold-pop-out-enter {
  overflow: hidden;
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.fold-pop-out-leave-active {
  overflow: hidden;
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.fold-pop-in-enter {
  overflow: hidden;
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.fold-pop-in-leave-active {
  overflow: hidden;
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.router-view {
  // height: 100%;
}

.hx-layout-container {
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: #f7f7f7;

  .hx-layout-content {
    flex: 1;
    overflow: hidden;
  }
}

.wrapperContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  // 固定内容框
  .content {
    flex: 1;
    overflow: auto;
    background-color: $background-color;
  }
}

.router-view {
  width: 100%;
  // top: 46px;
}
</style>
