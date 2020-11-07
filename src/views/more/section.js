const section1 = [
  {
    name: 'ClinVar',
    type: '变异+疾病',
    sketch: '变异和人类健康之间的关联关系',
    language: '英文'
  }, {
    name: 'dbNSFP',
    type: '变异',
    sketch: '非同义突变的功能预测和注释信息',
    language: '英文'
  }, {
    name: 'dbSNP',
    type: '变异',
    sketch: '1200多万个在外显子区域上的SNP，以及他们所map的gene',
    language: '英文'
  }, {
    name: 'FATHMM',
    type: '变异',
    sketch: '记录了大量变异是否会造成危害的预测结果',
    language: '英文'
  }, {
    name: 'GARD',
    type: '疾病',
    sketch: '6000多种罕见病的详细信息，包括概述、症状和诊断等相关信息',
    language: '英文'
  }, {
    name: 'genomeAD',
    type: '变异',
    sketch: '1200多万个在外显子区域上的SNP的详细信息，包括染色体、位置、ref、alt以及在不同population上的MAF',
    language: '英文'
  }, {
    name: 'GRASP',
    type: '变异+疾病',
    sketch: '记录了7000多条来自GWAS研究的变异与遗传病之间的关联信息',
    language: '英文'
  }, {
    name: 'GWAS catalog',
    type: '变异+疾病',
    sketch: '记录了500多条来自GWAS研究的变异与遗传病之间的关联信息',
    language: '英文'
  }, {
    name: 'HPO',
    type: '症状（表型）+基因',
    sketch: '基因及疾病的概述，以及疾病的各个症状',
    language: '中文+英文'
  }, {
    name: 'Human Gene Mutation Database',
    type: '变异+疾病',
    sketch: '约30万变异和疾病之间的关联关系',
    language: '英文'
  }, {
    name: 'LOVD',
    type: '变异',
    sketch: '约20万变异在多种数据库中的信息整合与收集',
    language: '英文'
  }, {
    name: 'LRT',
    type: '变异',
    sketch: '记录了大量变异是否会造成危害的预测结果',
    language: '英文'
  }, {
    name: 'MitoMAP',
    type: '变异',
    sketch: '线粒体DNA上变异的相关信息',
    language: '英文'
  }, {
    name: 'MutationAssessor',
    type: '变异',
    sketch: '记录了大量变异是否会造成危害的预测结果',
    language: '英文'
  }, {
    name: 'MutationMaster',
    type: '变异',
    sketch: '记录了大量变异是否会造成危害的预测结果',
    language: '英文'
  }, {
    name: 'NCBI PubMed abstract',
    type: '变异+疾病+基因',
    sketch: '通过NLP处理后提取变异、基因、疾病三者之间的关联关系',
    language: '英文'
  }, {
    name: 'NCBI RefSeq',
    type: '基因',
    sketch: '16000多个OMIM上基因的基本信息，包括位点、染色体和坐标等',
    language: '英文'
  }, {
    name: 'OMIM',
    type: '变异+疾病',
    sketch: '9000多种孟德尔遗传病以及16000多个基因的详细信息，包括概述，疾病与基因、变异的关联等诊断相关的信息',
    language: '英文'
  }, {
    name: 'ORPHANET',
    type: '疾病',
    sketch: '9000多种疾病的详细信息，包括概述和诊断等相关信息',
    language: '英文'
  }, {
    name: 'PGG',
    type: '变异',
    sketch: '变异	1200多万个在外显子区域上的SNP的详细信息，包括染色体、位置、ref、alt以及在不同population上的MAF',
    language: '英文'
  }, {
    name: 'PolyPhen2',
    type: '变异',
    sketch: '记录了大量变异是否会造成危害的预测结果',
    language: '英文'
  }, {
    name: 'PROVEAN',
    type: '变异',
    sketch: '记录了大量变异是否会造成危害的预测结果',
    language: '英文'
  }, {
    name: 'SIFT',
    type: '变异',
    sketch: '记录了大量变异是否会造成危害的预测结果',
    language: '英文'
  }, {
    name: 'Uniprot',
    type: '蛋白',
    sketch: '几乎所有蛋白质及其功能等相关信息',
    language: '英文'
  },
]

