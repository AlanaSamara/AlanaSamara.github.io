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


// Botões do carousel para o campo de qualificações

const controls = document.querySelectorAll('.control');

let currentItem = 0;

const items = document.querySelectorAll('.item');

const maxItems = items.length;

controls.forEach(control => {
  control.addEventListener('click', () => {
    const isLeft = control.classList.contains("arrow-left");

    if (isLeft){
      currentItem -= 1;
    }else{
      currentItem += 1;
    }

    if (currentItem >= maxItems){
      currentItem = 0;
    }

    if (currentItem < 0 ){
      currentItem = maxItems - 1;
    }


    items.forEach(item => item.classList.remove('current-item'));

    items[currentItem].scrollIntoView({
      inline: "center",
      behavior: "smooth",
      block: "nearest"
    });

    items[currentItem].classList.add('current-item')
  })
});

// blabla

const controlsProjetos = document.querySelectorAll('.control-projetos');

let currentProjeto = 0;

const projetos = document.querySelectorAll('.projeto');

const maxProjetos = projetos.length;

controlsProjetos.forEach(controlProjetos => {
  controlProjetos.addEventListener('click', () => {
    const isLeft = controlProjetos.classList.contains("but-left");

    if (isLeft){
      currentProjeto -= 1;
    }else{
      currentProjeto += 1;
    }

    if (currentProjeto >= maxProjetos){
      currentProjeto = 0;
    }

    if (currentProjeto < 0 ){
      currentProjeto = maxProjetos  - 1;
    }

    if (currentProjeto == 3 ){
      document.querySelector('.escrever').innerHTML = 'Pessoal'

      document.querySelector('.preencher2').style.background = '#091133';

      document.querySelector('.preencher1').style.background = 'transparent';

      document.querySelector('.preencher3').style.background = 'transparent';

    }else if(currentProjeto == 4 ){
      document.querySelector('.escrever').innerHTML = 'Trabalho'

      document.querySelector('.preencher2').style.background = 'transparent';

      document.querySelector('.preencher1').style.background = 'transparent';

      document.querySelector('.preencher3').style.background = '#091133';


    }else{
      document.querySelector('.escrever').innerHTML = 'Estudos'

      document.querySelector('.preencher2').style.background = 'transparent';

      document.querySelector('.preencher1').style.background = '#091133';

      document.querySelector('.preencher3').style.background = 'transparent';    
    }

    console.log(currentProjeto)

    projetos.forEach(projeto => projeto.classList.remove('current-projeto'));

    projetos[currentProjeto].scrollIntoView({
      inline: "center",
      behavior: "smooth",
      block: "nearest"
    });

    projetos[currentProjeto].classList.add('current-projeto')
  })
});



