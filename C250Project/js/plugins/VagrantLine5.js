//=============================================================================
// Circle Emmiter
//=============================================================================
var BHell = (function (my) {
	var BHell_Emitter_Circle = my.BHell_Emitter_Circle = function () {
        this.initialize.apply(this, arguments);
    };

    BHell_Emitter_Circle.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Circle.prototype.constructor = BHell_Emitter_Circle;


    BHell_Emitter_Circle.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList); 
		
        this.n = 360;
        this.dutyCycle = 0.25;
        this.pulses = 16;
        this.invert = false;

        this.aim = true;
        this.alwaysAim = true;
        this.aimX = 0;
        this.aimY = 0;
		this.after_period = 40; 

        this.aimingAngle = 0;
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
		this.round = 0; 

        if (params != null) {
            this.n = params.n || this.n;
            this.dutyCycle = params.duty_cycle || this.dutyCycle;
            this.pulses = params.pulses || this.pulses;
            this.invert = params.invert || this.invert;
            this.aim = params.aim || this.aim;
            this.alwaysAim = params.always_aim || this.alwaysAim;
            this.aimX = params.aim_x || this.aimX;
            this.aimY = params.aim_y || this.aimY;
			this.after_period = params.after_period || this.after_period;
        }
    };

    BHell_Emitter_Circle.prototype.shoot = function () {
        var pulseWidth = Math.round(this.n / this.pulses);
        var dutyCount = Math.round(this.dutyCycle * pulseWidth);

        for (var k = 0; k < this.n; k++) {

            if (((k % pulseWidth) < dutyCount) ^ this.invert) {
                var bullet;
                if (this.aim) {
                    if (this.alwaysAim || this.oldShooting === false) {
                        var dx = my.player.x - this.x + this.aimX;
                        var dy = my.player.y - this.y + this.aimY;
                        this.aimingAngle = Math.atan2(dy, dx);
                    }

                    bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle - Math.PI + 2 * Math.PI / this.n * (k - dutyCount / 2), this.bulletParams, this.bulletList);
                }
                else {
                    bullet = new my.BHell_Bullet(this.x, this.y, 2 * Math.PI / this.n * (k - dutyCount / 2), this.bulletParams, this.bulletList);
                }

                this.parent.addChild(bullet);
                this.bulletList.push(bullet);
            }
        }
		
		this.round ++; 
		
		if (this.round == 2) {
			this.period = this.after_period; 
		}
		
    };
	
    return my;
} (BHell || {}));
//=============================================================================
// Suicide Cat Enemy
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_SuicideCat = my.BHell_Enemy_SuicideCat = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuicideCat.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuicideCat.prototype.constructor = BHell_Enemy_SuicideCat;

    BHell_Enemy_SuicideCat.prototype.initialize = function (x, y, image, params, parent, enemyList) {
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
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
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
    }; 

    BHell_Enemy_SuicideCat.prototype.crash = function() {
        if (this.boss !== true) {
            my.explosions.push(new my.BHell_Explosion(this.x, this.y, this.parent, my.explosions));
            this.destroy();
        }
        $gameBHellResult.enemiesCrashed++;

        return true;
    };

    BHell_Enemy_SuicideCat.prototype.die = function() {
        this.dying = true; 
    };

    BHell_Enemy_SuicideCat.prototype.destroy = function() {  // The cat dies quietly without destroying the bullets on screen by V.L. 10/11/2020

        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
    };
    return my;
} (BHell || {}));
//=============================================================================
// Gunner Cat Enemy
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_GunnerCat = my.BHell_Enemy_GunnerCat = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_GunnerCat.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_GunnerCat.prototype.constructor = BHell_Enemy_GunnerCat;

    BHell_Enemy_GunnerCat.prototype.initialize = function (x, y, image, params, parent, enemyList) {
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        var emitterParams = {};
        emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 10;
        emitterParams.period = 20;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),
        emitterParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
        emitterParams.aim = false;
        this.speed=10;
        this.radius = 200;
        this.counterclockwise = true;
        this.dir = my.parse(params.dir, this.x, this.y, this.patternWidth(), this.patternHeight(), Graphics.width, Graphics.height);
        this.mover = new my.BHell_Mover_Finisher(this.dir,this.radius, this.counterclockwise,Graphics.width / 2,200);
        this.trackingCounter = 0;
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters[0].angle= (Math.PI/4)+0.3;
        this.emitters[1].angle= (3*Math.PI/4)-0.3;
        this.emitters[2].angle= Math.PI/2;
    }; 

    BHell_Enemy_GunnerCat.prototype.crash = function() {
        if (this.boss !== true) {
            my.explosions.push(new my.BHell_Explosion(this.x, this.y, this.parent, my.explosions));
            this.destroy();
        }
        $gameBHellResult.enemiesCrashed++;

        return true;
    };

    BHell_Enemy_GunnerCat.prototype.die = function() {
        this.dying = true; 
    };

    BHell_Enemy_GunnerCat.prototype.destroy = function() {  // The cat dies quietly without destroying the bullets on screen by V.L. 10/11/2020

        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
    };
    
    return my;
} (BHell || {}));
//=============================================================================
// Swirler Cat Enemy
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_SwirlerCat = my.BHell_Enemy_SwirlerCat = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SwirlerCat.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SwirlerCat.prototype.constructor = BHell_Enemy_SwirlerCat;

    BHell_Enemy_SwirlerCat.prototype.initialize = function (x, y, image, params, parent, enemyList) {
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        var emitterParams = {};
        emitterParams.period = 20; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 10;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),
        emitterParams.n = 5;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
        emitterParams.aim = false;
        this.rotatingAngle=Math.PI/60;
        this.frameCounter=0;
        if (params != null) {
            this.rotatingAngle = params.rotatingAngle || this.rotatingAngle;
        }
        this.speed=5;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);
        this.trackingCounter = 0;
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        emitterParams.angle=(Math.PI)
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
    }; 
    BHell_Enemy_SwirlerCat.prototype.shoot = function () { 
        console.log("rotating before shooting");
        this.frameCounter++;
        if(this.frameCounter%8==0)
        {
            this.emitters[0].angle+= this.rotatingAngle;
            this.emitters[1].angle+= this.rotatingAngle;
            this.emitters[0].shoot(this.emitters,true);
            this.emitters[1].shoot(this.emitters,true);
        }
  
    };

    BHell_Enemy_SwirlerCat.prototype.crash = function() {
        if (this.boss !== true) {
            my.explosions.push(new my.BHell_Explosion(this.x, this.y, this.parent, my.explosions));
            this.destroy();
        }
        $gameBHellResult.enemiesCrashed++;
        return true;
    };

    BHell_Enemy_SwirlerCat.prototype.die = function() {
        this.dying = true; 
    };

    BHell_Enemy_SwirlerCat.prototype.destroy = function() {  // The cat dies quietly without destroying the bullets on screen by V.L. 10/11/2020
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
    };
    
    return my;
} (BHell || {}));

















