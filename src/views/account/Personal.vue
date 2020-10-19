<template>
  <div>
    <vLoginHeader/>
    <div class="main">
      <div class="box">
        <h4>信息修改</h4>
        <div class="container">
          <div class="left">
            <div class="photo">
              <img v-if="imgSrc==='default'" src="../../assets/user-photo.png" alt="">
              <img v-if="imgSrc!=='default'&&imgSrc!==''" :src="imgSrc" alt="">
            </div>
            <el-upload
              class="upload-btn"
              :action="$Url.account.upload"
              :show-file-list="false"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-upload="beforeAvatarUpload"
              :http-request="upload">
              <div class="photo-btn">更换头像</div>
            </el-upload>
            <p class="update-p">
              <span @click="handleShowChangePsd">修改密码</span>
            </p>
          </div>
          <div class="right">
            <el-form class="user-form" ref="userForm" :rules="userRules" :model="userForm" label-width="120px">
              <el-form-item label="昵称：" prop="nickName">
                <el-input class="elinput" v-model="userForm.nickName" placeholder="请输入姓名/昵称"
                  readonly onfocus="this.removeAttribute('readonly');" onblur="this.setAttribute('readonly',true);">
                </el-input>
              </el-form-item>
              <el-form-item label="医院：" prop="hospital">
                <el-input class="elinput" v-model="userForm.hospital" placeholder="请输入医院">
                </el-input>
              </el-form-item>
              <el-form-item label="职称：" prop="title">
                <el-input class="elinput" v-model="userForm.title" placeholder="请输入职称">
                </el-input>
              </el-form-item>
              <el-form-item label="邮箱：" prop="email">
                <el-input class="elinput" v-model="userForm.email" placeholder="请输入邮箱">
                </el-input>
              </el-form-item>
              <el-form-item label="简介：" prop="synopsis">
                <el-input class="elinput eltextarea" v-model="userForm.synopsis" type="textarea" :autosize="{ minRows: 3, maxRows: 3}" resize="none" placeholder="个人简介">
                </el-input>
              </el-form-item>
            </el-form>
            <div class="bottom">
              <div class="elbtn" @click="handleSave">保存修改</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ChangePassword ref="changePsd"/>
    <vFooter/>
  </div>
</template>

<script>
import vLoginHeader from '@/components/common/vLoginHeader'
import vFooter from '@/components/common/vFooter'
import axios from 'axios'
import ChangePassword from './ChangePassword'


export default {
  inject: ['reload'],
  components: {
    vLoginHeader,
    vFooter,
    ChangePassword
  },
  data() {
    return {
      userForm: {
        nickName: '',
        hospital: '',
        title: '',
        email: '',
        synopsis: '',
        userName: '',
      },
      userRules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        hospital: [
          { required: true, message: '请输入医院', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '请输入职称', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
      },
      headImgUrl: '',
      imgSrc: ''
    }
  },
  methods: {
    init() {
      this.$post(this.$Url.account.userInfo).then(res => {
        let data = res.data
        if (res.status === 200 && data) {
          this.userForm = data
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
              localStorage.setItem('photo', rs)
            })
          } else {
            this.imgSrc = 'default'
          }
        }
      }).catch(err => {})
    },
    // 头像上传
    upload(param) {
      let formData = new FormData()
      formData.append('file', param.file)
      let config = {
        headers: { 'Content-Type': 'multipart/form-data'}
      }
      this.$post(this.$Url.account.upload, formData, config).then(res => {
        let data = res.data
        if (data) {
          this.imgSrc = `${this.$Url.account.showImg}?fileName=${data}`
          this.headImgUrl = data
          this.handleSave()
          
        }
        
      })
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview(file) {
      // console.log(file)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message({
          type: 'error',
          message: '上传头像图片大小不能超过 2MB!',
          duration: 2000
        })
      }
      return isLt2M
    },
    handleSave() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          this.$post(this.$Url.account.updateUser, {
            headImgUrl: this.headImgUrl,
            nickName: this.userForm.nickName,
            hospital: this.userForm.hospital,
            title: this.userForm.title,
            email: this.userForm.email,
            synopsis: this.userForm.synopsis,
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                duration: 2000,
                message: res.msg
              })
              this.reload()
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
    handleShowChangePsd() {
      this.$refs.changePsd.init()
    }
  },
  mounted() {
    this.init()
  },

}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.main {
  position: relative;
  width: 100%;
  padding: 80px 0;
  background-color: $bgColor1;
  .box {
    position: relative;
    width: 800px;
    padding: 0 30px 30px;
    margin: 0 auto;
    box-shadow: 0 0px 14px 4px rgba(2, 167, 240, 0.1);
    background-color: #fff;
    h4 {
      position: relative;
      width: 100%;
      padding-top: 20px;
      padding-bottom: 20px;
      text-align: left;
      font-weight: normal;
      font-family: NotoSansHans-Medium;
      font-size: 24px;
      color: #000;
    }
    .container {
      display: flex;
      .left {
        flex: .4;
        text-align: center;
        .photo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 140px;
          height: 140px;
          margin-top: 70px;
          img {
            display: block;
            max-width: 100%;
            max-height: 100%;
          }
        }
        .photo-btn {
          width: 177px;
          line-height: 50px;
          border-radius: 36px;
          margin-top: 20px;
          text-align: center;
          font-family: NotoSansHans-Medium;
          font-size: 24px;
          color: #fff;
          background-color: $bgColor15;
          cursor: pointer;
        }
        .update-p {
          margin-top: 14px;
          font-size: 20px;
          span {
            cursor: pointer;
            &:hover {
              color: $mainColor;
            }
          }
        }
      }
      .right {
        flex: .6;
      }
    }
  }
}
.bottom {
  position: relative;
  padding-left: 100px;
  text-align: center;
  .elbtn {
    display: inline-block;
    width: 240px;
    height: 60px;
    line-height: 60px;
    border-radius: 36px;
    margin: 0 10px 18px;
    text-align: center;
    font-family: NotoSansHans-Medium;
    font-size: 24px;
    color: #fff;
    background-image: $bgGradient2;
    cursor: pointer;
  }
}
</style>