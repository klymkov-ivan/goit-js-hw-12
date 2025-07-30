import{a as b,S as x,i as l}from"./assets/vendor-DSElq03b.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();async function u(t,o){const r="https://pixabay.com/api/?",a=new URLSearchParams({key:"51454782-596154fd852b0fd151dc4a6b5",image_type:"photo",orientation:"horizontal",safesearch:!0,q:t,page:o,per_page:"15"});return(await b(`${r}${a}`)).data}const m=document.querySelector(".gallery"),h=document.querySelector(".loader"),p=document.querySelector("#load-btn"),v=new x(".gallery a",{captionsData:"alt",captionDelay:250});function g(t){const o=t.map(({webformatURL:r,largeImageURL:a,tags:e,likes:s,views:n,comments:w,downloads:C})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${a}">
          <img
            class="gallery-image"
            src="${r}"
            alt="${e}"
          />
        </a>
        <div class="description-wrappwer">
            <p class="text-likes text">Likes ${s}</p>
            <p class="text-views text">Views ${n}</p>
            <p class="text-comments text">Comments ${w}</p>
            <p class="text-comments text">Downloads ${C}</p>
        </div>
      </li>`).join("");m.insertAdjacentHTML("beforeend",o),v.refresh()}function S(){m.innerHTML=""}function y(){h.classList.remove("hidden")}function c(){h.classList.add("hidden")}function $(){p.classList.remove("hidden")}function d(){p.classList.add("hidden")}const q=document.querySelector("form"),P=document.querySelector("#load-btn");q.addEventListener("submit",B);P.addEventListener("click",O);let i=1,f="";const M=15;function L(t){i*M>=t?(l.show({message:"We're sorry, but you've reached the end of search results.",position:"topCenter",color:"#ef4040",messageColor:"#fff",titleColor:"#fff"}),d()):$()}async function B(t){t.preventDefault(),y(),d();const o=t.target.elements["search-text"].value.trim();if(!o){c(),l.show({message:"Please, fill in the search field!",position:"topCenter",color:"#ef4040",messageColor:"#fff",titleColor:"#fff"});return}i=1,f=o,S();try{const r=await u(f,i);if(!r.hits.length){l.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter",color:"#ef4040",messageColor:"#fff",titleColor:"#fff"});return}g(r.hits),L(r.totalHits)}catch(r){console.log(r),l.show({message:"Sorry, something went wrong.",position:"topCenter",color:"#ef4040",messageColor:"#fff",titleColor:"#fff"})}finally{c()}}async function O(){i+=1,d(),y();try{const t=await u(f,i);g(t.hits);const o=document.querySelector(".gallery-item");if(o){const r=o.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}L(t.totalHits)}catch(t){console.log(t)}finally{c()}}
//# sourceMappingURL=index.js.map
