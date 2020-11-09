//=============================================================================
// SuperFanTestimony1 Pattern 3
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_SuperFanTestimony4_p1 = my.BHell_Enemy_SuperFanTestimony4_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony4_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony4_p1.prototype.constructor = BHell_Enemy_SuperFanTestimony4_p1;

	BHell_Enemy_SuperFanTestimony4_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 3; // speed of boss moving 
        params.hitbox_w = 400; // hitbox width
        params.hitbox_h = 100; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		//some variables needed to change states a counter to keep track of time, state etc
        this.frameCounter = 0;
		this.state = "started";
		this.initializeVL4P1Emitter(parent);

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_SuperFanTestimony4_p1.prototype.initializeVL4P1Emitter = function (parent) {
		var emitterParams={};
		emitterParams.aim=false;
		emitterParams.alwaysAim=false;
		emitterParams.bullet = {};
		emitterParams.bullet.speed=4;
		emitterParams.bullet.direction = 2;
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter;
	};
	//initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_SuperFanTestimony4_p1.prototype.updateEmitters = function () {
		if(this.frameCounter%13==0&&this.frameCounter>10){
			this.emitters[0].shoot(this.emitters,true);
			this.emitters[1].shoot(this.emitters,true);
		}
		if(this.frameCounter%13==0&&this.frameCounter>60){
			this.emitters[2].shoot(this.emitters,true);
			this.emitters[3].shoot(this.emitters,true);
		}
		if(this.frameCounter%20==0&&this.frameCounter>60){
			this.emitters[4].shoot(this.emitters,true);
			this.emitters[5].shoot(this.emitters,true);
		}
	};
	BHell_Enemy_SuperFanTestimony4_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	//main update loop
	BHell_Enemy_SuperFanTestimony4_p1.prototype.update = function () {
		my.BHell_Sprite.prototype.update.call(this);
		if (this.state !== "dying") {
			this.move();
		}
		switch (this.state) {
			case "started":
				if (this.mover.inPosition === true) {
					this.state = "active";
					this.frameCounter = 0;
				}
				break;
			case "active": // Shoot.
				this.updateEmitters();  
				break;
			case "dying": // die.
				this.destroy();
				break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
		// Update the time counter and reset it every 20 seconds.
		this.frameCounter = (this.frameCounter + 1) % 1200;
	}
    return my;
} (BHell || {}));