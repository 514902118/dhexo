<template>
  <div>
    <vLoginHeader />
    <div class="top">
      <div class="box">
        <div class="elbtn" @click="showDialogAdd">新&nbsp;&nbsp;&nbsp;建</div>
        <div class="elbtn" @click="handleUpdateAll">修&nbsp;&nbsp;&nbsp;改</div>
      </div>
    </div>
    <div class="main">
      <div class="query-details patients-info">
        <div class="block block1">
          <div class="patients-tab">
            <p class="tit">
              <span></span>
              <span>姓名</span>
              <span>性别</span>
              <span>年龄</span>
              <span class="idcard">身份证</span>
              <span>症状</span>
              <span>家族病史</span>
              <span>解读结果</span>
              <span>解读时间</span>
              <span>操作</span>
            </p>
            <ul class="context">
              <template v-if="patientList.length > 0">
                <li v-for="(item, index) in patientList" :key="index">
                  <i class="el-icon-check edit-btn" :class="{'is-edit': item.disabled}"
                    @click="handleUpdate(item, index)"></i>
                  <p>{{index + 1}}</p>
                  <p>
                    <el-input v-model="item.patientName" :disabled="item.disabled"></el-input>
                  </p>
                  <p>
                    <el-input v-model="item.showSex" :disabled="item.disabled"></el-input>
                  </p>
                  <p>
                    <el-input v-model="item.age" :disabled="item.disabled"></el-input>
                  </p>
                  <p class="idcard">{{item.idCard}}</p>
                  <p>
                    <el-tooltip placement="top" effect="light">
                      <div slot="content" class="tip-style">{{item.symptom}}</div>
                      <el-input v-model="item.symptom" :disabled="item.disabled"></el-input>
                    </el-tooltip>
                  </p>
                  <p>
                    <el-input v-model="item.familyMedicalHistory" :disabled="item.disabled"></el-input>
                  </p>
                  <p>{{item.isResolve}}</p>
                  <p>{{item.showCreateTime}}</p>
                  <p class="tools">
                    <span @click="handleDeletePatient(item)">删除</span>
                  </p>
                </li>
              </template>
              <template v-else>
                <li class="no-data">暂无数据</li>
              </template>
            </ul>
            <!-- 分页 -->
            <div class="pagination">
              <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                :current-page.sync="patientListParams.pageNum" @current-change="getCurrentPage" class="el-pagination">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新建 -->
    <el-dialog title="新建患者" :visible.sync="dialogAdd" width="682px" append-to-body center :close-on-click-modal="false"
      :before-close="closeAddDialog" class="eldialog add-dialog">
      <el-form v-if="showDialogAddForm" class="add-form" ref="addForm" :rules="rules" :model="addForm"
        label-width="200px">
        <el-form-item label="姓名：" prop="patientName">
          <el-input class="elinput" v-model="addForm.patientName" placeholder="请输入姓名">
          </el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <div class="radio-box">
            <el-radio v-model="addForm.sex" label="MAN">男</el-radio>
            <el-radio v-model="addForm.sex" label="GIRL">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input class="elinput" v-model.number="addForm.age" placeholder="请输入年龄">
          </el-input>
        </el-form-item>
        <el-form-item label="身份证：" prop="idCard">
          <el-input class="elinput" v-model="addForm.idCard" placeholder="请输入身份证">
          </el-input>
        </el-form-item>
        <el-form-item label="症状：" prop="">
          <el-input class="elinput" v-model="addForm.symptom" placeholder="请输入症状">
          </el-input>
        </el-form-item>
        <el-form-item label="家族病史：" prop="familyMedicalHistory">
          <el-input class="elinput" v-model="addForm.familyMedicalHistory" placeholder="请输入家族病史">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="bottom">
        <div class="elbtn" @click="closeAddDialog">取消</div>
        <div class="elbtn" @click="addPatient">确定</div>
      </div>
    </el-dialog>
    <AsideFix />
    <vFooter />
  </div>
</template>

<script>
import moment from 'moment'
import vLoginHeader from '@/components/common/vLoginHeader'
import vFooter from '@/components/common/vFooter'
import AsideFix from '@/components/AsideFix'
import checkIdCardFunc from '@/utils/checkIdCard'

