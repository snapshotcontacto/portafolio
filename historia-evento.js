document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('.story-grid img'));
  const lightbox = document.getElementById('lightbox');
  const image = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const close = lightbox?.querySelector('.lightbox-close');
  const previous = lightbox?.querySelector('.lightbox-prev');
  const next = lightbox?.querySelector('.lightbox-next');
  if (!lightbox || !image || !images.length) return;

  if (caption) {
    caption.textContent = '';
    caption.hidden = true;
  }

  let current = 0;
  const show = index => {
    current = (index + images.length) % images.length;
    image.src = images[current].currentSrc || images[current].src;
    image.alt = images[current].alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-active');
  };
  const hide = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-active');
    image.removeAttribute('src');
  };

  images.forEach((item, index) => {
    item.tabIndex = 0;
    item.addEventListener('click', () => show(index));
    item.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        show(index);
      }
    });
  });
  close?.addEventListener('click', hide);
  previous?.addEventListener('click', () => show(current - 1));
  next?.addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) hide(); });
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') hide();
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
});
