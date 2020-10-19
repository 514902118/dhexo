<template>
  <div>
    <vLoginHeader/>
    <div class="main">
      <div class="box">
        <div class="left">
          <div class="aside">
            <h4><img src="../../assets/logo2.png" alt=""></h4>
            <p>WES遗传病全自动解读系统</p>
            <img src="../../assets/home-01.png" alt="" ondragstart="return false"/>
          </div>
        </div>
        <div class="right">
          <!-- 登录 -->
          <div v-show="!showRegBox" class="login-box">
            <p class="title">账号登录</p>
            <el-form class="login-form" ref="loginForm" :rules="loginRules" :model="loginForm">
              <el-form-item label="" prop="userName">
                <el-input class="elinput" v-model="loginForm.userName" placeholder="请输入账号"
                  readonly onfocus="this.removeAttribute('readonly');" onblur="this.setAttribute('readonly',true);">
                  <i slot="prefix" class="el-icon-user el-input__icon"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input class="elinput" v-model="loginForm.password" type="password" placeholder="请输入密码" @keyup.enter.native="login">
                  <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
              </el-form-item>
              <el-form-item class="forgot-form-item">
                <p class="forgot">
                  <router-link :to="{ name: 'forgot'}" tag="span">忘记密码</router-link>
                </p>
              </el-form-item>
              <el-form-item>
                <div class="elbtn" @click="login">登录</div>
              </el-form-item>
            </el-form>
            <div class="bottom">
              <p @click="showRegBox=true">没有账号/密码，立即注册</p>
            </div>
          </div>
          <!-- 注册 -->
          <div v-show="showRegBox" class="reg-box">
            <p class="title">账号注册<i class="el-icon-d-arrow-left" @click="showRegBox=false"></i></p>
            <el-form class="reg-form" ref="regForm" :rules="regRules" :model="regForm">
              <el-form-item label="" prop="userName">
                <el-input class="elinput" v-model="regForm.userName" placeholder="请输入账号,6-16位英文数字"
                  readonly onfocus="this.removeAttribute('readonly');" onblur="this.setAttribute('readonly',true);">
                  <i slot="prefix" class="el-icon-user el-input__icon"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input class="elinput" v-model="regForm.password" type="password" placeholder="请输入密码,6-16位英文数字">
                  <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="" prop="againPassword">
                <el-input class="elinput" v-model="regForm.againPassword" type="password" placeholder="再次输入密码" @keyup.enter.native="register">
                </el-input>
              </el-form-item>
              <el-form-item label="" prop="hospital" class="elformitem1" style="margin-right: 4%;"><el-input v-model="regForm.hospital" class="elinput" placeholder="请输入医院"></el-input></el-form-item>
              <el-form-item label="" prop="title" class="elformitem1"><el-input v-model="regForm.title" class="elinput" placeholder="请输入职称"></el-input></el-form-item>
              <el-form-item prop="email">
                <el-input class="elinput elinput3" v-model="regForm.email" placeholder="请输入邮箱">
                  <i slot="prefix" class="el-input__icon el-icon-message"></i>
                  <span slot="append" class="elinput3-append" @click="sendCaptcha">{{countTxt}}</span>
                </el-input>
              </el-form-item>
              <el-form-item prop="verificationCode">
                <el-input class="elinput" v-model="regForm.verificationCode" placeholder="请输入邮箱验证码" @keyup.enter.native="register">
                  <i slot="prefix" class="iconfont icon-yanzhengma el-input__icon"></i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <div class="elbtn" @click="register">立即注册</div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <vFooter/>
  </div>
</template>

<script>
import vLoginHeader from '@/components/common/vLoginHeader'
import vFooter from '@/components/common/vFooter'

