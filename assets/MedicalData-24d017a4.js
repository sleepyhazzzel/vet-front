import{Z as h,r as s,a3 as k,a5 as v,a6 as t,h as e,V as n,ab as _,ad as y,an as b,ac as x,ak as C,au as T}from"./index-2e460a83.js";import{V as w}from"./VContainer-f793f754.js";import{V as I}from"./VDataTable-bd5d4887.js";import{V as $,b as B}from"./VToolbar-19bb5824.js";import"./VSelect-2b4db6fe.js";import"./VList-1613b161.js";const R={__name:"MedicalData",setup(D){const{api:r}=T(),m=h(),i=s(""),c=s([]),o=s(!0),p=[{title:"晶片號碼",key:"chip_id"},{title:"圖片",key:"image",sortable:!1},{title:"名稱",key:"name"},{title:"性別",key:"gender"},{title:"種族",key:"species"},{title:"品種",key:"breed"},{title:"編輯 / 刪除",key:"actions",align:"center",sortable:!1}],d=async()=>{try{o.value=!0;const{data:a}=await r.get("/pets");c.value=a.result}catch(a){console.log(a)}o.value=!1};d();const V=a=>{m.push(`/admin/medical-data/${a._id}`)},f=async a=>{await r.delete(`/pets/${a._id}`),d()};return(a,u)=>(k(),v(w,null,{default:t(()=>[e(C,null,{default:t(()=>[e(I,{headers:p,items:c.value,"items-per-page":10,loading:o.value,search:i.value},{top:t(()=>[e($,{flat:""},{default:t(()=>[e(n,{icon:"mdi-account-multiple"}),e(B,null,{default:t(()=>[_("病例總覽")]),_:1}),e(y),e(b,{label:"Search",modelValue:i.value,"onUpdate:modelValue":u[0]||(u[0]=l=>i.value=l),variant:"solo","append-inner-icon":"mdi-magnify",density:"compact",flat:"","single-line":"","hide-details":"",class:"me-3"},null,8,["modelValue"])]),_:1})]),"item.image":t(({item:l})=>[e(x,{src:l.image,width:"50px",height:"50px",cover:"",class:"rounded-pill"},null,8,["src"])]),"item.actions":t(({item:l})=>[e(n,{icon:"mdi-pencil",variant:"text",color:"teal",onClick:g=>V(l)},null,8,["onClick"]),e(n,{icon:"mdi-delete",variant:"text",color:"grey",onClick:g=>f(l)},null,8,["onClick"])]),_:2},1032,["items","loading","search"])]),_:1})]),_:1}))}};export{R as default};