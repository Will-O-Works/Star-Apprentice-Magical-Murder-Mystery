//=============================================================================
// VagrantLine2.js
//=============================================================================

/*:
duplicate and edit this code to make a new boss. edit bullethell JSON file when done so the main plugin recognizes it.
link to predifined stuff u can use or extend: https://hashakgik.github.io/BulletHell-RMMV/BHell.html
*/ 

var BHell = (function (my) {

    
    var BHell_Enemy_VagrantLine2 = my.BHell_Enemy_VagrantLine2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantLine2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine2.prototype.constructor = BHell_Enemy_VagrantLine2;

    //initalize function. set sprite hitbox params here along with speed
    BHell_Enemy_VagrantLine2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4;
        params.hitbox_w = 500;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

        //for multiple emitters initalize them here:
        this.initializeCoat(parent);

        //some variables needed to change states of the boss j is a counter to keep track of time, state and recived damage are obvious
        this.j = 0;
        this.state = "started";
        this.receivedDamage = 0;
        this.bulletcounter = 0;

        //initalize the mover function which dictaes the movement pattern here:
        this.mover = new my.BHell_Mover_Bounce(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);
    };

    BHell_Enemy_VagrantLine2.prototype.initializeCoat = function (parent) {
        var coatParams = {};
        coatParams.bullet = {};
        coatParams.bullet.speed = 3;
        coatParams.bullet.index = 0;
        coatParams.bullet.frame = 2;
        coatParams.bullet.direction = 8;
        coatParams.period = 300;
        coatParams.alwaysAim = true;
        coatParams.aim = true;
        this.coatEmitters = [];
        this.coatEmitters.push(new my.BHell_Emitter_Homing(0, 0, coatParams, parent, my.enemyBullets));
        this.coatEmitters[0].offsetX = 152;
        this.coatEmitters[0].offsetY = -134;
        this.coatEmitters[0].aimX = 100;
        this.coatEmitters[0].alwaysAim = true;
    };

    BHell_Enemy_VagrantLine2.prototype.updateCoat = function() {
        if (this.j % 20 == 0){
            this.coatEmitters[0].shoot(this.coatEmitters,true);
        }
        
    };

    BHell_Enemy_VagrantLine2.prototype.move = function () {
        if (this.mover != null) {
            var p = this.mover.move(this.x, this.y, this.speed);
            this.x = p[0];
            this.y = p[1];
        }
        this.coatEmitters.forEach(e => {e.move(this.x, this.y);});
    };

    BHell_Enemy_VagrantLine2.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);

        if (this.state !== "dying" && this.state !== "stunned") {
            this.move();
        }
        switch (this.state) {
            case "started":
                if (this.mover.inPosition === true) {
                    this.state = "pattern 1";
                    this.j = 0;
                }
                break;
            case "pattern 1": // Shoots from the hands and the claws for 10 seconds, then switches to pattern 2
                this.updateCoat();
                break;
            case "dying": // Spawns explosions for 5 seconds, then dies.
                if (this.j > 30) {
                    this.destroy();
                }
                break;
        }; 

        // Update the received damage counter for the stunned state.
        this.coatEmitters.forEach(e => {e.update()});
        if (this.j % 60 == 0) {
            this.receivedDamage = 0;
        };

        // Update the time counter and reset it every 20 seconds.
        this.j = (this.j + 1) % 1200;
    }

    BHell_Enemy_VagrantLine2.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        this.state = "dying";
        this.j = 0;
    
        my.controller.destroyEnemyBullets();
    };

    BHell_Enemy_VagrantLine2.prototype.hit = function () {
        if (this.state !== "dying") {
            my.BHell_Enemy_Base.prototype.hit.call(this);
    
            if (this.state != "stunned") {
                this.receivedDamage++;
            }
        }
    };
    return my;
} (BHell || {}));

