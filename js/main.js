//Відео з ютубу на фон
$(function () {
  $('#bgndVideo').YTPlayer();
});

//ставлю гіфку загрузки посередині секції
function positionElem() {
  const loadGifHeight = document.querySelector('.load').clientHeight;
  const heroSectionHeight = document.querySelector('.hero').clientHeight / 2 - 174;

  document.querySelector('.load').style.marginTop = heroSectionHeight - loadGifHeight + 'px';
}

//Прижав контентну частину до низу екрана Herp Section
const heroSectionHeight = document.querySelector('.hero').clientHeight - 174 + 'px';
const heroBody = document.querySelector('.hero__body');

$(window).on('ready load resize change', function () {
  heroBody.style.minHeight = heroSectionHeight;

  //Забираю відступ у текста коли його висота більше ніж 3 строки
  marginOff();

  // Роблю висоту квадрата на фоні такої ж висоти що й картинка
  changeBGSize();

  // Переміщаю елемент з одного блока в інший
  changeElemTemplate();

  // Вирівнюю текст у latests по висоті
  textAlignHeight1();

  //ставлю гіфку загрузки посередині секції
  positionElem();
});

//Забираю відступ у текста коли його висота більше ніж 3 строки
function marginOff() {
  const aboutTextHeight = document.querySelector('.abcr__text').clientHeight;
  const constTextHeight1 = 77;
  const constTextHeight2 = 260;

  if (window.matchMedia('(min-width:992px)').matches) {
    if (aboutTextHeight > constTextHeight1) {
      document.querySelector('.abcr__text').style.marginBottom = 0;
    }

    if (aboutTextHeight > constTextHeight2) {
      document.querySelector('.abcr__text-content').style.maxWidth = '100%';
    }
  }
}

// Розмір блоків в секції Latest коли дочірних елементів менше
function changeBlockWidth() {
  const latestBlocks = document.querySelectorAll('.latest__content .lc');
  const latestBlocksLength = latestBlocks.length;

  // При ширині екрану більше 1200px
  if (window.matchMedia('(min-width:740px)').matches) {
    if (latestBlocksLength < 3) {
      latestBlocks.forEach(function (el) {
        el.style.maxWidth = '360px';
      });
    }
  }
}
changeBlockWidth();

// Роблю висоту квадрата на фоні такої ж висоти що й картинка
function changeBGSize() {
  const informationImgHeigh = document.querySelector('.ic__image').clientHeight;
  const informationImgWidth = document.querySelector('.ic__image').clientWidth;

  const informationBgImg = document.querySelector('.ic__image-bg');
  informationBgImg.style.height = informationImgHeigh + 'px';
  informationBgImg.style.width = informationImgWidth + 100 + 'px';
}

// Переміщаю елемент з одного блока в інший
function changeElemTemplate() {
  if (window.matchMedia('(max-width:880px)').matches) {
    //при ширине окна менее 768px перемещаем фильтр в шапку
    $('.itc__text-content').appendTo('.about-body__column-left');
  } else {
    //в противном случае перемещаем в своё обычное место
    $('.itc__text-content').appendTo('.itc');
  }
}

// Вирівнюю текст у latests по висоті
function textAlignHeight1() {
  if (window.matchMedia('(min-width:740px)').matches) {
    // Descr
    const latestsDescr = document.querySelectorAll('.lc__descr');
    const latestsDescrHeight = Array.from(latestsDescr).map((e) => e.offsetHeight);
    const maxHeightDescr = Math.max(...latestsDescrHeight);
    for (let i = 0; i < latestsDescr.length; i++) {
      latestsDescr[i].style.minHeight = maxHeightDescr + 'px';
    }

    // Текст
    const latestsTitle = document.querySelectorAll('.lc__title');
    const latestsTitleHeight = Array.from(latestsTitle).map((e) => e.offsetHeight);
    const maxHeightTitle = Math.max(...latestsTitleHeight);
    for (let i = 0; i < latestsTitle.length; i++) {
      latestsTitle[i].style.minHeight = maxHeightTitle + 'px';
    }
  }
}

// Клас для меню коли ми його проскролили
$(window).on('load resize scroll rady', function () {
  const windowScrollTop = window.pageYOffset;
  const headerHeight = document.querySelector('.header').clientHeight;

  if (windowScrollTop > headerHeight) {
    document.querySelector('.header').classList.add('header--scrolled');
  } else {
    document.querySelector('.header').classList.remove('header--scrolled');
  }
});

// Burger menu
const burgerMenu = document.querySelector('#showBtn');
const backdrop = document.querySelector('.backdrop');
const menuBody = document.getElementById('menu');
let clickCountMenu = 0;

burgerMenu.addEventListener('click', function () {
  clickCountMenu++;
  if (clickCountMenu % 2 !== 0) {
    backdrop.style.opacity = 1;
    backdrop.style.pointerEvents = 'all';
    menuBody.style.pointerEvents = 'all';
    menuBody.style.display = 'block';
  } else {
    backdrop.style.opacity = 0;
    backdrop.style.pointerEvents = 'none';
    menuBody.style.pointerEvents = 'none';
    menuBody.style.display = 'none';
  }
});

backdrop.addEventListener('click', function () {
  if (clickCountMenu % 2 !== 0) {
    clickCountMenu++;
    burgerMenu.checked = false;
    backdrop.style.opacity = 0;
    backdrop.style.pointerEvents = 'none';
    menuBody.style.pointerEvents = 'none';
    menuBody.style.display = 'none';
  }
});

const links = document.querySelectorAll('.nav-box--link');

links.forEach(function (el) {
  el.addEventListener('click', function () {
    clickCountMenu++;
    burgerMenu.checked = false;
    backdrop.style.opacity = 0;
    backdrop.style.pointerEvents = 'none';
    menuBody.style.pointerEvents = 'none';
    menuBody.style.display = 'none';
  });
});

// Плавна прокрутка до блоку
const anchors = document.querySelectorAll('a[href^="#s-"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute('href');
    if (window.matchMedia('(min-width: 900px)').matches) {
      document.querySelector('' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      document.querySelector('' + blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
}

// Прокрутка до геро блока
const headerLink = document.querySelector('.header--logo');
headerLink.addEventListener('click', (e) => {
  e.preventDefault;
  document.querySelector('#s-hero').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

// Прокрутка до геро блока
const headerLink2 = document.querySelector('.fli--logo');
headerLink2.addEventListener('click', (e) => {
  e.preventDefault;
  document.querySelector('#s-hero').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

// Активний клас для навігації при скролі
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (window.matchMedia('(min-width: 992px)').matches) {
        if (entry.isIntersecting) {
          document.querySelectorAll('a[href^="#s-"]').forEach((link) => {
            // Забираємо хештег і зрівнюємо id
            if (link.getAttribute('href').replace('#', '') === entry.target.id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      } else {
        document.querySelectorAll('a[href^="#s-"]').forEach((link) => {
          link.classList.remove('active');
        });
      }
    });
  },
  {
    threshold: 0.4,
  }
);

document.querySelectorAll('section').forEach((section) => {
  observer.observe(section);
});

// Зум фото при нажимані API
function imageGallery() {
  // Single
  Fancybox.bind('[data-fancybox="gallery-single"]', {
    groupAttr: false,
  });

  // About
  Fancybox.bind('[data-fancybox="gallery-group1"]', {
    // Your options
  });

  // Tour
  Fancybox.bind('[data-fancybox="gallery-group2"]', {
    // Your options
  });

  // TInteresting
  Fancybox.bind('[data-fancybox="gallery-group3"]', {
    // Your options
  });
}
imageGallery();
