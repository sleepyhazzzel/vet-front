import{br as vt,p as D,r as L,c as k,aa as W,j as oe,b8 as Q,bs as q,t as T,u as N,ao as G,as as H,bt as Z,bu as De,w as Fe,bv as _e,a as re,B as ee,bw as J,bx as gt,I as j,K as mt,l as Be,L as Ce,N as bt,q as yt,by as ht,v as Le,x as Ae,bl as xt,g as O,an as Pt,X as Oe,a2 as pt,s as St,T as se,Y as kt,ba as Y,f as R,h as d,V as M,i as B,bz as he,av as xe,bA as wt,U as E,bB as It,bC as Vt,bD as Tt,bE as Dt,z as Ft,bF as _t,ab as X,J as Bt,ad as Pe,aB as pe,ah as Ct,b6 as ue,Q as Lt}from"./index-928cbe6e.js";import{a as At,d as ce}from"./VSelect-85b188be.js";import{c as Ot}from"./VList-396ce3d5.js";function Se(e,l,t){return Object.keys(e).filter(a=>vt(a)&&a.endsWith(l)).reduce((a,n)=>(a[n.slice(0,-l.length)]=r=>e[n](r,t(r)),a),{})}const $t=(e,l,t)=>e==null||l==null?-1:e.toString().toLocaleLowerCase().indexOf(l.toString().toLocaleLowerCase()),Mt=D({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter");function Et(e,l,t){var s;const a=[],n=(t==null?void 0:t.default)??$t,r=t!=null&&t.filterKeys?Q(t.filterKeys):!1,o=Object.keys((t==null?void 0:t.customKeyFilter)??{}).length;if(!(e!=null&&e.length))return a;e:for(let u=0;u<e.length;u++){const[c,f=c]=Q(e[u]),g={},i={};let v=-1;if(l&&!(t!=null&&t.noFilter)){if(typeof c=="object"){const y=r||Object.keys(f);for(const h of y){const p=q(f,h,f),I=(s=t==null?void 0:t.customKeyFilter)==null?void 0:s[h];if(v=I?I(p,l,c):n(p,l,c),v!==-1&&v!==!1)I?g[h]=v:i[h]=v;else if((t==null?void 0:t.filterMode)==="every")continue e}}else v=n(c,l,c),v!==-1&&v!==!1&&(i.title=v);const b=Object.keys(i).length,m=Object.keys(g).length;if(!b&&!m||(t==null?void 0:t.filterMode)==="union"&&m!==o&&!b||(t==null?void 0:t.filterMode)==="intersection"&&(m!==o||!b))continue}a.push({index:u,matches:{...i,...g}})}return a}function Nt(e,l,t,a){const n=L([]),r=L(new Map),o=k(()=>a!=null&&a.transform?W(l).map(u=>[u,a.transform(u)]):W(l));oe(()=>{const u=typeof t=="function"?t():W(t),c=typeof u!="string"&&typeof u!="number"?"":String(u),f=Et(o.value,c,{customKeyFilter:{...e.customKeyFilter,...W(a==null?void 0:a.customKeyFilter)},default:e.customFilter,filterKeys:e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}),g=W(l),i=[],v=new Map;f.forEach(b=>{let{index:m,matches:y}=b;const h=g[m];i.push(h),v.set(h.value,y)}),n.value=i,r.value=v});function s(u){return r.value.get(u.value)}return{filteredItems:n,filteredMatches:r,getMatches:s}}const Rt=D({expandOnClick:Boolean,showExpand:Boolean,expanded:{type:Array,default:()=>[]}},"DataTable-expand"),$e=Symbol.for("vuetify:datatable:expanded");function jt(e){const l=T(e,"expandOnClick"),t=N(e,"expanded",e.expanded,s=>new Set(s),s=>[...s.values()]);function a(s,u){const c=new Set(t.value);u?c.add(s.value):c.delete(s.value),t.value=c}function n(s){return t.value.has(s.value)}function r(s){a(s,!n(s))}const o={expand:a,expanded:t,expandOnClick:l,isExpanded:n,toggleExpand:r};return G($e,o),o}function Me(){const e=H($e);if(!e)throw new Error("foo");return e}const Gt=D({groupBy:{type:Array,default:()=>[]}},"DataTable-group"),Ee=Symbol.for("vuetify:data-table-group");function Ht(e){return{groupBy:N(e,"groupBy")}}function Kt(e){const{groupBy:l,sortBy:t}=e,a=L(new Set),n=k(()=>l.value.map(c=>({...c,order:c.order??!1})).concat(t.value));function r(c){return a.value.has(c.id)}function o(c){const f=new Set(a.value);r(c)?f.delete(c.id):f.add(c.id),a.value=f}function s(c){function f(g){const i=[];for(const v of g.items)"type"in v&&v.type==="group"?i.push(...f(v)):i.push(v);return i}return f({type:"group",items:c,id:"dummy",key:"dummy",value:"dummy",depth:0})}const u={sortByWithGroups:n,toggleGroup:o,opened:a,groupBy:l,extractRows:s,isGroupOpen:r};return G(Ee,u),u}function Ne(){const e=H(Ee);if(!e)throw new Error("Missing group!");return e}function zt(e,l){if(!e.length)return[];const t=new Map;for(const a of e){const n=Z(a.raw,l);t.has(n)||t.set(n,[]),t.get(n).push(a)}return t}function Re(e,l){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"root";if(!l.length)return[];const n=zt(e,l[0]),r=[],o=l.slice(1);return n.forEach((s,u)=>{const c=l[0],f=`${a}_${c}_${u}`;r.push({depth:t,id:f,key:c,value:u,items:o.length?Re(s,o,t+1,f):s,type:"group"})}),r}function je(e,l){const t=[];for(const a of e)"type"in a&&a.type==="group"?(a.value!=null&&t.push(a),(l.has(a.id)||a.value==null)&&t.push(...je(a.items,l))):t.push(a);return t}function Ut(e,l,t){return{flatItems:k(()=>{if(!l.value.length)return e.value;const n=Re(e.value,l.value.map(r=>r.key));return je(n,t.value)})}}function Wt(e){let{page:l,itemsPerPage:t,sortBy:a,groupBy:n,search:r}=e;const o=De("VDataTable"),s=k(()=>({page:l.value,itemsPerPage:t.value,sortBy:a.value,groupBy:n.value,search:r.value}));let u=null;Fe(s,()=>{_e(u,s.value)||((u==null?void 0:u.search)!==s.value.search&&(l.value=1),o.emit("update:options",s.value),u=s.value)},{deep:!0,immediate:!0})}const qt=D({page:{type:[Number,String],default:1},itemsPerPage:{type:[Number,String],default:10}},"DataTable-paginate"),Ge=Symbol.for("vuetify:data-table-pagination");function Qt(e){const l=N(e,"page",void 0,a=>+(a??1)),t=N(e,"itemsPerPage",void 0,a=>+(a??10));return{page:l,itemsPerPage:t}}function Xt(e){const{page:l,itemsPerPage:t,itemsLength:a}=e,n=k(()=>t.value===-1?0:t.value*(l.value-1)),r=k(()=>t.value===-1?a.value:Math.min(a.value,n.value+t.value)),o=k(()=>t.value===-1||a.value===0?1:Math.ceil(a.value/t.value));oe(()=>{l.value>o.value&&(l.value=o.value)});function s(i){t.value=i,l.value=1}function u(){l.value=re(l.value+1,1,o.value)}function c(){l.value=re(l.value-1,1,o.value)}function f(i){l.value=re(i,1,o.value)}const g={page:l,itemsPerPage:t,startIndex:n,stopIndex:r,pageCount:o,itemsLength:a,nextPage:u,prevPage:c,setPage:f,setItemsPerPage:s};return G(Ge,g),g}function Jt(){const e=H(Ge);if(!e)throw new Error("Missing pagination!");return e}function Yt(e){const l=De("usePaginatedItems"),{items:t,startIndex:a,stopIndex:n,itemsPerPage:r}=e,o=k(()=>r.value<=0?t.value:t.value.slice(a.value,n.value));return Fe(o,s=>{l.emit("update:currentItems",s)}),{paginatedItems:o}}const Zt={showSelectAll:!1,allSelected:()=>[],select:e=>{var a;let{items:l,value:t}=e;return new Set(t?[(a=l[0])==null?void 0:a.value]:[])},selectAll:e=>{let{selected:l}=e;return l}},He={showSelectAll:!0,allSelected:e=>{let{currentPage:l}=e;return l},select:e=>{let{items:l,value:t,selected:a}=e;for(const n of l)t?a.add(n.value):a.delete(n.value);return a},selectAll:e=>{let{value:l,currentPage:t,selected:a}=e;return He.select({items:t,value:l,selected:a})}},Ke={showSelectAll:!0,allSelected:e=>{let{allItems:l}=e;return l},select:e=>{let{items:l,value:t,selected:a}=e;for(const n of l)t?a.add(n.value):a.delete(n.value);return a},selectAll:e=>{let{value:l,allItems:t,selected:a}=e;return Ke.select({items:t,value:l,selected:a})}},ea=D({showSelect:Boolean,selectStrategy:{type:[String,Object],default:"page"},modelValue:{type:Array,default:()=>[]},valueComparator:{type:Function,default:_e}},"DataTable-select"),ze=Symbol.for("vuetify:data-table-selection");function ta(e,l){let{allItems:t,currentPage:a}=l;const n=N(e,"modelValue",e.modelValue,y=>new Set(Q(y).map(h=>{var p;return((p=t.value.find(I=>e.valueComparator(h,I.value)))==null?void 0:p.value)??h})),y=>[...y.values()]),r=k(()=>t.value.filter(y=>y.selectable)),o=k(()=>a.value.filter(y=>y.selectable)),s=k(()=>{if(typeof e.selectStrategy=="object")return e.selectStrategy;switch(e.selectStrategy){case"single":return Zt;case"all":return Ke;case"page":default:return He}});function u(y){return Q(y).every(h=>n.value.has(h.value))}function c(y){return Q(y).some(h=>n.value.has(h.value))}function f(y,h){const p=s.value.select({items:y,value:h,selected:new Set(n.value)});n.value=p}function g(y){f([y],!u([y]))}function i(y){const h=s.value.selectAll({value:y,allItems:r.value,currentPage:o.value,selected:new Set(n.value)});n.value=h}const v=k(()=>n.value.size>0),b=k(()=>{const y=s.value.allSelected({allItems:r.value,currentPage:o.value});return!!y.length&&u(y)}),m={toggleSelect:g,select:f,selectAll:i,isSelected:u,isSomeSelected:c,someSelected:v,allSelected:b,showSelectAll:s.value.showSelectAll};return G(ze,m),m}function te(){const e=H(ze);if(!e)throw new Error("Missing selection!");return e}const aa=D({sortBy:{type:Array,default:()=>[]},customKeySort:Object,multiSort:Boolean,mustSort:Boolean},"DataTable-sort"),Ue=Symbol.for("vuetify:data-table-sort");function la(e){const l=N(e,"sortBy"),t=T(e,"mustSort"),a=T(e,"multiSort");return{sortBy:l,mustSort:t,multiSort:a}}function na(e){const{sortBy:l,mustSort:t,multiSort:a,page:n}=e,r=u=>{if(u.key==null)return;let c=l.value.map(g=>({...g}))??[];const f=c.find(g=>g.key===u.key);f?f.order==="desc"?t.value?f.order="asc":c=c.filter(g=>g.key!==u.key):f.order="desc":a.value?c=[...c,{key:u.key,order:"asc"}]:c=[{key:u.key,order:"asc"}],l.value=c,n&&(n.value=1)};function o(u){return!!l.value.find(c=>c.key===u.key)}const s={sortBy:l,toggleSort:r,isSorted:o};return G(Ue,s),s}function ra(){const e=H(Ue);if(!e)throw new Error("Missing sort!");return e}function ua(e,l,t,a,n){const r=ee();return{sortedItems:k(()=>t.value.length?sa(l.value,t.value,r.current.value,{...e.customKeySort,...a==null?void 0:a.value},n==null?void 0:n.value):l.value)}}function sa(e,l,t,a,n){const r=new Intl.Collator(t,{sensitivity:"accent",usage:"sort"});return[...e].sort((o,s)=>{for(let u=0;u<l.length;u++){const c=l[u].key,f=l[u].order??"asc";if(f===!1)continue;let g=Z(o.raw,c),i=Z(s.raw,c),v=o.raw,b=s.raw;if(f==="desc"&&([g,i]=[i,g],[v,b]=[b,v]),n!=null&&n[c]){const m=n[c](v,b);if(!m)continue;return m}if(a!=null&&a[c]){const m=a[c](g,i);if(!m)continue;return m}if(g instanceof Date&&i instanceof Date)return g.getTime()-i.getTime();if([g,i]=[g,i].map(m=>m!=null?m.toString().toLocaleLowerCase():m),g!==i)return J(g)&&J(i)?0:J(g)?-1:J(i)?1:!isNaN(g)&&!isNaN(i)?Number(g)-Number(i):r.compare(g,i)}return 0})}function ia(){const e=L([]);gt(()=>e.value=[]);function l(t,a){e.value[a]=t}return{refs:e,updateRef:l}}const oa=D({activeColor:String,start:{type:[Number,String],default:1},modelValue:{type:Number,default:e=>e.start},disabled:Boolean,length:{type:[Number,String],default:1,validator:e=>e%1===0},totalVisible:[Number,String],firstIcon:{type:j,default:"$first"},prevIcon:{type:j,default:"$prev"},nextIcon:{type:j,default:"$next"},lastIcon:{type:j,default:"$last"},ariaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.root"},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},firstAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.first"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},lastAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.last"},ellipsis:{type:String,default:"..."},showFirstLastPage:Boolean,...mt(),...Be(),...Ce(),...bt(),...yt(),...ht(),...Le({tag:"nav"}),...Ae(),...xt({variant:"text"})},"VPagination"),ke=O()({name:"VPagination",props:oa(),emits:{"update:modelValue":e=>!0,first:e=>!0,prev:e=>!0,next:e=>!0,last:e=>!0},setup(e,l){let{slots:t,emit:a}=l;const n=N(e,"modelValue"),{t:r,n:o}=ee(),{isRtl:s}=Pt(),{themeClasses:u}=Oe(e),{width:c}=pt(),f=St(-1);se(void 0,{scoped:!0});const{resizeRef:g}=kt(P=>{if(!P.length)return;const{target:S,contentRect:w}=P[0],V=S.querySelector(".v-pagination__list > *");if(!V)return;const _=w.width,$=V.offsetWidth+parseFloat(getComputedStyle(V).marginRight)*2;f.value=m(_,$)}),i=k(()=>parseInt(e.length,10)),v=k(()=>parseInt(e.start,10)),b=k(()=>e.totalVisible!=null?parseInt(e.totalVisible,10):f.value>=0?f.value:m(c.value,58));function m(P,S){const w=e.showFirstLastPage?5:3;return Math.max(0,Math.floor(+((P-S*w)/S).toFixed(2)))}const y=k(()=>{if(i.value<=0||isNaN(i.value)||i.value>Number.MAX_SAFE_INTEGER)return[];if(b.value<=0)return[];if(b.value===1)return[n.value];if(i.value<=b.value)return Y(i.value,v.value);const P=b.value%2===0,S=P?b.value/2:Math.floor(b.value/2),w=P?S:S+1,V=i.value-S;if(w-n.value>=0)return[...Y(Math.max(1,b.value-1),v.value),e.ellipsis,i.value];if(n.value-V>=(P?1:0)){const _=b.value-1,$=i.value-_+v.value;return[v.value,e.ellipsis,...Y(_,$)]}else{const _=Math.max(1,b.value-3),$=_===1?n.value:n.value-Math.ceil(_/2)+v.value;return[v.value,e.ellipsis,...Y(_,$),e.ellipsis,i.value]}});function h(P,S,w){P.preventDefault(),n.value=S,w&&a(w,S)}const{refs:p,updateRef:I}=ia();se({VPaginationBtn:{color:T(e,"color"),border:T(e,"border"),density:T(e,"density"),size:T(e,"size"),variant:T(e,"variant"),rounded:T(e,"rounded"),elevation:T(e,"elevation")}});const x=k(()=>y.value.map((P,S)=>{const w=V=>I(V,S);if(typeof P=="string")return{isActive:!1,key:`ellipsis-${S}`,page:P,props:{ref:w,ellipsis:!0,icon:!0,disabled:!0}};{const V=P===n.value;return{isActive:V,key:P,page:o(P),props:{ref:w,ellipsis:!1,icon:!0,disabled:!!e.disabled||+e.length<2,color:V?e.activeColor:e.color,"aria-current":V,"aria-label":r(V?e.currentPageAriaLabel:e.pageAriaLabel,P),onClick:_=>h(_,P)}}}})),F=k(()=>{const P=!!e.disabled||n.value<=v.value,S=!!e.disabled||n.value>=v.value+i.value-1;return{first:e.showFirstLastPage?{icon:s.value?e.lastIcon:e.firstIcon,onClick:w=>h(w,v.value,"first"),disabled:P,"aria-label":r(e.firstAriaLabel),"aria-disabled":P}:void 0,prev:{icon:s.value?e.nextIcon:e.prevIcon,onClick:w=>h(w,n.value-1,"prev"),disabled:P,"aria-label":r(e.previousAriaLabel),"aria-disabled":P},next:{icon:s.value?e.prevIcon:e.nextIcon,onClick:w=>h(w,n.value+1,"next"),disabled:S,"aria-label":r(e.nextAriaLabel),"aria-disabled":S},last:e.showFirstLastPage?{icon:s.value?e.firstIcon:e.lastIcon,onClick:w=>h(w,v.value+i.value-1,"last"),disabled:S,"aria-label":r(e.lastAriaLabel),"aria-disabled":S}:void 0}});function A(){var S;const P=n.value-v.value;(S=p.value[P])==null||S.$el.focus()}function K(P){P.key===he.left&&!e.disabled&&n.value>+e.start?(n.value=n.value-1,xe(A)):P.key===he.right&&!e.disabled&&n.value<v.value+i.value-1&&(n.value=n.value+1,xe(A))}return R(()=>d(e.tag,{ref:g,class:["v-pagination",u.value,e.class],style:e.style,role:"navigation","aria-label":r(e.ariaLabel),onKeydown:K,"data-test":"v-pagination-root"},{default:()=>[d("ul",{class:"v-pagination__list"},[e.showFirstLastPage&&d("li",{key:"first",class:"v-pagination__first","data-test":"v-pagination-first"},[t.first?t.first(F.value.first):d(M,B({_as:"VPaginationBtn"},F.value.first),null)]),d("li",{key:"prev",class:"v-pagination__prev","data-test":"v-pagination-prev"},[t.prev?t.prev(F.value.prev):d(M,B({_as:"VPaginationBtn"},F.value.prev),null)]),x.value.map((P,S)=>d("li",{key:P.key,class:["v-pagination__item",{"v-pagination__item--is-active":P.isActive}],"data-test":"v-pagination-item"},[t.item?t.item(P):d(M,B({_as:"VPaginationBtn"},P.props),{default:()=>[P.page]})])),d("li",{key:"next",class:"v-pagination__next","data-test":"v-pagination-next"},[t.next?t.next(F.value.next):d(M,B({_as:"VPaginationBtn"},F.value.next),null)]),e.showFirstLastPage&&d("li",{key:"last",class:"v-pagination__last","data-test":"v-pagination-last"},[t.last?t.last(F.value.last):d(M,B({_as:"VPaginationBtn"},F.value.last),null)])])]})),{}}}),We=D({prevIcon:{type:String,default:"$prev"},nextIcon:{type:String,default:"$next"},firstIcon:{type:String,default:"$first"},lastIcon:{type:String,default:"$last"},itemsPerPageText:{type:String,default:"$vuetify.dataFooter.itemsPerPageText"},pageText:{type:String,default:"$vuetify.dataFooter.pageText"},firstPageLabel:{type:String,default:"$vuetify.dataFooter.firstPage"},prevPageLabel:{type:String,default:"$vuetify.dataFooter.prevPage"},nextPageLabel:{type:String,default:"$vuetify.dataFooter.nextPage"},lastPageLabel:{type:String,default:"$vuetify.dataFooter.lastPage"},itemsPerPageOptions:{type:Array,default:()=>[{value:10,title:"10"},{value:25,title:"25"},{value:50,title:"50"},{value:100,title:"100"},{value:-1,title:"$vuetify.dataFooter.itemsPerPageAll"}]},showCurrentPage:Boolean},"VDataTableFooter"),we=O()({name:"VDataTableFooter",props:We(),setup(e,l){let{slots:t}=l;const{t:a}=ee(),{page:n,pageCount:r,startIndex:o,stopIndex:s,itemsLength:u,itemsPerPage:c,setItemsPerPage:f}=Jt(),g=k(()=>e.itemsPerPageOptions.map(i=>typeof i=="number"?{value:i,title:i===-1?a("$vuetify.dataFooter.itemsPerPageAll"):String(i)}:{...i,title:a(i.title)}));return R(()=>{var v;const i=ke.filterProps(e);return d("div",{class:"v-data-table-footer"},[(v=t.prepend)==null?void 0:v.call(t),d("div",{class:"v-data-table-footer__items-per-page"},[d("span",null,[a(e.itemsPerPageText)]),d(At,{items:g.value,modelValue:c.value,"onUpdate:modelValue":b=>f(Number(b)),density:"compact",variant:"outlined","hide-details":!0},null)]),d("div",{class:"v-data-table-footer__info"},[d("div",null,[a(e.pageText,u.value?o.value+1:0,s.value,u.value)])]),d("div",{class:"v-data-table-footer__pagination"},[d(ke,B({modelValue:n.value,"onUpdate:modelValue":b=>n.value=b,density:"comfortable","first-aria-label":e.firstPageLabel,"last-aria-label":e.lastPageLabel,length:r.value,"next-aria-label":e.nextPageLabel,"previous-aria-label":e.prevPageLabel,rounded:!0,"show-first-last-page":!0,"total-visible":e.showCurrentPage?1:0,variant:"plain"},i),null)])])}),{}}}),de=wt({align:{type:String,default:"start"},fixed:Boolean,fixedOffset:[Number,String],height:[Number,String],lastFixed:Boolean,noPadding:Boolean,tag:String,width:[Number,String]},(e,l)=>{let{slots:t}=l;const a=e.tag??"td";return d(a,{class:["v-data-table__td",{"v-data-table-column--fixed":e.fixed,"v-data-table-column--last-fixed":e.lastFixed,"v-data-table-column--no-padding":e.noPadding},`v-data-table-column--align-${e.align}`],style:{height:E(e.height),width:E(e.width),left:E(e.fixedOffset||null)}},{default:()=>{var n;return[(n=t.default)==null?void 0:n.call(t)]}})}),ca=D({headers:Array},"DataTable-header"),qe=Symbol.for("vuetify:data-table-headers"),Qe={title:"",sortable:!1},da={...Qe,width:48};function fa(){const l=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:[]).map(t=>({element:t,priority:0}));return{enqueue:(t,a)=>{let n=!1;for(let r=0;r<l.length;r++)if(l[r].priority>a){l.splice(r,0,{element:t,priority:a}),n=!0;break}n||l.push({element:t,priority:a})},size:()=>l.length,count:()=>{let t=0;if(!l.length)return 0;const a=Math.floor(l[0].priority);for(let n=0;n<l.length;n++)Math.floor(l[n].priority)===a&&(t+=1);return t},dequeue:()=>l.shift()}}function ie(e){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];if(!e.children)l.push(e);else for(const t of e.children)ie(t,l);return l}function Xe(e){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:new Set;for(const t of e)t.key&&l.add(t.key),t.children&&Xe(t.children,l);return l}function va(e){if(e.key){if(e.key==="data-table-group")return Qe;if(["data-table-expand","data-table-select"].includes(e.key))return da}}function fe(e){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return e.children?Math.max(l,...e.children.map(t=>fe(t,l+1))):l}function ga(e){let l=!1;function t(r){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;if(r)if(o&&(r.fixed=!0),r.fixed)if(r.children)for(let s=r.children.length-1;s>=0;s--)t(r.children[s],!0);else l?isNaN(+r.width)&&Vt(`Multiple fixed columns should have a static width (key: ${r.key})`):r.lastFixed=!0,l=!0;else if(r.children)for(let s=r.children.length-1;s>=0;s--)t(r.children[s]);else l=!1}for(let r=e.length-1;r>=0;r--)t(e[r]);function a(r){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;if(!r)return o;if(r.children){r.fixedOffset=o;for(const s of r.children)o=a(s,o)}else r.fixed&&(r.fixedOffset=o,o+=parseFloat(r.width||"0")||0);return o}let n=0;for(const r of e)n=a(r,n)}function ma(e,l){const t=[];let a=0;const n=fa(e);for(;n.size()>0;){let o=n.count();const s=[];let u=1;for(;o>0;){const{element:c,priority:f}=n.dequeue(),g=l-a-fe(c);if(s.push({...c,rowspan:g??1,colspan:c.children?ie(c).length:1}),c.children)for(const i of c.children){const v=f%1+u/Math.pow(10,a+2);n.enqueue(i,a+g+v)}u+=1,o-=1}a+=1,t.push(s)}return{columns:e.map(o=>ie(o)).flat(),headers:t}}function Je(e){const l=[];for(const t of e){const a={...va(t),...t},n=a.key??(typeof a.value=="string"?a.value:null),r=a.value??n??null,o={...a,key:n,value:r,sortable:a.sortable??(a.key!=null||!!a.sort),children:a.children?Je(a.children):void 0};l.push(o)}return l}function ba(e,l){const t=L([]),a=L([]),n=L({}),r=L({}),o=L({});oe(()=>{var m,y,h;const c=(e.headers||Object.keys(e.items[0]??{}).map(p=>({key:p,title:It(p)}))).slice(),f=Xe(c);(m=l==null?void 0:l.groupBy)!=null&&m.value.length&&!f.has("data-table-group")&&c.unshift({key:"data-table-group",title:"Group"}),(y=l==null?void 0:l.showSelect)!=null&&y.value&&!f.has("data-table-select")&&c.unshift({key:"data-table-select"}),(h=l==null?void 0:l.showExpand)!=null&&h.value&&!f.has("data-table-expand")&&c.push({key:"data-table-expand"});const g=Je(c);ga(g);const i=Math.max(...g.map(p=>fe(p)))+1,v=ma(g,i);t.value=v.headers,a.value=v.columns;const b=v.headers.flat(1);for(const p of b)p.key&&(p.sortable&&(p.sort&&(n.value[p.key]=p.sort),p.sortRaw&&(r.value[p.key]=p.sortRaw)),p.filter&&(o.value[p.key]=p.filter))});const s={headers:t,columns:a,sortFunctions:n,sortRawFunctions:r,filterFunctions:o};return G(qe,s),s}function ae(){const e=H(qe);if(!e)throw new Error("Missing headers!");return e}const Ye=D({color:String,sticky:Boolean,multiSort:Boolean,sortAscIcon:{type:j,default:"$sortAsc"},sortDescIcon:{type:j,default:"$sortDesc"},headerProps:{type:Object},...Tt()},"VDataTableHeaders"),Ie=O()({name:"VDataTableHeaders",props:Ye(),setup(e,l){let{slots:t}=l;const{toggleSort:a,sortBy:n,isSorted:r}=ra(),{someSelected:o,allSelected:s,selectAll:u,showSelectAll:c}=te(),{columns:f,headers:g}=ae(),{loaderClasses:i}=Dt(e);function v(I,x){if(!(!e.sticky&&!I.fixed))return{position:"sticky",left:I.fixed?E(I.fixedOffset):void 0,top:e.sticky?`calc(var(--v-table-header-height) * ${x})`:void 0}}function b(I){const x=n.value.find(F=>F.key===I.key);return x?x.order==="asc"?e.sortAscIcon:e.sortDescIcon:e.sortAscIcon}const{backgroundColorClasses:m,backgroundColorStyles:y}=Ft(e,"color"),h=k(()=>({headers:g.value,columns:f.value,toggleSort:a,isSorted:r,sortBy:n.value,someSelected:o.value,allSelected:s.value,selectAll:u,getSortIcon:b})),p=I=>{let{column:x,x:F,y:A}=I;const K=x.key==="data-table-select"||x.key==="data-table-expand",P=B(e.headerProps??{},x.headerProps??{});return d(de,B({tag:"th",align:x.align,class:["v-data-table__th",{"v-data-table__th--sortable":x.sortable,"v-data-table__th--sorted":r(x),"v-data-table__th--fixed":x.fixed,"v-data-table__th--sticky":e.sticky},i.value],style:{width:E(x.width),minWidth:E(x.minWidth),...v(x,A)},colspan:x.colspan,rowspan:x.rowspan,onClick:x.sortable?()=>a(x):void 0,fixed:x.fixed,lastFixed:x.lastFixed,noPadding:K},P),{default:()=>{var V;const S=`header.${x.key}`,w={column:x,selectAll:u,isSorted:r,toggleSort:a,sortBy:n.value,someSelected:o.value,allSelected:s.value,getSortIcon:b};return t[S]?t[S](w):x.key==="data-table-select"?((V=t["header.data-table-select"])==null?void 0:V.call(t,w))??(c&&d(ce,{modelValue:s.value,indeterminate:o.value&&!s.value,"onUpdate:modelValue":u},null)):d("div",{class:"v-data-table-header__content"},[d("span",null,[x.title]),x.sortable&&d(Bt,{key:"icon",class:"v-data-table-header__sort-icon",icon:b(x)},null),e.multiSort&&r(x)&&d("div",{key:"badge",class:["v-data-table-header__sort-badge",...m.value],style:y.value},[n.value.findIndex(_=>_.key===x.key)+1])])}})};R(()=>d(X,null,[t.headers?t.headers(h.value):g.value.map((I,x)=>d("tr",null,[I.map((F,A)=>d(p,{column:F,x:A,y:x},null))])),e.loading&&d("tr",{class:"v-data-table-progress"},[d("th",{colspan:f.value.length},[d(_t,{name:"v-data-table-progress",absolute:!0,active:!0,color:typeof e.loading=="boolean"?void 0:e.loading,indeterminate:!0},{default:t.loader})])])]))}}),ya=D({item:{type:Object,required:!0}},"VDataTableGroupHeaderRow"),ha=O()({name:"VDataTableGroupHeaderRow",props:ya(),setup(e,l){let{slots:t}=l;const{isGroupOpen:a,toggleGroup:n,extractRows:r}=Ne(),{isSelected:o,isSomeSelected:s,select:u}=te(),{columns:c}=ae(),f=k(()=>r([e.item]));return()=>d("tr",{class:"v-data-table-group-header-row",style:{"--v-data-table-group-header-row-depth":e.item.depth}},[c.value.map(g=>{var i,v;if(g.key==="data-table-group"){const b=a(e.item)?"$expand":"$next",m=()=>n(e.item);return((i=t["data-table-group"])==null?void 0:i.call(t,{item:e.item,count:f.value.length,props:{icon:b,onClick:m}}))??d(de,{class:"v-data-table-group-header-row__column"},{default:()=>[d(M,{size:"small",variant:"text",icon:b,onClick:m},null),d("span",null,[e.item.value]),d("span",null,[Pe("("),f.value.length,Pe(")")])]})}if(g.key==="data-table-select"){const b=o(f.value),m=s(f.value)&&!b,y=h=>u(f.value,h);return((v=t["data-table-select"])==null?void 0:v.call(t,{props:{modelValue:b,indeterminate:m,"onUpdate:modelValue":y}}))??d("td",null,[d(ce,{modelValue:b,indeterminate:m,"onUpdate:modelValue":y},null)])}return d("td",null,null)})])}}),xa=D({index:Number,item:Object,cellProps:[Object,Function],onClick:ue(),onContextmenu:ue(),onDblclick:ue()},"VDataTableRow"),Pa=O()({name:"VDataTableRow",props:xa(),setup(e,l){let{slots:t}=l;const{isSelected:a,toggleSelect:n}=te(),{isExpanded:r,toggleExpand:o}=Me(),{columns:s}=ae();R(()=>d("tr",{class:["v-data-table__tr",{"v-data-table__tr--clickable":!!(e.onClick||e.onContextmenu||e.onDblclick)}],onClick:e.onClick,onContextmenu:e.onContextmenu,onDblclick:e.onDblclick},[e.item&&s.value.map((u,c)=>{const f=e.item,g=`item.${u.key}`,i={index:e.index,item:f.raw,internalItem:f,value:Z(f.columns,u.key),column:u,isSelected:a,toggleSelect:n,isExpanded:r,toggleExpand:o},v=typeof e.cellProps=="function"?e.cellProps({index:i.index,item:i.item,internalItem:i.internalItem,value:i.value,column:u}):e.cellProps,b=typeof u.cellProps=="function"?u.cellProps({index:i.index,item:i.item,internalItem:i.internalItem,value:i.value}):u.cellProps;return d(de,B({align:u.align,fixed:u.fixed,fixedOffset:u.fixedOffset,lastFixed:u.lastFixed,noPadding:u.key==="data-table-select"||u.key==="data-table-expand",width:u.width},v,b),{default:()=>{var m,y;return t[g]?t[g](i):u.key==="data-table-select"?((m=t["item.data-table-select"])==null?void 0:m.call(t,i))??d(ce,{disabled:!f.selectable,modelValue:a([f]),onClick:pe(()=>n(f),["stop"])},null):u.key==="data-table-expand"?((y=t["item.data-table-expand"])==null?void 0:y.call(t,i))??d(M,{icon:r(f)?"$collapse":"$expand",size:"small",variant:"text",onClick:pe(()=>o(f),["stop"])},null):Ct(i.value)}})})]))}}),Ze=D({loading:[Boolean,String],loadingText:{type:String,default:"$vuetify.dataIterator.loadingText"},hideNoData:Boolean,items:{type:Array,default:()=>[]},noDataText:{type:String,default:"$vuetify.noDataText"},rowProps:[Object,Function],cellProps:[Object,Function]},"VDataTableRows"),Ve=O()({name:"VDataTableRows",inheritAttrs:!1,props:Ze(),setup(e,l){let{attrs:t,slots:a}=l;const{columns:n}=ae(),{expandOnClick:r,toggleExpand:o,isExpanded:s}=Me(),{isSelected:u,toggleSelect:c}=te(),{toggleGroup:f,isGroupOpen:g}=Ne(),{t:i}=ee();return R(()=>{var v,b;return e.loading&&(!e.items.length||a.loading)?d("tr",{class:"v-data-table-rows-loading",key:"loading"},[d("td",{colspan:n.value.length},[((v=a.loading)==null?void 0:v.call(a))??i(e.loadingText)])]):!e.loading&&!e.items.length&&!e.hideNoData?d("tr",{class:"v-data-table-rows-no-data",key:"no-data"},[d("td",{colspan:n.value.length},[((b=a["no-data"])==null?void 0:b.call(a))??i(e.noDataText)])]):d(X,null,[e.items.map((m,y)=>{var I;if(m.type==="group"){const x={index:y,item:m,columns:n.value,isExpanded:s,toggleExpand:o,isSelected:u,toggleSelect:c,toggleGroup:f,isGroupOpen:g};return a["group-header"]?a["group-header"](x):d(ha,B({key:`group-header_${m.id}`,item:m},Se(t,":group-header",()=>x)),a)}const h={index:y,item:m.raw,internalItem:m,columns:n.value,isExpanded:s,toggleExpand:o,isSelected:u,toggleSelect:c},p={...h,props:B({key:`item_${m.key??m.index}`,onClick:r.value?()=>{o(m)}:void 0,index:y,item:m,cellProps:e.cellProps},Se(t,":row",()=>h),typeof e.rowProps=="function"?e.rowProps({item:h.item,index:h.index,internalItem:h.internalItem}):e.rowProps)};return d(X,{key:p.props.key},[a.item?a.item(p):d(Pa,p.props,a),s(m)&&((I=a["expanded-row"])==null?void 0:I.call(a,h))])})])}),{}}});const et=D({fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,...Be(),...Ce(),...Le(),...Ae()},"VTable"),Te=O()({name:"VTable",props:et(),setup(e,l){let{slots:t,emit:a}=l;const{themeClasses:n}=Oe(e),{densityClasses:r}=Lt(e);return R(()=>d(e.tag,{class:["v-table",{"v-table--fixed-height":!!e.height,"v-table--fixed-header":e.fixedHeader,"v-table--fixed-footer":e.fixedFooter,"v-table--has-top":!!t.top,"v-table--has-bottom":!!t.bottom,"v-table--hover":e.hover},n.value,r.value,e.class],style:e.style},{default:()=>{var o,s,u;return[(o=t.top)==null?void 0:o.call(t),t.default?d("div",{class:"v-table__wrapper",style:{height:E(e.height)}},[d("table",null,[t.default()])]):(s=t.wrapper)==null?void 0:s.call(t),(u=t.bottom)==null?void 0:u.call(t)]}})),{}}}),pa=D({items:{type:Array,default:()=>[]},itemValue:{type:[String,Array,Function],default:"id"},itemSelectable:{type:[String,Array,Function],default:null},rowProps:[Object,Function],cellProps:[Object,Function],returnObject:Boolean},"DataTable-items");function Sa(e,l,t,a){const n=e.returnObject?l:q(l,e.itemValue),r=q(l,e.itemSelectable,!0),o=a.reduce((s,u)=>(u.key!=null&&(s[u.key]=q(l,u.value)),s),{});return{type:"item",key:e.returnObject?q(l,e.itemValue):n,index:t,value:n,selectable:r,columns:o,raw:l}}function ka(e,l,t){return l.map((a,n)=>Sa(e,a,n,t))}function wa(e,l){return{items:k(()=>ka(e,e.items,l.value))}}const Ia=D({...Ze(),width:[String,Number],search:String,...Rt(),...Gt(),...ca(),...pa(),...ea(),...aa(),...Ye(),...et()},"DataTable"),Va=D({...qt(),...Ia(),...Mt(),...We()},"VDataTable"),_a=O()({name:"VDataTable",props:Va(),emits:{"update:modelValue":e=>!0,"update:page":e=>!0,"update:itemsPerPage":e=>!0,"update:sortBy":e=>!0,"update:options":e=>!0,"update:groupBy":e=>!0,"update:expanded":e=>!0,"update:currentItems":e=>!0},setup(e,l){let{attrs:t,slots:a}=l;const{groupBy:n}=Ht(e),{sortBy:r,multiSort:o,mustSort:s}=la(e),{page:u,itemsPerPage:c}=Qt(e),{columns:f,headers:g,sortFunctions:i,sortRawFunctions:v,filterFunctions:b}=ba(e,{groupBy:n,showSelect:T(e,"showSelect"),showExpand:T(e,"showExpand")}),{items:m}=wa(e,f),y=T(e,"search"),{filteredItems:h}=Nt(e,m,y,{transform:z=>z.columns,customKeyFilter:b}),{toggleSort:p}=na({sortBy:r,multiSort:o,mustSort:s,page:u}),{sortByWithGroups:I,opened:x,extractRows:F,isGroupOpen:A,toggleGroup:K}=Kt({groupBy:n,sortBy:r}),{sortedItems:P}=ua(e,h,I,i,v),{flatItems:S}=Ut(P,n,x),w=k(()=>S.value.length),{startIndex:V,stopIndex:_,pageCount:$,setItemsPerPage:tt}=Xt({page:u,itemsPerPage:c,itemsLength:w}),{paginatedItems:le}=Yt({items:S,startIndex:V,stopIndex:_,itemsPerPage:c}),ne=k(()=>F(le.value)),{isSelected:at,select:lt,selectAll:nt,toggleSelect:rt,someSelected:ut,allSelected:st}=ta(e,{allItems:m,currentPage:ne}),{isExpanded:it,toggleExpand:ot}=jt(e);Wt({page:u,itemsPerPage:c,sortBy:r,groupBy:n,search:y}),se({VDataTableRows:{hideNoData:T(e,"hideNoData"),noDataText:T(e,"noDataText"),loading:T(e,"loading"),loadingText:T(e,"loadingText")}});const C=k(()=>({page:u.value,itemsPerPage:c.value,sortBy:r.value,pageCount:$.value,toggleSort:p,setItemsPerPage:tt,someSelected:ut.value,allSelected:st.value,isSelected:at,select:lt,selectAll:nt,toggleSelect:rt,isExpanded:it,toggleExpand:ot,isGroupOpen:A,toggleGroup:K,items:ne.value.map(z=>z.raw),internalItems:ne.value,groupedItems:le.value,columns:f.value,headers:g.value}));return R(()=>{const z=we.filterProps(e),ct=Ie.filterProps(e),dt=Ve.filterProps(e),ft=Te.filterProps(e);return d(Te,B({class:["v-data-table",{"v-data-table--show-select":e.showSelect,"v-data-table--loading":e.loading},e.class],style:e.style},ft),{top:()=>{var U;return(U=a.top)==null?void 0:U.call(a,C.value)},default:()=>{var U,ve,ge,me,be,ye;return a.default?a.default(C.value):d(X,null,[(U=a.colgroup)==null?void 0:U.call(a,C.value),d("thead",null,[d(Ie,ct,a)]),(ve=a.thead)==null?void 0:ve.call(a,C.value),d("tbody",null,[(ge=a["body.prepend"])==null?void 0:ge.call(a,C.value),a.body?a.body(C.value):d(Ve,B(t,dt,{items:le.value}),a),(me=a["body.append"])==null?void 0:me.call(a,C.value)]),(be=a.tbody)==null?void 0:be.call(a,C.value),(ye=a.tfoot)==null?void 0:ye.call(a,C.value)])},bottom:()=>a.bottom?a.bottom(C.value):d(X,null,[d(Ot,null,null),d(we,z,{prepend:a["footer.prepend"]})])})}),{}}});export{_a as V};
