var BHell = (function (my) {

/**
 * Bullet class. Represents a single bullet moving straight on the map.
 * @constructor
 * @memberOf BHell
 * @extends BHell.BHell_Sprite
 */
var BHell_Fan_Bullet = my.BHell_Fan_Bullet = function() {
    this.initialize.apply(this, arguments);
};

BHell_Fan_Bullet.prototype = Object.create(my.BHell_Sprite.prototype);
BHell_Fan_Bullet.prototype.constructor = BHell_Fan_Bullet;

BHell_Fan_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
    var speed = 3;
    var sprite = "$FanBullets";
    var index = 0;
    var direction = 2;
    var frame = 0;
    var animated = false;
    var animationSpeed = 15;
    var grazed = false;
	var phase = 0; 
	var after_speed = 0; 

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
		phase = params.phase || phase;   // restore variable for sine shaped bullets by V.L.
		after_speed = params.after_speed || after_speed; 
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
	this.phase = phase; 
	this.after_speed = after_speed; 
	
	this.timer = 0; 
	
	this.hitboxshape = hitboxshape;
    this.hitboxradius = hitboxradius;
    this.hitboxheight = hitboxheight;
    this.hitboxwidth = hitboxwidth;
};

/**
 * Updates the bullet's position. If it leaves the screen, it's destroyed.
 */
BHell_Fan_Bullet.prototype.update = function () {

	my.BHell_Sprite.prototype.update.call(this);

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
	
	if (this.y < -this.height || this.x < -this.width || this.x > Graphics.width + this.width || this.y > Graphics.height + this.height) {
        this.outsideMap = true;
    }
	
	switch (this.phase) {
		case 1: 
		this.speed *= 1.015; 
		break; 
		
		case 2: 
		if (this.timer == 20) {
			this.speed = 1.5; 
		}
		break; 
		
		case 3: 
		if (this.timer == 50) {
			var dx = my.player.x - this.x;
            var dy = my.player.y - this.y;
            this.angle = Math.atan2(dy, dx);
		}
		break; 
		
		case 4: 
		if (this.timer < 90) {
			this.angle += Math.PI/45;
		} else {
			this.angle += Math.PI/360;
			if (this.after_speed != 0) {
				this.speed += this.after_speed; 
			}
		}

		break; 
		
		case 5: 
		if (this.timer < 90) {
			this.angle -= Math.PI/45;
		} else {
			this.angle -= Math.PI/360;
			if (this.after_speed != 0) {
				this.speed += this.after_speed; 
			}
		}
		break; 
		
		case 6: 
		if (this.timer < 90) {
			this.angle += Math.PI/45;
		}
		
		break; 
	}
	
	this.timer += 1; 
};

BHell_Fan_Bullet.prototype.isOutsideMap = function () {
    return this.outsideMap;
};

// Add effects on bullet hit by V.L.
BHell_Fan_Bullet.prototype.hit_effect = function() {
	my.effects.push(new my.BHell_Hit_Effect(this.x, this.y, this.sprite, this.index, this.parent, my.effects));
};

/**
 * Removes the bullet from the screen and from its container.
 */
BHell_Fan_Bullet.prototype.destroy = function() {

	/*var bullet_effect = new my.BHell_Fan_Bullet(this.x, this.y, -Math.PI * Math.random(), this.bulletParams, this.bulletList);
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
// Testimony 1 Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Fan_T1 = my.BHell_Emitter_Fan_T1 = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Fan_T1.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Fan_T1.prototype.constructor = BHell_Emitter_Fan_T1;
	
    BHell_Emitter_Fan_T1.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = "$FanBullets";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = this.params.direction;
		this.bulletParams.phase = 1; 
		
		this.num_bullet = 12; 
		this.angle = 0; 
		this.baseSpeed = 0; 
		this.timer = 0; 
		
		this.type = 0; 
		this.attack_between = 50; 
		this.angry = false; 
		
		if (params != null) {
			this.num_bullet = params.num_bullet || this.num_bullet;
			this.attack_between = params.attack_between || this.attack_between;
			this.type = params.type || this.type; 
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Fan_T1.prototype.shoot = function () {
		
		if (this.type == 1) {
			
			for (var n = 0; n < this.num_bullet; n++) {
				this.aimingAngle = this.angle + 2 * Math.PI / this.num_bullet * n;
				
				var bullet = new my.BHell_Fan_Bullet(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
			}
			
			this.angle += Math.PI / this.num_bullet; 
			
		} else if (this.type == 2) {
			
			this.angle += Math.PI / 20;
				
			var bullet = new my.BHell_Fan_Bullet(this.x - 200, 125, -this.angle, this.bulletParams, this.bulletList);
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);
				
			var bullet = new my.BHell_Fan_Bullet(this.x + 200, 125, this.angle, this.bulletParams, this.bulletList);
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);
			
			if (this.angry == true) {
				var bullet = new my.BHell_Fan_Bullet(this.x - 200, 125, -Math.PI + this.angle, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
					
				var bullet = new my.BHell_Fan_Bullet(this.x + 200, 125, -Math.PI - this.angle, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
			}
			
		} else if (this.type == 3) {
			
			this.angle += Math.PI / 90;
			
			var num = 3; 
			
			if (this.angry == true) {
				num = 5; 
			}
			
			for (var n = 0; n < num; n++) {
				
				var bullet = new my.BHell_Fan_Bullet(this.x, 125, this.angle + 2 * Math.PI / num * n, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				var bullet = new my.BHell_Fan_Bullet(this.x, 125, -this.angle + 2 * Math.PI / num * n, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
			}
			
			this.angle += Math.PI / this.num_bullet; 
			
		}

    };


    return my;
} (BHell || {}));


//=============================================================================
// FanTestimony1 Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_FanTestimony1_p1 = my.BHell_Enemy_FanTestimony1_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_FanTestimony1_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_FanTestimony1_p1.prototype.constructor = BHell_Enemy_FanTestimony1_p1;
	
	
	BHell_Enemy_FanTestimony1_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
		params.hitbox_w = 400;
        params.hitbox_h = 81;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 2; 
		emitterParams.type = 2; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$FanBullets";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 0;
		
		this.emitters.push(new my.BHell_Emitter_Fan_T1(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };

        BHell_Enemy_FanTestimony1_p1.prototype.update = function() {
        
        if (this.bombedWrong == true) {
            // Write the bombedWrong penalty in here
            //this.emitters[0].attack_between = 125; 
            this.emitters[0].angry = true; 
        }
        
        /* inherit update function from BHell_Enemy_Base by V.L. */
        my.BHell_Enemy_Base.prototype.update.call(this);
        /* inherit update function from BHell_Enemy_Base by V.L. */
    } 
	
	
    return my;
} (BHell || {}));

