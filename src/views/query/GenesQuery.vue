<template>
  <!-- 基因查询 -->
  <div @click="handleHideDialog">
    <vHeader/>
    <div class="query-box">
      <h5>查找基因</h5>
      <div class="box">
        <span class="query-btn"
          v-for="(item, index) in queryList"
          :key="index"
          :class="{'query-btn-active':queryActive===index}"
          @click="switchBtn(index)">{{item.name}}</span>
        <el-input class="query-inp" v-model="queryInp" :placeholder="placeholder" @keyup.enter.native="search">
          <i slot="append" class="el-input__icon iconfont icon-sousuo1" @click="search"></i>
        </el-input>
      </div>
      
    </div>
    <div v-show="showDetails" class="query-details">
      <h4>
        <p class="tit">
          <span>{{info.gene_symbol}}</span>
          <i v-if="info.gene_symbol && info.gene_symbol !== ''" class="collect" :class="{'collected': isCollected}" @click="changeCollect">{{isCollected ? '已收藏': '收藏'}}</i>
        </p>
        <p class="subheading">别名：{{info.otheraliases}}</p>
      </h4>
      <!-- <h4>{{info.queryInpTxt}}<p class="subheading">别名：{{info.otheraliases}}</p></h4> -->
      <div class="block block1">
        <p class="title"><em>基因描述</em><span>Gene description</span></p>
        <p class="description">{{info.gene_summary}}</p>
      </div>
      <div class="block block2">
        <p class="title"><em>简要信息</em><span>Brief information</span></p>
        <ul class="brief-info">
          <li><i>OMIM ID</i><span>{{this.info.OMIM_id}}</span></li>
          <li><i>Entrez ID</i><span>{{this.info.entrez_id}}</span></li>
          <li><i>染色体位置（hg38）</i><span>{{this.info.coordinates || ''}}</span></li>
        </ul>
      </div>
      <div class="block block3">
        <p class="title"><em>相关疾病</em><span>Related diseases</span></p>
        <div class="diseases-tab diseases-tab1">
          <p class="tit">
            <span>疾病名</span>
            <span>疾病ID</span>
          </p>
          <ul class="context" :class="{'no-data': Object.keys(this.info.diseaseAssoc).length <= 0}">
            <template v-if="Object.keys(this.info.diseaseAssoc).length > 0">
              <li v-for="(item, index) in this.info.diseaseAssoc" :key="index">
                <p>{{item.diseaseName}}</p>
                <p>
                  <span class="spn" @mouseenter="handleShowDialog(item.diseaseId, index, 'diseaseAssoc', $event)" @click="handleHideDialog2(item)">{{item.diseaseId}}</span>
                </p>
              </li>
            </template>
            <template v-else>
              <li class="no-data">暂无数据</li>
            </template>
          </ul>
        </div>
        <div class="tab2">
          <p class="tab2-tit">变异相关疾病</p>
          <div class="diseases-tab diseases-tab2">
            <p class="tit">
              <span>变异</span>
              <span>SNP</span>
              <span>疾病名</span>
              <span>OMIM ID</span>
            </p>
            <ul class="context" :class="{'no-data': Object.keys(this.info.Gene_variant).length <= 0}">
              <template v-if="Object.keys(this.info.Gene_variant).length > 0">
                <li v-for="(item, index) in this.info.Gene_variant" :key="index">
                  <p>{{item.variant}}</p>
                  <!-- <p>{{item['sNP']}}</p> -->
                  <p>
                    <span class="spn" @click="toDetail(item['sNP'])">{{item['sNP']}}</span>
                  </p>
                  <p>{{item.disease}}</p>
                  <p>
                    <span class="spn" @mouseenter="handleShowDialog(item.omId, index, 'Gene_variant', $event)" @click="handleHideDialog3(item)">{{item.omId}}</span>
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
      <div class="block block4">
        <p class="title"><em>相关症状</em><span>Related symptoms</span></p>
        <div class="symptoms-tab">
          <p class="tit">
            <span>症状</span>
            <span>症状ID</span>
          </p>
          <ul class="context" :class="{'no-data': Object.keys(this.info.termAssoc).length <= 0}">
            <template v-if="Object.keys(this.info.termAssoc).length > 0">
              <li v-for="(item, index) in this.info.termAssoc" :key="index">
                <p>{{item.name}}</p>
                <p>{{item.ontologyId}}</p>
              </li>
            </template>
            <template v-else>
              <li class="no-data">暂无数据</li>
            </template>
            <!-- <li>
              <p>DIGEORGE SYNDROME; DGS</p>
              <p>HP:0003388</p>
            </li>
            <li>
              <p>Orthopnea</p>
              <p>HP:0012764</p>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="block">
        <p class="title"><em>该基因完整信息</em><span>Complete information of this gene</span></p>
      </div>
    </div>
    <div v-show="showDetails" class="complete-information">
      <div class="all">
        <ul class="aside">
          <li v-for="(item, index) in changeInfoList" :key="index" :class="{'active': changeIndex === index}"  @click="changeInfo(item, index)" >{{item.cname}}</li>
        </ul>
        <div class="container">
          <div class="context">
            <div class="box">
              
              <vue-scroll :ops="scrollOps">
                <h6>{{changeInfoTit}}</h6>
                <div>
                  <p v-html="changeInfoTxt" class="change-txt"></p>
                </div>
              </vue-scroll>
              
            </div>
          </div>
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
import {transGeneName} from '@/utils/fieldMap'

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
      queryList: [
        {
          name: '基因英文名'
        },
        {
          name: 'OMIM id'
        },
        {
          name: 'entrze id'
        }
      ],
      queryActive: 0,
      placeholder: '',
      queryInp: '', // 102630
      isCollected: false, // 是否收藏
      reservedOne: 0,
      currentCollectId: '',
      scrollOps: {
        vuescroll: {
          mode: 'native'
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          maxHeight: 690
        },
        // 轨道
        rail: {
          background: '#f1f1f1',
          opacity: 1,
          size: '9px',
          specifyBorderRadius: '6px',
          gutterOfEnds: '10px',
        },
        // 滚动条
        bar: {
          background: '#3bcaff',
          onlyShowBarOnScroll: true,
          showDelay: 0,
          keepShow: true,
          size: '16px'
        }
      },
      isCollected: false, // 是否收藏
      info: {
        gene_symbol: '', // 标题
        otheraliases: '', // 别名
        gene_summary: '', // 基因描述
        OMIM_id: '', // 简要信息-OMIM ID
        entrez_id: '', // 简要信息-Entrez ID
        coordinates: '', // 简要信息-染色体位置（hg38）
        diseaseAssoc: [], // 相关疾病
        Gene_variant: [], // 变异相关疾病
        termAssoc: [], // 相关症状
        Gene_text: {}, // 该基因完整信息
      },
      showDialog1: false,
      InfoDiaPos: {},
      dialogInfo: {},
      changeInfoList: [],
      changeInfoTit: '',
      changeInfoTxt: '',
      changeIndex: 0
    }
  },
  methods: {
    switchBtn(index) {
      this.queryActive = index
      this.queryInp = ''
    },
    search() {
      if (this.queryInp === '') {
        this.$message({
          type: 'error',
          duration: 2000,
          message: '请输入查询内容'
        })
        return
      }
      
      let requestUrl = ''
      let params = {}
      switch (this.queryActive) {
        case 0:
          requestUrl = this.$Url.query.genebySymbol
          params = { gene_symbol: String(this.queryInp)}
          break
        case 1:
          requestUrl = this.$Url.query.genebyOmId
          params = { omim_id: String(this.queryInp)}
          break
        case 2:
          requestUrl = this.$Url.query.genebyEntrezId
          params = { entrez_id: this.queryInp}
          break
      }
      this.$router.push({
        name: 'genesQuery',
        query: {
          search: this.queryInp,
          active: this.queryActive
        }
      })
      this.$get(requestUrl, params).then((res) => {
        if (res.status === 200) {
          let data = res.data || []
          let values = Object.values(data)
          let arr = values.filter(item => item.length > 0)
          if (arr.length <= 0) {
            this.showDetails = false
            this.$message({
              type: 'warning',
              duration: 2000,
              message: '查找的内容不存在'
            })
            return
          }

          this.showDetails = true

          this.info.gene_symbol = data.gene_symbol || ''
          this.info.otheraliases = data.otheraliases || '暂无'
          this.info.gene_summary = data.gene_summary || (data.Gene_text.Description)|| '暂无'
          this.info.OMIM_id = data.OMIM_id || '暂无'
          this.info.entrez_id = data.entrez_id || '暂无'

          let locationValues = (typeof Gene_location === 'object') ? Object.values(data['Gene_location'])[0] : []
          let coordinates = locationValues['Genomic coordinates (GRCh38):'] || data['HG38'] || '暂无'
          let cArr = coordinates.split(':')
          if (cArr.length > 0 && coordinates !== '暂无') {
            let cArr1 = cArr[0]
            let cArr2 = cArr[1].split('-')
            cArr2 = cArr2.sort((a, b) => {
              return a - b
            })

            this.info.coordinates = cArr1 + ':' + cArr2.join('-')
          } else {
            this.info.coordinates = coordinates
          }
          

          this.info.diseaseAssoc = data.diseaseAssoc

          let Gene_variant = data.Gene_variant
          Gene_variant.forEach(v => {
            if (v['sNP'] && v['sNP'][v['sNP'].length - 1] === ',') {
              v['sNP'] = v['sNP'].substring(0, v['sNP'].length-1)
            } else {
              v['sNP'] = '-'
            }
            if (!v.omId) {
              v.omId = '-'
            }
          })
          this.info.Gene_variant = Gene_variant

          
          try {
            // 由于数据中存在None，不符合json规范，所以需要先转一下
            let termAssoc = data.termAssoc.replace(/ None,/g, ' \'None\',')
            termAssoc = termAssoc.replace(/((?<!\())\'(?!\)|\s)/g, '\"').replace(/[a-zA-Z]\s\"/g, '\'')
            // 然后替换单引号，成功解析json
            // termAssoc = JSON.parse(termAssoc.replace(/\'/g, '\"'))
            // console.log(termAssoc)
            this.info.termAssoc = JSON.parse(termAssoc)
          } catch {}
          
          // 完整信息
          this.info.Gene_text = data.Gene_text

          let keys = typeof this.info.Gene_text !== 'string' ? Object.keys(this.info.Gene_text) : []
          this.changeInfoList = []
          this.changeInfoTit = ''
          this.changeInfoTxt = ''
          for (let i in keys) {
            if (transGeneName(keys[i], 'cn')) {
              this.changeInfoList.push({cname: transGeneName(keys[i], 'cn'), ename: keys[i]})
            }
          }
          this.changeInfo(this.changeInfoList[0], 0)

          this.reservedOne = this.queryActive
          this.getIsCollect()
        } else {
          this.$message({
            type: 'error',
            duration: 2000,
            message: res.msg
          })
        }
      })
    },
    getPlaceholder() {
      this.placeholder = '请输入' + this.queryList[this.queryActive].name
    },
    toDetail(item) {
      let url = this.$router.resolve({
        name: 'variationQuery',
        query: {
          search: item
        }
      })
      window.open(url.href, '_blank')
    },
    handleShowDialog(txt, index, sdata, $event) {
      if (txt === '-') {
        this.showDialog1 = false
        return
      }
      if (txt.split(':')) {
        let arr = txt.split(':')
        txt = arr[arr.length - 1]
      }

      let url = ''
      let params = {}
      if (sdata === 'diseaseAssoc' || sdata === 'Gene_variant') {
        url = this.$Url.query.diseaseInformation
        params = {OMIM_id: txt}
      }

      let thisDescription = this['info'][sdata][index]['thisDescription']
      if (!thisDescription) {
        this.$get(url, params).then(res => {
          if (res.status === 200) {
            let data = res.data
            if (data) {
              if (sdata === 'diseaseAssoc' || sdata === 'Gene_variant') {
                this.dialogInfo = {
                  title: txt,
                  description: data.Description || data.definition_orp || '暂无'
                }
              }
              
              this.$set(this['info'][sdata][index], 'thisDescription', this.dialogInfo.description)
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
      this.showDialog1 = false
      let arr = item.diseaseId.split(':')
      let url = this.$router.resolve({
        name: 'diseaseQuery',
        query: {
          search: arr[arr.length - 1],
          active: 1
        }
      })
      window.open(url.href, '_blank')
    },
    handleHideDialog3(item) {
      this.showDialog1 = false
      let url = this.$router.resolve({
        name: 'diseaseQuery',
        query: {
          search: item.omId,
          active: 1
        }
      })
      window.open(url.href, '_blank')
    },
    // 切换完整信息展示
    changeInfo(item, index) {
      this.changeIndex = index
      if (Object.keys(this.info.Gene_text).length <= 0) {
        return
      }

      this.changeInfoTit = item.cname
      
      if (typeof this.info.Gene_text[item.ename] === 'object') {
        let arr = Object.values(this.info.Gene_text[item.ename])
        let str = ''
        for (let i in arr) {
          str += `<span class="indent">${arr[i]}</span>`
        }
        this.changeInfoTxt = str
      } else {
        this.changeInfoTxt = '<span>' + this.info.Gene_text[item.ename] + '</span>'
      }
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
          type: 1, 
          reservedOne: this.reservedOne,
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
  watch: {
    queryActive() {
      this.getPlaceholder()
    }
  },
  mounted() {
    let query = this.$route.query
    if (query.search) {
      this.queryInp = query.search
      this.queryActive = Number(query.active) || 0
      this.search()
    }
    this.getPlaceholder()
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.block1 {
  .description {
    width: 1108px;
    line-height: 30px;
    margin: 0 auto;
    text-indent: 25px;
    font-size: 22px;
    color: #000;
  }
}
.block2 {
  .brief-info {
    li {
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
.block3, .symptoms-tab {
  .context {
    position: relative;
    &:before {
      position: absolute;
      top: 15px;
      left: 50%;
      width: 1px;
      height: calc(100% - 30px);
      background-color: $bgColor2;
      content: '';
    }
    &.no-data {
      &:before {
        width: 0;
        border: 0
      }
    }
    li {
      p {
        position: relative;
        text-align: center;
      }
    }
  }
}
.tab2 {
  width: 972px;
  margin: 0 auto;
  .tab2-tit {
    line-height: 30px;
    margin: 0 auto 60px;
    text-align: center;
    font-size: 28px;
    color: $bgColor5;
  }
  .diseases-tab2 {
    width: 100%;
    .context {
      &:before {
        position: absolute;
        left: 34%;
        display: none;
      }
      &.no-data {
        &:before {
          width: 0;
          border: 0
        }
        &:after {
          width: 0;
          border: 0
        }
      }
      // &:after {
      //   position: absolute;
      //   top: 15px;
      //   left: 64%;
      //   width: 1px;
      //   height: calc(100% - 30px);
      //   background-color: $bgColor2;
      //   content: '';
      // }
      li {
        p {
          &:nth-of-type(3) {
            text-align: left;
          }
        }
      }
    }
  }
}
</style>