//=============================================================================
// VagrantLine5 Phase 1.js
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantLine5_p1 = my.BHell_Enemy_VagrantLine5_p1 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VagrantLine5_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine5_p1.prototype.constructor = BHell_Enemy_VagrantLine5_p1;

	BHell_Enemy_VagrantLine5_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4;
        params.hitbox_w = 550;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);
        //some variables needed to change states of the boss j is a counter to keep track of time, state and recived damage are obvious
        this.frameCounter = 0;
		this.state = "started";
        this.initializeVL5P1Emitter(parent);
        this.initializeCat(parent);
    };
    BHell_Enemy_VagrantLine5_p1.prototype.initializeVL5P1Emitter = function (parent) {
		var emitterParams = {};
		emitterParams.period = 75; 
		emitterParams.after_period = 50; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true; 
		this.emitters.push(new my.BHell_Emitter_Circle(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
    BHell_Enemy_VagrantLine5_p1.prototype.initializeCat = function () {
        this.updateCatCounter = 0;
        this.spawnNumber=2;
        this.spawnCounter = 0;
    };
    BHell_Enemy_VagrantLine5_p1.prototype.updateCat = function() {
        // Spawn a suicide cat enemy every 3 seconds.
        var image = {"characterName":"$Cat","direction":2,"pattern":2,"characterIndex":2};//cat sprite is messed up fix later
        var params = {};
        params.animated = false;
        params.aim = false;
        params.speed =1;
        params.hp = 5;
        params.bullet = {};
        this.updateCatCounter = this.updateCatCounter + 1; //change to adjust cat spawn rate 
        /////lots of shenanigans
        if ((this.updateCatCounter) % 10 == 0 && this.spawnNumber-1>=this.spawnCounter) {
            my.controller.enemies.push(new my.BHell_Enemy_SuicideCat(this.x + 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            my.controller.enemies.push(new my.BHell_Enemy_SuicideCat(this.x - 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
                my.controller.enemies[1].destroy();
            }
        }
        if ((this.updateCatCounter) % 500 == 0 && this.spawnNumber>=this.spawnCounter) {
            my.controller.enemies.push(new my.BHell_Enemy_SuicideCat(this.x + 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            my.controller.enemies.push(new my.BHell_Enemy_SuicideCat(this.x - 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
                my.controller.enemies[1].destroy();
            }
        }
    };
    //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_VagrantLine5_p1.prototype.updateVL5P1 = function () { 
        if(this.frameCounter%120===0)
        {
            this.emitters[0].shoot(this.emitters,true);
        }
        this.updateCat();
    };
	BHell_Enemy_VagrantLine5_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
    BHell_Enemy_VagrantLine5_p1.prototype.destroy = function() {
        my.player.can_bomb = false; 
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
        //adding these to the correct line allow it to transition to a different phase just call it before in or right before the destroy fucntion
        my.player.PhaseOver = true;
        my.player.nextMap = Number(5);//the 3 here is the map number change this to whatever map number u want to transition there on victory
    };

    //main update loop
    BHell_Enemy_VagrantLine5_p1.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
		
		/* Copy and paste this code into update function for not-for-bomb lines V.L. */
			// Added bomb wrong case 
			if (my.player.false_bomb == true && this.bombedWrong == false) {
				this.bombedWrong = true; 
				this.hp = this.full_hp; 
			}
			
			if (this.bombedWrong == true) {
				// Write the bombedWrong penalty in here

			}
			
			if (my.player.bombed == true) {
				this.destroy(); 
			}
		/* Copy and paste this code into update function for not-for-bomb lines V.L. */
		
        if (this.state !== "dying") {
            this.move();
        };
        switch (this.state) {
            case "started":
                if (this.mover.inPosition === true) {
                    this.state = "pattern 1";
                    this.frameCounter = 0;
                }
                break;
            case "pattern 1": // shoots main angle emitters every 5 frames and shoots all emitters every 150 frames
                this.updateVL5P1();   
                 
                break;
            case "dying": // dies.
                this.destroy();
                break;
        }; 
        // Update the received damage counter for the stunned state.
        this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = (this.frameCounter + 1) % 1200;
    }
    return my;
} (BHell || {}));
//=============================================================================
// VagrantLine5 Phase 2.js
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantLine5_p2 = my.BHell_Enemy_VagrantLine5_p2 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VagrantLine5_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine5_p2.prototype.constructor = BHell_Enemy_VagrantLine5_p2;

	BHell_Enemy_VagrantLine5_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4;
        params.hitbox_w = 550;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);
        //some variables needed to change states of the boss j is a counter to keep track of time, state and recived damage are obvious
        this.frameCounter = 0;
		this.state = "started";
        this.initializeVL5P1Emitter(parent);
        this.initializeCat(parent);
    };
    BHell_Enemy_VagrantLine5_p2.prototype.initializeVL5P1Emitter = function (parent) {
		var emitterParams = {};
		emitterParams.period = 75; 
		emitterParams.after_period = 50; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
        this.trackingCounter = 0;
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true; 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[0].alwaysAim=true;
        this.emitters[0].aim=true;
    };
    BHell_Enemy_VagrantLine5_p2.prototype.initializeCat = function () {
        this.updateCatCounter = 0;
        this.spawnNumber=2;
        this.spawnCounter = 0;
    };
    BHell_Enemy_VagrantLine5_p2.prototype.updateCat = function() {
        // Spawn a suicide cat enemy every 3 seconds.
        var image = {"characterName":"$Cat","direction":2,"pattern":2,"characterIndex":2};//cat sprite is messed up fix later
        var params = {};
        params.animated = false;
        params.aim = false;
        params.speed =1;
        params.hp = 5;
        params.bullet = {};
        this.updateCatCounter = this.updateCatCounter + 1; //change to adjust cat spawn rate 
        /////lots of shenanigans
        if ((this.updateCatCounter) % 10 == 0 && this.spawnNumber-1>=this.spawnCounter) {
            my.controller.enemies.push(new my.BHell_Enemy_SuicideCat(this.x + 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            my.controller.enemies.push(new my.BHell_Enemy_SuicideCat(this.x - 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
                my.controller.enemies[1].destroy();
            }
        }
        if ((this.updateCatCounter) % 500 == 0 && this.spawnNumber>=this.spawnCounter) {
            my.controller.enemies.push(new my.BHell_Enemy_SuicideCat(this.x + 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            my.controller.enemies.push(new my.BHell_Enemy_SuicideCat(this.x - 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
                my.controller.enemies[1].destroy();
            }
        }
    };
    //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_VagrantLine5_p2.prototype.updateVL5P1 = function () { 
        if(this.frameCounter%5 === 0)
        {    
            if (this.trackingCounter<5){this.emitters[0].shoot();this.trackingCounter += 1;}//change if comparator to adjust amout of bullets per wave
            else if(this.frameCounter%10 === 0){this.trackingCounter=0;}//change mod to ajust gap between waves
        }
        this.updateCat();
    };
	BHell_Enemy_VagrantLine5_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
    BHell_Enemy_VagrantLine5_p2.prototype.destroy = function() {
        my.player.can_bomb = false; 
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
        //adding these to the correct line allow it to transition to a different phase just call it before in or right before the destroy fucntion
        my.player.PhaseOver = true;
        my.player.nextMap = Number(5);//the 3 here is the map number change this to whatever map number u want to transition there on victory
    };

    //main update loop
    BHell_Enemy_VagrantLine5_p2.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        if (this.state !== "dying") {
            this.move();
        };
        switch (this.state) {
            case "started":
                if (this.mover.inPosition === true) {
                    this.state = "pattern 1";
                    this.frameCounter = 0;
                }
                break;
            case "pattern 1": // shoots main angle emitters every 5 frames and shoots all emitters every 150 frames
                this.updateVL5P1();   
                 
                break;
            case "dying": // dies.
                this.destroy();
                break;
        }; 
        // Update the received damage counter for the stunned state.
        this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = (this.frameCounter + 1) % 1200;
    }
    return my;
} (BHell || {}));
//=============================================================================
// VagrantLine5 Phase 3.js
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantLine5_p3 = my.BHell_Enemy_VagrantLine5_p3 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VagrantLine5_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine5_p3.prototype.constructor = BHell_Enemy_VagrantLine5_p3;

	BHell_Enemy_VagrantLine5_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4;
        params.hitbox_w = 550;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);
        //some variables needed to change states of the boss j is a counter to keep track of time, state and recived damage are obvious
        this.frameCounter = 0;
		this.state = "started";
        this.initializeVL5P1Emitter(parent);
        this.initializeCat(parent);
    };
    BHell_Enemy_VagrantLine5_p3.prototype.initializeVL5P1Emitter = function (parent) {
		var emitterParams = {};
		emitterParams.period = 75; 
		emitterParams.after_period = 50; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
        this.trackingCounter = 0;
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true; 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[0].angle = Math.PI/2;
        this.angle= this.emitters[0].angle+ (Math.PI/2);
        this.angl1=-(Math.PI/20);
        this.amp =180;

    };
    BHell_Enemy_VagrantLine5_p3.prototype.initializeCat = function () {
        this.updateCatCounter = 0;
        this.spawnNumber=2;
        this.spawnCounter = 0;
    };
    BHell_Enemy_VagrantLine5_p3.prototype.updateCat = function() {
        // Spawn a suicide cat enemy every 3 seconds.
        var image = {"characterName":"$Cat","direction":2,"pattern":2,"characterIndex":2};//cat sprite is messed up fix later
        var params = {};
        params.animated = false;
        params.aim = false;
        params.speed =1;
        params.hp = 5;
        params.bullet = {};
        this.updateCatCounter = this.updateCatCounter + 1; //change to adjust cat spawn rate 
        /////lots of shenanigans
        if ((this.updateCatCounter) % 10 == 0 && this.spawnNumber-1>=this.spawnCounter) {
            my.controller.enemies.push(new my.BHell_Enemy_SuicideCat(this.x + 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            my.controller.enemies.push(new my.BHell_Enemy_SuicideCat(this.x - 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
                my.controller.enemies[1].destroy();
            }
        }
        if ((this.updateCatCounter) % 500 == 0 && this.spawnNumber>=this.spawnCounter) {
            my.controller.enemies.push(new my.BHell_Enemy_SuicideCat(this.x + 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            my.controller.enemies.push(new my.BHell_Enemy_SuicideCat(this.x - 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
                my.controller.enemies[1].destroy();
            }
        }
    };
    //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_VagrantLine5_p3.prototype.updateVL5P1 = function () { 
        if(this.frameCounter%6 === 0)
        {    
            this.emitters[0].shoot(this.emitters,true);
            var x1=(this.amp * Math.sin(2*Math.PI * this.frameCounter / 120));
            var y=0;
            this.emitters[0].offsetX = ((x1)*Math.cos(this.angle)-(y)*Math.sin(this.angle))+Math.floor((Math.random() * 20));
        }
        this.updateCat();
    };
	BHell_Enemy_VagrantLine5_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
    BHell_Enemy_VagrantLine5_p3.prototype.destroy = function() {
        my.player.can_bomb = false; 
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
        //adding these to the correct line allow it to transition to a different phase just call it before in or right before the destroy fucntion
        my.player.PhaseOver = true;
        my.player.nextMap = Number(5);//the 3 here is the map number change this to whatever map number u want to transition there on victory
    };

    //main update loop
    BHell_Enemy_VagrantLine5_p3.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        if (this.state !== "dying") {
            this.move();
        };
        switch (this.state) {
            case "started":
                if (this.mover.inPosition === true) {
                    this.state = "pattern 1";
                    this.frameCounter = 0;
                }
                break;
            case "pattern 1": // shoots main angle emitters every 5 frames and shoots all emitters every 150 frames
                this.updateVL5P1();   
                 
                break;
            case "dying": // dies.
                this.destroy();
                break;
        }; 
        // Update the received damage counter for the stunned state.
        this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = (this.frameCounter + 1) % 1200;
    }
    return my;
} (BHell || {}));