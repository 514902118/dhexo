<template>
  <div>
    <vHeader/>
    <div class="task-box">
      <div class="box">
        <p><span>{{processCount.totalTask}}</span>患者</p>
        <p><span>{{processCount.completeTask}}</span>已完成</p>
        <p><span>{{processCount.processTask}}</span>正在解读</p>
        <p><span>{{processCount.notTask}}</span>未完成</p>
      </div>
    </div>
    <div class="query-box query-box2 query-box5">
      <el-input class="query-inp" v-model="queryInp" placeholder="请输入患者姓名" @keyup.enter.native="search">
        <i slot="append" class="el-icon-search query-icon" @click="search"></i>
      </el-input>
    </div>
    <div class="main">
      <div class="sort-box">
        <div class="tit">排序</div>
        <p :class="{'active': this.active === 0}" @click="handleSort(0)"><span>按姓名</span><i class="el-icon-check"></i></p>
        <p :class="{'active': this.active === 1}" @click="handleSort(1)"><span>按年龄</span><i class="el-icon-check"></i></p>
        <p :class="{'active': this.active === 2}" @click="handleSort(2)"><span>按日期</span><i class="el-icon-check"></i></p>
      </div>
      <div class="new-btn" @click="showDialogAdd"><i class="el-icon-plus"></i><span>新建</span></div>
      <div class="query-details">
        <div class="block block1">
          <div class="patients-tab">
            <p class="tit">
              <span></span>
              <span>姓名</span>
              <span>性别</span>
              <span>年龄</span>
              <span>解读</span>
              <span>患者管理</span>
              <span>创建时间</span>
              <span></span>
            </p>
            <ul class="context">
              <template v-if="patientList.length>0">
                <li v-for="(item, index) in patientList" :key="index">
                  <p>{{index + 1}}</p>
                  <p>{{item.patientName}}</p>
                  <p>{{item.sex === 1 ? '男' : '女'}}</p>
                  <p>{{item.age}}</p>
                  <p>
                    <span>
                      {{item.jobName ? `${item.jobName}`: ''}}
                      <em style="font-style:inherit; font-size:18px;">{{item.jobName ? `【${item.isResolve}】`: ''}}</em>
                    </span>
                    <span v-show="item.jobName"><i class="high" @click="toVcf(item)">查看</i><i @click="deleteVcf(item)">删除</i></span>
                  </p>
                  <p>
                    <span>VCF</span>
                    <span><i class="high" @click="handleShowUpload(item)">上传</i></span>
                  </p>
                  <p><i class="date">{{item.createTime && item.createTime.substr(0, 10)}}</i></p>
                  <p><span><i @click="handleDeletePatient(item)">删除</i></span></p>
                </li>
              </template>
              <template v-else>
                <li class="no-data">暂无数据</li>
              </template>
            </ul>
            <!-- 分页 -->
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :current-page.sync="patientListParams.pageNum"
                @current-change="getCurrentPage"
                class="el-pagination">
              </el-pagination>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- 新建 -->
    <el-dialog
      title="新建患者"
      :visible.sync="dialogAdd"
      width="450px"
      append-to-body
      center
      :close-on-click-modal="false"
      :before-close="closeAddDialog"
      class="eldialog add-dialog">
      <el-form v-if="showDialogAddForm" class="add-form" ref="addForm" :rules="rules" :model="addForm" label-width="100px">
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
    <UploadVCF ref="uploadVCF" :patientId="patientId" @updateSuccess="updateSuccess"/>
    <AsideFix/>
    <vFooter/>
  </div>
</template>

<script>
import vHeader from '@/components/common/vHeader'
import vFooter from '@/components/common/vFooter'
import UploadVCF from '@/components/UploadVCF'
import checkIdCardFunc from '@/utils/checkIdCard'
import AsideFix from '@/components/AsideFix'

