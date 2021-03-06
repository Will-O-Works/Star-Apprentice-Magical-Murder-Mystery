//=============================================================================
// Heart Emitters
//=============================================================================
var BHell = (function (my) {
	
	var BHell_Emitter_Heart_Drop = my.BHell_Emitter_Heart_Drop = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Heart_Drop.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Heart_Drop.prototype.constructor = BHell_Emitter_Heart_Drop;
	
    BHell_Emitter_Heart_Drop.prototype.initialize = function (x, y, params, parent, bulletList) {
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
		this.angle_change = 0; 
		this.center_x = my.player.x; 
		this.center_y = 60; 
		this.count = 24; 
		this.speed = 4; 
		this.type = 0; 
		
		if (params != null) {
			this.type = params.type || this.type;
			this.center_x = params.center_x || this.center_x;
			this.speed = params.speed || this.speed;
			this.bulletParams.sprite = params.bullet.sprite || this.bulletParams.sprite; 
			this.bulletParams.direction = params.bullet.direction || this.bulletParams.direction; 
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Heart_Drop.prototype.shoot = function () {
		this.dir = this.angle; 
		if (this.type == 0) {
			this.center_x = my.player.x; 
		} 

		for (var num = 0; num < this.count; num ++) {
			var dx = (16 * Math.sin(this.dir) * Math.sin(this.dir) * Math.sin(this.dir)); 
			var dy = (-13 * Math.cos(this.dir) + 5 * Math.cos(2 * this.dir)+2 * Math.cos(3 * this.dir) + Math.cos(4 * this.dir)); 
			
			this.aimingAngle = Math.atan2(dy, dx);
			this.bulletParams.type = "d"; 
			this.bulletParams.speed = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / 40 * this.speed; 
			var bullet = new my.BHell_Marching_Bullet(this.center_x, this.center_y, this.angle + this.aimingAngle, this.bulletParams, this.bulletList);
            
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);
			
			this.dir += 2 * Math.PI / this.count; 
		}
		
		this.angle += this.angle_change; 
    };
	
    return my;
} (BHell || {}));

//=============================================================================
// TwinsTestimony3 Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_TwinsTestimony3_p1 = my.BHell_Enemy_TwinsTestimony3_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_TwinsTestimony3_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_TwinsTestimony3_p1.prototype.constructor = BHell_Enemy_TwinsTestimony3_p1;

	BHell_Enemy_TwinsTestimony3_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 336;
        params.hitbox_h = 72;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 0;
		
		
		var emitterParams = {};
		emitterParams.period = 6; // 40; 
		emitterParams.type = "a"; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsBlack";
        emitterParams.bullet.index = 0;
		
		this.emitters.push(new my.BHell_Emitter_Stair(this.x, this.y, emitterParams, parent, my.enemyBullets));
		// this.emitters.push(new my.BHell_Emitter_Cross(this.x, this.y, emitterParams, parent, my.enemyBullets));
		// emitterParams.baseSpeed = 2.5; 
		// emitterParams.num_bullet = 10; 
		// this.emitters.push(new my.BHell_Emitter_Marching(this.x, this.y, emitterParams, parent, my.enemyBullets));

		emitterParams.bullet.sprite = "$TwinsBulletsWhite";
		emitterParams.period = 5; 
		emitterParams.bullet_count = 4; 
		emitterParams.space_angle = Math.PI/18; 
		emitterParams.center_x = 1; 
		this.emitters.push(new my.BHell_Emitter_Spin(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.center_x = Graphics.width; 
		this.emitters.push(new my.BHell_Emitter_Spin(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_TwinsTestimony3_p1.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			this.emitters[1].bullet_count = 8; 
			this.emitters[2].bullet_count = 8; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
    return my;
} (BHell || {}));

//=============================================================================
// TwinsTestimony3 Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_TwinsTestimony3_p2 = my.BHell_Enemy_TwinsTestimony3_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_TwinsTestimony3_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_TwinsTestimony3_p2.prototype.constructor = BHell_Enemy_TwinsTestimony3_p2;

	BHell_Enemy_TwinsTestimony3_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 336;
        params.hitbox_h = 82;
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
		emitterParams.bullet.sprite = "$TwinsBulletsWhite";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true; 
		my.player.currentLine = 1;
		
		emitterParams.baseSpeed = 2; 
		this.emitters.push(new my.BHell_Emitter_Opposite(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 1; 
		emitterParams.attack_between = 250; 
		emitterParams.bullet.direction = 2;
		this.emitters.push(new my.BHell_Emitter_Flower(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 150; 
		emitterParams.bullet.direction = 4;
		this.emitters.push(new my.BHell_Emitter_Heart_Drop(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
		
	BHell_Enemy_TwinsTestimony3_p2.prototype.destroy = function() {

		//adding these to the correct line allow it to transition to a different phase
		my.player.PhaseOver = true;
		my.player.nextMap = Number(21);//the 3 here is the map number change this to whatever map number u want to transition there on victory
			
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
    return my;
} (BHell || {}));

//=============================================================================
// TwinsTestimony3 Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_TwinsTestimony3_p3 = my.BHell_Enemy_TwinsTestimony3_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_TwinsTestimony3_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_TwinsTestimony3_p3.prototype.constructor = BHell_Enemy_TwinsTestimony3_p3;

	BHell_Enemy_TwinsTestimony3_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 380;
        params.hitbox_h = 72;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 2;
		
		var emitterParams = {};
		emitterParams.period = 10; 
		emitterParams.after_period = 50; 
		emitterParams.center_y = Graphics.height / 2 + 100; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsBlack";
        emitterParams.bullet.index = 0;
		
		this.emitters.push(new my.BHell_Emitter_Ring(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		// this.emitters.push(new my.BHell_Emitter_Stair(this.x, this.y, emitterParams, parent, my.enemyBullets));
		// this.emitters.push(new my.BHell_Emitter_Cross(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		
		var emitterParams = {};
		emitterParams.period = 75; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsWhite";
        emitterParams.bullet.index = 0;
		emitterParams.center_y = Graphics.height / 2 + 100; 
		
		emitterParams.speed = 2; 
		this.emitters.push(new my.BHell_Emitter_Go_Home(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 80; 
		emitterParams.aim_type = 1; 
		// this.emitters.push(new my.BHell_Emitter_Linear(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_TwinsTestimony3_p3.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			this.emitters[1].speed = 4; 
			this.emitters[1].period = 40; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
    return my;
} (BHell || {}));