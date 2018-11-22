<template>
  <div class="news">
    <div class="news-container" v-if="newsList.length > 0">
    <hx-cell
            v-for="(item,index) in newsList"
            :key="index"
            :option="item.option"
            v-on="{click:()=>handleItemClick(item.type)}"></hx-cell>
    </div>
    <div v-if="newsList.length === 0" class="empty-tips">暂无消息</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'news',
  created() {
    this.getNews();
  },
  data() {
    return {
      dataList: [
        {
          option: {
            iconLeft: 'icon-input',
            name: '您有几条信息',
            value: '',
            arrowIcon: 'left',
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions(['getNews']),
    handleItemClick(type) {
      this.$router.push({
        path: '/leave',
        query: { type: type === 'flow' ? '待处理' : '已办结' },
      });
    },
  },
  computed: {
    ...mapState({
      newsList: (state) => {
        const { news } = state.apis;
        let dataLists = [];
        if (news.length > 0) {
          dataLists = news.map((item) => {
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
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@require '~cube-ui/src/common/stylus/variable.styl';
@require '../../theme.styl';

.news {
  .news-container {
    padding: 15px;
  }
}
</style>
