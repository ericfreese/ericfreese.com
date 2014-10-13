$(function() {
  $('.lights').lights();

  if ('ontouchstart' in document.documentElement) {
    $('body').addClass('touch-enabled');
  }

  $('.game-container').gameManager();
});
