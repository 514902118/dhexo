<template>
  <div>
    <vLoginHeader/>
    <div class="box">
      <ul class="step">
        <li><div>1</div><p>填写邮箱</p></li>
        <li><div>2</div><p>身份验证</p></li>
        <li><div>3</div><p>设置新密码</p></li>
        <li><div>4</div><p>完成</p></li>
      </ul>
    </div>
    <div class="main">
      <div class="from-box" :class="{focus: emailFocus, blur: !emailFocus}">
        <el-form class="form" ref="form" :rules="rules" :model="form">
          <el-form-item prop="email">
            <el-input class="elinput elinput3" v-model="form.email" placeholder="请输入邮箱" @input="emailFunc">
              <i slot="prefix" class="el-input__icon el-icon-message"></i>
              <span slot="append" class="elinput3-append" @click="sendCaptcha">{{countTxt}}</span>
            </el-input>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <el-input class="elinput" v-model="form.verificationCode" placeholder="请输入邮箱验证码">
              <i slot="prefix" class="iconfont icon-yanzhengma el-input__icon"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="elinput" v-model="form.password" type="password" placeholder="请输入密码">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="againPassword">
            <el-input class="elinput" v-model="form.againPassword" type="password" placeholder="再次输入密码">
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="elbtn" @click="handleSubmit">确&nbsp;&nbsp;认</div>
          </el-form-item>
        </el-form>
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
    return {
      form: {
        email: '',
        verificationCode: '',
        password: '',
        againPassword: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        verificationCode: [
          { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        againPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
        ],
      },
      countTxt: '验证',
      emailFocus: false
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$post(this.$Url.account.forgetPassword, {
            email: this.form.email,
            verificationCode: this.form.verificationCode,
            password: this.form.password,
            againPassword: this.form.againPassword,
            
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                duration: 2000,
                message: '修改成功'
              })
              this.$router.push({
                name: 'login'
              })
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
      if (this.form.email === '') {
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
        email: this.form.email,
        mailType: 'FORGET_PASSWORD'  
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
    emailFunc() {
      if (this.form.email !== '') {
        this.emailFocus = true
      } else {
        this.emailFocus = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.box {
  position: relative;
  width: 100%;
  padding: 35px 0;
  background-color: $bgColor1;
  .step {
    position: relative;
    list-style: none;
    display: flex;
    width: 1200px;
    margin: 0 auto;
    li {
      position: relative;
      flex: .25;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      &:after {
        position: absolute;
        top: 50%;
        right: -33%;
        width: 66%;
        height: 2.5px;
        margin-top: -21px;
        background-color: #3bcaff;
        content: "";
      }
      &:last-of-type {
        &:after {
          content: none;
        }
      }
      div {
        width: 52px;
        height: 52px;
        line-height: 52px;
        border-radius: 50%;
        text-align: center;
        font-size: 22px;
        color: #fff;
        background-color: $bgColor5;
      }
      p {
        width: 100%;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        color: $fontColor5;
      }
    }
  }
}
.main {
  position: relative;
  .from-box {
    position: relative;
    width: 460px;
    margin: 80px auto 100px;
    .form  {
      padding: 0 30px;
    }
    .elbtn {
      width: 200px;
      height: 48px;
      line-height: 48px;
      border-radius: 36px;
      margin: 28px auto 18px;
      text-align: center;
      font-family: NotoSansHans-Medium;
      font-size: 24px;
      color: #fff;
      background-image: $bgGradient2;
      cursor: pointer;
    }
  }
}
</style>