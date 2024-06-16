import{S as h,i}from"./assets/vendor-15b9e606.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const p="live_uHLyHJBkbU30E2eAbBnE4j4c91nwJJcb6QIQlzlRwKeysrBcyI8jqwkjXADjKRXJ",m="https://api.thecatapi.com/v1";function g(){const t=new URLSearchParams({api_key:p}),o=`${m}/breeds?${t}`;return fetch(o).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})}function y(t){const o=new URLSearchParams({api_key:p,breed_ids:t}),r=`${m}/images/search?${o}`;return fetch(r).then(s=>{if(!s.ok)throw new Error(s.statusText);return s.json()})}const f={loaderComponent:document.querySelector(".loader"),catInfo:document.querySelector(".cat-info"),catsSelect:document.querySelector(".cat-breeds")};function d(t){t.classList.contains("is-hidden")||t.classList.add("is-hidden")}function l(t){t.classList.contains("is-hidden")&&t.classList.remove("is-hidden")}async function w(t){let o;const r=t[0].value,{loaderComponent:s,catInfo:e}=f;if(d(e),!r)return;try{l(s),d(e),[o]=await y(r)}catch{i.error({title:"Error",message:"Oops! Something went wrong! Try another option!",position:"topRight"});return}finally{d(s)}if(!o){i.error({title:"Error",message:"No data found for the Cat Breed.",position:"topRight"});return}const{url:n,breeds:a}=o,c=a.find(u=>u.id===r);if(!c||!n){i.error({title:"Error",message:"No data found for the Cat Breed.",position:"topRight"});return}_(c.name,c.description,c.temperament,n)}function _(t,o,r,s){const{catInfo:e}=f,n=`
    <div class="cat-card">
      <div class="cat-card__image-holder">
        <img class="cat-card__image" src="${s}" alt="${t}" />
      </div>
      <div class="cat-card__info-holder">
        <h2 class="cat-card__name">${t}</h2>
        <p class="cat-card__description">${o}</p>
        <p class="cat-card__temperament">
          <span><b>Temperament:</b></span>
          <span>${r}</span>
        </p>
      </div>
    </div>
  `;e.innerHTML=n,l(e)}(async()=>{const{loaderComponent:t,catsSelect:o}=f;try{l(t);const r=await g();if(!r)return;const s=['<option value="">Select a cat breed</option>'].concat(r.map(e=>`<option value="${e.id}">${e.name}</option>`));o.innerHTML=s.join(""),new h({select:".cat-breeds",settings:{allowDeselect:!1},events:{afterChange:w}}),l(o)}catch{i.error({title:"Error",message:"Oops! Something went wrong! Try reloading the page!",position:"topRight"})}finally{d(t)}})();
//# sourceMappingURL=commonHelpers.js.map
