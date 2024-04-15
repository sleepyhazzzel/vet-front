import{r as x,Z as _,a0 as S,aN as y,o as k,a3 as B,a5 as C,a6 as l,au as F,h as r,aa as a,ar as M,an as N,V as A,ab as q,ag as P}from"./index-2dd6ec27.js";import{c as T,a as d,u as U,d as p}from"./index.esm-fd2911f9.js";import{V as $}from"./VContainer-db3f427f.js";import{V as j}from"./VForm-dfd6fd36.js";import{V as I}from"./VSelect-25581dc4.js";import{V as L}from"./VSheet-1c9e4ba2.js";import"./VList-ec786376.js";const R=P("h2",{class:"d-flex justify-center mb-3"},"管理員登入",-1),O={__name:"AdminLogin",setup(Z){const i=x([]),V=_(),c=S(),{api:m}=F(),b=y();k(async()=>{try{const{data:t}=await m.get("/admins");i.value=t.result.map(e=>({title:e.account,subtitle:e.position}))}catch(t){console.log(t)}});const f=T({account:d().required("帳號為必填欄位"),password:d().required("密碼為必填欄位").min(4,"密碼長度不符").max(20,"密碼長度不符")}),{handleSubmit:g,isSubmitting:h}=U({validationSchema:f}),n=p("account"),u=p("password"),v=g(async t=>{var e,s;try{const{data:o}=await m.post("/admins/login",{account:t.account,password:t.password});b.login(o.result),c({text:"登入成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),V.push("/admin/setting")}catch(o){console.log(o);const w=((s=(e=o==null?void 0:o.response)==null?void 0:e.data)==null?void 0:s.message)||"發生錯誤，請稍後再試";c({text:w,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}});return(t,e)=>(B(),C($,null,{default:l(()=>[r(L,{class:"mx-auto pa-5","max-width":"500",elevation:"4"},{default:l(()=>[R,r(j,{disabled:a(h),onSubmit:M(a(v),["prevent"])},{default:l(()=>[r(I,{label:"帳號",items:i.value,"item-props":!0,modelValue:a(n).value.value,"onUpdate:modelValue":e[0]||(e[0]=s=>a(n).value.value=s),"error-messages":a(n).errorMessage.value},null,8,["items","modelValue","error-messages"]),r(N,{label:"密碼",type:"password",minlength:"4",maxlength:"20",counter:"",modelValue:a(u).value.value,"onUpdate:modelValue":e[1]||(e[1]=s=>a(u).value.value=s),"error-messages":a(u).errorMessage.value},null,8,["modelValue","error-messages"]),r(A,{type:"submit",color:"teal",block:""},{default:l(()=>[q("登入")]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1}))}};export{O as default};