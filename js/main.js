// Get the current year for the copyright
$('#year').text(new Date().getFullYear());

// Hide/Show Scroll Back to Top Arrow
$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $('#back-to-top').fadeIn();
  } else {
    $('#back-to-top').fadeOut();
  }
});

// scroll body to 0px on click of Back to Top Arrow
$('#back-to-top').click(function () {
  $('body,html').animate({
    scrollTop: 0
  }, 800);
  return false;
});

// Stop Sermon Audio on Modal Close
$(".modal").on("hidden.bs.modal", function (e) {
  e.target.querySelector("audio").pause();
});