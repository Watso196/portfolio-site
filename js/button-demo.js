// Live "Save for later" button for the teams writing. Simulates a save so each state can be heard and seen.
(function(){
  var d=document.querySelector('.demo'),b=document.querySelector('.demo-btn'),s=document.getElementById('demo-status'),f=document.getElementById('demo-fail');
  if(!d||!b||!s)return;
  var busy=false,t,u;
  // The status region is cleared first so a repeated message is announced again.
  function say(msg,kind){clearTimeout(u);s.textContent='';s.dataset.kind='';u=setTimeout(function(){s.textContent=msg;s.dataset.kind=kind;},60);}
  b.addEventListener('click',function(){
    if(busy)return;
    busy=true;b.setAttribute('aria-disabled','true');say('Saving…','busy');
    t=setTimeout(function(){
      busy=false;b.removeAttribute('aria-disabled');
      if(f&&f.checked)say('Error: we couldn’t save that. Check your connection and try again.','error');
      else say('Saved for later.','ok');
    },1200);
  });
  if(f)f.addEventListener('change',function(){clearTimeout(u);s.textContent='';s.dataset.kind='';});
  // Shown only once it works, so a failed script never leaves a dead button on the page.
  d.classList.add('ready');
})();
