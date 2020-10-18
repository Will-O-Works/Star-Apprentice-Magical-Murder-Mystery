var BHell = (function (my) {
	
	/** 
	 * Sin-moves bullet emitter by V.L.
	 */ 
	var BHell_Emitter_Sine = my.BHell_Emitter_Sine = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Sine.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Sine.prototype.constructor = BHell_Emitter_Sine;
	
    BHell_Emitter_Sine.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
		// initialize your own variables 
		this.angle = 0; 
		this.change = 0; 
		this.shoot_x = Math.random() * Graphics.width / 4; 
		this.count = 91; 
		this.bullet_x = 0; 
		this.variation = 1; 
		
		this.waves = []; 
		
		// or inherit prameters from the enemy class
		 if (params != null) {
            this.angle = params.angle || this.angle;
			this.shoot_x = params.shoot_x || this.shoot_x; 
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Sine.prototype.shoot = function () {
		
		if (this.count % 100 < 90 && this.count % 100 % 5 == 0) {
			for (i = 0; i < 4; i ++) {
				this.bulletParams.speed = 2 + Math.random() / 2; 
				this.bulletParams.count = this.count; 
				this.bulletParams.shoot_x = this.shoot_x + i * Graphics.width / 4; 
				var bullet = new my.BHell_Bullet(this.shoot_x, 0, Math.PI/2, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);				
			}

		} else if (this.count % 100 == 90) {
			this.shoot_x = Math.random() * Graphics.width / 4; // this.shoot_x = my.player.x; 
		}
		
		for (i = 0; i < this.bulletList.length; i ++ ) {
			this.bulletList[i].x = this.bulletList[i].shoot_x + 100 * Math.sin((this.bulletList[i].count) / 20 + this.change); 
		}
		
		this.change += 0.01; 
		this.count += 1; 
    };


    return my;
} (BHell || {}));



var BHell = (function (my) {
	
	/** 
	 * VagrantLine4 by V.L.
	 */ 

    var BHell_Enemy_VagrantLine4 = my.BHell_Enemy_VagrantLine4 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantLine4.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine4.prototype.constructor = BHell_Enemy_VagrantLine4;

	BHell_Enemy_VagrantLine4.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 400; // hitbox width
        params.hitbox_h = 100; // hitbox height
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 

		var emitterParams = {};
		emitterParams.period = 1; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player, need to add more stuff in BHell_Emitter_Sine for it to work 
        emitterParams.alwaysAim = true;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;

		//emitterParams.shoot_x = Graphics.width / 4 + Math.random() * Graphics.width / 2; 
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
		this.emitters.push(new my.BHell_Emitter_Sine(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
		
		this.j = 0; 
		this.can_die = false; 
    };

    return my;
} (BHell || {}));

