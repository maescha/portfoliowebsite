//reveal function taken from https://alvarotrigo.com/blog/css-animations-scroll/
// function reveal() {
//     var reveals = document.querySelectorAll(".reveal");
//     for (var i = 0; i < reveals.length; i++) {
//       var windowHeight = window.innerHeight;
//       var elementTop = reveals[i].getBoundingClientRect().top;
//       var elementVisible = 150;
//       if (elementTop < windowHeight - elementVisible) {
//         reveals[i].classList.add("active");
//       } else {
//         reveals[i].classList.remove("active");
//       }
//     }
//   }

// window.addEventListener("scroll", reveal);


//followed Brad Traversy's tutorial on modal creation here: https://www.youtube.com/watch?v=6ophW7Ask_0
//modal animations
const modal = document.querySelector('#aboutme');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.closeModal');

// open modal
function openModal() {
  modal.style.display = 'initial';
}

// close modal
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(window) {
  if (window.target == modal) {
    modal.style.display = 'none';
  }
}

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);





//sideBox and secondCard animations
const sideMenu = document.querySelector(".sideBox");
const aboutMe = document.querySelector(".secondCard");
const caption = document.querySelector(".bioCaption");
const bioImg = document.querySelector(".thirdCard");
const footerArea = document.querySelector(".footerArea");

aboutMe.style.display = "none";
caption.style.display = "none";
bioImg.style.display = "none";
footerArea.style.display = "none";

//will allow modal windows to load in one after another
const delayedAnimation = (className, delay, shouldDisplayBlock) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const elem = document.querySelector(className);

      if (shouldDisplayBlock) {
        elem.style.display = "inherit";
      }

      elem.classList.add("animate__animated", "animate__fadeInDown", "animate__slow");
      resolve();
    }, delay);
  });
};

delayedAnimation(".sideBox", 0, false)
.then(() => delayedAnimation(".secondCard", 1000, true))
.then(() => delayedAnimation(".bioCaption", 1000, true))
.then(() => delayedAnimation(".thirdCard", 1000, true))
.then(() => delayedAnimation(".footerArea", 1000, true));

//sideBox middleColumn Textwriting animations
// code from https://css-tricks.com/snippets/css/typewriter-effect/
var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

