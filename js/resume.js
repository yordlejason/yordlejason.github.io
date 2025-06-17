(function($) {
  "use strict";

  // Check if jQuery is loaded
  if (typeof $ === 'undefined') {
    console.error('jQuery is required for this script to work properly.');
    return;
  }

  // Debug information for production troubleshooting
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    console.log('Resume script loaded on production environment');
    console.log('jQuery version:', $.fn.jquery);
    console.log('Page loaded at:', new Date().toISOString());
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
    
    // Debug logging for production troubleshooting
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      console.log('Visibility toggle clicked:', {
        hasIcon: $icon.length > 0,
        hasDetails: $details.length > 0,
        isLocked: isLocked,
        containerId: containerId
      });
    }
    
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
        if ($icon.length > 0) {
          $icon.removeClass('fa-lock fa-eye').addClass('fa-eye-slash');
        } else {
          $button.find('.fallback-icon').text('👁️');
        }
        $details.removeClass('show');
      });
      return;
    }
    
    // If not locked, clicking should lock it open
    $button.attr('data-locked', 'true');
    $button.attr('aria-label', 'Locked - click to unlock');
    // Change to lock icon and show details
    preserveCursorPosition($button, () => {
      if ($icon.length > 0) {
        $icon.removeClass('fa-eye fa-eye-slash').addClass('fa-lock');
      } else {
        $button.find('.fallback-icon').text('🔒');
      }
      $details.addClass('show');
    });
  });
  
  // Add click functionality to the entire content header (position titles)
  $(document).on('click', '.content-header', function(e) {
    // Don't trigger if the click was on the visibility toggle button itself
    if ($(e.target).closest('.visibility-toggle').length > 0) {
      return;
    }
    
    e.preventDefault();
    const $container = $(this).closest('.collapsible-container');
    const $button = $container.find('.visibility-toggle');
    const $icon = $button.find('i');
    const $details = $container.find('.collapsible-details');
    const isLocked = $button.attr('data-locked') === 'true';
    const containerId = $container.index();
    
    // Debug logging
    console.log('Content header clicked:', {
      hasButton: $button.length > 0,
      hasIcon: $icon.length > 0,
      hasDetails: $details.length > 0,
      isLocked: isLocked,
      containerId: containerId
    });
    
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
        if ($icon.length > 0) {
          $icon.removeClass('fa-lock fa-eye').addClass('fa-eye-slash');
        } else {
          $button.find('.fallback-icon').text('👁️');
        }
        $details.removeClass('show');
      });
      return;
    }
    
    // If not locked, clicking should lock it open
    $button.attr('data-locked', 'true');
    $button.attr('aria-label', 'Locked - click to unlock');
    // Change to lock icon and show details
    preserveCursorPosition($button, () => {
      if ($icon.length > 0) {
        $icon.removeClass('fa-eye fa-eye-slash').addClass('fa-lock');
      } else {
        $button.find('.fallback-icon').text('🔒');
      }
      $details.addClass('show');
    });
  });
  
  // Enhanced hover handling with cursor position preservation
  // Function to show details
  function showDetails($container) {
    const $button = $container.find('.visibility-toggle');
    const $icon = $button.find('i');
    const $details = $container.find('.collapsible-details');
    const isLocked = $button.attr('data-locked') === 'true';
    
    // Debug logging
    console.log('showDetails called:', {
      hasButton: $button.length > 0,
      hasIcon: $icon.length > 0,
      hasDetails: $details.length > 0,
      isLocked: isLocked,
      currentDetailsClasses: $details.attr('class')
    });
    
    if (!isLocked) {
      preserveCursorPosition($button, () => {
        if ($icon.length > 0) {
          $icon.removeClass('fa-eye-slash').addClass('fa-eye');
        } else {
          $button.find('.fallback-icon').text('👀');
        }
        $details.addClass('show');
        console.log('Details should now be visible, classes:', $details.attr('class'));
      });
    }
  }
  
  // Function to hide details with timeout
  function hideDetailsWithTimeout($container, delay = 300) {
    const $button = $container.find('.visibility-toggle');
    const $icon = $button.find('i');
    const $details = $container.find('.collapsible-details');
    const isLocked = $button.attr('data-locked') === 'true';
    const containerId = $container.index();
    
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
            if ($icon.length > 0) {
              $icon.removeClass('fa-eye').addClass('fa-eye-slash');
            } else {
              $button.find('.fallback-icon').text('👁️');
            }
            $details.removeClass('show');
          });
        }
        hoverTimeouts.delete(containerId);
      }, delay);
      
      hoverTimeouts.set(containerId, timeoutId);
    }
  }
  
  // Enhanced hover handling for the entire content header (icons + position titles)
  $(document).on('mouseenter', '.content-header', function() {
    const $container = $(this).closest('.collapsible-container');
    const $button = $container.find('.visibility-toggle');
    const isLocked = $button.attr('data-locked') === 'true';
    const containerId = $container.index();
    
    // Debug logging
    console.log('Content header hover detected:', {
      hasContainer: $container.length > 0,
      hasButton: $button.length > 0,
      isLocked: isLocked,
      containerId: containerId
    });
    
    // Clear any pending hide timeout
    if (hoverTimeouts.has(containerId)) {
      clearTimeout(hoverTimeouts.get(containerId));
      hoverTimeouts.delete(containerId);
    }
    
    // Show details when hovering over the entire content header
    showDetails($container);
    
    // Add visual feedback for the entire header
    if (!isLocked) {
      $(this).addClass('hovering');
    }
  });
  
  $(document).on('mouseleave', '.content-header', function() {
    const $container = $(this).closest('.collapsible-container');
    const $button = $container.find('.visibility-toggle');
    const isLocked = $button.attr('data-locked') === 'true';
    
    // Remove visual feedback
    $(this).removeClass('hovering');
    
    // Hide details with timeout when leaving the content header
    hideDetailsWithTimeout($container, 400);
  });
  
  // Keep the specific hover handling for the visibility toggle button for backward compatibility
  $(document).on('mouseenter', '.visibility-toggle', function() {
    const $container = $(this).closest('.collapsible-container');
    const containerId = $container.index();
    
    // Clear any pending hide timeout
    if (hoverTimeouts.has(containerId)) {
      clearTimeout(hoverTimeouts.get(containerId));
      hoverTimeouts.delete(containerId);
    }
    
    // Show details when hovering specifically on the button
    showDetails($container);
  });
  
  $(document).on('mouseleave', '.visibility-toggle', function() {
    const $container = $(this).closest('.collapsible-container');
    
    // Hide details when leaving the button (with shorter timeout since it's more specific)
    hideDetailsWithTimeout($container, 200);
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
      if ($icon.length > 0) {
        $icon.removeClass('fa-eye fa-lock').addClass('fa-eye-slash');
      } else {
        // Fallback if Font Awesome icons aren't loaded
        $button.text('👁️');
        $button.attr('data-fallback-icon', 'true');
      }
      
      $details.removeClass('show');
    });
    
    // Check if Font Awesome is loaded
    const testIcon = $('<i class="fa fa-eye" style="position: absolute; left: -9999px;"></i>').appendTo('body');
    const fontFamily = testIcon.css('font-family');
    testIcon.remove();
    
    if (fontFamily.indexOf('FontAwesome') === -1) {
      console.warn('Font Awesome may not be loaded properly. Using fallback icons.');
      $('.visibility-toggle').each(function() {
        const $button = $(this);
        if (!$button.attr('data-fallback-icon')) {
          $button.find('i').remove();
          $button.append('<span class="fallback-icon">👁️</span>');
        }
      });
    }
  });

})(jQuery);
