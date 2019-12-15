<template>
  <div class="off">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="isShowSms ? 'on' : ''" @click="isShowSms = true">短信登录</a>
            <a href="javascript:;" :class="!isShowSms ? 'on' : ''" @click="isShowSms = false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="isShowSms ? 'on' : ''">
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机号"
                  v-model="phone"
                  name="myphone"
                  v-validate="{required: true,regex: /^1\d{10}$/}"
                />
                <span
                  style="color: red;"
                  v-show="errors.has('myphone')"
                >{{ errors.first('myphone') }}</span>
                <button
                  :disabled="!isRightPhone"
                  class="get_verification"
                  :class="{right:isRightPhone}"
                  @click.prevent="sendCode"
                >获取验证码</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" />
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="!isShowSms ? 'on' : ''">
              <section>
                <section class="login_message">
                  <input
                    type="tel"
                    maxlength="11"
                    placeholder="手机/邮箱/用户名"
                    v-model="email"
                    name="邮箱"
                    v-validate="{required: true,regex: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/}"
                  />
                  <span style="color: red;" v-show="errors.has('邮箱')">{{ errors.first('邮箱') }}</span>
                </section>
                <section class="login_verification">
                  <input
                    :type="isShowPwd ? 'text' : 'password'"
                    maxlength="8"
                    placeholder="密码"
                    v-model="pwd"
                    name="pwd"
                    v-validate="{required: true,regex: /\d{8}$/}"
                  />
                  <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                  <div
                    class="switch_button"
                    :class="isShowPwd ? 'on' : 'off'"
                    @click="isShowPwd=!isShowPwd"
                  >
                    <div class="switch_circle" :class="{right: isShowPwd}"></div>
                    <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input
                    type="text"
                    maxlength="11"
                    placeholder="验证码"
                    v-model="code"
                    name="code"
                    v-validate="{required: true,regex: /^wk3v$/}"
                  />
                  <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
                  <img class="get_verification" src="./images/captcha.svg" alt="captcha" />
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login()">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
import VeeValidate from "vee-validate";

Vue.use(VeeValidate);
import zh_CN from "vee-validate/dist/locale/zh_CN";
VeeValidate.Validator.localize("zh_CN", {
  messages: zh_CN.messages,
  attributes: {
    myphone: "手机号",
    pwd: "密码",
    code: "验证码"
  }
});

// VeeValidate.Validator.extend('pwd', {
//   validate: value => {
//     return /^\d{8}$/.test(value)
//   },
//   getMessage: field => field + '必须是6位'
// })

export default {
  data() {
    return {
      isShowSms: true,
      phone: "",
      isShowPwd: false,
      email: "",
      pwd: "",
      code:''
    };
  },
  computed: {
    isRightPhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  methods: {
    sendCode() {
      alert("---");
    },
    async login() {
      const result = await this.$validator.validateAll(
        'code'
      );

      if (result) {
        alert('提交成功');
      }else{
        alert('cuowu')
        console.log(result)
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
