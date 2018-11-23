<template>
  <div class="home">
    <div class="header-container">
        <!-- <div class="left-container">
            <div class="img-container">
                头像
            </div>
        </div> -->
        <div class="right-container">
            <p>{{name}}</p>
            <h1 v-if="!hasTask">你好，今天暂未有事项需要处理哦</h1>
            <h1 v-if="hasTask">你好，今天有待办事项需要你处理哦</h1>
            <!-- <p>{{`${department}-${position}`}}</p> -->
        </div>
    </div>
    <div class="item-container">
        <div class="item-header">
            <div class="item">
                <span class="reatangle"></span>
                <span class="item-text">应用</span>
            </div>
            <div class="item" @click="handleMore(1)">
                <i class="iconfont icon-more"></i>
                <span class="item-text">更多</span>
            </div>
        </div>
        <ul class="apply-container">
            <li class="apply-item" @click="handleApply('/leave')">
                <i class="iconfont icon-leave"></i>
                <p class="apply-name">请 假</p>
            </li>
        </ul>
    </div>
    <div class="item-container">
        <div class="item-header">
            <div class="item">
                <span class="reatangle"></span>
                <span class="item-text">消息</span>
            </div>
            <div class="item" @click="handleMore(2)">
                <i class="iconfont icon-news"></i>
                <span class="item-text">更多</span>
            </div>
        </div>
        <div class="news-container" v-if="newsList.length > 0">
            <hx-cell
            v-for="(item,index) in newsList"
            :key="index"
            :option="item.option"
            v-on="{click:()=>handleItemClick(item.type)}"></hx-cell>
        </div>
        <div v-if="newsList.length === 0" class="empty-tips">暂无消息</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      avatar: 'avatar',
      name: '',
      department: '移动平台',
      position: '组员',
      hasTask:false
    };
  },
  mounted() {
    this.getUserInfo();
    this.getNews();
  },
  methods: {
    handleApply(router) {
      this.$router.push({ path: "/leave", query: { type:"待处理" } });
    },
    getUserInfo() {
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      this.name = userInfo.userName;
    },
    handleItemClick(type) {
      this.$router.push({ path: '/leave', query: { type: type === 'flow' ? '待处理' : '已办结' } });
    },
    handleMore(index) {
      switch (index) {
        case 1:
          this.$router.push('/apply');
          break;
        case 2:
          this.$router.push('/news');
          break;
        default:
          break;
      }
    },
    ...mapActions(['getNews']),
  },
  computed: {
    ...mapState({
      newsList: (state) => {
        const { news } = state.apis;
        let dataLists = [];
        if (news.length > 0) {
          dataLists = news.map((item, index) => {
            const obj = {};
            obj.option = {
              name: item.title,
              value: '',
              arrowIcon: 'left',
            };
            obj.type = item.type;
            return obj;
          });
        }
        return dataLists;
      },
    }),
  },
  watch:{
      newsList(val){
          if(val.length === 0){
              this.hasTask = false;
          }else{
              for(const item of val){
                   if(item.type === 'flow'){
                      this.hasTask = true;
                      break;
                  }
              }
          }
      }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@require '~cube-ui/src/common/stylus/variable.styl';
@require '../../theme.styl';

.home {
    display: flex;
    flex-direction: column;
    background-color: $background-color;

    .header-container {
        display: flex;
        height: 100px;
        background-color: teal;

        .left-container {
            width: 100px;
            display: flex;
            justify-content: center;
            align-self: center;

            .img-container {
                width: 60px;
                height: 60px;
                background-color: $color-grey;
                color: white;
                line-height: 60px;
                text-align: center;
                border-radius: 50%;
            }
        }

        .right-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            color: white;
            padding: 10px;
        }
    }

    .item-container {
        margin-top: 10px;
        background-color: white;

        .item-header {
            height: 30px;
            padding: 0 10px;
            border-bottom: 1px solid $color-light-grey-opacity;
            display: flex;
            justify-content: space-between;
            font-size: 14px;

            .item {
                flex: 1;
                display: flex;
                line-height: 30px;
                align-items: center;

                &:last-child {
                    flex-direction: row-reverse;
                }

                .reatangle {
                    width: 5px;
                    height: 16px;
                    background-color: teal;
                }

                .item-text {
                    margin: 0 5px;
                }
            }
        }

        .apply-container {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 10px;

            .apply-item {
                height: auto;
                width: 25%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                border-radius: 5px;

                >i {
                    font-size: 40px;
                    color: teal;
                }

                &:active {
                    transition: all 0.3s;
                    background-color: $color-light-grey-opacity;
                }

                .apply-name {
                    font-size: 14px;
                    letter-spacing: 10px;
                }
            }
        }
    }
}
</style>
