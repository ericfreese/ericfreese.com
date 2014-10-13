(function($) {
  var Light = function(lights, x, y, state) {
    this.lights = lights;
    this.x = x;
    this.y = y;
    this.state = (state !== undefined ? state : 5);

    this.$el = $('<div class="light"></div>');
    this.$textEl = $('<span class="light_text">');
    this.$el.append(this.$textEl);
    this.$el.data('light', this);

    this.$el.css({
      'width': (100 / lights.opts.size) * 0.9 + '%',
      'height': (100 / lights.opts.size) * 0.9 + '%',
      'margin': (100 / lights.opts.size) * 0.05 + '%'
    });

    this.updateDom();
  };

  Light.prototype.toggle = function() {
    this.state = ((this.state + 1) % this.lights.colors.length);
    this.updateDom();
  };

  Light.prototype.updateDom = function() {
    this.$el.css('background-color', this.lights.colors[this.state]);
    this.$textEl.text(this.state + 1);
  };

  window.Light = Light;
})(jQuery);