export default {
  components: {
    vLoginHeader,
    vFooter
  },
  data() {
    var checkUserName = (rule, value, callback) => {
      let regx = /[0-9A-Za-z]{6,16}$/
      if (value === '') {
        return callback(new Error('请输入账号'))
      } else if (value.length < 6 || value.length > 16 || !regx.test(value)) {
        return callback(new Error('请输入6-16位英文数字'))
      } else {
        callback()
      }
    }
    var checkPassword = (rule, value, callback) => {
      let regx = /[0-9A-Za-z]{6,16}$/
      if (value === '') {
        return callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 16 || !regx.test(value)) {
        return callback(new Error('请输入6-16位英文数字'))
      } else {
        callback()
      }
    }
    var checkAgainPassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.regForm.password) {
        return callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    return {
      showRegBox: false,
      // 登录
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [
          // { required: true, message: '请输入账号', trigger: 'change' },
          { validator: checkUserName, trigger: 'change' },
        ],
        password: [
          { validator: checkPassword, trigger: 'change' },
        ],
      },
      // 注册
      regForm: {
        userName: '',
        password: '',
        againPassword: '',
        hospital: '',
        title: '',
        email: '',
        verificationCode: ''
      },
      regRules: {
        userName: [
          { validator: checkUserName, trigger: 'change' },
        ],
        password: [
          { validator: checkPassword, trigger: 'change' },
        ],
        againPassword: [
          { validator: checkAgainPassword, trigger: 'change' },
        ],
        hospital: [
          { required: true, message: '请输入医院', trigger: 'change' },
        ],
        title: [
          { required: true, message: '请输入职称', trigger: 'change' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
        ],
        verificationCode: [
          { required: true, message: '请输入邮箱验证码', trigger: 'change' },
        ],
      },
      countTxt: '验证'
    }
  },
  methods: {
    login() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.$post(this.$Url.account.login, {
            userName: this.loginForm.userName,
            password: this.loginForm.password
          }).then(res => {
            if (res.status === 200) {
              let token = res.data
              Cookies.set("token", token)
              this.$router.push({
                name: 'home'
              })
              // Cookies.set('realName', realName)
            } else {
              this.$message({
                type: 'error',
                duration: 2000,
                message: res.msg
              })
            }
          }).catch(err => {})
        }
      })
    },
    register() {
      this.$refs['regForm'].validate((valid) => {
        if (valid) {
          this.$post(this.$Url.account.reg, {
            userName: this.regForm.userName,
            password: this.regForm.password,
            againPassword: this.regForm.againPassword,
            hospital: this.regForm.hospital,
            title: this.regForm.title,
            email: this.regForm.email,
            verificationCode: this.regForm.verificationCode,
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                duration: 2000,
                message: '注册成功'
              })
              this.showRegBox = false
            } else {
              this.$message({
                type: 'error',
                duration: 2000,
                message: res.msg
              })
            }
          }).catch(err => {})
        }
      })
    },
    sendCaptcha() {
      if (this.regForm.email === '') {
        this.$message({
          type: 'error',
          duration: 2000,
          message: '邮箱不能为空'
        })
        return
      }
      if (this.countTxt!=='验证') {
        return
      }
      this.$post(this.$Url.account.sendCaptcha, {
        email: this.regForm.email,
        mailType: 'REGISTERED'  
      }).then(res => {
        
        if (res.status !== 200) {
          this.$message({
            type: 'error',
            duration: 2000,
            message: res.msg
          })
        } else {
          this.$message({
            type: 'success',
            duration: 2000,
            message: '验证码发送成功，请登录邮箱查看'
          })
          let seconds = 60
          this.countTxt = seconds + 's'
          let s = setInterval(() => {
            if (seconds > 0) {
              seconds--
            } else {
              clearInterval(s)
              this.countTxt = '验证'
              return
            }
            this.countTxt = seconds + 's'
          }, 1000)
        }
      }).catch(err => {})
    },
  },
  beforeMount() {
    let query = this.$route.query
    if (query && query.register) {
      this.showRegBox = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.main {
  position: relative;
  width: 100%;
  height: 833px;
  margin-bottom: 4px;
  background-color: $bgColor1;
  .box {
    display: flex;
    min-width: 1000px;
    max-width: 1400px;
    height: 100%;
    margin: 0 auto;
    .left {
      position: relative;
      flex: .5;
      .aside {
        position: absolute;
        top: 50%;
        right: 20px;
        width: 470px;
        margin-top: -250px;
        h4 {
          width: 100%;
          height: 40px;
          margin-bottom: 4px;
          text-align: left;
          font-family: NotoSansHans-Bold;
          font-style: italic;
          font-weight: normal;
          font-size: 46px;
          // letter-spacing: 1px;
          color: #02a7f0;
          img {
            position: absolute;
            left: -2px;
            display: inline-block;
            width: 150px;
            margin-left: 0;
          }
        }
        p {
          margin-bottom: 26px;
          // letter-spacing: 1px;
          font-size: 36px;
          color: $fontColor2;
        }
        img {
          display: block;
          width: 550px;
          margin-left: -66px;
        }
      }
    }
    .right {
      position: relative;
      flex: .5;
      .login-box, .reg-box {
        position: absolute;
        top: 184px;
        left: 90px;
        width: 512px;
        border-radius: 36px;
        box-shadow: 0 0px 14px 4px rgba(2, 167, 240, 0.1);
        background-color: #fff;
        .title {
          position: relative;
          width: 100%;
          padding: 30px 0 26px;
          text-align: center;
          font-family: NotoSansHans-Medium;
          font-size: 28px;
          i {
            position: absolute;
            top: 47px;
            right: 20px;
            font-size: 22px;
            cursor: pointer;
          }
        }
        .login-form, .reg-form {
          padding: 0 30px;
        }
        .elformitem1 {
          display: inline-block;
          width: 48%;
          
        }
        .elbtn {
          width: 240px;
          height: 60px;
          line-height: 60px;
          border-radius: 36px;
          margin: 20px auto 18px;
          text-align: center;
          text-indent: 14px;
          letter-spacing: 14px;
          font-family: NotoSansHans-Medium;
          font-size: 24px;
          color: #fff;
          background-image: $bgGradient2;
          cursor: pointer;
        }
        .bottom {
          width: 100%;
          height: 72px;
          line-height: 72px;
          border-bottom-left-radius: 36px;
          border-bottom-right-radius: 36px;
          text-align: center;
          background-color: $bgColor4;
          p {
            position: relative;
            font-size: 24px;
            color: #fff;
            cursor: pointer;
            &:after {
              position: absolute;
              bottom: 13px;
              left: 50%;
              width: 270px;
              height: 1px;
              margin-left: -135px;
              background-color: $bgColor2;
              content: '';
            }
          }
        }
      }
      .reg-box {
        top: 80px;
        .elbtn {
          text-indent: 0;
          // letter-spacing: 1px;
        }
      }
    }
  }
}
.forgot {
  height: 25px;
  margin-top: -10px;
  text-align: right;
  font-size: 18px;
  span {
    display: inline-block;
    cursor: pointer;
  }
}
</style>