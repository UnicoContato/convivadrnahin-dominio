const header=document.getElementById('header');
const menuToggle=document.getElementById('menu-toggle');
const mobileMenu=document.getElementById('mobile-menu');
const privacyModal=document.getElementById('privacy-modal');
const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightbox-image');
const unitMap=document.getElementById('unit-map');
const floatingWhatsapp=document.querySelector('.floating-whatsapp');
let lastScroll=0;

const unitData={
  barra:{
    map:'https://www.google.com/maps?q=Rua%20Tulipa%20500%2C%20Barra%20do%20Cear%C3%A1%2C%20Fortaleza%20CE&output=embed',
    mapTitle:'Mapa da unidade Conviva Barra do Ceará',
    whatsapp:'https://wa.me/5585986271480?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido.'
  },
  iparana:{
    map:'https://www.google.com/maps?q=Avenida%20Ulisses%20Guimar%C3%A3es%201617%20A%2C%20Parque%20Leblon%2C%20Caucaia%20CE&output=embed',
    mapTitle:'Mapa da unidade Conviva Iparana',
    whatsapp:'https://wa.me/5585981013130?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido.'
  }
};

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

document.querySelectorAll('[data-unit-tab]').forEach(tab=>tab.addEventListener('click',()=>{
  const unit=tab.dataset.unitTab;
  const selected=unitData[unit];
  if(!selected)return;

  document.querySelectorAll('[data-unit-tab]').forEach(item=>{
    const active=item===tab;
    item.classList.toggle('active',active);
    item.setAttribute('aria-selected',String(active));
  });

  document.querySelectorAll('[data-unit-panel]').forEach(panel=>{
    const active=panel.dataset.unitPanel===unit;
    panel.classList.toggle('active',active);
    panel.hidden=!active;
  });

  unitMap.src=selected.map;
  unitMap.title=selected.mapTitle;
  floatingWhatsapp.href=selected.whatsapp;
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
