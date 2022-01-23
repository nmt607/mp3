const btnBackToTop = document.getElementById("backToTop");
const displayDistance = 200
var prevScrollpos = window.pageYOffset;


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > displayDistance || document.documentElement.scrollTop > displayDistance) {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        btnBackToTop.style.transform = "translateX(0)";
      } else {
        btnBackToTop.style.transform = "translateX(105%)";
      }
      prevScrollpos = currentScrollPos;
  } else {
    btnBackToTop.style.transform = "translateX(105%)";
  }
}

// When the user clicks on the button, scroll to the top of the document
btnBackToTop.addEventListener('click', function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
})
