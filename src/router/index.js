import Vue from 'vue'
import VueRouter from 'vue-router'

// 重写vue-router的push方法，避免冗余导航到当前位置，err给屏蔽了
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/account/Login.vue')
  },
  // 查询
  {
    path: '/query',
    name: 'queryIndex',
    redirect: '/query/disease',
    component: () => import(/* webpackChunkName: "queryIndex" */ '../views/query/Index.vue'),
    children: [
      // 查找遗传病
      {
        path: 'disease',
        name: 'diseaseQuery',
        component: () => import(/* webpackChunkName: "diseaseQuery" */ '../views/query/DiseaseQuery.vue')
      },
      // 基因查询
      {
        path: 'genes',
        name: 'genesQuery',
        component: () => import(/* webpackChunkName: "genesQuery" */ '../views/query/GenesQuery.vue')
      },
      // 变异查询
      {
        path: 'variation',
        name: 'variationQuery',
        component: () => import(/* webpackChunkName: "variationQuery" */ '../views/query/VariationQuery.vue')
      },
      // 症状查询
      {
        path: 'symptoms',
        name: 'symptomsQuery',
        component: () => import(/* webpackChunkName: "symptomsQuery" */ '../views/query/SymptomsQuery.vue')
      },
    ]
  },
  // 修改密码
  {
    path: '/changePassword',
    name: 'changePassword',
    component: () => import(/* webpackChunkName: "changePassword" */ '../views/account/ChangePassword.vue')
  },
  // 忘记密码
  {
    path: '/forgot',
    name: 'forgot',
    component: () => import(/* webpackChunkName: "forgot" */ '../views/account/ForgotPassword.vue')
  },
  // 遗传病解读
  {
    path: '/geneticInterpretation',
    name: 'geneticInterpretation',
    component: () => import(/* webpackChunkName: "geneticInterpretation" */ '../views/GeneticInterpretation.vue')
  },
  // 患者管理
  {
    path: '/patients',
    name: 'patients',
    redirect: '/patients/info',
    component: () => import(/* webpackChunkName: "patients" */ '../views/patients/Index.vue'),
    children: [
      {
        path: 'info',
        name: 'patientsInfo',
        component: () => import(/* webpackChunkName: "patients" */ '../views/patients/Info.vue'),
      },
      // 解读结果
      {
        path: 'interpretation',
        name: 'patientsInterpretation',
        component: () => import(/* webpackChunkName: "patientsInterpretation" */ '../views/patients/Interpretation.vue')
      },
      // 石某世
      {
        path: 'sms',
        name: 'Sms',
        component: () => import(/* webpackChunkName: "patientsInterpretation" */ '../views/patients/sms.vue')
      },
      // 夏某泽
      {
        path: 'xmz',
        name: 'Xmz',
        component: () => import(/* webpackChunkName: "patientsInterpretation" */ '../views/patients/xmz.vue')
      },
      // 全外解读报告
      {
        path: 'report',
        name: 'patientsReport',
        component: () => import(/* webpackChunkName: "patientsReport" */ '../views/patients/Report.vue')
      },
    ]
  },
  // 收藏夹
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import(/* webpackChunkName: "favorite" */ '../views/account/Favorite.vue')
  },
  // 个人信息
  {
    path: '/personal',
    name: 'personal',
    component: () => import(/* webpackChunkName: "personal" */ '../views/account/Personal.vue')
  },
  // 留言
  {
    path: '/leaveMessage',
    name: 'leaveMessage',
    component: () => import(/* webpackChunkName: "leaveMessage" */ '../views/LeaveMessage.vue')
  },

  {
    path: '/more',
    name: 'More',
    component: () => import(/* webpackChunkName: "more" */ '../views/more/index.vue')
  }  ,
  // 404
  {
    path: '*',
    redirect: '/login',
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
