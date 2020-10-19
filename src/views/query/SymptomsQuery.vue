<template>
  <!-- 症状查询 -->
  <div @click="handleHideDialog">
    <vHeader/>
    <div class="query-box">
      <h5>症状查询</h5>
      <div class="box">
        <span class="query-btn"
          v-for="(item, index) in queryList"
          :key="index"
          :class="{'query-btn-active':queryActive===index}"
          @click="switchBtn(index)">{{item.name}}</span>
        <template v-if="queryActive===0">
          <div class="multiple-box">
            <div class="select-box" style="overflow:hidden">
              <el-select v-model="symptomType" key="inp1" placeholder="请选择分类" @change="changeSymptomType">
                <el-option
                  v-for="item in options1"
                  :key="item.id"
                  :label="item.symptomType"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="select-box" :class="{'hide-tags-bg': this.symptom.length<=0}">
              <!-- 允许多选 -->
              <el-select v-model="symptom" key="inp2" multiple filterable clearable placeholder="请选择症状" @visible-change="visibleChange">
                <el-option
                  v-for="item in options2"
                  :key="item.symptom"
                  :label="item.symptom"
                  :value="item.symptom">
                </el-option>
              </el-select>
            </div>
            <div class="search-btn" @click="search"><i class="el-icon-search"></i></div> 
          </div>
        </template>
        <template v-if="queryActive===1">
          <div id="1" class="multiple-box">
            <div class="select-box" :class="{'hide-tags-bg': this.symptom2.length<=0}">
              <el-select v-model="symptom2" key="inp3" multiple filterable remote :remote-method="querySearch" placeholder="请选择症状">
                <el-option
                  v-for="item in options3"
                  :key="item.symptom"
                  :label="item.symptom"
                  :value="item.symptom">
                </el-option>
              </el-select>
            </div>
            <div class="search-btn" @click="search"><i class="el-icon-search"></i></div> 
          </div>
        </template>
        
      </div>
      
    </div>
    <div class="query-details">
      <div class="block block1">
        <p class="title"><em>查询结果</em><span>Query results</span></p>
        <div class="results-tab">
          <p class="tit">
            <span>疾病名</span>
            <span>疾病ID</span>
          </p>
          <ul class="context" :class="{'no-data': Object.keys(this.list).length <= 0}">
            <template v-if="Object.keys(this.list).length > 0">
              <li v-for="(item, index) in this.list" :key="index">
                <p>{{item.name}}</p>
                <p>
                  <span class="spn" @mouseenter="handleShowDialog(item.id, index, $event)" @click="handleHideDialog2(item)">{{item.id}}</span>
                </p>
              </li>
            </template>
            <template v-else>
              <li class="no-data">暂无数据</li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <InfoDialog :pos="InfoDiaPos" :data="dialogInfo" v-if="showDialog1"/>
    <AsideFix/>
    <vFooter/>
  </div>
</template>

<script>
import vHeader from '@/components/common/vHeader'
import vFooter from '@/components/common/vFooter'
import AsideFix from '@/components/AsideFix'
import InfoDialog from '@/components/InfoDialog'

