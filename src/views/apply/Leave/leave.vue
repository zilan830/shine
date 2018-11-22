<template>
    <div class="leave">
        <cube-tab-bar v-model="selectedLabel"
                    show-slider
                    :use-transition="disabled"
                    ref="tabNav"
                    :data="tabLabels">
      </cube-tab-bar>
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="initialIndex"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <!-- 待处理 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
                <div class="list-wrapper">
                    <div v-if="dataList.pend.length > 0">
                    <hx-cell
                    v-for="(item,index) in dataList.pend"
                    :option="item.option"
                    v-on="{ click:() => handleItemClick(item.id,item.dataId,item.formViewId,item.nodeName,item.all)}"
                    :key="index"></hx-cell>
                    </div>
                    <div v-if="dataList.pend.length > 0" class="empty-tips">数据已全部加载</div>
                    <div v-if="dataList.pend.length === 0" class="empty-tips">暂无数据</div>
                </div>
            </cube-scroll>
          </cube-slide-item>
          <!-- 已处理 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
                <div class="list-wrapper">
                    <div v-if="dataList.finished.length > 0">
                    <hx-cell
                    v-for="(item,index) in dataList.finished"
                    :option="item.option"
                    v-on="{ click:() => handleItemClick(
                      item.id,
                      item.dataId,
                      item.formViewId,
                      item.nodeName)}"
                    :key="index"></hx-cell>
                    </div>
                    <div v-if="dataList.finished.length > 0" class="empty-tips">数据已全部加载</div>
                    <div v-if="dataList.finished.length === 0" class="empty-tips">暂无数据</div>
                </div>
            </cube-scroll>
          </cube-slide-item>
          <!-- 已办结 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
                <div class="list-wrapper">
                    <div v-if="dataList.end.length > 0">
                    <hx-cell
                    v-for="(item,index) in dataList.end"
                    :option="item.option"
                    v-on="{ click:() => handleItemClick(item.id,item.dataId,item.formViewId,item.nodeName)}"
                    :key="index"></hx-cell>
                    </div>
                    <div v-if="dataList.end.length > 0" class="empty-tips">数据已全部加载</div>
                    <div v-if="dataList.end.length === 0" class="empty-tips">暂无数据</div>
                </div>
            </cube-scroll>
          </cube-slide-item>

          <!-- 已撤销 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
                <div class="list-wrapper">
                    <div v-if="dataList.cancel.length > 0">
                    <hx-cell
                    v-for="(item,index) in dataList.cancel"
                    :option="item.option"
                    v-on="{ click:() => handleItemClick(item.id,item.dataId,item.formViewId,item.nodeName)}"
                    :key="index"></hx-cell>
                    </div>
                    <div v-if="dataList.cancel.length > 0" class="empty-tips">数据已全部加载</div>
                    <div v-if="dataList.cancel.length === 0" class="empty-tips">暂无数据</div>
                </div>
            </cube-scroll>
          </cube-slide-item>

          <!-- 已终止 -->
          <cube-slide-item>
            <cube-scroll :options="scrollOptions">
                <div class="list-wrapper">
                    <div v-if="dataList.stop.length > 0">
                    <hx-cell
                    v-for="(item,index) in dataList.stop"
                    :option="item.option"
                    v-on="
                    { click:() =>
                    this.handleItemClick(
                      item.id,
                      item.dataId,
                      item.formViewId,
                      item.nodeName,
                      item.flowSummary)}"
                    :key="index"></hx-cell>
                    </div>
                    <div v-if="dataList.stop.length > 0" class="empty-tips">数据已全部加载</div>
                    <div v-if="dataList.stop.length === 0" class="empty-tips">暂无数据</div>
                </div>
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
      </div>
        <i v-if="hasOperate" @click="handleCreate()" class="icon-add iconfont addButton"></i>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { findIndex } from "../../../assets/methods/helpers/util.js";

