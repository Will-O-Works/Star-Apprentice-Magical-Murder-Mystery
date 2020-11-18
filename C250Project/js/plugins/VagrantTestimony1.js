//=============================================================================
// VagrantLineBullet
//=============================================================================
var BHell = (function (my) {
    var BHell_Vagrant_Bullet = my.BHell_Vagrant_Bullet = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Vagrant_Bullet.prototype = Object.create(my.BHell_Sprite.prototype);
    BHell_Vagrant_Bullet.prototype.constructor = BHell_Vagrant_Bullet;
    BHell_Vagrant_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
        var speed = 4;
        var sprite = my.defaultBullet;
        var index = 0;
        var direction = 2;
        var frame = 0;
        var animated = false;
        var animationSpeed = 15;
        this.hitboxshape = "dot";
        this.hitboxheight = 0;
        this.hitboxwidth = 0;
        this.hitboxradius = 0;    
        if (params != null) {
            speed = params.speed || speed;
            sprite = params.sprite || sprite;
            index = params.index || index;
            direction = params.direction || direction;
            frame = params.frame || frame;
            if (params.animated !== false) {
                animated = true;
            }
            animationSpeed = params.animation_speed || animationSpeed;
        }
        my.BHell_Sprite.prototype.initialize.call(this, sprite, index, direction, frame, animated, animationSpeed);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.rotation = angle - Math.PI / 2;
        this.x = x;
        this.y = y;
        this.z = 15;
        this.angle = angle;
        this.speed = speed;
        this.bulletList = bulletList;
        this.outsideMap = false;
        this.counter = 0
        this.aimX = 0;
        this.aimY = 0;
        this.frameCounter=0;
    };
    
    /**
     * Updates the bullet's position. If it leaves the screen, it's destroyed.
     */
    BHell_Vagrant_Bullet.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        //var y= Math.sin(this.angle) * this.speed;
        var y = Math.sin(this.angle) * this.speed;
        var x = (2 * Math.sin(2*Math.PI * this.frameCounter / 50));
        
        this.x += (x)*Math.cos(this.rotation)-(y)*Math.sin(this.rotation);
        this.y += (x)*Math.sin(this.rotation)+(y)*Math.cos(this.rotation);
        if (this.y < -this.height || this.y > Graphics.height + this.height || this.x < -this.width || this.x > Graphics.width + this.width) {
        this.outsideMap = true;}
        this.frameCounter++;
    };
    // Add effects on bullet hit by V.L.
    BHell_Vagrant_Bullet.prototype.hit_effect = function() {
        my.effects.push(new my.BHell_Hit_Effect(this.x, this.y, this.sprite, this.index, this.parent, my.effects));
    };
    BHell_Vagrant_Bullet.prototype.isOutsideMap = function () {
        return this.outsideMap;
    };
    
    /**
     * Removes the bullet from the screen and from its container.
     */
    BHell_Vagrant_Bullet.prototype.destroy = function() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.bulletList.splice(this.bulletList.indexOf(this), 1);
    };
    
    return my;
} (BHell || {}));
//=============================================================================
// VagrantLine1 Pattern 1
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantTestimony1_p1 = my.BHell_Enemy_VagrantTestimony1_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony1_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony1_p1.prototype.constructor = BHell_Enemy_VagrantTestimony1_p1;

	BHell_Enemy_VagrantTestimony1_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 386; // hitbox width
        params.hitbox_h = 75; // hitbox height
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.frameCounter =0;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        

        this.initializeVL1P1Emitter(parent);

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    }
    BHell_Enemy_VagrantTestimony1_p1.prototype.initializeVL1P1Emitter = function (parent) {

		var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player 
        emitterParams.alwaysAim = true;
        //emitterParams.angle = Math.PI/2;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 4;
        emitterParams.bullettype="vagrant";
        this.trackingCounter = 0; //adjust to change length of bullets
        
        
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        var emitterParamsT = {};
        emitterParamsT.a = 0;//a: Arc's initial angle (in radians),change to adjust
        emitterParamsT.b = 2 * Math.PI;//b: Arc's final angle (in radians),change to adjust
        emitterParamsT.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom updatechange to adjust
        emitterParamsT.bullet = {};
        emitterParamsT.bullet.direction= 2;
        emitterParamsT.bullet.speed = 4;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParamsT, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParamsT, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters[0].alwaysAim=true;
        this.emitters[1].alwaysAim=true;
        this.emitters[2].alwaysAim=true;
        this.emitters[0].offsetX = 180;
        this.emitters[1].offsetX = -180;
        this.emitters[3].offsetX = 180;
        this.emitters[4].offsetX = -180; 
        
        //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
        BHell_Enemy_VagrantTestimony1_p1.prototype.updateTracking = function () { 
            this.emitters[0].shoot(this.emitters,true);
            this.emitters[1].shoot(this.emitters,true);
            this.emitters[2].shoot(this.emitters,true);  
            this.trackingCounter += 1
        };
        BHell_Enemy_VagrantTestimony1_p1.prototype.updateCircle = function () { 
            this.emitters[3].shoot(this.emitters,true);
            this.emitters[4].shoot(this.emitters,true);  
        };
        BHell_Enemy_VagrantTestimony1_p1.prototype.die = function() {
            $gameBHellResult.score += this.killScore;
            this.state = "dying";
            this.frameCounter = 0;
            my.controller.destroyEnemyBullets();
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
			/* Copy and paste this code into update function for not-for-bomb lines V.L. */
			// Added bomb wrong case 
			if (my.player.false_bomb == true && this.bombedWrong == false) {
				this.bombedWrong = true; 
				this.hp = this.full_hp; 
			}
			
			if (this.bombedWrong == true) {
				// Write the bombedWrong penalty in here
				this.emitters[0].bulletParams.speed = 6; 
				this.emitters[1].bulletParams.speed = 8; 
				this.emitters[2].bulletParams.speed = 8; 
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
                    if(this.frameCounter%5 === 0)
                    {    
                        if (this.trackingCounter<4){this.updateTracking();}//change if comparator to adjust amout of bullets per wave
                        else if(this.frameCounter%40 === 0){this.trackingCounter=0;}//change mod to ajust gap between waves
                    }
                    if(this.frameCounter%150 === 0){
                        this.updateCircle();
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
    };
    return my;
} (BHell || {}));
//=============================================================================
// VagrantLine1 Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_VagrantTestimony1_p2 = my.BHell_Enemy_VagrantTestimony1_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony1_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony1_p2.prototype.constructor = BHell_Enemy_VagrantTestimony1_p2;

	BHell_Enemy_VagrantTestimony1_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        my.player.currentLine = 1;
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 408; // hitbox width
        params.hitbox_h = 72; // hitbox height
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.frameCounter =0;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly

        this.initializeVL1P2Emitter(parent);
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 

		this.circle_p = 150; // increase frequency for angry state
        this.radius = 200;
        this.counterclockwise = true;
        this.dir = my.parse(params.dir, this.x, this.y, this.patternWidth(), this.patternHeight(), Graphics.width, Graphics.height);
        this.mover = new my.BHell_Mover_Finisher(this.dir,this.radius, this.counterclockwise,Graphics.width / 2,Graphics.height / 2-40); // initialize the enemy's movement, check BHell_Mover
    }
    BHell_Enemy_VagrantTestimony1_p2.prototype.initializeVL1P2Emitter = function (parent) {
        var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = false; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 4;
        this.trackingCounter = 0;
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters[0].angle= (Math.PI/4)+0.3;
        this.emitters[0].offsetX = 180;
        this.emitters[1].angle= (3*Math.PI/4)-0.3;
        this.emitters[1].offsetX = -180;
        this.emitters[2].angle= Math.PI/2;
        var emitterParamsC = {};
        emitterParamsC.bullet = {};
        emitterParamsC.bullet.speed = 4;
        emitterParamsC.bullet.direction = 2;
        emitterParamsC.period = 150;
        emitterParamsC.a = 0;
        emitterParamsC.b = 2 * Math.PI;
        emitterParamsC.n = 20;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParamsC, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters[0].angle= (Math.PI/4)+0.3;
        this.emitters[0].offsetX = 180;
        this.emitters[1].angle= (3*Math.PI/4)-0.3;
        this.emitters[1].offsetX = -180;
        this.emitters[2].angle= Math.PI/2;
    };

     //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
     BHell_Enemy_VagrantTestimony1_p2.prototype.updateAngle = function () { 
        this.emitters[0].shoot(this.emitters,true);
        this.emitters[1].shoot(this.emitters,true);
        this.emitters[2].shoot(this.emitters,true);  
        this.trackingCounter += 1
    };
    BHell_Enemy_VagrantTestimony1_p2.prototype.updateCircle = function () { 
        this.emitters[3].shoot(this.emitters,true); 
    };
    BHell_Enemy_VagrantTestimony1_p2.prototype.destroy = function() {

        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(6);//the 3 here is the map number change this to whatever map number u want to transition there on victory
		
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
    };
    BHell_Enemy_VagrantTestimony1_p2.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
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
				this.circle_p = 30; 
				// this.emitters[0].bulletParams.speed = 6; 
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
                this.state = "active";
                break;
            case "active": // Shoot.
                if(this.frameCounter%8 === 0)
                {    
                    if (this.trackingCounter<3){this.updateAngle();}//change if comparator to adjust amout of bullets per wave
                    else if(this.frameCounter%40 === 0){this.trackingCounter=0;}//change mod to ajust gap between waves
                }
                if(this.frameCounter%this.circle_p === 0){

                    this.updateCircle();
                }   
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
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = (this.frameCounter + 1) % 1200;
    }
    return my;
} (BHell || {}));
//=============================================================================
// VagrantLine1 Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_VagrantTestimony1_p3 = my.BHell_Enemy_VagrantTestimony1_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony1_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony1_p3.prototype.constructor = BHell_Enemy_VagrantTestimony1_p3;

	BHell_Enemy_VagrantTestimony1_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        my.player.currentLine = 2;
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 306; // hitbox width
        params.hitbox_h = 68; // hitbox height
        params.animated = false;
        this.frameCounter =0;
        this.state = "started";
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        //this one uses the custom emitter below for the rotation
        this.initializeVL1P3Emitter(parent);
		// set player.can_bomb to true by V.L.
        my.player.can_bomb = true; 
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };

    BHell_Enemy_VagrantTestimony1_p3.prototype.initializeVL1P3Emitter = function (parent) {
		var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = false; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 4;
        emitterParams.bullet.shape = "rectangle";
        emitterParams.bullet.hitboxheight =20;
        emitterParams.bullet.hitboxwidth =20;
        this.trackingCounter = 0;

        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        var emitterParamsC = {};
        emitterParamsC.bullet = {};
        emitterParamsC.bullet.speed = 6;
        emitterParamsC.bullet.direction = 2;
        emitterParamsC.period = 150;
        emitterParamsC.a = 0;
        emitterParamsC.b = 2 * Math.PI;
        emitterParamsC.n = 20;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParamsC, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParamsC, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters[0].angle= (Math.PI/4)+0.3;
        this.emitters[0].offsetX = +180;
        this.emitters[1].angle= (3*Math.PI/4)-0.3;
        this.emitters[1].offsetX = -180;
        this.emitters[2].angle= Math.PI/2;
        this.emitters[3].offsetX = 180;
        this.emitters[4].offsetX = -180;

        //initalizeing emitter update, die and any other extra functions here
        BHell_Enemy_VagrantTestimony1_p3.prototype.updateVL1P3Emitter = function () { 
            this.Aincrement = (Math.PI/30)
            this.Adecremepent = -(Math.PI/30)
            this.emitters[0].angle += this.Adecremepent;//change the denominator to adjust rotaion
            this.emitters[1].angle += this.Aincrement;//change the denominator to adjust rotaion
            this.emitters[0].shoot(this.emitters,true);
            this.emitters[1].shoot(this.emitters,true);    
        };
        BHell_Enemy_VagrantTestimony1_p3.prototype.updateLine = function () {
            this.trackingCounter += 1
            this.emitters[2].shoot(this.emitters,true);
        }
        BHell_Enemy_VagrantTestimony1_p3.prototype.die = function() {
            $gameBHellResult.score += this.killScore;
            this.state = "dying";
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
			
			/* Copy and paste this code into update function for should-be-bombed lines by V.L. */
			if (my.player.bombed == true  && this.state !== "bombed") {
				my.controller.destroyEnemyBullets(); 
				this.timer = 0; 
				this.hp = 999;  // Give the line a large hp so itd doesn't get destroyed when bomb is used 
				this.state = "bombed";
			}
			
			if (this.state !== "dying" && this.state !== "bombed") {
				this.move();
			}
			
			/* Copy and paste this code into update function for should-be-bombed lines by V.L. */

            switch (this.state) {
                case "started":
                    if (this.mover.inPosition === true) {
                        this.state = "pattern 1";
                        this.frameCounter = 0;
                    }
                    break;
                case "pattern 1": // shoots main angle emitters every 5 frames and shoots all emitters every 150 frames
                    if (this.frameCounter%9 === 0) {
                        this.updateVL1P3Emitter();
                        if (this.trackingCounter<4){this.updateLine();this.trackingCounter++;}//change if comparator to adjust amout of bullets per wave
                    else if(this.frameCounter%30 === 0){this.trackingCounter=0;}//change mod to ajust gap between waves
                    }
                    if(this.frameCounter%150 === 0){
                        this.emitters[3].shoot(this.emitters,true);
                        this.emitters[4].shoot(this.emitters,true);
                    }   
                    break;
                case "dying": // dies.
                    if (this.frameCounter > 30) {
                        this.destroy();
                    }
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
            // Update the received damage counter for the stunned state.
            this.emitters.forEach(e => {e.update()});
            // Update the time counter and reset it every 20 seconds.
            this.frameCounter = (this.frameCounter + 1) % 1200;
        }
    };
} (BHell || {}));