const section3 = [
  {
    title: "Training Data ",
    Accuracy: '0.992 ',
    F1Score: '0.991 '
  },
  {
    title: "Development Data",
    Accuracy: '0.795',
    F1Score: '0.787 '
  }, {
    title: "Testing Data ",
    Accuracy: '0.75 ',
    F1Score: '0.749 '
  }
]

const section4 = [
  {
    title: "SIFT",
    content: 'D: Deleterious (<=0.05), T: Tolerated (>0.05) '
  },
  {
    title: "PolyPhen2 HDIV",
    content: 'D: Probably damaging (>=0.957), P: Possibly damaging (between 0.453 and 0.956), B: benign (<0.452) '
  },
  {
    title: "PolyPhen2 Hvar",
    content: 'D: Probably damaging (>=0.909), P: Possibly damaging (between 0.447 and 0.909), B: benign (<0.446) '
  },
  {
    title: "LRT",
    content: 'D: Deleterious, N: Neutral, U: Unknown '
  },
  {
    title: "MutationTaster",
    content: 'A: Disease causing automatic, D: Disease causing, N: Polymorphism, P: Polymorphism automatic'
  },
  {
    title: "MutationAssessor",
    content: 'H: Highly functional, M: Medium functional, L: Low function, N: Neutral or non-functional '
  },
  {
    title: "FATHMM",
    content: 'D: Deleterious, T: Tolerated '
  },
  {
    title: "PROVEN",
    content: 'D: Deleterious, N: Neutral '
  },
]

const section40 = [
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
    PROVEAN: '-1.76,N'
  },
  {
    CHROM: "1",
    POS: '76363680',
    ID: 'rs142644407',
    REF: 'A',
    ALT: 'G',
    GeneName: 'MSH4',
    SIFT: '0.005,D',
    Polyphen2HDIV: '0.298,B',
    Polyphen2HVAR: '0.175,B',
    LRT: '0.000,D',
    MutationTaster: '1.000,D',
    MutationAssessor: '0.915,L',
    FATHMM: '-1.96,D',
    PROVEAN: '-2.08,N'
  },{
    CHROM: "1",
    POS: '94564483',
    ID: 'rs6657239',
    REF: 'C',
    ALT: 'T',
    GeneName: 'ABCA4',
    SIFT: '0.061,T',
    Polyphen2HDIV: '1.0,D',
    Polyphen2HVAR: '0.977,D',
    LRT: '0.000,D',
    MutationTaster: '0.002,P',
    MutationAssessor: '2.395,M',
    FATHMM: '-2.79,D',
    PROVEAN: '-2.18,N'
  },{
    CHROM: "1",
    POS: '1.14E+08',
    ID: '',
    REF: 'A',
    ALT: 'G',
    GeneName: 'LRIG2',
    SIFT: '0.001,D',
    Polyphen2HDIV: '0.984,D',
    Polyphen2HVAR: '0.958,D',
    LRT: '0.000,D',
    MutationTaster: '1.000,D',
    MutationAssessor: '-0.13,N',
    FATHMM: '-0.19,T',
    PROVEAN: '-6.87,D'
  },{
    CHROM: "1",
    POS: '86557967',
    ID: 'rs11161732',
    REF: 'G',
    ALT: 'A',
    GeneName: 'COL24A1',
    SIFT: '0.017,D',
    Polyphen2HDIV: '0.005,B',
    Polyphen2HVAR: '0.01,B',
    LRT: '0.045,N',
    MutationTaster: '1.000,P',
    MutationAssessor: '-0.345,N',
    FATHMM: '-3.21,D',
    PROVEAN: '1.12,N'
  },{
    CHROM: "1",
    POS: '1.57E+08',
    ID: 'rs11264498',
    REF: 'C',
    ALT: 'G',
    GeneName: 'IQGAP3',
    SIFT: '0.004,D',
    Polyphen2HDIV: '0.994,D',
    Polyphen2HVAR: '0.97,D',
    LRT: '0.000,D',
    MutationTaster: '0.000,P',
    MutationAssessor: '1.805,L',
    FATHMM: '2.62,T',
    PROVEAN: '-2.44,N'
  },{
    CHROM: "1",
    POS: '1.17E+08',
    ID: 'rs138851517',
    REF: 'A',
    ALT: 'G',
    GeneName: 'IGSF3',
    SIFT: '0.003,D',
    Polyphen2HDIV: '0.3,B',
    Polyphen2HVAR: '0.164,B',
    LRT: '0.000,D',
    MutationTaster: '1.000,D',
    MutationAssessor: '0.55,N',
    FATHMM: '2.44,T',
    PROVEAN: '-3.31,D'
  },
]

