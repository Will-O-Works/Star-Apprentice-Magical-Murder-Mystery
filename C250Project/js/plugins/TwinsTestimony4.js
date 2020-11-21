var BHell = (function (my) {

/**
 * Bullet class. Represents a single bullet moving straight on the map.
 * @constructor
 * @memberOf BHell
 * @extends BHell.BHell_Sprite
 */
var BHell_BW_Bullet = my.BHell_BW_Bullet = function() {
    this.initialize.apply(this, arguments);
};

BHell_BW_Bullet.prototype = Object.create(my.BHell_Sprite.prototype);
BHell_BW_Bullet.prototype.constructor = BHell_BW_Bullet;

BHell_BW_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
    var speed = 3;
    var sprite = "$TwinsBulletsBW";
    var index = 0;
    var direction = 2;
    var frame = 0;
    var animated = false;
    var animationSpeed = 15;
    var grazed = false;
	var shoot_x = my.player.x;  // restore variable for sine shaped bullets by V.L.
	var count = 0;  // restore variable for sine shaped bullets by V.L.
	var type = "b"; 
	var bounce = 0; 
	
	//variable added to allow adjustable hitboxs YA 2020/10/26
    var hitboxshape = "circle";
    var hitboxheight = 0;
    var hitboxwidth = 0;
    var hitboxradius = 8;


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
		bounce = params.bounce || bounce; 
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
	this.bounce = bounce; 
	
	this.hitboxshape = hitboxshape;
    this.hitboxradius = hitboxradius;
    this.hitboxheight = hitboxheight;
    this.hitboxwidth = hitboxwidth;
	
	if (this.type == "b") {
		if (this.x >= Graphics.width / 2) {
			this.direction = 2; 
		} else {
			this.direction = 6; 
		}
		
	} else {
		if (this.x < Graphics.width / 2) {
			this.direction = 4; 
		} else {
			this.direction = 8; 
		}
	}
};

/**
 * Updates the bullet's position. If it leaves the screen, it's destroyed.
 */
BHell_BW_Bullet.prototype.update = function () {

    if (this.x < 0 || this.x > Graphics.width) {
        if (this.bounce == 1) {
			this.angle = Math.PI - this.angle; 
			this.rotation = this.angle + Math.PI / 2;
			if (this.type == "b") {
				this.type = "w"; 
				this.sprite = "$TwinsBulletsBW"; 
				this.direction = 4; 
			} else {
				this.type = "b"; 
				this.sprite = "$TwinsBulletsBW"; 
				this.direction = 2; 
			}
			
			this.bounce = 0; 
		} 
    }
	if (this.type == "b") {
		if (my.player.x >= Graphics.width / 2 ) { // && this.x >= Graphics.width / 2
			this.direction = 2; 
		} else {
			this.direction = 6; 
		}
		
	} else {
		if (my.player.x < Graphics.width / 2 ) { // && this.x < Graphics.width / 2
			this.direction = 4; 
		} else {
			this.direction = 8; 
		}
	}
	
	my.BHell_Sprite.prototype.update.call(this);

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
	
	if (this.y < -this.height || this.x < -this.width || this.x > Graphics.width + this.width || this.y > Graphics.height + this.height) {
        this.outsideMap = true;
    }
};

BHell_BW_Bullet.prototype.isOutsideMap = function () {
    return this.outsideMap;
};

// Add effects on bullet hit by V.L.
BHell_BW_Bullet.prototype.hit_effect = function() {
	my.effects.push(new my.BHell_Hit_Effect(this.x, this.y, this.sprite, this.index, this.parent, my.effects));
};

/**
 * Removes the bullet from the screen and from its container.
 */
BHell_BW_Bullet.prototype.destroy = function() {

	/*var bullet_effect = new my.BHell_BW_Bullet(this.x, this.y, -Math.PI * Math.random(), this.bulletParams, this.bulletList);
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
        this.bulletParams.sprite = "$TwinsBulletsBW";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = this.params.direction;
		
		this.num_bullet = 8; 
		this.repeat = 6; 
		
		this.space = Graphics.width / this.repeat;
		// this.y_space = Graphics.height / this.repeat;
		
		this.attack_between = this.space / this.num_bullet; // time between two major attacks
		// this.y_attack_between = this.y_space / this.num_bullet; // time between two major attacks
		
		this.count = 0; 
		// this.count_y = 0; 
		this.swap = 1; 
		
		this.timer = 0; 
		this.time_space = 50; 
		this.line_space = 16; 
		this.line_count = Graphics.height / this.line_space; 
		
		if (params != null) {
			this.num_bullet = params.num_bullet || this.num_bullet;
			this.attack_between = params.attack_between || this.attack_between;
        }
		
		this.baseSpeed = 2; 
		this.angle = Math.PI / 2; 
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_P1.prototype.shoot = function () {

		this.bulletParams.speed = this.baseSpeed; 
		
		// for (var i = 0; i < this.repeat; i ++) {
			
			for (var j = 0; j < this.num_bullet; j++) {
			
				if ((j % 2 == 1 && this.swap == 1) || (j % 2 == 0 && this.swap == 0)) {
					this.angle = Math.PI / 2; 
					this.bulletParams.type = "w"; 
					this.b_x = 10 + this.count * this.attack_between + j * this.space; 
					this.bulletParams.sprite = "$TwinsBulletsBW";
					this.bulletParams.direction = 4; 
				
					var bullet = new my.BHell_BW_Bullet(this.b_x, 0, this.angle, this.bulletParams, this.bulletList);
					this.parent.addChild(bullet);
					this.bulletList.push(bullet);
					
					
				} else {
					this.angle = - Math.PI / 2; 
					this.bulletParams.type = "b"; 
					this.b_x = 10 + this.count * this.attack_between + j * this.space; 
					this.bulletParams.sprite = "$TwinsBulletsBW";
					this.bulletParams.direction = 2; 
					
					var bullet = new my.BHell_BW_Bullet(this.b_x, Graphics.height, this.angle, this.bulletParams, this.bulletList);
					this.parent.addChild(bullet);
					this.bulletList.push(bullet);
					
				}

			}
			
			if (this.timer % this.time_space == 0) {
				
				for (var j = 0; j < this.line_count; j++) {
				
					this.angle = 0; 
					this.bulletParams.type = "w"; 
					this.b_y = j * this.line_space; 
					this.bulletParams.sprite = "$TwinsBulletsBW";
					this.bulletParams.direction = 4; 
				
					var bullet = new my.BHell_BW_Bullet(0, this.b_y, this.angle, this.bulletParams, this.bulletList);
					this.parent.addChild(bullet);
					this.bulletList.push(bullet);
				
				}
				
			} else if (this.timer % this.time_space == this.time_space / 2) {
				
				for (var j = 0; j < this.line_count; j++) {
				
					this.angle = Math.PI; 
					this.bulletParams.type = "b"; 
					this.b_y = j * this.line_space; 
					this.bulletParams.sprite = "$TwinsBulletsBW";
					this.bulletParams.direction = 2; 
				
					var bullet = new my.BHell_BW_Bullet(Graphics.width, this.b_y, this.angle, this.bulletParams, this.bulletList);
					this.parent.addChild(bullet);
					this.bulletList.push(bullet);
				
				}
				
			}
			
			this.timer += 1; 
		
		this.count += 1; 
		
		if (this.count >= this.repeat) {
			this.count = 0; 
			this.period = 20; 
			if (this.swap == 1) {
				this.swap = 0; 
			} else {
				this.swap = 1; 
			} 
		} else {
			this.period = 5; 
		}
		// console.log("shooting...");
    };


    return my;
} (BHell || {}));


//=============================================================================
// P2 Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_P2 = my.BHell_Emitter_P2 = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_P2.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_P2.prototype.constructor = BHell_Emitter_P2;
	
    BHell_Emitter_P2.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
		this.bulletParams.speed = 2; 
        this.bulletParams.sprite = "$TwinsBulletsBW";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = this.params.direction;
		
		this.angle = 0; 
		this.bullet_count = 14; 
		this.bullet_angle = Math.PI/48; 
		
		this.center_x = Graphics.width / 2; 
		this.center_y = Graphics.height / 2; 
		this.count = 0; 
		
		this.num_waves = 120; 
		this.ang_change = 2 * Math.PI / this.num_waves; 
		this.time_space = 400; 
		this.speed = 3; 
		
		if (params != null) {
            this.center_x = params.center_x || this.center_x;
			this.center_y = params.center_y || this.center_y;
			this.space_angle = params.space_angle || this.space_angle; 
			this.bullet_count = params.bullet_count || this.bullet_count; 
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_P2.prototype.shoot = function () {
		
		this.bulletParams.speed = 2; 
		
		if (this.count % this.bullet_count < this.bullet_count / 2) {
		// for (var c = 0; c < this.bullet_count; c ++) {
			
			this.angle += this.bullet_angle; 
			
			this.bulletParams.type = "w"; 
			this.bulletParams.sprite = "$TwinsBulletsBW";
			this.bulletParams.direction = 4; 
			var bullet = new my.BHell_BW_Bullet(this.center_x, this.center_y, this.angle, this.bulletParams, this.bulletList);
			
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);
		}
		else {
		// for (var c = 0; c < this.bullet_count; c ++) {
			this.angle += this.bullet_angle; 
			
			this.bulletParams.type = "b"; 
			this.bulletParams.sprite = "$TwinsBulletsBW";
			this.bulletParams.direction = 2; 
			var bullet = new my.BHell_BW_Bullet(this.center_x, this.center_y, this.angle, this.bulletParams, this.bulletList);
			
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);
		}
		
		this.bulletParams.speed = 1; 
		
		if (this.count % this.time_space == 0) {

			this.dir = 0; 

			for (var num = 0; num < this.num_waves; num ++) {
				var dx = (16 * Math.sin(this.dir) * Math.sin(this.dir) * Math.sin(this.dir)); 
				var dy = (-13 * Math.cos(this.dir) + 5 * Math.cos(2 * this.dir)+2 * Math.cos(3 * this.dir) + Math.cos(4 * this.dir)); 
				
				this.aimingAngle = Math.atan2(dy, dx);
				
				this.bulletParams.speed = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / 40 * this.speed; 
				this.bulletParams.type = "b"; 
				this.bulletParams.sprite = "$TwinsBulletsBW";
				this.bulletParams.direction = 2; 
				var bullet = new my.BHell_BW_Bullet(this.center_x, this.center_y, this.aimingAngle, this.bulletParams, this.bulletList);
				
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				this.dir += 2 * Math.PI / this.num_waves; 
			}
			
			/*for (var j = 0; j < this.num_waves; j++) {
				this.bulletParams.type = "b"; 
				this.bulletParams.direction = 8; 
				var bullet = new my.BHell_BW_Bullet(this.center_x, this.center_y, this.angle + j * this.ang_change, this.bulletParams, this.bulletList);
				
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
			}*/ 
		} else if (this.count % this.time_space == this.time_space / 2) {
			
			this.dir = 0; 

			for (var num = 0; num < this.num_waves; num ++) {
				var dx = (16 * Math.sin(this.dir) * Math.sin(this.dir) * Math.sin(this.dir)); 
				var dy = (-13 * Math.cos(this.dir) + 5 * Math.cos(2 * this.dir)+2 * Math.cos(3 * this.dir) + Math.cos(4 * this.dir)); 
				
				this.aimingAngle = Math.atan2(dy, dx);
				
				this.bulletParams.speed = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / 40 * this.speed; 
				this.bulletParams.type = "w"; 
				this.bulletParams.sprite = "$TwinsBulletsBW";
				this.bulletParams.direction = 4; 
				var bullet = new my.BHell_BW_Bullet(this.center_x, this.center_y, this.aimingAngle, this.bulletParams, this.bulletList);
				
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				this.dir += 2 * Math.PI / this.num_waves; 
			}
			
			/*for (var j = 0; j < this.num_waves; j++) {
				this.bulletParams.type = "w"; 
				this.bulletParams.direction = 6; 
				var bullet = new my.BHell_BW_Bullet(this.center_x, this.center_y, this.angle + j * this.ang_change, this.bulletParams, this.bulletList);
				
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
			}*/
		}
		
		this.count += 1; 

    };
	
    return my;
} (BHell || {}));

