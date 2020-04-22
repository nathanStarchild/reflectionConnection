// Collecting the sections
var $sections = $(".section");

// Variable to hold the current section index
var currentIndex = 0;

// Variable to hold the animation state
var isAnimating = false;

// Define the animation finish callback
var stopAnimation = function() {
  // We add the 300 ms timeout to debounce the mouse wheel event
  setTimeout(function() {
    // Set the animation state to false
    isAnimating = false;
  }, 300);
};

// Function returns true if DOM element bottom is reached
var bottomIsReached = function($elem) {
  var rect = $elem[0].getBoundingClientRect();
  console.log(rect.bottom <= $(window).height());
  return rect.bottom <= $(window).height();
};

// Function returns true if DOM element top is reached
var topIsReached = function($elem) {
  var rect = $elem[0].getBoundingClientRect();
  return rect.top >= 0;
};

function scrollTo($section) {
    // Get the next section offset
    var offsetTop = $section.offset().top;
    // Set the animation state to true
    isAnimating = true;
    // Animate scroll
    $("html, body").animate({ scrollTop: offsetTop }, 1000, stopAnimation);
}

$('.button').click(function(event) {
    event.preventDefault();
    currentIndex = parseInt($(this).attr("data-link"));
    scrollTo($($sections[currentIndex]));
}) 

// Define wheel event handler
document.addEventListener(
  "wheel",
  function(event) {
    // If animation is in progress
    if (isAnimating) {
      // Just prevent the default mouse wheel behaviour
      event.preventDefault();
      return;
    }

    // Get the current section
    var $currentSection = $($sections[currentIndex]);

    // Get the mouse wheel spin direction
    var direction = event.deltaY;

    if (direction > 0) {
      // If next index is greater than sections count, do nothing
      if (currentIndex + 1 >= $sections.length) return;
      // If bottom is not reached allow the default behaviour
      if (!bottomIsReached($currentSection)) return;
      // Go to next
      // Increase the section pointer
      currentIndex++;
      // Prevent the default mouse wheel behaviour
      event.preventDefault();
      // Get the next section
      var $nextSection = $($sections[currentIndex]);
      scrollTo($nextSection);
    } else {
      // If previous index is negative, do nothing
      if (currentIndex - 1 < 0) return;
      // If top is not reached allow the default behaviour
      if (!topIsReached($currentSection)) return;
      // Go to prev
      // Decrease the section pointer
      currentIndex--;
      // Prevent the default mouse wheel behaviour
      event.preventDefault();
      // Get the previous section
      var $previousSection = $($sections[currentIndex]);
      scrollTo($previousSection);
    }
  },
  { passive: false }
);
// We set passive to false, because in the handler we need to prevent the default mouse wheel behavior
