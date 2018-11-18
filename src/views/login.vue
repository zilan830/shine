<template>
  <div class="login" :style="{ background:`url('http://img.hb.aicdn.com/dbb3c7943cbc7b99de9a799124f1489cc388f63b3fb66-ESHNLR_fw658') no-repeat bottom /cover` }">
    <p class="title">和信移动OA</p>
    <cube-form
        :model="model"
        :schema="schema"
        :options="options"
        @submit="submitHandler">
    </cube-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import backgroundImg from '../assets/image/2.png';

export default {
  name: 'login',
  data() {
    return {
      model: {
        userName: '周伟',
        password: '11111111',
        backgroundImg,
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
      // this.$router.push("/index");
      const data = {
        'sysUser.userAccout': this.model.userName,
        'sysUser.userPwd': this.model.password,
      };
      this.login({ data, router: this.$router });
      this.getDataDictionary();
    },
    ...mapActions(['login', 'getDataDictionary']),
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus {
  box-shadow: 0 0 0 60px white inset;
  -webkit-text-fill-color: #878787;
}

.login {
  width: 100%;
  height: 100%;
  position: relative;

  .title {
    width: 100%;
    position: absolute;
    top: 18vh;
    font-size: 30px;
    text-align: center;
    letter-spacing: 10px;
    font-weight: bold;
  }

  .cube-form {
    position: absolute;
    width: 100%;
    top: 30vh;
    background-color: transparent;

    .cube-form-group-content {
      background-color: white;
    }
  }
}
</style>
