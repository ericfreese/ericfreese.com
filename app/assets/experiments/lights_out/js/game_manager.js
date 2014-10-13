(function($) {
  var GameManager = function(el) {
    var $el = $(el);
    $el.data('game-manager', this);

    this.$el = $el;
    this.$lightsContainer = this.$el.find('.lights-container');
    this.$level = this.$el.find('.game-container_level');
    this.$moveCounter = this.$el.find('.game-container_move-counter');
    this.$lights;


    this.moveCount = 0;
    this.initEventListeners();
    this.loadLevel(0);
  };

  GameManager.prototype.initEventListeners = function() {
    var _this = this;

    this.$el.on('click', '.js-restart', function() {
      _this.loadLevel(_this.currentLevel);
    });

    this.$el.on('click', '.js-next', function() {
      _this.loadLevel((_this.currentLevel + 1) % _this.levels.length);
    });

    this.$el.on('click', '.js-previous', function() {
      _this.loadLevel((_this.currentLevel - 1 + _this.levels.length) % _this.levels.length);
    });
  }

  GameManager.prototype.levels = [
    new Level({ board: [0, 0, 0, 0, 0, 0, 0, 0, 0] }),
    new Level({ board: [1, 2, 3, 1, 2, 3, 1, 2, 3] }),
    new Level({ board: [1, 1, 1, 1, 4, 1, 1, 1, 1] }),
    new Level({ board: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0] })
  ];

  GameManager.prototype.loadLevel = function(level) {
    if (!(level instanceof Level)) {
      this.currentLevel = level;
      return this.loadLevel(this.levels[level]);
    }

    this.moveCount = 0;

    this.$level.text('Level ' + (this.currentLevel + 1));

    this.$lights = $('<div class="lights"></div>');
    this.$lightsContainer.empty().append(this.$lights);
    this.$lights.lights({
      board: level.board
    });

    var _this = this;

    this.$lights.on('win', function(e) {
      _this.levelWon();
    });

    this.$lights.on('move', function(e) {
      _this.moveCount++;
      _this.updateMoveCounter();
    });

    this.updateMoveCounter();
  };

  GameManager.prototype.levelWon = function() {
    alert('you win!');
    this.loadLevel((this.currentLevel + 1) % this.levels.length);
  };

  GameManager.prototype.updateMoveCounter = function() {
    this.$moveCounter.text(this.moveCount);
  };

  window.GameManager = GameManager;

  $.fn.gameManager = function() {
    this.each(function() {
      new GameManager(this);
    });
  };
})(jQuery);
