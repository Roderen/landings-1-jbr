$(function () {
  $('.popup form').on('submit', function (e) {
    e.preventDefault();

    const $form = $(this);
    $form.addClass('sending');
    var data = new FormData($form[0]);

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: data,
      contentType: false,
      processData: false,
      success: (function (data) {
        if ($form.data('brochureUrl')) {
          window.location.href = $form.data('brochureUrl');
        }
        $form.addClass('thanks');
        $form.removeClass('sending');
        dataLayer.push({
          event: 'userEvent',
          eventCategory: 'conversions',
          eventAction: 'formSubmit',
          eventLabel: 'allLeads',
          eventNonInteraction: false,
          firingOptions: 'oncePerEvent'
        });
      }),
      error: (function () {
        alert('Oops... There was an error');
      })
    })
  });
});


/* Footer form */
$(function () {
  $('.footer__form').on('submit', function (e) {
    e.preventDefault();

    const $form = $(this);
    $form.addClass('sending');
    var data = new FormData($form[0]);

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: data,
      contentType: false,
      processData: false,
      success: (function (data) {
        $('.form__succsess').css('display', 'flex');
        $form.removeClass('sending');
        setTimeout(() => {
          $('.form__succsess').css('display', 'none');
        }, 5000);
        dataLayer.push({
          event: 'userEvent',
          eventCategory: 'conversions',
          eventAction: 'formSubmit',
          eventLabel: 'allLeads',
          eventNonInteraction: false,
          firingOptions: 'oncePerEvent'
        });
      }),
      error: (function () {
        alert('Oops... There was an error');
      })
    })
  });
});


/* Slider interior ================ */
document.addEventListener('DOMContentLoaded', () => {
  if (innerWidth > 802) {
    const swiperInterior = new Swiper('.interior-slider-container', {
      direction: 'horizontal',
      loop: true,

      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },

      autoplay: {
        delay: 2500,
      },

      pagination: {
        el: '.interior-slider-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.interior-button-slider-next',
        prevEl: '.interior-button-slider-prev',
      },
    });
  } else {
    const swiperInterior = new Swiper('.interior-slider-container', {
      direction: 'horizontal',
      loop: true,
      spaceBetween: 30,

      pagination: {
        el: '.interior-slider-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.interior-button-slider-next',
        prevEl: '.interior-button-slider-prev',
      },
    });
  }
})


/* Slider discover ================ */
const swiperDiscover = new Swiper('.discover__slider', {
  direction: 'horizontal',
  loop: true,

  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },

  navigation: {
    nextEl: '.discover__slider-button-next',
    prevEl: '.discover__slider-button-prev',
  },
});

/* Slider projects ================ */
const swiperProjects = new Swiper('.projects__item-slider', {
  direction: 'horizontal',
  loop: true,

  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },

  navigation: {
    prevEl: '.projects__item-slider__button-prev',
    nextEl: '.projects__item-slider__button-next',
  },

  pagination: {
    el: '.projects__item-slider-pagination',
    clickable: true,
  },
});


/* Burger menu ========================= */
function burgerMenu() {
  const burgerBtn = document.querySelector('.burger__btn');
  const burgerMenu = document.querySelector('.burger__menu');

  burgerBtn.addEventListener('click', () => {
    burgerMenu.classList.add('active');
    document.body.classList.add('active');
  })

  burgerMenu.addEventListener('click', (item) => {
    if (item.target.classList.contains('burger__menu-close') || item.target.classList.contains('burger__overlay')) {
      burgerMenu.classList.remove('active');
      document.body.classList.remove('active');
    }
  })
}

burgerMenu();


// Invalid input
function invalidInput() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const popupFormInputs = form.querySelectorAll('input');
    const popupFormBtn = form.querySelector('button[type="submit"]');

    popupFormBtn.addEventListener('click', () => {
      popupFormInputs.forEach(footerInput => {
        if (!footerInput.value && !footerInput.checked) {
          footerInput.classList.add('invalid-input')
        } else {
          footerInput.classList.remove('invalid-input');
        }
      })
    });

    popupFormInputs.forEach(input => {
      input.addEventListener('change', () => {
        if (!input.value) {
          input.classList.remove('input-valid');
        } else {
          input.classList.add('input-valid');
        }
      })
    })
  })
}

invalidInput();


/* Open and Close Popup */
function openPopups() {
  const popups = document.querySelectorAll('.popup');
  const popupClose = document.querySelectorAll('.popup-close');
  const popupBtn = document.querySelectorAll('.popup-button');
  const popupBtnDiscover = document.querySelectorAll('.popup-button-discover');

  popupBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      popups.forEach(popup => {
        if (btn.dataset.popup == popup.dataset.popup) {
          popup.classList.add('active');
          document.body.classList.add('active');

          if (btn.dataset.src) {
            const popupImg = popup.querySelector('.popup__logo')
            if (popupImg.querySelector('img')) {
              popupImg.innerHTML = '';
              popupImg.appendChild(document.createElement('img')).setAttribute('src', `${btn.dataset.src}`)
            } else {
              popupImg.appendChild(document.createElement('img')).setAttribute('src', `${btn.dataset.src}`)
            }
          }
        }
      })
    })
  })

  popupClose.forEach(closeItem => {
    closeItem.addEventListener('click', e => {
      popups.forEach(popup => {
        popup.classList.remove('active');
        document.body.classList.remove('active');
      })
    })
  })
}

openPopups();

