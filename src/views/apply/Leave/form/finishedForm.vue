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
  name: 'finished-form',
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
        xm: '',
        // 所在部门
        szbm: '',
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
        qjrq: '',
        // 审批信息
        // 审批追加意见
        spzjyj: '',
        // 上级主管审批意见
        sjzgspyj: '',
        // 上级主管审批日期
        sjzgsprq: '',
        // 分管总监审批意见
        fgzjspyj: '',
        // 分管总监审批日期
        fgzjsprq: '',
        // 总经理审批意见
        zjlspyj: '',
        // 总经理审批日期
        zjlsprq: '',
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
      schema: {
        groups: [
          {
            legend: '请假信息',
            fields: [
              {
                type: 'input',
                modelKey: 'xm',
                label: '姓名',
                props: {
                  disabled: true,
                },
              },
              {
                type: 'select',
                modelKey: 'szbm',
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
                modelKey: 'zggw',
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
                modelKey: 'jb',
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
                modelKey: 'qjrqz',
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
                modelKey: 'qjrq',
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
            ],
          },
          {
            legend: '审批信息',
            fields: [
              {
                type: 'textarea',
                modelKey: 'spzjyj',
                label: '审批追加意见',
                props: {
                  placeholder: '请输入审批追加意见',
                },
                rules: {
                  required: true,
                },
                debounce: 100,
                messages: {
                  required: '请输入审批追加意见',
                },
              },
              {
                type: 'textarea',
                modelKey: 'sjzgspyj',
                label: '上级主管审批意见',
                props: {
                  placeholder: '请输入上级主管审批意见',
                },
                rules: {
                  required: true,
                },
                debounce: 100,
                messages: {
                  required: '请输入上级主管审批意见',
                },
              },
              {
                component: HxDatePick,
                modelKey: 'sjzgsprq',
                label: '上级主管审批日期',
                props: {
                  options: [2015, 2016, 2017, 2018, 2019, 2020],
                },
                rules: {
                  required: true,
                },
                messages: {
                  required: '请选择上级主管审批日期',
                },
              },
              {
                type: 'textarea',
                modelKey: 'fgzjspyj',
                label: '分管总监审批意见',
                props: {
                  placeholder: '请输入分管总监审批意见',
                },
                rules: {
                  required: true,
                },
                debounce: 100,
                messages: {
                  required: '请输入分管总监审批意见',
                },
              },
              {
                type: 'select',
                modelKey: 'fgzjsprq',
                label: '分管总监审批日期',
                props: {
                  options: [2015, 2016, 2017, 2018, 2019, 2020],
                },
                rules: {
                  required: true,
                },
                messages: {
                  required: '请选择分管总监审批审批日期',
                },
              },
              {
                type: 'textarea',
                modelKey: 'zjlspyj',
                label: '总经理审批意见',
                props: {
                  placeholder: '请输入总经理审批意见',
                },
                rules: {
                  required: true,
                },
                debounce: 100,
                messages: {
                  required: '请输入总经理审批意见',
                },
              },
              {
                component: HxDatePick,
                modelKey: 'zjlsprq',
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
          {
            legend: '销假信息',
            fields: [
              {
                component: HxDatePick,
                modelKey: 'sjqjsjz',
                label: '实际请假时间至',
                props: {
                  options: [2015, 2016, 2017, 2018, 2019, 2020],
                },
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
  updated() {
    console.log('1111');
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