export default {
  name: "leave",
  data() {
    return {
      selectedLabel: "待处理",
      disabled: false,
      tabLabels: [
        {
          label: "待处理"
        },
        {
          label: "已处理"
        },
        {
          label: "已办结"
        },
        {
          label: "已撤销"
        },
        {
          label: "已中止"
        }
      ],
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        /* lock y-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      scrollOptions: {
        /* lock x-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      dataList: {
        pend: [],
        finished: [],
        end: [],
        cancel: [],
        stop: []
      },
      isFirst: true
    };
  },
  mounted() {
    if (this.$route.query.type) {
      const { type } = this.$route.query;
      this.selectedLabel = type;
    }
    this.$nextTick(() => {
      
      // 获取启动权限
      this.getOperate();
      // 获取请假数据
      this.getLeavePendData();
      this.getLeaveFinishedData();
      this.getLeaveEndData();
      this.getLeaveCancelData();
      this.getLeaveStopData();
    })
  },
  methods: {
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label;
    },
    scroll(pos) {
      const x = Math.abs(pos.x);
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth;
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth;
      const deltaX = (x / slideScrollerWidth) * tabItemWidth;
      this.$refs.tabNav.setSliderTransform(deltaX);
    },
    handleItemClick(id, dataId, formViewId, nodeName, all) {
      console.log(
        "id",
        id,
        "dataId",
        dataId,
        "formViewId",
        formViewId,
        "all",
        all
      );
      let type = 6;
      // type:{0:创建||开始,1:上级主管审批,2:分管总监审批,3:总经理审批,4:打回修改,5:人事告知销假,6:查看}
      switch (nodeName) {
        case "开始":
          type = 0;
          break;
        case "上级主管审批":
          type = 1;
          break;
        case "分管总监审批":
          type = 2;
          break;
        case "总经理审批":
          type = 3;
          break;
        case "打回修改":
          type = 4;
          break;
        case "人事告知销假":
          type = 5;
          break;
        default:
          break;
      }
      this.$router.push({
        path: "/leaveform",
        query: {
          formViewId,
          dataId,
          id,
          type,
          all
        }
      });
    },
    handleCreate() {
      // type:{0:创建,1:上级主管审批,2:分管总监审批,3:总经理审批,4:销假,5:查看}
      this.$router.push({ path: "/leaveform", query: { type: 0 } });
    },
    ...mapActions([
      "getOperate",
      "getLeavePendData",
      "getLeaveFinishedData",
      "getLeaveEndData",
      "getLeaveCancelData",
      "getLeaveStopData"
    ])
  },
  computed: {
    initialIndex() {
      let index = 0;
      index = findIndex(
        this.tabLabels,
        item => item.label === this.selectedLabel
      );
      return index;
    },
    ...mapState({
      hasOperate: state => state.apis.hasOperate,
      leavePendingData: state => state.apis.leavePendingData,
      leaveFinishedData: state => state.apis.leaveFinishedData,
      leaveEndData: state => state.apis.leaveEndData,
      leaveCancelData: state => state.apis.leaveCancelData,
      leaveStoppedData: state => state.apis.leaveStoppedData
    })
  },
  watch: {
    // 待处理
    leavePendingData(val = []) {
        const pend = val.map(item => {
          const obj = {};
          obj.nodeName = item.nodeName;
          obj.flowSummary = item.flowSummary;
          obj.dataId = item.dataId;
          obj.id = item.id;
          obj.formViewId = item.formViewId;
          obj.all = item;
          obj.option = {
            name: item.flowSummary,
            value: "",
            arrowIcon: "iconfont icon-input"
          };
          return obj;
        });
        this.dataList.pend = pend;
    },
    // 已处理
    leaveFinishedData(val = []) {
        const finished = val.map(item => {
          const obj = {};
          obj.nodeName = "查看";
          obj.flowSummary = item.flowSummary;
          obj.dataId = item.dataId;
          obj.id = item.id;
          obj.formViewId = item.formViewId;
          obj.option = {
            name: item.flowSummary,
            value: "",
            arrowIcon: "left"
          };
          return obj;
        });
        this.dataList.finished = finished;
    },
    // 已办结
    leaveEndData(val = []) {
        const end = val.map(item => {
          const obj = {};
          obj.nodeName = "查看";
          obj.flowSummary = item.flowSummary;
          obj.dataId = item.dataId;
          obj.id = item.id;
          obj.formViewId = item.formViewId;
          obj.option = {
            name: item.flowSummary,
            value: "",
            arrowIcon: "left"
          };
          return obj;
        });
        this.dataList.end = end;
    },
    // 已撤销
    leaveCancelData(val = []) {
        const cancel = val.map(item => {
          const obj = {};
          obj.nodeName = "查看";
          obj.flowSummary = item.flowSummary;
          obj.dataId = item.dataId;
          obj.id = item.id;
          obj.formViewId = item.formViewId;
          obj.option = {
            name: item.flowSummary,
            value: "",
            arrowIcon: "left"
          };
          return obj;
        });
        this.dataList.cancel = cancel;
    },
    // 已中止
    leaveStoppedData(val = []) {
        const stop = val.map(item => {
          const obj = {};
          obj.nodeName = "查看";
          obj.flowSummary = item.flowSummary;
          obj.dataId = item.dataId;
          obj.id = item.id;
          obj.formViewId = item.formViewId;
          obj.option = {
            name: item.flowSummary,
            value: "",
            arrowIcon: "left"
          };
          return obj;
        });
        this.dataList.stop = stop;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@require '~cube-ui/src/common/stylus/variable.styl';
@require '../../../theme.styl';

.leave {
  height: 100%;

  .addButton {
    z-index: 999;
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-size: 60px;
    background-color: white;
    border-radius: 100%;
  }
}

/* 覆盖样式 */
.leave {
  > .wrapper {
    > .content {
      margin: 0;
    }
  }
}

.leave {
  .cube-tab-bar {
    background-color: white;
  }

  .cube-tab, .cube-tab_active {
    color: black;
  }

  .cube-tab-bar-slider {
    background-color: black;
  }

  .tab-slide-container {
    position: fixed;
    top: 74px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .list-wrapper {
    overflow: hidden;
    padding: 15px;

    li {
      padding: 15px 10px;
      margin-top: 10px;
      text-align: left;
      background-color: white;
      font-size: 14px;
      color: #999;
      white-space: normal;

      .line-height {
        line-height: 1.5;
      }

      .is-black {
        color: black;
      }

      .is-grey {
        color: #999;
      }

      .is-bold {
        font-weight: bold;
      }

      .top {
        display: flex;

        .avatar {
          width: 15px;
          height: 15px;
          margin-right: 2px;
          border-radius: 100%;
        }

        .time {
          flex: 1;
        }
      }

      .middle {
        display: flex;
        margin: 10px 0;
        color: black;
      }

      .hot-title {
        display: flex;
        align-items: center;
        font-size: 12px;

        .hot-sequence {
          display: inline-block;
          margin-right: 2px;
          padding: 3px 6px;
          border-radius: 2px;
          background-color: darkgoldenrod;
          color: white;
        }
      }

      .hot-content {
        margin-top: 15px;
      }
    }
  }
}
</style>
