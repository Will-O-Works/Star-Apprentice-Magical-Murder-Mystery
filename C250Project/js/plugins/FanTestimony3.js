//=============================================================================
// Testimony 3 Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Fan_T3 = my.BHell_Emitter_Fan_T3 = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Fan_T3.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Fan_T3.prototype.constructor = BHell_Emitter_Fan_T3;
	
    BHell_Emitter_Fan_T3.prototype.initialize = function (x, y, params, parent, bulletList) {
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
		this.center_y = 125; 
		this.angle = 0; 
		this.baseSpeed = 5; 
		this.timer = 0; 
		
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

    BHell_Emitter_Fan_T3.prototype.shoot = function () {
		
		if (this.type == 1) {
			this.bulletParams.speed = 3; 
			
			for (var n = 0; n < this.num_bullet; n++) {
				
				this.bulletParams.phase = 4; 
				var bullet = new my.BHell_Fan_Bullet(this.x, this.center_y, - this.angle + 2 * Math.PI / this.num_bullet * n, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				this.bulletParams.phase = 5; 
				var bullet = new my.BHell_Fan_Bullet(this.x, this.center_y, this.angle + 2 * Math.PI / this.num_bullet * n, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
			}
			
		} else if (this.type == 2) {
			
			this.num_bullet = 24; 
			
			this.bulletParams.speed = 4; 
			
			if (this.timer % 2 == 1) {
				for (var n = 0; n < this.num_bullet; n++) {
					
					this.bulletParams.phase = 4; 
					
					for (var a = 2; a < 5; a ++) {
						this.bulletParams.after_speed = a/100; 
						var bullet = new my.BHell_Fan_Bullet(this.x, this.center_y, - this.angle + 2 * Math.PI / this.num_bullet * n, this.bulletParams, this.bulletList);
						this.parent.addChild(bullet);
						this.bulletList.push(bullet);
					}
					
				}
			} else {
				for (var n = 0; n < this.num_bullet; n++) {
					this.bulletParams.phase = 5; 
					
					for (var a = 2; a < 5; a ++) {
						this.bulletParams.after_speed = a/100; 
						var bullet = new my.BHell_Fan_Bullet(this.x, this.center_y, this.angle + 2 * Math.PI / this.num_bullet * n, this.bulletParams, this.bulletList);
						this.parent.addChild(bullet);
						this.bulletList.push(bullet);
					}
				}
			}
			
			this.angle = Math.PI * Math.random(); 

		} else if (this.type == 3) {
			
			if (this.timer % this.attack_between < (this.attack_between - 6)) {
				this.num_bullet = 8; 
				this.bulletParams.speed = 5; 
				
				for (var n = 0; n < this.num_bullet; n++) {
					
					this.bulletParams.phase = 6; 
					var bullet = new my.BHell_Fan_Bullet(this.x, this.center_y, - this.angle + 2 * Math.PI / this.num_bullet * n, this.bulletParams, this.bulletList);
					this.parent.addChild(bullet);
					this.bulletList.push(bullet);
					
				}
			}

		}

		this.angle += Math.PI/120; //Math.PI * Math.random(); 
		this.timer += 1; 
    };


    return my;
} (BHell || {}));


//=============================================================================
// FanTestimony3 Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_FanTestimony3_p1 = my.BHell_Enemy_FanTestimony3_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_FanTestimony3_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_FanTestimony3_p1.prototype.constructor = BHell_Enemy_FanTestimony3_p1;

	BHell_Enemy_FanTestimony3_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 30; 
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
		
		this.emitters.push(new my.BHell_Emitter_Fan_T3(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	
    return my;
} (BHell || {}));

//=============================================================================
// FanTestimony3 Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_FanTestimony3_p2 = my.BHell_Enemy_FanTestimony3_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_FanTestimony3_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_FanTestimony3_p2.prototype.constructor = BHell_Enemy_FanTestimony3_p2;

	BHell_Enemy_FanTestimony3_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 25; 
		emitterParams.attack_between = 1; 
		emitterParams.type = 2; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$FanBullets";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		
		this.emitters.push(new my.BHell_Emitter_Fan_T3(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	
    return my;
} (BHell || {}));

//=============================================================================
// FanTestimony3 Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_FanTestimony3_p3 = my.BHell_Enemy_FanTestimony3_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_FanTestimony3_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_FanTestimony3_p3.prototype.constructor = BHell_Enemy_FanTestimony3_p3;

	BHell_Enemy_FanTestimony3_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 2;  
		emitterParams.attack_between = 15; 
		emitterParams.type = 3; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$FanBullets";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		
		this.emitters.push(new my.BHell_Emitter_Fan_T3(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	
    return my;
} (BHell || {}));