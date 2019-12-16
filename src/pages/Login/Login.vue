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
                  name="phone"
                  v-validate="'required|mobile'"
                />
                <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
                <button
                  :disabled="!isRightPhone || computeTiem > 0"
                  class="get_verification"
                  :class="{right:isRightPhone && computeTiem === 0}"
                  @click.prevent="sendCode"
                >{{computeTiem > 0 ? `已发送验证码(${computeTiem})` : '获取验证码'}}</button>
              </section>
              <section class="login_verification">
                <input
                  type="tel"
                  maxlength="8"
                  placeholder="验证码"
                  v-model="code"
                  name="code"
                  v-validate="{required: true,regex: /^\d{6}$/}"
                />
                <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
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
                    placeholder="用户名"
                    v-model="name"
                    name="name"
                    v-validate="'required'"
                  />
                  <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                </section>
                <section class="login_verification">
                  <input
                    :type="isShowPwd ? 'text' : 'password'"
                    maxlength="8"
                    placeholder="密码"
                    v-model="pwd"
                    name="pwd"
                    v-validate="'required'"
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
                    v-model="captcha"
                    name="captcha"
                    v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}"
                  />
                  <span
                    style="color: red;"
                    v-show="errors.has('captcha')"
                  >{{ errors.first('captcha') }}</span>
                  <img
                    class="get_verification"
                    src="http://localhost:4000/captcha"
                    alt="captcha"
                    @click="updatecaptcha"
                    ref="captcha"
                  />
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
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      isShowSms: true, //true:短信登录  false:密码登录
      phone: "",
      isShowPwd: false, //是否显示密码
      name: "",
      pwd: "",
      code: "",
      captcha:'',
      computeTiem: 0 //计时剩余时间
    };
  },
  computed: {
    isRightPhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  methods: {
    //发送短信验证码
    async sendCode() {
      //设置倒计时时间
      this.computeTiem = 5;
      //启动定时器进行计时
      const intetvalId = setInterval(() => {
        this.computeTiem--;
        if (this.computeTiem === 0) {
          clearInterval(intetvalId);
        }
      }, 1000);
      const result = await this.$API.reqSendCode(this.phone);
      const { code, msg } = result;
      if (code === 0) {
        Toast("验证码短信已发送");
      } else {
        this.computeTiem = 0;
        MessageBox("提示", msg || "发送失败");
      }
    },
    //更新图形验证码
    updatecaptcha() {
      //给img指定新的src值，利用时间戳
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?time=" + Date.now();
    },

    //表单验证
    async login() {
      let names;
      if (this.isShowSms) {
        names = ["phone", "code"];
      } else {
        names = ["name", "pwd", "captcha"];
      }
      const result = await this.$validator.validateAll(names);
      let reqresult
      if (result) {
        const {isShowSms,phone,code,name,pwd,captcha} = this
        console.log(name,pwd,captcha)
        if(isShowSms){
          //短信登陆
          reqresult = await this.$API.reqPhoneLogin(phone,code)
        }else{
          //密码登录
          reqresult = await this.$API.reqPwdLogin(name,pwd,captcha)
          //更新图形验证码
          this.updatecaptcha()
          //清空文本框
          this.captcha = ''
        }
        if(reqresult.code === 0){
          const user = reqresult.data
          //登录跳转
          this.$router.replace('/profile')
          //将user保存到vuex中
          this.$store.dispatch('saveUser',user)
        }else{
          alert(reqresult.msg)
        }
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
