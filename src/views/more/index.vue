<template>
  <div class="home">
    <!-- vHeader -->
    <vHeader />
    <div class="more-box">
      <!-- 顶图 -->
      <div class="more-banner">
        <h2 class="title">
          <img src="@/assets/more/logo.png" alt="" />
          遗传病全外显子组智能解读引擎、智能解读系统技术要点
        </h2>
      </div>

      <!-- title1 -->
      <div id="section1" ref="section1" class="section section1">
        <h2 class="title">
          <i class="icon-tit icon-tit-left"></i>
          整合24个权威专业数据库，涵盖基因、症状（表型）、变异、蛋白、功能预测和GWAS数据库资源，构建了业内最完整的疾病-症状（表型）-基因-变异位点知识库
        </h2>
        <div class="section-cont">

          <el-table :data="section1" :cell-style="rowClass" :header-cell-style="headClass" border style="width: 100%;">
            <el-table-column align="center" width="160px" prop="name" label="数据库名称"> </el-table-column>
            <el-table-column align="center" width="160px" prop="type" label="实体类别"> </el-table-column>
            <el-table-column align="center" prop="sketch" label="简述"> </el-table-column>
            <el-table-column align="center" width="83px" prop="language" label="语言"> </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- title2 -->
      <div id="section2" ref="section2" class="section section2">
        <div class="section-cont">
          <h2 class="title">
            <i class="icon-tit icon-tit-left-cur"></i>
            以GRAKN图数据库技术为支撑，通过规则推断实体间的潜在关系，进一步深挖生物医药领域大量数据的潜在价值，结合AI技术，构建知识图谱。
          </h2>
          <p class="clear mt30"></p>
          <div class="img-box">
            <img src="@/assets/more/111.png" alt="" />
            <p>本项目建立的知识库 schema</p>
          </div>

          <div class="section-txt">
            <p class="clear mt30"></p>
            <p>GRAKN 是具有推理、查询语言功能 的分布式图数据库（graph database）系 统，能够高效查询显式存储的数据和隐式派生的信息。</p>
            <p class="clear mt30"></p>
            <p>GRAKN 有如下特点：</p>
            <p><em></em><span>允许使用 Entity-Relationship
                模型建模。它由实体类型、关系类型和属性类型组成。与其他建模语言不同，GRAKN允许定义类型层次结构、超实体、超关系和规则以构建丰富的知识模型，</span></p>
            <p>
              <em></em><span>提供了轻松快速地将类型继承功能。遵循面向对象的原理，这允许数据类型继承其父级的行为和属性，允许在知识架构中定义规则，从而扩展了模型的表达能力，因为当满足数据集中的某种逻辑形式时，系统可以得出新的结论，</span>
            </p>
            <p><em></em><span>具备推理功能，通过两种机制实现：基于类型的推理和基于规则的推理。这不仅可以得出新的结论并揭示原来隐藏的关系，而且还可以将复杂的模式抽象为简单的查询，</span></p>
            <p><em></em><span>支持以分布式方式对大量数据执行计算。</span></p>
            <p class="clear mt30"></p>
            <p>GRAKN 在本项目上显示的主要优势：</p>
            <p><em></em><span>可以通过规则来推断潜在的关系</span></p>
            <p class="tit2"> <i>o </i><span>例如：已知 A变异在 B 基因上，A 变异与 C 疾病有关。我们可以通过编写规则，让 GRAKN 自动识别出 B 基因与 C
                疾病的关联性。</span></p>
            <p class="tit2"> <i>o </i><span>有效使用 GRAKN 有助于进一步深挖生物医药领域有大量的公开数据的潜在价值。</span></p>
            <p><em></em><span>可以很高效的查询关联数据：图数据库对关联查询在存储模型、数据结构、查询算法等方面进行了针对性的优化</span></p>
            <p><em></em><span>作为先进的图数据库，GRAKN 有结合 AI 的潜力，使得我们可以以 GRAKN 为基础构建知识图谱。</span></p>
          </div>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>

      <!-- title3 -->
      <div id="section3" ref="section3" class="section section3">
        <h2 class="title" style="width:1013px">
          <i class="icon-tit icon-tit-left"></i>
          利用人工智能（AI）技术支持的自然语言处理（NLP）技术从专业医学研究文献中实现知识的自动获取，并实现知识库资源的随时更新。
        </h2>
        <div class="section-cont">

          <div class="section-txt">
            <p class="clear"></p>
            <p>我们主要构建了两类 NLP 模型：</p>
            <p><em></em><span>命名实体识别（NER）模型，采用 PubTator 技术</span></p>
            <p class="tit2"><i>o </i><span>疾病实体的识别 F1分数为 0.782，基因实体的识别 F1 分数为 0.867，变异实体的识别 F1 分数为 0.914。</span></p>
            <p class="clear mt30"></p>
            <div class="img-box">
              <img src="@/assets/more/222.png" alt="" />
              <p>从 PubMed 的摘要文字中提取疾病、基因和变异位点之间的关联知识</p>
            </div>
            <p class="clear mt30"></p>
            <p><em></em><span>关系抽取（RE）模型，采用基于深度神经网络的 BERT 技术</span></p>
            <p class="tit2"><i>o </i><span>构建了两个 RE 模型，疾病-基因关系模型，和疾病-变异位点关系模型</span></p>
            <p class="tit2 tit20"><em></em><span>例如，在医学研究文献中有如下一句话： </span></p>
            <p class="tit3" style="word-spacing:8px"> We found that GeneB is the most frequently mutated gene in
              DiseaseA, but not GeneC.</p>
            <p class="tit3"><span>可构建两条训练数据：</span></p>
            <p class="tit4"><i>a. </i><span style="word-spacing:4px">{{ model.section3.a }}</span></p>
            <p class="tit4"><i>b. </i><span style="word-spacing:4px">{{ model.section3.b }}</span></p>
            <p class="tit2 tit20"><em></em><span>两位经验丰富的生物信息工程师，经过交叉验证，完成训练数据集的构建，包含 1472 条数据。</span></p>
            <p class="clear mt30"></p>
            <el-table :data="section3" :cell-style="rowClass" :header-cell-style="headClass" border
              class="sectionTable">
              <el-table-column align="center" prop="title" label=""> </el-table-column>
              <el-table-column align="center" width="120px" prop="Accuracy" label="Accuracy"></el-table-column>
              <el-table-column align="center" width="120px" prop="F1Score" label="F1 Score"></el-table-column>
            </el-table>
            <p class="clear mt30"></p>
            <p class="tit2 tit20"><em></em><span>对神经网络的框架和参数进行了优化，调整 regularization term，克服 overfitting 问题。 </span></p>
            <p class="tit2 tit20"><em></em><span>在 PubMed 的文献摘要中测试，平均每 6 个摘要可以抽取一条疾病-基因的关系，每 120 个摘要可以抽取一条疾病-变异位点的关系。
              </span></p>
          </div>
        </div>
        <div class="clear"></div>
      </div>

      <!-- title4 -->
      <div id="section4" ref="section4" class="section section4 horizontal-bar">
        <div class="section-cont">
          <h2 class="title">
            <i class="icon-tit icon-tit-left-cur"></i>
            开发完成基于机器学习模型的集成化变异位点致病性打分机制
          </h2>
          <div class="section4-cont">
            <div class="section-txt">
              <p class="tit1">近年来，有很多生物信息团队开发了对变异位点的致病性进行打分的工具。被广泛应用的有大约 8 个。</p>
              <p><em></em><span>依据：</span></p>
              <p class="tit2"><i>o </i>对变异导致的氨基酸水平变化进行预测，</p>
              <p class="tit2"><i>o </i>对变异所在位点在接近物种基因组上的保守性进行分析。</p>
              <p><em></em>这些工具打分尺度不统一，打分结果常有冲突，未经独立验证，显示可靠性有局限。</p>
              <p class="clear mt30"></p>
              <!-- section4 table -->
              <el-table :data="section4" :cell-style="rowClass" :header-cell-style="headClass" border
                style="width: 640px;margin-left:200px;">
                <el-table-column align="center" width="190px" prop="title" label="致病性打分工具">
                </el-table-column>
                <el-table-column align="left" prop="content" label="打分和功能评价机制">
                </el-table-column>
              </el-table>
              <p class="clear mt30"></p>
              <p><em></em>我们对这 8 个工具的打分可靠性进行的独立评估，并使用机器学习算法构建了 meta-prediction 模型。</p>
              <p class="tit2"><i>o </i>从 OMIM 数据库中抽取已知的致病变异，作为正数据集，</p>
              <p class="tit2"><i>o </i>从 gnomeAD 数据库中抽取 OMIM 中未记载的，在全部人群中 MAF > 0.2 的变异，作为负数据集， </p>
              <p class="clear mt30"></p>
            </div>
          </div>
        </div>
      </div>

      <div class="section4" style="padding-top:110px;">
        <div class="section-txt">
          <el-table :cell-style="rowClass" :header-cell-style="headClass" :data="section40" border
            style="width:1300px; margin:0 auto;">
            <el-table-column align="center" width="90px" prop="CHROM" label="CHROM"></el-table-column>
            <el-table-column align="center" width="90px" prop="POS" label="POS"></el-table-column>
            <el-table-column align="center" width="110px" prop="ID" label="ID"></el-table-column>
            <el-table-column align="center" width="60px" prop="REF" label="REF"></el-table-column>
            <el-table-column align="center" width="60px" prop="ALT" label="ALT"></el-table-column>
            <el-table-column align="center" width="80px" prop="GeneName" label="Gene Name"></el-table-column>
            <el-table-column align="center" width="64px" prop="SIFT" label="SIFT"></el-table-column>
            <el-table-column align="center" width="120px" prop="Polyphen2HDIV" label="Polyphen2 HDIV">
            </el-table-column>
            <el-table-column align="center" width="120px" prop="Polyphen2HVAR" label="Polyphen2 HVAR">
            </el-table-column>
            <el-table-column align="center" width="70px" prop="LRT" label="LRT"></el-table-column>
            <el-table-column align="center" width="108px" prop="MutationTaster" label="Mutation Taster">
            </el-table-column>
            <el-table-column align="center" width="108px" prop="MutationAssessor" label="Mutation Assessor">
            </el-table-column>
            <el-table-column align="center" width="110px" prop="FATHMM" label="FATHMM"></el-table-column>
            <el-table-column align="center" prop="PROVEAN" label="PROVEAN"></el-table-column>
          </el-table>
        </div>
      </div>

      <div class="section section4 horizontal-bar" style="margin-top:-15px;">
        <div class="section-cont">
          <div class="section4-cont">
            <div class="section-txt">
              <p class="tit2"><i>o </i>尝试了多种线性和非线性 meta-prediction 算法，最后选用支持向量机 (SVM），RBF kernel</p>
              <p class="tit2"><i>o </i>现有 8 个打分工具打分的正确率在 44% 和 66.5% 之间，缺失率在 30.7% 和 44.6% 之间。 </p>
              <p class="tit2"><i>o </i>我们开发的基于 SVM 的工具取得正确率 92%，没有缺失。 </p>
              <p class="clear mt30"></p>
              <!-- section400 table -->
              <el-table :cell-style="rowClass" :header-cell-style="headClass" :data="section400" border
                style="width: 500px; margin-left:204px;">
                <el-table-column width="190px" align="center" prop="title" label="致病性打分工具">
                </el-table-column>
                <el-table-column width="110px" align="center" prop="Accuracy" label="正确率">
                </el-table-column>
                <el-table-column width="110px" align="center" prop="errorRate" label="错误率">
                </el-table-column>
                <el-table-column align="center" prop="MissingRate" label="缺失率">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>

      <!-- title5 -->
      <div id="section5" ref="section5" class="section section5 horizontal-bar">
        <div class="section-cont">
          <h2 class="title">
            <i class="icon-tit icon-tit-left"></i>
            采用精准的种群特异性的次等位基因频率（MAF）对变异位点评估
          </h2>

          <div class="section-txt">
            <p class="tit1">MAF：变异在人群中出现的频率.</p>
            <p><em></em> <span>现有 MAF 资源有多个问题：</span></p>
            <p class="tit2"><i>o </i>最权威的 ExAC 数据库使用的数据源包含很多病人的数据，造成 MAF 计算的偏差， </p>
            <p class="tit2"><i>o </i>不同的种群 （例如 Asian vs. Caucasian）的 MAF 有显著差异，多数工具未予考虑。</p>
            <p class="clear mt30"></p>
            <!-- section5 table -->
            <vue-scroll :ops="scrollOps">
              <el-table :cell-style="rowClass" :header-cell-style="headClass" :data="section5" border
                style="width:1981px">
                <el-table-column align="center" width="200px" prop="SNPID" label="SNP ID"></el-table-column>
                <el-table-column align="center" width="220px" prop="Chromosome" label="Chromosome"></el-table-column>
                <el-table-column align="center" width="200px" prop="Position" label="Position"></el-table-column>
                <el-table-column align="center" width="240px" prop="ReferenceBase" label="Reference Base">
                </el-table-column>
                <el-table-column align="center" width="240px" prop="AlternativeBase" label="Alternative Base">
                </el-table-column>
                <el-table-column align="center" width="200px" prop="OverallMAF" label="Overall MAF"></el-table-column>
                <el-table-column align="center" width="340px" prop="MAFAmongEastAsians" label="MAF Among East Asians">
                </el-table-column>
                <el-table-column align="center" width="340px" prop="DiseaseImplicated" label="Disease Implicated">
                </el-table-column>
              </el-table>
            </vue-scroll>
            <p class="clear mt30"></p>
            <!-- section50 table -->
            <vue-scroll :ops="scrollOps">
              <el-table :cell-style="rowClass" :header-cell-style="headClass" :data="section50" border
                style="width:2461px">
                <el-table-column align="center" width="200px" prop="MAF" label=""></el-table-column>
                <el-table-column align="center" width="280px" prop="EastAsian" label="East Asian ancestry 东亚血统">
                </el-table-column>
                <el-table-column align="center" width="430px" prop="African"
                  label="African-American/African ancestry 非裔美国人/非洲血统"></el-table-column>
                <el-table-column align="center" width="370px" prop="Ashkenazi" label="Ashkenazi Jewish ancestry 德系犹太血统">
                </el-table-column>
                <el-table-column align="center" width="410px" prop="Non" label="Non-Finnish European ancestry 非芬兰的欧洲血统">
                </el-table-column>
                <el-table-column align="center" width="220px" prop="Other" label="Other ancestry 其他 "></el-table-column>
                <el-table-column align="center" width="310px" prop="South" label="South Asian ancestry 南亚血统 ">
                </el-table-column>
                <el-table-column align="center" width="240px" prop="Finnish" label="Finnish ancestry 芬兰血统 ">
                </el-table-column>
              </el-table>
            </vue-scroll>
            <p class="tip">（从 overall MAF > 0.1 的变异位点上得到的统计）</p>
            <p class="clear mt30"></p>
            <p><em></em> <span>我们在积累大量中国人群/亚洲人群的变异数据基础上，精准计算各个位点的种群特异的 MAF 值，结合 PGG、GenomeAD
                数据库提供的种群特异MAF数据，用于我们的解读系统。</span></p>
          </div>
          <div class="clear"></div>
        </div>
      </div>

      <!-- title6 -->
      <div id="section6" ref="section6" class="section section6">
        <div class="section-cont">
          <h2 class="title">
            <i class="icon-tit icon-tit-left-cur"></i>
            实现由知识图谱技术支持的报告智能展示
          </h2>
        </div>
        <div class="clear"></div>
      </div>

      <!-- title7 -->
      <div id="section7" ref="section7" class="section section7">
        <div class="section-cont">
          <h2 class="title">
            <i class="icon-tit icon-tit-left"></i>
            使用可拓展性的前沿前端和后端技术。
          </h2>
          <div class="section-txt">
            <p><em></em><span>采用前、后端完全分离的开发模式，前后端通过 API 交互。</span></p>
            <p class="tit2"><i>o </i>降低前后端的耦合度，提升开发效率。</p>
            <p><em></em> 前端以 html，css，javascript 为基础，以 React 为架构搭建。<span></span></p>
            <p><em></em><span>后端以 Java 为语言为基础，以 Spring cloud 系列开源框架为基础架构进行开发。</span></p>
            <p class="tit2"><i>o </i>Java 编程语言具有面向对象，跨平台，功能强大的特点，</p>
            <p class="tit2"><i>o </i>Spring cloud 利用 Spring boot 的开发便利性巧妙地简化了分布式系统基础设施的开发，</p>
            <p class="tit2"><i>o </i>利用 Nacos 创建配置管理、服务注册发现的服务，</p>
            <p class="tit2"><i>o </i>利用 Spring cloud security oauth2 开发了权限控制的功能，</p>
            <p class="tit2"><i>o </i>通过 Spring cloud zuul 实现路由和负载均衡的功能，构建分布式服务系统。</p>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <!-- vFooter -->
    <vFooter />
  </div>
</template>

<script>
import vHeader from "@/components/common/vHeader";
import vFooter from "@/components/common/vFooter";
import {
  section1,
  section3,
  section4,
  section40,
  section400,
  section5,
  section50,
} from "./section.js";
export default {
  name: "Home",
  components: {
    vHeader,
    vFooter,
  },
  data () {
    return {
      section1,
      section3,
      section4,
      section40,
      section400,
      section5,
      section50,
      model: {
        section3: {
          a: '{text: "We found that << geneB>> is the most frequently mutated gene in [[ diseaseA ]], but not geneC.", label: "is associated with"}',
          b: '{text: "We found that geneB is the most frequently mutated gene in [[ diseaseA ]], but not << geneC>>.", label: "is not associated with"}',
        },
      },
      scrollOps: {
        vuescroll: {
          mode: "native",
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: true,
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
    };
  },
  mounted () {
    this.linkHandle();
  },
  methods: {
    linkHandle () {
      var hash = window.location.hash;
      var index = hash.lastIndexOf("#");
      if (index != -1) {
        var id = hash.substring(index + 1, hash.length + 1);
        var div = document.getElementById(id);
        if (div) {
          setTimeout(function () {
            $("html, body").animate(
              { scrollTop: $(div).offset().top - 0 },
              100
            );
          }, 100);
        }
      }
    },
    // 表头样式设置
    headClass () {
      return 'text-align: center; color:#333; font-size:24px; line-height: 35px;'
    },
    // 表格样式设置
    rowClass () {
      return 'color:#333; font-size:18px; padding-right:0; padding-left:0px; '
    }
  },
};
</script>

<style lang="scss" scoped>
.clear:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}
.clear {
  zoom: 1;
}
.more-box {
  width: 100%;
  overflow: hidden;
}
.home {
  width: 100%;
  min-width: 900px;
  .more-banner {
    width: 100%;
    overflow: hidden;
    text-align: center;
    height: 370px;
    position: relative;
    background: url("~@/assets/more/more-banner.jpg") no-repeat center top;
    h2.title {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      vertical-align: middle;
      font-weight: normal;
      font-size: 40px;
      color: #3f3f3f;
    }
  }
  .section {
    padding: 40px 0;
    .txt-center {
      text-align: center;
    }
    .txt-left {
      text-align: left;
    }
    .section-cont {
      width: 1000px;
      margin: 0 auto;
    }
    h2.title {
      width: 996px;
      margin: 0 auto;
      position: relative;
      // width: calc(100% - 70px);
      text-align: left;
      font-size: 30px;
      line-height: 48px;
      font-weight: normal;
      padding: 0 35px;
      margin-bottom: 25px;
      padding-right: 10px;
      i.icon-tit {
        position: absolute;
        left: 0;
        top: 18px;
        width: 10px;
        height: 10px;
        float: left;
        background: #666;
      }
    }
    .img-box {
      margin: 0 auto;
      width: 100%;
      img {
        display: block;
        width: 100%;
      }
      p {
        color: #3bcaff !important;
        text-align: right;
        font-weight: normal;
        font-size: 16px;
        margin-top: 10px;
      }
    }
    .section-txt {
      .mt30 {
        padding-top: 15px;
      }
      .tit1 {
        padding-left: 36px;
      }
      .tit2 {
        padding-left: 120px;
        span {
          width: calc(100% - 230px);
        }
        i {
          font-style: normal;
          padding: 0 30px;
          padding-left: 56px;
          float: left;
        }
      }
      .tit20 {
        padding-left: 220px;
      }
      .tit3 {
        box-sizing: border-box;
        padding-left: 318px;
      }
      .tit4 {
        box-sizing: border-box;
        padding-left: 338px;
        word-wrap: break-word;
        overflow: hidden;
        // width: 920px;
        i {
          font-style: normal;
          padding: 0 30px;
          float: left;
        }
        span {
          float: left;
        }
      }

      p {
        width: 100%;
        float: left;
        font-size: 18px;
        font-weight: normal;
        line-height: 36px;
        color: #333;
        em {
          width: 10px;
          height: 10px;
          background: #333;
          float: left;
          margin: 15px 35px 0 52px;
        }
        span {
          float: left;
          width: calc(100% - 120px);
        }
      }
    }
  }
  .section2 {
    background: #f9f9f9;
  }
  .section3 {
    .img-box {
      margin: 0 auto;
      width: 88% !important;
      img {
        display: block;
        width: 100%;
      }
    }
    .sectionTable {
      width: 404px;
      margin-left: 390px;
    }
  }
  .section4 {
    background: #f9f9f9;
  }
  .section5 {
    .tip {
      color: #3bcaff !important;
      text-align: center;
      font-weight: normal;
      font-size: 16px;
      margin-top: 10px;
      text-align: right;
    }
  }
  .section6 {
    background: #f9f9f9;
  }
}
</style>
<style lang="scss"  >
.home {
  .el-table--border:after,
  .el-table--group:after,
  .el-table:before {
    background-color: #3bcaff;
  }

  .el-table--border,
  .el-table--group {
    border: 2px solid #3bcaff;
    border-bottom-width: 0px;
    border-right-width: 1px;
  }

  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 2px solid #3bcaff;
    padding: 10px 0;
  }

  .el-table--border th,
  .el-table--border th.gutter:last-of-type {
    border-bottom: 2px solid #3bcaff;
  }

  .el-table--border td,
  .el-table--border th {
    border-right: 2px solid #3bcaff;
  }
  .el-table th > .cell {
    line-height: 35px;
  }
  .el-table td > .cell {
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    width: 100%;
    padding: 0;
  }
  .el-table .cell,
  .el-table--border td:first-child .cell,
  .el-table--border th:first-child .cell {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>


