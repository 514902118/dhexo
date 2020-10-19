<template>
  <el-dialog
    title="VCF上传"
    :visible.sync="dialogUpLoad"
    width="682px"
    append-to-body
    center
    :close-on-click-modal="false"
    :before-close="handleClose"
    class="eldialog upload-dialog">
    <el-form class="upload-form" ref="form" :rules="rules" :model="form" label-width="200px">
      <el-form-item label="命名：" prop="jobName">
        <el-input class="elinput" v-model="form.jobName" placeholder="请输入job name">
        </el-input>
      </el-form-item>
      <el-form-item label="基因组版本：">
        <div class="radio-box">
          <el-radio v-model="form.geneType" label="hg19">Hg19</el-radio>
          <el-radio v-model="form.geneType" label="hg38">Hg38</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="关注疾病：" prop="omimId">
        <el-input class="elinput" v-model="form.omimId" placeholder="请输入疾病名字/OMIM id">
        </el-input>
      </el-form-item>
      <el-form-item label="症状：" prop="">
        <div class="select-box2">
          <el-select v-model="form.symptomType" clearable placeholder="请选择分类">
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.symptomType"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="select-box2" :class="{marginBottom: form.symptom.length>0}">
          <el-select v-model="form.symptom" multiple filterable clearable placeholder="请选择症状">
            <el-option
              v-for="item in options2"
              :key="item.symptom"
              :label="item.symptom"
              :value="item.symptom">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="VCF：" prop="vcf">
        <el-upload
          class="uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :on-exceed="handleExceed"
          :show-file-list="true"
          :before-upload="beforeUpload"
          :on-change="handleChange"
          :file-list="fileList"
          :http-request="handleUpload">
          <el-button size="small" type="primary" class="uploader-btn">点击添加VCF文件</el-button>
        </el-upload>
        <!-- <el-input class="elinput" v-model="form.name" placeholder="请输入疾病名字/OMIM id">
        </el-input> -->
      </el-form-item>
    </el-form>
    <p class="tips">*上传多个疾病名/OMIM id时请用英文逗号分开</p>
    <div class="bottom">
      <div class="elbtn" @click="handleClose">取消</div>
      <div class="elbtn" @click="onSubmit">上传</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  inject: ['reload'],
  props: {
    patientId: {
      type: Number
    }
  },
  data() {
    // 校验omimId
    var checkOmimId = (rule, value, callback) => {
      if (value !== '' && (value.indexOf('，') > -1)) {
        return callback(new Error('不能含有中文逗号'))
      } else {
        callback()
      }
    }
    // 校验 症状类型和症状
    var checkSymptom = (rule, value, callback) => {
      if (this.form.symptomType === '') {
        return callback(new Error('请选择症状类型'))
      } else if (this.form.symptom === ''){
        return callback(new Error('请选择症状'))
      } else {
        callback()
      }
    }
    var checkVcf = (rule, value, callback) => {
      if (this.form.vcf === '') {
        return callback(new Error('请上传VCF文件'))
      } else {
        callback()
      }
    }
    return {
      dialogUpLoad: false,
      form: {
        jobName: '',
        geneType: 'hg19',
        omimId: '',
        symptom: '',
        symptomType: '',
        vcf: ''
      },
      rules: {
        jobName: [
          { required: true, message: '请输入job name', trigger: 'blur' },
        ],
        omimId: [
          { validator: checkOmimId, trigger: 'blur' },
        ],
        symptom: [
          { validator: checkSymptom, trigger: 'change' },
        ],
        vcf: [
          { validator: checkVcf, trigger: 'blur' },
        ],
      },
      value1: '',
      options1: [],
      value2: '',
      options2: [],
      fileList: []
    }
  },
  methods: {
    init() {
      this.dialogUpLoad = true
    },
    // 获取症状类型
    querySymptomType() {
      this.$get(this.$Url.vcf.querySymptomType).then(res => {
        let data = res.data
        if (data) {
          this.options1 = data
        }
        
      }).catch(err => {})
    },
    // 获取症状
    querySymptom(id) {
      this.$get(this.$Url.vcf.querySymptom, {
        id: Number(id)
      }).then(res => {
        let data = res.data
        if (data) {
          this.options2 = data
        }
        
      }).catch(err => {})
    },
    // 上传
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('jobName', this.form.jobName.trim())
          formData.append('omimId', this.form.omimId.trim())
          formData.append('patientId', this.patientId)
          formData.append('geneType', this.form.geneType)
          formData.append('symptom', this.form.symptom)
          formData.append('symptomType', this.form.symptomType)
          formData.append('vcf', this.form.vcf)
          let config = {
            headers: { 'Content-Type': 'multipart/form-data'}
          }
          this.$post(this.$Url.vcf.upload, formData, config).then(res => {
            this.dialogUpLoad = false
            this.$emit('updateSuccess', true)
            if (res.status === 200) {
              this.$message({
                type: 'success',
                duration: 2000,
                message: '上传完成'
              })
              this.form = {
                jobName: '',
                geneType: 'hg19',
                omimId: '',
                symptom: '',
                symptomType: '',
                vcf: ''
              }
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
    handleUpload(params) {
      this.form.vcf = params.file
      setTimeout(() => {
        this.$message({
          type: 'success',
          duration: 2000,
          message: `文件添加成功`
        })
      }, 1000)
      
    },
    beforeUpload(file) {
      let arr = file.name.split('.')
      const isVCF = arr[arr.length - 1] === 'vcf'

      const isLt1024M = file.size / 1024 / 1024 < 1024

      if (!isLt1024M) {
        this.$message.error('上传VCF文件大小不能超过 1G!');
      }

      return isVCF && isLt1024M
    },
    handleExceed(files, fileList) {
      this.$message.warning('同时只能上传一个文件，请删除原有VCF文件再进行上传')
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handleClose() {
      this.dialogUpLoad = false
      this.fileList = []
      this.form = {
        jobName: '',
        geneType: 'hg19',
        omimId: '',
        symptom: '',
        symptomType: '',
        vcf: ''
      }
    }
  },
  watch: {
    'form.symptomType'() {
      this.options2 = []
      this.querySymptom(this.form.symptomType)
    }
  },
  mounted() {
    this.querySymptomType()
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.upload-form {
  padding-right: 30px;
  .radio-box {
    padding-left: 14.5%;
    height: 60px;
    line-height: 60px;
  }
  .multiple-box {
    display: flex;
    height: 49px;
    line-height: 49px;
    border: 1px solid $fontColor12;
    border-top-right-radius: 36px;
    border-bottom-right-radius: 36px;
    .select-box {
      flex: 1;
      border: 0;
      border-radius: 36px;
      overflow: hidden;
      background-color: #fff;
    }
  }
  .uploader {
    margin-top: 7px;
    .uploader-btn {
      font-size: 24px;
    }
  }
}
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
.tips {
  padding: 4px 30px;
  text-align: left;
  font-size: 14px;
  color: red;
}
.select-box2 {
  width: 100%;
}
.marginBottom {
  margin-bottom: 60px;
}
</style>