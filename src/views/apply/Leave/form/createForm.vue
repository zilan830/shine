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
import HxDatePick from '../../../../components/datePick.vue';

export default {
  name: 'create-form',
  components: {
    HxDatePick,
  },
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        // 请假信息
        // 姓名
        name: '',
        // 所在部门
        department: '',
        // 最高岗位
        position: '',
        // 假别
        type: '',
        // 请假事由
        reason: '',
        // 请假日期起
        startDate: '',
        // 请假日期至
        endDate: '',
        // 请假总时间（时）
        totalTime: '',
        // 请假日期
        leaveTime: '',
        // 送到审批领导
        approvalLeader: '',
        // 审批说明
        approvalExplain: '',
      },
      schema: {
        groups: [
          {
            legend: '请假信息',
            fields: [
              {
                type: 'input',
                modelKey: 'name',
                label: '姓名',
                props: {
                  disabled: true,
                },
              },
              {
                type: 'select',
                modelKey: 'department',
                label: '所在部门',
                props: {
                  options: [
                    '移动平台组',
                    '南京分公司',
                  ],
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
                modelKey: 'position',
                label: '最高岗位',
                props: {
                  options: [
                    '总经理',
                    '副总经理',
                    '团队总监',
                    '团队副总监',
                    '高级产品/项目经理',
                    '产品/项目经理',
                    '产品/项目经理助理',
                    '组长',
                    '副组长',
                    '组员',
                  ],
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
                modelKey: 'type',
                label: '假别',
                props: {
                  options: [
                    '事假',
                    '病假',
                    '婚假',
                    '产假',
                    '工伤',
                    '丧假',
                    '调休',
                    '公出',
                    '其他',
                  ],
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
                modelKey: 'reason',
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
                modelKey: 'startDate',
                label: '请假日期起',
                props: {
                },
                rules: {
                  required: true,
                },
                messages: {
                  required: '请选择请假日期起',
                },
              },
              {
                component: HxDatePick,
                modelKey: 'endDate',
                label: '请假日期至',
                props: {
                  options: [2015, 2016, 2017, 2018, 2019, 2020],
                },
                rules: {
                  required: true,
                },
                messages: {
                  required: '请选择请假日期至',
                },
              },
              {
                type: 'input',
                modelKey: 'totalTime',
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
                modelKey: 'leaveTime',
                label: '请假日期',
                props: {

                },
                rules: {
                  required: true,
                },
                messages: {
                  required: '请选择请假日期',
                },
              },
              {
                type: 'select',
                modelKey: 'type',
                label: '上级主管审批人',
                props: {
                  options: [
                    '领导一',
                    '领导二',
                  ],
                },
                rules: {
                  required: true,
                },
                messages: {
                  required: '请选择审批领导人',
                },
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
    };
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      console.log('submit', this.model);
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex);
    },
    resetHandler(e) {
      console.log('reset', e);
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@require '~cube-ui/src/common/stylus/variable.styl';
@require '../../../../theme.styl';
</style>
