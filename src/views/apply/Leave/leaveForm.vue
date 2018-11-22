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
import HxDatePick from '../../../components/datePick.vue';

export default {
  name: 'leave-form',
  components: {
    HxDatePick,
  },
  data() {
    return {
      validity: {},
      valid: undefined,
      baseInfo: {
        // 请假信息
        // 姓名
        xm: '',
        // 所在部门
        bm: '',
        // 最高岗位
        zggw: '',
        // 假别
        jb: '',
        // 请假事由
        qjsy: '',
        // 请假日期起
        qjrqq: '',
        // 请假日期至
        qjrqz: '',
        // 请假总时间（时）
        qjzsj: '',
        // 请假日期
        rq: '',
      },
      approveInfo: {
        // 审批信息
        // 审批追加意见
        spzjyj: '',
        // 上级主管审批意见
        sjzgspyj: '',
        // 上级主管审批日期
        sjzgsprq: '',
        // 分管总监审批意见*
        bmjlspyj: '',
        // 分管总监审批日期*
        bmjlsprq: '',
        // 总经理审批意见*
        bmzjlspyj: '',
        // 总经理审批日期*
        bmzjlsprq: '',
      },
      saleInfo: {
        // 销假信息
        // 实际请假时间至
        sjqjsjz: '',
        // 实际请假总时间
        sjqjzsj: '',
        // 是否延期
        sfyq: '',
        // 销假时间
        xjsj: '',
        // 销假说明
        xjsm: '',
      },
      model: {},
      baseColumn: {
        legend: '请假信息',
        fields: [
          {
            type: 'input',
            modelKey: 'xm',
            label: '姓名',
            props: {
              disabled: true,
            },
            rules: {},
          },
          {
            type: 'select',
            modelKey: 'bm',
            label: '所在部门',
            props: {
              options: JSON.parse(window.localStorage.getItem('group')),
            },
            rules: {
              required: true,
            },
            messages: {
              required: '请选择部门',
            },
          },
          {
            type: 'select',
            modelKey: 'zggw',
            label: '最高岗位',
            props: {
              options: JSON.parse(window.localStorage.getItem('post')),
            },
            rules: {
              required: true,
            },
            messages: {
              required: '请选择岗位',
            },
          },
          {
            type: 'select',
            modelKey: 'jb',
            label: '假别',
            props: {
              options: JSON.parse(window.localStorage.getItem('leave')),
            },
            rules: {
              required: true,
            },
            messages: {
              required: '请选择假别',
            },
          },
          {
            type: 'textarea',
            modelKey: 'qjsy',
            label: '请假事由',
            props: {
              placeholder: '请填写请假事由',
            },
            rules: {
              required: true,
            },
            debounce: 100,
            messages: {
              required: '请填写请假事由',
            },
          },
          {
            component: HxDatePick,
            modelKey: 'qjrqq',
            label: '请假日期起',
            props: {},
            rules: {
              required: true,
            },
            messages: {
              required: '请选择请假日期起',
            },
          },
          {
            component: HxDatePick,
            modelKey: 'qjrqz',
            label: '请假日期至',
            props: {},
            rules: {
              required: true,
            },
            messages: {
              required: '请选择请假日期至',
            },
          },
          {
            type: 'input',
            modelKey: 'qjzsj',
            label: '请假总时间（时）',
            props: {
              type: 'number',
            },
            rules: {
              required: true,
            },
            messages: {
              required: '请输入请假总时间（时）',
            },
          },
          {
            component: HxDatePick,
            modelKey: 'rq',
            label: '请假日期',
            props: {},
            rules: {
              required: true,
            },
            messages: {
              required: '请选择请假日期',
            },
          },
        ],
      },

      approveColumn: {
        legend: '审批信息',
        fields: [
          // {
          //   type: "textarea",
          //   modelKey: "spzjyj",
          //   label: "审批追加意见",
          //   props: {
          //     placeholder: "请输入审批追加意见"
          //   },
          //   rules: {
          //     required: true
          //   },
          //   debounce: 100,
          //   messages: {
          //     required: "请输入审批追加意见"
          //   }
          // },
          {
            type: 'select',
            modelKey: 'sjzgspyj',
            label: '上级主管审批意见',
            props: {
              options: ['同意', '不同意'],
              placeholder: '请选择上级主管审批意见',
            },
            rules: {
              required: true,
            },
            debounce: 100,
            messages: {
              required: '请选择上级主管审批意见',
            },
          },
          {
            component: HxDatePick,
            modelKey: 'sjzgsprq',
            label: '上级主管审批日期',
            props: {},
            rules: {
              required: true,
            },
            messages: {
              required: '请选择上级主管审批日期',
            },
          },
          {
            type: 'select',
            modelKey: 'bmjlspyj',
            label: '分管总监审批意见',
            props: {
              options: ['同意', '不同意'],
              placeholder: '请选择分管总监审批意见',
            },
            rules: {
              required: true,
            },
            debounce: 100,
            messages: {
              required: '请选择分管总监审批意见',
            },
          },
          {
            component: HxDatePick,
            modelKey: 'bmjlsprq',
            label: '分管总监审批日期',
            rules: {
              required: true,
            },
            props: {},
            messages: {
              required: '请选择分管总监审批日期',
            },
          },
          {
            type: 'select',
            modelKey: 'bmzjlspyj',
            label: '总经理审批意见',
            props: {
              options: ['同意', '不同意'],
              placeholder: '请选择总经理审批意见',
            },
            rules: {
              required: true,
            },
            debounce: 100,
            messages: {
              required: '请选择总经理审批意见',
            },
          },
          {
            component: HxDatePick,
            modelKey: 'bmzjlsprq',
            label: '总经理审批日期',
            props: {
              placeholder: '请选择总经理审批日期',
            },
            rules: {
              required: true,
            },
            messages: {
              required: '请选择总经理审批日期',
            },
          },
        ],
      },

      saleColumn: {
        legend: '销假信息',
        fields: [
          {
            component: HxDatePick,
            modelKey: 'sjqjsjz',
            label: '实际请假时间至',
            props: {},
            rules: {
              required: true,
            },
            messages: {
              required: '请选择实际请假时间至',
            },
          },
          {
            type: 'input',
            modelKey: 'sjqjzsj',
            label: '实际请假总时间',
            props: {
              type: 'number',
            },
            rules: {
              required: true,
            },
            messages: {
              required: '请输入实际请假总时间',
            },
          },
          {
            type: 'select',
            modelKey: 'sfyq',
            label: '是否延期',
            props: {
              options: ['是', '否'],
            },
            rules: {
              required: true,
            },
            messages: {
              required: '请选择是否延期',
            },
          },
          {
            component: HxDatePick,
            modelKey: 'xjsj',
            label: '销假时间',
            props: {
              options: ['是', '否'],
            },
            rules: {
              required: true,
            },
            messages: {
              required: '请选择销假时间',
            },
          },
          {
            type: 'textarea',
            modelKey: 'xjsm',
            label: '销假说明',
            props: {
              placeholder: '请输入销假说明',
            },
            rules: {
              required: true,
            },
            debounce: 100,
            messages: {
              required: '请输入销假说明',
            },
          },
        ],
      },

      // 下一步
      nextCloumn: {
        legend: '下一步审核信息',
        fields: [
          {
            type: 'select',
            modelKey: 'userIds',
            label: '下一步审批人',
            props: {
              options: ['某某人', '其他'],
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

      buttonColumn: {
        fields: [
          {
            type: 'submit',
            label: '提交',
          },
        ],
      },

      schema: {
        groups: [],
      },
      options: {
        scrollToInvalidField: true,
        layout: 'standard', // classic fresh
      },

      dataSource: {},
      type: 0,
      saveDatas: {},
    };
  },
  created() {
    const { type } = this.$route.query;
    this.type = parseInt(type, 10);
    if (this.type !== 0) {
      this.getFormData();
    } else {
      // 如果已有数据
      this.createForm();
    }
  },
  methods: {
    createForm() {
      this.model = { ...this.baseInfo };
      this.model.xm = JSON.parse(
        window.localStorage.getItem('userInfo'),
      ).userName;
      this.schema.groups.push(this.baseColumn, this.buttonColumn);
    },
    // 上级主管审批
    getApprove() {
      this.model = { ...this.baseInfo, ...this.approveInfo };
      Object.keys(this.dataSource).forEach(i => {
        this.model[i] = this.dataSource[i];
      });
      this.baseColumn.fields.forEach(item => {
        item.type='input';
        item.props.disabled = true;
        item.rules.required = false;
      });
      this.approveColumn.fields.forEach(item => {
        if (
          item.modelKey !== 'spzjyj'
          && item.modelKey !== 'sjzgspyj'
          && item.modelKey !== 'sjzgsprq'
        ) {
          item.type='input';
          item.props.disabled = true;
          item.rules.required = false;
          item.props.placeholder = '';
        }
      });
      this.schema.groups.push(
        this.baseColumn,
        this.approveColumn,
        this.buttonColumn,
      );
    },
    // 分管总监审批
    getMange() {
      this.model = { ...this.baseInfo, ...this.approveInfo };
      Object.keys(this.dataSource).forEach(i => {
        this.model[i] = this.dataSource[i];
      });
      this.baseColumn.fields.forEach(item => {
        item.type='input';
        item.props.disabled = true;
        item.rules.required = false;
      });
      this.approveColumn.fields.forEach(item => {
        if (item.modelKey !== 'bmjlspyj' && item.modelKey !== 'bmjlsprq') {
          item.type='input';
          item.props.disabled = true;
          item.rules.required = false;
          item.props.placeholder = '';
        }
      });
      this.schema.groups.push(
        this.baseColumn,
        this.approveColumn,
        this.buttonColumn,
      );
    },
    // 总经理审批
    getMater() {
      this.model = { ...this.baseInfo, ...this.approveInfo };
      Object.keys(this.dataSource).forEach(i => {
        this.model[i] = this.dataSource[i];
      });
      this.baseColumn.fields.forEach(item => {
        item.type='input';
        item.props.disabled = true;
        item.rules.required = false;
        item.props.placeholder = '';
      });
      this.approveColumn.fields.forEach(item => {
        if (item.modelKey !== 'bmjlspyj' && item.modelKey !== 'bmjlsprq') {
          item.type='input';
          item.props.disabled = true;
          item.rules.required = false;
          item.props.placeholder = '';
        }
      });
      this.schema.groups.push(
        this.baseColumn,
        this.approveColumn,
        this.buttonColumn,
      );
    },
    // 打回修改
    reChange() {
      this.model = { ...this.baseInfo, ...this.approveInfo };
      Object.keys(this.dataSource).forEach(i => {
        this.model[i] = this.dataSource[i];
      });
      this.baseColumn.fields.forEach(item => {
        item.type='input';
        item.props.disabled = true;
        item.rules.required = false;
        item.props.placeholder = '';
      });
      this.approveColumn.fields.forEach(item => {
        item.type='input';
        item.props.disabled = true;
        item.rules.required = false;
        item.props.placeholder = '';
      });
      this.schema.groups.push(
        this.baseColumn,
        this.approveColumn,
        this.buttonColumn,
      );
    },
    // 人事告知销假
    handleSales() {
      this.model = { ...this.baseInfo, ...this.approveInfo, ...this.saleInfo };
      Object.keys(this.dataSource).forEach(i => {
        this.model[i] = this.dataSource[i];
      });
      this.baseColumn.fields.forEach(item => {
        item.type='input';
        item.props.disabled = true;
        item.rules.required = false;
        item.props.placeholder = '';
      });
      this.approveColumn.fields.forEach(item => {
        item.type='input';
        item.props.disabled = true;
        item.rules.required = false;
        item.props.placeholder = '';
      });
      this.schema.groups.push(
        this.baseColumn,
        this.approveColumn,
        this.saleColumn,
        this.buttonColumn,
      );
    },
    // 仅查看
    readOnly() {
      this.model = { ...this.baseInfo, ...this.approveInfo, ...this.saleInfo };
      Object.keys(this.dataSource).forEach(i => {
        this.model[i] = this.dataSource[i];
      });
      this.baseColumn.fields.forEach(item => {
        item.type='input';
        item.props.disabled = true;
        item.rules.required = false;
        item.props.placeholder = '';
      });
      this.approveColumn.fields.forEach(item => {
        item.type='input';
        item.props.disabled = true;
        item.rules.required = false;
        item.props.placeholder = '';
      });
      this.saleColumn.fields.forEach(item => {
        item.type='input';
        item.props.disabled = true;
        item.rules.required = false;
        item.props.placeholder = '';
      });
      this.schema.groups.push(
        this.baseColumn,
        this.approveColumn,
        this.saleColumn,
      );
    },
    // 处理数据名对应的id
    handleNameId(lists, keyValue) {
      for (let i = 0; i < lists.length; i += 1) {
        if (lists[i].title === this.model[keyValue]) {
          this.model[keyValue] = lists[i].id;
        }
      }
    },
    // 提交
    submitHandler(e) {
      e.preventDefault();
      // type:{0:创建||开始,1:上级主管审批,2:分管总监审批,3:总经理审批,4:打回修改,5:人事告知销假,6:查看}
      if (this.type === 0) {
        const post = JSON.parse(window.localStorage.getItem('positionList'));
        const group = JSON.parse(window.localStorage.getItem('groupList'));
        const leave = JSON.parse(window.localStorage.getItem('leaveList'));
        this.handleNameId(post, 'zggw');
        this.handleNameId(group, 'bm');
        this.handleNameId(leave, 'jb');
        const param = {
          'conditionMap.tableName': 'TB_LEAVE',
          'conditionMap.id': '',
          'flowInst.id': '',
          'conditionMap.isNewData': 'Y',
          'conditionMap.newDataConv': 'Y',
          optType: 'add',
          'conditionMap.fields': 'xm,bm,zggw,jb,qjsy,qjrqq,qjrqz,qjzsj,rq,id',
        };
        Object.keys(this.model).forEach(i => {
          param[`conditionMap.${i}`] = this.model[i];
        });
        this.getLeaveSave({ param });
      } else {
        const { id, dataId } = this.$route.query;
        const param = {
          'conditionMap.tableName': 'TB_LEAVE',
          'conditionMap.id': dataId,
          'flowInst.id': id,
          'conditionMap.isNewData': 'Y',
          'conditionMap.newDataConv': 'Y',
          optType: 'update',
          'conditionMap.fields': 'xm,bm,zggw,jb,qjsy,qjrqq,qjrqz,qjzsj,rq,id',
        };
        let keyLists = [];
        switch (this.type) {
          case 1:
            keyLists = ['sjzgspyj', 'sjzgsprq'];
            this.handleSaveData(param, keyLists);
            break;
          case 2:
            keyLists = ['bmjlspyj', 'bmjlsprq'];
            this.handleSaveData(param, keyLists);
            break;
          case 3:
            keyLists = ['bmzjlspyj', 'bmzjlsprq'];
            this.handleSaveData(param, keyLists);
            break;
          case 5:
            keyLists = ['sjqjsjz', 'sjqjzsj', 'sfyq', 'xjsj', 'xjsm'];
            this.handleSaveData(param, keyLists);
            break;
          default:
            break;
        }
        this.getLeaveSave({ param });
      }
    },
    handleSaveData(param, keyLists) {
      param['conditionMap.fields'] = `${keyLists.join()},id`;
      keyLists.forEach(item => {
        param[`conditionMap.${item}`] = this.model[item] || '';
      });
      return param;
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
    ...mapActions(['getLeaveFormData', 'getLeaveSave', 'getNextInfo', 'getNextSave']),
  },
  computed: {
    ...mapState({
      leveFormData: state => state.apis.leveFormData,
      saveData: state => state.apis.saveData,
      nextStepInfo: state => state.apis.nextStepInfo,
      nextSave: state => state.apis.nextSave,
    }),
  },
  watch: {
    leveFormData(val) {
      Object.keys(val).forEach(i => {
        switch (i.toLowerCase()) {
          case 'zggw':
            this.dataSource[i.toLowerCase()] = val[i].split(':')[1];
            break;
          case 'jb':
            this.dataSource[i.toLowerCase()] = val[i].split(':')[1];
            break;
          case 'bm':
            this.dataSource[i.toLowerCase()] = val[i].split(':')[1];
            break;
          default:
            this.dataSource[i.toLowerCase()] = val[i];
            break;
        }
      });
      // type:{0:创建||开始,1:上级主管审批,2:分管总监审批,3:总经理审批,4:打回修改,5:人事告知销假,6:查看}
      switch (this.type) {
        case 1:
          this.getApprove();
          break;
        case 2:
          this.getMange();
          break;
        case 3:
          this.getMater();
          break;
        case 4:
          this.reChange();
          break;
        case 5:
          this.handleSales();
          break;
        case 6:
          this.readOnly();
          break;
        default:
          break;
      }
    },
    saveData(val) {
      const { id, flowSummary } = val;
      this.saveDatas = val;
      const { all } = this.$route.query;
      const { type } = this;
      if (type === 0) {
        // 草稿状态跳转到下一步
        this.$router.push({
          path: '/nextapprove',
          query: { id, flowSummary, type: 'draft' },
        });
      } else {
        const { all } = this.$route.query;

        if (type === 5) {
        // 销假处理
          const param = {
            'conditionMap.flowInstId': all.flowInstId,
            'conditionMap.complateType': 'pending',
            'conditionMap.nodeId': id,
          };
          this.getNextInfo({ param });
        } else {
          // 等待状态跳转到下一步
          this.$router.push({
            path: '/nextapprove',
            query: {
              id,
              flowSummary,
              type: 'pending',
              all,
            },
          });
        }
      }
    },
    nextStepInfo(val) {
      const { all } = this.$route.query;
      const { type } = this.type;
      const { id, flowSummary } = this.saveDatas;
      if (val.nodeName === '结束') {
        delete val.actorUserId;
        delete val.actorUserName;
        delete val.allActorUsers;
        const param = {
          'conditionMap.userIds': '',
          'conditionMap.nodeMask': '',
          'flowInst.id': val.flowInstId,
          currentNode: JSON.stringify(all),
          nextNode: JSON.stringify(val),
          instType: 'pending',
        };
        this.getNextSave({ param, router: this.$router });
      }
    },
  },
};
</script>
