var BHell = (function (my) {

/**
 * Bullet class. Represents a single bullet moving straight on the map.
 * @constructor
 * @memberOf BHell
 * @extends BHell.BHell_Sprite
 */
var BHell_Timer_Bullet = my.BHell_Timer_Bullet = function() {
    this.initialize.apply(this, arguments);
};

BHell_Timer_Bullet.prototype = Object.create(my.BHell_Sprite.prototype);
BHell_Timer_Bullet.prototype.constructor = BHell_Timer_Bullet;

BHell_Timer_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
    var speed = 3;
    var sprite = "$TwinsBulletsWhite";
    var index = 0;
    var direction = 2;
    var frame = 0;
    var animated = false;
    var animationSpeed = 15;
    var grazed = false;
	var shoot_x = my.player.x;  // restore variable for sine shaped bullets by V.L.
	var count = 0;  // restore variable for sine shaped bullets by V.L.
	var timer = 100; 
	
	//variable added to allow adjustable hitboxs YA 2020/10/26
    var hitboxshape = "dot";
    var hitboxheight = 0;
    var hitboxwidth = 0;
    var hitboxradius = 0;

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
		timer = params.timer || timer; 
    }

    my.BHell_Sprite.prototype.initialize.call(this, sprite, index, direction, frame, animated, animationSpeed);

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.rotation = angle + Math.PI / 2;

	this.sprite = "$TwinsBulletsWhite"; 
	this.index = index; 
    this.x = x;
    this.y = y;
    this.z = 15;
    this.angle = angle;
    this.speed = speed;
    this.bulletList = bulletList;
    this.outsideMap = false;
	this.timer = timer; 
	
	this.hitboxshape = hitboxshape;
    this.hitboxradius = hitboxradius;
    this.hitboxheight = hitboxheight;
    this.hitboxwidth = hitboxwidth;
};

/**
 * Updates the bullet's position. If it leaves the screen, it's destroyed.
 */
BHell_Timer_Bullet.prototype.update = function () {
    my.BHell_Sprite.prototype.update.call(this);

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
	
	this.timer -= 1; 
	
    if (this.timer <= 0) {
        this.outsideMap = true;
    }
};

BHell_Timer_Bullet.prototype.isOutsideMap = function () {
    return this.outsideMap;
};

// Add effects on bullet hit by V.L.
BHell_Timer_Bullet.prototype.hit_effect = function() {
	my.effects.push(new my.BHell_Hit_Effect(this.x, this.y, this.sprite, this.index, this.parent, my.effects));
};

/**
 * Removes the bullet from the screen and from its container.
 */
