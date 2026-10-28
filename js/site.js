(function(){
  var P=window.__prefs,root=document.documentElement,btn=document.querySelector('.settings-toggle'),panel=document.getElementById('settings-panel');
  function save(){try{localStorage.setItem(P.KEY,JSON.stringify(P.p));}catch(x){}}
  function sync(){
    ['theme','fonts','motion'].forEach(function(n){var v=root.dataset[n];var el=panel.querySelector('input[name="'+n+'"][value="'+v+'"]');if(el)el.checked=true;});
  }
  function close(ret){panel.hidden=true;btn.setAttribute('aria-expanded','false');if(ret)btn.focus();}
  btn.addEventListener('click',function(){var o=panel.hidden;panel.hidden=!o;btn.setAttribute('aria-expanded',String(o));if(o)sync();});
  panel.addEventListener('change',function(e){var t=e.target;if(t.name){P.p[t.name]=t.value;save();P.apply();sync();}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden)close(true);});
  document.addEventListener('click',function(e){if(!panel.hidden&&!e.target.closest('.settings'))close(false);});
  // Close when Tab moves focus out of the settings, so the open panel never covers what gets focus next.
  btn.parentNode.addEventListener('focusout',function(e){if(!panel.hidden&&e.relatedTarget&&!btn.parentNode.contains(e.relatedTarget))close(false);});
  sync();P.onapply=sync;
  // Measure expressive vs plain fonts in this browser and set the size factors (average of x-height ratio and width ratio).
  function metrics(font,text){try{var c=document.createElement('canvas').getContext('2d');c.font=font;return {x:c.measureText('x').actualBoundingBoxAscent/100,w:c.measureText(text).width};}catch(e){return null;}}
  function factor(e,p){if(!e||!p||!p.x||!p.w)return 0;var v=(e.x/p.x+e.w/p.w)/2;return v>.7&&v<1.1?v:0;}
  (function(){var f=document.fonts,load=f&&f.load?Promise.all([f.load('400 100px "Alegreya"'),f.load('800 100px "Alegreya"')]):Promise.resolve();
    load.catch(function(){}).then(function(){return f&&f.ready;}).then(function(){
      var T1='A good question for an abstract title. My work is better described as leading the teams.',T2="Hi! I'm Kalib,";
      var serifE='"Alegreya","Lora",Georgia,serif',serifP='Georgia,"Times New Roman",serif';
      var fb=factor(metrics('400 100px '+serifE,T1),metrics('400 100px '+serifP,T1));
      var fd=factor(metrics('800 100px '+serifE,T2),metrics('700 100px '+serifP,T2));
      if(fb)root.style.setProperty('--plain-fb',fb.toFixed(3));if(fd)root.style.setProperty('--plain-fd',fd.toFixed(3));});})();
  try{sessionStorage.setItem(window.__seenKey,'1');}catch(e){}
  // Contact email is assembled by script, so it never appears in the page source.
  var ei=document.querySelector('.email-item');
  if(ei){
    var user=['kalibwatson','contact'].join('.'),domain=['gmail','com'].join('.');
    // <wbr> lets narrow screens break the address before the @ instead of cutting it off.
    var a=document.createElement('a');a.href='mailto:'+user+'@'+domain;a.append(user,document.createElement('wbr'),'@'+domain);
    ei.append(a);
  }
  // One-shot reveals. The bottom 22% of the window is ignored, so anything near the fold waits for a real scroll.
  var items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.2,rootMargin:'0px 0px -22% 0px'});
    items.forEach(function(el){io.observe(el);});
  }else{items.forEach(function(el){el.classList.add('in');});}
  window.__siteReady=true;
})();

// "On this page": mark the section currently being read.
(function(){
  var links=document.querySelectorAll('.toc a');if(!links.length||!('IntersectionObserver' in window))return;
  var map={};links.forEach(function(a){var h=document.getElementById(a.hash.slice(1));if(h)map[h.id]=a;});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){links.forEach(function(a){a.removeAttribute('aria-current');});map[e.target.id].setAttribute('aria-current','location');}
  });},{rootMargin:'0px 0px -70% 0px'});
  Object.keys(map).forEach(function(id){io.observe(document.getElementById(id));});
})();
