import{p as R,r as U,s as L,c as n,a as ue,w as E,o as ie,b as ce,m as Y,g as z,u as de,d as ve,e as G,t as C,f as $,h as a,i as D,j as me,k as ge,V as P,I as fe,l as O,n as he,q as X,v as j,x as q,y as be,z as W,A as J,B as ye,C as Ve,D as te,E as Se,F as ke,M as Be,G as Ce,H as _e,J as A,K as ae,L as pe,N as oe,O as xe,P as le,Q as we,R as se,S as Te,T as Ne,U as H,W as Ie,X as Pe,Y as Ae,_ as Le,Z as Re,$ as ze,a0 as $e,a1 as De,a2 as Ee,a3 as Fe,a4 as m,a5 as w,a6 as B,a7 as s,a8 as p,a9 as Ue,aa as N,ab as I,ac as M,ad as T,ae as Me,af as He,ag as Ye,ah as F,ai as ne,aj as Ge,ak as Oe,al as Xe}from"./index-c18772c7.js";import{V as je,a as qe}from"./VNavigationDrawer-ef0cecf9.js";import{m as We,V as Q,a as Je,b as Ke}from"./VToolbar-4605d8ca.js";import{u as re,V as Z,a as ee,b as Qe}from"./VList-e3a591b3.js";import{V as Ze}from"./VContainer-d0e02daf.js";import{V as et}from"./VRow-bc0a2289.js";const tt=R({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function at(e){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:c}=i;let g=0;const d=U(null),t=L(0),f=L(0),h=L(0),V=L(!1),y=L(!1),r=n(()=>Number(e.scrollThreshold)),b=n(()=>ue((r.value-t.value)/r.value||0)),v=()=>{const u=d.value;!u||c&&!c.value||(g=t.value,t.value="window"in u?u.pageYOffset:u.scrollTop,y.value=t.value<g,h.value=Math.abs(t.value-r.value))};return E(y,()=>{f.value=f.value||t.value}),E(V,()=>{f.value=0}),ie(()=>{E(()=>e.scrollTarget,u=>{var k;const S=u?document.querySelector(u):window;S&&S!==d.value&&((k=d.value)==null||k.removeEventListener("scroll",v),d.value=S,d.value.addEventListener("scroll",v,{passive:!0}))},{immediate:!0})}),ce(()=>{var u;(u=d.value)==null||u.removeEventListener("scroll",v)}),c&&E(c,v,{immediate:!0}),{scrollThreshold:r,currentScroll:t,currentThreshold:h,isScrollActive:V,scrollRatio:b,isScrollingUp:y,savedScroll:f}}const ot=R({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...We(),...Y(),...tt(),height:{type:[Number,String],default:64}},"VAppBar"),lt=z()({name:"VAppBar",props:ot(),emits:{"update:modelValue":e=>!0},setup(e,i){let{slots:c}=i;const g=U(),d=de(e,"modelValue"),t=n(()=>{var _;const o=new Set(((_=e.scrollBehavior)==null?void 0:_.split(" "))??[]);return{hide:o.has("hide"),inverted:o.has("inverted"),collapse:o.has("collapse"),elevate:o.has("elevate"),fadeImage:o.has("fade-image")}}),f=n(()=>{const o=t.value;return o.hide||o.inverted||o.collapse||o.elevate||o.fadeImage||!d.value}),{currentScroll:h,scrollThreshold:V,isScrollingUp:y,scrollRatio:r}=at(e,{canScroll:f}),b=n(()=>e.collapse||t.value.collapse&&(t.value.inverted?r.value>0:r.value===0)),v=n(()=>e.flat||t.value.elevate&&(t.value.inverted?h.value>0:h.value===0)),u=n(()=>t.value.fadeImage?t.value.inverted?1-r.value:r.value:void 0),S=n(()=>{var l,K;if(t.value.hide&&t.value.inverted)return 0;const o=((l=g.value)==null?void 0:l.contentHeight)??0,_=((K=g.value)==null?void 0:K.extensionHeight)??0;return o+_});ve(n(()=>!!e.scrollBehavior),()=>{me(()=>{t.value.hide?t.value.inverted?d.value=h.value>V.value:d.value=y.value||h.value<V.value:d.value=!0})});const{ssrBootStyles:k}=re(),{layoutItemStyles:x}=G({id:e.name,order:n(()=>parseInt(e.order,10)),position:C(e,"location"),layoutSize:S,elementSize:L(void 0),active:d,absolute:C(e,"absolute")});return $(()=>{const o=Q.filterProps(e);return a(Q,D({ref:g,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"},e.class],style:[{...x.value,"--v-toolbar-image-opacity":u.value,height:void 0,...k.value},e.style]},o,{collapse:b.value,flat:v.value}),c)}),{}}}),st=R({...ge({icon:"$menu",variant:"text"})},"VAppBarNavIcon"),nt=z()({name:"VAppBarNavIcon",props:st(),setup(e,i){let{slots:c}=i;return $(()=>a(P,D(e,{class:["v-app-bar-nav-icon"]}),c)),{}}}),rt=z()({name:"VAppBarTitle",props:Je(),setup(e,i){let{slots:c}=i;return $(()=>a(Ke,D(e,{class:"v-app-bar-title"}),c)),{}}});const ut=R({bordered:Boolean,color:String,content:[Number,String],dot:Boolean,floating:Boolean,icon:fe,inline:Boolean,label:{type:String,default:"$vuetify.badge"},max:[Number,String],modelValue:{type:Boolean,default:!0},offsetX:[Number,String],offsetY:[Number,String],textColor:String,...O(),...he({location:"top end"}),...X(),...j(),...q(),...be({transition:"scale-rotate-transition"})},"VBadge"),it=z()({name:"VBadge",inheritAttrs:!1,props:ut(),setup(e,i){const{backgroundColorClasses:c,backgroundColorStyles:g}=W(C(e,"color")),{roundedClasses:d}=J(e),{t}=ye(),{textColorClasses:f,textColorStyles:h}=Ve(C(e,"textColor")),{themeClasses:V}=te(),{locationStyles:y}=Se(e,!0,r=>(e.floating?e.dot?2:4:e.dot?8:12)+(["top","bottom"].includes(r)?+(e.offsetY??0):["left","right"].includes(r)?+(e.offsetX??0):0));return $(()=>{const r=Number(e.content),b=!e.max||isNaN(r)?e.content:r<=+e.max?r:`${e.max}+`,[v,u]=ke(i.attrs,["aria-atomic","aria-label","aria-live","role","title"]);return a(e.tag,D({class:["v-badge",{"v-badge--bordered":e.bordered,"v-badge--dot":e.dot,"v-badge--floating":e.floating,"v-badge--inline":e.inline},e.class]},u,{style:e.style}),{default:()=>{var S,k;return[a("div",{class:"v-badge__wrapper"},[(k=(S=i.slots).default)==null?void 0:k.call(S),a(Be,{transition:e.transition},{default:()=>{var x,o;return[Ce(a("span",D({class:["v-badge__badge",V.value,c.value,d.value,f.value],style:[g.value,h.value,e.inline?{}:y.value],"aria-atomic":"true","aria-label":t(e.label,r),"aria-live":"polite",role:"status"},v),[e.dot?void 0:i.slots.badge?(o=(x=i.slots).badge)==null?void 0:o.call(x):e.icon?a(A,{icon:e.icon},null):b]),[[_e,e.modelValue]])]}})])]}})}),{}}});const ct=R({bgColor:String,color:String,grow:Boolean,mode:{type:String,validator:e=>!e||["horizontal","shift"].includes(e)},height:{type:[Number,String],default:56},active:{type:Boolean,default:!0},...ae(),...O(),...pe(),...oe(),...X(),...Y({name:"bottom-navigation"}),...j({tag:"header"}),...xe({modelValue:!0,selectedClass:"v-btn--selected"}),...q()},"VBottomNavigation"),dt=z()({name:"VBottomNavigation",props:ct(),emits:{"update:modelValue":e=>!0},setup(e,i){let{slots:c}=i;const{themeClasses:g}=te(),{borderClasses:d}=le(e),{backgroundColorClasses:t,backgroundColorStyles:f}=W(C(e,"bgColor")),{densityClasses:h}=we(e),{elevationClasses:V}=se(e),{roundedClasses:y}=J(e),{ssrBootStyles:r}=re(),b=n(()=>Number(e.height)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0)),v=C(e,"active"),{layoutItemStyles:u}=G({id:e.name,order:n(()=>parseInt(e.order,10)),position:n(()=>"bottom"),layoutSize:n(()=>v.value?b.value:0),elementSize:b,active:v,absolute:C(e,"absolute")});return Te(e,Ie),Ne({VBtn:{color:C(e,"color"),density:C(e,"density"),stacked:n(()=>e.mode!=="horizontal"),variant:"text"}},{scoped:!0}),$(()=>a(e.tag,{class:["v-bottom-navigation",{"v-bottom-navigation--active":v.value,"v-bottom-navigation--grow":e.grow,"v-bottom-navigation--shift":e.mode==="shift"},g.value,t.value,d.value,h.value,V.value,y.value,e.class],style:[f.value,u.value,{height:H(b.value),transform:`translateY(${H(v.value?0:100,"%")})`},r.value,e.style]},{default:()=>[c.default&&a("div",{class:"v-bottom-navigation__content"},[c.default()])]})),{}}});const vt=R({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...ae(),...O(),...oe(),...Y(),...X(),...j({tag:"footer"}),...q()},"VFooter"),mt=z()({name:"VFooter",props:vt(),setup(e,i){let{slots:c}=i;const{themeClasses:g}=Pe(e),{backgroundColorClasses:d,backgroundColorStyles:t}=W(C(e,"color")),{borderClasses:f}=le(e),{elevationClasses:h}=se(e),{roundedClasses:V}=J(e),y=L(32),{resizeRef:r}=Ae(u=>{u.length&&(y.value=u[0].target.clientHeight)}),b=n(()=>e.height==="auto"?y.value:parseInt(e.height,10)),{layoutItemStyles:v}=G({id:e.name,order:n(()=>parseInt(e.order,10)),position:n(()=>"bottom"),layoutSize:b,elementSize:n(()=>e.height==="auto"?void 0:b.value),active:n(()=>e.app),absolute:C(e,"absolute")});return $(()=>a(e.tag,{ref:r,class:["v-footer",g.value,d.value,f.value,h.value,V.value,e.class],style:[t.value,e.app?v.value:{height:H(e.height)},e.style]},c)),{}}});const gt=e=>(Ge("data-v-2b405ec8"),e=e(),Oe(),e),ft=gt(()=>ne("span",null,"登出",-1)),ht={__name:"ClientLayout",setup(e){const i=U(!1),c=U(0),g=Re(),d=ze(),t=$e(),f=De(),{apiAuth:h}=Xe(),{xs:V,sm:y,smAndUp:r}=Ee(),b=n(()=>r.value),v=n(()=>y.value),u=n(()=>V.value),S=n(()=>[{to:"/",text:"首頁",show:v.value,icon:"mdi-home"},{to:"/appoint",text:"預約掛號",show:!0,icon:"mdi-calendar"},{to:"/status",text:"看診進度",show:!0,icon:"mdi-calendar-search"},{to:"/setup",text:"註冊登入",show:!t.isLogin,icon:"mdi-login-variant"},{to:"/account",text:"個人帳號",show:t.isLogin,icon:"mdi-account"}]),k=async()=>{var x,o;try{await h.delete("/users/logout"),t.logout(),f({text:"登出成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"success",location:"bottom"}}),d.push("/")}catch(_){const l=((o=(x=_==null?void 0:_.responce)==null?void 0:x.data)==null?void 0:o.message)||"發生錯誤，請稍後再試";f({text:l,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"warning",location:"bottom"}})}};return(x,o)=>{const _=Fe("RouterView");return m(),w(I,null,[v.value?(m(),B(je,{key:0,modelValue:i.value,"onUpdate:modelValue":o[0]||(o[0]=l=>i.value=l),temporary:"",location:"right",theme:"dark"},{default:s(()=>[a(Qe,{nav:""},{default:s(()=>[(m(!0),w(I,null,M(S.value,l=>(m(),w(I,{key:l.to},[l.show?(m(),B(Z,{key:0,to:l.to,exact:""},{prepend:s(()=>[a(A,{icon:l.icon},null,8,["icon"])]),default:s(()=>[a(ee,null,{default:s(()=>[T(F(l.text),1)]),_:2},1024)]),_:2},1032,["to"])):p("",!0)],64))),128)),N(t).isLogin?(m(),B(Z,{key:0,onClick:k},{prepend:s(()=>[a(A,{icon:"mdi-logout"})]),default:s(()=>[a(ee,null,{default:s(()=>[T("登出")]),_:1})]),_:1})):p("",!0)]),_:1})]),_:1},8,["modelValue"])):p("",!0),b.value?(m(),B(lt,{key:1,flat:"",color:"rgba(255, 255, 255, 0)",height:"80","scroll-behavior":"fade-image inverted","scroll-threshold":"100"},{image:s(()=>[a(Me,{gradient:"45deg, #009688, #80CBC4"})]),default:s(()=>[a(Ze,{class:"d-flex align-center"},{default:s(()=>[a(P,{to:"/",active:!1},{default:s(()=>[a(rt,{style:{color:"#fff"},class:"font-weight-medium text-h5"},{default:s(()=>[T("台北動物醫院")]),_:1})]),_:1}),a(He),v.value?(m(),B(nt,{key:0,color:"#fff",onClick:o[1]||(o[1]=l=>i.value=!0)})):(m(),w("div",{key:1,class:"navbar",style:Ye(`--navbar-padding: ${N(t).isLogin?"0px 8px":"6px 8px"};`)},[(m(!0),w(I,null,M(S.value,l=>(m(),w(I,{key:l},[l.show?(m(),B(P,{key:0,to:l.to,"prepend-icon":l.icon,color:"teal",rounded:"",exact:""},{default:s(()=>[T(F(l.text),1)]),_:2},1032,["to","prepend-icon"])):p("",!0),l.show?(m(),B(A,{key:1,color:"teal"},{default:s(()=>[T("mdi-circle-small")]),_:1})):p("",!0)],64))),128)),a(P,{color:"teal",rounded:""},{default:s(()=>[a(it,{color:"#f2a73b",dot:""},{default:s(()=>[a(A,{size:"large"},{default:s(()=>[T("mdi-bell")]),_:1})]),_:1})]),_:1}),N(t).isLogin?(m(),B(P,{key:0,icon:"mdi-logout",color:"grey",onClick:k})):p("",!0)],4))]),_:1})]),_:1})):p("",!0),a(qe,{class:Ue({"bg-grey-lighten-3":N(g).name==="Account"||N(g).name==="Appoint"||N(g).name==="Status","pa-0":!0})},{default:s(()=>[a(_)]),_:1},8,["class"]),u.value?(m(),B(mt,{key:2},{default:s(()=>[a(et,{class:"overflow-visible",style:{height:"56px"}},{default:s(()=>[a(dt,{mode:"shift","bg-color":"teal",modelValue:c.value,"onUpdate:modelValue":o[2]||(o[2]=l=>c.value=l)},{default:s(()=>[(m(!0),w(I,null,M(S.value,l=>(m(),w(I,{key:l},[l.show?(m(),B(P,{key:0,to:l.to,exact:""},{default:s(()=>[a(A,null,{default:s(()=>[T(F(l.icon),1)]),_:2},1024),ne("span",null,F(l.text),1)]),_:2},1032,["to"])):p("",!0)],64))),128)),N(t).isLogin?(m(),B(P,{key:0,color:"grey",onClick:k},{default:s(()=>[a(A,null,{default:s(()=>[T("mdi-logout")]),_:1}),ft]),_:1})):p("",!0)]),_:1},8,["modelValue"])]),_:1})]),_:1})):p("",!0)],64)}}},Ct=Le(ht,[["__scopeId","data-v-2b405ec8"]]);export{Ct as default};
