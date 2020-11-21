
//=============================================================================
// Detective Testimony Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Detective = my.BHell_Emitter_Detective = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Detective.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Detective.prototype.constructor = BHell_Emitter_Detective;
	
    BHell_Emitter_Detective.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = "$Bullets";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = this.params.direction;
		this.bulletParams.phase = 1; 
		
		this.num_bullet = 12; 
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
    };

    BHell_Emitter_Detective.prototype.shoot = function () {
		
		if (this.type == 1) {
			
			for (var n = 0; n < this.num_bullet; n++) {
				this.aimingAngle = this.angle + 2 * Math.PI / this.num_bullet * n;
				
				this.bulletParams.speed = 2; 
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				this.bulletParams.speed = 2.5; 
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				this.bulletParams.speed = 3; 
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
			}
			
			this.angle += Math.PI / (this.num_bullet + 1); 
			
		} else if (this.type == 2) {
			
			for (var j = 0; j < 5; j ++) {
				
				var dx = my.player.x - this.x;
				var dy = my.player.y - this.y;
				this.aimingAngle = Math.atan2(dy, dx);
				
				this.bp = {}; 
				this.bp.speed = this.baseSpeed + j; 
	
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bp, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle + Math.PI / 6, this.bp, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle - Math.PI / 6, this.bp, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);

			} 
			
		} else if (this.type == 3) {
			
			this.num_bullet = 4; 
			
			for (var n = 0; n < this.num_bullet; n++) {
				this.aimingAngle = this.angle + 2 * Math.PI / this.num_bullet * n;
				
				this.bp = {}; 
				this.bp.speed = 2; 
				
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bp, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				this.bp.speed = 2.5; 
				
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bp, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				this.bp.speed = 3; 
				
				var bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bp, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
			}
			
			this.angle += Math.PI / 23; 
			
		}

    };


    return my;
} (BHell || {}));


//=============================================================================
// FanTestimony1 Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_Detective_p1 = my.BHell_Enemy_Detective_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Detective_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Detective_p1.prototype.constructor = BHell_Enemy_Detective_p1;

	BHell_Enemy_Detective_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 50;
        params.speed = 25;
        params.hitbox_w = 266;
        params.hitbox_h = 84;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 60; 
		emitterParams.type = 1; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 0;
		
		this.emitters.push(new my.BHell_Emitter_Detective(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_Detective_p1.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			//this.emitters[0].attack_between = 125; 
			this.emitters[0].period = 20; 
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

    var BHell_Enemy_Detective_p2 = my.BHell_Enemy_Detective_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Detective_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Detective_p2.prototype.constructor = BHell_Enemy_Detective_p2;

	BHell_Enemy_Detective_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 50;
        params.speed = 25;
        params.hitbox_w = 437;
        params.hitbox_h = 82;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Bounce(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 75; 
		emitterParams.type = 2; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 1;
		
		this.emitters.push(new my.BHell_Emitter_Detective(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_Detective_p2.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			this.emitters[0].period = 50; 
			this.emitters[0].baseSpeed = 5; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
    return my;
} (BHell || {}));

//=============================================================================
// DetectiveTestimony1 Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_Detective_p3 = my.BHell_Enemy_Detective_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Detective_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Detective_p3.prototype.constructor = BHell_Enemy_Detective_p3;

	BHell_Enemy_Detective_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 50;
        params.speed = 25;
        params.hitbox_w = 482;
        params.hitbox_h = 81;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 10; 
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
		
		this.emitters.push(new my.BHell_Emitter_Detective(this.x, this.y, emitterParams, parent, my.enemyBullets));


    };
	
    return my;
} (BHell || {}));