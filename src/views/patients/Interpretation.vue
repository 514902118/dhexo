<template>
  <div @click="handleHideDialog">
    <vLoginHeader/>
    <div class="top">
      <div class="box">
        <p class="title">{{ patientName }}</p>
        <div
            class="elbtn"
            @click="toPdf"
        >下载
        </div>
      </div>
    </div>
    <div class="query-details">
      <div class="section-tip">
        用时 <span>{{ time }}</span> s，检索了 <span>16,257</span> 个基因， <span>9,014</span>个疾病 ，<span>12,568,986</span>
        个变异后，发现了高度关注 <span>{{ sectionTip.gdNum }}</span>个 ,中度关注 <span>{{ sectionTip.zdNum }}</span>个, 其他变异
        <span>{{ sectionTip.otherNum }}</span>个
      </div>
      <!-- 高度关注 -->
      <div class="block block1 horizontal-bar">
        <p class="title"><em>高度关注</em><span>
            <!--High attention-->Variants of High Interest
          </span></p>
        <div class="gene-tab tab">
          <div class="tit tit-fix"></div>
          <div
              class="context-fix"
              :class="{ 'no-data': Object.keys(this.highAttention).length <= 0 }"
          >
            <p
                v-if="Object.keys(this.highAttention).length <= 0"
                class="no-data"
            >
              暂无数据
            </p>
          </div>
          <vue-scroll :ops="scrollOps">
            <div class="tit tit2">
              <p>

                <el-tooltip
                    effect="light"
                    placement="top"
                >
              <div
                  slot="content"
                  class="tip-style"
              >变异的RefSNP accession ID
              </div>
              <span>变异位点</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >变异所在在基因组上的位置
                </div>
                <span>染色体位置</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >该突变可能导致的疾病
                </div>
                <span>关联疾病</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >
                  参考:不携带该致病基因的基因型，患者：患者基因型
                </div>
                <span>参考/患者</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >变异所在基因
                </div>
                <span>基因</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >最小等位基因频率
                </div>
                <span>MAF（亚洲）</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >该突变导致编码蛋白的变化情况
                </div>
                <span>蛋白变化</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >突变致病信息的数据库
                </div>
                <span>依据</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >相关文献的Pubmed ID
                </div>
                <span>文献</span>
              </el-tooltip>
              </p>
            </div>
            <ul class="context">
              <template v-if="Object.keys(this.highAttention).length > 0">
                <li
                    v-for="(item, index) in this.highAttention"
                    :key="index"
                >
                  <p>{{ item["变异"] }}</p>
                  <p
                      class="more"
                      @click="toLineHandle(item['染色体位置'])"
                  >
                    Chr{{ item["染色体位置"] }}
                  </p>
                  <p>
                    <span
                        @click="linkXGJBHandle(item['相关疾病'], $event)"
                        class="spn"
                        style="display: block"
                        v-if="typeof item['相关疾病'] === 'string'"
                    >
                      {{ item["相关疾病"] }}</span>
                    <span
                        @click="linkXGJBHandle(xgjbItem, $event)"
                        class="spn"
                        style="display: block"
                        v-else
                        v-for="(xgjbItem, xgjbIndex) in item['相关疾病']"
                        :key="xgjbIndex"
                    >
                      {{ xgjbItem }}
                    </span>
                  </p>
                  <p>{{ item["Ref"] }}{{ item["Ref"] }}/{{ item["基因型"] == '0/1' ? "CA" : "AA" }}</p>
                  <p>{{ item["基因"] }}</p>
                  <p>{{ item["MAF(亚洲)"] }}</p>

                  <p>{{ item["蛋白变化"] == "N" ? "unknown" : item["蛋白变化"] == "None" ? "unknown" : item["蛋白变化"] }}</p>
                  <p>
                    <span
                        style="display: block"
                        v-if="typeof item['来源'] === 'string'"
                    >{{ item["来源"] }}</span>
                    <span
                        style="display: block"
                        v-else
                        v-for="(lyItem, lyIndex) in item['来源']"
                        :key="lyIndex"
                    >
                      {{ lyItem }}
                    </span>
                  </p>
                  <p>
                    <template v-if="item['weiXianKey']">
                      {{ item['weiXianKey'] }}
                    </template>
                    <template v-else>
                      -
                    </template>
                    <!-- <template v-if="item['文献'].length <= 2">
                      <span style="display: block" v-for="(ite, i) in item['文献']" :key="i"
                        @click="literatureClickHandle(ite.name)" class="spn">
                        {{ ite.name }}{{ Number(i) !== item["文献"].length - 1 ? "" : "" }}
                      </span>
                    </template>
                    <template v-else>
                      <span style="display: block" v-for="(ite, i) in item['文献']" :key="i"
                        @click="literatureClickHandle(ite.name)" class="spn">
                        <template v-if="i < 2">
                          {{ ite.name }}{{ Number(i) !== item["文献"].length - 1 ? "" : ""}}
                        </template>
                      </span>
                      <span class="spn more" @click="showMoreDialog(item['文献'])">更多>></span>

                    </template> -->
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
        <p class="title"><em>中度关注</em><span>
            <!--Moderate attention-->Variants of Moderate Interest
          </span></p>
        <div class="gene-tab tab">
          <div class="tit tit-fix"></div>
          <div class="context-fix"></div>
          <vue-scroll :ops="scrollOps">
            <div class="tit tit2">
              <p>
                <el-tooltip
                    effect="light"
                    placement="top"
                >
              <div
                  slot="content"
                  class="tip-style"
              >变异的RefSNP accession ID
              </div>
              <span>变异位点</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >变异所在在基因组上的位置
                </div>
                <span>染色体位置</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >该突变可能导致的疾病
                </div>
                <span>关联疾病</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >
                  参考:不携带该致病基因的基因型，患者：患者基因型
                </div>
                <span>参考/患者</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >变异所在基因
                </div>
                <span>基因</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >最小等位基因频率
                </div>
                <span>MAF（亚洲）</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >该突变导致编码蛋白的变化情况
                </div>
                <span>蛋白变化</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >突变致病信息的数据库
                </div>
                <span>依据</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >相关文献的Pubmed ID
                </div>
                <span>文献</span>
              </el-tooltip>
              </p>
            </div>
            <ul class="context">
              <template v-if="Object.keys(this.middleAttention).length > 0">
                <li
                    v-for="(item, index) in this.middleAttention"
                    :key="index"
                >
                  <p>{{ item["变异"] }}</p>
                  <p
                      class="more"
                      @click="toLineHandle(item['染色体位置'])"
                  >
                    Chr{{ item["染色体位置"] }}
                  </p>
                  <p>
                    <span
                        @click="linkXGJBHandle(item['相关疾病'], $event)"
                        class="spn"
                        style="display: block"
                        v-if="typeof item['相关疾病'] === 'string'"
                    >
                      {{ item["相关疾病"] }}</span>
                    <span
                        @click="linkXGJBHandle(xgjbItem, $event)"
                        class="spn"
                        style="display: block"
                        v-else
                        v-for="(xgjbItem, xgjbIndex) in item['相关疾病']"
                        :key="xgjbIndex"
                    >
                      {{ xgjbItem }}
                    </span>
                  </p>
                  <p>{{ item["Ref"] }}{{ item["Ref"] }}/{{ item["基因型"] == '0/1' ? "CA" : "AA" }}</p>
                  <p>{{ item["基因"] }}</p>
                  <p>{{ item["MAF(亚洲)"] }}</p>
                  <p>{{ item["蛋白变化"] == "N" ? "unknown" : item["蛋白变化"] == "None" ? "unknown" : item["蛋白变化"] }}</p>
                  <p>
                    <span
                        style="display: block"
                        v-if="typeof item['来源'] === 'string'"
                    >{{ item["来源"] }}</span>
                    <span
                        style="display: block"
                        v-else
                        v-for="(lyItem, lyIndex) in item['来源']"
                        :key="lyIndex"
                    >
                      {{ lyItem }}
                    </span>
                  </p>
                  <p>
                    <template v-if="item['weiXianKey']">
                      {{ item['weiXianKey'] }}
                    </template>
                    <template v-else>
                      -
                    </template>
                    <!-- <template v-if="item['文献'].length <= 2">
                      <span style="display: block" v-for="(ite, i) in item['文献']" :key="i"
                        @click="literatureClickHandle(ite.name)" class="spn">
                        {{ ite.name
                        }}{{ Number(i) !== item["文献"].length - 1 ? "," : "" }}
                      </span>
                    </template>
                    <template v-else>
                      <span v-for="(ite, i) in item['文献']" :key="i" @click="literatureClickHandle(ite.name)"
                        class="spn">
                        <template v-if="i < 2">
                          <span style="display: block">
                            {{ ite.name }}{{ Number(i) !== item["文献"].length - 1 ? "" : ""}}</span>
                        </template>
                      </span>
                      <span class="spn more" @click="showMoreDialog(item['文献'])">更多>></span>
                    </template> -->
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
        <p class="title"><em>其他</em><span>
            <!--other--> Other Variants of Interest
          </span></p>
        <div class="gene-tab tab">
          <div class="tit tit-fix"></div>
          <div class="context-fix"></div>
          <vue-scroll :ops="scrollOps">
            <div class="tit tit2">
              <p>
                <el-tooltip
                    effect="light"
                    placement="top"
                >
              <div
                  slot="content"
                  class="tip-style"
              >变异的RefSNP accession ID
              </div>
              <span>变异位点</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >变异所在在基因组上的位置
                </div>
                <span>染色体位置</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >
                  参考:不携带该致病基因的基因型，患者：患者基因型
                </div>
                <span>参考/患者</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >变异所在基因
                </div>
                <span>基因</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >最小等位基因频率
                </div>
                <span>MAF（亚洲）</span>
              </el-tooltip>
              <el-tooltip
                  effect="light"
                  placement="top"
              >
                <div
                    slot="content"
                    class="tip-style"
                >该突变导致编码蛋白的变化情况
                </div>
                <span>蛋白变化</span>
              </el-tooltip>
              </p>
            </div>
            <ul class="context">
              <template v-if="Object.keys(this.otherAttention).length > 0">
                <li
                    v-for="(item, index) in this.otherAttention"
                    :key="index"
                >
                  <p>{{ item["变异"] }}</p>
                  <p
                      class="more"
                      @click="toLineHandle(item['染色体位置'])"
                  >
                    Chr{{ item["染色体位置"] }}
                  </p>
                  <p>{{ item["Ref"] }}{{ item["Ref"] }}/{{ item["基因型"] == '0/1' ? "CA" : "AA" }}</p>
                  <p>{{ item["基因"] }}</p>
                  <p>{{ item["MAF(亚洲)"] }}</p>
                  <p>{{ item["蛋白变化"] == "N" ? "unknown" : item["蛋白变化"] == "None" ? "unknown" : item["蛋白变化"] }}</p>
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
      <div
          class="block block4 references"
          v-if="searchLiterature.length > 0"
      >
        <p class="title"><em>参考文献</em><span>References</span></p>
        <div class="references-cont">
          <p
              v-for="(item, index) in searchLiterature"
              :key="index"
          >
            <span style="padding-right:10px;">{{ item.key }}.</span>
            <span v-if="item.name!='None'" v-html="item.author"></span>
            <span v-if="item.name!='None'" v-html="item.title"></span>
            <i v-if="item.name!='None'" v-html="item.periodicalName"></i>
            <strong v-if="item.name!='None'" v-html="item.periodicalNumber"></strong>
            <span v-if="item.name!='None'" v-html="item.publishingTime"></span>
            <span v-else>{{ item.name }}</span>
          </p>
        </div>
        <!-- <div class="description">
          [1] Ammann, A. J., Wara, D. W., Cowan, M. J., Barrett, D. J., Stiehm,
          E. R. The DiGeorge syndrome and the fetal alcohol syndrome. Am. J.
          Dis. Child. 136: 906-908, 1982. [2] Asamoto, H., Furuta, M. DiGeorge
          syndrome associated with glioma and two kinds of viral infection.
          (Letter) New Eng. J. Med. 296: 1235 only, 1977.
        </div> -->
      </div>
    </div>
    <!-- 展示更多 -->
    <el-dialog
        title="文献"
        :visible.sync="moreDialog"
        width="700px"
        append-to-body
        center
        class="eldialog more-dialog"
    >
      <span></span>
      <span
          v-for="(ite, i) in moreData"
          :key="i"
          @click="literatureClickHandle(ite.name)"
          class="spn"
      >
        {{ ite.name }}{{ Number(i) !== moreData.length - 1 ? "," : "" }}
      </span>
    </el-dialog>
    <!--  -->
    <InfoDialog
        :pos="InfoDiaPos"
        :data="dialogInfo"
        v-if="showDialog1"
    />
    <vFooter/>
  </div>
