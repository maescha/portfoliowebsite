// reveal function documentation from https://alvarotrigo.com/blog/css-animations-scroll/
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

window.addEventListener("scroll", reveal);

//sideBox and secondCard animations
const sideMenu = document.querySelector(".sideBox");

sideMenu.style.display = "none";
document.querySelector(".secondCard").style.display = "none";

//downFadeIn function allows for windows to load in one after the other
const downFadeIn = (className) => {
  var docClass = document.querySelector(`${className}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      docClass.style.display = "block";
      docClass.classList.add("animate__animated", "animate__fadeInDown", "animate__slow");
      resolve();
    }, 1000)
  })
}

window.addEventListener("scroll", () => {
  sideMenu.style.display = "block";
  sideMenu.classList.add("animate__animated", "animate__fadeInDown", "animate__slow")
  .then(()=> downFadeIn(secondCard))
  // .then(()=> downFadeIn(biocaption))
  // .then(()=> downFadeIn(thirdCard));
});



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