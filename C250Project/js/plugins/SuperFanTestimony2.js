
//=============================================================================
// Shape Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Shape = my.BHell_Emitter_Shape = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Shape.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Shape.prototype.constructor = BHell_Emitter_Shape;
	
    BHell_Emitter_Shape.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
		this.bulletParams.speed = 0; 
        this.bulletParams.index = this.params.index;
		
		this.speed = 1; 
		this.add = 0; 
		this.angle = 0; 
		this.type = 0; 
		
		this.count = 0; 
		this.first_count = 30; 
		this.second_count = 75; 
		this.final_count = 200; 
		
		this.center_x = Graphics.width / 2; 
		this.center_y = Graphics.height / 2; 
		
		if (params != null) {
			this.angle = params.angle || this.angle;
			this.speed = params.speed || this.speed;
			this.type = params.type || this.type;
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Shape.prototype.shoot = function () {
		
		this.center_x += Math.cos(this.angle) * (this.speed + this.add);
		this.center_y += Math.sin(this.angle) * (this.speed + this.add);
		
		if (this.type == 1) {
			this.bulletParams.sprite = "$TwinsBulletsBlack";
			this.bulletParams.direction = 2; // this.params.direction;
		} else {
			this.bulletParams.sprite = "$TwinsBulletsWhite";
			this.bulletParams.direction = 6; // this.params.direction;
		}
		
		if (this.count % 5 == 0) {
			this.bulletParams.type = "s"; 
			this.bulletParams.timer = this.type; 
			var bullet = new my.BHell_Marching_Bullet(this.center_x, this.center_y, this.angle, this.bulletParams, this.bulletList);
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);
			
			if (this.count == this.first_count) {
				this.add = 0; 
				
				if (this.type == 1) {
					this.angle -= Math.PI / 2; 
				} else {
					this.angle += Math.PI / 2; 
				}
				
			} else if (this.count == this.second_count) {
				this.add = 0; 
				
				if (this.type == 1) {
					this.angle -= Math.PI / 2; 
				} else {
					this.angle += Math.PI / 2; 
				}
			} else if (this.count == this.final_count) {
				this.add = 0; 
				
				if (this.type == 1) {
					this.type = 0; 
					this.angle -= Math.PI / 2; 
					this.center_x = Graphics.width / 2; 
					this.center_y = Graphics.height / 2; 
				} else {
					this.type = 1; 
					this.angle += Math.PI / 2; 
					this.center_x = Graphics.width / 2; 
					this.center_y = Graphics.height / 2; 
				}
				
				this.count = -1; 
			}
		}

		this.add += 0.2; 
		this.count += 1; 

    };

    return my;
} (BHell || {}));



//=============================================================================
// SuperFanTestimony2 Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_SuperFanTestimony2_p1 = my.BHell_Enemy_SuperFanTestimony2_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony2_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony2_p1.prototype.constructor = BHell_Enemy_SuperFanTestimony2_p1;

	BHell_Enemy_SuperFanTestimony2_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 150;
        params.speed = 25;
        params.hitbox_w = 324;
        params.hitbox_h = 72;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		my.player.bombs = 0; 
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 10; 
		emitterParams.after_period = 50; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsWhite";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 0;
		
		this.emitters.push(new my.BHell_Emitter_Ring(this.x, this.y, emitterParams, parent, my.enemyBullets));

		emitterParams.center_x = Graphics.width / 2; 
		emitterParams.center_y = 125; 
		emitterParams.period = 1; 
		emitterParams.bullet_count = 4; 
		// this.emitters.push(new my.BHell_Emitter_Spin(this.x, this.y, emitterParams, parent, my.enemyBullets));

		emitterParams.speed = 1; 
		this.emitters.push(new my.BHell_Emitter_Spin(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 50; 
		emitterParams.center_y = 125; 
		emitterParams.count = 28; 
		emitterParams.speed = 4; 
		this.emitters.push(new my.BHell_Emitter_Heart(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_SuperFanTestimony2_p1.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			//this.emitters[0].attack_between = 125; 
			// this.emitters[0].attack_between = 5; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
    return my;
} (BHell || {}));

//=============================================================================
// SuperFanTestimony2 Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_SuperFanTestimony2_p2 = my.BHell_Enemy_SuperFanTestimony2_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony2_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony2_p2.prototype.constructor = BHell_Enemy_SuperFanTestimony2_p2;

	BHell_Enemy_SuperFanTestimony2_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 150;
        params.speed = 125;
        params.hitbox_w = 506;
        params.hitbox_h = 82;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		my.player.bombs = 0; 
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
		my.player.currentLine = 1;
		this.emitters.push(new my.BHell_Emitter_Updown(this.x, this.y, emitterParams, parent, my.enemyBullets));

		
		emitterParams.period = 20; 
		this.emitters.push(new my.BHell_Emitter_Go_Player(this.x, this.y, emitterParams, parent, my.enemyBullets));
		

    };
	
	BHell_Enemy_SuperFanTestimony2_p2.prototype.destroy = function() {

		//adding these to the correct line allow it to transition to a different phase
		my.player.PhaseOver = true;
		my.player.nextMap = Number(32);//the 3 here is the map number change this to whatever map number u want to transition there on victory
			
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
    return my;
} (BHell || {}));

//=============================================================================
// SuperFanTestimony2 Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_SuperFanTestimony2_p3 = my.BHell_Enemy_SuperFanTestimony2_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony2_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony2_p3.prototype.constructor = BHell_Enemy_SuperFanTestimony2_p3;

	BHell_Enemy_SuperFanTestimony2_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 150;
        params.speed = 25;
        params.hitbox_w = 296;
        params.hitbox_h = 72;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		my.player.bombs = 0; 
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);
		this.count = 0; 

		var emitterParams = {};
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
		
		for (var j = 0; j < 5; j ++) {
			emitterParams.period = 1; 
			emitterParams.angle = j * 2 * Math.PI / 5;
			emitterParams.type = 0; 
			this.emitters.push(new my.BHell_Emitter_Shape(this.x, this.y, emitterParams, parent, my.enemyBullets));
		}
		
		emitterParams.period = 1; 
		emitterParams.attack_between = 200; 
		this.emitters.push(new my.BHell_Emitter_Flower(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 150; 
		emitterParams.type = 1; 
		emitterParams.center_x = 110; 
		emitterParams.speed = 6; 
		this.emitters.push(new my.BHell_Emitter_Heart_Drop(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 150; 
		emitterParams.type = 1; 
		emitterParams.center_x = Graphics.width - 110; 
		emitterParams.speed = 6; 
		this.emitters.push(new my.BHell_Emitter_Heart_Drop(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_SuperFanTestimony2_p3.prototype.destroy = function() {

		//adding these to the correct line allow it to transition to a different phase
		my.player.bombed = true;
		my.player.PhaseOver = true;
		my.player.nextMap = Number(32);//the 3 here is the map number change this to whatever map number u want to transition there on victory
			
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
    return my;
} (BHell || {}));