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

  // Eye/Lock toggle functionality with cursor position preservation
  let hoverTimeouts = new Map(); // Use Map to track timeouts per container
  
  // Function to preserve cursor relative position during content expansion
  function preserveCursorPosition($button, callback) {
    const $container = $button.closest('.collapsible-container');
    const isEducationSection = $container.closest('#education').length > 0;
    
    // For education section, no layout adjustment needed as it's layout-stable
    if (isEducationSection) {
      callback();
      return;
    }
    
    // Get the button's position relative to viewport before expansion
    const buttonRect = $button[0].getBoundingClientRect();
    const viewportTop = $(window).scrollTop();
    const buttonTopAbsolute = buttonRect.top + viewportTop;
    
    // Execute the callback (show/hide content)
    callback();
    
    // Small delay to allow DOM to update, then adjust scroll to keep button under cursor
    setTimeout(() => {
      const newButtonRect = $button[0].getBoundingClientRect();
      const newButtonTopAbsolute = newButtonRect.top + $(window).scrollTop();
      const displacement = newButtonTopAbsolute - buttonTopAbsolute;
      
      // Adjust scroll to compensate for the displacement
      if (Math.abs(displacement) > 1) { // Only adjust if significant movement
        const currentScroll = $(window).scrollTop();
        $(window).scrollTop(currentScroll + displacement);
      }
    }, 50);
  }
  
  $(document).on('click', '.visibility-toggle', function(e) {
    e.preventDefault();
    const $button = $(this);
    const $icon = $button.find('i');
    const $details = $button.closest('.collapsible-container').find('.collapsible-details');
    const isLocked = $button.attr('data-locked') === 'true';
    const containerId = $button.closest('.collapsible-container').index();
    
    // Clear any hover timeout when clicking
    if (hoverTimeouts.has(containerId)) {
      clearTimeout(hoverTimeouts.get(containerId));
      hoverTimeouts.delete(containerId);
    }
    
    // If locked, unlock and fold
    if (isLocked) {
      $button.attr('data-locked', 'false');
      $button.attr('aria-label', 'Show details on hover');
      // Change back to closed eye and hide details
      preserveCursorPosition($button, () => {
        $icon.removeClass('fa-lock fa-eye').addClass('fa-eye-slash');
        $details.removeClass('show');
      });
      return;
    }
    
    // If not locked, clicking should lock it open
    $button.attr('data-locked', 'true');
    $button.attr('aria-label', 'Locked - click to unlock');
    // Change to lock icon and show details
    preserveCursorPosition($button, () => {
      $icon.removeClass('fa-eye fa-eye-slash').addClass('fa-lock');
      $details.addClass('show');
    });
  });
  
  // Enhanced hover handling with cursor position preservation
  $(document).on('mouseenter', '.visibility-toggle', function() {
    const $button = $(this);
    const $icon = $button.find('i');
    const $details = $button.closest('.collapsible-container').find('.collapsible-details');
    const isLocked = $button.attr('data-locked') === 'true';
    const containerId = $button.closest('.collapsible-container').index();
    
    // Clear any pending hide timeout
    if (hoverTimeouts.has(containerId)) {
      clearTimeout(hoverTimeouts.get(containerId));
      hoverTimeouts.delete(containerId);
    }
    
    // Only change to open eye and show details if not locked
    if (!isLocked) {
      preserveCursorPosition($button, () => {
        $icon.removeClass('fa-eye-slash').addClass('fa-eye');
        $details.addClass('show');
      });
    }
  });
  
  $(document).on('mouseleave', '.visibility-toggle', function() {
    const $button = $(this);
    const $icon = $button.find('i');
    const $details = $button.closest('.collapsible-container').find('.collapsible-details');
    const isLocked = $button.attr('data-locked') === 'true';
    const containerId = $button.closest('.collapsible-container').index();
    
    // Only change back to closed eye and hide details if not locked
    if (!isLocked) {
      // Clear any existing timeout for this container
      if (hoverTimeouts.has(containerId)) {
        clearTimeout(hoverTimeouts.get(containerId));
      }
      
      // Set timeout to close
      const timeoutId = setTimeout(function() {
        // Double-check the button still exists and isn't locked
        if ($button.length && $button.attr('data-locked') !== 'true') {
          preserveCursorPosition($button, () => {
            $icon.removeClass('fa-eye').addClass('fa-eye-slash');
            $details.removeClass('show');
          });
        }
        hoverTimeouts.delete(containerId);
      }, 300); // Longer delay for stability
      
      hoverTimeouts.set(containerId, timeoutId);
    }
  });
  
  // Also handle hover on the content header to prevent hiding when moving between elements
  $(document).on('mouseenter', '.content-header', function() {
    const $button = $(this).find('.visibility-toggle');
    const isLocked = $button.attr('data-locked') === 'true';
    const containerId = $(this).closest('.collapsible-container').index();
    
    if (!isLocked && hoverTimeouts.has(containerId)) {
      clearTimeout(hoverTimeouts.get(containerId));
      hoverTimeouts.delete(containerId);
    }
  });
  
  $(document).on('mouseleave', '.content-header', function() {
    const $button = $(this).find('.visibility-toggle');
    const $icon = $button.find('i');
    const $details = $(this).closest('.collapsible-container').find('.collapsible-details');
    const isLocked = $button.attr('data-locked') === 'true';
    const containerId = $(this).closest('.collapsible-container').index();
    
    // Only hide if not locked
    if (!isLocked) {
      // Clear any existing timeout
      if (hoverTimeouts.has(containerId)) {
        clearTimeout(hoverTimeouts.get(containerId));
      }
      
      const timeoutId = setTimeout(function() {
        if ($button.length && $button.attr('data-locked') !== 'true') {
          preserveCursorPosition($button, () => {
            $icon.removeClass('fa-eye').addClass('fa-eye-slash');
            $details.removeClass('show');
          });
        }
        hoverTimeouts.delete(containerId);
      }, 400); // Even longer delay for content header
      
      hoverTimeouts.set(containerId, timeoutId);
    }
  });
  
  // Initialize all eye icons to closed state
  $(document).ready(function() {
    $('.visibility-toggle').each(function() {
      const $button = $(this);
      const $icon = $button.find('i');
      const $details = $button.closest('.collapsible-container').find('.collapsible-details');
      
      $button.attr('data-locked', 'false');
      $button.attr('aria-label', 'Show details on hover');
      // Ensure icon starts as closed eye and details are hidden
      $icon.removeClass('fa-eye fa-lock').addClass('fa-eye-slash');
      $details.removeClass('show');
    });
  });

})(jQuery);
