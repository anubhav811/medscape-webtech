(function ($) {
  "use strict";

  // Search Active Code
  $("#search-btn, #closeBtn").on("click", function () {
    $("body").toggleClass("search-form-on");
  });

  // matchHeight Active Code
  if ($.fn.matchHeight) {
    $(".equal-height").matchHeight();
  }

  // PreventDefault a Click
  $("a[href='#']").on("click", function ($) {
    $.preventDefault();
  });

  // wow Active Code
  if ($.fn.init) {
    new WOW().init();
  }

  var $window = $(window);

  // Sticky Active JS
  $window.on("scroll", function () {
    if ($window.scrollTop() > 0) {
      $("body").addClass("sticky");
    } else {
      $("body").removeClass("sticky");
    }
  });
})(jQuery);
