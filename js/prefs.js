(function(){
  var r=document.documentElement,KEY='kalib-display',p={theme:null,fonts:'expressive',motion:null};
  try{var s=JSON.parse(localStorage.getItem(KEY)||'{}');for(var k in s)p[k]=s[k];}catch(e){}
  var light=matchMedia('(prefers-color-scheme: light)').matches,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.__prefs={p:p,KEY:KEY,apply:function(){r.dataset.theme=p.theme||(light?'light':'dark');r.dataset.fonts=p.fonts;r.dataset.motion=p.motion||(reduce?'off':'on');}};
  window.__prefs.apply();
  r.className='js';
  var sk='kalib-seen:'+location.pathname;window.__seenKey=sk;
  var nt='';try{nt=performance.getEntriesByType('navigation')[0].type;}catch(e){}
  try{if(nt!=='reload'&&sessionStorage.getItem(sk))r.dataset.seen='1';}catch(e){}
})();
