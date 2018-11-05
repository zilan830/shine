<template>
  <div class="login">
    <cube-form
        :model="model"
        :schema="schema"
        :options="options"
        @submit="submitHandler">
    </cube-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      model: {
        userName: '',
        password: '',
      },
      schema: {
        groups: [
          {
            fields: [
              {
                type: 'input',
                modelKey: 'userName',
                label: '用户名',
                props: {
                  placeholder: '请输入用户名',
                  clearable: true,
                  autocomplete: true,
                },
                rules: {
                  required: true,
                },
                messages: '请输入用户名',
              },
              {
                type: 'input',
                modelKey: 'password',
                label: '密码',
                props: {
                  placeholder: '请输入密码',
                  type: 'password',
                  clearable: true,
                  autocomplete: true,
                  eye: {
                    open: false,
                    reverse: false,
                  },
                },
                rules: {
                  required: true,
                },
                messages: '请输入密码',
              },
            ],
          },
          {
            fields: [
              {
                type: 'submit',
                label: '登录',
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
    submitHandler() {
      this.$router.push('/index');
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  box-shadow:0 0 0 60px white  inset;
  -webkit-text-fill-color: #878787;
}
</style>
