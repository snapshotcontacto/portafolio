document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.video-diferido[data-youtube-id]').forEach(container => {
    const button = container.querySelector('.video-portada');
    if (!button) return;
    button.addEventListener('click', () => {
      const id = container.dataset.youtubeId;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
      iframe.title = 'Video teaser de la boda de Luis y Claudia';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      container.replaceChildren(iframe);
    });
  });
});
