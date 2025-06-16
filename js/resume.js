(function($) {
  "use strict";

  // Check if jQuery is loaded
  if (typeof $ === 'undefined') {
    console.error('jQuery is required for this script to work properly.');
    return;
  }

  // Smooth scrolling using jQuery easing with improved performance
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function(e) {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
        location.hostname === this.hostname) {
      
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      
      if (target.length) {
        e.preventDefault();
        
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').on('click', function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  // Only if the sideNav element exists
  if ($('#sideNav').length) {
    $('body').scrollspy({
      target: '#sideNav',
      offset: 100
    });
  }

  // Add smooth fade-in effect for sections on scroll (optional enhancement)
  function checkScroll() {
    $('.resume-section').each(function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass('in-view');
      }
    });
  }

  // Throttle scroll events for better performance
  var scrollTimer = null;
  $(window).on('scroll', function() {
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(checkScroll, 100);
  });

  // Initial check on page load
  $(document).ready(function() {
    checkScroll();
  });

})(jQuery);