export default {
  inject: ['reload'],
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入年龄'));
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value > 200) {
          callback(new Error('年龄不能超过200'));
        } else {
          callback();
        }
      }
    }
    var checkIdCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入身份证'));
      }
      let { pass, tip } = checkIdCardFunc(value)
      if (!pass) {
        callback(new Error(tip))
      } else {
        callback()
      }
      callback()
    }
    return {
      once: 0,
      itemInit: '',
      patientList: [],
      patientListParams: {
        isAgeAsc: 'asc',
        isDateAsc: 'asc',
        isNameAsc: 'asc',
        pageNum: 1,
        patientName: ''
      },
      total: 0,
      pageSize: 10,
      info: {
        patientName: '张三',
        sex: '女',
        age: 20,
        idCard: '',
        t1: '头痛',
        t2: '无',
        disabled: true
      },
      moreArr: 0,
      dialogAdd: false,
      addForm: {
        patientName: '',
        sex: 'MAN',
        age: '',
        idCard: '',
        symptom: '',
        familyMedicalHistory: ''
      },
      rules: {
        patientName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'change' },
        ],
        age: [
          { validator: checkAge, trigger: 'blur' },
        ],
        idCard: [
          { validator: checkIdCard, trigger: 'blur' },
        ],
        symptom: [
          { required: true, message: '症状不能为空', trigger: 'blur' },
        ],
      },
      showDialogAddForm: false
    }
  },
  components: {
    vLoginHeader,
    vFooter,
    AsideFix
  },
  methods: {
    // 新建患者
    showDialogAdd () {
      this.dialogAdd = true
      this.showDialogAddForm = true
    },
    addPatient () {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.$post(this.$Url.account.addPatient, {
            patientName: this.addForm.patientName,
            sex: this.addForm.sex,
            age: Number(this.addForm.age),
            idCard: this.addForm.idCard,
            symptom: this.addForm.symptom,
            familyMedicalHistory: this.addForm.familyMedicalHistory
          }).then(res => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                duration: 2000,
                message: res.data
              })
              this.dialogAdd = false
              this.addForm = {
                patientName: '',
                sex: 'MAN',
                age: ''
              }
              this.reload()
            } else {
              this.$message({
                type: 'error',
                duration: 2000,
                message: res.msg
              })
            }
          }).catch(err => { })
        }
      })
    },
    closeAddDialog () {
      this.dialogAdd = false
      this.$refs['addForm'].resetFields()
    },
    // 患者列表
    getPatientList () {
      this.$post(this.$Url.account.patientList, this.patientListParams).then(res => {
        if (res.status === 200) {
          let data = res.data
          if (data) {
            data.list.forEach(v => {
              v.disabled = true
              v.showSex = v.sex === 1 ? '男' : '女'
              if (!v.symptom) {
                v.symptom = '无'
              }
              if (!v.familyMedicalHistory) {
                v.familyMedicalHistory = '无'
              }
              v.isResolve = v.isResolve === 1 ? '已解读' :
                v.isResolve === 2 ? '未解读' : '正在解读'

              let time = moment(data.createTime).format('YYYY MM DD')
              let arr = time.split(' ')
              v.showCreateTime = `${arr[0]}/${arr[1]}/${arr[2]}`
            })
            this.patientList = data.list
            this.totle = data.total
            this.pageSize = data.pageSize
          }

        } else {
          this.$message({
            type: 'error',
            duration: 2000,
            message: res.msg
          })
        }
      }).catch(err => { })
    },
    // 分页
    getCurrentPage (val) {
      this.patientListParams.pageNum = val
      this.getPatientList()
    },
    handleUpdate (item, index, isMore = false) {
       if (item.patientName === '') {
          this.$message({
            type: 'error',
            duration: 2000,
            message: '患者姓名不能为空'
          })
          return
        } else if (item.showSex !== '男' && item.showSex !== '女') {
          this.$message({
            type: 'error',
            duration: 2000,
            message: '请输入正确的患者性别'
          })
          return
        } else if (Number(item.age) > 300) {
          this.$message({
            type: 'error',
            duration: 2000,
            message: '请输入正确的患者年龄'
          })
          return
        }

      if (item.disabled) {
        this.$set(this.patientList[index], 'disabled', false)
      } else {
        let patientName = item.patientName
        let sex = item.showSex === '男' ? 'MAN' : 'GIRL'
        let age = item.age
        let idCard = item.idCard
        let symptom = item.symptom
        let familyMedicalHistory = item.familyMedicalHistory
        let patientId = item.patientId
        
        this.$post(this.$Url.account.patientUpdate, {
          patientName,
          patientId,
          sex,
          age,
          idCard,
          symptom,
          familyMedicalHistory
        }).then(res => {
          if (res.status === 200) {
            if (!isMore) {
              this.$message({
                type: 'success',
                duration: 2000,
                message: res.data
              })
            } else {
              this.moreArr++
            }
            this.$set(this.patientList[index], 'disabled', true)



          } else {
            this.$message({
              type: 'error',
              duration: 2000,
              message: res.msg
            })
          }
        }).catch(err => { })
      }
    },
    handleUpdateAll () {
      let isHasDis = this.patientList.filter(item => item.disabled === false)
      if (isHasDis.length === this.patientList.length) {
        this.moreArr = 0
        this.patientList.forEach((v, i) => {
          this.handleUpdate(v, i, true)
        })
      } else if (isHasDis.length > 0) {
        this.patientList.forEach(v => {
          v.disabled = false
        })
      } else {
        this.moreArr = 0
        this.patientList.forEach((v, i) => {
          this.handleUpdate(v, i, true)
        })
      }

    },
    toInterpretation (item) {
      let url = this.$router.resolve({
        name: 'patientsInterpretation',
        query: {
          patientName: item.patientName,
          vcfId: item.jobId
        }
      })
      window.open(url.href, '_blank')
    },
    // 删除患者
    handleDeletePatient (item) {
      this.$confirm('是否删除患者?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$get(this.$Url.account.deletePatient, {
          patientId: Number(item.patientId)
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: res.data
            })
            this.reload()
          } else {
            this.$message({
              type: 'error',
              duration: 2000,
              message: res.msg
            })
          }
        }).catch(err => { })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
  },
  watch: {
    moreArr () {
      if (this.moreArr > 0 && this.moreArr >= this.patientList.length) {
        this.$message({
          type: 'success',
          duration: 2000,
          message: '修改患者信息成功!'
        })
      }
    }
  },
  mounted () {
    this.getPatientList()
  }
}
</script>