/* Limit number and email */
const limitNumber = e => {
  const value = e.value;
  e.value = value.replace(/[A-Za-zА-Яа-яЁё]/g, '');
}

const limitEmail = e => {
  const value = e.value;
  e.value = value.replace(/[А-Яа-яЁё]/g, '');
}

// Scroll anchor
function scrollToAnchor() {
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - '50'
        }, 700);
        return false;
      }
    }
  });
};
scrollToAnchor();


function floorTabs() {
  const buttons = document.querySelectorAll('.floor__buttons--btn');
  const buttonsContainer = document.querySelector('.floor__buttons-list');
  const current = document.querySelector('.floor__buttons-current');
  const info = document.querySelectorAll('.floor__info');
  let currentTab = 0;

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (current) {
        buttonsContainer.classList.remove('active');
        current.innerHTML = btn.innerText;
      }
      currentTab = index;
      renderTabs();
    })
  })

  current.addEventListener('click', () => {
    buttonsContainer.classList.toggle('active');
  })

  function renderTabs() {
    buttons.forEach(btn => {
      btn.classList.contains('active') && btn.classList.remove('active');
    })
    buttons[currentTab].classList.add('active');

    info.forEach(item => {
      item.classList.contains('active') && item.classList.remove('active');
    })
    info[currentTab].classList.add('active');
  }

  renderTabs();
}

if (document.body.classList.contains('floor-plans-page')) {
  floorTabs();
}


function moreTabs() {
  const buttons = document.querySelectorAll('.more__buttons-btn');
  const buttonsContainer = document.querySelector('.more__buttons-list');
  const current = document.querySelector('.more__buttons-current');
  const info = document.querySelectorAll('.more__list-info');
  let currentMoreTab = 0;

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (current) {
        buttonsContainer.classList.remove('active');
        current.innerHTML = btn.innerText;
      }
      currentMoreTab = index;
      renderTabs();
    })
  })

  current.addEventListener('click', () => {
    buttonsContainer.classList.toggle('active');
  })

  function renderTabs() {
    buttons.forEach(btn => {
      btn.classList.contains('active') && btn.classList.remove('active');
    })
    buttons[currentMoreTab].classList.add('active');

    info.forEach(item => {
      item.classList.contains('active') && item.classList.remove('active');
    })
    info[currentMoreTab].classList.add('active');
  }

  renderTabs();
}

if (document.body.classList.contains('main-page')) moreTabs();


/* Form succsess =============================== */
const formSuccsess = document.querySelector('.form__succsess');
document.querySelector('.form__succsess-close').addEventListener('click', () => {
  formSuccsess.style.display = 'none';
})


// Popup video
function videoPopup() {
  const videoPopup = document.querySelectorAll('.popup-video');
  const videoPopupBtn = document.querySelectorAll('.popup-button');

  videoPopupBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      videoPopup.forEach(popup => {
        const videoPopupInner = popup.querySelector('.popup-video .popup__inner');

        if (btn.dataset.popup === popup.dataset.popup) {
          popup.style.display = 'flex';
          setTimeout(() => {
            popup.classList.add('active');
          }, 1)
          document.body.classList.add('active');
          videoPopupInner.innerHTML = `
           <iframe width = "560" height = "315" src = "https://www.youtube.com/embed/SKDjFAKkbJM" title = "YouTube video player" frameBorder = "0" allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          `;
        }
      })
    })
  })

  videoPopup.forEach(popup => {
    const videoPopupInner = popup.querySelector('.popup-video .popup__inner');

    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('active');
        popup.style.display = 'none'
        document.body.classList.remove('active');
        videoPopupInner.innerHTML = ``;
      }
    })
  })
};
videoPopup();


/* For All Sites ================================== */
$(document).ready(function () {
  let userPower = {};
  $(document).on('input', 'input', function () {
    let name = $(this).attr('name');
    if (typeof userPower[name] !== "undefined") {
      userPower[name] = userPower[name] + 1;
    } else {
      userPower[name] = 1;
    }
  }).on('focus', 'input', function () {
    if (typeof userPower['focus'] !== "undefined") {
      userPower['focus'] = userPower['focus'] + 1;
    } else {
      userPower['focus'] = 1;
    }
  }).on('click', 'button, a', function () {
    if (typeof userPower['click'] !== "undefined") {
      userPower['click'] = userPower['click'] + 1;
    } else {
      userPower['click'] = 1;
    }
  });
  $('form').submit(function () {
    userPoints(userPower);
  });
});

function userPoints(userPower) {
  let user_ses = 0,
      input_score = 0;
  user_ses = user_ses + (Object.keys(userPower).length / 10);

  if (typeof userPower['focus'] !== "undefined" && userPower['focus'] >= (Object.keys(userPower).length - 2)) {
    user_ses = user_ses + 0.2;
  }
  if (typeof userPower['click'] !== "undefined") {
    user_ses = user_ses + 0.1;
  }
  for (const [key, value] of Object.entries(userPower)) {
    if (key != 'focus' && key != 'click') {
      input_score = input_score + value;
    }
  }
  if (typeof userPower['focus'] !== "undefined" && input_score >= (Object.keys(userPower).length - 2)) {
    user_ses = user_ses + 0.2;
  }
  saveCookie('user_score', user_ses);

  return user_ses;
}

function saveCookie(n, v, t = 30) {
  let saveDate = new Date(Date.now() + (60 * 60 * 24 * t * 1000));
  document.cookie = n + "=" + v + "; path=/; expires=" + saveDate.toGMTString();
}

function readCookie(name) {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}