export default {
  inject: ['reload'],
  components: {
    vHeader,
    vFooter,
    UploadVCF,
    AsideFix
  },
  data() {
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
      let {pass, tip} = checkIdCardFunc(value)
      if (!pass) {
        callback(new Error(tip))
      } else {
        callback()
      }
      callback()
    }
    return {
      processCount: {
        totalTask: '',
        completeTask: '',
        notTask: ''
      },
      restaurants: [],
      queryInp: '',
      showDialog: false,
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
      patientList: [],
      patientListParams: {
        isAgeAsc: '',
        isDateAsc: 'isDate',
        isNameAsc: '',
        pageNum: 1,
        patientName: ''
      },
      total: 0,
      pageSize: 10,
      patientId: 0,
      active: 2,
      showDialogAddForm: false
    }
  },
  methods: {
    init() {
      this.getProcessCount()
      this.getPatientList()
    },
    // 任务总计
    getProcessCount() {
      this.$get(this.$Url.account.processCount).then(res => {
        this.processCount = res.data
      }).catch(err => {})
    },
    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    search() {
      this.patientListParams.patientName = this.queryInp.trim()
      this.getPatientList()
    },
    handleShowUpload(item) {
      this.patientId = item.patientId
      this.$refs.uploadVCF.init()
    },
    updateSuccess(data) {
      this.getProcessCount()
      this.getPatientList()
    },
    toVcf(item) {
      let url = this.$router.resolve({
        name: 'patientsInterpretation',
        query: {
          patientName: item.patientName,
          patientId: item.patientId,
          vcfId: item.jobId
        }
      })
     
      if(item.idCard == '630104198609043698'){
         // 夏某泽
        window.open('/#/patients/xmz?patientName=夏某泽&patientId=48&vcfId=121', '_blank')
      }else if(item.idCard == '230300199005288817'){
        // 石某世
          window.open('/#/patients/sms?patientName=石某世&patientId=48&vcfId=121', '_blank')
      }else{
        window.open(url.href, '_blank')
      }
    },
    deleteVcf(item) {
      this.$confirm('是否删除VCF?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$get(this.$Url.vcf.delete, {
          patientId: Number(item.patientId),
          vcfId: item.jobId
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: res.data
            })
            this.getPatientList()
            this.getProcessCount()
          } else {
            this.$message({
              type: 'error',
              duration: 2000,
              message: res.msg
            })
          }
        }).catch(err => {})
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新建患者
    showDialogAdd() {
      this.dialogAdd = true
      this.showDialogAddForm = true
    },
    addPatient() {
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
              this.getProcessCount()
              this.getPatientList()
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
    closeAddDialog() {
      this.dialogAdd = false
      this.$refs['addForm'].resetFields()
    },
    // 患者列表
    getPatientList() {
      this.$post(this.$Url.account.patientList, this.patientListParams).then(res => {
        if (res.status === 200) {
          let data = res.data
          let list = data.list
          list.forEach(v => {
            v.isResolve = v.isResolve === 1 ? '已解读' :
               v.isResolve === 2 ? '未解读' : '正在解读'
          })
          
          this.patientList = list
          this.total = data.total
          this.pageSize = data.pageSize
        } else {
          this.$message({
            type: 'error',
            duration: 2000,
            message: res.msg
          })
        }
      }).catch(err => {})
    },
    // 分页
    getCurrentPage(val) {
      this.patientListParams.pageNum = val
      this.getPatientList()
    },
    // 删除患者
    handleDeletePatient(item) {
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
            // this.patientListParams.pageNum = 1
            this.reload()
          } else {
            this.$message({
              type: 'error',
              duration: 2000,
              message: res.msg
            })
          }
        }).catch(err => {})
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 排序
    handleSort(active) {
      this.active = active
      this.patientListParams.pageNum = 1
      this.patientListParams.patientName = ''
      switch (active) {
        case 0:
          this.patientListParams.isNameAsc = 'isName'
          this.patientListParams.isAgeAsc = ''
          this.patientListParams.isDateAsc = ''
          this.getPatientList()
          break
        case 1:
          this.patientListParams.isNameAsc = ''
          this.patientListParams.isAgeAsc = 'isAge'
          this.patientListParams.isDateAsc = ''
          this.getPatientList()
          break
        case 2:
          this.patientListParams.isNameAsc = ''
          this.patientListParams.isAgeAsc = ''
          this.patientListParams.isDateAsc = 'isDate'
          this.getPatientList()
          break
      }
    },
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.task-box {
  position: relative;
  width: 100%;
  height: 160px;
  margin-bottom: 20px;
  background-color: $bgColor1;
  .box {
    display: flex;
    width: 1270px;
    margin: 0 auto;
    text-align: center;
    p {
      position: relative;
      flex: 1;
      padding-top: 28px;
      font-family: NotoSansHans-Medium;
      font-size: 24px;
      color: $fontColor6;
      &:after {
        position: absolute;
        top: 32px;
        right: 0;
        width: 1px;
        height: 80%;
        background-color: $bgColor14;
        content: '';
      }
      &:last-of-type {
        &:after {
          width: 0;
        }
      }
      span {
        display: inline-block;
        margin-right: 15px;
        font-family: NotoSansHans-Bold;
        font-weight: 400;
        font-size: 72px;
        color: $fontColor11;
      }
    }
  }
}
.query-box2 {
  height: 205px;
  background: none;
  .query-inp {
    top: 70px;
    width: 338px;
    height: 48px;
    line-height: 48px;
    margin-left: -169px;
  }
  .query-icon {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 48px;
    text-align: center;
  }
}
.main {
  position: relative;
  width: 1270px;
  max-width: 80%;
  margin: 0 auto;
  .sort-box {
    width: 500px;
    p {
      &.active {
        i {
          background-color: $bgColor5;
        }
      }
      span {
        display: inline-block;
      }
      i {
        display: inline-block;
        width: 22px;
        height: 22px;
        line-height: 22px;
        border-radius: 50%;
        margin-left: 6px;
        text-align: center;
        font-size: 15px;
        color: #fff;
        vertical-align: middle;
        background-color: $fontColor10;
      }
    }
  }
  .new-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 156px;
    height: 60px;
    line-height: 58px;
    border-radius: 36px;
    font-size: 24px;
    color: #fff;
    background-color: $mainColor;
    cursor: pointer;
    i {
      display: inline-block;
      width: 40px;
      margin-left: 20px;
      text-align: center;
      font-weight: 700;
      font-size: 15px;
      color: #fff;
      vertical-align: middle;
    }
    span {
      display: inline-block;
      margin-left: 10px;
      vertical-align: middle;
    }
  }
  .query-details {
    max-width: 100%;
  }
  .patients-tab {
    margin-bottom: 126px;
    .tit {
      margin-bottom: 40px;
      span {
        &:nth-of-type(1) {
          flex: none;
          width: 50px;
        }
        &:nth-of-type(5) {
          flex: 3;
        }
        &:nth-of-type(6) {
          flex: 1.4;
        }
        &:last-of-type {
          flex: none;
          width: 100px;
        }
      }
    }
    .context {
      border-radius: 0;
      border: 0;
      li {
        position: relative;
        padding: 20px 35px;
        margin: 0;
        margin-bottom: 10px;
        background-color: $bgColor1;
        p {
          min-height: 23px;
          line-height: 23px;
          padding: 0;
          font-size: 22px;
          &:nth-of-type(1) {
            flex: none;
            width: 50px;
            &:after {
              width: 0;
            }
          }
          &:nth-of-type(5) {
            display: flex;
            flex: 3;
          }
          &:nth-of-type(6) {
            display: flex;
            flex: 1.4;
          }
          &:last-of-type {
            flex: none !important;
            width: 100px;
            &:after {
              border: none;
            }
          }
          &:after {
            position: absolute;
            top: -5px;
            right: 0;
            width: 1px;
            height: calc(100% + 10px);
            border-right: 1px solid $bgColor2;
            content: '';
          }
          .date {
            font-style: normal;
            color: $fontColor6;
          }
          span {
            position: relative;
            &:nth-of-type(1) {
              flex: 1;
              line-height: 23px;
              padding-left: 20px;
              padding-right: 10px;
              text-align: left;
            }
            padding-right: 20px;
            i {
              position: relative;
              display: inline-block;
              padding: 0 6px;
              font-style: normal;
              cursor: pointer;
              &.high {
                color: $bgColor9;
              }
              
            }
          }
          
        }
      }
    }
  }
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
    width: 150px;
    height: 48px;
    line-height: 48px;
    border-radius: 36px;
    margin: 28px 10px 18px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    background-image: $bgGradient2;
    cursor: pointer;
  }
}
.pagination {
  padding-top: 10px;
  text-align: center;
}
</style>