<style lang="scss" scoped>
@import "@/static/_common";
.top {
  position: relative;
  width: 100%;
  margin-top: 60px;
  margin-bottom: 20px;
  .box {
    display: block;
    width: 1450px;
    height: 100%;
    margin: 0 auto;
    text-align: right;
    .elbtn {
      display: inline-block;
      width: 190px;
      height: 60px;
      line-height: 60px;
      border-radius: 36px;
      margin-left: 20px;
      text-align: center;
      font-family: NotoSansHans-Medium;
      font-size: 24px;
      color: #fff;
      background-image: $bgGradient2;
      cursor: pointer;
    }
  }
}
.patients-info {
  width: 1450px;
  min-width: 1450px;
}
.patients-tab {
  width: 100%;
  margin-bottom: 126px;
  .tit {
    padding-left: 60px;
    padding-right: 20px;
    margin-bottom: 20px;
    span {
      &:nth-of-type(1) {
        flex: none;
        width: 50px;
      }
      &:nth-of-type(6),
      &:nth-of-type(7),
      &:nth-of-type(8) {
        flex: 1.7;
      }
    }
  }
  .context {
    border-radius: 0;
    border: 0;
    li {
      position: relative;
      width: calc(100% - 40px);
      padding: 20px;
      margin-left: 40px;
      margin-bottom: 10px;
      // background-color: $bgColor1;
      &:nth-of-type(2n-1) {
        background-color: $bgColor1;
      }
      .edit-btn {
        position: absolute;
        top: 50%;
        left: -36px;
        width: 24px;
        height: 24px;
        line-height: 24px;
        border-radius: 50%;
        margin-top: -12px;
        text-align: center;
        font-size: 15px;
        color: #fff;
        background-color: $bgColor5;
        cursor: pointer;
        &.is-edit {
          background-color: $fontColor10;
        }
      }
      p {
        line-height: 23px;
        padding: 0;
        &:nth-of-type(1) {
          flex: none;
          width: 50px;
          &:after {
            width: 0;
          }
        }
        &:nth-of-type(6),
        &:nth-of-type(7),
        &:nth-of-type(8) {
          flex: 1.7;
        }
        &:last-of-type {
          &:after {
            border: none;
          }
        }
        &:after {
          position: absolute;
          top: 50%;
          right: 0;
          width: 1px;
          height: 28px;
          margin-top: -14px;
          border-right: 1px solid $bgColor2;
          content: "";
        }
        &.show {
          &:hover {
            color: $fontColor8;
            cursor: pointer;
          }
        }
        &.tools {
          span {
            cursor: pointer;
          }
        }
      }
    }
  }
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
.idcard {
  flex: 1.5 !important;
}
.no-data {
  width: 100% !important;
  margin-left: 0 !important;
}
.add-form {
  padding-right: 30px;
  .radio-box {
    height: 49px;
    line-height: 49px;
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
</style>
<style lang="scss" scoped>
/**20210204--tony修改 */
.tip-style {
  padding: 0 8px;
  font-size: 18px;
  color: #656565;
}
</style>