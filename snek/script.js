(function(){

    var CANVAS_WIDTH = 640;
    var CANVAS_HEIGHT = 480;
    var SNEK_START_LENGTH = 5;
    var SNEK_SIZE = 20;
    var SNEK_START_POS = [
        (CANVAS_WIDTH / 2) + ((SNEK_START_LENGTH * SNEK_SIZE) / 2),
        (CANVAS_HEIGHT / 2) - (SNEK_SIZE / 2)
    ];
    var SNEK_COLOR = 'red';

    var SPEED = 500; // pixels per second

    // Directions
    var UP = 'UP';
    var DOWN = 'DOWN';
    var LEFT = 'LEFT';
    var RIGHT = 'RIGHT';

    var KEYS = {
        UP : 38,
        DOWN : 40,
        LEFT : 37,
        RIGHT : 39
    };


    var Snek = function(ctx) {
        this.ctx = ctx;
        this.length = SNEK_START_LENGTH;
        this.segments = [];
        this.lastdraw = null;
        for (var i = 0; i < this.length; i++) {
            this.segments[i] = {
                pos : [
                    SNEK_START_POS[0] - i * SNEK_SIZE,
                    SNEK_START_POS[1]
                ],
                direction : RIGHT
            };
        }
    };


    Snek.prototype.draw = function(ctx) {
        this.ctx.fillStyle = SNEK_COLOR;

        var i = this.segments.length;
        while(i--) {
            this.ctx.fillRect(this.segments[i].pos[0], this.segments[i].pos[1], SNEK_SIZE, SNEK_SIZE);
        }
        var now = Date.now();
        var deltaTime = this.lastdraw ? now - this.lastdraw : 0;
        var deltaPix = (deltaTime / 1000) * SPEED;
        this.move(deltaPix)
        this.lastdraw = now;
    };


    Snek.prototype.move = function(delta) {
        var i = this.segments.length;
        while(i--) {
            switch(this.segments[i].direction) {
                case UP :
                this.segments[i].pos[1] -= delta;
                break;

                case DOWN :
                this.segments[i].pos[1] += delta;
                break;

                case LEFT :
                this.segments[i].pos[0] -= delta;
                break;

                case RIGHT :
                this.segments[i].pos[0] += delta;
                break;
            }

            if(i !== 0) {
                this.segments[i].direction = this.segments[i - 1].direction;
            }
        }
    };

    Snek.prototype.changeDirection = function(direction) {
        this.segments[0].direction = direction;
    };


    var Canvas = function() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.width = 640;
        this.ctx.height = 480;
        this.snek = new Snek(this.ctx);
        var _this = this;
        document.body.addEventListener('keydown', function(e){
            switch(e.keyCode) {
                case KEYS.UP :
                _this.snek.changeDirection(UP);
                break;

                case KEYS.DOWN :
                _this.snek.changeDirection(DOWN);
                break;

                case KEYS.LEFT :
                _this.snek.changeDirection(LEFT);
                break;

                case KEYS.RIGHT :
                _this.snek.changeDirection(RIGHT);
                break;
            }
        });
    };

    Canvas.prototype.tick = function() {
        this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.snek.draw();
    };

    var canvas = new Canvas();

    var render = function() {
        canvas.tick();
        window.requestAnimationFrame(render);
    };

    render();

})();
