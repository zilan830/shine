<template>
  <!-- <h-layout>
    <hx-header slot="header" :left-options="{showBack}">
      {{tabColumn.selectedLabelDefault}}
    </hx-header>
    <transition slot="content" :name="`vux-pop-${style}`">
          <keep-alive>
              <router-view class="router-view"></router-view>
          </keep-alive>
    </transition>
      <hx-tarbar slot="footer" :tab-column="tabColumn"></hx-tarbar>
  </h-layout> -->
  <!-- <div class="hx-layout-container">
        <div class="hx-layout-header">
            <hx-header :left-options="{showBack}">
              {{tabColumn.selectedLabelDefault}}
            </hx-header>
        </div>
        <main class="hx-layout-content">
            <transition :name="`vux-pop-${style}`">
              <keep-alive>
                <router-view class="router-view"></router-view>
              </keep-alive>
            </transition>
        </main>
        <div class="hx-layout-footer">
            <hx-tarbar :tab-column="tabColumn"></hx-tarbar>
        </div>
    </div> -->
    <div class="wrapperContainer">
        <hx-header v-if="headerName !== '首页'" :left-options="{showBack}">
          {{headerName}}
        </hx-header>
        <main class="content">
            <transition :name="`vux-pop-${style}`">
                <keep-alive>
                    <router-view class="router-view" style="padding-bottom: 60px"/>
                </keep-alive>
            </transition>
        </main>
        <footer class="footerContainer">
            <hx-tarbar :tab-column="tabColumn"></hx-tarbar>
        </footer>
    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';
import _ from 'lodash';
import Menus from '../assets/common/menus';
// import HLayout from '../components/layout.vue';

export default {
  name: 'index',
  components: {
    // HLayout,
  },
  data() {
    return {
      tabColumn: _.cloneDeep(Menus.tabColumn),
      headerName: '',
      showBack: false,
      menu: _.cloneDeep(Menus.menuList),
    };
  },
  // 刷新问题可暂不考虑，因为手机中不会出现，但是后期可以加上
  computed: {
    ...mapState({
      style: state => state.route.style,
    }),
  },
  watch: {
    $route(to, from) {
      this.transitionStyle({
        fromIndex: from.meta.index,
        toIndex: to.meta.index,
      });
      // debugger;
      this.changeHeaderName(to.meta.index);
    },
  },
  mounted() {
    this.changeHeaderName(this.$route.meta.index);
  },
  methods: {
    ...mapActions(['transitionStyle']),
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
        }
        if (item.children && item.children.length) {
          stack = stack.concat(item.children);
        }
      }
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  overflow: hidden;
  will-change: transform;
  transition: all 300ms;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  overflow: hidden;
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  overflow: hidden;
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  overflow: hidden;
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  overflow: hidden;
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.router-view {
  height: 100%;
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

.wrapperContainer{
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  //固定内容框
  .content {
    flex: 1;
    overflow: auto;
  }
}

.router-view {
  width: 100%;
  //top: 46px;
}
</style>
