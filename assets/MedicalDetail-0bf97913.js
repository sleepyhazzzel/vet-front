import{p as Ie,aV as Fe,aW as Pe,g as Ue,aX as $e,u as Be,aY as Re,c as B,r as f,s as Te,j as Ee,o as me,w as K,b as Ne,f as Ae,aZ as He,a_ as de,a$ as qe,h as a,b0 as ze,i as Q,ab as ee,G as ue,ap as Ge,b1 as je,b2 as Le,ax as Oe,av as oe,b3 as Ye,U as Ze,a as Je,_ as ve,a1 as fe,Z as pe,aL as We,a4 as J,a6 as ae,a7 as s,aa as o,aB as ge,aH as Ve,aC as D,ai as R,V as H,ad as q,ah as Xe,aD as be,b4 as Ke,aM as xe,aj as _e,ak as ye,$ as Qe,a0 as ea,a2 as aa,a5 as ce,J as ta,ae as la}from"./index-928cbe6e.js";import{v as oa}from"./vue-the-mask-f808daa9.js";import{u as we,a as G,d as A,c as sa,e as na}from"./index.esm-e13d856f.js";import{_ as ua}from"./SearchDialog-0de38c4e.js";import{V as he}from"./VForm-f014e949.js";import{b as De,a as se}from"./VSelect-85b188be.js";import{V as ke}from"./VDatePicker-a280d4d2.js";import{V as ra}from"./VContainer-c9bf44f0.js";import{V as ia,b as da}from"./VToolbar-8e3ab153.js";import{V as Z}from"./VRow-bc352195.js";import{V as $}from"./VCol-16c21398.js";import{c as ne}from"./VList-396ce3d5.js";import{V as ca}from"./VDataTable-03565d57.js";import"./index-033d3eee.js";import"./VSheet-5b3ea164.js";const ma=Ie({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...Fe(),...Pe()},"VTextarea"),va=Ue()({name:"VTextarea",directives:{Intersect:$e},inheritAttrs:!1,props:ma(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,z){let{attrs:k,emit:C,slots:c}=z;const d=Be(e,"modelValue"),{isFocused:p,focus:S,blur:I}=Re(e),g=B(()=>typeof e.counterValue=="function"?e.counterValue(d.value):(d.value||"").toString().length),j=B(()=>{if(k.maxlength)return k.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function L(u,_){var v,h;!e.autofocus||!u||(h=(v=_[0].target)==null?void 0:v.focus)==null||h.call(v)}const O=f(),F=f(),Y=Te(""),y=f(),T=B(()=>e.persistentPlaceholder||p.value||e.active);function M(){var u;y.value!==document.activeElement&&((u=y.value)==null||u.focus()),p.value||S()}function P(u){M(),C("click:control",u)}function E(u){C("mousedown:control",u)}function b(u){u.stopPropagation(),M(),oe(()=>{d.value="",Ye(e["onClick:clear"],u)})}function i(u){var v;const _=u.target;if(d.value=_.value,(v=e.modelModifiers)!=null&&v.trim){const h=[_.selectionStart,_.selectionEnd];oe(()=>{_.selectionStart=h[0],_.selectionEnd=h[1]})}}const r=f(),x=f(+e.rows),m=B(()=>["plain","underlined"].includes(e.variant));Ee(()=>{e.autoGrow||(x.value=+e.rows)});function U(){e.autoGrow&&oe(()=>{if(!r.value||!F.value)return;const u=getComputedStyle(r.value),_=getComputedStyle(F.value.$el),v=parseFloat(u.getPropertyValue("--v-field-padding-top"))+parseFloat(u.getPropertyValue("--v-input-padding-top"))+parseFloat(u.getPropertyValue("--v-field-padding-bottom")),h=r.value.scrollHeight,N=parseFloat(u.lineHeight),W=Math.max(parseFloat(e.rows)*N+v,parseFloat(_.getPropertyValue("--v-input-control-height"))),X=parseFloat(e.maxRows)*N+v||1/0,n=Je(h??0,W,X);x.value=Math.floor((n-v)/N),Y.value=Ze(n)})}me(U),K(d,U),K(()=>e.rows,U),K(()=>e.maxRows,U),K(()=>e.density,U);let w;return K(r,u=>{u?(w=new ResizeObserver(U),w.observe(r.value)):w==null||w.disconnect()}),Ne(()=>{w==null||w.disconnect()}),Ae(()=>{const u=!!(c.counter||e.counter||e.counterValue),_=!!(u||c.details),[v,h]=He(k),{modelValue:N,...W}=de.filterProps(e),X=qe(e);return a(de,Q({ref:O,modelValue:d.value,"onUpdate:modelValue":n=>d.value=n,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-input--plain-underlined":m.value},e.class],style:e.style},v,W,{centerAffix:x.value===1&&!m.value,focused:p.value}),{...c,default:n=>{let{id:l,isDisabled:t,isDirty:V,isReadonly:le,isValid:Ce}=n;return a(ze,Q({ref:F,style:{"--v-textarea-control-height":Y.value},onClick:P,onMousedown:E,"onClick:clear":b,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},X,{id:l.value,active:T.value||V.value,centerAffix:x.value===1&&!m.value,dirty:V.value||e.dirty,disabled:t.value,focused:p.value,error:Ce.value===!1}),{...c,default:Se=>{let{props:{class:re,...ie}}=Se;return a(ee,null,[e.prefix&&a("span",{class:"v-text-field__prefix"},[e.prefix]),ue(a("textarea",Q({ref:y,class:re,value:d.value,onInput:i,autofocus:e.autofocus,readonly:le.value,disabled:t.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:M,onBlur:I},ie,h),null),[[Ge("intersect"),{handler:L},null,{once:!0}]]),e.autoGrow&&ue(a("textarea",{class:[re,"v-textarea__sizer"],id:`${ie.id}-sizer`,"onUpdate:modelValue":Me=>d.value=Me,ref:r,readonly:!0,"aria-hidden":"true"},null),[[je,d.value]]),e.suffix&&a("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:_?n=>{var l;return a(ee,null,[(l=c.details)==null?void 0:l.call(c,n),u&&a(ee,null,[a("span",null,null),a(Le,{active:e.persistentCounter||p.value,value:g.value,max:j.value},c.counter)])])}:void 0})}),Oe({},O,F,y)}});const fa=e=>(_e("data-v-aecc3f18"),e=e(),ye(),e),pa=fa(()=>R("div",{class:"text-h6 mx-2 my-3"},"診療紀錄",-1)),ga={class:"text-end mb-2"},Va={__name:"DescriptionDialog",emits:["update"],setup(e,{expose:z,emit:k}){const C=f(!1),c=f(""),d=f(!1),p=f(null),S=fe(),{api:I}=xe(),g=pe(),j=We(),L=k,{handleSubmit:O,isSubmitting:F,resetForm:Y}=we({validationSchema:{description:G().required("描述為必填欄位")}}),y=A("description"),T=b=>{b?(c.value=b._id,p.value=new Date(b.date),y.value.value=b.description):(c.value="",p.value=new Date),C.value=!0},M=()=>{C.value=!1,p.value=new Date,Y({description:""})},P=B(()=>p.value?p.value.toLocaleDateString():null),E=O(async b=>{var i,r;try{const x={date:P.value,description:b.description,edit_by:j.account+" "+j.position};c.value===""?await I.post("/pets/medical/"+g.params.id,x):await I.patch(`/pets/medical/${g.params.id}/${c.value}`,x),L("update"),C.value=!1;const m=c.value===""?"新增成功":"修改成功";S({text:m,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"success",location:"bottom"}})}catch(x){const m=((r=(i=x==null?void 0:x.response)==null?void 0:i.data)==null?void 0:r.message)||"發生錯誤，請稍後再試";S({text:m,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"error",location:"bottom"}})}});return z({openDialog:T}),(b,i)=>(J(),ae(Ke,{width:800,modelValue:C.value,"onUpdate:modelValue":i[4]||(i[4]=r=>C.value=r),persistent:""},{default:s(()=>[a(be,null,{default:s(()=>[a(he,{disabled:o(F),onSubmit:ge(o(E),["prevent"])},{default:s(()=>[a(Ve,null,{default:s(()=>[pa,a(De,{modelValue:d.value,"onUpdate:modelValue":i[2]||(i[2]=r=>d.value=r),"close-on-content-click":!1},{activator:s(({props:r})=>[a(D,Q({label:"診療日期","model-value":P.value,color:"teal",readonly:""},r),null,16,["model-value"])]),default:s(()=>[a(ke,{onInput:i[0]||(i[0]=r=>d.value=!1),modelValue:p.value,"onUpdate:modelValue":i[1]||(i[1]=r=>p.value=r),height:"430px",color:"teal"},null,8,["modelValue"])]),_:1},8,["modelValue"]),a(va,{label:"描述",color:"teal",modelValue:o(y).value.value,"onUpdate:modelValue":i[3]||(i[3]=r=>o(y).value.value=r),"error-messages":o(y).errorMessage.value},null,8,["modelValue","error-messages"]),R("div",ga,[a(H,{disabled:o(F),variant:"text",onClick:M},{default:s(()=>[q("取消")]),_:1},8,["disabled"]),a(H,{type:"submit",color:"teal"},{default:s(()=>[q(Xe(c.value===""?"新增":"送出"),1)]),_:1})])]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1},8,["modelValue"]))}},ba=ve(Va,[["__scopeId","data-v-aecc3f18"]]);const te=e=>(_e("data-v-37f4a9ef"),e=e(),ye(),e),xa=te(()=>R("div",{class:"text-subtitle-1 font-weight-medium ms-2 mb-2"},"基本資訊",-1)),_a=te(()=>R("div",{class:"text-subtitle-1 font-weight-medium mb-2 ms-2"},"照片",-1)),ya={class:"d-flex justify-space-between align-center"},wa=te(()=>R("div",{class:"text-subtitle-1 font-weight-medium ms-2 mb-2"},"飼主資訊",-1)),ha={key:0,class:"text-end"},Da={class:"text-end"},ka={class:"d-flex justify-space-between align-center"},Ca=te(()=>R("div",{class:"text-subtitle-1 font-weight-medium ms-2 mb-2"},"診療紀錄",-1)),Sa={__name:"MedicalDetail",setup(e){const z=f(!1),k=f(!0),C=f(null),c=f(null),d=pe(),p=Qe(),{api:S}=xe(),I=fe(),g=ea(),{sm:j}=aa(),L=B(()=>j.value),O=()=>{p.go(-1)},F=sa({name:G().required("姓名為必填欄位"),species:G().required("種族為必填欄位"),breed:G().required("品種為必填欄位"),gender:G().required("性別為必填欄位"),weight:na().typeError("商品價格格式錯誤").required("體重為必填欄位"),personality:G().required("性格為必填欄位"),chip_id:G().required("晶片號碼為必填欄位").matches(/^.{4}-.{4}-.{4}-.{4}$/,"晶片號碼格式錯誤")}),{handleSubmit:Y,isSubmitting:y}=we({validationSchema:F}),T=A("name"),M=A("species"),P=A("breed"),E=A("gender"),b=A("weight"),i=A("personality"),r=A("chip_id"),x=f(null),m=f(null),U=f([]);me(async()=>{var n,l;try{const{data:t}=await S.get(`/pets/${d.params.id}`);T.value.value=t.result.name,M.value.value=t.result.species,P.value.value=t.result.breed,E.value.value=t.result.gender,b.value.value=t.result.weight,m.value=new Date(t.result.birth),i.value.value=t.result.personality,r.value.value=t.result.chip_id.replace(/-/g,""),x.value=t.result.image;const{data:V}=await S.get(`/users/${t.result.owner}`);g.login(V.result)}catch(t){console.log(t);const V=((l=(n=t==null?void 0:t.response)==null?void 0:n.data)==null?void 0:l.message)||"發生錯誤，請稍後再試";I({text:V,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}});const w=B(()=>{if(m.value){const n=new Date,l=new Date(m.value);let t=n.getFullYear()-l.getFullYear();const V=n.getMonth()-l.getMonth();return(V<0||V===0&&n.getDate()<l.getDate())&&t--,t}return null}),u=B(()=>{if(m.value){const n=new Date,l=new Date(m.value);let t=n.getMonth()-l.getMonth();return(t<0||t===0&&n.getDate()<l.getDate())&&(t=t+12),t}return null}),_=B(()=>m.value?m.value.toLocaleDateString():null),v=n=>{c.value.openDialog(n)},h=[{title:"日期",key:"date"},{title:"描述",key:"description",sortable:!1},{title:"主治醫生",key:"edit_by"},{title:"編輯 / 刪除",key:"actions",align:"center",sortable:!1}],N=async()=>{try{k.value=!0;const{data:n}=await S.get("/pets/medical/"+d.params.id);U.value=n.result.descriptions}catch(n){console.log(n)}k.value=!1};N();const W=Y(async n=>{var l,t;try{g._id!==null&&(n.owner=g._id),n.birth=_.value,await S.patch("/pets/"+d.params.id,n),I({text:"更新成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"success",location:"bottom"}})}catch(V){const le=((t=(l=V==null?void 0:V.response)==null?void 0:l.data)==null?void 0:t.message)||"發生錯誤，請稍後再試";I({text:le,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),X=async n=>{try{await S.delete("/pets/medical/"+d.params.id+"/"+n._id),I({text:"刪除成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"success",location:"bottom"}}),N()}catch(l){console.log(l)}};return(n,l)=>(J(),ce(ee,null,[a(H,{variant:"text",class:"ms-4","prepend-icon":"mdi-arrow-left",onClick:O},{default:s(()=>[q("返回")]),_:1}),a(ra,null,{default:s(()=>[a(he,{disabled:o(y),onSubmit:ge(o(W),["prevent"])},{default:s(()=>[a(be,null,{default:s(()=>[a(ia,null,{default:s(()=>[a(ta,{class:"ms-4"},{default:s(()=>[q("mdi-paw")]),_:1}),a(da,{class:"ms-2"},{default:s(()=>[q("編輯寵物病歷")]),_:1})]),_:1}),a(Ve,null,{default:s(()=>[a(Z,null,{default:s(()=>[a($,{cols:"12",md:"8"},{default:s(()=>[xa,a(Z,null,{default:s(()=>[a($,{cols:"12",md:"6"},{default:s(()=>[a(D,{label:"姓名",color:"teal",modelValue:o(T).value.value,"onUpdate:modelValue":l[0]||(l[0]=t=>o(T).value.value=t),"error-messages":o(T).errorMessage.value},null,8,["modelValue","error-messages"]),a(se,{label:"種族",items:["犬","貓","兔","鼠","鳥","兩棲","其他"],color:"teal",modelValue:o(M).value.value,"onUpdate:modelValue":l[1]||(l[1]=t=>o(M).value.value=t),"error-messages":o(M).errorMessage.value},null,8,["modelValue","error-messages"]),a(D,{label:"品種",color:"teal",modelValue:o(P).value.value,"onUpdate:modelValue":l[2]||(l[2]=t=>o(P).value.value=t),"error-messages":o(P).errorMessage.value},null,8,["modelValue","error-messages"]),_a,a(la,{"max-height":"176",src:x.value,"aspect-ratio":"4/3",class:"bg-grey-lighten-3"},null,8,["src"])]),_:1}),a($,{cols:"12",md:"6"},{default:s(()=>[a(se,{label:"性別",items:["公","母"],color:"teal",modelValue:o(E).value.value,"onUpdate:modelValue":l[3]||(l[3]=t=>o(E).value.value=t),"error-messages":o(E).errorMessage.value},null,8,["modelValue","error-messages"]),a(D,{label:"體重",type:"string","model-value":"0",suffix:"(g)",color:"teal",modelValue:o(b).value.value,"onUpdate:modelValue":l[4]||(l[4]=t=>o(b).value.value=t),"error-messages":o(b).errorMessage.value},null,8,["modelValue","error-messages"]),a(se,{label:"性格",items:["溫和","緊張","危險"],color:"teal",modelValue:o(i).value.value,"onUpdate:modelValue":l[5]||(l[5]=t=>o(i).value.value=t),"error-messages":o(i).errorMessage.value},null,8,["modelValue","error-messages"]),a(De,{modelValue:z.value,"onUpdate:modelValue":l[8]||(l[8]=t=>z.value=t),"close-on-content-click":!1},{activator:s(({props:t})=>[a(D,Q({label:"出生日期","model-value":_.value,color:"teal",readonly:""},t),null,16,["model-value"])]),default:s(()=>[a(ke,{onInput:l[6]||(l[6]=t=>z.value=!1),modelValue:m.value,"onUpdate:modelValue":l[7]||(l[7]=t=>m.value=t),color:"teal"},null,8,["modelValue"])]),_:1},8,["modelValue"]),a(Z,null,{default:s(()=>[a($,{cols:"6"},{default:s(()=>[a(D,{label:"年齡",modelValue:w.value,"onUpdate:modelValue":l[9]||(l[9]=t=>w.value=t),suffix:"(歲)",color:"teal",readonly:""},null,8,["modelValue"])]),_:1}),a($,{cols:"6"},{default:s(()=>[a(D,{label:"年齡",modelValue:u.value,"onUpdate:modelValue":l[10]||(l[10]=t=>u.value=t),suffix:"(月)",color:"teal",readonly:""},null,8,["modelValue"])]),_:1})]),_:1}),ue(a(D,{label:"晶片號碼",color:"teal",modelValue:o(r).value.value,"onUpdate:modelValue":l[11]||(l[11]=t=>o(r).value.value=t),"error-messages":o(r).errorMessage.value},null,8,["modelValue","error-messages"]),[[o(oa.mask),"####-####-####-####"]])]),_:1})]),_:1})]),_:1}),L.value?(J(),ae(ne,{key:0,class:"mx-3"})):(J(),ae(ne,{key:1,vertical:"",class:"my-3"})),a($,{cols:"12",md:"4"},{default:s(()=>[a(Z,null,{default:s(()=>[a($,{cols:"12"},{default:s(()=>[R("div",ya,[wa,a(ua)]),a(D,{label:"姓名",color:"teal",modelValue:o(g).user_name,"onUpdate:modelValue":l[12]||(l[12]=t=>o(g).user_name=t),suffix:o(g).honorific,readonly:""},null,8,["modelValue","suffix"]),a(D,{label:"身分證字號",color:"teal",modelValue:o(g).national_id,"onUpdate:modelValue":l[13]||(l[13]=t=>o(g).national_id=t),readonly:""},null,8,["modelValue"]),a(D,{label:"電話",color:"teal",modelValue:o(g).phone,"onUpdate:modelValue":l[14]||(l[14]=t=>o(g).phone=t),readonly:""},null,8,["modelValue"])]),_:1})]),_:1}),L.value?(J(),ce("div",ha,[a(H,{color:"teal",type:"submit",class:"mb-4"},{default:s(()=>[q("更新寵物病歷")]),_:1})])):(J(),ae(Z,{key:1,style:{height:"215px"}},{default:s(()=>[a($,{cols:"12","align-self":"end"},{default:s(()=>[R("div",Da,[a(H,{color:"teal",type:"submit",flat:""},{default:s(()=>[q("更新寵物病歷")]),_:1})])]),_:1})]),_:1}))]),_:1})]),_:1}),a(ne,{class:"mb-4"}),a(Z,null,{default:s(()=>[a($,{cols:"12"},{default:s(()=>[R("div",ka,[Ca,a(H,{color:"teal",density:"compact",variant:"text",class:"align-self-start",onClick:l[15]||(l[15]=t=>v(n.item))},{default:s(()=>[q("新增診療紀錄 ")]),_:1})]),a(ca,{headers:h,"sort-by":[{key:"date",order:"desc"}],items:U.value,loading:k.value,"items-per-page":10,"no-data-text":k.value?"載入中...":"無資料",color:"teal",class:"mb-4 elevation-1"},{"item.actions":s(({item:t})=>[a(H,{color:"teal",icon:"mdi-pencil",variant:"text",onClick:V=>v(t)},null,8,["onClick"]),a(H,{icon:"mdi-delete",variant:"text",color:"grey",onClick:V=>X(t)},null,8,["onClick"])]),_:2},1032,["items","loading","no-data-text"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1}),a(ba,{item:C.value,ref_key:"elDESCDialog",ref:c,onUpdate:N},null,8,["item"])],64))}},Ga=ve(Sa,[["__scopeId","data-v-37f4a9ef"]]);export{Ga as default};