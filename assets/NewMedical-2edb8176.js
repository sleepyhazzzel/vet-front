import{_ as W,r as V,a1 as X,$ as Z,a0 as ee,c as _,a2 as le,a3 as C,a5 as B,a6 as t,au as ae,h as a,J as oe,ab as w,al as te,aa as o,ar as se,an as d,i as re,G as ue,ag as g,V as R,ak as ne,ah as de,ai as ie}from"./index-407db2f2.js";import{v as me}from"./vue-the-mask-ca2f28c2.js";import{c as pe,a as v,e as ve,u as ce,d as m}from"./index.esm-a38e5887.js";import{_ as fe}from"./SearchDialog-3836899c.js";import{V as Ve}from"./VContainer-50623ff2.js";import{V as ge,b as be}from"./VToolbar-369ab86f.js";import{V as _e}from"./VForm-f8fcee6f.js";import{V as N}from"./VRow-7a8cc532.js";import{V as c}from"./VCol-7db4fc4a.js";import{V as q,a as we}from"./VSelect-f351af3f.js";import{V as ye}from"./VDatePicker-68a8c19c.js";import{c as G}from"./VList-d6f820cd.js";import"./index-9593027e.js";import"./VSheet-45b0f27a.js";const A=b=>(de("data-v-2b50ddd9"),b=b(),ie(),b),xe=A(()=>g("div",{class:"text-subtitle-1 font-weight-medium ms-2 mb-2"},"基本資訊",-1)),Me=A(()=>g("div",{class:"text-subtitle-1 font-weight-medium mt-4 ms-2 mb-2"},"照片",-1)),De={class:"d-flex justify-space-between align-center"},Ue=A(()=>g("div",{class:"text-subtitle-1 font-weight-medium ms-2 mb-2"},"飼主資訊 ",-1)),ke={class:"text-end"},he={__name:"NewMedical",setup(b){const i=V(null),y=V(!1),I=V(null),p=V([]),x=V([]),{api:O}=ae(),{sm:j}=X(),u=Z(),T=ee(),z=_(()=>j.value),$=_(()=>i.value?i.value.toLocaleDateString():null),E=_(()=>{if(i.value){const n=new Date,e=new Date(i.value);let s=n.getFullYear()-e.getFullYear();const l=n.getMonth()-e.getMonth();return(l<0||l===0&&n.getDate()<e.getDate())&&s--,s}return null}),P=_(()=>{if(i.value){const n=new Date,e=new Date(i.value);let s=n.getMonth()-e.getMonth();return(s<0||s===0&&n.getDate()<e.getDate())&&(s=s+12),s}return null}),Y=pe({name:v().required("姓名為必填欄位"),species:v().required("種族為必填欄位"),breed:v().required("品種為必填欄位"),gender:v().required("性別為必填欄位"),weight:ve().typeError("商品價格格式錯誤").required("體重為必填欄位"),personality:v().required("性格為必填欄位"),chip_id:v().required("晶片號碼為必填欄位").matches(/^.{4}-.{4}-.{4}-.{4}$/,"晶片號碼格式錯誤")}),{handleSubmit:J,isSubmitting:L,resetForm:H}=ce({validationSchema:Y}),M=m("name"),D=m("species"),U=m("breed"),k=m("gender"),h=m("weight"),S=m("personality"),F=m("chip_id"),K=()=>{H({values:{name:"",species:"",color:"",gender:"",weight:"",personality:"",birth:"",chip_id:""}}),I.value.deleteFileRecord(),i.value=null,p.value=[],x.value=[],u.logout()},Q=J(async n=>{var e,s,l;try{if((e=p.value[0])!=null&&e.error)throw new Error("NO_IMAGE");const r=new FormData;for(const f in n)r.append(f,n[f]);p.value.length>0&&r.append("image",p.value[0].file),u._id!==null&&r.append("owner",u._id),r.append("birth",$.value),await O.post("/pets",r),T({text:"新增成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"success",location:"bottom"}})}catch(r){console.log(r);let f=((l=(s=r==null?void 0:r.response)==null?void 0:s.data)==null?void 0:l.message)||"發生錯誤，請稍後再試";r.message==="NO_IMAGE"&&(f="請上傳寵物照片"),T({text:f,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"error",location:"bottom"}})}});return(n,e)=>{const s=le("VueFileAgent");return C(),B(Ve,null,{default:t(()=>[a(ne,{elevation:"2"},{default:t(()=>[a(ge,null,{default:t(()=>[a(oe,{class:"ms-4"},{default:t(()=>[w("mdi-paw")]),_:1}),a(be,{class:"ms-2"},{default:t(()=>[w("新增寵物病歷")]),_:1})]),_:1}),a(te,null,{default:t(()=>[a(_e,{disabled:o(L),onSubmit:se(o(Q),["prevent"])},{default:t(()=>[a(N,null,{default:t(()=>[a(c,{cols:"12",md:"8"},{default:t(()=>[xe,a(N,null,{default:t(()=>[a(c,{cols:"12",md:"6"},{default:t(()=>[a(d,{label:"姓名",color:"teal",modelValue:o(M).value.value,"onUpdate:modelValue":e[0]||(e[0]=l=>o(M).value.value=l),"error-messages":o(M).errorMessage.value},null,8,["modelValue","error-messages"]),a(q,{label:"種族",items:["犬","貓","兔","鼠","鳥","兩棲","其他"],color:"teal",modelValue:o(D).value.value,"onUpdate:modelValue":e[1]||(e[1]=l=>o(D).value.value=l),"error-messages":o(D).errorMessage.value},null,8,["modelValue","error-messages"]),a(d,{label:"品種",color:"teal",modelValue:o(U).value.value,"onUpdate:modelValue":e[2]||(e[2]=l=>o(U).value.value=l),"error-messages":o(U).errorMessage.value},null,8,["modelValue","error-messages"]),Me,a(s,{modelValue:p.value,"onUpdate:modelValue":e[3]||(e[3]=l=>p.value=l),"raw-model-value":x.value,"onUpdate:rawModelValue":e[4]||(e[4]=l=>x.value=l),"error-text":{type:"檔案格式不支援",size:"檔案超過 1MB 大小限制"},accept:"image/jpeg,image/png",ref_key:"fileAgent",ref:I,"max-size":"1MB","max-files":1,deletable:""},null,8,["modelValue","raw-model-value"])]),_:1}),a(c,{cols:"12",md:"6"},{default:t(()=>[a(q,{label:"性別",items:["公","母"],color:"teal",modelValue:o(k).value.value,"onUpdate:modelValue":e[5]||(e[5]=l=>o(k).value.value=l),"error-messages":o(k).errorMessage.value},null,8,["modelValue","error-messages"]),a(d,{label:"體重",type:"string","model-value":"0",suffix:"(g)",color:"teal",modelValue:o(h).value.value,"onUpdate:modelValue":e[6]||(e[6]=l=>o(h).value.value=l),"error-messages":o(h).errorMessage.value},null,8,["modelValue","error-messages"]),a(q,{label:"性格",items:["溫和","緊張","危險"],color:"teal",modelValue:o(S).value.value,"onUpdate:modelValue":e[7]||(e[7]=l=>o(S).value.value=l),"error-messages":o(S).errorMessage.value},null,8,["modelValue","error-messages"]),a(we,{modelValue:y.value,"onUpdate:modelValue":e[10]||(e[10]=l=>y.value=l),"close-on-content-click":!1},{activator:t(({props:l})=>[a(d,re({label:"出生日期","model-value":$.value,color:"teal",readonly:""},l),null,16,["model-value"])]),default:t(()=>[a(ye,{"onUpdate:modelValue":[e[8]||(e[8]=l=>y.value=!1),e[9]||(e[9]=l=>i.value=l)],modelValue:i.value,color:"teal"},null,8,["modelValue"])]),_:1},8,["modelValue"]),a(N,null,{default:t(()=>[a(c,{cols:"6"},{default:t(()=>[a(d,{label:"年齡",modelValue:E.value,"onUpdate:modelValue":e[11]||(e[11]=l=>E.value=l),suffix:"(歲)",color:"teal",readonly:""},null,8,["modelValue"])]),_:1}),a(c,{cols:"6"},{default:t(()=>[a(d,{label:"月份",modelValue:P.value,"onUpdate:modelValue":e[12]||(e[12]=l=>P.value=l),suffix:"(月)",color:"teal",readonly:""},null,8,["modelValue"])]),_:1})]),_:1}),ue(a(d,{label:"晶片號碼",color:"teal",modelValue:o(F).value.value,"onUpdate:modelValue":e[13]||(e[13]=l=>o(F).value.value=l),"error-messages":o(F).errorMessage.value},null,8,["modelValue","error-messages"]),[[o(me.mask),"####-####-####-####"]])]),_:1})]),_:1})]),_:1}),z.value?(C(),B(G,{key:0,class:"mx-3"})):(C(),B(G,{key:1,vertical:"",class:"my-3"})),a(c,{cols:"12",md:"4"},{default:t(()=>[g("div",De,[Ue,a(fe)]),a(d,{label:"姓名",color:"teal",modelValue:o(u).user_name,"onUpdate:modelValue":e[14]||(e[14]=l=>o(u).user_name=l),suffix:o(u).honorific,readonly:""},null,8,["modelValue","suffix"]),a(d,{label:"身分證字號",color:"teal",modelValue:o(u).national_id,"onUpdate:modelValue":e[15]||(e[15]=l=>o(u).national_id=l),readonly:""},null,8,["modelValue"]),a(d,{label:"電話",color:"teal",modelValue:o(u).phone,"onUpdate:modelValue":e[16]||(e[16]=l=>o(u).phone=l),readonly:""},null,8,["modelValue"])]),_:1})]),_:1}),g("div",ke,[a(R,{onClick:K,color:"teal",variant:"text",class:"mb-1 me-2"},{default:t(()=>[w("重設")]),_:1}),a(R,{type:"submit",color:"teal"},{default:t(()=>[w("新增寵物病歷")]),_:1})])]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1})}}},Oe=W(he,[["__scopeId","data-v-2b50ddd9"]]);export{Oe as default};
