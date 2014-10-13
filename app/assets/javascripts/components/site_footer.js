$(window).on('load', function() {
  var $footer = $('.site-footer').first(),
      $container = $footer.closest('.site-footer__container'),
      resetContainerMargin;

  if (!!$footer.length && !!$container.length) {
    (resetContainerMargin = function() {
      $container.css('margin-bottom', $footer.outerHeight());
    })();

    $(window).on('resize', resetContainerMargin);

    $footer.show();
  }
});
