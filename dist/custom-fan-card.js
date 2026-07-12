function t(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,f=_.trustedTypes,m=f?f.emptyScript:"",g=_.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},$=(t,e)=>!c(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??$)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,g?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,S=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,O=`<${P}>`,M=document,T=()=>M.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,D="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,L=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,V=/"/g,I=/^(?:script|style|textarea|title)$/i,K=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,F=M.createTreeWalker(M,129);function Z(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=H;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,d=0;for(;d<s.length&&(o.lastIndex=d,c=o.exec(s),null!==c);)d=o.lastIndex,o===H?"!--"===c[1]?o=R:void 0!==c[1]?o=z:void 0!==c[2]?(I.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=L):void 0!==c[3]&&(o=L):o===L?">"===c[0]?(o=r??H,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?L:'"'===c[3]?V:j):o===V||o===j?o=L:o===R||o===z?o=H:(o=L,r=void 0);const h=o===L&&t[e+1].startsWith("/>")?" ":"";n+=o===H?s+O:l>=0?(i.push(a),s.slice(0,l)+C+s.slice(l)+k+h):s+k+(-2===l?e:h)}return[Z(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[c,l]=G(t,e);if(this.el=J.createElement(c,s),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=F.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=l[n++],s=i.getAttribute(t).split(k),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?et:"?"===o[1]?st:"@"===o[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],T()),F.nextNode(),a.push({type:2,index:++r});i.append(t[e],T())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,i){if(e===B)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=N(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);F.currentNode=i;let r=F.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Y(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=F.nextNode(),n++)}return F.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),N(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(Z(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Y(this.O(T()),this.O(T()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=Q(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==B,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=Q(this,i[s+o],e,o),a===B&&(a=this._$AH[o]),n||=!N(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends tt{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===B)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(J,Y),(w.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let at=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Y(e.insertBefore(T(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const ct=ot.litElementPolyfillSupport;ct?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},dt=(t=lt,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ht(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return ht({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ut=1,_t=3,ft=4;class mt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt={},vt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends mt{constructor(t){if(super(t),t.type!==_t&&t.type!==ut&&t.type!==ft)throw Error("The `live` directive is not allowed on child or event bindings");if(!(t=>void 0===t.strings)(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===B||e===q)return e;const s=t.element,i=t.name;if(t.type===_t){if(e===s[i])return B}else if(t.type===ft){if(!!e===s.hasAttribute(i))return B}else if(t.type===ut&&s.getAttribute(i)===e+"")return B;return((t,e=gt)=>{t._$AH=e;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */})(t),e}});const bt={en:{card:{name_default:"Ceiling fan",subtitle:"Connected fan",unavailable:"Unavailable",config_required:"Please configure the fan card."},speed:{label:"SPEED",off:"Off",s1:"Gentle",s2:"Soft",s3:"Moderate",s4:"Normal",s5:"Strong",s6:"Turbo",state_off:"Off",state_s1:"Speed 1 — Gentle",state_s2:"Speed 2 — Soft",state_s3:"Speed 3 — Moderate",state_s4:"Speed 4 — Normal",state_s5:"Speed 5 — Strong",state_s6:"Speed 6 — Turbo"},controls:{light:"Light",color_temp:"Color temperature",temp_warm:"Warm",temp_cool:"Cool",direction:"Season",dir_summer:"Summer",dir_winter:"Winter",timer:"Timer",timer_none:"None",sound:"Sound beep",preset:"Preset mode",power:"Power"},editor:{title:"Fan card settings",name:"Card name",fan_entity:"Fan entity",show_name:"Show card name",summer_direction:"Rotation direction for summer mode",dir_forward:"Normal",dir_reverse:"Reverse",discovered:"Auto-discovered entities",not_found:"not found"}},fr:{card:{name_default:"Ventilateur plafond",subtitle:"Ventilateur connecté",unavailable:"Indisponible",config_required:"Veuillez configurer la carte ventilateur."},speed:{label:"VITESSE",off:"Arrêt",s1:"Très doux",s2:"Doux",s3:"Modéré",s4:"Moyen",s5:"Fort",s6:"Turbo",state_off:"Éteint",state_s1:"Vitesse 1 — Très doux",state_s2:"Vitesse 2 — Doux",state_s3:"Vitesse 3 — Modéré",state_s4:"Vitesse 4 — Moyen",state_s5:"Vitesse 5 — Fort",state_s6:"Vitesse 6 — Turbo"},controls:{light:"Lumière",color_temp:"Température de couleur",temp_warm:"Chaud",temp_cool:"Froid",direction:"Saison",dir_summer:"Été",dir_winter:"Hiver",timer:"Minuterie",timer_none:"Aucune",sound:"Bip sonore",preset:"Mode préréglé",power:"Marche / Arrêt"},editor:{title:"Paramètres de la carte ventilateur",name:"Nom de la carte",fan_entity:"Entité ventilateur",show_name:"Afficher le nom de la carte",summer_direction:"Sens de rotation en mode été",dir_forward:"Normal",dir_reverse:"Inverse",discovered:"Entités auto-détectées",not_found:"introuvable"}}};function $t(t,e){const s=e.indexOf("."),i=e.slice(0,s),r=e.slice(s+1),n=t[i];return"object"==typeof n?n[r]:void 0}function yt(t,e){return $t(bt[function(t){const e=(t?.locale?.language??t?.language??"en").toLowerCase().split("-")[0];return e in bt?e:"en"}(t)],e)??$t(bt.en,e)??e}const xt=[0,15,30,60,120,240,480];function wt(t){return t<=0?0:Math.round(t/6*100)}function St(t){return!!(4&Number(t?.attributes?.supported_features??0))}function At(t,e){const s=function(t){if(!t)return null;const e=t.indexOf(".");return e>=0?t.slice(e+1):t}(e.fan_entity),i=t?.states??{},r=t=>{if(!s)return;const e=`${t}.${s}`;return i[e]?e:Object.keys(i).find(t=>t.startsWith(e))};return{fan:e.fan_entity,light:e.light_entity||r("light"),timer:e.timer_entity||r("number")||r("select"),sound:e.sound_entity||r("switch")}}class Et extends at{constructor(){super(...arguments),this._computeLabel=t=>{const e={fan_entity:"editor.fan_entity",name:"editor.name",show_name:"editor.show_name",summer_direction:"editor.summer_direction"};return e[t.name]?this._t(e[t.name]):t.name}}connectedCallback(){super.connectedCallback(),this.hass&&(customElements.get("ha-form")||customElements.get("hui-button-card")?.getConfigElement?.(),customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement?.())}setConfig(t){this._config={...t}}get _schema(){const t=[{name:"fan_entity",required:!0,selector:{entity:{domain:"fan"}}},{name:"name",selector:{text:{}}},{name:"show_name",selector:{boolean:{}}}],e=this.hass?.states?.[this._config?.fan_entity];return St(e)&&t.push({name:"summer_direction",selector:{select:{mode:"list",options:[{value:"forward",label:this._t("editor.dir_forward")},{value:"reverse",label:this._t("editor.dir_reverse")}]}}}),t}_t(t){return yt(this.hass,t)}_valueChanged(t){const e=t.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{bubbles:!0,composed:!0,detail:{config:e}}))}_renderDiscovered(){if(!this._config?.fan_entity)return q;const t=At(this.hass,this._config),e=[{key:"controls.light",id:t.light},{key:"controls.timer",id:t.timer},{key:"controls.sound",id:t.sound}];return K`
      <div class="discovered">
        <div class="discovered-title">${this._t("editor.discovered")}</div>
        ${e.map(t=>K`
            <div class="discovered-row">
              <span class="dr-label">${this._t(t.key)}</span>
              ${t.id?K`<span class="dr-id found">${t.id}</span>`:K`<span class="dr-id missing">${this._t("editor.not_found")}</span>`}
            </div>
          `)}
      </div>
    `}render(){return this.hass&&this._config?K`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      ${this._renderDiscovered()}
    `:K``}}Et.styles=o`
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
  `,t([ht({attribute:!1})],Et.prototype,"hass",void 0),t([pt()],Et.prototype,"_config",void 0),customElements.define("custom-fan-card-editor",Et);class Ct extends at{static getStubConfig(){return{fan_entity:"fan.ceiling_fan_with_light",show_name:!0}}static getConfigElement(){return document.createElement("custom-fan-card-editor")}getCardSize(){return 4}setConfig(t){if(!t?.fan_entity)throw new Error("fan_entity is required.");this._config={show_name:!0,summer_direction:"forward",...t}}_t(t){return yt(this.hass,t)}get _entities(){return At(this.hass,this._config)}get _fanState(){return this.hass?.states[this._entities.fan]}get _lightState(){const t=this._entities.light;return t?this.hass?.states[t]:void 0}get _timerState(){const t=this._entities.timer;return t?this.hass?.states[t]:void 0}get _soundState(){const t=this._entities.sound;return t?this.hass?.states[t]:void 0}get _currentSpeed(){const t=this._fanState;return t&&"off"!==t.state&&"unavailable"!==t.state?!(e=Number(t.attributes?.percentage??0))||e<=0?0:Math.min(6,Math.max(1,Math.round(e/(100/6)))):0;var e}get _fanSupportsDirection(){return St(this._fanState)}get _fanDirection(){return"reverse"===this._fanState?.attributes?.direction?"reverse":"forward"}get _summerDirection(){return"reverse"===this._config.summer_direction?"reverse":"forward"}get _winterDirection(){return"forward"===this._summerDirection?"reverse":"forward"}get _isSummerMode(){return this._fanDirection===this._summerDirection}get _isLightOn(){return"on"===this._lightState?.state}get _lightSupportsColorTemp(){return(this._lightState?.attributes?.supported_color_modes??[]).includes("color_temp")}get _minKelvin(){return Number(this._lightState?.attributes?.min_color_temp_kelvin??2700)}get _maxKelvin(){return Number(this._lightState?.attributes?.max_color_temp_kelvin??6500)}get _currentKelvin(){return Number(this._lightState?.attributes?.color_temp_kelvin??this._minKelvin)}get _isSoundOn(){return"on"===this._soundState?.state}get _isOn(){const t=this._fanState?.state;return void 0!==t&&"off"!==t&&"unavailable"!==t}get _fanSupportsPreset(){return!!(8&Number(this._fanState?.attributes?.supported_features??0))&&this._presetModes.length>0}get _presetModes(){return this._fanState?.attributes?.preset_modes??[]}get _presetMode(){return this._fanState?.attributes?.preset_mode??""}get _activePreset(){const t=this._presetMode;return t&&"normal"!==t.toLowerCase()?t:""}_formatPreset(t){return t?t.charAt(0).toUpperCase()+t.slice(1):t}get _timerDomain(){return this._entities.timer?.startsWith("select.")?"select":"number"}get _timerValue(){const t=this._timerState?.state;if(null==t||""===t)return"";if("select"===this._timerDomain)return String(t);const e=Number(t);return Number.isNaN(e)?String(t):String(e)}get _timerOptions(){return"select"===this._timerDomain?this._timerState?.attributes?.options??[]:xt.map(String)}_formatTimerOption(t){const e=Number(t);return""===t.trim()||Number.isNaN(e)?t:0===e?this._t("controls.timer_none"):e<60?`${e} min`:e/60+" h"}get _isTimerActive(){const[t]=this._timerOptions;return""!==this._timerValue&&this._timerValue!==t}_speedStateKey(t){return 0===t?"speed.state_off":`speed.state_s${t}`}_speedLabelKey(t){return`speed.s${t}`}_setSpeed(t){0===t?this.hass.callService("fan","turn_off",{entity_id:this._entities.fan}):this.hass.callService("fan","set_percentage",{entity_id:this._entities.fan,percentage:wt(t)})}_togglePower(){this.hass.callService("fan",this._isOn?"turn_off":"turn_on",{entity_id:this._entities.fan})}_setPreset(t){this.hass.callService("fan","set_preset_mode",{entity_id:this._entities.fan,preset_mode:t.target.value})}_setDirection(t){this.hass.callService("fan","set_direction",{entity_id:this._entities.fan,direction:t})}_setSeason(t){this._setDirection("summer"===t?this._summerDirection:this._winterDirection)}_toggleLight(){this._entities.light&&this.hass.callService("light","toggle",{entity_id:this._entities.light})}_setColorTemp(t){if(!this._entities.light)return;const e=Number(t.target.value);this.hass.callService("light","turn_on",{entity_id:this._entities.light,color_temp_kelvin:e})}_setTimer(t){if(!this._entities.timer)return;const e=t.target.value;"select"===this._timerDomain?this.hass.callService("select","select_option",{entity_id:this._entities.timer,option:e}):this.hass.callService("number","set_value",{entity_id:this._entities.timer,value:Number(e)})}_toggleSound(){this._entities.sound&&this.hass.callService("switch","toggle",{entity_id:this._entities.sound})}_renderSpeedIcon(t){const e=0===t;return K`
      <div class="fan-icon-wrap ${e?"off":""}">
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          class="fan-svg ${e?"off":""}"
          style="${e?"":`animation: spin ${["none","2.5s","1.5s","0.9s","0.6s","0.35s","0.15s"][t]} linear infinite;`}"
          aria-hidden="true"
        >
          <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.69 9.22,10.88C9.41,10.4 9.73,9.97 10.13,9.65C8.14,5.96 8.92,2 12.5,2Z" />
        </svg>
      </div>
    `}render(){if(!this._config)return q;if(!this.hass)return q;const t=this._fanState;if(!t)return K`<ha-card><div class="error">${this._t("card.config_required")}</div></ha-card>`;const e=this._currentSpeed,s="unavailable"===t.state,i=this._config.name||t.attributes?.friendly_name||this._t("card.name_default");return K`
      <ha-card>
        <div class="card-content ${s?"unavailable":""}">

          ${!1!==this._config.show_name?K`
              <div class="card-header">
                <div class="card-title">${i}</div>
              </div>
            `:q}

          ${s?K`<div class="unavailable-msg">${this._t("card.unavailable")}</div>`:q}

          <div class="fan-status-row">
            <div class="fan-status-main">
              ${this._renderSpeedIcon(e)}
              <div class="fan-info">
                <div class="fan-state">
                  ${this._activePreset?this._formatPreset(this._activePreset):this._t(this._speedStateKey(e))}
                </div>
                <div class="fan-pct">
                  ${this._isOn?this._activePreset?this._t("controls.preset"):`${wt(e)}%`:"—"}
                </div>
              </div>
            </div>

            ${this._fanSupportsDirection||this._fanSupportsPreset?K`
                <div class="header-controls">
                  ${this._fanSupportsDirection?K`
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
                    `:q}

                  ${this._fanSupportsPreset?K`
                      <select
                        class="preset-select ${this._activePreset?"active":""}"
                        .value=${vt(this._presetMode)}
                        @change=${this._setPreset}
                        ?disabled=${!this._isOn}
                        aria-label="${this._t("controls.preset")}"
                        title="${this._t("controls.preset")}"
                      >
                        ${this._presetModes.map(t=>K`<option value="${t}">${this._formatPreset(t)}</option>`)}
                      </select>
                    `:q}
                </div>
              `:q}
          </div>

          <div class="speed-bar">
            ${Array.from({length:6},(t,e)=>e+1).map(t=>K`
                <button
                  class="speed-seg ${e>=t&&e>0?"filled":""} ${e===t?"active":""}"
                  @click=${()=>this._setSpeed(t)}
                  ?disabled=${s}
                  aria-label="${this._t(this._speedLabelKey(t))}"
                  aria-pressed=${e===t}
                >
                  <span class="speed-seg-fill"></span>
                  <span class="speed-seg-num">${t}</span>
                </button>
              `)}
          </div>

          <div class="control-bar">
            <button
              class="ctrl-btn power ${this._isOn?"on":""}"
              @click=${this._togglePower}
              ?disabled=${s}
              aria-label="${this._t("controls.power")}"
              title="${this._t("controls.power")}"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <path d="M12 4v8"/>
                <path d="M7.8 6.8a6 6 0 1 0 8.4 0"/>
              </svg>
            </button>

            ${this._lightState?K`
                <button
                  class="ctrl-btn ${this._isLightOn?"on":""}"
                  @click=${this._toggleLight}
                  ?disabled=${s||!this._isOn}
                  aria-label="${this._t("controls.light")}"
                  title="${this._t("controls.light")}"
                >
                  <ha-icon icon="${this._isLightOn?"mdi:lightbulb-outline":"mdi:lightbulb-off-outline"}"></ha-icon>
                </button>
              `:q}

            ${this._soundState||this._timerState?K`<div class="ctrl-sep"></div>`:q}

            ${this._soundState?K`
                <button
                  class="ctrl-btn ${this._isSoundOn?"on":""}"
                  @click=${this._toggleSound}
                  ?disabled=${s||!this._isOn}
                  aria-label="${this._t("controls.sound")}"
                  title="${this._t("controls.sound")}"
                >
                  <ha-icon icon="${this._isSoundOn?"mdi:volume-high":"mdi:volume-off"}"></ha-icon>
                </button>
              `:q}

            ${this._timerState?K`
                <select
                  class="ctrl-select ${this._isTimerActive?"active":""}"
                  .value=${vt(String(this._timerValue))}
                  @change=${this._setTimer}
                  ?disabled=${s||!this._isOn}
                  aria-label="${this._t("controls.timer")}"
                  title="${this._t("controls.timer")}"
                >
                  ${this._timerOptions.map(t=>K`
                      <option value="${t}">${this._formatTimerOption(t)}</option>
                    `)}
                </select>
              `:q}
          </div>

          ${this._lightState&&this._isLightOn&&this._lightSupportsColorTemp?K`
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
                    .value=${String(this._currentKelvin)}
                    @change=${this._setColorTemp}
                    ?disabled=${s}
                    aria-label="${this._t("controls.color_temp")}"
                  />
                  <span class="temp-label cool">${this._t("controls.temp_cool")}</span>
                  <span class="temp-value">${this._currentKelvin}K</span>
                </div>
              </div>
            `:q}

        </div>
      </ha-card>
    `}}Ct.styles=o`
    :host {
      --wc-accent: #378add;
      --wc-accent-light: #e6f1fb;
      --wc-accent-dark: #0c447c;
      --wc-accent-mid: #185fa5;
      --wc-red-light: #fcebeb;
      --wc-red: #e24b4a;
      --wc-red-dark: #a32d2d;
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
      background: #e0912f;
      color: #fff;
    }
    .season-btn.winter.active {
      background: var(--wc-accent);
      color: #fff;
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
      box-shadow: 0 0 0 2px var(--wc-accent-light);
    }
    .preset-select.active {
      border-color: var(--wc-accent);
      background: var(--wc-accent);
      color: #fff;
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
      box-shadow: 0 0 0 2px var(--wc-accent-light);
    }
    .ctrl-select.active {
      border-color: var(--wc-accent);
      background: var(--wc-accent);
      color: #fff;
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
      color: #ba7517;
    }
    .temp-label.cool {
      color: #378add;
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
      color: var(--error-color, var(--wc-red));
    }
  `,t([ht({attribute:!1})],Ct.prototype,"hass",void 0),t([pt()],Ct.prototype,"_config",void 0),customElements.define("custom-fan-card",Ct),window.customCards=window.customCards||[],window.customCards.push({type:"custom-fan-card",name:"Custom Fan Card",description:"Custom card for smart ceiling fans (CREATE Windcalm, Klassfan, …)",preview:!0});
//# sourceMappingURL=custom-fan-card.js.map
