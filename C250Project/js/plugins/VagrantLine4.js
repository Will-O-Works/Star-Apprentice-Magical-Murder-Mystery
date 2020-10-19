//drunk
var BHell = (function (my) {
	
	/** 
	 * Sin-moves bullet emitter by V.L.
	 */ 
	var BHell_Emitter_Sine = my.BHell_Emitter_Sine = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Sine.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Sine.prototype.constructor = BHell_Emitter_Sine;
	
    BHell_Emitter_Sine.prototype.initialize = function (x, y, params, parent, bulletList,p2) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
		this.params = params;
		this.p2 = p2;
		console.log(p2);
		// initialize your own variables 
		this.angle = 0; 
		this.change = 0; 
		this.shoot_x = Math.random(); 
		this.count = 91; 
		this.bullet_x = 0; 
		this.variation = 1; 
		this.angle =Math.PI/2;
		this.aimingAngle=true;
		this.aim =true;
		this.aimX=0;
		this.aimY=0;		
		
		this.waves = []; 
		
		// or inherit prameters from the enemy class
		 if (params != null) {
            this.angle = params.angle || this.angle;
			this.shoot_x = params.shoot_x || this.shoot_x; 
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
         // number of emitters
    };

    BHell_Emitter_Sine.prototype.shoot = function () {
		if (this.count % 100 < 80 && this.count%10===0) {//first condition change to adjust lengeth of wave second changes the density YA
			if(this.p2==true) {
				//added an if before this for loop to check how many emitters we want YA
				for (i = 1; i <= 3; i ++) {
					this.bulletParams.speed = 2 + Math.random() / 2; 
					this.bulletParams.count = this.count; 
					this.bulletParams.shoot_x = this.shoot_x + i * Graphics.width / 4; //change to adjust x axis position of emmiter YA
					var bullet = new my.BHell_Bullet(this.shoot_x, 100, Math.PI/2, this.bulletParams, this.bulletList);//calls new bullet
					this.parent.addChild(bullet);
					this.bulletList.push(bullet);				
				}				
			}
			//if its only one then it dosnt use a loop YA
			else {
				this.bulletParams.speed = 2 + Math.random() / 2; 
				this.bulletParams.count = this.count; 
				this.bulletParams.shoot_x = this.x-this.offsetX; //switched this.shoot_x for this.x to make it centered and the offset x adusts the positionYA
				var bullet = new my.BHell_Bullet(this.x, this.y, Math.PI/2, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);				
			}
		} else if (this.count % 100 == 90) {
			this.shoot_x = Math.random(); // this.shoot_x = my.player.x; 
		}
		for (i = 0; i < this.bulletList.length; i ++ ) {
			this.bulletList[i].x = this.bulletList[i].shoot_x + 100 * Math.sin((this.bulletList[i].count) / 20 + this.change); 
		}
		this.change += 0.01; 
		this.count += 1; 
    };
    return my;
} (BHell || {}));


//=============================================================================
// VagrantLine4 Phase 1.js
//=============================================================================
var BHell = (function (my) {
	
	/** 
	 * VagrantLine4 by V.L.
	 */ 

    var BHell_Enemy_VagrantLine4_p1 = my.BHell_Enemy_VagrantLine4_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantLine4_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine4_p1.prototype.constructor = BHell_Enemy_VagrantLine4_p1;

	BHell_Enemy_VagrantLine4_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 400; // hitbox width
        params.hitbox_h = 100; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		//some variables needed to change states of the boss j is a counter to keep track of time, state and recived damage are obvious
        this.frameCounter = 0;
		this.state = "started";
		this.initializeVL4P1Emitter(parent);

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_VagrantLine4_p1.prototype.initializeVL4P1Emitter = function (parent) {
		var emitterParams = {};
		emitterParams.period = 1; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player, need to add more stuff in BHell_Emitter_Sine for it to work 
        emitterParams.alwaysAim = true;
        emitterParams.bullet = {};
		emitterParams.bullet.direction = 4;

		//emitterParams.shoot_x = Graphics.width / 4 + Math.random() * Graphics.width / 2;

		this.emitters.push(new my.BHell_Emitter_Sine(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter 
		emitterParams.bullet.speed = 4;
        emitterParams.period = 150;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),
        emitterParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
		this.emitters.alwaysAim = true; 
	};
	//initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_VagrantLine4_p1.prototype.updateEmitters = function () { 
		this.emitters[0].shoot(this.emitters,true); 
	};
	BHell_Enemy_VagrantLine4_p1.prototype.updateCircle = function () { 
		this.emitters[1].shoot(this.emitters,true); 
	};
	BHell_Enemy_VagrantLine4_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	//main update loop
	BHell_Enemy_VagrantLine4_p1.prototype.update = function () {
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
				// if(this.frameCounter%150 === 0)
				// {    
				// 	this.x=125;
				// 	this.y=125;
				// }
				// else
				// {
					
				// }
				this.updateEmitters(); 
				if(this.frameCounter%151 === 0){
					//change speed param here to adjust speed
					this.updateCircle();
					//revert speed param here
				}   
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

//=============================================================================
// VagrantLine4 Phase 2.js
//=============================================================================
var BHell = (function (my) {
	
	/** 
	 * VagrantLine4 by V.L.
	 */ 

    var BHell_Enemy_VagrantLine4_p2 = my.BHell_Enemy_VagrantLine4_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantLine4_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine4_p2.prototype.constructor = BHell_Enemy_VagrantLine4_p2;

	BHell_Enemy_VagrantLine4_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
		this.p2 = true; //honestly this is really what makes this pattern if u switch this to false it turns into pattern 1 cause the pattern is implemented on the emitter level, im sorry i was strapped for time YA
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 400; // hitbox width
        params.hitbox_h = 100; // hitbox heights
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
		emitterParams.n = 3;

		//emitterParams.shoot_x = Graphics.width / 4 + Math.random() * Graphics.width / 2; 
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
		this.emitters.push(new my.BHell_Emitter_Sine(this.x, this.y, emitterParams, parent, my.enemyBullets,this.p2)); // initialize the emmiter, check BHell_Emmiter 
		this.emitters.alwaysAim = true; 

		this.can_die = false;
    };

    return my;
} (BHell || {}));

