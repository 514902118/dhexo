<template>
  <div @click="handleHideDialog">
    <vLoginHeader />
    <div class="top">
      <div class="box">
        <p class="title">石某世</p>
        <div class="elbtn" @click="toPdf">下载</div>
      </div>
    </div>
    <div class="query-details">
      <!-- 患者信息 -->
      <div class="block block1">
        <p class="title"><em>患者信息 </em></p>
        <ul class="base-info">
          <li class="gray " style="border-top: 1px solid #ccd0d4;">
            <span>姓名</span>
            <span>性别</span>
            <span style="border-right: 0">年龄</span>
          </li>
          <li>
            <p>石某世</p>
            <p>男</p>
            <p style="border-right: 0">2</p>
          </li>
          <li class="gray">
            <span style="width: 50%;">药物过敏史</span>
            <span style="width: 49.9%; border-right: 0">家族遗传病史</span>
          </li>
          <li>
            <p style="width: 50%;">无</p>
            <p style="width: 49.9%; border-right: 0">无</p>
          </li>
          <li class="gray"> 病历摘要 </li>
          <li style=" text-align: left;">
            <!-- 病历摘要 -->
            患者因“下肢运动障碍 3 天，行走缓慢，易反复跌倒”于 1 月 6 日入院就诊。<br>
            平素健康，无呕吐，腹泻症状，无外伤史。三天前行动不便，上楼梯尤其容易跌倒。跑跳较困难，经常乏力。<br>
            无吞咽困难，上肢运动正常。既往无类似病史。<br>
            体格检查：T 37.1°C，R：28 次/分，P：108 次/分，BP：12.7/8kPa (100/62mmHg)；营养发育良好，神志<br>
            清醒。神经系统检查： 颅神经未见异常。周围神经：上肢肌力，肌张力，肌容积正常，抓握功能正常。左下<br>
            肢肌力 III 级，右下肢肌力 IV 级，痛感觉，位置感觉仍存在。骨骼形态，肌肉型态尚未见异常。<br>
            诊断怀疑：<br>
            1. 杜兴氏肌肉营养不良 (Duchenne Muscular Dystrophy)<br>
            2. 脊髓性肌肉萎缩 (Spinal Muscular Atrophy)
          </li>
        </ul>
      </div>

      <!-- 高度关注 -->
      <div class="block block1 horizontal-bar">
        <p class="title"><em>高度关注</em><span>
            <!--High attention-->Variants of High Interest
          </span></p>
        <div class="gene-tab tab">
          <div class="tit tit-fix"></div>
          <div class="context-fix" :class="{ 'no-data': Object.keys(this.highAttention).length <= 0 }">
            <p v-if="Object.keys(this.highAttention).length <= 0" class="no-data">
              暂无数据
            </p>
          </div>
          <vue-scroll :ops="scrollOps">
            <div class="tit tit2">
              <p>

                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">变异的RefSNP accession ID</div>
                  <span>变异位点</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">变异所在在基因组上的位置</div>
                  <span>染色体位置</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">该突变可能导致的疾病</div>
                  <span>关联疾病</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">
                    参考:不携带该致病基因的基因型，患者：患者基因型</div>
                  <span>参考/患者</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">变异所在基因</div>
                  <span>基因</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">最小等位基因频率</div>
                  <span>MAF（亚洲）</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">该突变导致编码蛋白的变化情况</div>
                  <span>蛋白变化</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">突变致病信息的数据库</div>
                  <span>依据</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">相关文献的Pubmed ID</div>
                  <span>文献</span>
                </el-tooltip>
              </p>
            </div>
            <ul class="context">
              <template v-if="Object.keys(this.highAttention).length > 0">
                <li v-for="(item, index) in this.highAttention" :key="index">
                  <p>{{ item["变异"] }}</p>
                  <p class="more" @click="toLineHandle(item['染色体位置'])">
                    Chr{{ item["染色体位置"] }}
                  </p>
                  <p>
                    <span @click=" linkXGJBHandle(item['相关疾病'], $event)"  class="spn" style="display: block"
                      v-if="typeof item['相关疾病'] === 'string'">
                      {{ item["相关疾病"] }}</span>
                    <span @click=" linkXGJBHandle(xgjbItem, $event)" class="spn" style="display: block" v-else
                      v-for="(xgjbItem, xgjbIndex) in item['相关疾病']" :key="xgjbIndex">
                      {{ xgjbItem }}
                    </span>
                  </p>
                  <p>{{ item["Ref基因型"] }}</p>
                  <p>{{ item["基因"] }}</p>
                  <p>{{ item["MAF(亚洲)"] }}</p>

                  <p>{{ item["蛋白变化"] == "N" ? "unknown" : item["蛋白变化"] == "None" ? "unknown" : item["蛋白变化"]}}</p>
                  <p>
                    <span style="display: block" v-if="typeof item['来源'] === 'string'">{{ item["来源"] }}</span>
                    <span style="display: block" v-else v-for="(lyItem, lyIndex) in item['来源']" :key="lyIndex">
                      {{ lyItem }}
                    </span>
                  </p>
                  <p>
                    <template v-if="item['文献'].length <= 2">
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

                    </template>
                  </p>
                </li>
              </template>
              <template v-else>
                <li class="no-data"></li>
              </template>
            </ul>
          </vue-scroll>

        </div>
        <div class="gd-style">
          <img src="../../assets/sms-img1.png" alt="">
          <p class="img-tip">图一、该变异位点在 <strong>genome browser</strong> 上的展示。</p>
        </div>

      </div>
      <!-- 疾病描述 -->
      <div class="block">
        <p class="title"><em>疾病描述</em><span> Disease Description</span></p>
        <p class="miaoshu">
          SMA is an autosomal recessive neuromuscular disorder characterized by progressive proximal musclebr
          weakness and atrophy affecting the upper and lower limbs. By convention, SMA is classified into 4 types:
          SMA I,
          SMA II, SMA III, and SMA IV, by increasing age at onset and decreasing clinical severity. SMA I is the
          most
          severe form of the disorder and often results in death in early childhood. SMA III, known as the
          juvenile form,
          tends to show onset in childhood or adolescence.
        </p>
      </div>
      <!-- 疾病描述 -->
      <div class="block gd-style">
        <p class="title"><em>知识图谱</em><span> Knowledge Graph</span></p>
        <img src="../../assets/sms-img2.png" alt="">
        <p class="img-tip">图二、该疾病与变异位点所在的基因之间关联的知识图谱展示。</p>
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
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">变异的RefSNP accession ID</div>
                  <span>变异位点</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">变异所在在基因组上的位置</div>
                  <span>染色体位置</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">该突变可能导致的疾病</div>
                  <span>关联疾病</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">
                    参考:不携带该致病基因的基因型，患者：患者基因型</div>
                  <span>参考/患者</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">变异所在基因</div>
                  <span>基因</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">最小等位基因频率</div>
                  <span>MAF（亚洲）</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">该突变导致编码蛋白的变化情况</div>
                  <span>蛋白变化</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">突变致病信息的数据库</div>
                  <span>依据</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">相关文献的Pubmed ID</div>
                  <span>文献</span>
                </el-tooltip>
              </p>
            </div>
            <ul class="context">
              <template v-if="Object.keys(this.middleAttention).length > 0">
                <li v-for="(item, index) in this.middleAttention" :key="index">
                  <p>{{ item["变异"] }}</p>
                  <p class="more" @click="toLineHandle(item['染色体位置'])">
                    Chr{{ item["染色体位置"] }}
                  </p>
                  <p>
                    <span @click="showXGJBHandle(item['相关疾病'], $event)"  class="spn" style="display: block"
                      v-if="typeof item['相关疾病'] === 'string'">
                      {{ item["相关疾病"] }}</span>
                    <span @click="showXGJBHandle(xgjbItem, $event)"  class="spn" style="display: block" v-else
                      v-for="(xgjbItem, xgjbIndex) in item['相关疾病']" :key="xgjbIndex">
                      {{ xgjbItem }}
                    </span>
                  </p>
                  <p>{{ item["Ref基因型"] }}</p>
                  <p>{{ item["基因"] }}</p>
                  <p>{{ item["MAF(亚洲)"] }}</p>
                  <p>{{ item["蛋白变化"] == "N" ? "unknown" : item["蛋白变化"] == "None" ? "unknown" : item["蛋白变化"]}}</p>
                  <p>
                    <span style="display: block" v-if="typeof item['来源'] === 'string'">{{ item["来源"] }}</span>
                    <span style="display: block" v-else v-for="(lyItem, lyIndex) in item['来源']" :key="lyIndex">
                      {{ lyItem }}
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
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">变异的RefSNP accession ID</div>
                  <span>变异位点</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">变异所在在基因组上的位置</div>
                  <span>染色体位置</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">
                    参考:不携带该致病基因的基因型，患者：患者基因型</div>
                  <span>参考/患者</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">变异所在基因</div>
                  <span>基因</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">最小等位基因频率</div>
                  <span>MAF（亚洲）</span>
                </el-tooltip>
                <el-tooltip effect="light" placement="top">
                  <div slot="content" class="tip-style">该突变导致编码蛋白的变化情况</div>
                  <span>蛋白变化</span>
                </el-tooltip>
              </p>
            </div>
            <ul class="context">
              <template v-if="Object.keys(this.otherAttention).length > 0">
                <li v-for="(item, index) in this.otherAttention" :key="index">
                  <p>{{ item["变异"] }}</p>
                  <p class="more" @click="toLineHandle(item['染色体位置'])">
                    Chr{{ item["染色体位置"] }}
                  </p>
                  <p>{{ item["Ref基因型"] }}</p>
                  <p>{{ item["基因"] }}</p>
                  <p>{{ item["MAF(亚洲)"] }}</p>
                  <p>{{ item["蛋白质变化"]}}</p>
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
      <div class="block block4 references">
        <p class="title"><em>参考文献</em><span>references</span></p>
        <div class="references-cont">
          <p><span style="padding-right:10px;">1.</span> lermont, O.et al. SMN gene deletions in adult-onset spinal
            muscular atrophy. <i> Lancet
            (London,
            England)</i> <strong>346(8991-8992)</strong>, 1712-3 (1995). </p>
          <p><span style="padding-right:10px;">2.</span> Hahnen, E.et al. Molecular analysis of candidate genes on
            chromosome 5q13 in autosomal
            recessive spinal
            muscular atrophy: evidence of homozygous deletions of the SMN gene in unaffected individuals.
            <i>Human molecular
            genetics</i> <strong>4(10)</strong>, 1927-33 (1995). </p><br>
          <p><span style="padding-right:10px;">3.</span> Zerres, K.et al. Genetic basis of adult-onset spinal muscular
            atrophy. <i> Lancet (London,
            England)</i> <strong>346(8983)</strong>, 1162
            (1995).</p>
          <p><span style="padding-right:10px;">4.</span> Pearn, J. H.et al. A clinical and genetic study of spinal
            muscular atrophy of adult onset:
            the autosomal recessive
            form as a discrete disease entity. <i>Brain : a journal of neurology</i> <strong>101(4)</strong>, 591-606 (1978).
          </p>

          <p> <span style="padding-right:10px;">5.</span> Gladman, J. T.et al. A humanized Smn gene containing the SMN2
            nucleotide alteration in
            exon 7 mimics SMN2
            splicing and the SMA disease phenotype. <i>Human molecular genetics</i> <strong>19(21)</strong>, 4239-52 (2010).
          </p>

          <p><span style="padding-right:10px;">6.</span> Mazzei, R.et al. Gene conversion events in adult-onset spinal
            muscular atrophy. <i>Acta
            neurologica
            Scandinavica </i><strong>109(2)</strong>, 151-4 (2004).</p>
          <p><span style="padding-right:10px;">7.</span> Brahe, C.et al. Genetic homogeneity between childhood-onset and
            adult-onset autosomal
            recessive spinal
            muscular atrophy. <i> Lancet (London, England)</i> <strong>346(8977)</strong>, 741-2 (1995).</p>
          <p><span style="padding-right:10px;">8.</span> Brichta, L.et al. Valproic acid increases the SMN2 protein
            level: a well-known drug as a
            potential therapy for spinal
            muscular atrophy. <i>Human molecular genetics</i> <strong>12(19)</strong>, 2481-9 (2003).</p>
          <p><span style="padding-right:10px;">9.</span> TSUKAGOSHI, H.et al. HEREDITARY PROXIMAL NEUROGENIC MUSCULAR
            ATROPHY IN ADULT. <i>Archives of neurology</i> <strong>12</strong>, 597-603 (1965).
          </p><br>
          <p><span style="padding-right:10px;">10.</span> Weihl, C. C.et al. Valproate may improve strength and function
            in patients with type
            III/IV spinal muscle
            atrophy. <i>Neurology</i> <strong>67(3)</strong>, 500-1 (2006).</p>
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
    <el-dialog title="文献" :visible.sync="moreDialog" width="700px" append-to-body center class="eldialog more-dialog">
      <span></span>
      <span v-for="(ite, i) in moreData" :key="i" @click="literatureClickHandle(ite.name)" class="spn">
        {{ ite.name }}{{ Number(i) !== moreData.length - 1 ? "," : "" }}
      </span>
    </el-dialog>
    <!--  -->
    <InfoDialog :pos="InfoDiaPos" :data="dialogInfo" v-if="showDialog1" />
    <vFooter />
  </div>
