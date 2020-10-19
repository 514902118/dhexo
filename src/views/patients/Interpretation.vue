<template>
  <div @click="handleHideDialog">
    <vLoginHeader/>
    <div class="top">
      <div class="box">
        <p class="title">{{patientName}}</p>
        <div class="elbtn" @click="toPdf">下载</div>
        <!-- <router-link :to="{ name: 'patientsReport', query: {id: this.$route.query.vcfId}}" tag="div" class="elbtn">下载</router-link> -->
        <!-- <div class="elbtn" @></div> -->
      </div>
    </div>
    <div class="query-details">
      <!-- 高度关注 -->
      <div class="block block1 horizontal-bar">
        <p class="title"><em>高度关注</em><span>High attention</span></p>
        <div class="gene-tab tab">
          <div class="tit tit-fix"></div>
          <div class="context-fix" :class="{'no-data': Object.keys(this.highAttention).length <= 0}">
            <p v-if="Object.keys(this.highAttention).length <= 0" class="no-data">暂无数据</p>
          </div>
          <vue-scroll :ops="scrollOps">
            <div class="tit tit2">
              <p>
                <span>RS</span>
                <span>染色体位置</span>
                <span>Ref</span>
                <span>Alt</span>
                <span>基因型</span>
                <span>MAF</span>
                <span>基因</span>
                <span>致病分值</span>
                <span>关联疾病</span>
                <span>来源</span>
                <span>蛋白变化</span>
                <span>突变影响</span>
                <span>文献</span>
              </p>
            </div>
            <ul class="context">
              <template v-if="Object.keys(this.highAttention).length > 0">
                <li v-for="(item, index) in this.highAttention" :key="index">
                  <p>{{item['变异']}}</p>
                  <p>{{item['染色体位置']}}</p>
                  <p>{{item['Ref']}}</p>
                  <p>{{item['Alt']}}</p>
                  <p>{{item['基因型']}}</p>
                  <p>{{item['MAF(亚洲)']}}</p>
                  <p>{{item['基因']}}</p>
                  <p>{{item['致病分值']}}</p>
                  <p>{{typeof item['相关疾病'] === 'string' ? item['相关疾病'] : item['相关疾病'].join(',')}}</p>
                  <p>{{typeof item['来源'] === 'string' ? item['来源'] : item['来源'].join(',')}}</p>
                  <p>{{item['蛋白变化']}}</p>
                  <p>{{item['突变类型']}}</p>
                  <p >
                    <span v-for="(ite, i) in item['文献']" :key="i" @mouseenter="handleShowDialog(ite.name, index, i, 'highAttention', $event)" @click="handleHideDialog" class="spn">
                      {{ite.name}}{{Number(i) !== (item['文献'].length - 1) ? ',' : ''}}
                    </span>
                  </p>
                </li>
              </template>
              <template v-else>
                <li class="no-data"></li>
              </template>
            </ul>
          </vue-scroll>
        </div>
      </div>
      <!-- 中度关注 -->
      <div class="block block2 horizontal-bar">
        <p class="title"><em>中度关注</em><span>Moderate attention</span></p>
        <div class="gene-tab tab">
          <div class="tit tit-fix"></div>
          <div class="context-fix"></div>
          <vue-scroll :ops="scrollOps">
            <div class="tit tit2">
              <p>
                <span>RS</span>
                <span>染色体位置</span>
                <span>Ref</span>
                <span>Alt</span>
                <span>基因型</span>
                <span>MAF</span>
                <span>基因</span>
                <span>致病分值</span>
                <span>关联疾病</span>
                <span>来源</span>
                <span>蛋白变化</span>
                <span>突变影响</span>
                <span>文献</span>
              </p>
            </div>
            <ul class="context">
              <template v-if="Object.keys(this.middleAttention).length > 0">
                <li v-for="(item, index) in this.middleAttention" :key="index">
                  <p>{{item['变异']}}</p>
                  <p>{{item['染色体位置']}}</p>
                  <p>{{item['Ref']}}</p>
                  <p>{{item['Alt']}}</p>
                  <p>{{item['基因型']}}</p>
                  <p>{{item['MAF(亚洲)']}}</p>
                  <p>{{item['基因']}}</p>
                  <p>{{item['致病分值']}}</p>
                  <p>{{typeof item['相关疾病'] === 'string' ? item['相关疾病'] : item['相关疾病'].join(',')}}</p>
                  <p>{{typeof item['来源'] === 'string' ? item['来源'] : item['来源'].join(',')}}</p>
                  <p>{{item['蛋白变化']}}</p>
                  <p>{{item['突变类型']}}</p>
                  <p >
                    <template v-if="item['文献'].length <= 2">
                      <span v-for="(ite, i) in item['文献']" :key="i" @mouseenter="handleShowDialog(ite.name, index, i, 'middleAttention', $event)" @click="handleHideDialog" class="spn">
                        {{ite.name}}{{Number(i) !== (item['文献'].length - 1) ? ',' : ''}}
                      </span>
                    </template>
                    <template v-else>
                      <span v-for="(ite, i) in item['文献']" :key="i" @mouseenter="handleShowDialog(ite.name, index, i, 'middleAttention', $event)" @click="handleHideDialog" class="spn">
                        <template v-if="i<2">
                          {{ite.name}}{{Number(i) !== (item['文献'].length - 1) ? ',' : ''}}
                        </template>
                      </span>
                      <span class="spn more" @click="showMoreDialog(item['文献'])">更多>></span>
                    </template>
                    <!-- <span v-for="(ite, i) in item['文献']" :key="i" @mouseenter="handleShowDialog(ite.name, index, i, 'middleAttention', $event)" @click="handleHideDialog" class="spn">
                      {{ite.name}}{{Number(i) !== (item['文献'].length - 1) ? ',' : ''}}
                    </span> -->
                  </p>
                </li>
              </template>
              <template v-else>
                <li class="no-data"></li>
              </template>
            </ul>
          </vue-scroll>
        </div>
      </div>
      <!-- 其他 -->
      <div class="block block3 horizontal-bar">
        <p class="title"><em>其他</em><span>other</span></p>
        <div class="gene-tab tab">
          <div class="tit tit-fix"></div>
          <div class="context-fix"></div>
          <vue-scroll :ops="scrollOps">
            <div class="tit tit2">
              <p>
                <span>RS</span>
                <span>染色体位置</span>
                <span>Ref</span>
                <span>Alt</span>
                <span>基因型</span>
                <span>MAF</span>
                <span>基因</span>
                <span>致病分值</span>
                <span>蛋白变化</span>
                <span>突变影响</span>
              </p>
            </div>
            <ul class="context">
              <template v-if="Object.keys(this.otherAttention).length > 0">
                <li v-for="(item, index) in this.otherAttention" :key="index">
                  <p>{{item['变异']}}</p>
                  <p>{{item['染色体位置']}}</p>
                  <p>{{item['Ref']}}</p>
                  <p>{{item['Alt']}}</p>
                  <p>{{item['基因型']}}</p>
                  <p>{{item['MAF(亚洲)']}}</p>
                  <p>{{item['基因']}}</p>
                  <p>{{item['致病分值']}}</p>
                  <p>{{item['蛋白变化']}}</p>
                  <p>{{item['突变类型']}}</p>
                </li>
              </template>
              <template v-else>
                <li class="no-data"></li>
              </template>
            </ul>
          </vue-scroll>
        </div>
      </div>
      <!-- 参考文献 -->
      <div class="block block4">
        <p class="title"><em>参考文献</em><span>reference</span></p>
        <p class="description">
          <!-- [1]  Ammann, A. J., Wara, D. W., Cowan, M. J., Barrett, D. J., Stiehm, E. R. The DiGeorge syndrome and the fetal alcohol syndrome. Am. J. Dis. Child. 136: 906-908, 1982.

