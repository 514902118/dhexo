<template>
  <div @click="handleHideDialog">
    <vLoginHeader />
    <div class="top">
      <div class="box">
        <p class="title">夏某泽</p>
        <div class="elbtn" @click="toPdf">下载</div>
      </div>
    </div>
    <div class="query-details">
      <div class="section-tip">
        用时 <span>1.25</span> s，检索了 <span>16,257</span> 个基因， <span>9,014</span>个疾病 ，<span>12,568,986</span> 个变异后，发现了高度关注 <span>{{ highAttention.length }}</span>个 ,中度关注 <span>{{ middleAttention.length }}</span>个, 其他变异 <span>{{ otherAttention.length }}</span>个
      </div>
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
            <p>夏某泽</p>
            <p>男</p>
            <p style="border-right: 0">5</p>
          </li>
          <li class="gray">
            <span style="width: 50%;">药物过敏史</span>
            <span style="width: 49.8%; border-right: 0; box-sizing: border-box;">家族遗传病史</span>
          </li>
          <li>
            <p style="width: 50%;">无</p>
            <p style="width: 49.8%; border-right: 0; box-sizing: border-box;">无</p>
          </li>
          <li class="gray"> 病历摘要 </li>
          <li style=" text-align: left;">
            <!-- 病历摘要 -->
            患者因左侧重度鼻衄于 1 月 13 日入院就诊，<br>
            鼻腔内无异物，为鼻黏膜出血。使用棉球填塞压迫及局部给药止血略有缓解。20 分钟后取出填塞棉球仍有出
            血现象。程度同初始强度。<br>
            体格检查：T 36.9°C，R：29 次/分，P：100 次/分，BP：12.7/7.9kPa (100/60mmHg)；营养发育良好，神
            志清醒，哭闹不止。血常规各项指标正常，血小板数量 265.0 x 109 /L；血小板分布宽度 12.3 fL。血小板形态
            正常。<br>
            凝血功能障碍，怀疑：<br>
            1. 血小板无力症<br>
            2. 血友病<br>
            3. 血管性假血友病<br>
            4. 低纤维蛋白原血症
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
                    <span @click=" linkXGJBHandle(item['相关疾病'], $event)" class="spn" style="display: block"
                      v-if="typeof item['相关疾病'] === 'string'">
                      {{ item["相关疾病"] }}</span>
                    <span @click=" linkXGJBHandle(xgjbItem, $event)"  class="spn" style="display: block" v-else
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
          <img src="../../assets/xmz-img1.png" alt="">
          <p class="img-tip">图一、该变异位点在 <strong>genome browser</strong> 上的展示。</p>
        </div>

      </div>
      <!-- 疾病描述 -->
      <div class="block">
        <p class="title"><em>疾病描述</em><span> Disease Description</span></p>
        <p class="miaoshu">
          Glanzmann thrombasthenia is an autosomal recessive bleeding disorder characterized by failure of
          platelet aggregation and by absent or diminished clot retraction. The abnormalities are related to
          quantitative or
          qualitative abnormalities of the GPIIb/IIIa platelet surface fibrinogen receptor complex resulting from
          mutations
          in either the GPIIb or GPIIIa genes.
        </p>
      </div>
      <!-- 疾病描述 -->
      <div class="block gd-style">
        <p class="title"><em>知识图谱</em><span> Knowledge Graph</span></p>
        <img src="../../assets/xmz-img2.png" alt="">
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
                    <span @click="showXGJBHandle(item['相关疾病'], $event)" style="display: block"
                      v-if="typeof item['相关疾病'] === 'string'">
                      {{ item["相关疾病"] }}</span>
                    <span @click="showXGJBHandle(xgjbItem, $event)" style="display: block" v-else
                      v-for="(xgjbItem, xgjbIndex) in item['相关疾病']" :key="xgjbIndex">
                      {{ xgjbItem }}
                    </span>
                  </p>
                  <p>{{ item["Ref基因型"] }}</p>
                  <p>{{ item["基因"] }}</p>
                  <p>{{ item["MAF（亚洲）"] }}</p>
                  <p>{{ item["蛋白变化"] }}</p>
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
        <p class="title"><em>参考文献</em><span>References</span></p>
        <div class="references-cont">
          <p> <span style="padding-right:10px;">1.</span> Bajt, M. L.et al. A spontaneous mutation of integrin alpha IIb beta 3 (platelet glycoprotein IIb-IIIa) helps define a
          ligand binding site. <i>The Journal of biological chemistry</i> <strong>267(6)</strong>, 3789-94 (1992).</p>
           <p> <span style="padding-right:10px;">2.</span> Hathaway, W. E. Bleeding disorders due to platelet dysfunction. <i>American journal of diseases of children
          (1960)</i> <strong>121(2)</strong>, 127-34 (1971).</p>
           <p> <span style="padding-right:10px;">3.</span> Ruggeri, Z. M.et al. Glanzmann thrombasthenia: deficient binding of von Willebrand factor to thrombin-stimulated
          platelets. <i>Proceedings of the National Academy of Sciences of the United States of America </i><strong>79(19)</strong>, 6038-41 (1982).</p>
           <p> <span style="padding-right:10px;">4.</span> Ferrer, M.et al. Truncation of glycoprotein (GP) IIIa (616-762) prevents complex formation with GPIIb: novel
          mutation in exon 11 of GPIIIa associated with thrombasthenia. <i>Blood</i> <strong>92(12)</strong>, 4712-20 (1998).</p>
           <p> <span style="padding-right:10px;">5.</span> Degos, L.et al. A molecular defect in thrombasthenic platelets. <i>The Journal of clinical investigation</i> <strong>56(1)</strong>, 236-40
          (1975).</p>
           <p> <span style="padding-right:10px;">6.</span> PITTMAN, M. A. & GRAHAM, J. B. GLANZMANN'S THROMBOPATHY: AN AUTOSOMAL RECESSIVE TRAIT IN
          ONE FAMILY. <i>The American journal of the medical sciences</i> <strong>247</strong>, 293-303 (1964).</p>
           <p> <span style="padding-right:10px;">7.</span> Lévy, J. M.et al. [Glanzmann-Naegeli thrombasthenia. Study of a strongly endogamous ethnic group]. Annales de
          pediatrie <strong>18(2)</strong>, 129-37 (1971).</p>
           <p> <span style="padding-right:10px;">8.</span> Bray, P. F.et al. Biogenesis of the platelet receptor for fibrinogen: evidence for separate precursors for
          glycoproteins IIb and IIIa. <i>Proceedings of the National Academy of Sciences of the United States of
          America</i><strong> 83(5)</strong>, 1480-4 (1986).</p>
           <p> <span style="padding-right:10px;">9.</span> FRIEDMAN, L. L.et al. FAMILIAL GLANZMANN'S THROMBASTHENIA. <i>Mayo Clinic proceedings</i> <strong>39</strong>, 908-18
          (1964).</p>
           <p> <span style="padding-right:10px;">10.</span> Herrmann, F. H.et al. Protein and glycoprotein abnormalities in an unusual subtype of Glanzmann's
          thrombasthenia. <i>Haemostasis</i> <strong>12(4)</strong>, 337-44 (1982).</p>
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
          '变异': 'rs879255514',
          '染色体位置': '17:44372407',
          '相关疾病': 'Glanzmann',
          'Ref基因型': 'TT/CC',
          '基因': 'ITGA2B',
          'MAF(亚洲)': '0.000002',
          '蛋白变化': 'p.R1025Q',
          '来源': 'dbNSFP',
          '文献': [
            {
              'name': '1-10'
            }
          ]
        }
      ],
      // 中度关注
      middleAttention: [
        { "变异": "rs1186688662 ", "染色体位置": " 1:91980649   ", "相关疾病": " Spermatogenic Failure 21                  ", "Ref基因型": "  GG/AA ", "基因": "BRDT    ", "MAF（亚洲）": " 0.003981951 ", "蛋白变化": "   p.A386T  ", "来源": " OMIM" },
        { "变异": "rs1380715569 ", "染色体位置": " 2:231331896  ", "相关疾病": " Joubert Syndrome 30                       ", "Ref基因型": "  GG/AA ", "基因": "ARMC9   ", "MAF（亚洲）": " 0.008289343 ", "蛋白变化": "   p.G593E  ", "来源": " OMIM" },
        { "变异": "rs866378619  ", "染色体位置": " 5:38881603   ", "相关疾病": " Amyloidosis                               ", "Ref基因型": "  GG/GT ", "基因": "OSMR    ", "MAF（亚洲）": " 0.006568597 ", "蛋白变化": "   p.S86I   ", "来源": " GWAS" },
        { "变异": "rs771613756  ", "染色体位置": " 5:43609272   ", "相关疾病": " Glucocorticoid Deficiency 4               ", "Ref基因型": "  TT/TC ", "基因": "NNT     ", "MAF（亚洲）": " 0.008119438 ", "蛋白变化": "   p.L26P   ", "来源": " OMIM" },
        { "变异": "rs1469014555 ", "染色体位置": " 6:31116246   ", "相关疾病": " Peeling Skin Syndrome                     ", "Ref基因型": "  GG/AA ", "基因": "CDSN    ", "MAF（亚洲）": " 0.007723356 ", "蛋白变化": "   p.H457Y  ", "来源": " LOVD" },
        { "变异": "rs1288534485 ", "染色体位置": " 7:44114251   ", "相关疾病": " Ehlers-Danlos Syndrome                    ", "Ref基因型": "  GG/GA ", "基因": "AEBP1   ", "MAF（亚洲）": " 0.005220995 ", "蛋白变化": "   p.G1156E ", "来源": " OMIM" },
        { "变异": "rs1405925342 ", "染色体位置": " 8:23702587   ", "相关疾病": " Conotruncal Heart Malformations           ", "Ref基因型": "  CC/TT ", "基因": "NKX2-6  ", "MAF（亚洲）": " 0.006307472 ", "蛋白变化": "   p.G257D  ", "来源": " OMIM" },
        { "变异": "rs766372675  ", "染色体位置": " 9:33386144   ", "相关疾病": " Glycerol Quantitative Trait Locus         ", "Ref基因型": "  GG/GA ", "基因": "AQP7    ", "MAF（亚洲）": " 0.001521132 ", "蛋白变化": "   p.A96V   ", "来源": " OMIM" },
        { "变异": "rs1297244083 ", "染色体位置": " 11:103245300 ", "相关疾病": " Short-Rib Thoracic Dysplasia 3         ", "Ref基因型": "  CC/TT ", "基因": "DYNC2H1 ", "MAF（亚洲）": " 0.005903783 ", "蛋白变化": "   p.T3323I ", "来源": " OMIM" },
        { "变异": "rs1393612239 ", "染色体位置": " 11:118583971 ", "相关疾病": " Short Stature Micrognathia                ", "Ref基因型": "  AA/AG ", "基因": "ARCN1   ", "MAF（亚洲）": " 0.0032131   ", "蛋白变化": "   p.I116V  ", "来源": " OMIM" },
        { "变异": "rs879334774  ", "染色体位置": " 18:2740714   ", "相关疾病": " Bosma Arhinia Microphthalmia Syndrome  ", "Ref基因型": "  AA/GG ", "基因": "SMCHD1  ", "MAF（亚洲）": " 0.006401085 ", "蛋白变化": "   p.T1176A ", "来源": " OMIM" },
        { "变异": "rs1443923618 ", "染色体位置": " X:45069973   ", "相关疾病": " Kabuki Syndrome 2                         ", "Ref基因型": "  TT/CC ", "基因": "KDM6A   ", "MAF（亚洲）": " 0.002964494 ", "蛋白变化": "   p.L694P  ", "来源": " OMIM" },
        { "变异": "rs78848170   ", "染色体位置": " 11:1017746   ", "相关疾病": " Schizophrenia                             ", "Ref基因型": "  TT/GG ", "基因": "MUC6    ", "MAF（亚洲）": " 0.004569373 ", "蛋白变化": "   p.L1685F ", "来源": " GWAS" },
        { "变异": "rs200364398  ", "染色体位置": " 11:1018042   ", "相关疾病": " Schizophrenia                             ", "Ref基因型": "  AA/AG ", "基因": "MUC6    ", "MAF（亚洲）": " 0.002877227 ", "蛋白变化": "   p.S1587P ", "来源": " GWAS" },
      ],
      // 其他
      otherAttention: [
        { "变异": "rs144490434  ", "染色体位置": "   1:935833     ", "Ref基因型": " CC/GG      ", "基因": " 0.0055        ", "MAF(亚洲)": " SAMD11         ", "蛋白质变化": "      p.P123A" },
        { "变异": "rs761367418  ", "染色体位置": "  7:5500610     ", "Ref基因型": "  GG/AA     ", "基因": "  0.00869      ", "MAF(亚洲)": "  FBXL18        ", "蛋白质变化": "       p.I553I" },
        { "变异": "rs148774441  ", "染色体位置": "  7:27243238    ", "Ref基因型": "   GG/GA    ", "基因": "   0.002234    ", "MAF(亚洲)": "   EVX1         ", "蛋白质变化": "        p.V70I" },
        { "变异": "rs765411653  ", "染色体位置": "  7:31643748    ", "Ref基因型": "   GG/AA    ", "基因": "   0.00167     ", "MAF(亚洲)": "       ITPRID1  ", "蛋白质变化": "       p.C793Y" },
        { "变异": "rs1487097257 ", "染色体位置": "   7:39609805   ", "Ref基因型": "    GG/AA   ", "基因": "    0.002271   ", "MAF(亚洲)": "         YAE1   ", "蛋白质变化": "      p.R147H" },
        { "变异": "rs948775820  ", "染色体位置": "  7:100550447   ", "Ref基因型": "    CC/CT   ", "基因": "    0.002507   ", "MAF(亚洲)": "         AGFG2  ", "蛋白质变化": "       p.P123S" },
        { "变异": "rs879868826  ", "染色体位置": "  7:130023539   ", "Ref基因型": "    CC/TT   ", "基因": "    0.005793   ", "MAF(亚洲)": "         ZC3HC1 ", "蛋白质变化": "          p.R359Q  " },
        { "变异": "rs571832233  ", "染色体位置": "  7:142166237   ", "Ref基因型": "    GG/AA   ", "基因": "    0.00758    ", "MAF(亚洲)": "        MGAM2   ", "蛋白质变化": "        p.R931Q" },
        { "变异": "rs1007730288 ", "染色体位置": "   8:96784901   ", "Ref基因型": "    AA/AG   ", "基因": "    0.00586    ", "MAF(亚洲)": "        CPQ     ", "蛋白质变化": "      p.K2E" },
        { "变异": "rs1022184348 ", "染色体位置": "   8:143570921  ", "Ref基因型": "     AA/AG  ", "基因": "     0.002646  ", "MAF(亚洲)": "          MROH6 ", "蛋白质变化": "  p.W226R" },
        { "变异": "rs377389844  ", "染色体位置": "  8:144520668   ", "Ref基因型": "    CC/TT   ", "基因": "    0.00196    ", "MAF(亚洲)": "        LRRC14  ", "蛋白质变化": "         p.R254W" },
        { "变异": "rs780424429  ", "染色体位置": "  9:4849541     ", "Ref基因型": "  CC/GG     ", "基因": "  0.004212     ", "MAF(亚洲)": "       RCL1     ", "蛋白质变化": "      p.S135C" },
        { "变异": "rs139792014  ", "染色体位置": "  9:35612978    ", "Ref基因型": "   GG/AA    ", "基因": "   0.007158    ", "MAF(亚洲)": "        CD72    ", "蛋白质变化": "       p.S235L" },
        { "变异": "rs186953177  ", "染色体位置": "  9:136407354   ", "Ref基因型": "    CC/TT   ", "基因": "    0.00704    ", "MAF(亚洲)": "        ENTR1   ", "蛋白质变化": "        p.G131S" },
        { "变异": "rs1343392202 ", "染色体位置": "   9:136407360  ", "Ref基因型": "     GG/GA  ", "基因": "     0.006488  ", "MAF(亚洲)": "    ENTR1       ", "蛋白质变化": "    p.P129S" },
        { "变异": "rs35567200   ", "染色体位置": " 11:830044      ", "Ref基因型": " GG/GA      ", "基因": " 0.004805      ", "MAF(亚洲)": "      CRACR2B   ", "蛋白质变化": "        p.G173S" },
        { "变异": "rs145926870  ", "染色体位置": "  11:830120     ", "Ref基因型": "  AA/GG     ", "基因": "  0.009808     ", "MAF(亚洲)": "       CRACR2B  ", "蛋白质变化": "         p.Q198R" },
        { "变异": "rs761217284  ", "染色体位置": "  11:7509682    ", "Ref基因型": "   GG/AA    ", "基因": "   0.002757    ", "MAF(亚洲)": "        OLFML1  ", "蛋白质变化": "         p.E99K" },
        { "变异": "rs371164865  ", "染色体位置": "  11:96092376   ", "Ref基因型": "    CC/CT   ", "基因": "    0.000114   ", "MAF(亚洲)": "         MAML2  ", "蛋白质变化": "       p.R552H" },
        { "变异": "rs201667884  ", "染色体位置": "  15:41476465   ", "Ref基因型": "    GG/AA   ", "基因": "    0.009826   ", "MAF(亚洲)": "         RTF1   ", "蛋白质变化": "      p.R501K" },
        { "变异": "rs778747499  ", "染色体位置": "  17:4542963    ", "Ref基因型": "   CC/TT    ", "基因": "   0.009912    ", "MAF(亚洲)": "    MYBBP1A     ", "蛋白质变化": "    p.E948K" },
        { "变异": "rs1309343550 ", "染色体位置": "   18:3173964   ", "Ref基因型": "    GG/AA   ", "基因": "    0.007959   ", "MAF(亚洲)": "   MYOM1        ", "蛋白质变化": " p.A383V" },
        { "变异": "rs139919463  ", "染色体位置": "  18:13826508   ", "Ref基因型": "    CC/TT   ", "基因": "    0.00766    ", "MAF(亚洲)": "        MC5R    ", "蛋白质变化": "     p.T248I" },
        { "变异": "rs34708574   ", "染色体位置": " 19:281468      ", "Ref基因型": " GG/GA      ", "基因": " 8.37E-05      ", "MAF(亚洲)": "      PLPP2     ", "蛋白质变化": "    p.R263W" },
        { "变异": "rs1330961569 ", "染色体位置": "   19:15479367  ", "Ref基因型": "     GG/GA  ", "基因": "     0.005474  ", "MAF(亚洲)": "    PGLYRP2     ", "蛋白质变化": "    p.A2V" },
        { "变异": "rs147820524  ", "染色体位置": "  19:18932960   ", "Ref基因型": "    GG/AA   ", "基因": "    0.009177   ", "MAF(亚洲)": "   HOMER3       ", "蛋白质变化": "  p.T130I" },
        { "变异": "rs375651812  ", "染色体位置": "  19:19267990   ", "Ref基因型": "    CC/TT   ", "基因": "    0.006853   ", "MAF(亚洲)": "   TM6SF2       ", "蛋白质变化": "  p.G236D" },
        { "变异": "rs200007011  ", "染色体位置": "  19:46329438   ", "Ref基因型": "    GG/AA   ", "基因": "    0.003923   ", "MAF(亚洲)": "   HIF3A        ", "蛋白质变化": "     p.D489N" },
        { "变异": "rs1288031997 ", "染色体位置": "   6:150840123  ", "Ref基因型": "     GG/AA  ", "基因": "     0.002288  ", "MAF(亚洲)": "    PLEKHG1     ", "蛋白质变化": "p.V1090M" },
        { "变异": "rs749066113  ", "染色体位置": "  22:38822698   ", "Ref基因型": "    CC/CT   ", "基因": "    0.005111   ", "MAF(亚洲)": "   NPTXR        ", "蛋白质变化": "     p.V472I" },
        { "变异": "rs377029853  ", "染色体位置": "  6:47707248    ", "Ref基因型": "   GG/AA    ", "基因": "   0.001867    ", "MAF(亚洲)": "  ADGRF4        ", "蛋白质变化": "     p.M1I" },
        { "变异": "rs1233164249 ", "染色体位置": "   6:24850715   ", "Ref基因型": "    AA/GG   ", "基因": "    0.002041   ", "MAF(亚洲)": "   RIPOR2       ", "蛋白质变化": "      p.M256T" },
        { "变异": "rs763158102  ", "染色体位置": "  1:1916890     ", "Ref基因型": "  CC/TT     ", "基因": "  0.005102     ", "MAF(亚洲)": " CALML6         ", "蛋白质变化": "    p.T114I" },
        { "变异": "rs782069935  ", "染色体位置": "  1:149908174   ", "Ref基因型": "    AA/GG   ", "基因": "    0.006463   ", "MAF(亚洲)": "   SV2A         ", "蛋白质变化": "    p.M471T" },
        { "变异": "rs372163409  ", "染色体位置": "  2:46001425    ", "Ref基因型": "   GG/AA    ", "基因": "   0.008762    ", "MAF(亚洲)": "  PRKCE         ", "蛋白质变化": "    p.R282H" },
        { "变异": "rs1283017731 ", "染色体位置": "   2:53801491   ", "Ref基因型": "    GG/AA   ", "基因": "    0.001915   ", "MAF(亚洲)": "   ERLEC1       ", "蛋白质变化": "      p.R207K" },
        { "变异": "rs750191512  ", "染色体位置": "  2:127631294   ", "Ref基因型": "    CC/TT   ", "基因": "    0.006646   ", "MAF(亚洲)": "   MYO7B        ", "蛋白质变化": "     p.R1650X" },
        { "变异": "rs1272748573 ", "染色体位置": "   2:130762653  ", "Ref基因型": "     GG/AA  ", "基因": "     0.00169   ", "MAF(亚洲)": "   AMER3        ", "蛋白质变化": "     p.G194E" },
        { "变异": "rs1396668991 ", "染色体位置": "   2:201160699  ", "Ref基因型": "     TT/CC  ", "基因": "     0.004972  ", "MAF(亚洲)": "    CFLAR       ", "蛋白质变化": "      p.M109T" },
        { "变异": "rs375651741  ", "染色体位置": "  2:241872597   ", "Ref基因型": "    AA/GG   ", "基因": "    0.006832   ", "MAF(亚洲)": "   RTP5         ", "蛋白质变化": "p.I348V" },
        { "变异": "rs144490434  ", "染色体位置": "  1:935833      ", "Ref基因型": " CC/GG      ", "基因": "     0.0055    ", "MAF(亚洲)": "  SAMD11        ", "蛋白质变化": " p.P123A" },
        { "变异": "rs765561559  ", "染色体位置": "  3:52743384    ", "Ref基因型": "   GG/AA    ", "基因": "   0.007239168 ", "MAF(亚洲)": "     NEK4       ", "蛋白质变化": "  p.R569X" },
        { "变异": "rs1230695160 ", "染色体位置": "   3:58424917   ", "Ref基因型": "    GG/AA   ", "基因": "    0.008612732", "MAF(亚洲)": "      PXK       ", "蛋白质变化": "  p.R407K" },
        { "变异": "rs143580910  ", "染色体位置": "  3:73384912    ", "Ref基因型": "   CC/TT    ", "基因": "   0.006378443 ", "MAF(亚洲)": "     PDZRN3     ", "蛋白质变化": "    p.G250S" },
        { "变异": "rs921509869  ", "染色体位置": "  3:97877334    ", "Ref基因型": "   AA/GG    ", "基因": "   0.005378614 ", "MAF(亚洲)": "     CRYBG3     ", "蛋白质变化": "    p.D2047G" },
        { "变异": "rs1189500747 ", "染色体位置": "   6:31701303   ", "Ref基因型": "    GG/GA   ", "基因": "    0.009788571", "MAF(亚洲)": "      ABHD16A   ", "蛋白质变化": ".P76L" },
        { "变异": "rs150691200  ", "染色体位置": "  3:140404653   ", "Ref基因型": "    AA/GG   ", "基因": "    0.008346339", "MAF(亚洲)": "      CLSTN2    ", "蛋白质变化": "  p.Y175C" },
        { "变异": "rs773314504  ", "染色体位置": "  3:131029865   ", "Ref基因型": "    CC/CT   ", "基因": "    0.00460541 ", "MAF(亚洲)": "     NEK11      ", "蛋白质变化": "        p.R53X" },
        { "变异": "rs1378229397 ", "染色体位置": "   5:79237489   ", "Ref基因型": "    AA/GG   ", "基因": "    0.006271904", "MAF(亚洲)": "      JMY       ", "蛋白质变化": "       p.Q280R" },
        { "变异": "rs1484748624 ", "染色体位置": "   6:4031998    ", "Ref基因型": "   AA/GG    ", "基因": "   0.004361617 ", "MAF(亚洲)": "     PRPF4B     ", "蛋白质变化": " p.S161G" },
        { "变异": "rs994927193  ", "染色体位置": "  6:1312744     ", "Ref基因型": "  GG/AA     ", "基因": "  0.004609372  ", "MAF(亚洲)": "    FOXQ1       ", "蛋白质变化": "       p.D14N" },
        { "变异": "rs201687291  ", "染色体位置": "  5:178120334   ", "Ref基因型": "    CC/TT   ", "基因": "    0.009089563", "MAF(亚洲)": "      N4BP3     ", "蛋白质变化": " p.R163W" },
        { "变异": "rs542414446  ", "染色体位置": "  5:154053249   ", "Ref基因型": "    AA/GG   ", "基因": "    0.003598436", "MAF(亚洲)": "      MFAP3     ", "蛋白质变化": " p.I63V" },
        { "变异": "rs201059756  ", "染色体位置": "  5:140568131   ", "Ref基因型": "    AA/GG   ", "基因": "    0.008551595", "MAF(亚洲)": "      SLC35A4   ", "蛋白质变化": "   p.Y321C" },
        { "变异": "rs956482411  ", "染色体位置": "  3:183951880   ", "Ref基因型": "    TT/TC   ", "基因": "    0.003269598", "MAF(亚洲)": "      ABCC5     ", "蛋白质变化": " p.I459V" },
        { "变异": "rs889418995  ", "染色体位置": "  22:45931262   ", "Ref基因型": "    CC/CT   ", "基因": "    0.003843697", "MAF(亚洲)": "      WNT7B     ", "蛋白质变化": " p.E136K" },
        { "变异": "rs762609462  ", "染色体位置": "  5:43292908    ", "Ref基因型": "   CC/AA    ", "基因": "   0.006447103 ", "MAF(亚洲)": "     HMGCS1     ", "蛋白质变化": " p.G375C" },
        { "变异": "rs763308335  ", "染色体位置": "  5:1325767     ", "Ref基因型": "  AA/GG     ", "基因": "  0.008299218  ", "MAF(亚洲)": "    CLPTM1L     ", "蛋白质变化": "p.L377P" },
        { "变异": "rs752054203  ", "染色体位置": "  4:48535722    ", "Ref基因型": "   CC/CT    ", "基因": "   0.009592604 ", "MAF(亚洲)": "     FRYL       ", "蛋白质变化": "  p.V2167M" },
        { "变异": "rs1048654784 ", "染色体位置": "   4:39500244   ", "Ref基因型": "    TT/TC   ", "基因": "    0.007302359", "MAF(亚洲)": "      UGDH      ", "蛋白质变化": "   p.I395V" },
        { "变异": "rs1462640773 ", "染色体位置": "   4:27022800   ", "Ref基因型": "    AA/GG   ", "基因": "    0.009764561", "MAF(亚洲)": "      STIM2     ", "蛋白质变化": "    p.N682S" },
        { "变异": "rs552041309  ", "染色体位置": "  3:194341327   ", "Ref基因型": "    GG/AA   ", "基因": "    0.007705478", "MAF(亚洲)": "      CPN2      ", "蛋白质变化": "   p.P459L" },
        { "变异": "rs1419816724 ", "染色体位置": "   1:1287127    ", "Ref基因型": "   GG/AA    ", "基因": "   0.007010895 ", "MAF(亚洲)": "     SCNN1D     ", "蛋白质变化": "    p.D380N" },
        { "变异": "rs765964710  ", "染色体位置": "  18:2891847    ", "Ref基因型": "   CC/CT    ", "基因": "   0.007412654 ", "MAF(亚洲)": "     EMILIN2    ", "蛋白质变化": "   p.R574C" },
        { "变异": "rs1370067106 ", "染色体位置": "   9:34723935   ", "Ref基因型": "    CC/TT   ", "基因": "    0.006693399", "MAF(亚洲)": "      FAM205A  ,", "蛋白质变化": " p.S1102N" }],
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
      let fileName = "夏某泽的全外解读报告.pdf";
      dom.download = fileName;
      dom.style.display = "none";
      dom.href = this.$Url.pdf.xiamoushi;
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