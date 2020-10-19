<template>
  <!-- 变异查询 -->
  <div @click="handleHideDialog">
    <vHeader/>
    <div class="query-box query-box3">
      <h5>查找变异</h5>
      <div class="box">
        <el-input class="query-inp" v-model="queryInp" placeholder="请输入变异RS号" @keyup.enter.native="search">
          <i slot="append" class="el-input__icon iconfont icon-sousuo1" @click="search"></i>
        </el-input>
      </div>
    </div>
    <div v-show="showDetails" class="query-details">
      <h4>
        <p class="tit">
          <span>{{info.queryInpTxt}}</span>
          <i v-if="info.queryInpTxt && info.queryInpTxt !== ''" class="collect" :class="{'collected': isCollected}" @click="changeCollect">{{isCollected ? '已收藏': '收藏'}}</i>
        </p>
      </h4>
      <!-- <h4>{{info.queryInpTxt}}</h4> -->
      <div class="block block1">
        <p class="title"><em>简要信息</em><span>Brief information</span></p>
        <ul class="brief-info">
          <li><i>染色体位置</i><span>{{info.chrStart}}</span></li>
          <li><i>基因名</i><span>{{info.gene}}</span></li>
          <li><i>突变类型</i><span>{{info.exonicfunc}}</span></li>
          <li><i>突变位点</i><span>{{info.refAlt}}</span></li>
          <li><i>蛋白变化</i><span>{{info.aachange}}</span></li>
          <li><i>位点危害性</i><span>{{info.label}}</span></li>
          <li><i>MAF(亚洲)</i><span>{{info.mafGnomad}}</span></li>
        </ul>
      </div>
      <div class="block block2">
        <p class="title"><em>疾病关联</em><span>Disease association</span></p>
        <div class="gene-tab">
          <p class="tit">
            <span>疾病名</span>
            <span>疾病ID</span>
            <span>遗传方式</span>
            <span>来源</span>
            <span>文献</span>
          </p>
          <ul class="context">
            <li>
              <p style="text-align:center">
                <template v-if="typeof info.variantName === 'string'">{{info.variantName}}</template>
                <template v-else>
                  <span v-for="(item, index) in info.variantName" :key="index">{{item}}<br/></span>
                </template>
              </p>
              <p>
                <template v-if="typeof info.variantPhenotype === 'string'">
                  <span class="spn" @mouseenter="handleShowDialog(info.variantPhenotype, 'variantPhenotype', $event)" @click="handleHideDialog2(info.variantPhenotype)">
                    {{info.variantPhenotype}}
                  </span>
                </template>
                <template v-else>
                  <span v-for="(item, index) in info.variantPhenotype" :key="index" class="spn" @mouseenter="handleShowDialog(item, 'variantPhenotype', $event)" @click="handleHideDialog2(item)">
                    {{item}}<br/>
                  </span>
                </template>
              </p>
              <p>
                <template v-if="typeof info.variantInheritance === 'string'">{{info.variantInheritance}}</template>
                <template v-else>{{info.variantInheritance.join(',')}}</template>
              </p>
              <p>
                <template v-if="typeof info.variantSource === 'string'">{{info.variantSource}}</template>
                <template v-else>{{info.variantSource.join(',')}}</template>
              </p>
              <p>
                <template v-if="typeof info.variantPmid === 'string'">
                  <span class="spn" @mouseenter="handleShowDialog(info.variantPmid, 'variantPmid', $event)" @click="handleHideDialog">
                    {{info.variantPmid}}
                  </span>
                </template>
                <template v-else>
                  <span v-for="(ite, i) in info.variantPmid" :key="i" @mouseenter="handleShowDialog(ite, i, $event)" @click="handleHideDialog" class="spn">
                    {{ite}}{{Number(i) !== (info.variantPmid.length - 1) ? ',' : ''}}
                  </span>
                </template>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 多条变异信息弹窗 -->
    <el-dialog
      title="变异信息"
      :visible.sync="dialogDiff"
      width="700px"
      append-to-body
      center
      :close-on-click-modal="false"
      class="eldialog diff-dialog">
      <el-table
        :data="diffListData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="70">
        </el-table-column>
        <el-table-column
          prop="rs"
          label="RS">
        </el-table-column>
        <el-table-column
          prop="chrStart"
          label="染色体位置">
        </el-table-column>
        <el-table-column
          prop="refAlt"
          label="突变位点">
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="primary" @click="toDiff(scope)">跳转</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
      showDetails: false,
      queryInp: '', // rs774656178 rs121913078
      isCollected: false, // 是否收藏
      currentCollectId: '',
      info: {
        queryInpTxt: '', // 标题
        chrStart: '', // 染色体位置
        gene: '', // 基因名,
        exonicfunc: '', // 突变类型
        refAlt: '', // 突变位点
        aachange: '', // 蛋白变化
        label: '', // 位点危害性
        mafGnomad: '', // MAF(亚洲)

        variantName: '', // 疾病名
        variantPhenotype: '', // 疾病ID
        variantInheritance: '', // 遗传方式
        variantSource: '', // 来源
        variantPmid: '', // 文献
      },
      dialogDiff: false,
      diffListData: [],
      hasDiffIndex: -1,
      showDialog1: false,
      InfoDiaPos: {},
      dialogInfo: {},
    }
  },
  methods: {
    search() {
      if (this.queryInp === '') {
        this.$message({
          type: 'error',
          duration: 2000,
          message: '请输入查询内容'
        })
        return
      }
      
      this.$get(this.$Url.query.variationbyRsId, {
        rsId: this.queryInp
      }).then(res => {
        if (res.status === 200) {
          let data = res.data
          if (data.length <= 0) {
            this.showDetails = false
            this.$message({
              type: 'warning',
              duration: 2000,
              message: '查找的内容不存在'
            })
            return
          }

          this.showDetails = true

          if (data.length > 0) {
            // 如果有hasDiffIndex，则默认展示第hasDiffIndex条数据
            let defaultIndex = (this.hasDiffIndex !== -1) ? this.hasDiffIndex : 0
            let initInfo = data[0]
            this.getInfo(initInfo)

            if (this.hasDiffIndex === -1) {
              this.diffListData = []
              for (let i=1; i<data.length; i++) {
                if (data[i].rs !== initInfo.rs ||
                  data[i].chr !== initInfo.chr ||
                  data[i].start !== initInfo.start ||
                  data[i].end !== initInfo.end ||
                  data[i].ref !== initInfo.ref ||
                  data[i].alt !== initInfo.alt) {
                  let info = {
                    rs: data[i].rs,
                    chrStart: (data[i].chr + ':' + (data[i].start === data[i].end ? data[i].start : (data[i].start + '-' + data[i].end))) || '暂无',
                    refAlt: (data[i].ref + '>' + data[i].alt) || '暂无'
                  }
                  this.diffListData.push(info)
                  this.dialogDiff = true
                }
              }
            }
            
          } else {
            this.getInfo(data)
          }
          this.$router.push({
            name: 'variationQuery',
            query: {
              search: this.queryInp
            }
          })
          this.getIsCollect()
        }
      }).catch(err => {})
    },
    getInfo(data) {
      this.info.queryInpTxt = this.queryInp
      this.info.chrStart = (data.chr + ':' + (data.start === data.end ? data.start : (data.start + '-' + data.end))) || '暂无'
      this.info.gene = data.gene || '暂无'
      this.info.exonicfunc = data.exonicfunc || '暂无'
      this.info.refAlt = (data.ref + '>' + data.alt) || '暂无'
      this.info.aachange = data.aachange || '暂无'
      this.info.label = data.label || '暂无'
      this.info.mafGnomad = data.mafGnomad || '暂无'

      // 疾病名
      if (typeof data.variantPhenotype11 === 'string') {
        if (data.variantPhenotype11 !== '') {
          this.getDiseaseName(data.variantPhenotype11, data => {
            this.info.variantName = data[0].diseaseName
          })
        } else {
          this.info.variantName = '暂无'
        }
      } else {
        let variantName = []
        data.variantPhenotype11.forEach(v => {
          this.getDiseaseName(v, data => {
            variantName.push(data[0].diseaseName)
            this.info.variantName = variantName
          })
        })
      }
      // 疾病ID
      this.info.variantPhenotype = data.variantPhenotype11 || '暂无'

      
      this.info.variantInheritance = data.variantInheritance11 || '暂无'
      this.info.variantSource = data.variantSource11 || '暂无'


      // 文献
      if (typeof data.variantPmid11 === 'string') {
        let arr = data.variantPmid11 ? data.variantPmid11.split(',') : []
        this.info.variantPmid = arr.length > 0 ? arr : '暂无'
      } else {
        this.info.variantPmid =  data.variantPmid11
      }
      
    },
    handleShowDialog(txt, index, $event) {
      if (txt === '-') {
        this.showDialog1 = false
        return
      }

      let thisDescription = ''
      if (index === 'variantPhenotype') {
        thisDescription = this.info['variantPhenotype_thisDescription']
      } else if (index === 'variantPmid') {
        thisDescription = this.info['variantPmid_thisDescription']
      } else {
        if (!this.info.variantPmidArr) {
          this.info.variantPmidArr = []
        }
        let isHasDes = this.info.variantPmidArr.filter(item => item.title === txt)
        if (isHasDes.length > 0) {
          thisDescription = isHasDes[0].description
        }
      }

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

              if (index === 'variantPhenotype') {
                this.$set(this.info, 'variantPhenotype_thisDescription', this.dialogInfo.description)
              } else if (index === 'variantPmid') {
                this.$set(this.info, 'variantPmid_thisDescription', this.dialogInfo.description)
              } else {
                this.info.variantPmidArr.push({
                  title: txt,
                  description: this.dialogInfo.description
                })
              }
              
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
          search: item,
          active: 1
        }
      })
      window.open(url.href, '_blank')
    },
    toDiff(scope) {
      let url = this.$router.resolve({
        name: 'variationQuery',
        query: {
          search: this.queryInp,
          diff: scope.$index
        }
      })
      window.open(url.href, '_blank')
    },
    // 根据疾病ID获取疾病名
    getDiseaseName(id, func) {
      this.$get(this.$Url.query.diseaseName, {
        rsId: id
      }).then(res => {
        let data = res.data
        if (data) {
          func && func(data)
        }
      }).catch(err => {})
    },
    // 查询是否收藏
    getIsCollect() {
      this.$post(this.$Url.collect.list).then(res => {
        if (res.status === 200) {
          let data = res.data
          if (data && data.length > 0) {
            let isCollect = data.filter(item => item.name === this.queryInp)
            if (isCollect.length > 0) {
              this.isCollected = true
              this.currentCollectId = isCollect[0].id
            } else {
              this.isCollected = false
            }
            
          }
        }
      }).catch(err => {})
    },
    // 切换收藏
    changeCollect() {
      if (this.isCollected) {
        this.$get(this.$Url.collect.delete, {
          collectId: this.currentCollectId
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              duration: 2000,
              message: '取消收藏成功'
            })
            this.isCollected = false
          }
        }).catch(err => {})
      } else {
        this.$post(this.$Url.collect.add, {
          name: this.queryInp,
          type: 2, 
          reservedOne: '',
          reservedTow: ''
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              duration: 2000,
              message: '收藏成功'
            })
            this.currentCollectId = (res.data && res.data.id) || ''
            this.isCollected = true
          } else {
            this.$message({
              type: 'error',
              duration: 2000,
              message: res.msg
            })
          }
        }).catch(err => {})
      }
    }
  },
  mounted() {
    let query = this.$route.query
    if (query.search) {
      this.queryInp = query.search
      if (query.diff) {
        this.hasDiffIndex = Number(query.diff)
        this.search()
      } else {
        this.queryInp = query.search
        this.search()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.block1 {
  .brief-info {
    li {
      i {
        background-color: $bgColor11;
      }
      &:nth-of-type(1) i {
        background-color: $bgColor5;
      }
      &:nth-of-type(2) i {
        background-color: $bgColor8;
      }
      &:nth-of-type(3) i {
        background-color: $bgColor9;
      }
    }
  }
}
</style>