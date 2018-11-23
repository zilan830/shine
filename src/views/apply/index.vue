<template>
  <div class="apply">
    <ul class="apply-container">
      <li class="apply-item" v-for="(item,index) in dataList" :key="index">
        <div class="apply-icon" @click="item.events">
          <i :class="`iconfont ${item.icon}`"></i>
          <p>{{item.title}}</p>
        </div>
        <div class="apply-hot-key">
          <p @click="createEvents">创建</p>
          <p @click="item.dealEvents">待处理
            <span>{{leavePendingData}}</span>
            </p>
          <p @click="item.endEvents">已完结
             <span>{{leaveEndData}}</span>
             </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "apply",
  data() {
    return {
      dealNum: 0,
      endNum: 0,
      dataList: [
        {
          id: "1",
          icon: "icon-leave",
          title: "请 假",
          dealNum: 11,
          endNum: 10,
          events: () => this.handleApply("1", "待处理"),
          dealEvents: () => this.handleApply("1", "待处理"),
          endEvents: () => this.handleApply("1", "已办结")
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 获取请假数据
      this.getLeavePendData();
      this.getLeaveEndData();
    });
  },
  methods: {
    handleApply(index, type) {
      // 路由参数
      this.$router.push({ path: "/leave", query: { type } });
    },
    createEvents() {
      this.$router.push({ path: "/leaveform", query: { type: 0 } });
    },
    ...mapActions(["getLeavePendData", "getLeaveEndData",])
  },
  computed: {
    ...mapState({
      leavePendingData: state => {
        return state.apis.leavePendingData.length
        },
      leaveEndData: state => {
       return state.apis.leaveEndData.length
        }
    })
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@require '~cube-ui/src/common/stylus/variable.styl';
@require '../../theme.styl';

.apply {
  .apply-container {
    display: flex;
    flex-direction: column;
    padding: 10px;

    .apply-item {
      display: flex;
      background-color: white;
      height: 50px;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid teal;
      border-radius: 3px;

      .apply-icon {
        width: 80px;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        background-color: white;
        flex-direction: column;
        align-items: center;

        &:active {
          transition: all 0.3s;
          background-color: $color-light-grey-opacity;
        }

        >i {
          color: teal;
          font-size: 50px;
        }
      }

      .apply-hot-key {
        flex: 1;
        display: flex;

        >p {
          border-left: 1px solid teal;
          flex: 1;
          background-color: white;
          height: 100%;
          line-height: 50px;
          text-align: center;
          position: relative;

          &:active {
            transition: all 0.3s;
            background-color: $color-light-grey-opacity;
          }

          >span {
            position: absolute;
            right: 1px;
            top: -4px;
            display: block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: red;
            color: white;
            line-height: 23px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
