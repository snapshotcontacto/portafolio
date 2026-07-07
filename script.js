
const reveals=document.querySelectorAll('.reveal');
const io=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target);}})},{threshold:.12});
reveals.forEach(el=>io.observe(el));
