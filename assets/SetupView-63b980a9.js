import{a1 as N,a4 as B,a6 as P,a7 as l,h as e,aa as a,ak as T,al as f,G as L,V as z,ad as M,aj as R,r as W,$ as O,a0 as H,_ as J,a5 as K,ab as Q,a9 as E,am as X,an as Y,ao as Z,ai as ee}from"./index-d4ec24c3.js";import{v as q,V as ae,a as F,b as le,c as $}from"./index-1c7e281a.js";import{d as oe}from"./index-465bd8ec.js";import{c as j,a as c,b as se,u as A,d as p}from"./index.esm-c705680a.js";import{v as te}from"./vue-the-mask-579fda6b.js";import{V as D}from"./VForm-8662b32e.js";import{V as I}from"./VRow-41a4f9a4.js";import{V as n}from"./VCol-8d4a0ece.js";import{V as re}from"./VSelect-575b63ba.js";import{V as k}from"./VContainer-9cbfca84.js";import{V as ue}from"./VCheckbox-32080878.js";import"./VList-f69f5da4.js";const ne={__name:"RegisterView",emits:[""],setup(_,{emit:r}){const{api:w}=R(),h=N(),i=j({user_name:c().required("姓名為必填欄位"),honorific:c().required("稱謂為必填欄位"),national_id:c().required("身分證為必填欄位").test("isNI","身分證格式錯誤",o=>oe.isNationalIdentificationNumberValid(o)),email:c().required("信箱為必填欄位").test("isEmail","信箱格式錯誤",o=>q.isEmail(o)),phone:c().required("手機號碼為必填欄位").test("isPhone","手機號碼格式錯誤",o=>(o=o.replace(/-/g,""),q.isMobilePhone(o,"zh-TW"))),password:c().required("密碼為必填欄位").min(6,"密碼長度過短").max(20,"密碼長度過長"),passwordConfirm:c().required("密碼為必填欄位").min(6,"密碼長度過短").max(20,"密碼長度過長").oneOf([se("password")],"密碼不一致")}),{handleSubmit:v,isSubmitting:U}=A({validationSchema:i}),x=p("user_name"),y=p("honorific"),g=p("national_id"),V=p("email"),S=p("phone"),d=p("password"),u=p("passwordConfirm"),m=r,b=v(async o=>{var s,t;try{o.phone=o.phone.replace(/-/g,""),await w.post("/users",{user_name:o.user_name,honorific:o.honorific,national_id:o.national_id,email:o.email,phone:o.phone,password:o.password}),m("submitForm"),h({text:"註冊成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"success",location:"bottom"}})}catch(C){console.log(C);const G=((t=(s=C==null?void 0:C.response)==null?void 0:s.data)==null?void 0:t.message)||"發生錯誤，請稍後再試";h({text:G,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"error",location:"bottom"}})}});return(o,s)=>(B(),P(k,null,{default:l(()=>[e(D,{disabled:a(U),onSubmit:T(a(b),["prevent"])},{default:l(()=>[e(I,null,{default:l(()=>[e(n,{cols:"6",class:"py-0"},{default:l(()=>[e(f,{label:"姓名",type:"text",color:"teal",variant:"solo-filled",flat:"",rounded:"lg",modelValue:a(x).value.value,"onUpdate:modelValue":s[0]||(s[0]=t=>a(x).value.value=t),"error-messages":a(x).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),e(n,{cols:"6",class:"py-0"},{default:l(()=>[e(re,{label:"稱謂",items:["先生","女士"],color:"teal",variant:"solo-filled",flat:"",rounded:"lg",modelValue:a(y).value.value,"onUpdate:modelValue":s[1]||(s[1]=t=>a(y).value.value=t),"error-messages":a(y).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),e(n,{cols:"12",class:"py-0"},{default:l(()=>[e(f,{label:"身分證字號",type:"text",color:"teal",variant:"solo-filled",flat:"",rounded:"lg",modelValue:a(g).value.value,"onUpdate:modelValue":s[2]||(s[2]=t=>a(g).value.value=t),"error-messages":a(g).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),e(n,{cols:"12",class:"py-0"},{default:l(()=>[e(f,{label:"電子信箱",type:"email",color:"teal",variant:"solo-filled",flat:"",rounded:"lg",modelValue:a(V).value.value,"onUpdate:modelValue":s[3]||(s[3]=t=>a(V).value.value=t),"error-messages":a(V).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),e(n,{cols:"12",class:"py-0"},{default:l(()=>[L(e(f,{label:"手機號碼",type:"tel",color:"teal",variant:"solo-filled",flat:"",rounded:"lg",modelValue:a(S).value.value,"onUpdate:modelValue":s[4]||(s[4]=t=>a(S).value.value=t),"error-messages":a(S).errorMessage.value},null,8,["modelValue","error-messages"]),[[a(te.mask),"####-###-###"]])]),_:1}),e(n,{cols:"6",class:"py-0"},{default:l(()=>[e(f,{label:"密碼",type:"password",color:"teal",variant:"solo-filled",flat:"",rounded:"lg",hint:"密碼長度：6 - 20",minlength:"6",maxlength:"20",counter:"",modelValue:a(d).value.value,"onUpdate:modelValue":s[5]||(s[5]=t=>a(d).value.value=t),"error-messages":a(d).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),e(n,{cols:"6",class:"py-0"},{default:l(()=>[e(f,{label:"確認密碼",type:"password",color:"teal",variant:"solo-filled",flat:"",rounded:"lg",minlength:"6",maxlength:"20",counter:"",modelValue:a(u).value.value,"onUpdate:modelValue":s[6]||(s[6]=t=>a(u).value.value=t),"error-messages":a(u).errorMessage.value},null,8,["modelValue","error-messages"])]),_:1}),e(n,{cols:"12"},{default:l(()=>[e(z,{type:"submit",color:"teal",block:"",rounded:"",size:"large"},{default:l(()=>[M("註冊")]),_:1})]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1}))}},ie={__name:"LoginView",setup(_){const r=W(!1),{api:w}=R(),h=O(),i=N(),v=H(),U=j({email:c().required("信箱為必填欄位").test("isEmail","信箱格式錯誤",d=>q.isEmail(d)),password:c().required("密碼為必填欄位").min(6,"密碼長度過短").max(20,"密碼長度過長")}),{handleSubmit:x,isSubmitting:y}=A({validationSchema:U}),g=p("email"),V=p("password"),S=x(async d=>{var u,m;try{const{data:b}=await w.post("/users/login",{email:d.email,password:d.password});v.login(b.result),i({text:"登入成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"success",location:"bottom"}}),h.push("/account")}catch(b){const o=((m=(u=b==null?void 0:b.response)==null?void 0:u.data)==null?void 0:m.message)||"發生錯誤，請稍後再試";i({text:o,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"error",location:"bottom"}})}});return(d,u)=>(B(),P(k,null,{default:l(()=>[e(I,null,{default:l(()=>[e(n,{col:"12"},{default:l(()=>[e(D,{disabled:a(y),onSubmit:T(a(S),["prevent"])},{default:l(()=>[e(f,{type:"email",color:"teal",class:"mb-2",label:"電子信箱",variant:"solo-filled",flat:"",rounded:"lg",modelValue:a(g).value.value,"onUpdate:modelValue":u[0]||(u[0]=m=>a(g).value.value=m),"error-messages":a(g).errorMessage.value},null,8,["modelValue","error-messages"]),e(f,{color:"teal",label:"密碼",variant:"solo-filled",flat:"",rounded:"lg",type:r.value?"text":"password","append-inner-icon":r.value?"mdi-eye":"mdi-eye-off","onClick:appendInner":u[1]||(u[1]=m=>r.value=!r.value),hint:"密碼長度：6 ~ 20 之間",minlength:"6",maxlength:"20",counter:"",modelValue:a(V).value.value,"onUpdate:modelValue":u[2]||(u[2]=m=>a(V).value.value=m),"error-messages":a(V).errorMessage.value},null,8,["type","append-inner-icon","modelValue","error-messages"]),e(ue,{label:"記住我的帳號",color:"teal"}),e(z,{type:"submit",color:"teal",block:"",rounded:"",size:"large"},{default:l(()=>[M("登入")]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}))}};const de=_=>(Y("data-v-17e45bec"),_=_(),Z(),_),me=de(()=>ee("div",{class:"bg"},null,-1)),ce={__name:"SetupView",setup(_){const r=W(2),w=()=>{r.value=2};return(h,i)=>(B(),K(Q,null,[me,e(k,null,{default:l(()=>[e(I,{align:"center",style:{height:"100vh"}},{default:l(()=>[e(n,{cols:"8",md:"5",offset:"2","offset-md":"7"},{default:l(()=>[e(ae,{modelValue:r.value,"onUpdate:modelValue":i[0]||(i[0]=v=>r.value=v),color:"teal","fixed-tabs":"","align-tabs":"center"},{default:l(()=>[e(F,{value:1,rounded:"t-xl",class:E(r.value===1?"tab-white text-h6":"tab-grey")},{default:l(()=>[M("註冊")]),_:1},8,["class"]),e(F,{value:2,rounded:"t-xl",class:E(r.value===2?"tab-white text-h6":"tab-grey")},{default:l(()=>[M("登入")]),_:1},8,["class"])]),_:1},8,["modelValue"]),e(X,{elevation:"4",rounded:"b-xl t-0"},{default:l(()=>[e(le,{modelValue:r.value,"onUpdate:modelValue":i[1]||(i[1]=v=>r.value=v)},{default:l(()=>[e($,{value:1},{default:l(()=>[e(k,{fluid:"",class:"mt-2"},{default:l(()=>[e(ne,{onSubmitForm:w})]),_:1})]),_:1}),e($,{value:2},{default:l(()=>[e(k,{fluid:"",class:"mt-2"},{default:l(()=>[e(ie)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})],64))}},ke=J(ce,[["__scopeId","data-v-17e45bec"]]);export{ke as default};