var BHell = (function (my) {

    /**
     * Bullet class. Represents a single bullet moving straight on the map.
     * @constructor
     * @memberOf BHell
     * @extends BHell.BHell_Sprite
     */
    var BHell_HomingBullet = my.BHell_HomingBullet = function() {
        this.initialize.apply(this, arguments);
    };
    
    BHell_HomingBullet.prototype = Object.create(my.BHell_Sprite.prototype);
    BHell_HomingBullet.prototype.constructor = BHell_HomingBullet;
    
    /**
     * Constructor.
     * Parameters:
     *
     * - speed: Moving speed (in pixels per frame),
     * - sprite: Bullet's charset,
     * - index: Charset index,
     * - direction: Charset direction,
     * - frame: Initial charset frame,
     * - animated: If true, the bullet's sprite will be animated,
     * - animation_speed: Number of updates required for frame change.
     *
     * @param x Initial x coordinate.
     * @param y Initial y coordinate.
     * @param angle Moving angle.
     * @param params Parameters object.
     * @param bulletList Array in which this bullet is contained.
     */
    BHell_HomingBullet.prototype.initialize = function (x, y, angle, params, bulletList) {
        var speed = 3;
        var sprite = my.defaultBullet;
        var index = 0;
        var direction = 2;
        var frame = 0;
        var animated = false;
        var animationSpeed = 15;
        var grazed = false;
    
        if (params != null) {
            speed = params.speed || speed;
            sprite = params.sprite || sprite;
            index = params.index || index;
            direction = params.direction || direction;
            frame = params.frame || frame;
            if (params.animated !== false) {
                animated = true;
            }
            animationSpeed = params.animation_speed || animationSpeed;
        }
    
        my.BHell_Sprite.prototype.initialize.call(this, sprite, index, direction, frame, animated, animationSpeed);
    
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.rotation = angle + Math.PI / 2;
    
        this.x = x;
        this.y = y;
        this.z = 15;
        this.angle = angle;
        this.speed = speed;
        this.bulletList = bulletList;
        this.outsideMap = false;
        this.counter = 0
        this.aimX = 0;
        this.aimY = 0;
        this.spotted = false
        seeks = 0
    };
    
    /**
     * Updates the bullet's position. If it leaves the screen, it's destroyed.
     */
    BHell_HomingBullet.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        this.counter = this.counter +1;
        /*if (seeks === 3)////change to adjust bullet lifespan
        {
            console.debug("destroying");
            this.destroy();
        }*/
        if (this.counter%120 === 0){////////change to adjust tracking
            var dx = my.player.x - this.x + this.aimX;
            var dy = my.player.y - this.y + this.aimY;
            this.angle = Math.atan2(dy, dx);
            this.spotted = true;
        }
        if (this.spotted === true){////change to adjust pause
            if(this.counter>150)
            {
                seeks = seeks+1;
                this.counter = 0;
                this.spotted=false;
            }
        }
        else{
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
        }
        

        if (this.y < -this.height || this.y > Graphics.height + this.height || this.x < -this.width || this.x > Graphics.width + this.width) {
            this.outsideMap = true;
        }
    };
    
    BHell_HomingBullet.prototype.isOutsideMap = function () {
        return this.outsideMap;
    };
    
    /**
     * Removes the bullet from the screen and from its container.
     */
    BHell_HomingBullet.prototype.destroy = function() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.bulletList.splice(this.bulletList.indexOf(this), 1);
    };
    
    return my;
} (BHell || {}));

/////////////////custom bullet class and emitter
var BHell = (function (my) {
    /**
     * Angle emitter. Creates a single bullet traveling at an angle. Optionally aims at the player.
     * @constructor
     * @memberOf BHell
     * @extends BHell.BHell_Emitter_Base
     */
    var BHell_Emitter_Homing = my.BHell_Emitter_Homing = function () {
        this.initialize.apply(this, arguments);
    };

    BHell_Emitter_Homing.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Homing.prototype.constructor = BHell_Emitter_Homing;

    /**
     * Constructor.
     * Additional parameters:
     *
     * - angle: the bullets' traveling angle. If aiming, it will be used as an offset for the angle between the emitter and the player,
     * - aim: if true the angle is relative to the player's position (i.e. angle = 0 and aim = true: the bullets will point
     *        towards the player, angle = 0.1 and aim = true: the bullets will be shot at 0.1 radians counterclockwise, from the player's direction)
     * - always_aim: if false (and aim = true) aiming only occours when there is a raising edge (shoot(false) -> shoot(true)),
     * - aim_x aiming horizontal offset (used only if aim = true),
     * - aim_y: aiming vertical offset (used only if aim = true).
     *
     * @param x
     * @param y
     * @param params
     * @param parent
     * @param bulletList
     */
    BHell_Emitter_Homing.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);

        this.angle = 0;
        this.aim = false;
        this.alwaysAim = false;
        this.aimX = 0;
        this.aimY = 0;

        this.aimingAngle = 0;

        if (params != null) {
            this.angle = params.angle || this.angle;
            this.aim = params.aim || this.aim;
            this.alwaysAim = params.always_aim || this.alwaysAim;
            this.aimX = params.aim_x || this.aimX;
            this.aimY = params.aim_y || this.aimY;
        }
    };

    /**
     * Shoots a single bullet towards this.angle or this.angle + angle between player and emitter.
     */
    BHell_Emitter_Homing.prototype.shoot = function () {
        
        var bullet;
        if (this.aim) {
            if (this.alwaysAim || this.oldShooting === false) {
                var dx = my.player.x - this.x + this.aimX;
                var dy = my.player.y - this.y + this.aimY;
                this.aimingAngle = Math.atan2(dy, dx);
            }

            bullet = new my.BHell_HomingBullet(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
        }
        else {
            bullet = new my.BHell_HomingBullet(this.x, this.y, this.angle, this.bulletParams, this.bulletList);
        }

        this.parent.addChild(bullet);
        this.bulletList.push(bullet);
    };

    /**
     * Burst emitter. Creates many bullets packed randomly inside a dispersion circle.
     * @constructor
     * @memberOf BHell
     * @extends BHell.BHell_Emitter_Base
     */
    var BHell_Emitter_Burst = my.BHell_Emitter_Burst = function () {
        this.initialize.apply(this, arguments);
    };
    return my;
} (BHell || {}));

