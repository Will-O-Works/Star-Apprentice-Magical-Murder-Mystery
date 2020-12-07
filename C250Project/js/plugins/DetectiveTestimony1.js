var BHell = (function (my) {
	
	var BHell_Emitter_Tutorial = my.BHell_Emitter_Tutorial = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Tutorial.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Tutorial.prototype.constructor = BHell_Emitter_Tutorial;
	
    BHell_Emitter_Tutorial.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = "$Bullets";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = this.params.direction;
		this.bulletParams.phase = 1; 
		
		this.num_bullet = 6; 
		this.angle = 0; 
		this.baseSpeed = 1; 
		this.timer = 0; 
		
		this.type = 0; 
		this.attack_between = 50; 
		this.angry = false; 
		
		this.start = 0; 
		
		if (params != null) {
			this.num_bullet = params.num_bullet || this.num_bullet;
			this.attack_between = params.attack_between || this.attack_between;
			this.type = params.type || this.type; 
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Tutorial.prototype.shoot = function () {
		
		// if (this.type == 1) {
		if (this.start == 0) {
			this.start = 1; 
			return; 
		}
			
			for (var n = 0; n < this.num_bullet; n++) {
				this.aimingAngle = this.angle + 2 * Math.PI / this.num_bullet * n;
				
				this.bulletParams.speed = 2; 
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
			}
			
			this.angle += Math.PI / (this.num_bullet + 1); 
		// } 

    };


    return my;
} (BHell || {}));

//=============================================================================
// Tutorial Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_Tutorial_p1 = my.BHell_Enemy_Tutorial_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Tutorial_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Tutorial_p1.prototype.constructor = BHell_Enemy_Tutorial_p1;

	BHell_Enemy_Tutorial_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 50;
        params.speed = 25;
        params.hitbox_w = 218;
        params.hitbox_h = 72;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
        my.player.bombs = 0;
		my.player.currentLine = 0; 
		
		this.pressed = [0, 0, 0, 0]; 
		this.count = 0; 
		this.timer = 0; 
		this.framcounter=0;
    };
	
		
	BHell_Enemy_Tutorial_p1.prototype.update = function() {
		this.framcounter++;
		this.hp = 999; 
		if(this.framcounter>150){
			if (Input.isPressed('up')) {
				this.pressed[0] = 1;
			}
			if (Input.isPressed('down')) {
				this.pressed[1] = 1;
			}
			if (Input.isPressed('left')) {
				this.pressed[2] = 1;
			}
			if (Input.isPressed('right')) {
				this.pressed[3] = 1;
			}
	
			this.count = 0; 
			
			for (var j = 0; j < this.pressed.length; j ++) {
				if (this.pressed[j] == 1) {
					this.count += 1; 
				}
			}
			
			if (my.player.use_mouse == true && this.y == 125) {
				this.count = 4; 
			}
			
			if (this.count == 4) {
				this.die(); 
			}
		}
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
	
    return my;
} (BHell || {}));

//=============================================================================
// Tutorial Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_Tutorial_p2 = my.BHell_Enemy_Tutorial_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Tutorial_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Tutorial_p2.prototype.constructor = BHell_Enemy_Tutorial_p2;

	BHell_Enemy_Tutorial_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 20;
        params.speed = 25;
        params.hitbox_w = 112;
        params.hitbox_h = 72;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 1; 
		
		var emitterParams = {};
		emitterParams.aim = true;
		emitterParams.always_aim = true;
		emitterParams.period = 100;

		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
	
	BHell_Enemy_Tutorial_p2.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			this.emitters[0].period = 20; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
	
    return my;
} (BHell || {}));

