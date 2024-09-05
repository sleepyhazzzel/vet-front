import{_ as T,r as n,a1 as G,$ as H,a0 as J,c as S,o as K,am as Q,a3 as i,a4 as m,ag as r,a7 as U,h as l,a6 as o,a8 as O,aj as W,ae as X,a5 as I,aa as b,an as Y,i as Z,a9 as ee,ah as te,ai as ae,ak as le,ao as oe,ac as se,ab as R,af as A,V as ne}from"./index-716b94b4.js";import{V as re}from"./VForm-344175e2.js";import{V as ue}from"./VContainer-9b68f997.js";import{V as $}from"./VRow-210547fd.js";import{V as y}from"./VCol-9539db28.js";import{V as q,a as ie}from"./VSelect-86733520.js";import{V as F}from"./VDatePicker-ec733ce0.js";import"./VList-2751bc00.js";import"./VSheet-bcee0fe5.js";const de=""+new URL("morning_icon-0c3d2ea1.png",import.meta.url).href,ce=""+new URL("evening_icon-bcafd2d0.png",import.meta.url).href,me=""+new URL("night_icon-923aee67.png",import.meta.url).href;const B=p=>(te("data-v-9b54f58a"),p=p(),ae(),p),pe={class:"overflow"},ve={key:0,class:"image-paw"},fe=B(()=>r("div",{class:"circle-top"},null,-1)),_e=B(()=>r("div",{class:"circle-bottom"},null,-1)),ge={key:0,class:"ma-3 title"},Ve=B(()=>r("div",{class:"mt-3 ms-2 mb-5 text-caption",style:{position:"relative"}},[r("div",null,"※ 預約開放時間為當日開始一個月整"),r("div",null,"※ 夜間診只開放星期五、六")],-1)),be={key:0,class:"d-flex justify-center align-center"},ye={class:"mx-5 my-6 text-center"},we={class:"card-title my-3"},xe={class:"card-subtitle"},he={__name:"AppointView",setup(p){const w=n(!1),x=n(),h=n([]),d=n(null),L=n([]),v=n(null),u=n(),P=n({required:a=>!!a||"此欄位為必填"}),{smAndUp:j}=G(),{api:c}=W(),k=H(),D=J(),f=S(()=>j.value);K(async()=>{try{const{data:a}=await c.get("/admins");h.value=a.result.filter(e=>e.position==="獸醫師").map(e=>({title:e.account,subtitle:e.position,value:e._id})),d.value=h.value[0].value}catch(a){console.log(a)}if(V(),!!k.isLogin)try{const{data:a}=await c.get("/pets/owner/"+k._id);L.value=a.result.map(e=>({title:e.name,subtitle:e.species,value:e._id}))}catch(a){console.log(a)}}),u.value=new Date;const _=S(()=>u.value?u.value.toLocaleDateString("en-CA"):null);x.value=a=>{const e=new Date(a).getDay();return e!==0&&e!==1};const z=S(()=>{const a=new Date(u.value).getDay();return a===5||a===6}),C=new Date().toISOString().substr(0,10),M=Q().addMonths(new Date(C),1),g=n([{title:"上午診",subtitle:"09:00 - 12:00",image:de,text:"預約",full:!1},{title:"下午診",subtitle:"14:00 - 17:00",image:ce,text:"預約",full:!1},{title:"夜間診",subtitle:"18:00 - 21:00",image:me,text:"預約",full:!1}]),V=async()=>{try{const{data:a}=await c.get("/appointments/day",{params:{date:_.value,doctor:d.value}});console.log(a.result),a.result.forEach((e,t)=>{g.value[t].full=e,e?g.value[t].text="已額滿":g.value[t].text="預約"})}catch(a){console.log(a)}},E=async a=>{var e,t;if(!v.value){D({text:"請先選擇寵物",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}});return}try{const{data:s}=await c.get("/appointments/order",{params:{date:_.value,time:a,doctor:d.value}});await c.post("/appointments",{order:s.maxOrder+1},{params:{date:_.value,time:a,doctor:d.value,owner:k._id,pet:v.value}}),D({text:`掛號成功，預約編號：${s.maxOrder+1}`,showCloseButton:!0,snackbarProps:{color:"teal",timeout:1e4,location:"bottom"}})}catch(s){const N=((t=(e=s==null?void 0:s.response)==null?void 0:e.data)==null?void 0:t.message)||"發生錯誤，請稍後再試";D({text:N,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}};return(a,e)=>(i(),m(O,null,[r("div",pe,[f.value?(i(),m("div",ve)):U("",!0),fe,_e]),l(re,null,{default:o(()=>[l(ue,{style:X(f.value?"margin-top: 20vh;":"margin-top: 10vh; height: 100vh;")},{default:o(()=>[l($,null,{default:o(()=>[l(y,{cols:"12",sm:"7",class:"py-0"},{default:o(()=>[f.value?U("",!0):(i(),m("div",ge,"預約掛號")),l($,{"no-gutters":""},{default:o(()=>[l(y,{cols:"12",sm:"6",class:"pe-sm-2"},{default:o(()=>[l(q,{label:"獸醫師",modelValue:d.value,"onUpdate:modelValue":[e[0]||(e[0]=t=>d.value=t),V],items:h.value,"item-props":!0,"item-title":"title","item-value":"value","prepend-inner-icon":"mdi-account",variant:"solo",color:"teal","bg-color":"rgba(255, 255, 255, 0.8)",rounded:"lg",flat:"",rules:[P.value.required]},null,8,["modelValue","items","rules"])]),_:1}),l(y,{cols:"12",sm:"6",class:"ps-sm-2"},{default:o(()=>[l(q,{label:"寵物",modelValue:v.value,"onUpdate:modelValue":e[1]||(e[1]=t=>v.value=t),items:L.value,"item-props":!0,"item-title":"title","item-value":"value","prepend-inner-icon":"mdi-paw",variant:"solo",color:"teal","bg-color":"rgba(255, 255, 255, 0.8)",rounded:"lg",flat:"","no-data-text":"請先註冊登入",rules:[P.value.required]},null,8,["modelValue","items","rules"])]),_:1})]),_:1}),f.value?(i(),I(F,{key:1,"hide-header":"",modelValue:u.value,"onUpdate:modelValue":[e[2]||(e[2]=t=>u.value=t),V],width:"100%",rounded:"lg",color:"teal",position:"relative","allowed-dates":x.value,min:b(C),max:b(M)},null,8,["modelValue","allowed-dates","min","max"])):(i(),I(ie,{key:2,modelValue:w.value,"onUpdate:modelValue":e[5]||(e[5]=t=>w.value=t),"close-on-content-click":!1},{activator:o(({props:t})=>[l(Y,Z({label:"日期","model-value":_.value,"prepend-inner-icon":"mdi-calendar",color:"teal",rounded:"lg",variant:"solo","hide-details":"",readonly:"",flat:""},t),null,16,["model-value"])]),default:o(()=>[l(F,{"onUpdate:modelValue":[e[3]||(e[3]=t=>(w.value=!1,V)),e[4]||(e[4]=t=>u.value=t)],"allowed-dates":x.value,min:b(C),max:b(M),modelValue:u.value,color:"teal"},null,8,["allowed-dates","min","max","modelValue"])]),_:1},8,["modelValue"])),Ve]),_:1}),l(y,{cols:"12",sm:"5",class:"py-0"},{default:o(()=>[(i(!0),m(O,null,ee(g.value,(t,s)=>(i(),I(le,{key:s,class:"mb-5",style:{background:"rgba(255, 255, 255, 0.8)"},rounded:"lg",flat:""},{default:o(()=>[z.value||s!==2?(i(),m("div",be,[l(oe,{class:"ma-3",size:"calc(60px + 5vw)",rounded:"0"},{default:o(()=>[l(se,{src:t.image},null,8,["src"])]),_:2},1024),r("div",ye,[r("p",we,[R(A(t.title)+" ",1),r("span",xe,A(t.subtitle),1)]),l(ne,{disabled:t.full,block:"",variant:"tonal",color:"teal",rounded:"",flat:"",onClick:N=>E(t.title)},{default:o(()=>[R(A(t.text),1)]),_:2},1032,["disabled","onClick"])])])):U("",!0)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1},8,["style"])]),_:1})],64))}},Pe=T(he,[["__scopeId","data-v-9b54f58a"]]);export{Pe as default};