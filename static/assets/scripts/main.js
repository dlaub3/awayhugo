"use strict";const toggleClassList=t=>{const{target:e,classList:o}=t;e.forEach(t=>{for(const e of document.querySelectorAll(t))o.forEach(t=>e.classList.toggle(t))})},toggleAttribute=t=>{const{target:e,attributeList:a}=t;e.forEach(t=>{for(const o of document.querySelectorAll(t))a.forEach(t=>{var e=o.getAttribute(t);null===e&&o.toggleAttribute(t);e=null===e||"false"===e?"true":"false";o.setAttribute(t,e)})})},focusableElements=`
  button:not([disabled]), 
  [href], 
  input:not([disabled]), 
  select:not([disabled]), 
  textarea:not([disabled]), 
  [tabindex]:not([tabindex="-1"]):not([disabled]), 
  details:not([disabled]), 
  summary:not(:disabled)`,handleFocusInStas=t=>{},toggleMainNav=()=>{var t=["#main-nav"];if(toggleClassList({target:["body"],classList:["overflow-hidden"]}),toggleClassList({target:t,classList:["active","hidden"]}),toggleAttribute({target:t,attributeList:["aria-hidden"]}),(null===(t=document.querySelector("#main-nav"))||void 0===t?void 0:t.classList.contains("active"))||!1){for(const e of document.querySelectorAll(focusableElements))e.setAttribute("data-hidden","true");for(const o of[document.querySelector("#toggle-main-nav"),...document.querySelector("#main-nav").querySelectorAll(focusableElements)])o.removeAttribute("data-hidden")}else for(const a of document.querySelectorAll("[data-hidden]"))a.removeAttribute("data-hidden")};