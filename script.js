const header=document.getElementById('header');
const menuToggle=document.getElementById('menu-toggle');
const mobileMenu=document.getElementById('mobile-menu');
const privacyModal=document.getElementById('privacy-modal');
const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightbox-image');
let lastScroll=0;

window.addEventListener('scroll',()=>{
  const current=window.scrollY;
  header.style.transform=current>lastScroll&&current>120?'translateY(-120%)':'translateY(0)';
  lastScroll=Math.max(current,0);
},{passive:true});

menuToggle.addEventListener('click',()=>{
  const open=mobileMenu.classList.toggle('hidden')===false;
  menuToggle.classList.toggle('menu-open',open);
  menuToggle.setAttribute('aria-expanded',open);
});

document.querySelectorAll('.mobile-link').forEach(link=>link.addEventListener('click',()=>{
  mobileMenu.classList.add('hidden');
  menuToggle.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded','false');
}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('active');observer.unobserve(entry.target);}
}),{threshold:.12,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(item=>observer.observe(item));

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.nav-link')];
window.addEventListener('scroll',()=>{
  const position=window.scrollY+180;
  const active=sections.filter(section=>position>=section.offsetTop).pop();
  navLinks.forEach(link=>link.classList.toggle('active',active&&link.getAttribute('href')===`#${active.id}`));
},{passive:true});

const openModal=modal=>{modal.classList.remove('hidden');document.body.style.overflow='hidden';};
const closeModal=modal=>{modal.classList.add('hidden');document.body.style.overflow='';};
document.getElementById('privacy-open').addEventListener('click',()=>openModal(privacyModal));
document.querySelectorAll('[data-close-modal]').forEach(item=>item.addEventListener('click',()=>closeModal(privacyModal)));
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{lightboxImage.src=item.dataset.image;openModal(lightbox);}));
document.querySelectorAll('[data-close-lightbox]').forEach(item=>item.addEventListener('click',()=>closeModal(lightbox)));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeModal(privacyModal);closeModal(lightbox);}});
document.getElementById('year').textContent=new Date().getFullYear();
