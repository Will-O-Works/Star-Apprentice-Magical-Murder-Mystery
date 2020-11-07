//=============================================================================
// Testimony 2 Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Fan_T2 = my.BHell_Emitter_Fan_T2 = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Fan_T2.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Fan_T2.prototype.constructor = BHell_Emitter_Fan_T2;
	
    BHell_Emitter_Fan_T2.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = "$FanBullets";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = this.params.direction;
		
		this.bp = {}; 
		this.bp.sprite = "$FanBullets";
		this.bp.index = 0;
		this.bp.direction = 8;
		
		this.num_bullet = 16; 
		this.center_x = this.x; 
		this.center_y = this.y; 
		this.angle = 0; 
		this.baseSpeed = 5; 
		this.timer = 0; 
		this.swap = 0; 
		
		this.type = 0; 
		this.attack_between = 50; 
		
		if (params != null) {
			this.num_bullet = params.num_bullet || this.num_bullet;
			this.attack_between = params.attack_between || this.attack_between;
			this.type = params.type || this.type; 
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Fan_T2.prototype.shoot = function () {

		this.bulletParams.speed = 10; 
		this.bulletParams.phase = 2; 
		this.bulletParams.index = this.params.index;

		if (this.y < 125) {
			return; 
		}
		
		for (var n = 0; n < this.num_bullet; n++) {
			var bullet = new my.BHell_Fan_Bullet(this.x, this.y, this.angle + 2 * Math.PI / this.num_bullet * n, this.bulletParams, this.bulletList);
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);
			
		}
		
		if (this.timer % this.attack_between == 0) {
			
			if (this.type == 1) {
				for (var n = 0; n < this.num_bullet * 2; n++) {
					this.aimingAngle = this.angle + Math.PI / this.num_bullet * n;
					this.bp.speed = 3; 
					this.bp.phase = 3; 
					
					var bullet = new my.BHell_Fan_Bullet(this.x, this.y, this.aimingAngle, this.bp, this.bulletList);
					this.parent.addChild(bullet);
					this.bulletList.push(bullet);
					
				}
				
			} else if (this.type == 2) {
				this.bp.speed = 4; 
				this.bp.phase = 3; 

				var bullet = new my.BHell_Fan_Bullet(this.x, this.y, this.timer * Math.PI / 30, this.bp, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
			} else if (this.type == 3) {
				var dx = my.player.x - this.x;
				var dy = my.player.y - this.y;
				this.aimingAngle = Math.atan2(dy, dx);
			}
			
		}
		
		if (this.timer % this.attack_between < 5) {
			
			if (this.type == 3 && this.timer > this.attack_between) {
				this.bp.speed = 6; 
	
				var bullet = new my.BHell_Fan_Bullet(this.x, this.y, this.aimingAngle, this.bp, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				var bullet = new my.BHell_Fan_Bullet(this.x, this.y, this.aimingAngle + Math.PI / 6, this.bp, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				var bullet = new my.BHell_Fan_Bullet(this.x, this.y, this.aimingAngle - Math.PI / 6, this.bp, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);

			} 
		}
		
		
		if (this.type == 1) {
			this.angle += Math.PI * Math.random(); 
		} else if (this.type == 2) {
			this.angle += Math.PI / this.num_bullet / 2; 
		} else if (this.type == 3) {
			
			if (this.swap == 0) {
				if (this.angle <= Math.PI / 2) {
					this.angle += Math.PI / 2 / 5; 
				} else {
					this.swap = 1; 
				}
			} else {
				if (this.angle >= 0) {
					this.angle -= Math.PI / 2 / 5; 
				} else {
					this.swap = 0; 
				}
			}

		}

		this.timer += 1; 

    };


    return my;
} (BHell || {}));


//=============================================================================
// FanTestimony2 Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_FanTestimony2_p1 = my.BHell_Enemy_FanTestimony2_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_FanTestimony2_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_FanTestimony2_p1.prototype.constructor = BHell_Enemy_FanTestimony2_p1;

	BHell_Enemy_FanTestimony2_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 15; 
		emitterParams.attack_between = 10; 
		emitterParams.type = 1; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$FanBullets";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 0;
		
		this.emitters.push(new my.BHell_Emitter_Fan_T2(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_FanTestimony2_p1.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			//this.emitters[0].attack_between = 125; 
			this.emitters[0].attack_between = 5; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
    return my;
} (BHell || {}));

//=============================================================================
// FanTestimony2 Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_FanTestimony2_p2 = my.BHell_Enemy_FanTestimony2_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_FanTestimony2_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_FanTestimony2_p2.prototype.constructor = BHell_Enemy_FanTestimony2_p2;

	BHell_Enemy_FanTestimony2_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 30; 
		emitterParams.attack_between = 1; 
		emitterParams.type = 2; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$FanBullets";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true;
		my.player.currentLine = 1;		
		
		this.emitters.push(new my.BHell_Emitter_Fan_T2(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_FanTestimony2_p2.prototype.destroy = function() {

		//adding these to the correct line allow it to transition to a different phase
		my.player.PhaseOver = true;
		my.player.nextMap = Number(17);//the 3 here is the map number change this to whatever map number u want to transition there on victory
			
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
    return my;
} (BHell || {}));

//=============================================================================
// FanTestimony2 Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_FanTestimony2_p3 = my.BHell_Enemy_FanTestimony2_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_FanTestimony2_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_FanTestimony2_p3.prototype.constructor = BHell_Enemy_FanTestimony2_p3;

	BHell_Enemy_FanTestimony2_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 10; 
		emitterParams.attack_between = 10; 
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
		
		this.emitters.push(new my.BHell_Emitter_Fan_T2(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_FanTestimony2_p3.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			//this.emitters[0].attack_between = 125; 
			this.emitters[0].attack_between = 5; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
    return my;
} (BHell || {}));