<template>
  <!-- 疾病查询 -->
  <div>
    <vHeader/>
    <div class="query-box">
      <h5>查找遗传病</h5>
      <div class="box">
        <span class="query-btn"
          v-for="(item, index) in queryList"
          :key="index"
          :class="{'query-btn-active':queryActive===index}"
          @click="switchBtn(index)">{{item.name}}</span>
        <template v-if="queryActive===0">
          <el-autocomplete
            class="query-inp"
            v-model="queryInp"
            :fetch-suggestions="querySearch"
            placeholder="请输入全大写英文疾病名"
            :trigger-on-focus="false"
            @select="handleSelect">
            <i slot="append" class="el-input__icon iconfont icon-sousuo1" @click="search"></i>
          </el-autocomplete>
        </template>
        <template v-else>
          <el-input class="query-inp" v-model="queryInp" :placeholder="placeholder" @keyup.enter.native="search">
            <i slot="append" class="el-input__icon iconfont icon-sousuo1" @click="search"></i>
          </el-input>
        </template>
        
      </div>
    </div>
    <div v-show="showDetails" class="query-details">
      <h4>
        <p class="tit">
          <span>{{info.disease_name}}</span>
          <i v-if="info.disease_name && info.disease_name !== ''" class="collect" :class="{'collected': isCollected}" @click="changeCollect">{{isCollected ? '已收藏': '收藏'}}</i>
        </p>
      </h4>
      <!-- <h4>{{info.disease_name}}2222</h4> -->
      <div class="block block1" v-if="info.Description !='暂无'">
        <p class="title"><em>疾病描述</em><span>Disease description</span></p>
        <p class="description">{{info.Description}}</p>
      </div>
      <div class="block block2"  v-if="info.Description !='暂无'">
        <p class="title"><em>简要信息</em><span>Brief information</span></p>
        <ul class="brief-info">
          <li v-if="info.Age_of_onset_orp !='暂无'"><i>发病年龄</i><span>{{info.Age_of_onset_orp}}</span></li>
          <li v-if="info.Inheritance_orp !='暂无'"><i>遗传方式</i><span>{{info.Inheritance_orp}}</span></li>
          <li v-if="info.Prevalence_orp !='暂无'"><i>发病率</i><span>{{info.Prevalence_orp}}</span></li>
        </ul>
      </div>
      <div class="block block3" 
          v-if="
            isMoreRelationship && 
            this.info.Phenotype_gene_relationship.length>0 &&
            info.Phenotype_gene_relationship[0].OMIM_id !== '暂无' &&
            info.Phenotype_gene_relationship[0].Location !== '暂无' &&
            info.Phenotype_gene_relationship[0].Gene !== '暂无' &&
            info.Phenotype_gene_relationship[0].Phenotype !== '暂无'
          ">
        <p class="title"><em>基因关联</em><span>Gene association</span></p>
        <div class="gene" >
          <template v-if="isMoreRelationship">
            <div class="diseases-tab diseases-tab1" style="margin-bottom:0">
              <p class="tit">
                <span>疾病名</span>
                <span>基因名</span>
                <span>染色体位置</span>
                <span>OMIM id</span>
              </p>
              <ul class="context">
                <li v-for="(item, index) in this.info.Phenotype_gene_relationship" :key="index">
                  <p :title="item.Phenotype" style="text-align:center; ">{{item.Phenotype}}</p>
                  <p :title="item.Gene" style="text-align:center">{{item.Gene}}</p>
                  <p>{{item.Location}}</p>
                  <p>
                    <span class="spn" @mouseenter="handleShowDialog(item.OMIM_id, index, $event)" @click="handleHideDialog(item)">{{item.OMIM_id}}</span>
                  </p>
                </li>
              </ul>
              <div class="mapping">
                <p class="txt">{{info.Mapping}}</p>
              </div>
            </div>
          </template>
          <template v-else>
            <ul class="aside" :class="{'brief-info': info.Mapping===''}"  >
              <li><i>疾病名</i><p style="text-align:center; " :title="info.Phenotype_gene_relationship[0].Phenotype">{{info.Phenotype_gene_relationship[0].Phenotype}}</p></li>
              <li><i>基因名</i><p :title="info.Phenotype_gene_relationship[0].Gene">{{info.Phenotype_gene_relationship[0].Gene}}</p></li>
              <li><i>染色体位置</i><p>{{info.Phenotype_gene_relationship[0].Location}}</p></li>
              <li><i>OMIM id</i>
                <p>
                  <span 
                    :class="{spn: info.Phenotype_gene_relationship[0].OMIM_id !== '暂无'}" 
                    @mouseenter="handleShowDialog(info.Phenotype_gene_relationship[0].OMIM_id, 0, $event)" 
                    @click="handleHideDialog(info.Phenotype_gene_relationship[0])">
                    {{info.Phenotype_gene_relationship[0].OMIM_id}}
                  </span>
                </p>
              </li>
            </ul>
            <div v-show="info.Mapping !== ''" class="mapping">
              <p>{{info.Mapping}}</p>
            </div>
          </template>
          
        </div>
      </div>
      <div class="block" v-if="changeInfoTxt">
        <p class="title"><em>该疾病完整信息</em><span>Complete information of the disease</span></p>
      </div>
    </div>
    <!--  -->
    <div v-if="showDetails" class="complete-information">
      <div class="all" v-if="changeInfoTxt">
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
import {transDiseaseName} from '@/utils/fieldMap'

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
          name: '疾病英文名'
        },
        {
          name: 'OMIM id'
        },
      ],
      queryActive: 0,
      placeholder: '',
      queryInp: '', // 219700    100050    MALOCCLUSION DUE TO PROTUBERANT UPPER FRONT TEETH
      isCollected: false, // 是否收藏
      reservedOne: 0,
      currentCollectId: '',
      info: {
        disease_name: '', // 疾病名
        Description: '', // 基因描述
        Age_of_onset_orp: '', // 简要信息-发病年龄
        Inheritance_orp: '', // 简要信息-遗传方式
        Prevalence_orp: '', // 简要信息-发病率
        Phenotype_gene_relationship: [
          {
            Phenotype: '',
            Gene: '', // 基因关联-基因名
            Location: '', // 基因关联-染色体位置
            OMIM_id: '', // 基因关联-OMIM id
          }
        ],
        Mapping: '', // 基因关联-基因关联中的一段文字
        Pathogenesis: '', // 发病机理
        Clinical_Features: '', // 临床表现
        Diagnosis: '', // 诊断
        Clinical_Management: '', // 治疗
        Population_Genetics: '', // 群体遗传学
        Cytogenetics: '', // 生化特征
        BiochemicalFeatures: '', // 细胞遗传学
        Molecular_Genetics: '', // 分子遗传学
        Animal_Model: '', // 动物模型
        reference: '', // 参考文献
      },
      isMoreRelationship: false, // 基因关联是否有多条数据，展示方式会有变化
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
      showDialog1: false,
      InfoDiaPos: {},
      dialogInfo: {},
      changeInfoList: [
        { name: '分子遗传学'},
        { name: '克隆和表达'},
        { name: '基因功能'},
        { name: '定位'},
      ],
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
          requestUrl = this.$Url.query.diseaseInfoByName
          params = { disease_name: String(this.queryInp)}
          break
        case 1:
          requestUrl = this.$Url.query.diseaseInformation
          params = { OMIM_id: String(this.queryInp)}
          break
      }

      this.$router.push({
        name: 'diseaseQuery',
        query: {
          search: this.queryInp,
          active: this.queryActive
        }
      })

      this.showDialog1 = false

      this.$get(requestUrl, params).then((res) => {
        if (res.status === 200) {
          let data = res.data || []
          if (Object.keys(data).length <= 0) {
            this.showDetails = false
            this.$message({
              type: 'warning',
              duration: 2000,
              message: '查找的内容不存在'
            })
            return
          }
          
          this.showDetails = true

          this.originData = data
          this.info.disease_name = data.disease_name
          this.info.Description = data.Description || data.definition_orp || '暂无'
          this.info.Age_of_onset_orp = data.Age_of_onset_orp || '暂无'
          this.info.Inheritance_orp = data.Inheritance_orp || '暂无'
          this.info.Prevalence_orp = data.Prevalence_orp || '暂无'

          // this.info.Description = data.Description || data.definition_orp;
          // this.info.Age_of_onset_orp = data.Age_of_onset_orp;
          // this.info.Inheritance_orp = data.Inheritance_orp ;
          // this.info.Prevalence_orp = data.Prevalence_orp;

          let ship = data.Phenotype_gene_relationship;
          // console.log(444,ship)
          if (ship !== '' && typeof ship === 'string') {
            // 由于数据中存在None，不符合json规范，所以需要先转一下
            ship = ship.replace(/ None,/g, ' \'None\',')
            // 然后替换单引号，成功解析json
            ship = JSON.parse(ship.replace(/\'/g, '\"'))
            if (ship !== '') {
              this.getShip(ship)
            } else {
              this.isMoreRelationship = false
              this.info.Phenotype_gene_relationship = [
                {
                  Phenotype: '暂无',
                  Gene: '暂无',
                  Location: '暂无',
                  OMIM_id: '暂无'
                }
              ]
            }
            
          } else {
            if (ship) {
              this.getShip(ship)
            } else {
              this.isMoreRelationship = true
              this.info.Phenotype_gene_relationship = [
                {
                  Phenotype: '暂无',
                  Gene: '暂无',
                  Location: '暂无',
                  OMIM_id: '暂无'
                }
              ]
            }
            
          }


          this.info.Mapping = data.Mapping


          let keys = Object.keys(data)
          let values = Object.values(data)
          let changeInfoList = []
          this.changeInfoTit = ''
          this.changeInfoTxt = ''
          for (let i in keys) {
            if (transDiseaseName(keys[i], 'cn') && values[i] !== '') {
              changeInfoList.push({cname: transDiseaseName(keys[i], 'cn'), ename: keys[i]})
            }
          }
          
          for (let i=0; i<changeInfoList.length; i++) {
            for (let j=i+1; j<changeInfoList.length; j++) {
              if (changeInfoList[j].cname === changeInfoList[i].cname) {
                changeInfoList.splice(j, 1)
                j--
              }
            }
          }
          this.changeInfoList = changeInfoList
          if (this.changeInfoList.length > 0) {
            this.changeInfo(this.changeInfoList[0], 0)
          }
          
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

    getShip(ship) {
      if (ship.length > 1) {
        this.isMoreRelationship = true
      } else {
        this.isMoreRelationship = false
      }
      let d = []
      for (let i in ship) {
        let Phenotype = ship[i]['Phenotype']
        if (Phenotype[0] === '{') {
          Phenotype = Phenotype.substr(1, Phenotype.length - 1)
        }
        if (Phenotype[Phenotype.length - 1] === '}') {
          Phenotype = Phenotype.substr(0, Phenotype.length - 1)
        }
        let obj = {
          Phenotype: Phenotype || '暂无',
          Gene: ship[i]['Gene/Locus'] || '暂无',
          Location: ship[i].Location || '暂无',
          OMIM_id: ship[i]['Gene/Locus  MIM number'] || '暂无'
        }
        d.push(obj)
      }
      // console.log(555, d)
      this.info.Phenotype_gene_relationship = d
    },
    
    // 切换完整信息展示
    changeInfo(item, index) {
      this.changeIndex = index
      this.changeInfoTit = item && item.cname
      let txt = this.originData[item.ename]

      if (item.cname === '临床表现') {
        txt = this.originData['Clinical_Features'] || this.originData['Clinical_description_orp']
      } else if (item.cname === '诊断') {
        txt = this.originData['Diagnosis'] || this.originData['Diagnostic_methods_orp']
      }
      this.changeInfoTxt = '<span>' + txt + '</span>'
    },
    getPlaceholder() {
      this.placeholder = '请输入' + this.queryList[this.queryActive].name
    },
    handleShowDialog(txt, index, $event) {
      if (txt === '-' || txt === '暂无') {
        this.showDialog1 = false
        return
      }

      let thisDescription = this.info.Phenotype_gene_relationship[index]['thisDescription']
      if (!thisDescription) {
        this.$get(this.$Url.query.genebyOmId, {
          omim_id: txt
        }).then(res => {
          if (res.status === 200) {
            let data = res.data
            if (data) {
              this.dialogInfo = {
                title: txt,
                type: 'OMIM:'+txt,
                description: data.gene_summary !== '' ? data.gene_summary : '暂无'
              }
              this.$set(this.info.Phenotype_gene_relationship[index], 'thisDescription', this.dialogInfo.description)
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
          type: 'OMIM:'+txt,
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
    handleHideDialog(item) {
      this.showDialog1 = false
      let url = this.$router.resolve({
        name: 'genesQuery',
        query: {
          search: item.OMIM_id,
          active: 1
        }
      })
      window.open(url.href, '_blank')
    },
    querySearch(queryString, cb) {
      this.$get(this.$Url.query.byDiseaseName, {
        diseaseName: queryString
      }).then(res => {
        let data = res.data
        if (data) {
          data.forEach(v => {
            v.value = v.diseaseName
          })
          cb(data)
        }
      }).catch(err => {})
    },
    handleSelect(item) {
      this.queryInp = item.diseaseName
      this.search()
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
          type: 0, 
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
    // let aaa = 
    // "[{\"Inheritance\": \"None\"}]"
    // "[{'Inheritance': None, 'Gene/Locus': 'KIT', 'Phenotype': 'Mastocytosis, systemic, somatic', 'Location': '4q12', 'Gene/Locus  MIM number': 164920, 'Phenotype  MIM number': 154800, 'Phenotype  mapping key': 3}, {'Inheritance': 'Autosomal dominant', 'Gene/Locus': 'KIT', 'Phenotype': 'Mastocytosis, cutaneous', 'Location': '4q12', 'Gene/Locus  MIM number': 164920, 'Phenotype  MIM number': 154800, 'Phenotype  mapping key': 3}]"
    // console.log(555, JSON.parse(aaa.replace(/\'/g, '\"')))
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
.block3 {
  margin-bottom: 113px;
  .gene {
    position: relative;
    // display: flex;
    // align-items: flex-tart;
    margin-top: 70px;
    .aside {
      position: relative;
      // width: 482px;
      width: 880px;
      margin: 0 auto 50px;
      list-style: none;
      &.brief-info {
        width: 880px;
        margin-bottom: 0;
        li {
          border: 0;
          border-bottom-right-radius: 70px;
          // background-color: transparent;
        }
      }
      li {
        position: relative;
        display: block;
        width: 100%;
        height: 68px;
        border: 1px solid $bgColor5;
        border-left: 0;
        border-top-left-radius: 70px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        margin-bottom: 4px;
        i {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 251px;
          height: 68px;
          line-height: 68px;
          border-top-left-radius: 70px;
          border-bottom-left-radius: 10px;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          text-align: center;
          font-style: normal;
          font-size: 22px;
          color: #fff;
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
        &:nth-of-type(4) i {
          background-color: $bgColor9;
        }
        p {
          display: inline-block;
          width: 100%;
          line-height: 68px;
          padding-left: 256px;
          padding-right: 10px;
          box-sizing: border-box;
          text-align: center;
          font-size: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            display: inline-block;
          }
        }
      }
    }
    .context {
      margin-bottom: 70px;
    }
  }
}
.mapping {
  // flex: 1;
  width: 100%;
  p {
    line-height: 30px;
    padding-left: 94px;
    padding-right: 35px;
    text-indent: 25px;
    font-size: 22px;
    color: #000;
    &.txt {
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>