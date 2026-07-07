const revealElements=document.querySelectorAll('.reveal');
const revealObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}})},{threshold:.12});
revealElements.forEach(el=>revealObserver.observe(el));

const galleryImages=Array.from(document.querySelectorAll('.open-lightbox'));
const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightbox-img');
const closeBtn=document.querySelector('.lightbox-close');
const prevBtn=document.querySelector('.lightbox-prev');
const nextBtn=document.querySelector('.lightbox-next');
let currentIndex=0;
function openLightbox(index){currentIndex=index;const img=galleryImages[currentIndex];lightboxImg.src=img.src;lightboxImg.alt=img.alt||'Fotografía Snapshot';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function showNext(){openLightbox((currentIndex+1)%galleryImages.length)}
function showPrev(){openLightbox((currentIndex-1+galleryImages.length)%galleryImages.length)}
galleryImages.forEach((img,index)=>img.addEventListener('click',()=>openLightbox(index)));
closeBtn.addEventListener('click',closeLightbox);nextBtn.addEventListener('click',showNext);prevBtn.addEventListener('click',showPrev);
lightbox.addEventListener('click',(e)=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',(e)=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowRight')showNext();if(e.key==='ArrowLeft')showPrev()});
let touchStartX=0;lightbox.addEventListener('touchstart',(e)=>{touchStartX=e.changedTouches[0].screenX},{passive:true});lightbox.addEventListener('touchend',(e)=>{const x=e.changedTouches[0].screenX;if(x<touchStartX-50)showNext();if(x>touchStartX+50)showPrev()},{passive:true});
