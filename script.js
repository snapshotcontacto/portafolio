
const reveals=document.querySelectorAll('.reveal');
const io=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target);}})},{threshold:.12});
reveals.forEach(el=>io.observe(el));

// Snapshot V4.4 — Lightbox profesional para Portafolio Editorial
(function(){
  const items = Array.from(document.querySelectorAll('.signature-portfolio .mosaic-item[data-full]'));
  const lightbox = document.querySelector('.snapshot-lightbox');
  if(!items.length || !lightbox) return;

  const img = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  let current = 0;

  function openAt(index){
    current = (index + items.length) % items.length;
    const item = items[current];
    const src = item.dataset.full || item.querySelector('img')?.src;
    const title = item.dataset.title || item.querySelector('img')?.alt || 'Fotografía Snapshot';
    img.src = src;
    img.alt = title;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function close(){
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    setTimeout(()=>{ if(!lightbox.classList.contains('is-open')) img.src=''; }, 250);
  }

  function next(){ openAt(current + 1); }
  function prev(){ openAt(current - 1); }

  items.forEach((item, index)=>{
    item.addEventListener('click', ()=>openAt(index));
    item.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openAt(index); }
    });
  });

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) close(); });

  document.addEventListener('keydown', (e)=>{
    if(!lightbox.classList.contains('is-open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowRight') next();
    if(e.key === 'ArrowLeft') prev();
  });
})();

// Consulta de disponibilidad: prepara la información y abre WhatsApp.
(function(){
  const form = document.querySelector('#availability-form');
  if(!form) return;

  form.addEventListener('submit', (event)=>{
    event.preventDefault();
    if(!form.reportValidity()) return;

    const data = new FormData(form);
    const rawDate = String(data.get('date') || '');
    const date = rawDate
      ? new Intl.DateTimeFormat('es-MX',{day:'2-digit',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${rawDate}T00:00:00Z`))
      : 'Por definir';
    const details = String(data.get('details') || '').trim() || 'Sin detalles adicionales por ahora.';
    const message = [
      'Hola Snapshot Fotografía, queremos consultar la disponibilidad para nuestra boda.',
      '',
      `Nombres: ${String(data.get('names') || '').trim()}`,
      `Fecha: ${date}`,
      `Lugar: ${String(data.get('place') || '').trim()}`,
      `Cobertura: ${String(data.get('service') || '').trim()}`,
      `Detalles: ${details}`
    ].join('\n');

    if(typeof window.gtag === 'function') window.gtag('event','submit_disponibilidad_whatsapp');
    window.location.href = `https://wa.me/522461718808?text=${encodeURIComponent(message)}`;
  });
})();
