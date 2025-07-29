import{a as x,S as v,i as c}from"./assets/vendor-DSElq03b.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();async function u(t,r){const o="https://pixabay.com/api/?",a=new URLSearchParams({key:"51454782-596154fd852b0fd151dc4a6b5",image_type:"photo",orientation:"horizontal",safesearch:!0,q:t,page:r,per_page:"12"});return(await x(`${o}${a}`)).data}const h=document.querySelector(".gallery"),m=document.querySelector(".loader"),p=document.querySelector("#load-btn"),S=new v(".gallery a",{captionsData:"alt",captionDelay:250});function g(t){const r=t.map(({webformatURL:o,largeImageURL:a,tags:e,likes:s,views:n,comments:b,downloads:C})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${a}">
          <img
            class="gallery-image"
            src="${o}"
            alt="${e}"
          />
        </a>
        <div class="description-wrappwer">
            <p class="text-likes text">Likes ${s}</p>
            <p class="text-views text">Views ${n}</p>
            <p class="text-comments text">Comments ${b}</p>
            <p class="text-comments text">Downloads ${C}</p>
        </div>
      </li>`).join("");h.insertAdjacentHTML("beforeend",r),S.refresh()}function $(){h.innerHTML=""}function y(){m.classList.remove("hidden")}function d(){m.classList.add("hidden")}function L(){p.classList.remove("hidden")}function l(){p.classList.add("hidden")}function w(t){t<12?(c.show({message:"We're sorry, but you've reached the end of search results.",position:"topCenter",color:"#ef4040",messageColor:"#fff",titleColor:"#fff"}),l()):L()}const q=document.querySelector("form");q.addEventListener("submit",B);const P=document.querySelector("#load-btn");let i=1,f="";async function B(t){t.preventDefault(),y(),l();const r=t.target.elements["search-text"].value.trim();if(!r){d(),c.show({message:"Please, fill in the search field!",position:"topCenter",color:"#ef4040",messageColor:"#fff",titleColor:"#fff"});return}i=1,f=r,$();try{const o=await u(f,i);if(!o.hits.length){c.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter",color:"#ef4040",messageColor:"#fff",titleColor:"#fff"});return}g(o.hits),console.log(o.totalHits),w(o.hits.length)}catch(o){console.log(o)}finally{d()}}P.addEventListener("click",async()=>{i+=1,l(),y();try{const t=await u(f,i);g(t.hits);const r=document.querySelector(".gallery-item");if(r){const o=r.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}t.hits.length<12||i*12>=t.totalHits?l():L(),w(t.hits.length)}catch(t){console.log(t)}finally{d()}});
//# sourceMappingURL=index.js.map
