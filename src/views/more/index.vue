<template>
  <div class="home">
    <!-- vHeader -->
    <!-- <vHeader/> -->
    <div class="more-box">
      <!-- 顶图 -->
      <div class="more-banner">
        <img src="@/assets/more/more-banner.jpg" alt="">
        <h2>遗传病全外显子组智能解读引擎、智能解读系统技术要点</h2>
      </div>
      <!-- title1 -->
      <div class="section section1">
        <h2 class="title">整合24个权威专业数据库，涵盖基因、症状（表型）、变异、蛋白、功能预测和GWAS数据库资源，构建了业内最完整的疾病-症状（表型）-基因-变异位点知识库</h2>
        <el-table :data="section1" border style="width: 100%">
          <el-table-column prop="name" label="数据库名称" width="180">
          </el-table-column>
          <el-table-column prop="type" label="实体类别" width="180">
          </el-table-column>
          <el-table-column prop="sketch" label="简述">
          </el-table-column>
          <el-table-column prop="language" label="语言">
          </el-table-column>
        </el-table>
      </div>

      <!-- title2 -->
      <div class="section section2">
        <h2 class="title"> 以GRAKN 图数据库技术为支撑， 通过规则推断实体间的潜在关系，进一步深挖生物医药领域大量数据的潜在价值，结合AI技术，构建知识图谱。</h2>
        <img src="@/assets/more/111.png" alt="">
        <p>GRAKN 是具有推理、查询语言功能的分布式图数据库（graph database）系统，能够高效查询显式存储的数据和隐式派生的信息。</p>
        <p>
          GRAKN 有如下特点：
           允许使用 Entity-Relationship 模型建模。它由实体类型、关系类型和属性类型组成。与其他建模语言不同，GRAKN 允许定义类型层次结构、超实体、超关系和规则以构建丰富的知识模型，
           提供了轻松快速地将类型继承功能。遵循面向对象的原理，这允许数据类型继承其父级的行为和属性，允许在知识架构中定义规则，从而扩展了模型的表达能力，因为当满足数据集中的某种逻辑形式时，系统可以得出新的结论，
           具备推理功能，通过两种机制实现：基于类型的推理和基于规则的推理。这不仅可以得出新的结论并揭示原来隐藏的关系，而且还可以将复杂的模式抽象为简单的查询，
           支持以分布式方式对大量数据执行计算。

          GRAKN 在本项目上显示的主要优势：
           可以通过规则来推断潜在的关系
          o 例如：已知 A变异在 B 基因上，A 变异与 C 疾病有关。我们可以通过编写规则，让 GRAKN 自动识别出 B 基因与 C 疾病的关联性。
          o 有效使用 GRAKN 有助于进一步深挖生物医药领域有大量的公开数据的潜在价值。
           可以很高效的查询关联数据：图数据库对关联查询在存储模型、数据结构、查询算法等方面进行了针对性的优化。
           作为先进的图数据库，GRAKN 有结合 AI 的潜力，使得我们可以以 GRAKN 为基础构建知识图谱。
        </p>
      </div>

      <!-- title3 -->
      <div class="section section3">
        <h2 class="title"> 利用人工智能（AI）技术支持的自然语言处理（NLP）技术从专业医学研究文献中实现知识的自动获取，并实现知识库资源的随时更新。</h2>

        <p>我们主要构建了两类 NLP 模型：
           命名实体识别（NER）模型，采用 PubTator 技术
          o 疾病实体的识别 F1分数为 0.782，基因实体的识别 F1 分数为 0.867，变异实体的识别 F1 分数为 0.914。
          <img src="@/assets/more/222.png" alt="">
          从 PubMed 的摘要文字中提取疾病、基因和变异位点之间的关联知识
           关系抽取（RE）模型，采用基于深度神经网络的 BERT 技术
          o 构建了两个 RE 模型，疾病-基因关系模型，和疾病-变异位点关系模型
           例如，在医学研究文献中有如下一句话：
          We found that GeneB is the most frequently mutated gene in DiseaseA, but not GeneC.
          可构建两条训练数据：
            <!-- a. {text: "We found that << geneB>> is the most frequently mutated gene in [[ diseaseA ]], but not geneC.", -->
            label: "is associated with"}
            <!-- b. {text: "We found that geneB is the most frequently mutated gene in [[ diseaseA ]], but not << geneC>>.", -->
              label: "is not associated with"}
               两位经验丰富的生物信息工程师，经过交叉验证，完成训练数据集的构建，包含 1472 条数据。
              <el-table :data="section3" border style="width: 100%">
                <el-table-column prop="title" label="" width="180">
                </el-table-column>
                <el-table-column prop="Accuracy" label="Accuracy" width="180">
                </el-table-column>
                <el-table-column prop="F1Score" label="F1Score">
                </el-table-column>
              </el-table>

               对神经网络的框架和参数进行了优化，调整 regularization term，克服 overfitting 问题。
               在 PubMed 的文献摘要中测试，平均每 6 个摘要可以抽取一条疾病-基因的关系，每 120 个摘要可以抽取一条疾病-变异位点的关系。

        </p>
      </div>

      <!-- title4 -->
      <div class="section section4">
        <h2 class="title"> 开发完成基于机器学习模型的集成化变异位点致病性打分机制</h2>

        <p>
          近年来，有很多生物信息团队开发了对变异位点的致病性进行打分的工具。被广泛应用的有大约 8 个。
           依据：
          o 对变异导致的氨基酸水平变化进行预测，
          o 对变异所在位点在接近物种基因组上的保守性进行分析。
           这些工具打分尺度不统一，打分结果常有冲突，未经独立验证，显示可靠性有局限。
          <el-table :data="section4" border style="width: 100%">
            <el-table-column prop="title" label="致病性打分工具" width="180">
            </el-table-column>
            <el-table-column prop="content" label="打分和功能评价机制" width="180">
            </el-table-column>
          </el-table>
           我们对这 8 个工具的打分可靠性进行的独立评估，并使用机器学习算法构建了 meta-prediction 模型。
          o 从 OMIM 数据库中抽取已知的致病变异，作为正数据集，
          o 从 gnomeAD 数据库中抽取 OMIM 中未记载的，在全部人群中 MAF > 0.2 的变异，作为负数据集，
          <el-table :data="section40" border style="width: 100%">
            <el-table-column prop="CHROM" label="CHROM" width="180">
            </el-table-column>
            <el-table-column prop="POS" label="POS" width="180">
            </el-table-column>
            <el-table-column prop="ID" label="ID" width="180">
            </el-table-column>
            <el-table-column prop="REF" label="REF" width="180">
            </el-table-column>
            <el-table-column prop="ALT" label="ALT" width="180">
            </el-table-column>
            <el-table-column prop="GeneName" label="Gene Name" width="180">
            </el-table-column>
            <el-table-column prop="SIFT" label="SIFT" width="180">
            </el-table-column>
            <el-table-column prop="Polyphen2HDIV" label="Polyphen2  HDIV" width="180">
            </el-table-column>
            <el-table-column prop="Polyphen2HVAR" label="Polyphen2 HVAR" width="180">
            </el-table-column>
            <el-table-column prop="LRT" label="LRT" width="180">
            </el-table-column>
            <el-table-column prop="MutationTaster" label="Mutation Taster" width="180">
            </el-table-column>
            <el-table-column prop="MutationAssessor" label="Mutation Assessor" width="180">
            </el-table-column>
            <el-table-column prop="FATHMM" label="FATHMM" width="180">
            </el-table-column>
            <el-table-column prop="PROVEAN" label="PROVEAN" width="180">
            </el-table-column>
          </el-table>

          o 尝试了多种线性和非线性 meta-prediction 算法，最后选用支持向量机 (SVM），RBF kernel
          o 现有 8 个打分工具打分的正确率在 44% 和 66.5% 之间，缺失率在 30.7% 和 44.6% 之间。
          <el-table :data="section400" border style="width: 100%">
            <el-table-column prop="title" label="致病性打分工具" width="180">
            </el-table-column>
            <el-table-column prop="Accuracy" label="正确率" width="180">
            </el-table-column>
            <el-table-column prop="errorRate" label="错误率" width="180">
            </el-table-column>
            <el-table-column prop="MissingRate" label="缺失率" width="180">
            </el-table-column>
          </el-table>
          o 我们开发的基于 SVM 的工具取得正确率 92%，没有缺失。
        </p>
      </div>

    </div>
    <!-- vFooter -->
    <vFooter />
  </div>
</template>

<script>
import vHeader from '@/components/common/vHeader'
import vFooter from '@/components/common/vFooter'

export default {
  name: 'Home',
  components: {
    vHeader,
    vFooter
  },
  data() {
    return {
      section1: [
        {
          name: 'ClinVar',
          type: '变异+疾病',
          sketch: '变异和人类健康之间的关联关系',
          language: '英文'
        }
      ],
      section3: [
        {
          title: "Training Data ",
          Accuracy: '0.992',
          F1Score: '0.991 '
        }
      ],
      section4: [
        {
          title: "SIFT ",
          content: 'D: Deleterious (<=0.05), T: Tolerated (>0.05)'
        }
      ]
      ,
      section40: [
        {
          CHROM: "1",
          POS: '55136529',
          ID: 'rs480963',
          REF: 'T',
          ALT: 'C',
          GeneName: 'MROH7',
          SIFT: '0.153,T',
          Polyphen2HDIV: '0.999,D',
          Polyphen2HVAR: '0.962,D',
          LRT: '0.010,N',
          MutationTaster: '0.925,P',
          MutationAssessor: '1.79,L',
          FATHMM: '3.42,T',
          PROVEAN: '1.76,N'
        }
      ],
      section400: [
        {
          title: "SIFT",
          Accuracy: '0.491',
          errorRate: '0.097',
          MissingRate: '0.412 '
        }
      ]
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
}
</style>