export default {
  components: {
    vHeader,
    vFooter,
    AsideFix,
    InfoDialog
  },
  data() {
    return {
      queryList: [
        {
          name: '分类查询'
        },
        {
          name: '手动查询'
        },
      ],
      queryActive: 0,
      placeholder: '',
      options1: [],
      options2: [],
      symptom: [],
      symptomType: '',
      symptom2: [],
      options3: [],
      showDialog1: false,
      InfoDiaPos: {},
      dialogInfo: {},
      list: [],
      timer: null
    }
  },
  methods: {
    switchBtn(index) {
      this.queryActive = index
    },
    search() {
      let symptom = ''
      if (this.queryActive === 0) {
        if (this.symptomType === '') {
          this.$message({
            type: 'error',
            duration: 2000,
            message: '请选择症状分类'
          })
          return
        } else if (this.symptom === '') {
          this.$message({
            type: 'error',
            duration: 2000,
            message: '请选择症状'
          })
          return
        }
        symptom = this.symptom.join()
      } else {
        if (this.symptom2.length <= 0) {
          this.$message({
            type: 'error',
            duration: 2000,
            message: '症状不能为空'
          })
          return
        }
        symptom = this.symptom2.join()
      }
      
      this.$get(this.$Url.query.byDisease, {
        symptoms: symptom
      }).then(res => {
        if (res.status === 200) {
          this.list = res.data || []
        } else {
          this.$message({
            type: 'error',
            duration: 2000,
            message: res.msg
          })
        }
      }).catch(err => {})
    },
    getSymptomType() {
      this.$get(this.$Url.query.symptomQueryType).then(res => {
        let data = res.data
        if (data) {
          this.options1 = data
        }
      }).catch(err => {})
    },
    changeSymptomType(val) {
      this.$get(this.$Url.query.symptomQuery, {
        id: this.symptomType
      }).then(res => {
        let data = res.data
        if (data) {
          this.options2 = data
        }
      }).catch(err => {})
    },
    visibleChange(val) {
      if (val === true && this.symptomType === '') {
        this.$message({
          type: 'error',
          duration: 2000,
          message: '请先选择症状分类'
        })
      }
      if (!val && this.symptom.length <=0) {
        this.place = true
      } else {
        this.place = false
      }
    },
    querySearch(queryString) {
      if (queryString !== '') {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.$get(this.$Url.query.querySymptom, {
            symptom: queryString
          }).then(res => {
            let data = res.data
            data.forEach(v => {
              v.value = v.symptom
            })
            this.options3 = data
          }).catch(err => {})
        }, 400)
        
      } else {
        this.options3 = []
      }
    },
    handleSelect(item) {
      // console.log(item)
    },
    handleShowDialog(txt, index, $event) {
      if (txt === '-' || txt === '暂无') {
        this.showDialog1 = false
        return
      }
      
      let thisDescription = this.list[index]['thisDescription']
      if (!thisDescription) {
        this.$get(this.$Url.query.diseaseInformation, {
          OMIM_id: txt
        }).then(res => {
          if (res.status === 200) {
            let data = res.data
            if (data) {
              this.dialogInfo = {
                title: txt,
                description: data.Description || data.definition_orp || '暂无'
              }
              
              this.$set(this.list[index], 'thisDescription', this.dialogInfo.description)
              this.showDialog1 = true
              let width = document.body.clientWidth
              let height = document.body.clientHeight
              
              this.InfoDiaPos = {
                pageX: ($event.pageX + 300) > width ? $event.pageX - 380 : $event.pageX,
                pageY: ($event.pageY + 300) > height ? $event.pageY - 300 : $event.pageY
              }
            }
          }
        }).catch(err => {})
      } else {
        this.dialogInfo = {
          title: txt,
          description: thisDescription
        }
        this.showDialog1 = true
        let width = document.body.clientWidth
        let height = document.body.clientHeight
        this.InfoDiaPos = {
          pageX: ($event.pageX + 300) > width ? $event.pageX - 380 : $event.pageX,
          pageY: ($event.pageY + 300) > height ? $event.pageY - 300 : $event.pageY
        }
      }

    },
    handleHideDialog() {
      this.showDialog1 = false
    },
    handleHideDialog2(item) {
      let url = this.$router.resolve({
        name: 'diseaseQuery',
        query: {
          search: item.id,
          active: 1
        }
      })
      window.open(url.href, '_blank')
    },
    getPlaceholder() {
      this.placeholder = '请输入症状名称，多个用英文逗号分隔'
    },
  },
  watch: {
    queryActive() {
      this.getPlaceholder()
    }
  },
  mounted() {
    this.getSymptomType()
    this.getPlaceholder()
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.multiple-box {
  position: absolute;
  top: 48px;
  left: 50%;
  display: flex;
  width: 700px;
  margin-left: -350px;
  height: 60px;
  .select-box {
    position: relative;
    flex: 1;
    border-top: 1px solid $mainColor;
    border-bottom: 1px solid $mainColor;
    box-sizing: border-box;
    background-color: #fff;
    &:nth-of-type(1) {
      border-left: 1px solid $mainColor;
      // border-top-left-radius: 24px;
      // border-bottom-left-radius: 24px;
    }
  }
  .search-btn {
    position: relative;
    display: table-cell;
    width: 64px;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    border: 0;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    vertical-align: middle;
    text-align: center;
    font-size: 27px;
    color: #fff;
    background-color: #02a7f0;
    cursor: pointer;
    overflow: hidden;
    i {
      display: inline-block;
      text-align: center;
      font-size: 27px;
      color: #fff;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      vertical-align: baseline;
      cursor: pointer;
    }
  }
}
.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 15px;
  color: $fontColor15;
}
</style>