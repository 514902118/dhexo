(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"0f03":function(e,t,s){},1597:function(e,t,s){},"21c1":function(e,t,s){"use strict";s("1597")},"3e53":function(e,t,s){"use strict";s("0f03")},"62ef":function(e,t,s){e.exports=s.p+"img/home-01.c7d35aea.png"},8468:function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",[e._m(0),s("div",{staticClass:"no-login"},[s("span",[e._v(e._s(e.title))]),s("div",{staticClass:"link-box"},[!e.showUserBox&&"patientsInterpretation"===e.$route.name||"Sms"===e.$route.name||"Xmz"===e.$route.name?s("router-link",{attrs:{to:{name:"geneticInterpretation"},tag:"span"}},[s("i",{staticClass:"el-icon-d-arrow-left"}),e._v("返回上一页")]):e._e(),e.showUserBox?e._e():s("router-link",{attrs:{to:{name:"home"},tag:"span"}},[s("i",{staticClass:"el-icon-d-arrow-left"}),e._v("返回首页")])],1),e.showUserBox?s("span",{staticClass:"user-box",staticStyle:{"text-align":"center"}},[s("UserBox")],1):e._e()])])},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"logo"},[r("img",{attrs:{src:s("cf05"),alt:""}})])}],o=(s("b0c0"),s("d610")),i={components:{UserBox:o["a"]},data:function(){return{title:"",showUserBox:!1}},methods:{getTitle:function(){var e=this.$route.name;switch(e){case"forgot":this.title="忘记密码";break;case"favorite":this.title="收藏夹",this.showUserBox=!0;break;case"personal":this.title="个人信息";break;case"patientsInfo":this.title="患者信息",this.showUserBox=!0;break;case"patientsInterpretation":this.title="解读结果";break;case"patientsReport":this.title="解析结果下载";break;default:this.title="欢迎使用";break}}},mounted:function(){this.getTitle()}},n=i,l=(s("21c1"),s("2877")),c=Object(l["a"])(n,r,a,!1,null,"39bba609",null);t["a"]=c.exports},b0c0:function(e,t,s){var r=s("83ab"),a=s("9bf2").f,o=Function.prototype,i=o.toString,n=/^\s*function ([^ (]*)/,l="name";r&&!(l in o)&&a(o,l,{configurable:!0,get:function(){try{return i.call(this).match(n)[1]}catch(e){return""}}})},c58e:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("vLoginHeader"),s("div",{staticClass:"main"},[s("div",{staticClass:"box"},[e._m(0),s("div",{staticClass:"right"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!e.showRegBox,expression:"!showRegBox"}],staticClass:"login-box"},[s("p",{staticClass:"title"},[e._v("账号登录")]),s("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{rules:e.loginRules,model:e.loginForm}},[s("el-form-item",{attrs:{label:"",prop:"userName"}},[s("el-input",{staticClass:"elinput",attrs:{placeholder:"请输入账号",readonly:"",onfocus:"this.removeAttribute('readonly');",onblur:"this.setAttribute('readonly',true);"},model:{value:e.loginForm.userName,callback:function(t){e.$set(e.loginForm,"userName",t)},expression:"loginForm.userName"}},[s("i",{staticClass:"el-icon-user el-input__icon",attrs:{slot:"prefix"},slot:"prefix"})])],1),s("el-form-item",{attrs:{label:"",prop:"password"}},[s("el-input",{staticClass:"elinput",attrs:{type:"password",placeholder:"请输入密码"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.login(t)}},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}},[s("i",{staticClass:"el-input__icon el-icon-lock",attrs:{slot:"prefix"},slot:"prefix"})])],1),s("el-form-item",{staticClass:"forgot-form-item"},[s("p",{staticClass:"forgot"},[s("router-link",{attrs:{to:{name:"forgot"},tag:"span"}},[e._v("忘记密码")])],1)]),s("el-form-item",[s("div",{staticClass:"elbtn",on:{click:e.login}},[e._v("登录")])])],1),s("div",{staticClass:"bottom"},[s("p",{on:{click:function(t){e.showRegBox=!0}}},[e._v("没有账号/密码，立即注册")])])],1),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showRegBox,expression:"showRegBox"}],staticClass:"reg-box"},[s("p",{staticClass:"title"},[e._v("账号注册"),s("i",{staticClass:"el-icon-d-arrow-left",on:{click:function(t){e.showRegBox=!1}}})]),s("el-form",{ref:"regForm",staticClass:"reg-form",attrs:{rules:e.regRules,model:e.regForm}},[s("el-form-item",{attrs:{label:"",prop:"userName"}},[s("el-input",{staticClass:"elinput",attrs:{placeholder:"请输入账号,6-16位英文数字",readonly:"",onfocus:"this.removeAttribute('readonly');",onblur:"this.setAttribute('readonly',true);"},model:{value:e.regForm.userName,callback:function(t){e.$set(e.regForm,"userName",t)},expression:"regForm.userName"}},[s("i",{staticClass:"el-icon-user el-input__icon",attrs:{slot:"prefix"},slot:"prefix"})])],1),s("el-form-item",{attrs:{label:"",prop:"password"}},[s("el-input",{staticClass:"elinput",attrs:{type:"password",placeholder:"请输入密码,6-16位英文数字"},model:{value:e.regForm.password,callback:function(t){e.$set(e.regForm,"password",t)},expression:"regForm.password"}},[s("i",{staticClass:"el-input__icon el-icon-lock",attrs:{slot:"prefix"},slot:"prefix"})])],1),s("el-form-item",{attrs:{label:"",prop:"againPassword"}},[s("el-input",{staticClass:"elinput",attrs:{type:"password",placeholder:"再次输入密码"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.register(t)}},model:{value:e.regForm.againPassword,callback:function(t){e.$set(e.regForm,"againPassword",t)},expression:"regForm.againPassword"}})],1),s("el-form-item",{staticClass:"elformitem1",staticStyle:{"margin-right":"4%"},attrs:{label:"",prop:"hospital"}},[s("el-input",{staticClass:"elinput",attrs:{placeholder:"请输入医院"},model:{value:e.regForm.hospital,callback:function(t){e.$set(e.regForm,"hospital",t)},expression:"regForm.hospital"}})],1),s("el-form-item",{staticClass:"elformitem1",attrs:{label:"",prop:"title"}},[s("el-input",{staticClass:"elinput",attrs:{placeholder:"请输入职称"},model:{value:e.regForm.title,callback:function(t){e.$set(e.regForm,"title",t)},expression:"regForm.title"}})],1),s("el-form-item",{attrs:{prop:"email"}},[s("el-input",{staticClass:"elinput elinput3",attrs:{placeholder:"请输入邮箱"},model:{value:e.regForm.email,callback:function(t){e.$set(e.regForm,"email",t)},expression:"regForm.email"}},[s("i",{staticClass:"el-input__icon el-icon-message",attrs:{slot:"prefix"},slot:"prefix"}),s("span",{staticClass:"elinput3-append",attrs:{slot:"append"},on:{click:e.sendCaptcha},slot:"append"},[e._v(e._s(e.countTxt))])])],1),s("el-form-item",{attrs:{prop:"verificationCode"}},[s("el-input",{staticClass:"elinput",attrs:{placeholder:"请输入邮箱验证码"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.register(t)}},model:{value:e.regForm.verificationCode,callback:function(t){e.$set(e.regForm,"verificationCode",t)},expression:"regForm.verificationCode"}},[s("i",{staticClass:"iconfont icon-yanzhengma el-input__icon",attrs:{slot:"prefix"},slot:"prefix"})])],1),s("el-form-item",[s("div",{staticClass:"elbtn",on:{click:e.register}},[e._v("立即注册")])])],1)],1)])])]),s("vFooter")],1)},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"left"},[r("div",{staticClass:"aside"},[r("h4",[r("img",{attrs:{src:s("5fbe"),alt:""}})]),r("p",[e._v("WES遗传病全自动解读系统")]),r("img",{attrs:{src:s("62ef"),alt:"",ondragstart:"return false"}})])])}],o=s("8468"),i=s("1c91"),n={components:{vLoginHeader:o["a"],vFooter:i["a"]},data:function(){var e=this,t=function(e,t,s){var r=/[0-9A-Za-z]{6,16}$/;return""===t?s(new Error("请输入账号")):t.length<6||t.length>16||!r.test(t)?s(new Error("请输入6-16位英文数字")):void s()},s=function(e,t,s){var r=/[0-9A-Za-z]{6,16}$/;return""===t?s(new Error("请输入密码")):t.length<6||t.length>16||!r.test(t)?s(new Error("请输入6-16位英文数字")):void s()},r=function(t,s,r){return""===s?r(new Error("请再次输入密码")):s!==e.regForm.password?r(new Error("请输入正确的密码")):void r()};return{showRegBox:!1,loginForm:{userName:"",password:""},loginRules:{userName:[{validator:t,trigger:"change"}],password:[{validator:s,trigger:"change"}]},regForm:{userName:"",password:"",againPassword:"",hospital:"",title:"",email:"",verificationCode:""},regRules:{userName:[{validator:t,trigger:"change"}],password:[{validator:s,trigger:"change"}],againPassword:[{validator:r,trigger:"change"}],hospital:[{required:!0,message:"请输入医院",trigger:"change"}],title:[{required:!0,message:"请输入职称",trigger:"change"}],email:[{required:!0,message:"请输入邮箱",trigger:"change"}],verificationCode:[{required:!0,message:"请输入邮箱验证码",trigger:"change"}]},countTxt:"验证"}},methods:{login:function(){var e=this;this.$refs["loginForm"].validate((function(t){t&&e.$post(e.$Url.account.login,{userName:e.loginForm.userName,password:e.loginForm.password}).then((function(t){if(200===t.status){var s=t.data;Cookies.set("token",s),e.$router.push({name:"home"})}else e.$message({type:"error",duration:2e3,message:t.msg})})).catch((function(e){}))}))},register:function(){var e=this;this.$refs["regForm"].validate((function(t){t&&e.$post(e.$Url.account.reg,{userName:e.regForm.userName,password:e.regForm.password,againPassword:e.regForm.againPassword,hospital:e.regForm.hospital,title:e.regForm.title,email:e.regForm.email,verificationCode:e.regForm.verificationCode}).then((function(t){200===t.status?(e.$message({type:"success",duration:2e3,message:"注册成功"}),e.showRegBox=!1):e.$message({type:"error",duration:2e3,message:t.msg})})).catch((function(e){}))}))},sendCaptcha:function(){var e=this;""!==this.regForm.email?"验证"===this.countTxt&&this.$post(this.$Url.account.sendCaptcha,{email:this.regForm.email,mailType:"REGISTERED"}).then((function(t){if(200!==t.status)e.$message({type:"error",duration:2e3,message:t.msg});else{e.$message({type:"success",duration:2e3,message:"验证码发送成功，请登录邮箱查看"});var s=60;e.countTxt=s+"s";var r=setInterval((function(){if(!(s>0))return clearInterval(r),void(e.countTxt="验证");s--,e.countTxt=s+"s"}),1e3)}})).catch((function(e){})):this.$message({type:"error",duration:2e3,message:"邮箱不能为空"})}},beforeMount:function(){var e=this.$route.query;e&&e.register&&(this.showRegBox=!0)}},l=n,c=(s("3e53"),s("2877")),u=Object(c["a"])(l,r,a,!1,null,"6e119bfd",null);t["default"]=u.exports}}]);
//# sourceMappingURL=login.cc34496c.js.map