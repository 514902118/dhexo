<template>
  <div class="user-box">
    <div class="info" :class="{'active': showUserTools}" @click="showUserTools=!showUserTools">
      
      <span class="user-name">{{userName}}</span>
      <i class="user-logo">
        <img v-if="imgSrc==='default'" src="../assets/user-photo.png" alt="">
        <img v-if="imgSrc!=='default'&&imgSrc!==''" :src="imgSrc" alt="">
      </i>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <div v-show="showUserTools" class="user-tools">
      <router-link :to="{ name: 'patientsInfo'}" tag="p">
        <span>患者管理</span><i class="iconfont icon-guanli"></i>
      </router-link>
      <router-link :to="{ name: 'favorite'}" tag="p">
        <span>收藏夹</span><i class="iconfont icon-shoucangjia"></i>
      </router-link>
      <router-link :to="{ name: 'personal'}" tag="p">
        <span>个人信息</span><i class="iconfont icon-bianji"></i>
      </router-link>
      <p class="logout" ><span @click="logout">退出登录</span></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
var jwt = require('jsonwebtoken')

export default {
  inject: ['reload'],
  data() {
    return {
      showUserTools: false,
      userName: '',
      imgSrc: ''
    }
  },
  methods: {
    init() {
      let token = Cookies.get('token') && jwt.decode(Cookies.get('token'))
      if (token) {
        let sub = JSON.parse(token.sub)
        this.userName = sub.userName
        let photo = localStorage.getItem('photo')
        if (!photo) {
          this.getUserPhoto()
        } else {
          this.imgSrc = photo
        }
      }
    },
    getUserPhoto() {
      this.$post(this.$Url.account.userInfo).then(res => {
        let data = res.data
        if (res.status === 200 && data) {
          if (data.headImgUrl) {
            let config = {
              headers: {
                responseType: "arraybuffer"
              }
            }
            axios.get(`${this.$Url.account.showImg}?fileName=${data.headImgUrl}`, {
              responseType: 'arraybuffer'
            }).then(response => {
              return 'data:image/png;base64,' + btoa(
                new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
              )
            }).then(rs => {
              this.imgSrc = rs
              localStorage.removeItem('photo')
              localStorage.setItem('photo', rs)
            })
          } else {
            this.imgSrc = 'default'
          }
          
        }
      }).catch(err => {})
    },
    logout() {
      Cookies.remove('token')
      localStorage.removeItem('photo')
      this.$router.push({ name: 'login'})
      this.reload()
    }
  },
  mounted() {
    this.init()
    // 点击屏幕其他地方关闭下拉列表
    this.$Bus.$on('hideUserTools', (data) => {
      let length = $(data).parents('.user-box').length
      if (length <= 0) {
        this.showUserTools = false
      }
    })
  },
  destroyed() {
    this.$Bus.$off('hideUserTools')
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.user-box {
  position: relative;
  width: 300px;
  font-size: 15px;
  .info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: right;
    &:hover, &.active {
      color: $mainColor;
    }
    .user-logo {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      margin-left: 10px;
      img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .user-name {
      font-size: 24px;
    }
    i {
      width: 26px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .user-tools {
    position: absolute;
    top: 66px;
    right: 0;
    z-index: 2;
    width: 240px;
    padding-top: 4px;
    list-style: none;
    border-radius: 6px;
    box-shadow: 0 0px 14px 4px rgba(2, 167, 240, 0.1);
    font-size: 24px;
    background-color: #fff;
    &:hover {
      color: #000;
    }
    p {
      position: relative;
      line-height: 50px;
      padding: 0 20px;
      text-align: left;
      cursor: pointer;
      &:hover {
        color: $mainColor;
      }
      &.logout {
        position: relative;
        text-align: right;
        cursor: default;
        &:hover {
          color: initial;
        }
        &:before {
          position: absolute;
          top: 0;
          left: 5%;
          width: 90%;
          height: 1px;
          background-color: $bgColor6;
          content: '';
        }
        span {
          cursor: pointer;
          &:hover {
            color: $mainColor;
          }
        }
      }
    }
    i {
      float: right;
      width: 30px;
      line-height: 48px;
      text-align: center;
      font-size: 24px;
      &.icon-shoucangjia {
        font-size: 30px;
      }
      &.icon-bianji {
        font-size: 30px;
      }
    }
  }
}
</style>