<template>
  <div class="leave-message-box">
    <vLoginHeader/>
    <div class="main">
      <div class="box">
        <h4>留言</h4>
        <div class="container">
          <el-form class="message-form" ref="messageForm" :rules="messageRules" :model="messageForm" label-width="200px">
            <el-form-item label="标题：" prop="title">
              <el-input class="elinput" v-model="messageForm.title" placeholder="请输入标题/事项">
              </el-input>
            </el-form-item>
            <el-form-item label="内容：" prop="content">
              <el-input class="elinput" v-model="messageForm.content" placeholder="请输入留言内容">
              </el-input>
            </el-form-item>
            <el-form-item label="图片：">
              <div class="upload-box">
                <el-upload
                  v-for="(item, index) in imageUrlList"
                  :key="index"
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeUpload"
                  :http-request="upload">
                  <template v-if="item">
                    <div class="uploader-box">
                      <img :src="item" class="avatar">
                    </div>
                  </template>
                  <template v-else>
                    <div class="uploader-box" @click="handleCurrentIndex(index)">
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                      <p>上传图片</p>
                    </div>
                  </template>
                </el-upload>
              </div>
            </el-form-item>
          </el-form>
          <div class="bottom">
            <div class="elbtn" @click="handleSubmit">提&nbsp;&nbsp;&nbsp;交</div>
          </div>
        </div>
      </div>
    </div>
    <vFooter/>
  </div>
</template>

<script>
import axios from 'axios'
import vLoginHeader from '@/components/common/vLoginHeader'
import vFooter from '@/components/common/vFooter'

export default {
  inject: ['reload'],
  components: {
    vLoginHeader,
    vFooter,
  },
  data() {
    return {
      messageForm: {
        title: '',
        content: ''
      },
      messageRules: {
        title: [
          { required: true, message: '请输入标题/事项', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入留言内容', trigger: 'blur' },
        ],
      },
      imageUrlList: ['', '', '', ''],
      imageNameList: [],
      currentIndex: 0
    }
  },
  methods: {
    upload(param) {
      let formData = new FormData()
      formData.append('file', param.file)
      let config = {
        headers: { 'Content-Type': 'multipart/form-data'}
      }
      this.$post(this.$Url.account.upload, formData, config).then(res => {
        let data = res.data
        if (data) {
          axios.get(`${this.$Url.account.showImg}?fileName=${data}`, {
            responseType: 'arraybuffer'
          }).then(response => {
            return 'data:image/png;base64,' + btoa(
              new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
          }).then(rs => {
            this.$set(this.imageUrlList, this.currentIndex, rs)
            this.$set(this.imageNameList, this.currentIndex, data)
          })
        }
        
      })
    },
    handleAvatarSuccess(res, file) {
      // console.log(333, res)
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 6

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 6MB!');
      }
      return isLt2M;
    },
    // 提交
    handleSubmit() {
      this.$refs['messageForm'].validate((valid) => {
        if (valid) {
          let imgList = []
          for (let i in this.imageNameList) {
            if (this.imageNameList[i] !== '') {
              imgList.push(this.imageNameList[i])
            }
          }
          this.$post(this.$Url.message.leaveMessage, {
            title: this.messageForm.title,
            content: this.messageForm.content,
            imgList: imgList.join()
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                duration: 2000,
                message: '提交成功'
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
    handleCurrentIndex(index) {
      this.currentIndex = index
    }
  },
  mounted() {
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
      font-size: 28px;
      color: #000;
    }
    .container {
      margin-right: 120px;
      .upload-box {
        display: flex;
        .avatar-uploader {
          display: inline-block;
          margin-right: 20px;
        }
        .avatar-uploader .el-upload {
          text-align: center;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          .avatar {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
          }
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .uploader-box {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          width: 100px;
          height: 100px;
          .avatar-uploader-icon {
            width: 100%;
            padding-top: 18px;
            font-size: 37px;
            color: $fontColor12;
            width: 100px;
            text-align: center;
          }
          p {
            width: 100%;
            line-height: normal;
            margin-top: -15px;
            font-size: 15px;
            color: $fontColor12;
          }
        }
        .avatar {
          width: 100px;
          height: 100px;
          display: block;
        }
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
    margin: 10px 10px 18px;
    text-align: center;
    font-family: NotoSansHans-Medium;
    font-size: 24px;
    color: #fff;
    background-image: $bgGradient2;
    cursor: pointer;
  }
}
</style>