document.addEventListener('DOMContentLoaded',()=>{
  const buttons=[...document.querySelectorAll('[data-filter]')];
  const cards=[...document.querySelectorAll('.archive-card[data-region]')];
  const empty=document.querySelector('.archive-empty');
  buttons.forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    buttons.forEach(item=>{const active=item===button;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active));});
    let visible=0;
    cards.forEach(card=>{const show=filter==='todas'||card.dataset.region===filter;card.hidden=!show;if(show)visible++;});
    if(empty)empty.hidden=visible>0;
  }));
});
