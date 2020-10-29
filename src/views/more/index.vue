<template>
  <div class="home">
    <!-- vHeader -->
    <vHeader />
    <div class="more-box">
      <!-- 顶图 -->
      <div class="more-banner">
        <img src="@/assets/more/more-banner.jpg" alt="">
        <h2 class="title">
          <img src="@/assets/more/logo.png" alt="">
          遗传病全外显子组智能解读引擎、智能解读系统技术要点
        </h2>
      </div>

      <!-- title1 -->
      <div class="section section1">
        <div class="section-cont">
          <h2 class="title">整合24个权威专业数据库，涵盖基因、症状（表型）、变异、蛋白、<br />功能预测和GWAS数据库资源，构建了业内最完整的疾病-症状（表型）-基因-变异位点知识库</h2>
          <div class="patients-tab">
            <p class="tit">
              <span>数据库名称</span>
              <span>实体类别</span>
              <span style="flex:1.8">简述</span>
              <span>语言</span>
            </p>
            <ul class="context">
              <li v-for="(item, index) in section1" :key="index">
                <p class="txt-center">{{item.name}}</p>
                <p>{{item.type}}</p>
                <p class="txt-left">{{item.sketch}}</p>
                <p>{{item.language}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- title2 -->
      <div class="section section2">
        <div class="section-cont">
          <h2 class="title">以GRAKN 图数据库技术为支撑， 通过规则推断实体间的潜在关系，<br />进一步深挖生物医药领域大量数据的潜在价值，结合AI技术，构建知识图谱。</h2>
          <img src="@/assets/more/111.png" alt="">
          <p>GRAKN 是具有推理、查询语言功能的分布式图数据库（graph database）系统，能够高效查询显式存储的数据和隐式派生的信息。</p>
          <p>
            GRAKN 有如下特点：
            允许使用 Entity-Relationship 模型建模。它由实体类型、关系类型和属性类型组成。与其他建模语言不同，GRAKN 允许定义类型层次结构、超实体、超关系和规则以构建丰富的知识模型，
            提供了轻松快速地将类型继承功能。遵循面向对象的原理，这允许数据类型继承其父级的行为和属性，允许在知识架构中定义规则，从而扩展了模型的表达能力，因为当满足数据集中的某种逻辑形式时，系统可以得出新的结论，
            具备推理功能，通过两种机制实现：基于类型的推理和基于规则的推理。这不仅可以得出新的结论并揭示原来隐藏的关系，而且还可以将复杂的模式抽象为简单的查询，
            支持以分布式方式对大量数据执行计算。

            GRAKN 在本项目上显示的主要优势：
            可以通过规则来推断潜在的关系
            例如：已知 A变异在 B 基因上，A 变异与 C 疾病有关。我们可以通过编写规则，让 GRAKN 自动识别出 B 基因与 C 疾病的关联性。
            有效使用 GRAKN 有助于进一步深挖生物医药领域有大量的公开数据的潜在价值。
            可以很高效的查询关联数据：图数据库对关联查询在存储模型、数据结构、查询算法等方面进行了针对性的优化。
            作为先进的图数据库，GRAKN 有结合 AI 的潜力，使得我们可以以 GRAKN 为基础构建知识图谱。
          </p>
        </div>
      </div>

      <!-- title3 -->
      <div class="section section3">
        <div class="section-cont">
          <h2 class="title"> 利用人工智能（AI）技术支持的自然语言处理（NLP）技术从专业医学研究文献中实现知识的自动获取，并实现知识库资源的随时更新。</h2>

          <p>我们主要构建了两类 NLP 模型：
            命名实体识别（NER）模型，采用 PubTator 技术
            o 疾病实体的识别 F1分数为 0.782，基因实体的识别 F1 分数为 0.867，变异实体的识别 F1 分数为 0.914。
            <img src="@/assets/more/222.png" alt="">
            从 PubMed 的摘要文字中提取疾病、基因和变异位点之间的关联知识

            关系抽取（RE）模型，采用基于深度神经网络的 BERT 技术
            o 构建了两个 RE 模型，疾病-基因关系模型，和疾病-变异位点关系模型
            例如，在医学研究文献中有如下一句话：
            We found that GeneB is the most frequently mutated gene in DiseaseA, but not GeneC.
            可构建两条训练数据：
            <!-- a. {text: "We found that << geneB>> is the most frequently mutated gene in [[ diseaseA ]], but not geneC.", -->
            label: "is associated with"}
            <!-- b. {text: "We found that geneB is the most frequently mutated gene in [[ diseaseA ]], but not << geneC>>.", -->
            label: "is not associated with"}
            两位经验丰富的生物信息工程师，经过交叉验证，完成训练数据集的构建，包含 1472 条数据。
          </p>
          <!-- section3 table -->
          <div class="patients-tab">
            <p class="tit">
              <span></span>
              <span class="txt-center">Accuracy</span>
              <span>F1Score</span>
            </p>
            <ul class="context">
              <li v-for="(item, index) in section3" :key="index">
                <p class="txt-center">{{item.title}}</p>
                <p>{{item.Accuracy}}</p>
                <p>{{item.F1Score}}</p>
              </li>
            </ul>
          </div>

          对神经网络的框架和参数进行了优化，调整 regularization term，克服 overfitting 问题。
          在 PubMed 的文献摘要中测试，平均每 6 个摘要可以抽取一条疾病-基因的关系，每 120 个摘要可以抽取一条疾病-变异位点的关系。

        </div>
      </div>

      <!-- title4 -->
      <div class="section section4">
        <div class="section-cont">
          <h2 class="title"> 开发完成基于机器学习模型的集成化变异位点致病性打分机制</h2>

          <p>
            近年来，有很多生物信息团队开发了对变异位点的致病性进行打分的工具。被广泛应用的有大约 8 个。
            依据：
            对变异导致的氨基酸水平变化进行预测，
            对变异所在位点在接近物种基因组上的保守性进行分析。
            这些工具打分尺度不统一，打分结果常有冲突，未经独立验证，显示可靠性有局限。
          </p>
          <!-- section4 table -->
          <div class="patients-tab">
            <p class="tit">
              <span class="txt-center">致病性打分工具</span>
              <span>打分和功能评价机制</span>
            </p>
            <ul class="context">
              <li v-for="(item, index) in section4" :key="index">
                <p class="txt-center">{{item.title}}</p>
                <p>{{item.content}}</p>
              </li>
            </ul>
          </div>
          <p>
            我们对这 8 个工具的打分可靠性进行的独立评估，并使用机器学习算法构建了 meta-prediction 模型。
            从 OMIM 数据库中抽取已知的致病变异，作为正数据集，
            从 gnomeAD 数据库中抽取 OMIM 中未记载的，在全部人群中 MAF > 0.2 的变异，作为负数据集，
            <!-- section40 table -->
            <div class="patients-tab">
              <p class="tit">
                <span class="txt-center">CHROM</span>
                <span>POS</span>
                <span>ID</span>
                <span>REF</span>
                <span>ALT</span>
                <span>Gene Name</span>
                <span>SIFT</span>
                <span>Polyphen2 HDIV</span>
                <span>Polyphen2 HVAR</span>
                <span>LRT</span>
                <span>Mutation Taster</span>
                <span>Mutation Assessor</span>
                <span>FATHMM</span>
                <span>PROVEAN</span>
              </p>
              <ul class="context">
                <li v-for="(item, index) in section40" :key="index">
                  <p class="txt-center">{{item.CHROM}}</p>
                  <p>{{item.POS}}</p>
                  <p>{{item.ID}}</p>
                  <p>{{item.REF}}</p>
                  <p>{{item.ALT}}</p>
                  <p>{{item.GeneName}}</p>
                  <p>{{item.SIFT}}</p>
                  <p>{{item.Polyphen2HDIV}}</p>
                  <p>{{item.Polyphen2HVAR}}</p>
                  <p>{{item.LRT}}</p>
                  <p>{{item.MutationTaster}}</p>
                  <p>{{item.MutationAssessor}}</p>
                  <p>{{item.FATHMM}}</p>
                  <p>{{item.PROVEAN}}</p>
                </li>
              </ul>
            </div>

            尝试了多种线性和非线性 meta-prediction 算法，最后选用支持向量机 (SVM），RBF kernel
            现有 8 个打分工具打分的正确率在 44% 和 66.5% 之间，缺失率在 30.7% 和 44.6% 之间。
            <!-- section400 table -->
            <div class="patients-tab">
              <p class="tit">
                <span class="txt-center">致病性打分工具</span>
                <span>正确率</span>
                <span>错误率</span>
                <span>缺失率</span>
              </p>
              <ul class="context">
                <li v-for="(item, index) in section400" :key="index">
                  <p class="txt-center">{{item.title}}</p>
                  <p>{{item.Accuracy}}</p>
                  <p>{{item.errorRate}}</p>
                  <p>{{item.MissingRate}}</p>
                </li>
              </ul>
            </div>
            <p>
              我们开发的基于 SVM 的工具取得正确率 92%，没有缺失。
            </p>
        </div>
      </div>

      <!-- title5 -->
      <div class="section title5">
        <div class="section-cont">
          <h2 class="title">采用精准的种群特异性的次等位基因频率（MAF）对变异位点评估</h2>
          MAF：变异在人群中出现的频率.
          现有 MAF 资源有多个问题：
          o 最权威的 ExAC 数据库使用的数据源包含很多病人的数据，造成 MAF 计算的偏差，
          o 不同的种群 （例如 Asian vs. Caucasian）的 MAF 有显著差异，多数工具未予考虑。
          <!-- section5 table -->
          <div class="patients-tab">
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
                <p class="txt-center">{{item.SNPID}}</p>
                <p>{{item.Chromosome}}</p>
                <p>{{item.Position}}</p>
                <p>{{item.ReferenceBase}}</p>
                <p>{{item.AlternativeBase}}</p>
                <p>{{item.OverallMAF}}</p>
                <p>{{item.MAFAmongEastAsians}}</p>
                <p>{{item.DiseaseImplicated}}</p>
              </li>
            </ul>
          </div>

          <!-- section50 table -->
          <div class="patients-tab">
            <p class="tit">
              <span class="txt-center"></span>
              <span>East Asian ancestry 东亚血统</span>
              <span>African-American/African ancestry 非裔美国人/非洲血统</span>
              <span>Ashkenazi Jewish ancestry 德系犹太血统 </span>
              <span>Non-Finnish European ancestry 非芬兰的欧洲血统 </span>
              <span>Other ancestry 其他 </span>
              <span>South Asian ancestry 南亚血统 </span>
              <span>Finnish ancestry 芬兰血统 </span>

            </p>
            <ul class="context">
              <li v-for="(item, index) in section50" :key="index">
                <p class="txt-center">{{item.MAF}}</p>
                <p>{{item.EastAsian}}</p>
                <p>{{item.African}}</p>
                <p>{{item.Ashkenazi }}</p>
                <p>{{item.Non}}</p>
                <p>{{item.Other}}</p>
                <p>{{item.South}}</p>
                <p>{{item.Finnish}}</p>
              </li>
            </ul>
          </div>
          <p>（从 overall MAF > 0.1 的变异位点上得到的统计）</p>
          <p> 我们在积累大量中国人群/亚洲人群的变异数据基础上，精准计算各个位点的种群特异的 MAF 值，结合 PGG、GenomeAD 数据库提供的种群特异 MAF 数据，用于我们的解读系统</p>
        </div>
      </div>
      <!-- title6 -->
      <div class="section title6">
        <div class="section-cont">
          <h2> 实现由知识图谱技术支持的报告智能展示</h2>
        </div>
      </div>
      <!-- title7 -->
      <div class="section title7">
        <div class="section-cont">
          <h2>使用可拓展性的前沿前端和后端技术。</h2>
          <p> 采用前、后端完全分离的开发模式，前后端通过 API 交互。
            o 降低前后端的耦合度，提升开发效率
          </p>
          <p>前端以 html，css，javascript 为基础，以 React 为架构搭建。</p>
          <p>
            后端以 Java 为语言为基础，以 Spring cloud 系列开源框架为基础架构进行开发。
            o Java 编程语言具有面向对象，跨平台，功能强大的特点，
            o Spring cloud 利用 Spring boot 的开发便利性巧妙地简化了分布式系统基础设施的开发，
            o 利用 Nacos 创建配置管理、服务注册发现的服务，
            o 利用 Spring cloud security oauth2 开发了权限控制的功能，
            o 通过 Spring cloud zuul 实现路由和负载均衡的功能，构建分布式服务系统。
          </p>
        </div>
      </div>
    </div>
    <!-- vFooter -->
    <vFooter />
  </div>
</template>

<script>
import vHeader from '@/components/common/vHeader'
import vFooter from '@/components/common/vFooter'
import { section1, section3, section4, section40, section400, section5, section50 } from './section.js'
export default {
  name: 'Home',
  components: {
    vHeader,
    vFooter
  },
  data() {
    return {
      section1,
      section3,
      section4,
      section40,
      section400,
      section5,
      section50
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "@/static/_common";
.home {
  width: 100%;
  .more-banner {
    text-align: center;
    height: 370px;
    position: relative;
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
    }
  }
  .section1 {
  }
  .section2 {
    background: #f9f9f9;
  }
  .section3 {
  }
  .section4 {
    background: #f9f9f9;
  }
  .section5 {
  }
  .section6 {
    background: #f9f9f9;
  }
  .section7 {
  }
}
</style>
