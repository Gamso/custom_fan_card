function t(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,f=_.trustedTypes,m=f?f.emptyScript:"",g=_.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,S=t=>t,A=x.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+k,P=`<${O}>`,M=document,T=()=>M.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,D="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,L=/>/g,z=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,V=/"/g,I=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),F=new WeakMap,q=M.createTreeWalker(M,129);function G(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=R;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(o.lastIndex=d,c=o.exec(i),null!==c);)d=o.lastIndex,o===R?"!--"===c[1]?o=H:void 0!==c[1]?o=L:void 0!==c[2]?(I.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=z):void 0!==c[3]&&(o=z):o===z?">"===c[0]?(o=r??R,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?z:'"'===c[3]?V:j):o===V||o===j?o=z:o===H||o===L?o=R:(o=z,r=void 0);const h=o===z&&t[e+1].startsWith("/>")?" ":"";n+=o===R?i+P:l>=0?(s.push(a),i.slice(0,l)+E+i.slice(l)+k+h):i+k+(-2===l?e:h)}return[G(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=Z.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[n++],i=s.getAttribute(t).split(k),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),q.nextNode(),a.push({type:2,index:++r});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===O)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===B)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=N(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);q.currentNode=s;let r=q.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=q.nextNode(),n++)}return q.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),N(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Z(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new X(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=J(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==B,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=J(this,s[i+o],e,o),a===B&&(a=this._$AH[o]),n||=!N(a)||a!==this._$AH[o],a===K?t=K:t!==K&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??K)===B)return;const i=this._$AH,s=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(Z,X),(x.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let at=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new X(e.insertBefore(T(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const ct=ot.litElementPolyfillSupport;ct?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},dt=(t=lt,e,i)=>{const{kind:s,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return ht({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=1,_t=3,ft=4;class mt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt={},vt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends mt{constructor(t){if(super(t),t.type!==_t&&t.type!==pt&&t.type!==ft)throw Error("The `live` directive is not allowed on child or event bindings");if(!(t=>void 0===t.strings)(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===B||e===K)return e;const i=t.element,s=t.name;if(t.type===_t){if(e===i[s])return B}else if(t.type===ft){if(!!e===i.hasAttribute(s))return B}else if(t.type===pt&&i.getAttribute(s)===e+"")return B;return((t,e=gt)=>{t._$AH=e;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */})(t),e}});const bt={en:{card:{name_default:"Ceiling fan",subtitle:"Connected fan",unavailable:"Unavailable",entity_not_found:"Entity {entity} not found"},speed:{label:"SPEED",off:"Off",s1:"Gentle",s2:"Soft",s3:"Moderate",s4:"Normal",s5:"Strong",s6:"Turbo",state_off:"Off",state_on:"On",state_s1:"Speed 1 — Gentle",state_s2:"Speed 2 — Soft",state_s3:"Speed 3 — Moderate",state_s4:"Speed 4 — Normal",state_s5:"Speed 5 — Strong",state_s6:"Speed 6 — Turbo",generic:"Speed {speed}",state_generic:"Speed {speed}"},controls:{light:"Light",color_temp:"Color temperature",temp_warm:"Warm",temp_cool:"Cool",direction:"Season",dir_summer:"Summer",dir_winter:"Winter",timer:"Timer",timer_none:"None",sound:"Sound beep",preset:"Preset mode",power:"Power",oscillate:"Oscillation"},editor:{title:"Fan card settings",name:"Card name",fan_entity:"Fan entity",show_name:"Show card name",summer_direction:"Rotation direction for summer mode",dir_forward:"Normal",dir_reverse:"Reverse",discovered:"Auto-discovered entities",not_found:"not found",light_entity:"Light entity (optional)",light_independent:"Light works while the fan is off",timer_entity:"Timer entity (optional)",sound_entity:"Beep switch (optional)",ambiguous:"several matches, pick one above"}},fr:{card:{name_default:"Ventilateur plafond",subtitle:"Ventilateur connecté",unavailable:"Indisponible",entity_not_found:"Entité {entity} introuvable"},speed:{label:"VITESSE",off:"Arrêt",s1:"Très doux",s2:"Doux",s3:"Modéré",s4:"Moyen",s5:"Fort",s6:"Turbo",state_off:"Éteint",state_on:"Allumé",state_s1:"Vitesse 1 — Très doux",state_s2:"Vitesse 2 — Doux",state_s3:"Vitesse 3 — Modéré",state_s4:"Vitesse 4 — Moyen",state_s5:"Vitesse 5 — Fort",state_s6:"Vitesse 6 — Turbo",generic:"Vitesse {speed}",state_generic:"Vitesse {speed}"},controls:{light:"Lumière",color_temp:"Température de couleur",temp_warm:"Chaud",temp_cool:"Froid",direction:"Saison",dir_summer:"Été",dir_winter:"Hiver",timer:"Minuterie",timer_none:"Aucune",sound:"Bip sonore",preset:"Mode préréglé",power:"Marche / Arrêt",oscillate:"Oscillation"},editor:{title:"Paramètres de la carte ventilateur",name:"Nom de la carte",fan_entity:"Entité ventilateur",show_name:"Afficher le nom de la carte",summer_direction:"Sens de rotation en mode été",dir_forward:"Normal",dir_reverse:"Inverse",discovered:"Entités auto-détectées",not_found:"introuvable",light_entity:"Entité lumière (facultatif)",light_independent:"Lumière utilisable ventilateur éteint",timer_entity:"Entité minuterie (facultatif)",sound_entity:"Interrupteur du bip (facultatif)",ambiguous:"plusieurs candidates, choisissez ci-dessus"}}};function $t(t,e){const i=e.indexOf("."),s=e.slice(0,i),r=e.slice(i+1),n=t[s];return"object"==typeof n?n[r]:void 0}function yt(t,e,i={}){const s=$t(bt[function(t){const e=(t?.locale?.language??t?.language??"en").toLowerCase().split("-")[0];return e in bt?e:"en"}(t)],e)??$t(bt.en,e)??e;return s.replace(/\{(\w+)\}/g,(t,e)=>e in i?String(i[e]):t)}const wt=["light","timer","sound"],xt=[0,15,30,60,120,240,480];function St(t,e=6){return t<=0?0:Math.min(100,Math.floor(100*t/e))}const At=new Set(["off","unavailable","unknown"]),Ct=new Set(["unavailable","unknown"]);function Et(t){return void 0!==t&&!At.has(t.state)}function kt(t){return void 0!==t&&Ct.has(t.state)}const Ot=1,Pt=2,Mt=4,Tt=8,Nt=16,Ut=32;function Dt(t,e){return 0!==(Number(t?.attributes?.supported_features??0)&e)}function Rt(t){return Dt(t,Mt)}const Ht={light:["light"],timer:["number","select"],sound:["switch"]},Lt={light:["light","lumiere","lamp","lampe"],timer:["timer","minuteur","countdown","stop_timer","off_timer","sleep_timer"],sound:["sound","son","beep","bip","buzzer","tone"]},zt=["oscillation","oscillate","swing","power","child_lock","led","display","indicator","direction"],jt=new Set(["light","timer"]);function Vt(t){return t.slice(t.indexOf(".")+1)}function It(t,e){return e.some(e=>t===e||t.endsWith(`_${e}`))}function Wt(t,e,i,s){const r=`${e}_`,n=t=>i.some(e=>e.startsWith(r)&&(t===e||t.startsWith(`${e}_`))),o=wt.filter(t=>t!==s).flatMap(t=>Lt[t]);for(const i of Ht[s]){const a=`${i}.${e}`;if(jt.has(s)&&t.includes(a))return{id:a};const c=t.filter(t=>{if(!t.startsWith(`${i}.`))return!1;const e=Vt(t);return e.startsWith(r)&&!n(e)});if(0===c.length)continue;const l=t=>Vt(t).slice(r.length),d=c.filter(t=>It(l(t),Lt[s]));if(1===d.length)return{id:d[0]};if(d.length>1)return{ambiguous:d};const h=c.filter(t=>!It(l(t),zt)&&!It(l(t),o));if(1===h.length)return{id:h[0]};if(h.length>1)return{ambiguous:h}}return{}}function Bt(t,e){const i=function(t){if(!t)return null;const e=t.indexOf(".");return e>=0?t.slice(e+1):t}(e.fan_entity),s=Object.keys(t?.states??{}),r=s.filter(t=>t.startsWith("fan.")&&t!==e.fan_entity).map(Vt),n={fan:e.fan_entity,ambiguous:{}},o={light:e.light_entity,timer:e.timer_entity,sound:e.sound_entity};for(const t of wt){if(o[t]){n[t]=o[t];continue}if(!i)continue;const{id:e,ambiguous:a}=Wt(s,i,r,t);e&&(n[t]=e),a&&(n.ambiguous[t]=a)}return n}class Kt extends at{constructor(){super(...arguments),this._computeLabel=t=>{const e={fan_entity:"editor.fan_entity",name:"editor.name",show_name:"editor.show_name",summer_direction:"editor.summer_direction",light_entity:"editor.light_entity",light_independent:"editor.light_independent",timer_entity:"editor.timer_entity",sound_entity:"editor.sound_entity"};return e[t.name]?this._t(e[t.name]):t.name}}connectedCallback(){super.connectedCallback(),this.hass&&(customElements.get("ha-form")||customElements.get("hui-button-card")?.getConfigElement?.(),customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement?.())}setConfig(t){this._config={...t}}get _discovered(){return Bt(this.hass,{...this._config,light_entity:void 0,timer_entity:void 0,sound_entity:void 0})}_formData(t){const e={...this._config};for(const i of wt){const s=Kt._ROLE_KEYS[i];!e[s]&&t[i]&&(e[s]=t[i])}return e}get _schema(){const t=[{name:"fan_entity",required:!0,selector:{entity:{domain:"fan"}}},{name:"name",selector:{text:{}}},{name:"show_name",selector:{boolean:{}}},{name:"light_entity",selector:{entity:{domain:"light"}}},{name:"light_independent",selector:{boolean:{}}},{name:"timer_entity",selector:{entity:{domain:["number","select"]}}},{name:"sound_entity",selector:{entity:{domain:"switch"}}}],e=this.hass?.states?.[this._config?.fan_entity];return Rt(e)&&t.push({name:"summer_direction",selector:{select:{mode:"list",options:[{value:"forward",label:this._t("editor.dir_forward")},{value:"reverse",label:this._t("editor.dir_reverse")}]}}}),t}_t(t){return yt(this.hass,t)}_valueChanged(t){const e={...t.detail.value},i=this._discovered;for(const t of wt){const s=Kt._ROLE_KEYS[t];e[s]&&(this._config[s]||e[s]!==i[t])||delete e[s]}var s,r;s="config-changed",r={config:e},this.dispatchEvent(new CustomEvent(s,{bubbles:!0,composed:!0,detail:r}))}_renderDiscovered(t){if(!this._config?.fan_entity)return K;const e={light:"controls.light",timer:"controls.timer",sound:"controls.sound"},i=wt.map(i=>({key:e[i],id:t[i],ambiguous:t.ambiguous[i]}));return W`
      <div class="discovered">
        <div class="discovered-title">${this._t("editor.discovered")}</div>
        ${i.map(t=>W`
            <div class="discovered-row">
              <span class="dr-label">${this._t(t.key)}</span>
              ${t.id?W`<span class="dr-id found">${t.id}</span>`:t.ambiguous?W`<span class="dr-id ambiguous">${this._t("editor.ambiguous")}</span>`:W`<span class="dr-id missing">${this._t("editor.not_found")}</span>`}
            </div>
            ${t.ambiguous?W`<div class="dr-candidates">${t.ambiguous.join(", ")}</div>`:K}
          `)}
      </div>
    `}render(){if(!this.hass||!this._config)return W``;const t=this._discovered;return W`
      <ha-form
        .hass=${this.hass}
        .data=${this._formData(t)}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${this._renderDiscovered(t)}
    `}}Kt._ROLE_KEYS={light:"light_entity",timer:"timer_entity",sound:"sound_entity"},Kt.styles=o`
    ha-form {
      width: 100%;
    }
    .discovered {
      margin-top: 16px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--secondary-background-color);
    }
    .discovered-title {
      font-size: 11px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }
    .discovered-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 3px 0;
      font-size: 13px;
    }
    .dr-label {
      color: var(--primary-text-color);
    }
    .dr-id {
      font-family: var(--code-font-family, monospace);
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .dr-id.found {
      color: var(--primary-text-color);
    }
    .dr-id.missing {
      color: var(--secondary-text-color);
      font-style: italic;
    }
    .dr-id.ambiguous {
      color: var(--warning-color, #ffa600);
      font-style: italic;
    }
    .dr-candidates {
      padding: 0 0 4px;
      font-family: var(--code-font-family, monospace);
      font-size: 11px;
      color: var(--secondary-text-color);
      overflow-wrap: anywhere;
    }
  `,t([ht({attribute:!1})],Kt.prototype,"hass",void 0),t([ut()],Kt.prototype,"_config",void 0),customElements.define("custom-fan-card-editor",Kt);class Ft extends at{constructor(){super(...arguments),this._resolvedEntityCount=-1}static getStubConfig(t,e=[]){return{fan_entity:e.find(t=>t.startsWith("fan."))??Object.keys(t?.states??{}).find(t=>t.startsWith("fan."))??"fan.ceiling_fan_with_light",show_name:!0}}static getConfigElement(){return document.createElement("custom-fan-card-editor")}getCardSize(){let t=3;return!1!==this._config?.show_name&&(t+=1),this._fanState&&!this._fanSupportsSpeed||(t+=1),this._showColorTemp&&(t+=1),t}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}setConfig(t){if(!t?.fan_entity)throw new Error("fan_entity is required.");this._config={show_name:!0,summer_direction:"forward",...t}}_t(t,e){return yt(this.hass,t,e)}get _entities(){return this._resolved??Bt(this.hass,this._config)}_trackedIds(t){return[t.fan,t.light,t.timer,t.sound].filter(t=>!!t)}_needsResolve(){if(!this._resolved)return!0;const t=this.hass?.states;return!!t&&(t!==this._resolvedFor&&(Object.keys(t).length!==this._resolvedEntityCount||this._trackedIds(this._resolved).some(e=>!(e in t))))}_resolve(){const t=this.hass?.states;this._resolved=Bt(this.hass,this._config),this._resolvedFor=t,this._resolvedEntityCount=t?Object.keys(t).length:-1}shouldUpdate(t){if(!this._config)return!1;if([...t.keys()].some(t=>"hass"!==t))return!0;const e=t.get("hass");return!(e&&this.hass&&this._resolved)||(e.language!==this.hass.language||e.locale?.language!==this.hass.locale?.language||(!!this._needsResolve()||this._trackedIds(this._resolved).some(t=>e.states?.[t]!==this.hass.states?.[t])))}willUpdate(t){t.has("_config")||this._needsResolve()?this._resolve():this._resolvedFor=this.hass?.states}get _fanState(){return this.hass?.states?.[this._entities.fan]}get _lightState(){const t=this._entities.light;return t?this.hass?.states?.[t]:void 0}get _timerState(){const t=this._entities.timer;return t?this.hass?.states?.[t]:void 0}get _soundState(){const t=this._entities.sound;return t?this.hass?.states?.[t]:void 0}get _currentSpeed(){const t=this._fanState;return Et(t)?function(t,e=6){return!t||t<=0?0:Math.min(e,Math.max(1,Math.round(t/(100/e))))}(Number(t.attributes?.percentage??0),this._speedCount):0}get _speedCount(){return function(t){const e=Number(t?.attributes?.percentage_step);if(!Number.isFinite(e)||e<=0)return 6;const i=Math.round(100/e);return i>=1&&i<=10?i:6}(this._fanState)}get _fanSupportsDirection(){return Rt(this._fanState)}get _fanSupportsSpeed(){return Dt(this._fanState,Ot)}get _fanSupportsOscillate(){return Dt(this._fanState,Pt)}get _isOscillating(){return!0===this._fanState?.attributes?.oscillating}get _canTurnOn(){return Dt(this._fanState,Ut)}get _canTurnOff(){return Dt(this._fanState,Nt)}get _fanDirection(){return"reverse"===this._fanState?.attributes?.direction?"reverse":"forward"}get _summerDirection(){return"reverse"===this._config.summer_direction?"reverse":"forward"}get _winterDirection(){return"forward"===this._summerDirection?"reverse":"forward"}get _isSummerMode(){return this._fanDirection===this._summerDirection}get _isLightOn(){return"on"===this._lightState?.state}get _lightSupportsColorTemp(){return(this._lightState?.attributes?.supported_color_modes??[]).includes("color_temp")}get _minKelvin(){return Number(this._lightState?.attributes?.min_color_temp_kelvin??2700)}get _maxKelvin(){return Number(this._lightState?.attributes?.max_color_temp_kelvin??6500)}get _currentKelvin(){return Number(this._lightState?.attributes?.color_temp_kelvin??this._minKelvin)}get _showColorTemp(){return!!this._lightState&&this._isLightOn&&this._lightSupportsColorTemp}get _isSoundOn(){return"on"===this._soundState?.state}get _isOn(){return Et(this._fanState)}get _fanSupportsPreset(){return Dt(this._fanState,Tt)&&this._presetModes.length>0}get _presetModes(){return this._fanState?.attributes?.preset_modes??[]}get _presetMode(){return this._fanState?.attributes?.preset_mode??""}get _activePreset(){const t=this._presetMode;return t&&"normal"!==t.toLowerCase()?t:""}_formatPreset(t){return t?t.charAt(0).toUpperCase()+t.slice(1):t}get _timerDomain(){return this._entities.timer?.startsWith("select.")?"select":"number"}get _timerValue(){const t=this._timerState?.state;if(null==t||""===t)return"";if("select"===this._timerDomain)return String(t);const e=Number(t);return Number.isNaN(e)?String(t):String(e)}get _timerOptions(){return"select"===this._timerDomain?this._timerState?.attributes?.options??[]:xt.map(String)}get _timerChoices(){const t=this._timerOptions,e=this._timerValue;return""===e||t.includes(e)?t:"select"===this._timerDomain?[...t,e]:[...t,e].sort((t,e)=>Number(t)-Number(e))}_formatTimerOption(t){const e=Number(t);return""===t.trim()||Number.isNaN(e)?t:0===e?this._t("controls.timer_none"):e<60?`${e} min`:e/60+" h"}get _isTimerActive(){const[t]=this._timerOptions;return""!==this._timerValue&&this._timerValue!==t}_speedStateLabel(t){return this._fanSupportsSpeed?0===t?this._t("speed.state_off"):6!==this._speedCount?this._t("speed.state_generic",{speed:t}):this._t(`speed.state_s${t}`):this._t(this._isOn?"speed.state_on":"speed.state_off")}_speedLabel(t){return 6!==this._speedCount?this._t("speed.generic",{speed:t}):this._t(`speed.s${t}`)}_call(t,e,i){const s=i=>{console.error(`custom-fan-card: ${t}.${e} failed`,i),this.requestUpdate()};try{Promise.resolve(this.hass.callService(t,e,i)).catch(s)}catch(t){s(t)}}_setSpeed(t){0===t?this._call("fan","turn_off",{entity_id:this._entities.fan}):this._call("fan","set_percentage",{entity_id:this._entities.fan,percentage:St(t,this._speedCount)})}_togglePower(){this._call("fan",this._isOn?"turn_off":"turn_on",{entity_id:this._entities.fan})}_toggleOscillate(){this._call("fan","oscillate",{entity_id:this._entities.fan,oscillating:!this._isOscillating})}_setPreset(t){this._call("fan","set_preset_mode",{entity_id:this._entities.fan,preset_mode:t.target.value})}_setDirection(t){this._call("fan","set_direction",{entity_id:this._entities.fan,direction:t})}_setSeason(t){this._setDirection("summer"===t?this._summerDirection:this._winterDirection)}_toggleLight(){this._entities.light&&this._call("light","toggle",{entity_id:this._entities.light})}_setColorTemp(t){if(!this._entities.light)return;const e=Number(t.target.value);this._call("light","turn_on",{entity_id:this._entities.light,color_temp_kelvin:e})}_setTimer(t){if(!this._entities.timer)return;const e=t.target.value;"select"===this._timerDomain?this._call("select","select_option",{entity_id:this._entities.timer,option:e}):this._call("number","set_value",{entity_id:this._entities.timer,value:Number(e)})}_toggleSound(){this._entities.sound&&this._call("switch","toggle",{entity_id:this._entities.sound})}_renderSpeedIcon(t){const e=!this._fanSupportsSpeed&&this._isOn,i=0===t&&!e,s=e?3:Math.max(1,Math.round(6*t/this._speedCount));return W`
      <div class="fan-icon-wrap ${i?"off":""}">
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          class="fan-svg ${i?"off":""}"
          style="${i?"":`animation: spin ${["none","2.5s","1.5s","0.9s","0.6s","0.35s","0.15s"][s]} linear infinite;`}"
          aria-hidden="true"
        >
          <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.69 9.22,10.88C9.41,10.4 9.73,9.97 10.13,9.65C8.14,5.96 8.92,2 12.5,2Z" />
        </svg>
      </div>
    `}render(){if(!this._config)return K;if(!this.hass)return K;const t=this._fanState;if(!t)return W`<ha-card>
        <div class="error" role="alert">
          ${this._t("card.entity_not_found",{entity:this._config.fan_entity})}
        </div>
      </ha-card>`;const e=this._currentSpeed,i=kt(t),s=this._config.light_independent?kt(this._lightState):i||!this._isOn,r=this._config.name||t.attributes?.friendly_name||this._t("card.name_default");return W`
      <ha-card>
        <div class="card-content ${i?"unavailable":""}">

          ${!1!==this._config.show_name?W`
              <div class="card-header">
                <div class="card-title">${r}</div>
              </div>
            `:K}

          ${i?W`<div class="unavailable-msg">${this._t("card.unavailable")}</div>`:K}

          <div class="fan-status-row">
            <div class="fan-status-main">
              ${this._renderSpeedIcon(e)}
              <div class="fan-info">
                <div class="fan-state">
                  ${this._activePreset?this._formatPreset(this._activePreset):this._speedStateLabel(e)}
                </div>
                <div class="fan-pct">
                  ${this._isOn&&this._fanSupportsSpeed?this._activePreset?this._t("controls.preset"):`${function(t,e=6){return t<=0?0:Math.round(t/e*100)}(e,this._speedCount)}%`:"—"}
                </div>
              </div>
            </div>

            ${this._fanSupportsDirection||this._fanSupportsPreset?W`
                <div class="header-controls">
                  ${this._fanSupportsDirection?W`
                      <div class="season-toggle">
                        <button
                          class="season-btn summer ${this._isSummerMode?"active":""}"
                          @click=${()=>this._setSeason("summer")}
                          ?disabled=${!this._isOn}
                          aria-label="${this._t("controls.dir_summer")}"
                          title="${this._t("controls.dir_summer")}"
                        >
                          <ha-icon icon="mdi:weather-sunny"></ha-icon>
                        </button>
                        <button
                          class="season-btn winter ${this._isSummerMode?"":"active"}"
                          @click=${()=>this._setSeason("winter")}
                          ?disabled=${!this._isOn}
                          aria-label="${this._t("controls.dir_winter")}"
                          title="${this._t("controls.dir_winter")}"
                        >
                          <ha-icon icon="mdi:snowflake"></ha-icon>
                        </button>
                      </div>
                    `:K}

                  ${this._fanSupportsPreset?W`
                      <select
                        class="preset-select ${this._activePreset?"active":""}"
                        .value=${vt(this._presetMode)}
                        @change=${this._setPreset}
                        ?disabled=${!this._isOn}
                        aria-label="${this._t("controls.preset")}"
                        title="${this._t("controls.preset")}"
                      >
                        ${this._presetModes.includes(this._presetMode)?K:W`<option value="" disabled selected>—</option>`}
                        ${this._presetModes.map(t=>W`<option value="${t}" ?selected=${t===this._presetMode}>${this._formatPreset(t)}</option>`)}
                      </select>
                    `:K}
                </div>
              `:K}
          </div>

          ${this._fanSupportsSpeed?W`
              <div class="speed-bar">
                ${Array.from({length:this._speedCount},(t,e)=>e+1).map(t=>W`
                    <button
                      class="speed-seg ${e>=t&&e>0?"filled":""} ${e===t?"active":""}"
                      @click=${()=>this._setSpeed(t)}
                      ?disabled=${i}
                      aria-label="${this._speedLabel(t)}"
                      aria-pressed=${e===t}
                    >
                      <span class="speed-seg-fill"></span>
                      <span class="speed-seg-num">${t}</span>
                    </button>
                  `)}
              </div>
            `:K}

          <div class="control-bar">
            ${this._canTurnOn||this._canTurnOff?W`
                <button
                  class="ctrl-btn power ${this._isOn?"on":""}"
                  @click=${this._togglePower}
                  ?disabled=${i||(this._isOn?!this._canTurnOff:!this._canTurnOn)}
                  aria-label="${this._t("controls.power")}"
                  title="${this._t("controls.power")}"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                    <path d="M12 4v8"/>
                    <path d="M7.8 6.8a6 6 0 1 0 8.4 0"/>
                  </svg>
                </button>
              `:K}

            ${this._fanSupportsOscillate?W`
                <button
                  class="ctrl-btn oscillate ${this._isOscillating?"on":""}"
                  @click=${this._toggleOscillate}
                  ?disabled=${i||!this._isOn}
                  aria-label="${this._t("controls.oscillate")}"
                  aria-pressed=${this._isOscillating}
                  title="${this._t("controls.oscillate")}"
                >
                  <ha-icon icon="${this._isOscillating?"mdi:arrow-oscillating":"mdi:arrow-oscillating-off"}"></ha-icon>
                </button>
              `:K}

            ${this._lightState?W`
                <button
                  class="ctrl-btn light ${this._isLightOn?"on":""}"
                  @click=${this._toggleLight}
                  ?disabled=${s}
                  aria-label="${this._t("controls.light")}"
                  title="${this._t("controls.light")}"
                >
                  <ha-icon icon="${this._isLightOn?"mdi:lightbulb-outline":"mdi:lightbulb-off-outline"}"></ha-icon>
                </button>
              `:K}

            ${this._soundState||this._timerState?W`<div class="ctrl-sep"></div>`:K}

            ${this._soundState?W`
                <button
                  class="ctrl-btn sound ${this._isSoundOn?"on":""}"
                  @click=${this._toggleSound}
                  ?disabled=${i||!this._isOn}
                  aria-label="${this._t("controls.sound")}"
                  title="${this._t("controls.sound")}"
                >
                  <ha-icon icon="${this._isSoundOn?"mdi:volume-high":"mdi:volume-off"}"></ha-icon>
                </button>
              `:K}

            ${this._timerState?W`
                <select
                  class="ctrl-select ${this._isTimerActive?"active":""}"
                  .value=${vt(String(this._timerValue))}
                  @change=${this._setTimer}
                  ?disabled=${i||!this._isOn}
                  aria-label="${this._t("controls.timer")}"
                  title="${this._t("controls.timer")}"
                >
                  ${this._timerChoices.map(t=>W`
                      <option value="${t}" ?selected=${t===this._timerValue}>${this._formatTimerOption(t)}</option>
                    `)}
                </select>
              `:K}
          </div>

          ${this._showColorTemp?W`
              <div class="temp-row">
                <div class="temp-divider"></div>
                <div class="temp-controls">
                  <span class="temp-label warm">${this._t("controls.temp_warm")}</span>
                  <input
                    class="temp-slider"
                    type="range"
                    min="${this._minKelvin}"
                    max="${this._maxKelvin}"
                    step="100"
                    .value=${vt(String(this._currentKelvin))}
                    @change=${this._setColorTemp}
                    ?disabled=${this._config.light_independent?s:i}
                    aria-label="${this._t("controls.color_temp")}"
                  />
                  <span class="temp-label cool">${this._t("controls.temp_cool")}</span>
                  <span class="temp-value">${this._currentKelvin}K</span>
                </div>
              </div>
            `:K}

        </div>
      </ha-card>
    `}}Ft.styles=o`
    /* Every colour derives from the HA theme, so light and dark themes (and
       custom themes) both render correctly. Mixing with --primary-text-color
       darkens a tint on light themes and lightens it on dark ones, keeping
       text readable on either. The hex values are fallbacks only. */
    :host {
      --wc-accent: var(--custom-fan-card-accent, var(--primary-color, #378add));
      --wc-on-accent: var(--text-primary-color, #fff);
      --wc-accent-light: color-mix(
        in srgb,
        var(--wc-accent) 18%,
        var(--card-background-color, #fff)
      );
      --wc-accent-dark: color-mix(
        in srgb,
        var(--wc-accent) 65%,
        var(--primary-text-color, #212121)
      );
      --wc-summer: var(--custom-fan-card-summer, var(--orange-color, #e0912f));
      --wc-warm-text: color-mix(
        in srgb,
        var(--wc-summer) 75%,
        var(--primary-text-color, #212121)
      );
      --wc-cool-text: color-mix(
        in srgb,
        var(--wc-accent) 75%,
        var(--primary-text-color, #212121)
      );
      --wc-focus-ring: 2px solid var(--wc-accent);
    }

    button:focus-visible,
    .temp-slider:focus-visible {
      outline: var(--wc-focus-ring);
      outline-offset: 2px;
    }

    ha-card {
      overflow: hidden;
    }

    .card-content {
      padding: 16px;
    }
    .card-content.unavailable {
      opacity: 0.6;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    .card-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
      text-align: center;
    }

    .unavailable-msg {
      font-size: 13px;
      color: var(--secondary-text-color);
      text-align: center;
      padding: 8px 0;
    }

    .fan-status-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
      padding: 12px;
      background: var(--secondary-background-color);
      border-radius: 8px;
    }
    .fan-status-main {
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 0;
    }

    .header-controls {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
      flex-shrink: 0;
    }

    .season-toggle {
      display: flex;
      gap: 1px;
      flex-shrink: 0;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      overflow: hidden;
    }
    .season-btn {
      width: 64px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 0;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      padding: 0;
      transition: background 0.15s, color 0.15s;
    }
    .season-btn:hover:not(:disabled):not(.active) {
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
    .season-btn.summer.active {
      background: var(--wc-summer);
      color: var(--wc-on-accent);
    }
    .season-btn.winter.active {
      background: var(--wc-accent);
      color: var(--wc-on-accent);
    }
    .season-btn ha-icon {
      --mdc-icon-size: 20px;
      display: flex;
    }

    .preset-select {
      width: 131px;
      height: 36px;
      font-size: 13px;
      padding: 0 20px 0 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      cursor: pointer;
      outline: none;
      transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
    }
    .preset-select:hover:not(:disabled) {
      border-color: var(--wc-accent);
    }
    .preset-select:focus-visible {
      box-shadow: 0 0 0 2px var(--wc-accent);
    }
    .preset-select.active {
      border-color: var(--wc-accent);
      background: var(--wc-accent);
      color: var(--wc-on-accent);
    }
    .preset-select:disabled {
      cursor: default;
      opacity: 0.4;
    }
    .season-btn:disabled {
      cursor: default;
      opacity: 0.4;
    }

    .fan-icon-wrap {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--wc-accent-light);
      border: 1.5px solid var(--wc-accent);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.3s, border-color 0.3s;
    }
    .fan-icon-wrap.off {
      background: var(--secondary-background-color);
      border-color: var(--divider-color);
    }

    .fan-svg {
      color: var(--wc-accent);
      transition: color 0.3s;
      transform-origin: center;
    }
    .fan-svg.off {
      color: var(--secondary-text-color);
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* The spin is set inline per speed; !important lets the user's
       reduced-motion preference win over it. */
    @media (prefers-reduced-motion: reduce) {
      .fan-svg {
        animation: none !important;
      }
    }

    .fan-info { min-width: 0; }
    .fan-state {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
    }
    .fan-pct {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .speed-bar {
      display: flex;
      gap: 4px;
      margin-bottom: 16px;
    }

    .speed-seg {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
    }
    .speed-seg:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .speed-seg-fill {
      height: 20px;
      border-radius: 5px;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      transition: background 0.15s, border-color 0.15s;
    }
    .speed-seg:hover:not(:disabled) .speed-seg-fill {
      border-color: var(--wc-accent);
    }
    .speed-seg.filled .speed-seg-fill {
      background: var(--wc-accent);
      border-color: var(--wc-accent);
    }

    .speed-seg-num {
      font-size: 13px;
      text-align: center;
      color: var(--secondary-text-color);
      padding: 2px 0;
      border-radius: 5px;
      transition: color 0.15s, background 0.15s;
    }
    .speed-seg.active .speed-seg-num {
      color: var(--wc-accent-dark);
      background: var(--wc-accent-light);
      font-weight: 500;
    }

    .control-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .ctrl-btn {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid transparent;
      border-radius: 50%;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      padding: 0;
      transition: color 0.15s, border-color 0.15s;
    }
    .ctrl-btn:hover:not(:disabled) {
      border-color: var(--divider-color);
      color: var(--primary-text-color);
    }
    .ctrl-btn.on {
      color: var(--wc-accent);
    }
    .ctrl-btn.on:hover:not(:disabled) {
      border-color: var(--wc-accent);
      color: var(--wc-accent);
    }
    .ctrl-btn:disabled {
      cursor: default;
      opacity: 0.4;
    }
    .ctrl-btn ha-icon {
      --mdc-icon-size: 22px;
      display: flex;
    }

    .ctrl-sep {
      width: 1px;
      align-self: stretch;
      margin: 4px 2px;
      background: var(--divider-color);
      flex-shrink: 0;
    }

    .ctrl-select {
      height: 40px;
      width: 140px;
      flex: none;
      font-size: 13px;
      padding: 0 20px 0 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      cursor: pointer;
      outline: none;
      transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
    }
    .ctrl-select:hover:not(:disabled) {
      border-color: var(--wc-accent);
    }
    .ctrl-select:focus-visible {
      box-shadow: 0 0 0 2px var(--wc-accent);
    }
    .ctrl-select.active {
      border-color: var(--wc-accent);
      background: var(--wc-accent);
      color: var(--wc-on-accent);
    }
    .ctrl-select:disabled {
      cursor: default;
      opacity: 0.5;
    }

    .temp-row {
      padding-top: 12px;
    }
    .temp-divider {
      height: 1px;
      background: var(--divider-color);
      margin-bottom: 12px;
    }
    .temp-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .temp-label {
      font-size: 11px;
      flex-shrink: 0;
    }
    .temp-label.warm {
      color: var(--wc-warm-text);
    }
    .temp-label.cool {
      color: var(--wc-cool-text);
    }
    .temp-value {
      font-size: 11px;
      color: var(--secondary-text-color);
      min-width: 42px;
      text-align: right;
      flex-shrink: 0;
    }
    .temp-slider {
      flex: 1;
      -webkit-appearance: none;
      appearance: none;
      height: 8px;
      border-radius: 4px;
      /* Depicts the light's colour temperature itself (warm to cool white),
         so it is intentionally theme-independent. */
      background: linear-gradient(to right, #ffb46e, #fff6e8 50%, #cfe4ff);
      outline: none;
      cursor: pointer;
    }
    .temp-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--card-background-color, #fff);
      border: 2px solid var(--primary-text-color);
      cursor: pointer;
    }
    .temp-slider::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--card-background-color, #fff);
      border: 2px solid var(--primary-text-color);
      cursor: pointer;
    }
    .temp-slider:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .error {
      padding: 16px;
      font-size: 13px;
      color: var(--error-color, #db4437);
    }
  `,t([ht({attribute:!1})],Ft.prototype,"hass",void 0),t([ut()],Ft.prototype,"_config",void 0),customElements.define("custom-fan-card",Ft),window.customCards=window.customCards||[],window.customCards.push({type:"custom-fan-card",name:"Custom Fan Card",description:"Custom card for smart ceiling fans (CREATE Windcalm, Klassfan, …)",preview:!0}),console.info("%c CUSTOM-FAN-CARD %c v1.1.0 ","color: #fff; background: #378add; font-weight: 700;","color: #378add; background: #fff; font-weight: 700;");