</template>

<script>
import vLoginHeader from "@/components/common/vLoginHeader";
import vFooter from "@/components/common/vFooter";
import InfoDialog from "@/components/InfoDialog";
import * as Cookies from "tiny-cookie";
export default {
  components: {
    vLoginHeader,
    vFooter,
    InfoDialog,
  },
  data () {
    let loading = ""; //定义loading变量
    var number = 0;
    function startLoading () {
      //使用Element loading-start 方法
      number++;
      loading = Loading.service({
        lock: false,
        text: "加载中，请稍后...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.3)",
      });
    }
    function endLoading () {
      //使用Element loading-close 方法
      number = 0;
      loading.close();
    }

    return {
      patientName: this.$route.query.patientName || "",
      allData: {},
      // 高度关注
      highAttention: [
        {
          '变异': 'rs397514517',
          '染色体位置': '5:70942473',
          '相关疾病': 'Spinal Muscular Atrophy III',
          'Ref基因型': 'AG/AA',
          '基因': 'SMN1SMN2',
          'MAF(亚洲)': '0.00002',
          '蛋白变化': 'p.Y130C',
          '来源': 'OMIM',
          '文献': [
            {
              'name': '1-10'
            }
          ]
        }
      ],
      // 中度关注
      middleAttention: [
        {
          "变异": "rs1207848794",
          "染色体位置": "17:76293190",
          "相关疾病": "Spermatogenic Failure 35",
          "Ref基因型": "GG/AA",
          "基因": "QRICH2",
          "MAF(亚洲)": "0.001514",
          "蛋白变化": "p.Q347X",
          "来源": "OMIM",
        }, {
          "变异": "rs373171844 ",
          "染色体位置": "X:71384985 ",
          "相关疾病": "Mental Retardation",
          "Ref基因型": "GG/AA",
          "基因": "TAF1",
          "MAF(亚洲)": "0.005518",
          "蛋白变化": "p.G741E",
          "来源": "OMIM",
        }, {
          "变异": "rs756161014",
          "染色体位置": "5:1065297",
          "相关疾病": "Breast Cancer",
          "Ref基因型": "CC/CT",
          "基因": "SLC12A7",
          "MAF(亚洲)": "0.00967",
          "蛋白变化": "p.W808X",
          "来源": "GWAS",
        }, {
          "变异": "rs766186198",
          "染色体位置": "5:131562015",
          "相关疾病": "Creutzfeldt-Jakob Disease",
          "Ref基因型": "CC/TT",
          "基因": "RAPGEF6",
          "MAF(亚洲)": "0.006893",
          "蛋白变化": "p.C105Y",
          "来源": "GWAS",
        }, {
          "变异": "rs200166093",
          "染色体位置": "7:151064305",
          "相关疾病": "Creutzfeldt-Jakob Disease",
          "Ref基因型": "AA/AG",
          "基因": "SLC4A2",
          "MAF(亚洲)": "0.000264",
          "蛋白变化": "p.Q43R",
          "来源": "GWAS",
        }, {
          "变异": "rs912228422",
          "染色体位置": "9:34256347",
          "相关疾病": "Creutzfeldt-Jakob Disease",
          "Ref基因型": "CC/CT",
          "基因": "KIF24",
          "MAF(亚洲)": "0.004591",
          "蛋白变化": "p.G1087D",
          "来源": "GWAS",
        }, {
          "变异": "rs748039331",
          "染色体位置": "10:102141278",
          "相关疾病": "Kaposi Sarcoma",
          "Ref基因型": "CC/CT",
          "基因": "PPRC1",
          "MAF(亚洲)": "0.005519",
          "蛋白变化": "p.P924S",
          "来源": "NLP",
        }, {
          "变异": "rs767376632",
          "染色体位置": "11:4682519",
          "相关疾病": "Creutzfeldt-Jakob Disease",
          "Ref基因型": "GG/GA",
          "基因": "OR51E2",
          "MAF(亚洲)": "0.003916",
          "蛋白变化": "p.L65F",
          "来源": "GWAS",
        }, {
          "变异": "rs773337252",
          "染色体位置": "15:40458807",
          "相关疾病": "Creutzfeldt-Jakob Disease",
          "Ref基因型": "CC/CT",
          "基因": "BAHD1",
          "MAF(亚洲)": "0.007029",
          "蛋白变化": "p.R115C",
          "来源": "GWAS",
        }, {
          "变异": "rs1462414343",
          "染色体位置": " 16:81445429 ",
          "相关疾病": "Gastric Cancer",
          "Ref基因型": "GG/GA",
          "基因": "CMIP",
          "MAF(亚洲)": "0.004587",
          "蛋白变化": "p.C63Y",
          "来源": "NLP",
        }, {
          "变异": "rs377222562",
          "染色体位置": "18:9258531",
          "相关疾病": "Alzheimer Disease",
          "Ref基因型": "CC/CT",
          "基因": "ANKRD12",
          "MAF(亚洲)": "0.004824",
          "蛋白变化": "p.T1732I",
          "来源": "GWAS",
        }, {
          "变异": "rs765501008",
          "染色体位置": "18:63489378",
          "相关疾病": "Schizophrenia",
          "Ref基因型": "CC/CT",
          "基因": "SERPINB5",
          "MAF(亚洲)": "0.007409",
          "蛋白变化": "p.A113V",
          "来源": "GWAS",
        }, {
          "变异": "rs1028072297",
          "染色体位置": "19:3162909",
          "相关疾病": "Obesity",
          "Ref基因型": "CC/CT",
          "基因": "GNA15",
          "MAF(亚洲)": "0.007194",
          "蛋白变化": "p.L339F",
          "来源": "GWAS",
        }, {
          "变异": "rs1172291775",
          "染色体位置": "19:4511283",
          "相关疾病": "Alzheimer Disease",
          "Ref基因型": "CC/CT",
          "基因": "PLIN4",
          "MAF(亚洲)": "0.001295",
          "蛋白变化": "p.G893S",
          "来源": "GWAS",
        }, {
          "变异": "rs1339531234",
          "染色体位置": "19:4511955",
          "相关疾病": "Alzheimer Disease",
          "Ref基因型": "TT/TC",
          "基因": "PLIN4",
          "MAF(亚洲)": "0.004684",
          "蛋白变化": "p.S669G",
          "来源": "GWAS",
        }, {
          "变异": "rs866253502",
          "染色体位置": "20:42472272 ",
          "相关疾病": "Obesity",
          "Ref基因型": "CC/TT",
          "基因": "PTPRT",
          "MAF(亚洲)": "0.006573",
          "蛋白变化": "p.E482K",
          "来源": "GWAS",
        }
      ],
      // 其他
      otherAttention: [
        { "变异": "rs879868826", "染色体位置": "7:130023539", "Ref基因型": "CC/CT", "MAF(亚洲)": "0.0066039", "基因": "ZC3HC1", "蛋白质变化": "p.R359Q" },
        { "变异": "rs1022184348", "染色体位置": "8:143570921", "Ref基因型": "AA/GG", "MAF(亚洲)": "0.0099841", "基因": "MROH6", "蛋白质变化": "p.W226R" },
        { "变异": "rs377389844", "染色体位置": "8:144520668", "Ref基因型": "CC/TT", "MAF(亚洲)": "0.004011575", "基因": "LRRC14", "蛋白质变化": "p.R254W" },
        { "变异": "rs780424429", "染色体位置": "9:4849541", "Ref基因型": "CC/CG", "MAF(亚洲)": "0.009407099", "基因": "RCL1", "蛋白质变化": "p.S135C" },
        { "变异": "rs1478846720", "染色体位置": "10:15214177", "Ref基因型": "AA/GG", "MAF(亚洲)": "0.001929161", "基因": "FAM171A1", "蛋白质变化": "p.S471P" },
        { "变异": "rs35567200", "染色体位置": "11:830044", "Ref基因型": "GG/GA", "MAF(亚洲)": "0.005477289", "基因": "CRACR2B", "蛋白质变化": "p.G173S" },
        { "变异": "rs145926870", "染色体位置": "11:830120", "Ref基因型": "AA/AG", "MAF(亚洲)": "0.001503249", "基因": "CRACR2B", "蛋白质变化": "p.Q198R" },
        { "变异": "rs761217284", "染色体位置": "11:7509682", "Ref基因型": "GG/GA", "MAF(亚洲)": "0.006261801", "基因": "OLFML1", "蛋白质变化": "p.E99K" },
        { "变异": "rs1487097257", "染色体位置": "7:39609805", "Ref基因型": "GG/AA", "MAF(亚洲)": "0.004724392", "基因": "YAE1", "蛋白质变化": "p.R147H" },
        { "变异": "rs371164865", "染色体位置": "11:96092376", "Ref基因型": "CC/CT", "MAF(亚洲)": "0.00643273", "基因": "MAML2", "蛋白质变化": "p.R552H" },
        { "变异": "rs778747499", "染色体位置": "17:4542963", "Ref基因型": "CC/CT", "MAF(亚洲)": "0.002329345", "基因": "MYBBP1A", "蛋白质变化": "p.E948K" },
        { "变异": "rs1309343550", "染色体位置": "18:3173964", "Ref基因型": "GG/GA", "MAF(亚洲)": "0.002768591", "基因": "MYOM1", "蛋白质变化": "p.A383V" },
        { "变异": "rs139919463", "染色体位置": "18:13826508", "Ref基因型": "CC/TT", "MAF(亚洲)": "0.004051673", "基因": "MC5R", "蛋白质变化": "p.T248I" },
        { "变异": "rs1309343550", "染色体位置": "18:3173964", "Ref基因型": "GG/GA", "MAF(亚洲)": "0.004936476", "基因": "MYOM1", "蛋白质变化": "p.A383V" },
        { "变异": "rs1309343550", "染色体位置": "18:3173964", "Ref基因型": "GG/GA", "MAF(亚洲)": "0.006089687", "基因": "MYOM1", "蛋白质变化": "p.A383V" },
        { "变异": "rs1309343550", "染色体位置": "18:3173964", "Ref基因型": "GG/GA", "MAF(亚洲)": "0.008971924", "基因": "MYOM1", "蛋白质变化": "p.A383V" },
        { "变异": "rs1330961569", "染色体位置": "19:15479367", "Ref基因型": "GG/AA", "MAF(亚洲)": "0.003967819", "基因": "PGLYRP2", "蛋白质变化": "p.A2V" },
        { "变异": "rs375651812", "染色体位置": "19:19267990", "Ref基因型": "CC/CT", "MAF(亚洲)": "0.006748945", "基因": "TM6SF2", "蛋白质变化": "p.G236D" },
        { "变异": "rs201667884", "染色体位置": "15:41476465", "Ref基因型": "GG/GA", "MAF(亚洲)": "0.004014261", "基因": "RTF1", "蛋白质变化": "p.R501K" },
        { "变异": "rs200007011", "染色体位置": "19:46329438", "Ref基因型": "GG/GA", "MAF(亚洲)": "0.001306437", "基因": "HIF3A", "蛋白质变化": "p.D489N" },
        { "变异": "rs889418995", "染色体位置": "22:45931262", "Ref基因型": "CC/TT", "MAF(亚洲)": "0.009769024", "基因": "WNT7B", "蛋白质变化": "p.E136K" },
        { "变异": "rs1484748624", "染色体位置": "6:4031998", "Ref基因型": "AA/AG", "MAF(亚洲)": "0.006150418", "基因": "PRPF4B", "蛋白质变化": "p.S161G" },
        { "变异": "rs763158102", "染色体位置": "1:1916890", "Ref基因型": "CC/CT", "MAF(亚洲)": "0.007932351", "基因": "CALML6", "蛋白质变化": "p.T114I" },
        { "变异": "rs76597070", "染色体位置": "1:3752792", "Ref基因型": "GG/AA", "MAF(亚洲)": "0.005846459", "基因": "CCDC27", "蛋白质变化": "p.R104K" },
        { "变异": "rs769259082", "染色体位置": "1:41583075", "Ref基因型": "GG/GA", "MAF(亚洲)": "0.00355996", "基因": "HIVEP3", "蛋白质变化": "p.H575Y" },
        { "变异": "rs746371650", "染色体位置": "1:58530619", "Ref基因型": "TT/CC", "MAF(亚洲)": "0.009738717", "基因": "OMA1", "蛋白质变化": "p.I374M" },
        { "变异": "rs746244698", "染色体位置": "1:1454424", "Ref基因型": "CC/CT", "MAF(亚洲)": "0.00042107", "基因": "ATAD3C", "蛋白质变化": "p.A101V" },
        { "变异": "rs782069935", "染色体位置": "1:149908174", "Ref基因型": "AA/AG", "MAF(亚洲)": "0.009163632", "基因": "SV2A", "蛋白质变化": "p.M471T" },
        { "变异": "rs782069935", "染色体位置": "1:149908174", "Ref基因型": "AA/AG", "MAF(亚洲)": "0.002926304", "基因": "SV2A", "蛋白质变化": "p.M471T" },
        { "变异": "rs1233164249", "染色体位置": "6:24850715", "Ref基因型": "AA/AG", "MAF(亚洲)": "0.008969005", "基因": "RIPOR2", "蛋白质变化": "p.M256T" },
        { "变异": "rs1031030041", "染色体位置": "1:15546825", "Ref基因型": "AA/GG", "MAF(亚洲)": "0.004553452", "基因": "DNAJC16", "蛋白质变化": "p.H273R" },
        { "变异": "rs782069935", "染色体位置": "1:149908174", "Ref基因型": "AA/AG", "MAF(亚洲)": "0.0050858", "基因": "SV2A", "蛋白质变化": "p.M471T" },
        { "变异": "rs375651741", "染色体位置": "2:241872597", "Ref基因型": "AA/GG", "MAF(亚洲)": "0.001514195", "基因": "RTP5", "蛋白质变化": "p.I348V" },
        { "变异": "rs956482411", "染色体位置": "3:183951880", "Ref基因型": "TT/CC", "MAF(亚洲)": "0.003071656", "基因": "ABCC5", "蛋白质变化": "p.I459V" },
        { "变异": "rs1462640773", "染色体位置": "4:27022800", "Ref基因型": "AA/GG", "MAF(亚洲)": "0.002908643", "基因": "STIM2", "蛋白质变化": "p.N682S" },
        { "变异": "rs763308335", "染色体位置": "5:1325767", "Ref基因型": "AA/GG", "MAF(亚洲)": "0.00847634", "基因": "CLPTM1L", "蛋白质变化": "p.L377P" },
        { "变异": "rs201059756", "染色体位置": "5:140568131", "Ref基因型": "AA/AG", "MAF(亚洲)": "0.009875742", "基因": "SLC35A4", "蛋白质变化": "p.Y321C" },
        { "变异": "rs994927193", "染色体位置": "6:1312744", "Ref基因型": "GG/AA", "MAF(亚洲)": "0.006865883", "基因": "FOXQ1", "蛋白质变化": "p.D14N" },
        { "变异": "rs1370753468", "染色体位置": "1:156540754", "Ref基因型": "AA/AG", "MAF(亚洲)": "0.003203552", "基因": "IQGAP3", "蛋白质变化": "p.M898T" },
        { "变异": "rs1419816724", "染色体位置": "1:1287127", "Ref基因型": "GG/AA", "MAF(亚洲)": "0.006747603", "基因": "SCNN1D", "蛋白质变化": "p.D380N" },
        { "变异": "rs1419816724", "染色体位置": "1:1287127", "Ref基因型": "GG/AA", "MAF(亚洲)": "0.003467189", "基因": "SCNN1D", "蛋白质变化": "p.D380N" },
      ],
      scrollOps: {
        vuescroll: {
          mode: "native",
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: false,
        },
        // 轨道
        rail: {
          background: "#f1f1f1",
          opacity: 1,
          size: "5px",
          specifyBorderRadius: "6px",
          gutterOfEnds: "100px",
        },
        // 滚动条
        bar: {
          background: "#959595",
          onlyShowBarOnScroll: true,
          showDelay: 0,
          keepShow: true,
          size: "11px",
        },
      },
      showDialog1: false,
      InfoDiaPos: {},
      dialogInfo: {},
      moreDialog: false,
      moreData: [],
      references: [], // 参考文献号
      searchLiterature: [], //参考文献数据
    };
  },
  methods: {
    // init () {
    //   this.$get(this.$Url.vcf.detail, {
    //     vcfId: this.$route.query.vcfId,
    //   })
    //     .then((res) => {
    //       let data = res.data;
    //       if (data) {
    //         let allData = JSON.parse(data);
    //         // this.highAttention = allData['高度关注']
    //         this.getWxInfo(allData["高度关注"], (d) => {
    //           this.highAttention = d;
    //         });

    //         // let middleAttention = allData['中度关注']
    //         this.getWxInfo(allData["中度关注"], (d) => {
    //           this.middleAttention = d;
    //         });

    //         this.otherAttention = allData["其他"];

    //         this.concatHandle();
    //       }
    //     })
    //     .catch((err) => { });
    // },
    getWxInfo (data, func) {
      let keys = Object.keys(data);
      let values = Object.values(data);
      values.forEach((v) => {
        let wx = v["文献"];
        if (typeof wx !== "string") {
          let arr = [];
          for (let j in wx) {
            let child = wx[j].split(",");
            let cArr = [];
            for (let k in child) {
              if (child[k] !== "None") {
                cArr.push({
                  name: child[k],
                  abst: "",
                });
              }
            }
            child = cArr;
            arr.push(...child);
          }
          v["文献"] = arr;
        } else {
          let child = wx.split(",");
          let cArr = [];
          for (let i in child) {
            if (child[i] !== "None") {
              cArr.push({
                name: child[i],
                abst: "",
              });
            }
          }
          child = cArr;
          v["文献"] = child;
        }
        func && func(data);
      });
    },

    handleShowDialog (txt, index, i, sdata, $event, type) {
      if (txt === "-") {
        this.showDialog1 = false;
        return;
      }

      let abst = "";
      if (sdata === "moreData") {
        abst = this[sdata][i]["abst"];
      } else {
        abst = this[sdata][index]["文献"][i]["abst"];
      }

      if (!abst && type != "variantPmid" && sdata === "moreData") {
        this.$get(this.$Url.query.genebyOmId, {
          omim_id: txt,
        })
          .then((res) => {
            if (res.status === 200) {
              let data = res.data;
              if (data) {
                this.dialogInfo = {
                  title: txt,
                  description:
                    data.gene_summary !== "" ? data.gene_summary : "暂无",
                };
                if (sdata === "moreData") {
                  this.$set(
                    this[sdata][i],
                    "abst",
                    this.dialogInfo.description
                  );
                } else {
                  this.$set(
                    this[sdata][index]["文献"][i],
                    "abst",
                    this.dialogInfo.description
                  );
                }

                this.showDialog1 = true;
                let width = document.body.clientWidth;
                let height = document.body.clientHeight;
                this.InfoDiaPos = {
                  pageX:
                    $event.pageX + 300 > width
                      ? $event.pageX - 380
                      : $event.pageX,
                  pageY:
                    $event.pageY + 300 > height
                      ? $event.pageY - 300
                      : $event.pageY,
                };
              }
            }
          })
          .catch((err) => { });
      } else if (type == "variantPmid") {
        /**
         * 查询文献接口
         */
        window.$.ajax({
          headers: {
            token: Cookies.get("token"),
          },
          url: this.$Url.query.literature,
          data: {
            literatureId: txt,
          },
          success: (res) => {
            console.log(res);
            this.dialogInfo = {
              title: txt,
              description: res.data.literatureData,
              type: "PMID:" + txt,
            };
            this.showDialog1 = true;
            let width = document.body.clientWidth;
            let height = document.body.clientHeight;
            this.InfoDiaPos = {
              pageX:
                $event.pageX + 300 > width ? $event.pageX - 380 : $event.pageX,
              pageY:
                $event.pageY + 300 > height ? $event.pageY - 300 : $event.pageY,
            };
          },
        });
      } else {
        this.dialogInfo = {
          title: txt,
          description: abst,
        };
        this.showDialog1 = true;
        let width = document.body.clientWidth;
        let height = document.body.clientHeight;
        this.InfoDiaPos = {
          pageX: $event.pageX + 300 > width ? $event.pageX - 380 : $event.pageX,
          pageY:
            $event.pageY + 300 > height ? $event.pageY - 300 : $event.pageY,
        };
      }
    },
    handleHideDialog (ite) {
      this.showDialog1 = false;
    },
    toPdf () {
      let dom = document.createElement("a");
      let fileName = "石某世的全外解读报告.pdf";
      dom.download = fileName;
      dom.style.display = "none";
      dom.href = this.$Url.pdf.shimoshi;
      document.body.appendChild(dom);
      dom.click();
      document.body.removeChild(dom);
    },
    // 展示更多
    showMoreDialog (item) {
      this.moreData = item;
      this.moreDialog = true;
    },

    /**
     * 染色体跳转
     */
    toLineHandle (item) {
      let arr = item.split(":");
      let openUrl = `http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg38&lastVirtModeType=default&lastVirtModeExtraState=&virtModeType=default&virtMode=0&nonVirtPosition=&position=chr${arr[0]}%3A${arr[1]}`;
      window.open(openUrl, "_blank");
    },

      linkXGJBHandle(txt, $event){
      window.open('/#/query/disease?search='+ txt +'&active=1', "_blank");
    },

    /**
     * 相关疾病
     */
    showXGJBHandle (txt, $event) {
      /**
       * 查询相关疾病接口
       */
      window.$.ajax({
        headers: {
          token: Cookies.get("token"),
        },
        url: this.$Url.query.diseaseInformation,
        data: {
          OMIM_id: txt,
        },
        success: (res) => {
          if (res.status === 200) {
            console.log("相关疾病", res.data);
            let data = res.data;
            this.dialogInfo = {
              title: txt,
              description: data.Description || data.definition_orp || "暂无",
              type: "OMIM:" + txt,
            };
            this.showDialog1 = true;
            let width = document.body.clientWidth;
            let height = document.body.clientHeight;
            this.InfoDiaPos = {
              pageX:
                $event.pageX + 300 > width ? $event.pageX - 380 : $event.pageX,
              pageY:
                $event.pageY + 300 > height ? $event.pageY - 300 : $event.pageY,
            };
          }
        },
        error: (err) => { },
      });
    },

    /**
     * 参考文献
     */
    concatHandle () {
      // 高度关注 合并 中毒关注

      let highAttentionObj = Object.keys(this.highAttention).map((item) => {
        let highAttentionItem = this.highAttention[item]["文献"].map(
          (fItem) => fItem.name
        );
        return highAttentionItem;
      });

      let middleAttentionObj = Object.keys(this.middleAttention).map((item) => {
        let middleAttentionItem = this.middleAttention[item]["文献"].map(
          (fItem) => fItem.name
        );
        return middleAttentionItem;
      });

      let highAttentionArr = [].concat(...highAttentionObj);
      let middleAttentionArr = [].concat(...middleAttentionObj);
      this.references = highAttentionArr.concat(middleAttentionArr);
      this.references = this.references.filter((item) => item != "-");
      this.searchLiteratureHandle();
    },
    searchLiteratureHandle () {
      if (this.references.length != 0) {
        this.references.forEach((item, index) => {
          if (index < 10) {
            this.viewLiteratureLayerHandle(item);
          }
        });
      }
      console.log(this.searchLiterature);
    },

    viewLiteratureLayerHandle (txt) {
      console.log(txt);
      this.$get(this.$Url.query.literature, {
        literatureId: txt,
      }).then((res) => {
        if (res.status === 200) {
          let resData = res.data;
          let arr = {
            author: `${resData.author}&nbsp;&nbsp;`, //作者
            title: `${resData.title}&nbsp;&nbsp;`,//标题
            periodicalName: `${resData.periodicalName}&nbsp;`, //期刊名
            periodicalNumber: `${resData.periodicalNumber}&nbsp;`, //期刊号
            publishingTime: `${resData.publishingTime}&nbsp;&nbsp;`, //出版时间
            summary: `${resData.summary}`, // 摘要
          }
          this.searchLiterature.push(arr);
        }
      });

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
    literatureClickHandle (name) {
      // var tempwindow=window.open();
      // tempwindow.location=`https://pubmed.ncbi.nlm.nih.gov/${name}`;
      window.open(`https://pubmed.ncbi.nlm.nih.gov/${name}`)
    }
  },
  mounted () {
    // this.init();
  },
};
</script>

<style lang="scss" scoped>
@import "@/static/_common";
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

.block1 .base-info {
  position: relative;
  width: 100%;
  list-style: none;
}

.block1 .base-info li {
  position: relative;
  display: block;
  min-height: 40px;
  line-height: 40px;
  padding: 0px 20px;
  font-size: 18px;
  color: #656565;
  text-align: center;
  border: 1px solid #ccd0d4;
  border-top: 0;
}

.block1 .base-info li span {
  /* position: absolute;
            top: 10px;
            left: 20px;*/
  float: left;
  width: 33%;
  height: 40px;
  line-height: 40px;
  border-right: 1px solid #ccd0d4;
}

.block1 .base-info li span:after {
  position: absolute;
  top: 50%;
  right: 0;
  width: 2px;
  height: 40px;
  margin-top: -20px;
  /*background-color: #ccd0d4;*/
  border-right: 0px solid #ccd0d4;
  content: "";
}

.block1 .base-info li p {
  float: left;
  width: 33%;
  /*position: relative;*/
  min-height: 40px;
  line-height: 40px;
  /*padding-left: 170px;*/
  border-right: 1px solid #ccd0d4;
}
.block1 .base-info .gray {
  background-color: #ebeff2;
}
.gd-style img {
  display: block;
  margin: 20px auto;
  width: 100%;
}

.gd-style .img-tip {
  text-align: center;
}
.gene-tab,
.diseases-tab,
.symptoms-tab,
.variation-tab,
.results-tab,
.patients-tab {
  margin: 0 auto;
}
.miaoshu {
  font-family: Noto Sans SC, venir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  line-height: 40px;
  font-size: 22px;
}
</style>