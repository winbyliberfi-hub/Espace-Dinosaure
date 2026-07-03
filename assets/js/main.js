
(function(){
  const body=document.body;
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.main-nav');
  const tools=document.querySelector('.header-tools');
  if(toggle){toggle.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);tools.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));});}
  document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');tools?.classList.remove('open');}));
  document.querySelectorAll('.lang-switch a').forEach(a=>a.addEventListener('click',()=>localStorage.setItem('preferredLangClicked','1')));
  if(body.dataset.lang==='ar' && (location.pathname.endsWith('/index.html') || location.pathname==='/')){
    if(!localStorage.getItem('preferredLangClicked') && !sessionStorage.getItem('languageChecked')){
      sessionStorage.setItem('languageChecked','1');
      const l=(navigator.language||'').toLowerCase();
      if(l.startsWith('fr')) location.href='fr/';
      else if(l.startsWith('en')) location.href='en/';
    }
  }
  document.querySelectorAll('.rail-btn').forEach(btn=>btn.addEventListener('click',()=>{const rail=btn.closest('.rail-block').querySelector('.media-rail');rail.scrollBy({left:Number(btn.dataset.scroll)*rail.clientWidth*.85,behavior:'smooth'});}));
  document.querySelectorAll('.media-rail').forEach(rail=>{let down=false,startX=0,left=0;rail.addEventListener('pointerdown',e=>{down=true;startX=e.clientX;left=rail.scrollLeft;rail.setPointerCapture(e.pointerId);});rail.addEventListener('pointermove',e=>{if(down)rail.scrollLeft=left-(e.clientX-startX);});rail.addEventListener('pointerup',()=>down=false);rail.addEventListener('pointerleave',()=>down=false);});
  const lb=document.querySelector('.lightbox');const lbImg=lb?.querySelector('img');
  document.querySelectorAll('[data-lightbox]').forEach(btn=>btn.addEventListener('click',()=>{lbImg.src=btn.dataset.lightbox;lb.classList.add('open');lb.setAttribute('aria-hidden','false');}));
  lb?.querySelector('button').addEventListener('click',()=>{lb.classList.remove('open');lb.setAttribute('aria-hidden','true');lbImg.removeAttribute('src');});
  lb?.addEventListener('click',e=>{if(e.target===lb)lb.querySelector('button').click();});
  document.querySelectorAll('.booking-form').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    const status=form.querySelector('.form-status');
    if(!data.name || !data.phone || !data.people){status.textContent=body.dataset.lang==='fr'?'Veuillez completer les champs essentiels.':body.dataset.lang==='en'?'Please complete the required fields.':'Merci de completer les champs essentiels.';return;}
    const lines=[body.dataset.contactSubject,'','Name: '+data.name,'Phone: '+data.phone,'Date: '+(data.date||'-'),'People: '+data.people,'Visit type: '+(data.type||'-'),'Message: '+(data.message||'-')];
    window.open(body.dataset.wa+'?text='+encodeURIComponent(lines.join('\n')),'_blank','noopener');
    status.textContent=body.dataset.lang==='fr'?'Votre message WhatsApp est pret.':body.dataset.lang==='en'?'Your WhatsApp message is ready.':'Votre message WhatsApp est pret.';
  }));
})();
