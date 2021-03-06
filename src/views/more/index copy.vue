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
        <div class="section-cont">
          <h2 class="title">
            <i class="icon-tit icon-tit-left"></i>
            整合24个权威专业数据库，涵盖基因、症状（表型）、变异、蛋白、<br />
            功能预测和GWAS数据库资源，构建了业内最完整的疾病-症状（表型）-基因-变异位点知识库
            <i class="icon-tit icon-tit-right"></i>
          </h2>
          <div class="patients-tab" style="margin-bottom: 0">
            <p class="tit">
              <span class="txt-center">数据库名称</span>
              <span>实体类别</span>
              <span style="flex: 1.8">简述</span>
              <span>语言</span>
            </p>
            <ul class="context">
              <li v-for="(item, index) in section1" :key="index">
                <p class="txt-center">{{ item.name }}</p>
                <p>{{ item.type }}</p>
                <p style="flex: 1.8" class="txt-left">{{ item.sketch }}</p>
                <p>{{ item.language }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- title2 -->
      <div id="section2" ref="section2" class="section section2">
        <div class="section-cont">
          <h2 class="title">
            <i class="icon-tit icon-tit-left-cur"></i>
            以GRAKN 图数据库技术为支撑， 通过规则推断实体间的潜在关系，<br />
            进一步深挖生物医药领域大量数据的潜在价值，结合AI技术，构建知识图谱。
            <i class="icon-tit icon-tit-right-cur"></i>
          </h2>
          <div class="img-box">
            <img src="@/assets/more/111.png" alt="" />
            <p>本项目建立的知识库 schema</p>
          </div>

          <div class="section2-cont">
            <!-- left -->
            <div class="section2-txt left">
              <h2>
                GRAKN 是具有推理、查询语言功能 的分布式图数据库（graph
                database）系 统，能够高效查询显式存储的数据和隐式派生的信息。
                <i></i>
              </h2>
              <h3>GRAKN 在本项目上显示的主要优势：</h3>
              <p>
                可以通过规则来推断潜在的关系 <br />
                例如：已知 A变异在 B 基因上，A 变异与 C
                疾病有关。我们可以通过编写规则，让 GRAKN 自动识别出 B 基因与 C
                疾病的关联性。 <br />
                有效使用 GRAKN
                有助于进一步深挖生物医药领域有大量的公开数据的潜在价值。
              </p>
              <p>
                可以很高效的查询关联数据：图数据库对关联查询在存储模型、数据结构、查询算法等方面进行了针对性的优化。
              </p>
              <p>
                作为先进的图数据库，GRAKN 有结合 AI 的潜力，使得我们可以以 GRAKN
                为基础构建知识图谱。
              </p>
            </div>
            <!-- right -->
            <div class="section2-txt right">
              <h3>GRAKN 有如下特点：</h3>
              <p>
                允许使用 Entity-Relationship
                模型建模。它由实体类型、关系类型和属性类型组成。与其他建模语言不同，GRAKN
                允许定义类型层次结构、超实体、超关系和规则以构建丰富的知识模型，
              </p>
              <p>
                提供了轻松快速地将类型继承功能。遵循面向对象的原理，这允许数据类型继承其父级的行为和属性，允许在知识架构中定义规则，从而扩展了模型的表达能力，因为当满足数据集中的某种逻辑形式时，系统可以得出新的结论，
              </p>
              <p>
                具备推理功能，通过两种机制实现：基于类型的推理和基于规则的推理。这不仅可以得出新的结论并揭示原来隐藏的关系，而且还可以将复杂的模式抽象为简单的查询，
              </p>
              <p>支持以分布式方式对大量数据执行计算。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- title3 -->
      <div id="section3" ref="section3" class="section section3">
        <div class="section-cont">
          <h2 class="title">
            <i class="icon-tit icon-tit-left"></i>
            利用人工智能（AI）技术支持的自然语言处理（NLP）<br />
            技术从专业医学研究文献中实现知识的自动获取，并实现知识库资源的随时更新。
            <i class="icon-tit icon-tit-right"></i>
          </h2>

          <!-- section3-top -->
          <div class="section3-top section3-txtbox">
            <div class="section3-txt left">
              <img src="@/assets/more/222.png" alt="" />
              <p>
                从 PubMed 的摘要文字中提取疾病、基因和变异位点之间的关联知识
              </p>
            </div>
            <div class="section3-txt right">
              <h2>我们主要构建了两类 NLP 模型：</h2>
              <h3>命名实体识别（NER）模型，采用 PubTator 技术</h3>
              <p>
                疾病实体的识别 F1分数为 0.782，<br />
                基因实体的识别 F1 分数为 0.867，<br />
                变异实体的识别 F1 分数为 0.914。<br />
              </p>
            </div>
          </div>
          <!-- section3-top -->
          <div class="section3-bottom section3-txtbox">
            <div class="section3-txt left">
              <h3>关系抽取（RE）模型，采用基于深度神经网络的 BERT 技术</h3>
              <p class="title1">
                构建了两个 RE 模型，疾病-基因关系模型，和疾病-变异位点关系模型
              </p>
              <p>例如，在医学研究文献中有如下一句话：</p>
              <p>
                We found that GeneB is the most frequently mutated gene in
                DiseaseA, but not GeneC.
              </p>
              <p>可构建两条训练数据：</p>
              <p>{{ model.section3.a }}</p>
              <p>{{ model.section3.b }}</p>
            </div>
            <div class="section3-txt right">
              <p class="title1">
                两位经验丰富的生物信息工程师，经过交叉验证，完成训练数据集的构建，包含
                1472 条数据。
              </p>
              <!-- section3 table -->
              <div class="patients-tab" style="margin: 40px 0 60px 0">
                <p class="tit">
                  <span></span>
                  <span class="txt-center">Accuracy</span>
                  <span>F1Score</span>
                </p>
                <ul class="context">
                  <li v-for="(item, index) in section3" :key="index">
                    <p class="txt-center">{{ item.title }}</p>
                    <p>{{ item.Accuracy }}</p>
                    <p>{{ item.F1Score }}</p>
                  </li>
                </ul>
              </div>
              <p class="title1">
                对神经网络的框架和参数进行了优化，调整 regularization term，克服
                overfitting 问题。
              </p>
              <p class="title1">
                在 PubMed 的文献摘要中测试，平均每 6
                个摘要可以抽取一条疾病-基因的关系，每 120
                个摘要可以抽取一条疾病-变异位点的关系。
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- title4 -->
      <div id="section4" ref="section4" class="section section4 horizontal-bar">
        <div class="section-cont">
          <h2 class="title">
            <i class="icon-tit icon-tit-left-cur"></i>
            开发完成基于机器学习模型的集成化变异位点致病性打分机制
            <i class="icon-tit icon-tit-right-cur"></i>
          </h2>

          <div class="section4-cont">
            <div class="secton4-top">
              <div class="section4-txt left">
                <h2>
                  近年来，有很多生物信息团队开发了对变异位点的致病性进行打分的工具。被广泛应用的有大约8个。
                  <i></i>
                </h2>
              </div>
              <div class="section4-txt right">
                <h3>依据</h3>
                <p>对变异导致的氨基酸水平变化进行预测，</p>
                <p>对变异所在位点在接近物种基因组上的保守性进行分析。</p>
                <h3 class="mt30">
                  这些工具打分尺度不统一，打分结果常有冲突，未经独立验证，显示可靠性有局限。
                </h3>
              </div>
            </div>
            <div class="section-center">
              <!-- section4 table -->
              <div class="patients-tab">
                <p class="tit">
                  <span class="txt-center">致病性打分工具</span>
                  <span>打分和功能评价机制</span>
                </p>
                <ul class="context">
                  <li v-for="(item, index) in section4" :key="index">
                    <p class="txt-center">{{ item.title }}</p>
                    <p>{{ item.content }}</p>
                  </li>
                </ul>
              </div>
              <h3>
                我们对这8个工具的打分可靠性进行的独立评估，并使用机器学习算法构建了meta-prediction
                模型。
              </h3>
              <p>从OMIM 数据库中抽取已知的致病变异，作为正数据集，</p>
              <p>
                从 gnomeAD 数据库中抽取OMIM 中未记载的，在全部人群中 MAF > 0.2
                的变异，作为负数据集，
              </p>

              <div
                class="gene-tab tab"
                style="margin-top: 30px; margin-bottom: 90px"
              >
                <div class="tit tit-fix"></div>
                <div class="context-fix"></div>
                <vue-scroll :ops="scrollOps">
                  <div class="tit tit2">
                    <p>
                      <span class="txt-center">CHROM</span>
                      <span>POS</span>
                      <span>ID</span>
                      <span>REF</span>
                      <span>ALT</span>
                      <span>Gene Name</span>
                      <span>SIFT</span>
                      <span style="flex: 1.5">Polyphen2 HDIV</span>
                      <span style="flex: 1.5">Polyphen2 HVAR</span>
                      <span>LRT</span>
                      <span>Mutation Taster</span>
                      <span>Mutation Assessor</span>
                      <span>FATHMM</span>
                      <span>PROVEAN</span>
                    </p>
                  </div>
                  <ul class="context">
                    <li v-for="(item, index) in section40" :key="index">
                      <p class="txt-center">{{ item.CHROM }}</p>
                      <p>{{ item.POS }}</p>
                      <p>{{ item.ID }}</p>
                      <p>{{ item.REF }}</p>
                      <p>{{ item.ALT }}</p>
                      <p>{{ item.GeneName }}</p>
                      <p>{{ item.SIFT }}</p>
                      <p style="flex: 1.5">{{ item.Polyphen2HDIV }}</p>
                      <p style="flex: 1.5">{{ item.Polyphen2HVAR }}</p>
                      <p>{{ item.LRT }}</p>
                      <p>{{ item.MutationTaster }}</p>
                      <p>{{ item.MutationAssessor }}</p>
                      <p>{{ item.FATHMM }}</p>
                      <p>{{ item.PROVEAN }}</p>
                    </li>
                  </ul>
                </vue-scroll>
              </div>
              <p>
                尝试了多种线性和非线性 meta-prediction 算法，最后选用支持向量机
                (SVM），RBF kernel
              </p>
              <p>
                现有 8 个打分工具打分的正确率在 44% 和 66.5% 之间，缺失率在
                30.7% 和 44.6% 之间。
              </p>
              <p>我们开发的基于 SVM 的工具取得正确率 92%，没有缺失。</p>
              <!-- section400 table -->
              <div class="patients-tab" style="margin-bottom: 0">
                <p class="tit">
                  <span class="txt-center">致病性打分工具</span>
                  <span>正确率</span>
                  <span>错误率</span>
                  <span>缺失率</span>
                </p>
                <ul class="context">
                  <li v-for="(item, index) in section400" :key="index">
                    <p class="txt-center">{{ item.title }}</p>
                    <p>{{ item.Accuracy }}</p>
                    <p>{{ item.errorRate }}</p>
                    <p>{{ item.MissingRate }}</p>
                  </li>
                </ul>
              </div>
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
            <i class="icon-tit icon-tit-right"></i>
          </h2>
          <div class="section5-top">
            <div class="section5-txt">
              <h2>
                MAF：变异在人群中出现的频率.
                <i></i>
              </h2>
            </div>
            <div class="section5-txt">
              <h3>现有 MAF 资源有多个问题</h3>
              <p>
                最权威的 ExAC 数据库使用的数据源包含很多病人的数据，造成 MAF
                计算的偏差，
              </p>
              <p>
                不同的种群 （例如 Asian vs. Caucasian）的 MAF
                有显著差异，多数工具未予考虑。
              </p>
            </div>
          </div>
          <!-- section5 table -->
          <div class="patients-tab" style="margin-top: 70px">
            <p class="tit">
              <span class="txt-center">SNP ID</span>
              <span>Chromosome</span>
              <span>Position</span>
              <span>Reference Base</span>
              <span>Alternative Base</span>
              <span>Overall MAF</span>
              <span>MAF Among East Asians</span>
              <span>Disease Implicated</span>
            </p>
            <ul class="context">
              <li v-for="(item, index) in section5" :key="index">
                <p class="txt-center">{{ item.SNPID }}</p>
                <p>{{ item.Chromosome }}</p>
                <p>{{ item.Position }}</p>
                <p>{{ item.ReferenceBase }}</p>
                <p>{{ item.AlternativeBase }}</p>
                <p>{{ item.OverallMAF }}</p>
                <p>{{ item.MAFAmongEastAsians }}</p>
                <p>{{ item.DiseaseImplicated }}</p>
              </li>
            </ul>
          </div>

          <!-- section50 table -->
          <div
            class="gene-tab tab"
            style="margin-top: -50px; margin-bottom: 90px"
          >
            <div class="tit tit-fix"></div>
            <div class="context-fix"></div>
            <vue-scroll :ops="scrollOps">
              <div class="tit tit2">
                <p>
                  <span class="txt-center"></span>
                  <span>East Asian ancestry 东亚血统</span>
                  <span
                    >African-American/African ancestry 非裔美国人/非洲血统</span
                  >
                  <span>Ashkenazi Jewish ancestry 德系犹太血统 </span>
                  <span>Non-Finnish European ancestry 非芬兰的欧洲血统 </span>
                  <span>Other ancestry 其他 </span>
                  <span>South Asian ancestry 南亚血统 </span>
                  <span>Finnish ancestry 芬兰血统 </span>
                </p>
              </div>
              <ul class="context">
                <li v-for="(item, index) in section50" :key="index">
                  <p class="txt-center">{{ item.MAF }}</p>
                  <p>{{ item.EastAsian }}</p>
                  <p>{{ item.African }}</p>
                  <p>{{ item.Ashkenazi }}</p>
                  <p>{{ item.Non }}</p>
                  <p>{{ item.Other }}</p>
                  <p>{{ item.South }}</p>
                  <p>{{ item.Finnish }}</p>
                </li>
              </ul>
            </vue-scroll>
            <p class="tip">（从 overall MAF > 0.1 的变异位点上得到的统计）</p>
          </div>
          <h3 style="text-align: center">
            我们在积累大量中国人群/亚洲人群的变异数据基础上，精准计算各个位点的种群特异的
            MAF 值，<br />结合 PGG、GenomeAD 数据库提供的种群特异 MAF
            数据，用于我们的解读系统
          </h3>
        </div>
      </div>

      <!-- title6 -->
      <div id="section6" ref="section6" class="section section6">
        <div class="section-cont">
          <h2 class="title">
            <i class="icon-tit icon-tit-left-cur"></i>
            实现由知识图谱技术支持的报告智能展示
            <i class="icon-tit icon-tit-right-cur"></i>
          </h2>
        </div>
      </div>

      <!-- title7 -->
      <div id="section7" ref="section7" class="section section7">
        <div class="section-cont">
          <h2 class="title">
            <i class="icon-tit icon-tit-left"></i>
            使用可拓展性的前沿前端和后端技术。
            <i class="icon-tit icon-tit-right"></i>
          </h2>

          <div class="section7-box">
            <div class="section7-txt">
              <h3>采用前、后端完全分离的开发模式，前后端通过 API 交互。</h3>
              <p>降低前后端的耦合度，提升开发效率</p>
              <h3 class="mt20">
                前端以 html，css，javascript 为基础，以 React 为架构搭建。
              </h3>
            </div>
            <div class="section7-txt">
              <h3>
                后端以 Java 为语言为基础，以 Spring cloud
                系列开源框架为基础架构进行开发。
              </h3>
              <p>Java 编程语言具有面向对象，跨平台，功能强大的特点，</p>
              <p>
                Spring cloud 利用 Spring boot
                的开发便利性巧妙地简化了分布式系统基础设施的开发，
              </p>
              <p>利用 Nacos 创建配置管理、服务注册发现的服务，</p>
              <p>利用 Spring cloud security oauth2 开发了权限控制的功能，</p>
              <p>
                通过 Spring cloud zuul
                实现路由和负载均衡的功能，构建分布式服务系统。
              </p>
            </div>
          </div>
        </div>
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
  data() {
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
          a:
            'a. {text: "We found that << geneB>> is the most frequently mutated gene in [[ diseaseA ]], but not geneC.", label: "is associated with"}',
          b:
            'b. {text: "We found that geneB is the most frequently mutated gene in [[ diseaseA ]], but not << geneC>>.", label: "is not associated with"}',
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
  mounted() {
    this.linkHandle();
  },
  methods: {
    linkHandle() {
      var hash = window.location.hash;
      var index = hash.lastIndexOf("#");
      if (index != -1) {
        var id = hash.substring(index + 1, hash.length + 1);
        var div = document.getElementById(id);
        if (div) {
          setTimeout(function () {
            console.log($(div).offset().top);
            //$('html,body').scrollTop($(div).offset().top - 43);
            $("html, body").animate(
              { scrollTop: $(div).offset().top - 0 },
              100
            );
          }, 100);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/static/_common";
.home {
  width: 100%;
  min-width: 1000px;
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
    padding: 100px 0;
    .txt-center {
      text-align: center;
    }
    .txt-left {
      text-align: left;
    }
    .section-cont {
      width: 1200px;
      margin: 0 auto;
    }
    h2.title {
      width: 100%;
      text-align: center;
      font-size: 22px;
      font-weight: normal;
      margin-bottom: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      justify-content: center;
      i.icon-tit {
        width: 61px;
        height: 57px;
        background-repeat: no-repeat;
        background-position: center;
        padding: 0 30px;
      }
      i.icon-tit-left {
        background-image: url("~@/assets/more/images_03.png");
      }
      i.icon-tit-right {
        background-image: url("~@/assets/more/images_05.png");
      }
      i.icon-tit-left-cur {
        background-image: url("~@/assets/more/images_09.png");
      }
      i.icon-tit-right-cur {
        background-image: url("~@/assets/more/images_10.png");
      }
    }
  }

  .section2 {
    background: #f9f9f9;
    .img-box {
      width: 100%;
      img {
        display: block;
        width: 100%;
      }
      p {
        color: #3bcaff;
        text-align: right;
        font-weight: normal;
        font-size: 16px;
        margin-top: 10px;
      }
    }
    .section2-cont {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      h2 {
        font-size: 24px;
        line-height: 48px;
        color: #333;
        padding-right: 80px;
        i {
          display: block;
          width: 40px;
          height: 4px;
          margin-top: 15px;
          background: #3bcaff;
        }
      }
      .section2-txt {
        width: 50%;
      }
      .left {
        h3 {
          margin-top: 114px;
        }
        p {
          padding-right: 100px;
          margin-top: 40px;
          font-size: 18px;
          line-height: 30px;
          color: #666;
          font-weight: normal;
        }
      }
      .right {
        padding-left: 60px;
        p {
          margin-top: 40px;
          font-size: 18px;
          line-height: 30px;
          color: #666;
        }
      }
    }
  }
  .section3 {
    .section3-txtbox {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      .section3-txt {
        width: 50%;
      }
    }
    .section3-top {
      margin-top: 50px;
      .left {
        text-align: center;
        img {
          width: 324px;
          display: block;
          margin: 0 auto;
        }
        p {
          color: #3bcaff;
          text-align: center;
          font-weight: normal;
          font-size: 16px;
          margin-top: 10px;
        }
      }
      .right {
        h2 {
          margin-top: 50px;
          font-size: 24px;
          line-height: 48px;
          color: #333;
        }
        p {
          margin-top: 40px;
          font-size: 18px;
          line-height: 30px;
          color: #666;
          font-weight: normal;
        }
      }
    }
    .section3-bottom {
      padding-top: 100px;
      .left {
        .title1 {
          padding-bottom: 73px;
          font-weight: 500;
        }
        p {
          font-size: 18px;
          line-height: 40px;
          color: #333;
          font-weight: normal;
          padding-right: 80px;
          margin-top: 10px;
        }
      }
      .right {
        .title1 {
          font-weight: 500;
        }
        p {
          font-size: 18px;
          color: #333;
          font-weight: normal;
          margin-bottom: 20px;
        }
      }
    }
  }
  .section4 {
    background: #f9f9f9;
    .section4-cont {
      .secton4-top {
        margin-top: 50px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        margin-top: 80px;
        .section4-txt {
          width: 50%;
        }
        .left {
          padding-left: 80px;
          h2 {
            font-size: 24px;
            line-height: 48px;
            color: #333;
            padding-right: 100px;
            i {
              display: block;
              width: 40px;
              height: 4px;
              margin-top: 40px;
              background: #3bcaff;
            }
          }
        }
        .right {
          padding-left: 80px;
          .mt30 {
            margin-top: 30px;
          }
        }
      }
      .section-center {
        margin-top: 100px;
        h3,
        p {
          text-align: center;
        }
        h3 {
          padding-bottom: 20px;
        }
      }
    }
    p {
      color: #333;
      text-align: left;
      font-weight: 500;
      font-size: 16px;
      margin-top: 10px;
      line-height: 30px;
    }
  }
  .section5 {
    .section5-top {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      margin-top: 80px;
      .section5-txt {
        width: 50%;
        h2 {
          padding-left: 150px;
          i {
            display: block;
            width: 40px;
            height: 4px;
            margin-top: 70px;
            background: #3bcaff;
          }
        }
        h3 {
          margin-bottom: 10px;
        }
        p {
          color: #333;
          font-weight: 500;
          font-size: 16px;
          margin-top: 10px;
          line-height: 30px;
        }
      }
    }
    .tip {
      color: #3bcaff;
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
  .section7 {
    .section7-box {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      margin-top: 80px;
      .section7-txt {
        width: 50%;
      }
      .mt20 {
        margin-top: 20px;
      }
      h3 {
        margin-bottom: 20px;
      }
      p {
        color: #333;
        font-weight: 500;
        font-size: 16px;
        margin-top: 10px;
        line-height: 30px;
      }
    }
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
          width: calc(280%);
          padding: 0 35px;
          box-sizing: border-box;
          margin-top: 0;
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
        width: calc(280%);
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
}
</style>
