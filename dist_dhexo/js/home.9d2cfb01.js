(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"0ab7":function(t,e,a){t.exports=a.p+"img/home-07.e4d913e2.png"},"437c":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",[t._m(0),a("div",{staticClass:"no-login"},[a("nav",{staticClass:"nav"},[a("router-link",{class:{active:"home"===t.$route.name||"geneticInterpretation"===t.$route.name},attrs:{to:{name:"geneticInterpretation"},tag:"span"}},[t._v("遗传病解读")]),a("span",{staticClass:"query",class:{active:"diseaseQuery"===t.$route.name||"genesQuery"===t.$route.name||"variationQuery"===t.$route.name||"symptomsQuery"===t.$route.name}},[t._v("查询 "),a("ul",{staticClass:"query-list"},[a("router-link",{attrs:{to:{name:"diseaseQuery"},tag:"li"}},[t._v("疾病查询")]),a("router-link",{attrs:{to:{name:"genesQuery"},tag:"li"}},[t._v("基因查询")]),a("router-link",{attrs:{to:{name:"variationQuery"},tag:"li"}},[t._v("变异查询")]),a("router-link",{attrs:{to:{name:"symptomsQuery"},tag:"li"}},[t._v("症状查询")])],1)]),a("router-link",{attrs:{to:{name:"home"},tag:"span"}},[t._v("关于我们")])],1),t.isLogin?t._e():a("div",{staticClass:"tools"},[a("router-link",{attrs:{to:{name:"login"},tag:"span"}},[t._v("登录")]),a("i",[t._v("/")]),a("router-link",{attrs:{to:{name:"login",query:{register:!0}},tag:"span"}},[t._v("注册")])],1),t.isLogin?a("UserBox"):t._e()],1)])},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"logo"},[s("img",{attrs:{src:a("cf05"),alt:""}})])}],i=a("d610"),n={components:{UserBox:i["a"]},data:function(){return{isLogin:!!Cookies.get("token")}},methods:{},mounted:function(){}},o=n,c=(a("5427"),a("2877")),l=Object(c["a"])(o,s,r,!1,null,"d38825dc",null);e["a"]=l.exports},5427:function(t,e,a){"use strict";a("a228")},"5e1d":function(t,e,a){t.exports=a.p+"img/home-02.a3b7f3ff.png"},6251:function(t,e,a){"use strict";a("e770")},"62ef":function(t,e,a){t.exports=a.p+"img/home-01.c7d35aea.png"},6555:function(t,e,a){t.exports=a.p+"img/home-04.082c4d84.png"},"937a":function(t,e,a){t.exports=a.p+"img/home-03.a4f268da.png"},"990f":function(t,e,a){t.exports=a.p+"img/home-05.300869d7.png"},a228:function(t,e,a){},b278:function(t,e,a){t.exports=a.p+"img/home-06.bcf6ad79.png"},bb51:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("vHeader"),s("div",{staticClass:"banner"}),s("div",{staticClass:"container"},[s("div",{staticClass:"one"},[s("div",{staticClass:"left"},[s("div",{staticClass:"info"},[s("h4",[t._v("遗传病解读")]),t._m(0),s("router-link",{staticClass:"more-btn",attrs:{tag:"div",to:{path:"/more?#section1"}}},[t._v("了解更多")])],1)]),t._m(1)]),s("div",{staticClass:"two"},[t._m(2),s("div",{staticClass:"right"},[s("div",{staticClass:"info"},[s("h4",[t._v("最完整的知识数据库")]),s("div",{staticClass:"rect"},[s("p",[t._v(" 构建了业内最完整的疾病-症状（表型）-基因-变异位点知识库，底层以 GRAKN 图数据库技术做支撑。 ")]),s("router-link",{staticClass:"more-btn",attrs:{tag:"div",to:{path:"/more?#section2"}}},[t._v("了解更多")])],1)])])]),s("div",{staticClass:"three"},[s("div",{staticClass:"left"},[s("div",{staticClass:"rect-outer"},[s("div",{staticClass:"rect-inner"},[s("h4",[t._v("医学研究文献及时同步")]),s("div",[s("p",[t._v(" 利用人工智能（AI）技术支持的自然语言处理（NLP）技术从专业医学研究文献中实现知识的自动获取，并实现知识库资源的随时更新。 ")]),s("router-link",{staticClass:"more-btn",attrs:{tag:"div",to:{path:"/more?#section3"}}},[t._v("了解更多")])],1)])])]),t._m(3)]),s("div",{staticClass:"four"},[s("div",{staticClass:"left"},[s("div",{staticClass:"elcarousel"},[s("el-carousel",{ref:"carousel",attrs:{height:"500",autoplay:!1,arrow:"never","indicator-position":"outside"},on:{change:t.handleChange}},[s("el-carousel-item",[s("img",{staticClass:"img",attrs:{src:a("6555"),alt:"",ondragstart:"return false"}})]),s("el-carousel-item",[s("img",{staticClass:"img",attrs:{src:a("990f"),alt:"",ondragstart:"return false"}})]),s("el-carousel-item",[s("img",{staticClass:"img",attrs:{src:a("b278"),alt:"",ondragstart:"return false"}})]),s("el-carousel-item",[s("img",{staticClass:"img",attrs:{src:a("0ab7"),alt:"",ondragstart:"return false"}})])],1)],1)]),s("div",{staticClass:"right"},[s("div",{staticClass:"rect"},[s("ul",{staticClass:"list"},[s("li",{class:{active:0===this.activeIndex},on:{mouseenter:function(e){return t.handleEnter(0)}}},[s("router-link",{attrs:{tag:"p",to:{path:"/more?#section4"}}},[t._v("开发完成基于机器学习模型的集成化变异位点致病性打分机制")])],1),s("li",{class:{active:1===this.activeIndex},on:{mouseenter:function(e){return t.handleEnter(1)}}},[s("router-link",{attrs:{tag:"p",to:{path:"/more?#section5"}}},[t._v("采用精准的种群特异性的次等位基因频率（MAF）对变异位点评估")])],1),s("li",{class:{active:2===this.activeIndex},on:{mouseenter:function(e){return t.handleEnter(2)}}},[s("router-link",{attrs:{tag:"p",to:{path:"/more?#section6"}}},[t._v("实现由知识图谱技术支持的报告智能展示")])],1),s("li",{class:{active:3===this.activeIndex},on:{mouseenter:function(e){return t.handleEnter(3)}}},[s("router-link",{attrs:{tag:"p",to:{path:"/more?#section7"}}},[t._v("使用可拓展性的前沿前端和后端技术")])],1)])])])])]),s("vFooter")],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[t._v(" 成功开发出“全外”人工智能解读引"),a("br"),t._v("擎实现遗传病“全外”数据全自动智"),a("br"),t._v("能解读，为业界唯一。 ")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"right"},[s("div",{staticClass:"rect"}),s("img",{attrs:{src:a("62ef"),alt:"",ondragstart:"return false"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"left"},[s("img",{attrs:{src:a("5e1d"),alt:"",ondragstart:"return false"}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"right"},[s("img",{attrs:{src:a("937a"),alt:"",ondragstart:"return false"}})])}],i=a("437c"),n=a("1c91"),o={name:"Home",components:{vHeader:i["a"],vFooter:n["a"]},data:function(){return{activeIndex:0}},methods:{handleEnter:function(t){this.activeIndex=t,this.$refs.carousel.setActiveItem(t)},handleChange:function(t){this.activeIndex=t}}},c=o,l=(a("6251"),a("2877")),u=Object(l["a"])(c,s,r,!1,null,"5647693d",null);e["default"]=u.exports},e770:function(t,e,a){}}]);
//# sourceMappingURL=home.9d2cfb01.js.map