[2]  Asamoto, H., Furuta, M. DiGeorge syndrome associated with glioma and two kinds of viral infection. (Letter) New Eng. J. Med. 296: 1235 only, 1977. -->
        </p>
      </div>
    </div>
    <!-- 展示更多 -->
    <el-dialog
      title="文献"
      :visible.sync="moreDialog"
      width="700px"
      append-to-body
      center
      class="eldialog more-dialog">
      <span></span>
      <span v-for="(ite, i) in moreData" :key="i" @mouseenter="handleShowDialog(ite.name, 0, i, 'moreData', $event)" @click="handleHideDialog" class="spn">
        {{ite.name}}{{Number(i) !== (moreData.length - 1) ? ',' : ''}}
      </span>
    </el-dialog>
    <!--  -->
    <InfoDialog :pos="InfoDiaPos" :data="dialogInfo" v-if="showDialog1"/>
    <vFooter/>
  </div>
</template>

<script>
import vLoginHeader from '@/components/common/vLoginHeader'
import vFooter from '@/components/common/vFooter'
import InfoDialog from '@/components/InfoDialog'

export default {
  components: {
    vLoginHeader,
    vFooter,
    InfoDialog,
  },
  data() {
    return {
      patientName: this.$route.query.patientName || '',
      allData: {},
      // 高度关注
      highAttention: {},
      // 中度关注
      middleAttention: {},
      // 其他
      otherAttention: {},
      scrollOps: {
        vuescroll: {
          mode: 'native'
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: true,
          scrollingY: false,
        },
        // 轨道
        rail: {
          background: '#f1f1f1',
          opacity: 1,
          size: '5px',
          specifyBorderRadius: '6px',
          gutterOfEnds: '100px',
        },
        // 滚动条
        bar: {
          background: '#959595',
          onlyShowBarOnScroll: true,
          showDelay: 0,
          keepShow: true,
          size: '11px'
        }
      },
      showDialog1: false,
      InfoDiaPos: {},
      dialogInfo: {},
      moreDialog: false,
      moreData: []
    }
  },
  methods: {
    init() {
      this.$get(this.$Url.vcf.detail, {
        vcfId: this.$route.query.vcfId
      }).then(res => {
        let data = res.data
        if (data) {
          let allData = JSON.parse(data)
          // this.highAttention = allData['高度关注']
          this.getWxInfo(allData['高度关注'], (d) => {
            this.highAttention = d
          })

          // let middleAttention = allData['中度关注']
          this.getWxInfo(allData['中度关注'], (d) => {
            this.middleAttention = d
          })
          
          this.otherAttention = allData['其他']

        }
        
      }).catch(err => {})
    },
    getWxInfo(data, func) {
      let keys = Object.keys(data)
      let values = Object.values(data)
      values.forEach(v => {
        let wx = v['文献']
        if (typeof wx !== 'string') {
          let arr = []
          for (let j in wx) {
            let child = wx[j].split(',')
            let cArr = []
            for (let k in child) {
              if (child[k] !== 'None') {
                cArr.push({
                  name: child[k],
                  abst: ''
                })
              }
            }
            child = cArr
            arr.push(...child)
          }
          v['文献'] = arr
        } else {
          let child = wx.split(',')
          let cArr = []
          for (let i in child) {
            if (child[i] !== 'None') {
              cArr.push({
                name: child[i],
                abst: ''
              })
            }
          }
          child = cArr
          v['文献'] = child
        }
        func && func(data)
      })
    },

    handleShowDialog(txt, index, i, sdata, $event) {
      if (txt === '-') {
        this.showDialog1 = false
        return
      }

      let abst = ''
      if (sdata === 'moreData') {
        abst = this[sdata][i]['abst']
      } else {
        abst = this[sdata][index]['文献'][i]['abst']
      }
      // console.log(123,this[sdata][index]['文献'][i])
      // return
      if (!abst) {
        this.$get(this.$Url.query.genebyOmId, {
          omim_id: txt
        }).then(res => {
          if (res.status === 200) {
            let data = res.data
            if (data) {
              this.dialogInfo = {
                title: txt,
                description: data.gene_summary !== '' ? data.gene_summary : '暂无'
              }
              if (sdata === 'moreData') {
                this.$set(this[sdata][i], 'abst', this.dialogInfo.description)
              } else {
                this.$set(this[sdata][index]['文献'][i], 'abst', this.dialogInfo.description)
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
          description: abst
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
    toPdf() {
      let formData = new FormData()
      formData.append('patientId', this.$route.query.patientId)
      let config = {
        headers: { 'Content-Type': 'multipart/form-data'},
        responseType: 'arraybuffer'
      }
      this.$post(this.$Url.pdf.export, formData, config).then(res => {
        let dom = document.createElement('a')
        let data = res
        let blob = new Blob([data], { type: 'application/pdf;charset-UTF-8' })
        let fileName = this.patientName + '的全外解读报告.pdf'
        if (blob.size < 100) {
          this.$message({
            type: 'warning',
            duration: 2000,
            message: '报告解析中，请稍后下载'
          })
        } else {
          dom.download = fileName
          dom.style.display = 'none'
          dom.href = URL.createObjectURL(blob)
          document.body.appendChild(dom)
          dom.click()
          URL.revokeObjectURL(dom.href) // 释放URL 对象
          document.body.removeChild(dom)
        }
      }).catch(err => {})
    },
    // 展示更多
    showMoreDialog(item) {
      this.moreData = item
      this.moreDialog = true
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import '@/static/_common';
.top {
  position: relative;
  width: 100%;
  height: 160px;
  margin-bottom: 20px;
  background-color: $bgColor1;
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1270px;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    .title {
      flex: 1;
      padding-left: 20px;
      text-align: left;
      font-size: 28px;
      color: $fontColor11;
    }
    .elbtn {
      width: 160px;
      height: 48px;
      line-height: 48px;
      border-radius: 36px;
      margin-right: 20px;
      text-align: center;
      font-size: 18px;
      color: #fff;
      background-image: $bgGradient2;
      cursor: pointer;
    }
  }
}
.query-details {
  margin-bottom: 40px;
}
.horizontal-bar {
  .tab {
    width: 1128px;
    .tit {
      display: block;
      width: 100%;
      padding: 0;
      // overflow-x: auto;
      p {
        display: flex;
        width: calc(200%);
        padding: 0 35px;
        box-sizing: border-box;
      }
      &.tit-fix {
        position: absolute;
        width: calc(100% + 40px);
        margin-left: -20px;
      }
      &.tit2 {
        background: none;
      }
    }
    .context {
      display: block;
      width: calc(200%);
      border-color: transparent;
      li {
        background-color: transparent;
      }
    }
    .context-fix {
      position: absolute;
      top: 80px;
      width: calc(100% + 40px);
      height: calc(100% - 70px - 12px - 50px);
      border: 1px solid $bgColor5;
      border-top-left-radius: 56px;
      border-bottom-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 56px;
      margin-left: -20px;
      &.no-data {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: $bgColor9;
      }
      .no-data {
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
.block4 {
  .description {
    width: 1108px;
    line-height: 30px;
    padding-bottom: 40px;
    margin: 0 auto 50px;
    text-indent: 25px;
    font-size: 22px;
    color: #000;
  }
}
.more {
  cursor: pointer;
}
.spn {
  font-size: 20px;
}
</style>