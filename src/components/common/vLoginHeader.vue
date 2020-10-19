<template>
  <header>
    <div class="logo">
      <img src="../../assets/logo.png" alt="">
    </div>
    <div class="no-login">
      <span>{{title}}</span>
      <div class="link-box">
        <router-link v-if="!showUserBox && $route.name === 'patientsInterpretation'" :to="{ name: 'geneticInterpretation' }" tag="span"><i class="el-icon-d-arrow-left"></i>返回上一页</router-link>
        <router-link v-if="!showUserBox" :to="{ name: 'home' }" tag="span"><i class="el-icon-d-arrow-left"></i>返回首页</router-link>
      </div>
      <span v-if="showUserBox" class="user-box" style="text-align:center">
        <UserBox/>
      </span>
    </div>
  </header>
</template>

<script>
import UserBox from '../UserBox'

export default {
  components: {
    UserBox
  },
  data() {
    return {
      title: '',
      showUserBox: false
    }
  },
  methods: {
    getTitle() {
      let name = this.$route.name
      switch (name) {
        case 'forgot':
          this.title = '忘记密码'
          // if (this.$route.query.update) {
          //   this.title = '修改密码'
          // } else {
          //   this.title = '忘记密码'
          // }
          
          break;
        case 'favorite':
          this.title = '收藏夹'
          this.showUserBox = true
          break;
        case 'personal':
          this.title = '个人信息'
          break;
        case 'patientsInfo':
          this.title = '患者信息'
          this.showUserBox = true
          break;
        case 'patientsInterpretation':
          this.title = '解读结果'
          break;
        case 'patientsReport':
          this.title = '解析结果下载'
          break;
        default:
          this.title = '欢迎使用'
          break;
      }
    }
  },
  mounted() {
    this.getTitle()
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
header {
  display: flex;
  width: 100%;
  max-width: 1270px;
  height: 70px;
  line-height: 70px;
  margin: 0 auto;
  .logo {
    position: relative;
    width: 200px;
    text-align: center;
    font-family: NotoSansHans-Bold;
    font-size: 34px;
    font-style: italic;
    color: $mainColor;
    &:after {
      position: absolute;
      top: 50%;
      right: 20px;
      width: 1px;
      height: 40px;
      margin-top: -21px;
      background-color: $bgColor2;
      content: '';
    }
  }
  .no-login {
    flex: 1;
    padding-right: 20px;
    text-align: left;
    .link-box {
      float: right;
      span {
        margin-left: 10px;
        font-family: NotoSansHans-Light;
        font-weight: normal;
        color: $fontColor2;
        cursor: pointer;
        &:hover {
          color: $mainColor;
        }
      }
    }
    span {
      font-family: NotoSansHans-Medium;
      font-size: 24px;
      color: #000;
      &:nth-of-type(2) {
        float: right;
        font-weight: normal;
        color: $fontColor2;
        cursor: pointer;
        &:hover {
          color: $mainColor;
        }
        .user-box {
          &:hover {
            color: #000;
          }
        }
      }
    }
  }
}

</style>