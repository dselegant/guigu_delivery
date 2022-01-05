<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{ on: loginWay }">短信登录</a>
          <a href="javascript:;" :class="{ on: !loginWay }">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{ on: loginWay }" @click="loginWay = true">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <!-- right_phone -->
              <button
                :disabled="!right_phone"
                class="get_verification"
                :class="{
                  right_phone
                }"
                @click.prevent="sendCode"
              >
                {{ codeTime ? `重新发送(${codeTime})` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }" @click="loginWay = false">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  :type="showPassword ? 'tel' : 'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                />
                <div
                  class="switch_button"
                  :class="showPassword ? 'on' : 'false'"
                  @click="showPassword = !showPassword"
                >
                  <div
                    class="switch_circle"
                    :class="{ right: showPassword }"
                  ></div>
                  <span class="switch_text">...</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="changeCaptcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip
      :alertText="alertText"
      @closeTip="closeTip"
      v-show="alertText"
    ></AlertTip>
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip';
import { reqSendCode, reqSmsLogin, reqPwdLogin } from '../../api/index';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      loginWay: true, //登录方式
      phone: '',
      codeTime: 0, //验证码倒计时
      showPassword: false, //是否显示密码
      captcha: '', //图形验证码
      code: '', //手机验证码
      pwd: '', //密码
      name: '', //用户名
      alertText: '' //提示文字
    };
  },
  methods: {
    // 发送验证码
    async sendCode() {
      this.codeTime = 30;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.codeTime--;
        if (this.codeTime <= 0) {
          clearInterval(this.interval);
        }
      }, 1000);
      let ret = await reqSendCode(this.phone);
      if (ret.code === 1) {
        this.alertText = ret.msg;
      }
    },
    // 改变验证码
    changeCaptcha() {
      this.$refs.captcha.src =
        'http://localhost:4000/captcha?time=' + Date.now();
    },
    // 登录
    async login() {
      let ret;
      // 验证码
      if (this.loginWay) {
        if (!this.right_phone) {
          this.alertText = '手机号不正确';
          return;
        } else if (!/^\d{6}$/.test(this.code)) {
          this.alertText = '验证码必须是6位数字';
          return;
        }
        // 验证码登录
        ret = await reqSmsLogin(this.phone, this.code);
        // 用户名
      } else {
        if (!this.name) {
          // 用户名必须指定
          this.alertText = '用户名必须指定';
          return;
        } else if (!this.pwd) {
          // 密码必须指定
          this.alertText = '密码必须指定';
          return;
        } else if (!this.captcha) {
          // 验证码必须指定
          this.alertText = '验证码必须指定';
          return;
        }
        let { phone, pwd, captcha } = this;
        ret = await reqPwdLogin({ phone, pwd, captcha });
      }
      if (ret.code === 0) {
        console.log(ret);
        clearInterval(this.interval);
        // 存储用户信息
        this.get_user();
        this.$router.replace('/profile');
      } else {
        this.alertText = ret.msg;
        this.changeCaptcha();
        return;
      }
    },
    closeTip() {
      this.alertText = '';
    },
    ...mapActions(['get_user'])
  },
  computed: {
    // 手机号合法验证
    right_phone() {
      return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
        this.phone
      );
    }
  },
  components: {
    AlertTip
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
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

              &.right_phone {
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
                  transform: translateX(30px);
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