var BHell = (function (my) {
	
	/** 
	 * Homing bullet emitter by V.L.
	 */ 
	var BHell_Emitter_Home = my.BHell_Emitter_Home = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Home.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Home.prototype.constructor = BHell_Emitter_Home;
	
    BHell_Emitter_Home.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = this.params.sprite;
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = this.params.direction;
		//this.bulletParams.speed = this.params.speed; 
		
		// initialize your own variables 
		this.angle = 0; 
		this.change = 0; 
		this.count = 20; 
		this.range = 200; 
		this.swap = 0; 
		this.center_x = this.x; 
		this.center_y = this.y; 
		this.timer = 0; 
		// or inherit prameters from the enemy class
		 if (params != null) {
            this.angle = params.angle || this.angle;
			this.center_x = params.center_x || this.x; 
			this.center_y = params.center_y || this.y; 
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
		
		var num;
        for (num = 0; num < this.count; num++) {
            var bullet = new my.BHell_Bullet((this.change) * Math.cos(this.angle + 2 * Math.PI / this.count * num) + this.center_x, (this.change) * Math.sin(this.angle + 2 * Math.PI / this.count * num) + this.center_y, 2 * Math.PI / this.count * num, this.bulletParams, this.bulletList);
            this.parent.addChild(bullet);
			this.bulletList.push(bullet);
        }
    };

    BHell_Emitter_Home.prototype.shoot = function () {

		this.timer += 1; 
		
		if (this.timer > 10) {
			this.center_x = this.x; 
			this.center_y = this.y; 

			var num;
			for (num = 0; num < this.count; num++) {

				var bullet = new my.BHell_Bullet((this.change) * Math.cos(this.angle + 2 * Math.PI / this.count * num) + this.center_x, (this.change) * Math.sin(this.angle + 2 * Math.PI / this.count * num) + this.center_y, 2 * Math.PI / this.count * num, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
			}
			
			this.angle += 1;
			 if (this.angle >= Math.PI * 2) {
				this.angle -= Math.PI * 2;
			}
			if (this.change >= this.range) {
				this.swap = 1; 
			}
			
			if (this.change <= 0) {
				this.swap = 0; 
			}
			
			if (this.swap == 1) {
				this.change -= 3; 
			} else {
				this.change += 3; 
			}
		}
		
    };

    return my;
} (BHell || {}));

var BHell = (function (my) {
	
	/** 
	 * VagrantLine6 by V.L.
	 */ 

    var BHell_Enemy_VagrantLine6 = my.BHell_Enemy_VagrantLine6 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantLine6.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine6.prototype.constructor = BHell_Enemy_VagrantLine6;

	BHell_Enemy_VagrantLine6.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 50;
        params.speed = 250; // speed of boss moving 
        params.hitbox_w = 500; // hitbox width
        params.hitbox_h = 100; // hitbox height
        params.animated = false; // if true, you need 3 frames of animation for the boss
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player, need to add more stuff in BHell_Emitter_VagrantLine6 for it to work 
        emitterParams.alwaysAim = true;
		emitterParams.center_x = this.x; 
		emitterParams.center_y = this.y; 
		
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
		this.emitters.push(new my.BHell_Emitter_Home(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
    };

    return my;
} (BHell || {}));