</template>

<script>
import vLoginHeader from '@/components/common/vLoginHeader'
import vFooter from '@/components/common/vFooter'
import InfoDialog from '@/components/InfoDialog'
import * as Cookies from 'tiny-cookie'

export default {
  components: {
    vLoginHeader,
    vFooter,
    InfoDialog,
  },
  data() {
    let loading = '' //定义loading变量
    var number = 0

    function startLoading() {
      //使用Element loading-start 方法
      number++
      loading = Loading.service({
        lock: false,
        text: '加载中，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)',
      })
    }

    function endLoading() {
      //使用Element loading-close 方法
      number = 0
      loading.close()
    }

    return {
      time: 0,
      sectionTip: {
        gdNum: 0,
        zdNum: 0,
        otherNum: 0,
      },
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
          mode: 'native',
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
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
          size: '11px',
        },
      },
      showDialog1: false,
      InfoDiaPos: {},
      dialogInfo: {},
      moreDialog: false,
      moreData: [],
      references: [], // 参考文献号
      searchLiterature: [], //参考文献数据
    }
  },
  methods: {
    init() {
      this.$get(this.$Url.vcf.detail, {
        vcfId: this.$route.query.vcfId,
      })
          .then(res => {
            let data = res.data
            if (data) {
              let allData = JSON.parse(data)

              // 处理用时时间
              this.time = allData.cost

              // this.highAttention = allData['高度关注']
              this.getWxInfo(allData['高度关注'], d => {
                this.highAttention = d
              })

              // let middleAttention = allData['中度关注']
              this.getWxInfo(allData['中度关注'], d => {
                this.middleAttention = d
              })

              this.otherAttention = allData['其他']

              // 中度关注_num
              this.sectionTip = {
                gdNum: allData['高度关注_num'],
                zdNum: allData['中度关注_num'],
                otherNum: allData['其他_num'],
              }

              // 处理高度关注文献

              Object.keys(this.highAttention).forEach(item => {
                let weiXianKeyArr = []
                let weiXianKeyArrs = []
                if (this.highAttention[item]['wenXian']) {
                  Object.keys(
                      this.highAttention[item]['wenXian']
                  ).forEach(key => {
                    let obj = {
                      name: this.highAttention[item]['wenXian'][key],
                      key: key
                    }
                    weiXianKeyArr.push(key)
                    weiXianKeyArrs.push(obj)
                  })
                  this.highAttention[item]['weiXianKey'] = weiXianKeyArr[0] + '-' + weiXianKeyArr[weiXianKeyArr.length - 1]
                  this.highAttention[item]['weiXianKeys'] = weiXianKeyArrs
                }
              })

              // 处理中度关注文献
              Object.keys(this.middleAttention).forEach(item => {
                let middleweiXianKeyArr = []
                let middleweiXianKeyArrs = []
                if (this.middleAttention[item]['wenXian']) {
                  Object.keys(
                      this.middleAttention[item]['wenXian']
                  ).forEach(key => {
                    let obj = {
                      name: this.middleAttention[item]['wenXian'][key],
                      key: key
                    }
                    middleweiXianKeyArr.push(key)
                    middleweiXianKeyArrs.push(obj)
                  })
                  this.middleAttention[item]['weiXianKey'] =
                      middleweiXianKeyArr[0] +
                      '-' +
                      middleweiXianKeyArr[
                      middleweiXianKeyArr.length - 1
                          ]
                  this.middleAttention[item][
                      'weiXianKeys'
                      ] = middleweiXianKeyArrs
                }
              })

              setTimeout(() => {
                this.concatHandle()
                // clearInterval(this.timer);
              }, 1000)
            }
          })
          .catch(err => {
          })
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
                  abst: '',
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
                abst: '',
              })
            }
          }
          child = cArr
          v['文献'] = child
        }
        func && func(data)
      })
    },

    handleShowDialog(txt, index, i, sdata, $event, type) {
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

      if (!abst && type != 'variantPmid' && sdata === 'moreData') {
        debugger
        this.$get(this.$Url.query.genebyOmId, {
          omim_id: txt,
        })
            .then(res => {
              if (res.status === 200) {
                let data = res.data
                if (data) {
                  this.dialogInfo = {
                    title: txt,
                    description:
                        data.gene_summary !== ''
                            ? data.gene_summary
                            : '暂无',
                  }
                  if (sdata === 'moreData') {
                    this.$set(
                        this[sdata][i],
                        'abst',
                        this.dialogInfo.description
                    )
                  } else {
                    this.$set(
                        this[sdata][index]['文献'][i],
                        'abst',
                        this.dialogInfo.description
                    )
                  }

                  this.showDialog1 = true
                  let width = document.body.clientWidth
                  let height = document.body.clientHeight
                  this.InfoDiaPos = {
                    pageX:
                        $event.pageX + 300 > width
                            ? $event.pageX - 380
                            : $event.pageX,
                    pageY:
                        $event.pageY + 300 > height
                            ? $event.pageY - 300
                            : $event.pageY,
                  }
                }
              }
            })
            .catch(err => {
            })
      } else if (type == 'variantPmid') {
        /**
         * 查询文献接口
         */
        window.$.ajax({
          headers: {
            token: Cookies.get('token'),
          },
          url: this.$Url.query.literature,
          data: {
            literatureId: txt,
          },
          success: res => {
            this.dialogInfo = {
              title: txt,
              description: res.data.literatureData,
              type: 'PMID:' + txt,
            }
            this.showDialog1 = true
            let width = document.body.clientWidth
            let height = document.body.clientHeight
            this.InfoDiaPos = {
              pageX:
                  $event.pageX + 300 > width
                      ? $event.pageX - 380
                      : $event.pageX,
              pageY:
                  $event.pageY + 300 > height
                      ? $event.pageY - 300
                      : $event.pageY,
            }
          },
        })
      } else {
        this.dialogInfo = {
          title: txt,
          description: abst,
        }
        this.showDialog1 = true
        let width = document.body.clientWidth
        let height = document.body.clientHeight
        this.InfoDiaPos = {
          pageX:
              $event.pageX + 300 > width
                  ? $event.pageX - 380
                  : $event.pageX,
          pageY:
              $event.pageY + 300 > height
                  ? $event.pageY - 300
                  : $event.pageY,
        }
      }
    },
    handleHideDialog(ite) {
      this.showDialog1 = false
    },
    toPdf() {
      let formData = new FormData()
      formData.append('patientId', this.$route.query.patientId)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'},
        responseType: 'arraybuffer',
      }
      this.$post(this.$Url.pdf.export, formData, config)
          .then(res => {
            let dom = document.createElement('a')
            let data = res
            let blob = new Blob([data], {
              type: 'application/pdf;charset-UTF-8',
            })
            let fileName = this.patientName + '的全外解读报告.pdf'
            if (blob.size < 100) {
              this.$message({
                type: 'warning',
                duration: 2000,
                message: '报告解析中，请稍后下载',
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
          })
          .catch(err => {
          })
    },
    // 展示更多
    showMoreDialog(item) {
      this.moreData = item
      this.moreDialog = true
    },

    /**
     * 染色体跳转
     */
    toLineHandle(item) {
      let arr = item.split(':')
      let openUrl = `http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr${arr[0]}%3A${arr[1]}`
      window.open(openUrl, '_blank')
    },
    linkXGJBHandle(txt, $event) {
      window.open(
          '/#/query/disease?search=' + txt + '&active=1',
          '_blank'
      )
    },
    /**
     * 相关疾病
     */
    showXGJBHandle(txt, $event) {
      /**
       * 查询相关疾病接口
       */
      window.$.ajax({
        headers: {
          token: Cookies.get('token'),
        },
        url: this.$Url.query.diseaseInformation,
        data: {
          OMIM_id: txt,
        },
        success: res => {
          if (res.status === 200) {
            let data = res.data
            this.dialogInfo = {
              title: txt,
              description:
                  data.Description ||
                  data.definition_orp ||
                  '暂无',
              type: 'OMIM:' + txt,
            }
            this.showDialog1 = true
            let width = document.body.clientWidth
            let height = document.body.clientHeight
            this.InfoDiaPos = {
              pageX:
                  $event.pageX + 300 > width
                      ? $event.pageX - 380
                      : $event.pageX,
              pageY:
                  $event.pageY + 300 > height
                      ? $event.pageY - 300
                      : $event.pageY,
            }
          }
        },
        error: err => {
        },
      })
    },

    /**
     * 参考文献
     */
    concatHandle() {
      // 高度关注 合并 中毒关注

      let highAttentionObj = Object.keys(this.highAttention).map(item => {
        let highAttentionItem

        if (this.highAttention[item]['weiXianKeys']) {
          highAttentionItem = this.highAttention[item]['weiXianKeys'].map(fItem => fItem)
        }

        return highAttentionItem
      })


      let middleAttentionObj = Object.keys(this.middleAttention).map(
          item => {
            let middleAttentionItem

            if (this.middleAttention[item]['weiXianKeys']) {
              middleAttentionItem = this.middleAttention[item]['weiXianKeys'].map(fItem => fItem)
            }

            return middleAttentionItem
          }
      )

      let highAttentionArr = [].concat(...highAttentionObj)
      let middleAttentionArr = [].concat(...middleAttentionObj)
      this.references = highAttentionArr.concat(middleAttentionArr)
      this.references = this.references.filter(item => item != undefined)
      this.searchLiteratureHandle()
    },
    searchLiteratureHandle() {
      if (this.references.length != 0) {
        this.references.forEach((item, index) => {
          this.viewLiteratureLayerHandle(item)
        })
      }

      console.log(this.searchLiterature)
    },

    viewLiteratureLayerHandle(item) {
      this.$get(this.$Url.query.literature, {
        literatureId: item.name,
      }).then(res => {
        if (res.status === 200) {
          let resData = res.data
          let arr = resData != null ? {
            key: item.key,
            author: `${resData.author}&nbsp;&nbsp;`, //作者
            title: `${resData.title}&nbsp;&nbsp;`, //标题
            periodicalName: `${resData.periodicalName}&nbsp;`, //期刊名
            periodicalNumber: `${resData.periodicalNumber}&nbsp;`, //期刊号
            publishingTime: `${resData.publishingTime}&nbsp;&nbsp;`, //出版时间
            summary: `${resData.summary}`, // 摘要
          } : { key:item.key, name: 'None' };

          this.searchLiterature.push(arr)
          this.searchLiterature.sort(function(a,b){
            return a.key - b.key
          })
        }
      })

      // let arr = {
      //     author:'GILLESPIE', //作者
      //     title:'COVELLI, B. CRYSTALLINE CORNEAL DYSTROPHY. REPORT OF A CASE &nbsp;',//标题
      //     periodicalName:'American journal of ophthalmology', //期刊名
      //     periodicalNumber:'56', //期刊号
      //     publishingTime:'465-7 (1963).', //出版时间
      //     summary:'CRYSTALLINE CORNEAL DYSTROPHY.', // 摘要
      // }

      // this.searchLiterature.push(arr);
    },

    /**
     * 参考文献点击操作
     */
    literatureClickHandle(name) {
      // var tempwindow=window.open();
      // tempwindow.location=`https://pubmed.ncbi.nlm.nih.gov/${name}`;
      window.open(`https://pubmed.ncbi.nlm.nih.gov/${name}`)
    },
  },
  mounted() {
    this.init()
  },
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

.references {
  .references-cont {
    display: flex;
    flex-wrap: wrap;

    p {
      padding-bottom: 25px;
      line-height: 40px;
      // text-indent: 25px;
      font-size: 22px;
      color: #333;
      width: 100%;

      strong {
        display: inline-block;
        padding: 0 6px;
      }
    }
  }

  .description {
    display: flex;
    flex-wrap: wrap;

    span {
      cursor: pointer;
      width: 100px;
      padding: 5px 10px;

      em {
        font-style: normal;
      }

      &:hover {
        color: #3bcaff;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
/**2021130--tony修改 */
.tip-style {
  padding: 0 8px;
  font-size: 18px;
  color: #656565;
}

.tit span {
  font-size: 18px !important;
}

.tit p {
  width: calc(100% + 88px) !important;
}

.context {
  width: calc(100% + 88px) !important;
}

.context li p {
  font-size: 16px !important;
}

.section-tip {
  line-height: 40px;
  font-size: 20px;
  color: #999;

  span {
    display: inline-block;
    padding: 0 5px;
    color: #3bcaff;
    font-weight: 600;
  }
}
</style>
