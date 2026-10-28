(function(){
  var r=document.documentElement,KEY='kalib-display',p={theme:null,fonts:'expressive',motion:null};
  try{var s=JSON.parse(localStorage.getItem(KEY)||'{}');for(var k in s)p[k]=s[k];}catch(e){}
  var light=matchMedia('(prefers-color-scheme: light)'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
  window.__prefs={p:p,KEY:KEY,apply:function(){r.dataset.theme=p.theme||(light.matches?'light':'dark');r.dataset.fonts=p.fonts;r.dataset.motion=p.motion||(reduce.matches?'off':'on');}};
  window.__prefs.apply();
  // Follow system theme/motion changes while the page is open (a saved choice still wins). site.js sets onapply to keep the radios in step.
  function follow(){window.__prefs.apply();if(window.__prefs.onapply)window.__prefs.onapply();}
  [light,reduce].forEach(function(m){if(m.addEventListener)m.addEventListener('change',follow);else m.addListener(follow);});
  r.className='js';
  // If site.js never finishes (blocked, failed to load, or errored), fall back to the no-script page so nothing stays hidden or inert.
  document.addEventListener('DOMContentLoaded',function(){if(!window.__siteReady)r.classList.remove('js');});
  var sk='kalib-seen:'+location.pathname;window.__seenKey=sk;
  var nt='';try{nt=performance.getEntriesByType('navigation')[0].type;}catch(e){}
  try{if(nt!=='reload'&&sessionStorage.getItem(sk))r.dataset.seen='1';}catch(e){}
})();
