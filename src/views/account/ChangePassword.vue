<template>
  <el-dialog
    title="修改密码"
    :visible.sync="dialogChange"
    width="682px"
    append-to-body
    center
    :close-on-click-modal="false"
    class="eldialog change-dialog">
    <el-form class="change-form" ref="form" :rules="rules" :model="form" label-width="200px">
      <el-form-item label="旧密码：" prop="primevalPassword">
        <el-input class="elinput" v-model="form.primevalPassword" type="password" minlength="6" maxlength="16" placeholder="请输入旧密码">
        </el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input class="elinput" v-model="form.newPassword" type="password" minlength="6" maxlength="16" placeholder="请输入新密码">
        </el-input>
      </el-form-item>
      <el-form-item label="重复新密码：" prop="againPassword">
        <el-input class="elinput" v-model="form.againPassword" type="password" minlength="6" maxlength="16" placeholder="请再次输入新密码">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="bottom">
      <div class="elbtn" @click="dialogChange=false">取消</div>
      <div class="elbtn" @click="onSubmit">确定</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    var checkAgainNewPsd = (rule, value, callback) => {
      if (this.form.againPassword === '') {
        return callback(new Error('请再次输入新密码'))
      }
      if (this.form.newPassword !== this.form.againPassword) {
        callback(new Error('两次新密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      dialogChange: false,
      form: {
        primevalPassword: '',
        newPassword: '',
        againPassword: ''
      },
      rules: {
        primevalPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        againPassword: [
          { validator: checkAgainNewPsd, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    init() {
      this.dialogChange = true
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$post(this.$Url.account.updatePassword, {
            primevalPassword: this.form.primevalPassword,
            newPassword: this.form.newPassword,
            againPassword: this.form.againPassword,
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                duration: 2000,
                message: res.data
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.bottom {
  position: relative;
  text-align: center;
  .elbtn {
    display: inline-block;
    width: 190px;
    height: 60px;
    line-height: 60px;
    border-radius: 36px;
    margin: 28px 10px 18px;
    text-align: center;
    font-family: NotoSansHans-Medium;
    font-size: 24px;
    color: #fff;
    background-image: $bgGradient2;
    cursor: pointer;
  }
}
</style>