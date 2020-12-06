//=============================================================================
// NonViolent Cat Enemy
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_NonViolentCat = my.BHell_Enemy_NonViolentCat = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_NonViolentCat.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_NonViolentCat.prototype.constructor = BHell_Enemy_NonViolentCat;

    BHell_Enemy_NonViolentCat.prototype.initialize = function (x, y, image, params, parent, enemyList) {
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList); 
        this.shooting = 120;
    if (params != null) {
        var tmp = my.parse(params.shooting, this.x, this.y, this.patternWidth(), this.patternHeight(), Graphics.width, Graphics.height, Graphics.width, Graphics.height);
        if (tmp > 0) {
            this.shooting = tmp;
        }
    }

    this.destX = Math.random() * Graphics.width;
    this.destY = Math.random() * 125;
    this.j = 0;
    var emitterParams = {};
        emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 6;
        emitterParams.period = 90;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),
        emitterParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
        this.mover = new my.BHell_Mover_Chase();
        this.frameCounter=0;
};

BHell_Enemy_NonViolentCat.prototype.update = function () {
    my.BHell_Sprite.prototype.update.call(this);
    this.frameCounter=(this.frame+1)%120;
    if (this.moving) {
        var dx = this.destX - this.x;
        var dy = this.destY - this.y;
        var angle = Math.atan2(dy, dx);
        if (dx > 0) {
            this.x += Math.min(dx, Math.cos(angle) * this.speed);
        }
        else if (dx < 0) {
            this.x += Math.max(dx, Math.cos(angle) * this.speed);
        }
        if (dy > 0) {
            this.y += Math.min(dy, Math.sin(angle) * this.speed);
        }
        else if (dy < 0) {
            this.y += Math.max(dy, Math.sin(angle) * this.speed);
        }
        var shootingAngle = 0;
        if (this.aim === false && this.rnd === true) {
            shootingAngle = Math.random() * 2 * Math.PI;
        }
        this.emitters.forEach(e => {
            e.move(this.x, this.y);
            e.angle = shootingAngle;
            e.update();
        });
        if (Math.abs(dx) < 2 && Math.abs(dx) < 2) {
            this.destX = Math.random() * Graphics.width;
            this.destY = Math.random() * 125;
            this.moving = false;
            var params = {};
            params.animated = true;
            params.frame = 2;
        }
    }
    else {
        this.j = (this.j + 1) % this.shooting;
        this.shoot(true);
        this.emitters.forEach(e => {
            e.update();
        });
        if (this.j === 0) {
            this.moving = true;
            this.shoot(false);
        }
    }
};
BHell_Enemy_NonViolentCat.prototype.crash = function() {
    if (this.boss !== true) {
        my.explosions.push(new my.BHell_Explosion(this.x, this.y, this.parent, my.explosions));
        this.destroy();
    }
    $gameBHellResult.enemiesCrashed++;

    return true;
};

BHell_Enemy_NonViolentCat.prototype.die = function() {
    this.destroy(); 
};

