"use strict";
const debug = process.env.NODE_ENV !== 'production'
let base = debug ? '/api/' : '/'


// companyes/aggs/patent/analysis
const URL = {
  base: base,
  account: {
    login: base + 'mtApi/user/login', // 登录
    reg: base + 'mtApi/user/registered', // 注册
    sendCaptcha: base + 'mtApi/send/captcha', // 发送邮箱验证码
    forgetPassword: base + 'mtApi/user/forgetPassword', // 忘记密码
    updatePassword: base + 'mtApi/user/updatePassword', // 修改密码
    userInfo: base + 'mtApi/user/userInfo', // 查询用户信息
    updateUser: base + 'mtApi/user/updateUser', // 修改用户信息
    upload: base + 'mtApi/file/upload', // 图片上传
    showImg: base + 'mtApi/file/show', // 图片展示
    processCount: base + 'mtApi/vcf/processCount', // 任务总计
    addPatient: base + 'mtApi/patient/add', // 新建患者
    deletePatient: base + 'mtApi/patient/delete', // 删除患者
    patientList: base + 'mtApi/patient/list', // 患者列表
    patientUpdate: base + 'mtApi/patient/update', // 修改患者信息
  },
  vcf: {
    querySymptomType: base + 'mtApi/symptom/queryType', // 获取症状类型
    querySymptom: base + 'mtApi/symptom/query', // 获取症状
    upload: base + 'mtApi/vcf/upload', // 上传vcf
    detail: base + 'mtApi/vcf/detail', // 查看vcf
    delete: base + 'mtApi/vcf/delete', // 删除vcf
  },
  query: {
    diseaseInfoByName: base + 'mtApi/diseaseInfoByName', // 根据疾病name(英文)查询疾病的详细信息
    diseaseInformation: base + 'mtApi/diseaseInformation', // 根据疾病id查询疾病的详细信息
    byDiseaseName: base + 'mtApi/symptom/byDiseaseName', // 模糊查询疾病名称
    genebySymbol: base + 'mtApi/gene/bySymbol', // 基因控制器-通过基因symbol获取基因详细信息
    genebyOmId: base + 'mtApi/gene/byOmId', // 基因控制器-通过基因OMIM id获取基因详细信息
    genebyEntrezId: base + 'mtApi/gene/byEntrezId', // 基因控制器-通过基因entrez id获取基因详细信息
    variationbyRsId: base + 'mtApi/variation/byRsId', // 变异查询
    diseaseName: base + 'mtApi/variation/diseaseName', // 通过变异ID查询疾病名称
    symptomQueryType: base + 'mtApi/symptom/queryType', // 症状查询-查询症状类型
    symptomQuery: base + 'mtApi/symptom/query', // 症状查询-查询症状
    byDisease: base + 'mtApi/symptom/byDisease', // 症状查询-根据多个症状查询对应的疾病列表
    querySymptom: base + 'mtApi/symptom/querySymptom', // 模糊查询症状
    literature:base + 'mtApi/literature/byId'// 查询文献接口
  },
  collect: {
    // type值 0：疾病 1：基因 2：变异
    add: base + 'mtApi/collect/add', // 添加收藏
    update: base + "mtApi/collect/update", // 编辑收藏
    delete: base + 'mtApi/collect/delete', // 删除收藏
    list: base + 'mtApi/collect/list', // 用户收藏信息
  },
  pdf: {
    export: base + 'mtApi/vcf/export', // pdf下载 
  },
  message: {
    leaveMessage: base + 'mtApi/add/leaveMessage', // 留言
  }
}

module.exports = URL;
