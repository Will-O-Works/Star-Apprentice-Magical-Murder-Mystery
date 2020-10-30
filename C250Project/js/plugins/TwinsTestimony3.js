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
        this.bulletParams.sprite = "$TwinsBullets";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = 6; //this.params.direction;
		
		this.angle = 0; 
		this.angle_change = 0; 
		this.center_x = my.player.x; 
		this.center_y = 60; 
		this.count = 24; 
		this.speed = 4; 
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Heart_Drop.prototype.shoot = function () {
		this.dir = this.angle; 
		this.center_x = my.player.x; 

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
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 75; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBullets";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		
		emitterParams.baseSpeed = 2; 
		emitterParams.num_bullet = 10; 
		this.emitters.push(new my.BHell_Emitter_Marching(this.x, this.y, emitterParams, parent, my.enemyBullets));

		emitterParams.period = 5; 
		emitterParams.bullet_count = 3; 
		emitterParams.space_angle = Math.PI/18; 
		emitterParams.center_x = 1; 
		this.emitters.push(new my.BHell_Emitter_Spin(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.center_x = Graphics.width; 
		this.emitters.push(new my.BHell_Emitter_Spin(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	
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
		emitterParams.bullet.sprite = "$TwinsBullets";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		
		emitterParams.baseSpeed = 2; 
		this.emitters.push(new my.BHell_Emitter_Opposite(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 1; 
		emitterParams.attack_between = 250; 
		this.emitters.push(new my.BHell_Emitter_Flower(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 150; 
		this.emitters.push(new my.BHell_Emitter_Heart_Drop(this.x, this.y, emitterParams, parent, my.enemyBullets));

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
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 75; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBullets";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		
		this.emitters.push(new my.BHell_Emitter_Cross(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.speed = 1; 
		this.emitters.push(new my.BHell_Emitter_Go_Home(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 80; 
		emitterParams.aim_type = 3; 
		this.emitters.push(new my.BHell_Emitter_Linear(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	
    return my;
} (BHell || {}));