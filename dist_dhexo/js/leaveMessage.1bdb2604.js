(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["leaveMessage"],{1255:function(t,e,a){"use strict";a("b0a0")},1597:function(t,e,a){},"21c1":function(t,e,a){"use strict";a("1597")},"2e11":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"leave-message-box"},[a("vLoginHeader"),a("div",{staticClass:"main"},[a("div",{staticClass:"box"},[a("h4",[t._v("留言")]),a("div",{staticClass:"container"},[a("el-form",{ref:"messageForm",staticClass:"message-form",attrs:{rules:t.messageRules,model:t.messageForm,"label-width":"200px"}},[a("el-form-item",{attrs:{label:"标题：",prop:"title"}},[a("el-input",{staticClass:"elinput",attrs:{placeholder:"请输入标题/事项"},model:{value:t.messageForm.title,callback:function(e){t.$set(t.messageForm,"title",e)},expression:"messageForm.title"}})],1),a("el-form-item",{attrs:{label:"内容：",prop:"content"}},[a("el-input",{staticClass:"elinput",attrs:{placeholder:"请输入留言内容"},model:{value:t.messageForm.content,callback:function(e){t.$set(t.messageForm,"content",e)},expression:"messageForm.content"}})],1),a("el-form-item",{attrs:{label:"图片："}},[a("div",{staticClass:"upload-box"},t._l(t.imageUrlList,(function(e,s){return a("el-upload",{key:s,staticClass:"avatar-uploader",attrs:{action:"https://jsonplaceholder.typicode.com/posts/","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeUpload,"http-request":t.upload}},[e?[a("div",{staticClass:"uploader-box"},[a("img",{staticClass:"avatar",attrs:{src:e}})])]:[a("div",{staticClass:"uploader-box",on:{click:function(e){return t.handleCurrentIndex(s)}}},[a("i",{staticClass:"el-icon-plus avatar-uploader-icon"}),a("p",[t._v("上传图片")])])]],2)})),1)])],1),a("div",{staticClass:"bottom"},[a("div",{staticClass:"elbtn",on:{click:t.handleSubmit}},[t._v("提 交")])])],1)])]),a("vFooter")],1)},n=[],r=(a("99af"),a("a15b"),a("13d5"),a("d3b7"),a("5cc6"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),a("bc3a")),i=a.n(r),o=a("8468"),c=a("1c91"),l={inject:["reload"],components:{vLoginHeader:o["a"],vFooter:c["a"]},data:function(){return{messageForm:{title:"",content:""},messageRules:{title:[{required:!0,message:"请输入标题/事项",trigger:"blur"}],content:[{required:!0,message:"请输入留言内容",trigger:"blur"}]},imageUrlList:["","","",""],imageNameList:[],currentIndex:0}},methods:{upload:function(t){var e=this,a=new FormData;a.append("file",t.file);var s={headers:{"Content-Type":"multipart/form-data"}};this.$post(this.$Url.account.upload,a,s).then((function(t){var a=t.data;a&&i.a.get("".concat(e.$Url.account.showImg,"?fileName=").concat(a),{responseType:"arraybuffer"}).then((function(t){return"data:image/png;base64,"+btoa(new Uint8Array(t.data).reduce((function(t,e){return t+String.fromCharCode(e)}),""))})).then((function(t){e.$set(e.imageUrlList,e.currentIndex,t),e.$set(e.imageNameList,e.currentIndex,a)}))}))},handleAvatarSuccess:function(t,e){},beforeUpload:function(t){var e=t.size/1024/1024<6;return e||this.$message.error("上传头像图片大小不能超过 6MB!"),e},handleSubmit:function(){var t=this;this.$refs["messageForm"].validate((function(e){if(e){var a=[];for(var s in t.imageNameList)""!==t.imageNameList[s]&&a.push(t.imageNameList[s]);t.$post(t.$Url.message.leaveMessage,{title:t.messageForm.title,content:t.messageForm.content,imgList:a.join()}).then((function(e){200===e.status?(t.$message({type:"success",duration:2e3,message:"提交成功"}),t.reload()):t.$message({type:"error",duration:2e3,message:e.msg})})).catch((function(t){}))}}))},handleCurrentIndex:function(t){this.currentIndex=t}},mounted:function(){}},u=l,m=(a("1255"),a("2877")),d=Object(m["a"])(u,s,n,!1,null,"a50befb8",null);e["default"]=d.exports},8468:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",[t._m(0),a("div",{staticClass:"no-login"},[a("span",[t._v(t._s(t.title))]),a("div",{staticClass:"link-box"},[!t.showUserBox&&"patientsInterpretation"===t.$route.name||"Sms"===t.$route.name||"Xmz"===t.$route.name?a("router-link",{attrs:{to:{name:"geneticInterpretation"},tag:"span"}},[a("i",{staticClass:"el-icon-d-arrow-left"}),t._v("返回上一页")]):t._e(),t.showUserBox?t._e():a("router-link",{attrs:{to:{name:"home"},tag:"span"}},[a("i",{staticClass:"el-icon-d-arrow-left"}),t._v("返回首页")])],1),t.showUserBox?a("span",{staticClass:"user-box",staticStyle:{"text-align":"center"}},[a("UserBox")],1):t._e()])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"logo"},[s("img",{attrs:{src:a("cf05"),alt:""}})])}],r=(a("b0c0"),a("d610")),i={components:{UserBox:r["a"]},data:function(){return{title:"",showUserBox:!1}},methods:{getTitle:function(){var t=this.$route.name;switch(t){case"forgot":this.title="忘记密码";break;case"favorite":this.title="收藏夹",this.showUserBox=!0;break;case"personal":this.title="个人信息";break;case"patientsInfo":this.title="患者信息",this.showUserBox=!0;break;case"patientsInterpretation":this.title="解读结果";break;case"patientsReport":this.title="解析结果下载";break;default:this.title="欢迎使用";break}}},mounted:function(){this.getTitle()}},o=i,c=(a("21c1"),a("2877")),l=Object(c["a"])(o,s,n,!1,null,"39bba609",null);e["a"]=l.exports},a15b:function(t,e,a){"use strict";var s=a("23e7"),n=a("44ad"),r=a("fc6a"),i=a("a640"),o=[].join,c=n!=Object,l=i("join",",");s({target:"Array",proto:!0,forced:c||!l},{join:function(t){return o.call(r(this),void 0===t?",":t)}})},b0a0:function(t,e,a){},b0c0:function(t,e,a){var s=a("83ab"),n=a("9bf2").f,r=Function.prototype,i=r.toString,o=/^\s*function ([^ (]*)/,c="name";s&&!(c in r)&&n(r,c,{configurable:!0,get:function(){try{return i.call(this).match(o)[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=leaveMessage.1bdb2604.js.map