//stair case bullets lol
// var BHell = (function (my) {
//     var BHell_Vagrant_Bullet = my.BHell_Vagrant_Bullet = function() {
//         this.initialize.apply(this, arguments);
//     };
//     BHell_Vagrant_Bullet.prototype = Object.create(my.BHell_Sprite.prototype);
//     BHell_Vagrant_Bullet.prototype.constructor = BHell_Vagrant_Bullet;
//     BHell_Vagrant_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
//         var speed = 4;
//         var sprite = my.defaultBullet;
//         var index = 0;
//         var direction = 2;
//         var frame = 0;
//         var animated = false;
//         var animationSpeed = 15;
//         this.hitboxshape = "dot";
//         this.hitboxheight = 0;
//         this.hitboxwidth = 0;
//         this.hitboxradius = 0;    
//         if (params != null) {
//             speed = params.speed || speed;
//             sprite = params.sprite || sprite;
//             index = params.index || index;
//             direction = params.direction || direction;
//             frame = params.frame || frame;
//             if (params.animated !== false) {
//                 animated = true;
//             }
//             animationSpeed = params.animation_speed || animationSpeed;
//         }
//         my.BHell_Sprite.prototype.initialize.call(this, sprite, index, direction, frame, animated, animationSpeed);
//         this.anchor.x = 0.5;
//         this.anchor.y = 0.5;
//         this.rotation = angle + Math.PI / 2;
//         this.x = x;
//         this.y = y;
//         this.z = 15;
//         this.angle = angle;
//         this.speed = speed;
//         this.bulletList = bulletList;
//         this.outsideMap = false;
//         this.counter = 0
//         this.aimX = 0;
//         this.aimY = 0;
//         this.frameCounter=0;
//     };
    
