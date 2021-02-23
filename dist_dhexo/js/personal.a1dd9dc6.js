(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["personal","changePassword"],{"078e":function(e,t,a){},"0858":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"eldialog change-dialog",attrs:{title:"修改密码",visible:e.dialogChange,width:"682px","append-to-body":"",center:"","close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogChange=t}}},[a("el-form",{ref:"form",staticClass:"change-form",attrs:{rules:e.rules,model:e.form,"label-width":"200px"}},[a("el-form-item",{attrs:{label:"旧密码：",prop:"primevalPassword"}},[a("el-input",{staticClass:"elinput",attrs:{type:"password",minlength:"6",maxlength:"16",placeholder:"请输入旧密码"},model:{value:e.form.primevalPassword,callback:function(t){e.$set(e.form,"primevalPassword",t)},expression:"form.primevalPassword"}})],1),a("el-form-item",{attrs:{label:"新密码：",prop:"newPassword"}},[a("el-input",{staticClass:"elinput",attrs:{type:"password",minlength:"6",maxlength:"16",placeholder:"请输入新密码"},model:{value:e.form.newPassword,callback:function(t){e.$set(e.form,"newPassword",t)},expression:"form.newPassword"}})],1),a("el-form-item",{attrs:{label:"重复新密码：",prop:"againPassword"}},[a("el-input",{staticClass:"elinput",attrs:{type:"password",minlength:"6",maxlength:"16",placeholder:"请再次输入新密码"},model:{value:e.form.againPassword,callback:function(t){e.$set(e.form,"againPassword",t)},expression:"form.againPassword"}})],1)],1),a("div",{staticClass:"bottom"},[a("div",{staticClass:"elbtn",on:{click:function(t){e.dialogChange=!1}}},[e._v("取消")]),a("div",{staticClass:"elbtn",on:{click:e.onSubmit}},[e._v("确定")])])],1)},r=[],o={data:function(){var e=this,t=function(t,a,s){if(""===e.form.againPassword)return s(new Error("请再次输入新密码"));e.form.newPassword!==e.form.againPassword?s(new Error("两次新密码输入不一致")):s()};return{dialogChange:!1,form:{primevalPassword:"",newPassword:"",againPassword:""},rules:{primevalPassword:[{required:!0,message:"请输入旧密码",trigger:"blur"}],newPassword:[{required:!0,message:"请输入新密码",trigger:"blur"}],againPassword:[{validator:t,trigger:"blur"}]}}},methods:{init:function(){this.dialogChange=!0},onSubmit:function(){var e=this;this.$refs["form"].validate((function(t){t&&e.$post(e.$Url.account.updatePassword,{primevalPassword:e.form.primevalPassword,newPassword:e.form.newPassword,againPassword:e.form.againPassword}).then((function(t){200===t.status?(e.$message({type:"success",duration:2e3,message:t.data}),e.$router.push({name:"login"})):e.$message({type:"error",duration:2e3,message:t.msg})})).catch((function(e){}))}))}}},i=o,n=(a("2300"),a("2877")),l=Object(n["a"])(i,s,r,!1,null,"66ac3b19",null);t["default"]=l.exports},1597:function(e,t,a){},"21c1":function(e,t,a){"use strict";a("1597")},2300:function(e,t,a){"use strict";a("078e")},"2bbf":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("vLoginHeader"),s("div",{staticClass:"main"},[s("div",{staticClass:"box"},[s("h4",[e._v("信息修改")]),s("div",{staticClass:"container"},[s("div",{staticClass:"left"},[s("div",{staticClass:"photo"},["default"===e.imgSrc?s("img",{attrs:{src:a("2eeb"),alt:""}}):e._e(),"default"!==e.imgSrc&&""!==e.imgSrc?s("img",{attrs:{src:e.imgSrc,alt:""}}):e._e()]),s("el-upload",{staticClass:"upload-btn",attrs:{action:e.$Url.account.upload,"show-file-list":!1,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"before-upload":e.beforeAvatarUpload,"http-request":e.upload}},[s("div",{staticClass:"photo-btn"},[e._v("更换头像")])]),s("p",{staticClass:"update-p"},[s("span",{on:{click:e.handleShowChangePsd}},[e._v("修改密码")])])],1),s("div",{staticClass:"right"},[s("el-form",{ref:"userForm",staticClass:"user-form",attrs:{rules:e.userRules,model:e.userForm,"label-width":"120px"}},[s("el-form-item",{attrs:{label:"昵称：",prop:"nickName"}},[s("el-input",{staticClass:"elinput",attrs:{placeholder:"请输入姓名/昵称",readonly:"",onfocus:"this.removeAttribute('readonly');",onblur:"this.setAttribute('readonly',true);"},model:{value:e.userForm.nickName,callback:function(t){e.$set(e.userForm,"nickName",t)},expression:"userForm.nickName"}})],1),s("el-form-item",{attrs:{label:"医院：",prop:"hospital"}},[s("el-input",{staticClass:"elinput",attrs:{placeholder:"请输入医院"},model:{value:e.userForm.hospital,callback:function(t){e.$set(e.userForm,"hospital",t)},expression:"userForm.hospital"}})],1),s("el-form-item",{attrs:{label:"职称：",prop:"title"}},[s("el-input",{staticClass:"elinput",attrs:{placeholder:"请输入职称"},model:{value:e.userForm.title,callback:function(t){e.$set(e.userForm,"title",t)},expression:"userForm.title"}})],1),s("el-form-item",{attrs:{label:"邮箱：",prop:"email"}},[s("el-input",{staticClass:"elinput",attrs:{placeholder:"请输入邮箱"},model:{value:e.userForm.email,callback:function(t){e.$set(e.userForm,"email",t)},expression:"userForm.email"}})],1),s("el-form-item",{attrs:{label:"简介：",prop:"synopsis"}},[s("el-input",{staticClass:"elinput eltextarea",attrs:{type:"textarea",autosize:{minRows:3,maxRows:3},resize:"none",placeholder:"个人简介"},model:{value:e.userForm.synopsis,callback:function(t){e.$set(e.userForm,"synopsis",t)},expression:"userForm.synopsis"}})],1)],1),s("div",{staticClass:"bottom"},[s("div",{staticClass:"elbtn",on:{click:e.handleSave}},[e._v("保存修改")])])],1)])])]),s("ChangePassword",{ref:"changePsd"}),s("vFooter")],1)},r=[],o=(a("99af"),a("13d5"),a("d3b7"),a("5cc6"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),a("8468")),i=a("1c91"),n=a("bc3a"),l=a.n(n),c=a("0858"),u={inject:["reload"],components:{vLoginHeader:o["a"],vFooter:i["a"],ChangePassword:c["default"]},data:function(){return{userForm:{nickName:"",hospital:"",title:"",email:"",synopsis:"",userName:""},userRules:{nickName:[{required:!0,message:"请输入昵称",trigger:"blur"}],hospital:[{required:!0,message:"请输入医院",trigger:"blur"}],title:[{required:!0,message:"请输入职称",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"}]},headImgUrl:"",imgSrc:""}},methods:{init:function(){var e=this;this.$post(this.$Url.account.userInfo).then((function(t){var a=t.data;if(200===t.status&&a)if(e.userForm=a,a.headImgUrl){l.a.get("".concat(e.$Url.account.showImg,"?fileName=").concat(a.headImgUrl),{responseType:"arraybuffer"}).then((function(e){return"data:image/png;base64,"+btoa(new Uint8Array(e.data).reduce((function(e,t){return e+String.fromCharCode(t)}),""))})).then((function(t){e.imgSrc=t,localStorage.setItem("photo",t)}))}else e.imgSrc="default"})).catch((function(e){}))},upload:function(e){var t=this,a=new FormData;a.append("file",e.file);var s={headers:{"Content-Type":"multipart/form-data"}};this.$post(this.$Url.account.upload,a,s).then((function(e){var a=e.data;a&&(t.imgSrc="".concat(t.$Url.account.showImg,"?fileName=").concat(a),t.headImgUrl=a,t.handleSave())}))},handleRemove:function(e,t){},handlePreview:function(e){},beforeAvatarUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message({type:"error",message:"上传头像图片大小不能超过 2MB!",duration:2e3}),t},handleSave:function(){var e=this;this.$refs["userForm"].validate((function(t){t&&e.$post(e.$Url.account.updateUser,{headImgUrl:e.headImgUrl,nickName:e.userForm.nickName,hospital:e.userForm.hospital,title:e.userForm.title,email:e.userForm.email,synopsis:e.userForm.synopsis}).then((function(t){200===t.status?(e.$message({type:"success",duration:2e3,message:t.msg}),e.reload()):e.$message({type:"error",duration:2e3,message:t.msg})})).catch((function(e){}))}))},handleShowChangePsd:function(){this.$refs.changePsd.init()}},mounted:function(){this.init()}},m=u,d=(a("993d"),a("2877")),p=Object(d["a"])(m,s,r,!1,null,"e5a73f5a",null);t["default"]=p.exports},"5afd":function(e,t,a){},8468:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("header",[e._m(0),a("div",{staticClass:"no-login"},[a("span",[e._v(e._s(e.title))]),a("div",{staticClass:"link-box"},[!e.showUserBox&&"patientsInterpretation"===e.$route.name||"Sms"===e.$route.name||"Xmz"===e.$route.name?a("router-link",{attrs:{to:{name:"geneticInterpretation"},tag:"span"}},[a("i",{staticClass:"el-icon-d-arrow-left"}),e._v("返回上一页")]):e._e(),e.showUserBox?e._e():a("router-link",{attrs:{to:{name:"home"},tag:"span"}},[a("i",{staticClass:"el-icon-d-arrow-left"}),e._v("返回首页")])],1),e.showUserBox?a("span",{staticClass:"user-box",staticStyle:{"text-align":"center"}},[a("UserBox")],1):e._e()])])},r=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"logo"},[s("img",{attrs:{src:a("cf05"),alt:""}})])}],o=(a("b0c0"),a("d610")),i={components:{UserBox:o["a"]},data:function(){return{title:"",showUserBox:!1}},methods:{getTitle:function(){var e=this.$route.name;switch(e){case"forgot":this.title="忘记密码";break;case"favorite":this.title="收藏夹",this.showUserBox=!0;break;case"personal":this.title="个人信息";break;case"patientsInfo":this.title="患者信息",this.showUserBox=!0;break;case"patientsInterpretation":this.title="解读结果";break;case"patientsReport":this.title="解析结果下载";break;default:this.title="欢迎使用";break}}},mounted:function(){this.getTitle()}},n=i,l=(a("21c1"),a("2877")),c=Object(l["a"])(n,s,r,!1,null,"39bba609",null);t["a"]=c.exports},"993d":function(e,t,a){"use strict";a("5afd")},b0c0:function(e,t,a){var s=a("83ab"),r=a("9bf2").f,o=Function.prototype,i=o.toString,n=/^\s*function ([^ (]*)/,l="name";s&&!(l in o)&&r(o,l,{configurable:!0,get:function(){try{return i.call(this).match(n)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=personal.a1dd9dc6.js.map