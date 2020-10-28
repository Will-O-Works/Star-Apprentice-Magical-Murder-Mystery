var BHell = (function (my) {

/**
 * Bullet class. Represents a single bullet moving straight on the map.
 * @constructor
 * @memberOf BHell
 * @extends BHell.BHell_Sprite
 */
var Bhell_BW_Bullet = my.Bhell_BW_Bullet = function() {
    this.initialize.apply(this, arguments);
};

Bhell_BW_Bullet.prototype = Object.create(my.BHell_Sprite.prototype);
Bhell_BW_Bullet.prototype.constructor = Bhell_BW_Bullet;

Bhell_BW_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
    var speed = 3;
    var sprite = my.defaultBullet;
    var index = 0;
    var direction = 2;
    var frame = 0;
    var animated = false;
    var animationSpeed = 15;
    var grazed = false;
	var shoot_x = my.player.x;  // restore variable for sine shaped bullets by V.L.
	var count = 0;  // restore variable for sine shaped bullets by V.L.
	var type = "b"; 

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
		shoot_x = params.shoot_x || my.player.x;   // restore variable for sine shaped bullets by V.L.
		count = params.count || count;   // restore variable for sine shaped bullets by V.L.
		type = params.type || type; 
    }

    my.BHell_Sprite.prototype.initialize.call(this, sprite, index, direction, frame, animated, animationSpeed);

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.rotation = angle + Math.PI / 2;

	this.sprite = sprite; 
	this.index = index; 
    this.x = x;
    this.y = y;
    this.z = 15;
    this.angle = angle;
    this.speed = speed;
    this.bulletList = bulletList;
    this.outsideMap = false;
	this.type = type; 
};

/**
 * Updates the bullet's position. If it leaves the screen, it's destroyed.
 */
Bhell_BW_Bullet.prototype.update = function () {
    my.BHell_Sprite.prototype.update.call(this);

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
	
    if (this.y < -this.height || this.y > Graphics.height + this.height || this.x < -this.width || this.x > Graphics.width + this.width) {
        this.outsideMap = true;
    }
};

Bhell_BW_Bullet.prototype.isOutsideMap = function () {
    return this.outsideMap;
};

// Add effects on bullet hit by V.L.
Bhell_BW_Bullet.prototype.hit_effect = function() {
	my.effects.push(new my.BHell_Hit_Effect(this.x, this.y, this.sprite, this.index, this.parent, my.effects));
};

/**
 * Removes the bullet from the screen and from its container.
 */
Bhell_BW_Bullet.prototype.destroy = function() {

	/*var bullet_effect = new my.Bhell_BW_Bullet(this.x, this.y, -Math.PI * Math.random(), this.bulletParams, this.bulletList);
    this.bulletList.push(bullet_effect); 
    this.parent.addChild(bullet_effect); */
	
    if (this.parent != null) {
        this.parent.removeChild(this);
    }
    this.bulletList.splice(this.bulletList.indexOf(this), 1); 
};

return my;
} (BHell || {}));

//=============================================================================
// P1 Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_P1 = my.BHell_Emitter_P1 = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_P1.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_P1.prototype.constructor = BHell_Emitter_P1;
	
    BHell_Emitter_P1.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = this.params.sprite;
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = this.params.direction;
		
		this.num_bullet = 10; // number of bullets in a Testimony
		this.attack_between = Graphics.width / this.num_bullet; // time between two major attacks
		
		if (params != null) {
            this.num_waves = params.num_waves || this.num_waves;
			this.num_bullet = params.num_bullet || this.num_bullet;
			this.attack_between = params.attack_between || this.attack_between;
        }
		
		this.baseSpeed = 3; 
		this.angle = 3 * Math.PI / 4; 
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_P1.prototype.shoot = function () {
		
		for (var j = -5; j < this.num_bullet + 5; j++) {
			this.angle = Math.PI / 2; 
			this.bulletParams.speed = this.baseSpeed; 
			this.bulletParams.type = "w"; 
			this.b_x = j * this.attack_between; 
			this.bulletParams.direction = 6; 
			
			var bullet = new my.Bhell_BW_Bullet(this.b_x, 0, this.angle, this.bulletParams, my.whiteBullets);
			this.parent.addChild(bullet);
			my.whiteBullets.push(bullet);
        }
		
		for (var j = -5; j < this.num_bullet + 5; j++) {
			this.angle = 3 * Math.PI / 2; 
			this.bulletParams.speed = this.baseSpeed; 
			this.bulletParams.type = "b"; 
			this.b_x = j * this.attack_between; 
			this.bulletParams.direction = 4; 
			
			var bullet = new my.Bhell_BW_Bullet(this.attack_between / 2 + this.b_x, Graphics.height, this.angle, this.bulletParams, my.blackBullets);
			this.parent.addChild(bullet);
			my.blackBullets.push(bullet);
        }

		// console.log("shooting...");
    };


    return my;
} (BHell || {}));

//=============================================================================
// TwinsTestimony4 Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_TwinsTestimony4_p1 = my.BHell_Enemy_TwinsTestimony4_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_TwinsTestimony4_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_TwinsTestimony4_p1.prototype.constructor = BHell_Enemy_TwinsTestimony4_p1;

	BHell_Enemy_TwinsTestimony4_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 75; 
		emitterParams.after_period = 50; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = my.defaultBullet;
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		
		this.emitters.push(new my.BHell_Emitter_P1(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	
    return my;
} (BHell || {}));