BHell_Enemy_NonViolentCat.prototype.destroy = function() {  

    if (this.parent != null) {
        this.parent.removeChild(this);
    }
    this.enemyList.splice(this.enemyList.indexOf(this), 1);
};

    return my;
} (BHell || {}));
//=============================================================================
// VagrantTest1 Pattern 1
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantTestimony1_p1 = my.BHell_Enemy_VagrantTestimony1_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony1_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony1_p1.prototype.constructor = BHell_Enemy_VagrantTestimony1_p1;

	BHell_Enemy_VagrantTestimony1_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        my.player.currentLine = 1;
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 454; // hitbox width
        params.hitbox_h = 72; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		//some variables needed to change states a counter to keep track of time, state etc
        this.frameCounter = 0;
		this.state = "started";
		this.initializeVL4P1Emitter(parent);

		my.player.can_bomb = false; 
		
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_VagrantTestimony1_p1.prototype.initializeVL4P1Emitter = function (parent) {
		var emitterParams = {};
		emitterParams.period = 1; // period for the emitter to activate
		emitterParams.aim = false; // if aims at player, need to add more stuff in BHell_Emitter_Sine for it to work 
        emitterParams.alwaysAim = false;
        emitterParams.bullet = {};
		emitterParams.bullet.direction = 6;

		//emitterParams.shoot_x = Graphics.width / 4 + Math.random() * Graphics.width / 2;
		emitterParams.bullet.speed = 4;
		emitterParams.bullet.hitboxshape ="circle";
		emitterParams.bullet.hitboxradius =10;
		emitterParams.bullet.speed = 3;//change to adjust bullet speed for next emitter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter 
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter 
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter 
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter 
		this.emitters[0].angle = Math.PI/2;//change to adjust emitter angle
		this.emitters[1].angle = Math.PI/2;//change to adjust emitter angle
		this.emitters[2].angle = Math.PI/2;//change to adjust emitter angle
		this.emitters[3].angle = Math.PI/2;//change to adjust emitter angle
		var emitterParams = {};
		emitterParams.bullet = {};
		emitterParams.bullet.direction = 2;//change to adjust bullet sprite
        emitterParams.a = 0;//a: Arc's initial angle (in radians),
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),
		emitterParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
		emitterParams.bullet.burstcount = 4;
		emitterParams.type="circle";
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
		this.angle= this.emitters[0].angle+ (Math.PI/2);
		this.tick=91;
	};
	//initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_VagrantTestimony1_p1.prototype.updateEmitters = function () {
		if(this.frameCounter%10 === 0){
			//"var x = amplitude * sin(TWO_PI * frameCount / period" reffer to this for harmonic oscillations: https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-oscillations/a/oscillation-amplitude-and-period
			var x1=100 * Math.sin(2*Math.PI * this.frameCounter / 120)+360;
			var x2=100 * Math.sin(2*Math.PI * this.frameCounter / 120)+120;
			var x3=100 * Math.sin(2*Math.PI * this.frameCounter / 120)-120;
			var x4=100 * Math.sin(2*Math.PI * this.frameCounter / 120)-360;
			var y=0;
			//reffer to the this for 3D rotations : https://math.stackexchange.com/questions/17246/is-there-a-way-to-rotate-the-graph-of-a-function
			this.emitters[0].offsetX = (x1)*Math.cos(this.angle)-(y)*Math.sin(this.angle);
			this.emitters[0].offsetY = (x1)*Math.sin(this.angle)+(y)*Math.cos(this.angle);
			this.emitters[0].shoot(this.emitters,true);
			this.emitters[1].offsetX = (x2)*Math.cos(this.angle)-(y)*Math.sin(this.angle);
			this.emitters[1].offsetY = (x2)*Math.sin(this.angle)+(y)*Math.cos(this.angle);
			this.emitters[1].shoot(this.emitters,true);
			this.emitters[2].offsetX = (x3)*Math.cos(this.angle)-(y)*Math.sin(this.angle);
			this.emitters[2].offsetY = (x3)*Math.sin(this.angle)+(y)*Math.cos(this.angle);
			this.emitters[2].shoot(this.emitters,true);
			this.emitters[3].offsetX = (x4)*Math.cos(this.angle)-(y)*Math.sin(this.angle);
			this.emitters[3].offsetY = (x4)*Math.sin(this.angle)+(y)*Math.cos(this.angle);
			this.emitters[3].shoot(this.emitters,true);
		}
		if(this.frameCounter%this.tick === 0){
			//change speed param here to adjust speed
			this.emitters[4].shoot(this.emitters,true);
			this.emitters[4].a+=0.4;
			this.emitters[4].b+=0.4;
			//revert speed param here  
		}
		if(this.frameCounter%(this.tick+4) === 0){
			//change speed param here to adjust speed
			this.emitters[5].shoot(this.emitters,true);
			this.emitters[5].a+=0.7;
			this.emitters[5].b+=0.7;
			//revert speed param here  
		}
		if(this.frameCounter%(this.tick+8) === 0){
			//change speed param here to adjust speed
			this.emitters[5].shoot(this.emitters,true);
			this.emitters[5].a-=0.7;
			this.emitters[5].b-=0.7;
			//revert speed param here  
		}
	};
	BHell_Enemy_VagrantTestimony1_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VagrantTestimony1_p1.prototype.destroy = function() {

        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(6);//the 3 here is the map number change this to whatever map number u want to transition there on victory
		
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
    };
	//main update loop
	BHell_Enemy_VagrantTestimony1_p1.prototype.update = function () {
		
		// Update line color V.L. 11/08/2020
			if (this.flash == true) {
					
				if (this.prev_hp == this.hp) {
					if (this.bombedWrong == true) {
						this.setColorTone([0, -160, -160, 1]);
					} else if(this.holdFlash <= 0){
						this.setColorTone([0, 0, 0, 1]);
					}
				} else {
					this.holdFlash = this.holdFlashTime;//change to adjust lenght of hit flash
				}
				if (this.holdFlash > 0){
					this.setColorTone([0, 0, -160, 1]);
				}
				
			}
			
			if (this.holdFlash > 0) {
				this.holdFlash--;
			}

			this.prev_hp = this.hp; 
			
		my.BHell_Sprite.prototype.update.call(this);
		my.BHell_Sprite.prototype.update.call(this);
		/* Copy and paste this code into update function for not-for-bomb lines V.L. */
		// Added bomb wrong case 
		if (my.player.false_bomb == true && this.bombedWrong == false) {
			this.bombedWrong = true; 
			this.hp = this.full_hp; 
		}
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			this.emitters[4].bulletParams.speed = 4; 
			this.emitters[5].bulletParams.speed = 4; 
			this.tick=41;
		}
		/* Copy and paste this code into update function for not-for-bomb lines V.L. */
        if (this.state !== "dying" && this.state !== "bombed") {
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
			/* Added bombed case if bomb is casted on the line by V.L. */
			case "bombed":  
				this.timer = (this.timer + 1) % 1200;
				this.shoot(false);
				
				if (this.timer > 70) {
					// Clear screen after count down V.L. 10/20/2020
					my.controller.generators = [];
					my.controller.activeGenerators = [];
					
					this.destroy();
				}
				else if (this.timer % 10 === 0) {  // Explosion on the line effect 
					my.explosions.push(new my.BHell_Explosion(Math.floor(Math.random() * this.hitboxW) + this.x - this.hitboxW / 2, Math.floor(Math.random() * this.hitboxH) + this.y - this.hitboxH / 2, this.parent, my.explosions));
				}
				break; 
			/* Added bombed case if bomb is casted on the line by V.L. */
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
		// Update the time counter and reset it every 25 seconds.
		this.frameCounter = (this.frameCounter + 1) % 1500;
	}
    return my;
} (BHell || {}));
//=============================================================================
// VagrantTest1 Pattern 2
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantTestimony1_p2 = my.BHell_Enemy_VagrantTestimony1_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony1_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony1_p2.prototype.constructor = BHell_Enemy_VagrantTestimony1_p2;

	BHell_Enemy_VagrantTestimony1_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        my.player.currentLine = 2;
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 352; // hitbox width
        params.hitbox_h = 72; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		//some variables needed to change states a counter to keep track of time, state etc
        this.frameCounter = 0;
		this.state = "started";
		this.initializeVL4P1Emitter(parent);

		// set player.can_bomb to true by V.L.
		this.p = 50; 
		this.bombedWrong = false; 
		my.player.can_bomb = false; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_VagrantTestimony1_p2.prototype.initializeVL4P1Emitter = function (parent) {
		var emitterParams = {};
		emitterParams.period = 1; // period for the emitter to activate
		emitterParams.aim = false; // if aims at player, need to add more stuff in BHell_Emitter_Sine for it to work 
        emitterParams.alwaysAim = false;
        emitterParams.bullet = {};
		emitterParams.bullet.direction = 6;
		emitterParams.bullet.speed = 3;
		emitterParams.bullet.hitboxshape ="circle";
		emitterParams.bullet.hitboxradius =10;
		emitterParams.bullet.speed = 3;//change to adjust bullet speed for next emitter

		//emitterParams.shoot_x = Graphics.width / 4 + Math.random() * Graphics.width / 2;

		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter 
		this.emitters[0].angle = Math.PI/2;//change to adjust emitter angle
		this.emitters[1].angle = Math.PI/4;//change to adjust emitter angle
		this.emitters[2].angle = 3*Math.PI/4;//change to adjust emitter angle
		this.angle1= this.emitters[0].angle+ (Math.PI/2);
		this.angle2= this.emitters[1].angle+ (Math.PI/2);
		this.angle3= this.emitters[2].angle+ (Math.PI/2);
		var emitterParams = {};
		emitterParams.bullet = {};
		emitterParams.bullet.direction = 2;//change to adjust bullet sprite
        emitterParams.a = 3;//a: Arc's initial angle (in radians),
        emitterParams.b = 2 * Math.PI+3;//b: Arc's final angle (in radians),
		emitterParams.n = 40;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
		emitterParams.bullet.speed = 2;
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		var emitterParams = {};
		emitterParams.bullet = {};
		emitterParams.bullet.direction = 2;//change to adjust bullet sprite
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter 
		this.emitters[4].angle = 0.69;//change to adjust emitter angle
		this.emitters[5].angle = (Math.PI)-0.69;//change to adjust emitter angle
		this.emitters[4].offsetX = -480;//change to adjust emitter angle
		this.emitters[5].offsetX = 480;//change to adjust emitter angle
		this.emitters[4].offsetY = 200;//change to adjust emitter angle
		this.emitters[5].offsetY = 200;//change to adjust emitter angle	
	};
	//initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_VagrantTestimony1_p2.prototype.updateEmitters = function () {
		if(this.frameCounter%10 === 0){
			//"var x = amplitude * sin(TWO_PI * frameCount / period" reffer to this for harmonic oscillations: https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-oscillations/a/oscillation-amplitude-and-period
			var x=125 * Math.sin(2*Math.PI * this.frameCounter / 120);
			var y=0;
			//reffer to the this for 3D rotations : https://math.stackexchange.com/questions/17246/is-there-a-way-to-rotate-the-graph-of-a-function
			this.emitters[0].offsetX = (x)*Math.cos(this.angle1)-(y)*Math.sin(this.angle1);//last part is just random number generator
			this.emitters[0].offsetY = (x)*Math.sin(this.angle1)+(y)*Math.cos(this.angle1);
			this.emitters[1].offsetX = (x)*Math.cos(this.angle2)-(y)*Math.sin(this.angle2)+100;//last part is just random number generator
			this.emitters[1].offsetY = (x)*Math.sin(this.angle2)+(y)*Math.cos(this.angle2);
			this.emitters[2].offsetX = (x)*Math.cos(this.angle3)-(y)*Math.sin(this.angle3)-100;//last part is just random number generator
			this.emitters[2].offsetY = (x)*Math.sin(this.angle3)+(y)*Math.cos(this.angle3);
			this.emitters[0].shoot(this.emitters,true);
			this.emitters[1].shoot(this.emitters,true);
			this.emitters[2].shoot(this.emitters,true);
			this.emitters[4].shoot(this.emitters,true);
			this.emitters[5].shoot(this.emitters,true);
		}
		if(this.frameCounter%50 === 0){
			//change speed param here to adjust speed
			this.emitters[3].shoot(this.emitters,true);
			this.emitters[3].a+=0.5;
			this.emitters[3].b+=0.5;
			//revert speed param here
		}
	};
	BHell_Enemy_VagrantTestimony1_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	//main update loop
	BHell_Enemy_VagrantTestimony1_p2.prototype.update = function () {
		// Update line color V.L. 11/08/2020
			if (this.flash == true) {
					
				if (this.prev_hp == this.hp) {
					if (this.bombedWrong == true) {
						this.setColorTone([0, -160, -160, 1]);
					} else if(this.holdFlash <= 0){
						this.setColorTone([0, 0, 0, 1]);
					}
				} else {
					this.holdFlash = this.holdFlashTime;//change to adjust lenght of hit flash
				}
				if (this.holdFlash > 0){
					this.setColorTone([0, 0, -160, 1]);
				}
				
			}
			
			if (this.holdFlash > 0) {
				this.holdFlash--;
			}

			this.prev_hp = this.hp; 
			
			my.BHell_Sprite.prototype.update.call(this);
		
			/* Copy and paste this code into update function for not-for-bomb lines V.L. */
			// Added bomb wrong case 
			if (my.player.false_bomb == true && this.bombedWrong == false) {
				this.bombedWrong = true; 
				this.hp = this.full_hp; 
			}
			
			if (this.bombedWrong == true) {
				// Write the bombedWrong penalty in here
				this.emitters[0].bulletParams.speed = 6; 
				this.emitters[1].bulletParams.speed = 6; 
				this.emitters[2].bulletParams.speed = 6; 
				this.p = 50; 
			}
			
			if (my.player.bombed == true) {
				this.destroy(); 
			}
			
			if (this.state !== "dying") {
                this.move();
            }
			/* Copy and paste this code into update function for not-for-bomb lines V.L. */
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
//=============================================================================
// VagrantTest1 Pattern 3
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantTestimony1_p3 = my.BHell_Enemy_VagrantTestimony1_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony1_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony1_p3.prototype.constructor = BHell_Enemy_VagrantTestimony1_p3;

	BHell_Enemy_VagrantTestimony1_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust Line HP
        params.speed = 4; // change to adjust speed of boss moving 
        params.hitbox_w = 314; // change to adjust hitbox width
        params.hitbox_h = 80; // change to adjust hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.bombedWrong = false;
        this.frameCounter = 0;
		this.state = "started";
		this.initializeVL4P1Emitter(parent);

		/* set player.can_bomb to true by V.L. */
		my.player.can_bomb = true; 
		/* set player.can_bomb to true by V.L. */
		
		this.p = 16; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);
	};
	BHell_Enemy_VagrantTestimony1_p3.prototype.initializeVL4P1Emitter = function (parent) {
		var emitterParamsDrunk = {};
		emitterParamsDrunk.aim= false;
		emitterParamsDrunk.alwaysAim =false;
		emitterParamsDrunk.bullet = {};
		emitterParamsDrunk.bullet.hitboxshape ="circle";
		emitterParamsDrunk.bullet.hitboxradius =10;
		emitterParamsDrunk.bullet.direction = 6;//change to adjust bullet sprite
		emitterParamsDrunk.bullet.speed = 3;//change to adjust bullet speed for next emitter
		// emitterParamsDrunk.bullettype="vagrant";
		// emitterParamsDrunk.bullet.amp=1;
		// emitterParamsDrunk.bullet.period=60;
		this.shotcount=0;
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParamsDrunk, parent, my.enemyBullets,false));
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParamsDrunk, parent, my.enemyBullets,false));
		this.emitters[0].angle = Math.PI/2;//change to adjust emitter angle
		this.emitters[1].angle = Math.PI/2;//change to adjust emitter angle
		this.angle= this.emitters[0].angle+ (Math.PI/2);//calculates normal of starting angle to finde angle of motion
		this.amp =150;//change to adjust amplitude of sine wave
		var emitterParams = {};
		emitterParams.bullet = {};
		emitterParams.bullet.direction = 2;//change to adjust bullet sprite
		emitterParams.bullet.speed = 1.5;//change to adjust bullet sprite
		emitterParams.a=0;
		emitterParams.b=2*Math.PI;
		emitterParams.n=20;
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets,false));
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets,false));
		this.emitters[2].angle=Math.PI/2;//change to adjust emitter angle
        this.emitters[2].offsetX = -150;//change to adjust horizontal offset
        this.emitters[3].angle=Math.PI/2;//change to adjust emitter angle
        this.emitters[3].offsetX= 150;//change to adjust horizontal offset
		this.angl1=-(Math.PI/20);//change to adjust angle increment
        this.angl2=(Math.PI/20);//change to adjust angle increment
		this.flip=false;
		var emitterParams = {};
		emitterParams.bullet = {};
		emitterParams.bullet.direction = 2;//change to adjust bullet sprite
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters[4].angle= 3*Math.PI/4;//change to adjust angle of straight lines
        this.emitters[4].alwaysAim = false;//change to adjust angles of straight lines
        this.emitters[4].offsetX = -140;//change to adjust horizontal offset
        this.emitters[5].angle= Math.PI/4;
        this.emitters[5].alwaysAim = false;
		this.emitters[5].offsetX= 140;//change to adjust horizontal offset
		this.emitters[6].angle= (3*Math.PI/4);//change to adjust angle of straight lines
        this.emitters[6].alwaysAim = false;//change to adjust angles of straight lines
        this.emitters[6].offsetX = -170;//change to adjust horizontal offset
        this.emitters[7].angle= (Math.PI/4);
        this.emitters[7].alwaysAim = false;
        this.emitters[7].offsetX= 170;//change to adjust horizontal offset
	};
	//initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_VagrantTestimony1_p3.prototype.updateEmitters = function () {
		if(this.frameCounter%13 === 0){
			this.emitters[0].shoot(this.emitters,true);
			this.emitters[1].shoot(this.emitters,true);
			//"var x = amplitude * sin(TWO_PI * frameCount / period" reffer to this for harmonic oscillations: https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-oscillations/a/oscillation-amplitude-and-period
			var x1=(this.amp * Math.sin(2*Math.PI * this.frameCounter / 120));
			var x2=(this.amp * Math.sin(2*Math.PI * this.frameCounter / 120)*-1);
			var y=0;
			//reffer to the this for 3D rotations : https://math.stackexchange.com/questions/17246/is-there-a-way-to-rotate-the-graph-of-a-function
			this.emitters[0].offsetX = ((x1)*Math.cos(this.angle)-(y)*Math.sin(this.angle));
			this.emitters[0].offsetY = (x1)*Math.sin(this.angle)+(y)*Math.cos(this.angle);
			
			this.emitters[1].offsetX = ((x2)*Math.cos(this.angle)-(y)*Math.sin(this.angle));
			this.emitters[1].offsetY = (x2)*Math.sin(this.angle)+(y)*Math.cos(this.angle);
		}
		if (this.frameCounter % 10 == 0){
			this.emitters[4].shoot(this.emitters,true);//static
			this.emitters[5].shoot(this.emitters,true);//static
			this.emitters[6].shoot(this.emitters,true);//static
			this.emitters[7].shoot(this.emitters,true);//static
		}
		if (this.frameCounter % 60 == 0){
			this.emitters[2].shoot(this.emitters,true);
			this.emitters[3].shoot(this.emitters,true);
			this.emitters[2].a+=2;
			this.emitters[2].b+=2;
			this.emitters[3].a-=2;
			this.emitters[3].b-=2;
            if(this.emitters[2].angle>=Math.PI||this.emitters[2].angle<=0)
            {
                this.flip=true;
            }
            if(this.flip==true)
            {
                this.angl1=-(this.angl1);
                this.angl2=-(this.angl1);
                this.flip = false;
            }
            this.emitters[2].angle+=this.angl1;
            this.emitters[3].angle+=this.angl2;
        }
	};
	BHell_Enemy_VagrantTestimony1_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	
	BHell_Enemy_VagrantTestimony1_p3.prototype.destroy = function() {

        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(6);//the 3 here is the map number change this to whatever map number u want to transition there on victory
		
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
    };
	//main update loop
	BHell_Enemy_VagrantTestimony1_p3.prototype.update = function () {
		// Update line color V.L. 11/08/2020
			if (this.flash == true) {
					
				if (this.prev_hp == this.hp) {
					if (this.bombedWrong == true) {
						this.setColorTone([0, -160, -160, 1]);
					} else if(this.holdFlash <= 0){
						this.setColorTone([0, 0, 0, 1]);
					}
				} else {
					this.holdFlash = this.holdFlashTime;//change to adjust lenght of hit flash
				}
				if (this.holdFlash > 0){
					this.setColorTone([0, 0, -160, 1]);
				}
				
			}
			
			if (this.holdFlash > 0) {
				this.holdFlash--;
			}

			this.prev_hp = this.hp; 
			
			my.BHell_Sprite.prototype.update.call(this);
		
			/* Copy and paste this code into update function for not-for-bomb lines V.L. */
			// Added bomb wrong case 			
			if (my.player.false_bomb == true && this.bombedWrong == false) {
				this.bombedWrong = true; 
				this.hp = this.full_hp; 
			}
			
			if (this.bombedWrong == true) {
				// Write the bombedWrong penalty in here
				this.p = 8; 
				this.emitters[2].bulletParams.speed = 6; 
				this.emitters[3].bulletParams.speed = 6; 
			}
			
			if (my.player.bombed == true) {
				this.die(); 
			}
			
			if (this.state !== "dying") {
                this.move();
            }
			/* Copy and paste this code into update function for not-for-bomb lines V.L. */

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
				this.timer = (this.timer + 1) % 1200;
				this.shoot(false);
				
				if (this.timer > 70) {
					// Clear screen after count down V.L. 10/20/2020
					my.controller.generators = [];
					my.controller.activeGenerators = [];
					
					this.destroy();
				}
				else if (this.timer % 10 === 0) {  // Explosion on the line effect 
					my.explosions.push(new my.BHell_Explosion(Math.floor(Math.random() * this.hitboxW) + this.x - this.hitboxW / 2, Math.floor(Math.random() * this.hitboxH) + this.y - this.hitboxH / 2, this.parent, my.explosions));
				}
				break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
		// Update the time counter and reset it every 20 seconds.
		this.frameCounter = (this.frameCounter + 1) % 1200;
	}
    return my;
} (BHell || {}));