const section400 = [
  {
    title: "SIFT",
    Accuracy: '0.491 ',
    errorRate: '0.097 ',
    MissingRate: '0.412 '
  },
  {
    title: "Polyphen2_HDIV ",
    Accuracy: '0.475 ',
    errorRate: '0.065 ',
    MissingRate: '0.459 '
  },
  {
    title: "Polyphen2_HVAR ",
    Accuracy: '0.457 ',
    errorRate: '0.079',
    MissingRate: '0.464 '
  },
  {
    title: "LRT",
    Accuracy: '0.52 ',
    errorRate: '0.094 ',
    MissingRate: '0.386'
  },
  {
    title: "MutationTaster ",
    Accuracy: '0.665 ',
    errorRate: '0.028 ',
    MissingRate: '0.307'
  },
  {
    title: "MutationAssessor",
    Accuracy: '0.451 ',
    errorRate: '0.088 ',
    MissingRate: '0.46 '
  },
  {
    title: "FATHMM ",
    Accuracy: '0.44 ',
    errorRate: '0.148 ',
    MissingRate: '0.412 '
  },
  {
    title: "PROVEAN ",
    Accuracy: '0.469 ',
    errorRate: '0.128',
    MissingRate: '0.403'
  },
  {
    title: "DHPredSVM ",
    Accuracy: '0.92 ',
    errorRate: '0.128 ',
    MissingRate: '0'
  }
]

const section5 = [
  {
    SNPID: 'rs1799969',
    Chromosome: '19',
    Position: '10284116',
    ReferenceBase: 'G',
    AlternativeBase: 'A',
    OverallMAF: '9%',
    MAFAmongEastAsians: '0.03%',
    DiseaseImplicated: 'ALZHEIMER DISEASE'
  },
  {
    SNPID: 'rs17688567',
    Chromosome: '12',
    Position: '30753424',
    ReferenceBase: 'G',
    AlternativeBase: 'A',
    OverallMAF: '5%',
    MAFAmongEastAsians: '0.06%',
    DiseaseImplicated: 'BREAST CANCER'
  },
  {
    SNPID: 'rs827528',
    Chromosome: '8',
    Position: '103300204',
    ReferenceBase: 'A',
    AlternativeBase: 'G',
    OverallMAF: '23%',
    MAFAmongEastAsians: '0.9%',
    DiseaseImplicated: 'CREUTZFELDT-JAKOB DISEASE'
  },
]

const section50 = [
  {
    MAF:'MAF<0.01',
    EastAsian:'15.60%',
    African:'7.00%',
    Ashkenazi:'10.20%',
    Non:'8.10%',
    Other:'7.70%',
    South:'8.20%',
    Finnish:'8.50%'
  },
  {
    MAF:'MAF<0.05',
    EastAsian:'23.30%',
    African:'10.10%',
    Ashkenazi:'15.40%',
    Non:'10.80%',
    Other:'10.50%',
    South:'11.50%',
    Finnish:'12.70%'
  },
  {
    MAF:'MAF<0.1',
    EastAsian:'29.40%',
    African:'18.80%',
    Ashkenazi:'21.60%',
    Non:'16.90%',
    Other:'15.10%',
    South:'20.20%',
    Finnish:'16.70%'
  }
]

export {
  section1,
  section3,
  section4,
  section40,
  section400,
  section5,
  section50
}