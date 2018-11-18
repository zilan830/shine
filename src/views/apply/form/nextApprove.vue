<template>
    <div class="leave-form">
      <div class="form-container">
        <cube-form
            :model="model"
            :schema="schema"
            :immediate-validate="false"
            :options="options"
            @validate="validateHandler"
            @submit="submitHandler"></cube-form>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'next-approve',
  data() {
    return {
      data: {},
      validity: {},
      valid: undefined,
      model: {
        userName: '',
        nodeMask: '',
      },
      schema: {
        groups: [
          {
            legend: '下一步',
            fields: [
              {
                type: 'select',
                modelKey: 'userName',
                label: '下一步审批人',
                props: {
                  options: [],
                },
                rules: {
                  required: true,
                },
                messages: {
                  required: '请选择下一步审批人',
                },
              },
              {
                type: 'textarea',
                modelKey: 'nodeMask',
                label: '提交备注',
                props: {
                  placeholder: '请输入提交备注',
                },
                rules: {},
                debounce: 100,
              },
            ],
          },
          {
            fields: [
              {
                type: 'submit',
                label: '提交',
              },
            ],
          },
        ],
      },
      options: {
        scrollToInvalidField: true,
        layout: 'standard', // classic fresh
      },
      name: [],
      nameList: {},
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      const { id, type, all } = this.$route.query;
      if (type === 'draft') {
        const param = {
          'conditionMap.flowInstId': id,
          'conditionMap.complateType': type,
        };
        this.getNextInfo({ param });
      } else {
        const param = {
          'conditionMap.flowInstId': all.flowInstId,
          'conditionMap.complateType': type,
          'conditionMap.nodeId': id,
        };
        this.getNextInfo({ param });
      }
    },
    handleNameId() {
      let id = '';
      for (let i = 0; i < this.nameList.length; i += 1) {
        if (this.nameList[i].name === this.model.userName) {
          id = this.nameList[i].id;
        }
      }
      return id;
    },
    submitHandler(e) {
      e.preventDefault();
      const { type, all } = this.$route.query;
      const param = {};
      param['conditionMap.userIds'] = this.handleNameId();
      param['conditionMap.nodeMask'] = this.model.nodeMask;
      param['flowInst.id'] = this.data.flowInstId;
      delete this.data.actorUserId;
      delete this.data.actorUserName;
      delete this.data.allActorUsers;
      param.nextNode = JSON.stringify(this.data);
      if (type === 'draft') {
        param.instType = 'draft';
      } else {
        param.instType = 'pending';
        param.currentNode = JSON.stringify(all);
      }
      this.getNextSave({ param, router: this.$router });
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      console.log(
        'validity',
        result.validity,
        result.valid,
        result.dirty,
        result.firstInvalidFieldIndex,
      );
    },
    resetHandler(e) {
      console.log('reset', e);
    },
    getFormData() {
      const { formViewId, dataId } = this.$route.query;
      const obj = {
        'conditionMap.formViewId': formViewId,
        'conditionMap.dataId': dataId,
      };
      this.getLeaveFormData({ param: obj });
    },
    test(param) {
      console.log('1111');
      this.getNextSave({ param, router: this.$router });
    },
    ...mapActions(['getNextInfo', 'getNextSave']),
  },
  computed: {
    ...mapState({
      nextStepInfo: state => state.apis.nextStepInfo,
      nextSave: state => state.apis.nextSave,
    }),
  },
  watch: {
    nextStepInfo(val) {
      console.log('zhegelimleval', val);
      // if (val.nodeName === "结束") {
      //   const { type, all } = this.$route.query;
      //   console.log("jieshu")
      //   delete val.actorUserId;
      //   delete val.actorUserName;
      //   delete val.allActorUsers;
      //   const param = {
      //     "conditionMap.userIds": "",
      //     "conditionMap.nodeMask": "",
      //     "flowInst.id": val.flowInstId,
      //     currentNode : JSON.stringify(all),
      //     nextNode: JSON.stringify(val),
      //     instType: "pending"
      //   };
      //   this.getNextSave({ param, router: this.$router });
      //   //this.$store.dispatch('getNextSave',{param,router:this.$router})
      //   console.log("this.$store",this.$store)

      //   //this.test(param);

      //   // this.getNextSave({ param });
      // }
      this.data = val;
      this.name = val.nodeOperateUsers.map(item => item.userName);
      this.nameList = val.nodeOperateUsers.map(item => {
        const obj = {
          id: item.id,
          name: item.userName,
        };
        return obj;
      });
      this.model.userName = this.name[0];
      this.schema.groups[0].fields[0].props.options = this.name;
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@require '~cube-ui/src/common/stylus/variable.styl';
@require '../../../theme.styl';
</style>
