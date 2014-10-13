(function($) {
  var Lights = function(el, opts) {
    var $el = $(el);
    $el.data('lights', this);
    this.$el = $el;

    this.opts = $.extend({}, this.defaultOptions, opts);

    var calculatedSize;
    if (!!this.opts.board) {
      if (!!this.opts.board.length && (calculatedSize = Math.sqrt(this.opts.board.length)) % 1 === 0) {
        this.opts.size = calculatedSize;
      } else {
        delete this.opts.board;
      }
    }

    this.lights = [];
    for (var i = 0; i < this.opts.size; i++) {
      this.lights[i] = [];
    }

    this.initDom();
    if (!!this.opts.shuffleCount) this.shuffle();
    this.initEventListeners();
  };

  Lights.prototype.colors = [
    '#7CCC6A',
    '#5CC1D6',
    '#865CBF',
    '#D6675C',
    '#CCA951'
  ];

  Lights.prototype.defaultOptions = {
    size: 3,
    shape: [
      [-1, -1], [0, -1], [1, -1],
      [-1, 0],  [0, 0],  [1, 0],
      [-1, 1],  [0, 1],  [1, 1]
    ]
  };

  Lights.prototype.initDom = function() {
    for (var y = 0; y < this.opts.size; y++) {
      for (var x = 0; x < this.opts.size; x++) {
        this.lights[x][y] = new Light(this, x, y, !!this.opts.board ? this.opts.board[x + (y * this.opts.size)] : undefined);
        this.$el.append(this.lights[x][y].$el);
      }
    }

    this.updateSize();
  };

  Lights.prototype.initEventListeners = function() {
    var _this = this;

    this.$el.on('click touchstart', '.light', function(e) {
      var light = $(this).data('light')
      _this.toggle(light.x, light.y);

      _this.$el.trigger('move');

      _this.checkWin();

      e.preventDefault();
    });

    (function() {
      var lastResizeTime;
      $(window).off('resize.lights').on('resize.lights', function(e) {
        var time = (new Date()).getTime()
        if (!lastResizeTime || (time - lastResizeTime) > 100) {
          _this.updateSize();
          lastResizeTime = time;
        }
      });
    })();
  };

  Lights.prototype.toggle = function(x, y) {
    var light;
    for (var i = 0; i < this.opts.shape.length; i++) {
      try {
        this.lights[x + this.opts.shape[i][0]][y + this.opts.shape[i][1]].toggle();
      } catch(e) {}
    }
  };

  Lights.prototype.shuffle = function() {
    for (var i = 0; i < this.opts.shuffleCount; i++) {
      this.toggle(Math.floor(Math.random() * this.opts.size), Math.floor(Math.random() * this.opts.size));
    }
  };

  Lights.prototype.checkWin = function() {
    var board = this.getBoard(),
        win = true;

    for (var i = 0; i < board.length; i++) {
      if (board[i] !== 4) {
        win = false;
        break;
      }
    }

    if (win) this.$el.trigger('win');
  };

  Lights.prototype.updateSize = function() {
    this.$el.css('font-size', this.$el.height() / this.opts.size * 0.35);
  };

  Lights.prototype.getBoard = function() {
    var state = [];
    for (var y = 0; y < this.opts.size; y++) {
      for (var x = 0; x < this.opts.size; x++) {
        state.push(this.lights[x][y].state);
      }
    }
    return state;
  };

  window.Lights = Lights;

  $.fn.lights = function(opts) {
    this.each(function() {
      new Lights(this, opts);
    });
  };
})(jQuery);