//=============================================================================
// Tutorial Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_Tutorial_p3 = my.BHell_Enemy_Tutorial_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Tutorial_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Tutorial_p3.prototype.constructor = BHell_Enemy_Tutorial_p3;

	BHell_Enemy_Tutorial_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 50;
        params.speed = 25;
        params.hitbox_w = 106;
        params.hitbox_h = 72;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true; 
		my.player.currentLine = 2; 
		
		var emitterParams = {};
		emitterParams.period = 100; 
		this.emitters.push(new my.BHell_Emitter_Tutorial(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
	
	BHell_Enemy_Tutorial_p3.prototype.update = function() {
		
		this.hp = 999; 
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
	
	BHell_Enemy_Tutorial_p3.prototype.destroy = function() {

		//adding these to the correct line allow it to transition to a different phase
		my.player.PhaseOver = true;
		my.player.nextMap = Number(35);//the 3 here is the map number change this to whatever map number u want to transition there on victory
			
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
    return my;
} (BHell || {}));

//=============================================================================
// Practice Testimony Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Practice = my.BHell_Emitter_Practice = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Practice.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Practice.prototype.constructor = BHell_Emitter_Practice;
	
    BHell_Emitter_Practice.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = "$Bullets";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = this.params.direction;
		this.bulletParams.phase = 1; 
		
		this.num_bullet = 8; 
		this.angle = 0; 
		this.baseSpeed = 1; 
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
		
		this.start = 0; 
    };

    BHell_Emitter_Practice.prototype.shoot = function () {
		
		if (this.type == 1) {
			
			if (this.start < 2) {
				this.start += 1; 
				return; 
			}
			
			for (var n = 0; n < this.num_bullet; n++) {
				this.aimingAngle = this.angle + 2 * Math.PI / this.num_bullet * n;
				
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
			}
			
			this.angle += Math.PI / (this.num_bullet + 1); 
			
		} else if (this.type == 2) {
			
			if (this.start == 0) {
				this.start += 1; 
				return; 
			}
			
			for (var j = 0; j < 5; j ++) {
				
				var dx = my.player.x - this.x;
				var dy = my.player.y - this.y;
				this.aimingAngle = Math.atan2(dy, dx);
				
				this.bp = {}; 
				this.bp.speed = this.baseSpeed + j; 
	
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bp, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);

			} 
			
		} else if (this.type == 3) {
			
			if (this.start < 11) {
				this.start += 1; 
				return; 
			}
			
			this.num_bullet = 4; 
			
			for (var n = 0; n < this.num_bullet; n++) {
				this.aimingAngle = this.angle + 2 * Math.PI / this.num_bullet * n;
				
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
			}
			
			this.angle += Math.PI / 23; 
			
		}

    };


    return my;
} (BHell || {}));



//=============================================================================
// Practice Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_Practice_p1 = my.BHell_Enemy_Practice_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Practice_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Practice_p1.prototype.constructor = BHell_Enemy_Practice_p1;

	BHell_Enemy_Practice_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 50;
        params.speed = 25;
        params.hitbox_w = 224;
        params.hitbox_h = 82;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 30; 
		emitterParams.type = 1; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 0;
		
		this.emitters.push(new my.BHell_Emitter_Practice(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_Practice_p1.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			//this.emitters[0].attack_between = 125; 
			this.emitters[0].period = 10; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
	
    return my;
} (BHell || {}));

//=============================================================================
// Practice Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_Practice_p2 = my.BHell_Enemy_Practice_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Practice_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Practice_p2.prototype.constructor = BHell_Enemy_Practice_p2;

	BHell_Enemy_Practice_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 50;
        params.speed = 25;
        params.hitbox_w = 202;
        params.hitbox_h = 82;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Bounce(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 50; 
		emitterParams.type = 2; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$FanBullets";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 1;
		
		this.emitters.push(new my.BHell_Emitter_Practice(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_Practice_p2.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			this.emitters[0].period = 40; 
			this.emitters[0].baseSpeed = 5; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
    return my;
} (BHell || {}));

//=============================================================================
// Practice Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_Practice_p3 = my.BHell_Enemy_Practice_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Practice_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Practice_p3.prototype.constructor = BHell_Enemy_Practice_p3;

	BHell_Enemy_Practice_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 50;
        params.speed = 25;
        params.hitbox_w = 352;
        params.hitbox_h = 75;
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
		my.player.can_bomb = true;  
		my.player.currentLine = 2;
		
		this.emitters.push(new my.BHell_Emitter_Practice(this.x, this.y, emitterParams, parent, my.enemyBullets));


    };
	
	BHell_Enemy_Practice_p3.prototype.destroy = function() {

		//adding these to the correct line allow it to transition to a different phase
		my.player.PhaseOver = true;
		my.player.nextMap = Number(46);//the 3 here is the map number change this to whatever map number u want to transition there on victory
			
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
    return my;
} (BHell || {}));