//=============================================================================
// FanTestimony1 Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_FanTestimony1_p2 = my.BHell_Enemy_FanTestimony1_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_FanTestimony1_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_FanTestimony1_p2.prototype.constructor = BHell_Enemy_FanTestimony1_p2;

	
	BHell_Enemy_FanTestimony1_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
		params.hitbox_w = 388;
        params.hitbox_h = 72;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Bounce(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 15; 
		emitterParams.type = 1; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$FanBullets";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true; 
		my.player.currentLine = 1;
		
		this.emitters.push(new my.BHell_Emitter_Fan_T1(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_FanTestimony1_p2.prototype.destroy = function() {

        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(16);//the 3 here is the map number change this to whatever map number u want to transition there on victory
            
        /* inherit destroy function from BHell_Enemy_Base by V.L. */
        my.BHell_Enemy_Base.prototype.destroy.call(this);
        /* inherit destroy function from BHell_Enemy_Base by V.L. */
    };
	



    return my;
} (BHell || {}));

//=============================================================================
// FanTestimony1 Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_FanTestimony1_p3 = my.BHell_Enemy_FanTestimony1_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_FanTestimony1_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_FanTestimony1_p3.prototype.constructor = BHell_Enemy_FanTestimony1_p3;

	BHell_Enemy_FanTestimony1_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 510;
        params.hitbox_h = 80;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 5; 
		emitterParams.type = 3; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$FanBullets";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 2;
		
		this.emitters.push(new my.BHell_Emitter_Fan_T1(this.x, this.y, emitterParams, parent, my.enemyBullets));


    };
	
	BHell_Enemy_FanTestimony1_p3.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			//this.emitters[0].attack_between = 125; 
			this.emitters[0].angry = true; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
    return my;
} (BHell || {}));