//     /**
//      * Updates the bullet's position. If it leaves the screen, it's destroyed.
//      */
//     BHell_Vagrant_Bullet.prototype.update = function () {
//         my.BHell_Sprite.prototype.update.call(this);
//         //var y= Math.sin(this.angle) * this.speed;
        
//         if(this.frameCounter<=10){
            
//             var x= (5 * Math.sin(2*Math.PI * this.frameCounter / 20));
//             this.x += x;
//         }
//         else{
//             var y= Math.sin(this.angle) * this.speed;
//             this.y += y;
//         }
//         if (this.y < -this.height || this.y > Graphics.height + this.height || this.x < -this.width || this.x > Graphics.width + this.width) {
//         this.outsideMap = true;}
//         this.frameCounter=(this.frameCounter+1)%20;
//     };
//     // Add effects on bullet hit by V.L.
//     BHell_Vagrant_Bullet.prototype.hit_effect = function() {
//         my.effects.push(new my.BHell_Hit_Effect(this.x, this.y, this.sprite, this.index, this.parent, my.effects));
//     };
//     BHell_Vagrant_Bullet.prototype.isOutsideMap = function () {
//         return this.outsideMap;
//     };
    
//     /**
//      * Removes the bullet from the screen and from its container.
//      */
//     BHell_Vagrant_Bullet.prototype.destroy = function() {
//         if (this.parent != null) {
//             this.parent.removeChild(this);
//         }
//         this.bulletList.splice(this.bulletList.indexOf(this), 1);
//     };
    
//     return my;
// } (BHell || {}));