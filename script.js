// Botão de menu para mobile

const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event){
  if( event.type === 'touchstart') event.preventDefault();
  
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
  
  const active = nav.classList.contains('active');
  event.currentTarget.setAttribute('aria-expanded', active)
  if(active){ 
    event.currentTarget.setAttribute('aria-label', 'Fechar Menu')
  } else{
    event.currentTarget.setAttribute('aria-label', 'Abrir Menu')
  }
  console.log('blabla')
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);

//Animações do Scroll com o click no menu

const menuItens = document.querySelectorAll('#menu a[href^="#"]');

menuItens.forEach(item => {
  item.addEventListener('click', scrollToIdOnClick)
})

function getScrollTopByHref(element){
  const id = element.getAttribute('href');
  return document.querySelector(id).offsetTop;

}

function scrollToIdOnClick(event2){

  event2.preventDefault();

  nav.classList.toggle('active'); // Fechar o menu após um item ser clicado

  const to = getScrollTopByHref(event2.target) - 56; 
  // 56 = a ditancia que a barra de menu terá do inicio da section

  scrollToPosition(to);
}

function scrollToPosition(to){
  //   window.scroll({
  //   top: to,
  //   behavior: "smooth"
  // });

  smoothScrollTo(0, to, 900); //Parametros a serem passados para a animação: Eixo X, Eixo Y, Duração
  
}


// Smooth scroll animation function
 
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};

//Animações surgir com o Scroll

const debounce = function(func, wait, immediate){
  let timeout;
  return function (...args){
    const context = this;
    const later = function(){
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll(){
  const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4); 
  target.forEach(function(element){
    if( (windowTop) > element.offsetTop){
      element.classList.add(animationClass);
    }else{
      element.classList.remove(animationClass);
    }
  })
}

animeScroll();

if(target.length){
  window.addEventListener('scroll', debounce(function(){
    animeScroll();
}, 200));
}
