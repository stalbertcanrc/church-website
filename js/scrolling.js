// Get closed navbar height
const navHeight = $('#main-nav').height();

// Animate to section id if coming from another page
if (window.location.hash) {
  setTimeout(function () {
    $('html, body').animate({
      scrollTop: $(window.location.hash).offset().top - navHeight
    }, 600);
  }, 100);
}

// Smooth Scrolling
$("#main-nav a, #call-to-action").on('click', function (event) {
  if (this.hash != "") {
    event.preventDefault();

    const hash = this.hash;

    $('.navbar-collapse').collapse('hide');

    $('html, body').animate({
      scrollTop: $(hash).offset().top - navHeight
    }, 800);
  }
});