//=============================================================================
// P3 Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_P3 = my.BHell_Emitter_P3 = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_P3.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_P3.prototype.constructor = BHell_Emitter_P3;
	
    BHell_Emitter_P3.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = "$TwinsBulletsBW";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = 4;
		
		this.num_waves = 100; // number of waves in a Testimony
		this.num_bullet = 2; // number of bullets in a Testimony
		this.attack_between = 200; // time between two major attacks
		
		if (params != null) {
            this.num_waves = params.num_waves || this.num_waves;
			this.num_bullet = params.num_bullet || this.num_bullet;
			this.attack_between = params.after_period || this.attack_between;
        }
		
		this.baseSpeed = 1.5; 
		this.angle = 0; 
		this.type = 0; 
		this.count = 0; 
		
		this.center_x = Graphics.width / 2; 
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
		
		this.timer = 0;
    };

    BHell_Emitter_P3.prototype.shoot = function () {

		// console.log(this.timer); 
		this.ang_change = 2 * Math.PI / this.num_waves; 

		if (this.timer > 70) {
			for (var j = 0; j < this.num_waves; j++) {
				
				this.bulletParams.speed = this.baseSpeed + this.count; 
				if (this.type == 0) {
					this.bulletParams.type = "w"; 
					this.bulletParams.bounce = 1; 
					this.bulletParams.sprite = "$TwinsBulletsBW";
					this.bulletParams.direction = 4; 
					var bullet = new my.BHell_BW_Bullet(this.center_x, this.y, this.angle + j * this.ang_change, this.bulletParams, this.bulletList);
					
					this.parent.addChild(bullet);
					this.bulletList.push(bullet);
				} else {
					this.bulletParams.type = "b"; 
					this.bulletParams.bounce = 1; 
					this.bulletParams.sprite = "$TwinsBulletsBW";
					this.bulletParams.direction = 2; 
					var bullet = new my.BHell_BW_Bullet(this.center_x, this.y, this.angle + j * this.ang_change, this.bulletParams, this.bulletList);
					
					this.parent.addChild(bullet);
					this.bulletList.push(bullet);
				}

			}

			if (this.count < this.num_bullet) {
				this.count += 1; 
				this.period = 5; 
			} else {
				this.count = 0; 
				
				if (this.type == 0) {
					this.type = 1; 
				} else {
					this.type = 0; 
				}
				this.angle += Math.PI / 12; 
				this.period = this.attack_between; 
				this.center_x = 200 + (Graphics.width - 400) * Math.random(); 
			}

		} else {
			this.timer += 1; 
		}

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
        params.hitbox_w = 432;
        params.hitbox_h = 80;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 5; 
		emitterParams.after_period = 0; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsBW";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 0;
		
		this.emitters.push(new my.BHell_Emitter_P1(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_TwinsTestimony4_p1.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			this.emitters[0].baseSpeed = 4; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
	
    return my;
} (BHell || {}));

//=============================================================================
// TwinsTestimony4 Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_TwinsTestimony4_p2 = my.BHell_Enemy_TwinsTestimony4_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_TwinsTestimony4_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_TwinsTestimony4_p2.prototype.constructor = BHell_Enemy_TwinsTestimony4_p2;

	BHell_Enemy_TwinsTestimony4_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 456;
        params.hitbox_h = 71;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 1; 
		emitterParams.after_period = 0; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsBW";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true; 
		my.player.currentLine = 1;
		
		this.emitters.push(new my.BHell_Emitter_P2(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_TwinsTestimony4_p2.prototype.destroy = function() {

		//adding these to the correct line allow it to transition to a different phase
		my.player.PhaseOver = true;
		my.player.nextMap = Number(22);//the 3 here is the map number change this to whatever map number u want to transition there on victory
			
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
    return my;
} (BHell || {}));

//=============================================================================
// TwinsTestimony4 Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_TwinsTestimony4_p3 = my.BHell_Enemy_TwinsTestimony4_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_TwinsTestimony4_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_TwinsTestimony4_p3.prototype.constructor = BHell_Enemy_TwinsTestimony4_p3;

	BHell_Enemy_TwinsTestimony4_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 552;
        params.hitbox_h = 80;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 1; 
		emitterParams.after_period = 250; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsBW";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 2;
		
		this.emitters.push(new my.BHell_Emitter_P3(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_TwinsTestimony4_p3.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			//this.emitters[0].attack_between = 125; 
			this.emitters[0].num_bullet = 4; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
	
    return my;
} (BHell || {}));