BHell_Timer_Bullet.prototype.destroy = function() {

	/*var bullet_effect = new my.BHell_Timer_Bullet(this.x, this.y, -Math.PI * Math.random(), this.bulletParams, this.bulletList);
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
// Flower Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Flower = my.BHell_Emitter_Flower = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Flower.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Flower.prototype.constructor = BHell_Emitter_Flower;
	
    BHell_Emitter_Flower.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = "$TwinsBulletsWhite";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = 2;
		
		this.num_waves = 12; // number of waves in a Testimony
		this.num_bullet = 15; // number of bullets in a Testimony
		this.attack_between = 150; // time between two major attacks
		
		if (params != null) {
            this.num_waves = params.num_waves || this.num_waves;
			this.num_bullet = params.num_bullet || this.num_bullet;
			this.attack_between = params.attack_between || this.attack_between;
        }
		
		this.baseSpeed = 1; 
		this.angle = 0; 
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
		
		this.timer = 0;
		this.count = 0; 
    };

    BHell_Emitter_Flower.prototype.shoot = function () {

		// console.log(this.timer);

		if (this.timer > 100) {
			for (var j = 0; j < this.num_waves; j++) {
				this.bulletParams.speed = this.baseSpeed + this.count / 4; 
				var bullet = new my.BHell_Bullet(this.x, this.y, this.angle + this.count * Math.PI / 180 + j * 2 * Math.PI / 12, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
			}
			this.repeat(); 
		} else {
			this.timer += 1; 
		}

    };
	
	BHell_Emitter_Flower.prototype.repeat = function () {
		if (this.count < this.num_bullet) {
			this.count += 1; 
			this.period = 5; 
		} else {
			this.count = 0; 
			this.angle += Math.PI / 12; 
			this.period = this.attack_between; 
		}
	}; 
    return my;
} (BHell || {}));


//=============================================================================
// Spin Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Spin = my.BHell_Emitter_Spin = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Spin.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Spin.prototype.constructor = BHell_Emitter_Spin;
	
    BHell_Emitter_Spin.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = "$TwinsBulletsWhite";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = 6;
		
		this.angle = 0; 
		this.bullet_count = 6; 
		this.bullet_angle = Math.PI/96; 
		this.space_angle = Math.PI/24; 
		
		this.center_x = Graphics.width / 2; 
		this.center_y = Graphics.height / 2; 
		this.speed = 2; 
		
		if (params != null) {
            this.center_x = params.center_x || this.center_x;
			this.center_y = params.center_y || this.center_y;
			this.space_angle = params.space_angle || this.space_angle; 
			this.bullet_count = params.bullet_count || this.bullet_count; 
			this.speed = params.speed || this.speed; 
        }
		
		this.bulletParams.speed = this.speed; 
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Spin.prototype.shoot = function () {
		
		for (var c = 0; c < this.bullet_count; c ++) {
			this.angle += this.bullet_angle; 
				
			var bullet = new my.BHell_Bullet(this.center_x, this.center_y, this.angle, this.bulletParams, this.bulletList);
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);
		}
		
		if (this.i < 1) {
			this.i += 1; 
		} else {
			this.period = 5; 
		}
		
		this.angle += this.space_angle; 
    };
	
    return my;
} (BHell || {}));


//=============================================================================
// Heart Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Heart = my.BHell_Emitter_Heart = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Heart.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Heart.prototype.constructor = BHell_Emitter_Heart;
	
    BHell_Emitter_Heart.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
		this.bulletParams.speed = 1.5; 
        this.bulletParams.sprite = "$TwinsBulletsWhite";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = 4; //this.params.direction;
		
		this.angle = 0; 
		this.angle_change = Math.PI/6; 
		this.radius = Graphics.width / 2; 
		this.center_x = Graphics.width / 2; 
		this.center_y = Graphics.height / 2; 
		this.count = 24; 
		this.speed = 4; 
		
		if (params != null) {
            this.center_x = params.center_x || this.center_x;
			this.center_y = params.center_y || this.center_y;
			this.count = params.count || this.count; 
			this.speed = params.speed || this.speed; 
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Heart.prototype.shoot = function () {
		this.dir = this.angle; 

		for (var num = 0; num < this.count; num ++) {
			var dx = (16 * Math.sin(this.dir) * Math.sin(this.dir) * Math.sin(this.dir)); 
			var dy = (-13 * Math.cos(this.dir) + 5 * Math.cos(2 * this.dir)+2 * Math.cos(3 * this.dir) + Math.cos(4 * this.dir)); 
			
			this.aimingAngle = Math.atan2(dy, dx);
			this.bulletParams.timer = 500; 
			this.bulletParams.speed = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / 40 * this.speed; 
			var bullet = new my.BHell_Bullet(this.center_x, this.center_y, this.angle + this.aimingAngle, this.bulletParams, this.bulletList);
            
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);
			
			this.dir += 2 * Math.PI / this.count; 
		}
		
		this.angle += this.angle_change; 
    };
	
    return my;
} (BHell || {}));

//=============================================================================
// Go Home Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Go_Home = my.BHell_Emitter_Go_Home = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Go_Home.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Go_Home.prototype.constructor = BHell_Emitter_Go_Home;
	
    BHell_Emitter_Go_Home.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = "$TwinsBulletsWhite";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = 8; //this.params.direction;
		
		this.angle = 0; 
		this.angle_change = Math.PI/18; 
		this.radius = 2 * Graphics.width / 3; 
		this.center_x = Graphics.width / 2; 
		this.center_y = Graphics.height / 2; 
		this.count = 12; 
		this.speed = 1.5; 
		
		if (params != null) {
			this.count = params.count || this.count;
			this.speed = params.speed || this.speed;
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Go_Home.prototype.shoot = function () {

		for (var num = 0; num < this.count; num ++) {
			var dx = - this.radius * Math.cos(this.angle + 2 * Math.PI / this.count * num); 
			var dy = - this.radius * Math.sin(this.angle + 2 * Math.PI / this.count * num); 
			this.aimingAngle = Math.atan2(dy, dx);

			this.bulletParams.timer = this.radius / this.bulletParams.speed; 
			this.bulletParams.speed = this.speed; 
			
			var bx = this.radius * Math.cos(this.angle + 2 * Math.PI / this.count * num) + this.center_x; 
			var by = this.radius * Math.sin(this.angle + 2 * Math.PI / this.count * num) + this.center_y; 
			
			var bullet = new my.BHell_Timer_Bullet(bx, by, this.aimingAngle, this.bulletParams, this.bulletList);
            
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);
		}
		
		this.angle += this.angle_change; 
    };
	
    return my;
} (BHell || {}));


//=============================================================================
// Go Player Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Go_Player = my.BHell_Emitter_Go_Player = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Go_Player.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Go_Player.prototype.constructor = BHell_Emitter_Go_Player;
	
    BHell_Emitter_Go_Player.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = "$TwinsBulletsWhite";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = 8; //this.params.direction;
		
		this.angle = 0; 
		this.angle_change = Math.PI/18; 
		this.radius = 200; // 2 * Graphics.width / 3; 
		this.center_x = my.player.x; 
		this.center_y = my.player.y; 
		this.count = 12; 
		this.speed = 1.5; 
		this.num = 0; 
		
		if (params != null) {
			this.count = params.count || this.count;
			this.speed = params.speed || this.speed;
        }
	
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Go_Player.prototype.shoot = function () {
		
		if (this.num == 0) {
			this.bullets = [];
			
			var j;
			var bullet;

			for (j = 0; j < this.count; j++) {
				bullet = new my.BHell_Bullet(200 * Math.cos(2 * Math.PI / this.count * j) + my.player.x, 200 * Math.sin(2 * Math.PI / this.count * j) + my.player.y, 2 * Math.PI / this.count * j, this.bulletParams, this.bulletList);
				bullet.update = function () {
					this.x = 200 * Math.cos(this.angle) + my.player.x;
					this.y = 200 * Math.sin(this.angle) + my.player.y;
					this.angle += Math.PI / 180;
					if (this.angle >= Math.PI * 2) {
						this.angle -= Math.PI * 2;
					}
				};

				this.bullets.push(bullet);
				this.bulletList.push(bullet);
				this.parent.addChild(bullet);
			}
		}
		
		this.bulletParams.direction = 0;

		this.center_x = my.player.x; 
		this.center_y = my.player.y; 
			
		var dx = - this.radius * Math.cos(this.angle + 2 * Math.PI / this.count * this.num); 
		var dy = - this.radius * Math.sin(this.angle + 2 * Math.PI / this.count * this.num); 
		this.aimingAngle = Math.atan2(dy, dx);

		this.bulletParams.timer = this.radius / this.bulletParams.speed; 
		this.bulletParams.speed = this.speed; 
			
		var bx = this.radius * Math.cos(this.angle + 2 * Math.PI / this.count * this.num) + this.center_x; 
		var by = this.radius * Math.sin(this.angle + 2 * Math.PI / this.count * this.num) + this.center_y; 
			
		var bullet = new my.BHell_Bullet(bx, by, this.aimingAngle, this.bulletParams, this.bulletList);
            
		this.parent.addChild(bullet);
		this.bulletList.push(bullet);
		
		this.angle += this.angle_change; 
		this.num += 1; 
    };
	
    return my;
} (BHell || {}));


//=============================================================================
// TwinsTestimony2 Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_TwinsTestimony2_p1 = my.BHell_Enemy_TwinsTestimony2_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_TwinsTestimony2_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_TwinsTestimony2_p1.prototype.constructor = BHell_Enemy_TwinsTestimony2_p1;

	BHell_Enemy_TwinsTestimony2_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 100; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsWhite";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true; 
		my.player.currentLine = 0;
		
		this.emitters.push(new my.BHell_Emitter_Spin(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 1; 
		this.emitters.push(new my.BHell_Emitter_Flower(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_TwinsTestimony2_p1.prototype.destroy = function() {

		//adding these to the correct line allow it to transition to a different phase
		my.player.PhaseOver = true;
		my.player.nextMap = Number(20);//the 3 here is the map number change this to whatever map number u want to transition there on victory
			
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
    return my;
} (BHell || {}));

//=============================================================================
// TwinsTestimony2 Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_TwinsTestimony2_p2 = my.BHell_Enemy_TwinsTestimony2_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_TwinsTestimony2_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_TwinsTestimony2_p2.prototype.constructor = BHell_Enemy_TwinsTestimony2_p2;

	BHell_Enemy_TwinsTestimony2_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 100; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsWhite";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 1;
		
		this.emitters.push(new my.BHell_Emitter_Spin(this.x, this.y, emitterParams, parent, my.enemyBullets));
		this.emitters.push(new my.BHell_Emitter_Heart(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
	
	BHell_Enemy_TwinsTestimony2_p2.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			this.emitters[1].num_bullet = 36; 
			this.emitters[1].period = 50; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
    return my;
} (BHell || {}));


//=============================================================================
// TwinsTestimony2 Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_TwinsTestimony2_p3 = my.BHell_Enemy_TwinsTestimony2_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_TwinsTestimony2_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_TwinsTestimony2_p3.prototype.constructor = BHell_Enemy_TwinsTestimony2_p3;

	BHell_Enemy_TwinsTestimony2_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 125;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 100; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsWhite";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 2;
		
		this.emitters.push(new my.BHell_Emitter_Spin(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 50; 
		this.emitters.push(new my.BHell_Emitter_Go_Home(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_TwinsTestimony2_p3.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			this.emitters[1].count = 20; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
    return my;
} (BHell || {}));