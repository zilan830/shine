<template>
    <div class="hx-date-pick" @click="handleDate">
        <cube-input v-model="dateValue" v-bind="$props" :disabled="isDisabled"></cube-input>
    </div>
</template>

<script>
import DateUtil from '../assets/methods/helpers/date.js';

export default {
  name: 'hx-date-pick',
  props: {
    value: String,
    placeholder: String,
    minDate: Array, // ['yyyy','MM','dd','hh','mm','ss']
    maxDate: Array, // ['yyyy','MM','dd','hh','mm','ss']
    disabled: Boolean,
  },
  data() {
    return {
      isDisabled: true,
      dateValue: this.value,
    };
  },
  methods: {
    handleDate() {
      if (!this.dateTimePicker && !this.disabled) {
        const today = new Date();
        const { minDate, maxDate } = this.$props;
        this.dateTimePicker = this.$createDatePicker({
          title: 'Date Time Picker',
          min:
            minDate && (minDate.length === 6)
              ? new Date(
                parseInt(minDate[0], 10),
                parseInt(minDate[1], 10),
                parseInt(minDate[2], 10),
                parseInt(minDate[3], 10),
                parseInt(minDate[4], 10),
                parseInt(minDate[5], 10),
                parseInt(minDate[6], 10),
              )
              : new Date(today.getFullYear() - 1, 0, 1, 0, 0, 0),
          max:
            minDate && (maxDate.length === 6)
              ? new Date(
                parseInt(maxDate[0], 10),
                parseInt(maxDate[1], 10),
                parseInt(maxDate[2], 10),
                parseInt(maxDate[3], 10),
                parseInt(maxDate[4], 10),
                parseInt(maxDate[5], 10),
                parseInt(maxDate[6], 10),
              )
              : new Date(today.getFullYear() + 2, 0, 1, 0, 0, 0),
          value: new Date(),
          columnCount: 6,
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle,
        });
      }
      this.dateTimePicker.show();
    },
    selectHandle(date, selectedVal, selectedText) {
      const value = DateUtil.format(date, 'yyyy-MM-dd hh:mm:ss');
      this.dateValue = value;
      this.$emit('input', value);
    },
    cancelHandle() {
      this.$createToast({
        type: 'warn',
        txt: '请选择时间',
        time: 1000,
      }).show();
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
