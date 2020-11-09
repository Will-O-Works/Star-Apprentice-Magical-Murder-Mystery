//=============================================================================
// SuperFanTestimony1 Pattern 1
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_SuperFanTestimony1_p1 = my.BHell_Enemy_SuperFanTestimony1_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony1_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony1_p1.prototype.constructor = BHell_Enemy_SuperFanTestimony1_p1;

	BHell_Enemy_SuperFanTestimony1_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        my.player.currentLine = 0;
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 348; // hitbox width
        params.hitbox_h = 72; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		my.player.bombs = 0; 
		//some variables needed to change states a counter to keep track of time, state etc
        this.frameCounter = 0;
		this.state = "started";
		this.initializeVL4P1Emitter(parent);
		this.initializeHoming(parent);

		// set player.can_bomb to true by V.L.
		this.p = 151; 
		this.bombedWrong = false; 
		my.player.can_bomb = false; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_SuperFanTestimony1_p1.prototype.initializeVL4P1Emitter = function (parent) {
		var emitterParams = {};
		emitterParams.aim = false; // if aims at player, need to add more stuff in BHell_Emitter_Sine for it to work 
        emitterParams.alwaysAim = false;
		emitterParams.bullet = {};
		emitterParams.bullet.sprite="$FanBullets";
		emitterParams.bullet.direction = 8;

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
		emitterParams.bullet.speed=2;
		emitterParams.bullet.sprite="$FanBullets";
		emitterParams.bullet.animated = true;
		emitterParams.bullet.direction = 8;
        emitterParams.a = 6.5;//a: Arc's initial angle (in radians),
        emitterParams.b = 9.2;//b: Arc's final angle (in radians),
        emitterParams.n = 15;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		var emitterParams = {};
		emitterParams.aim = false; // if aims at player, need to add more stuff in BHell_Emitter_Sine for it to work 
        emitterParams.alwaysAim = false;
		emitterParams.bullet = {};
		emitterParams.bullet.sprite="$EyeBullets";
		emitterParams.bullet.direction = 2;
		emitterParams.bullet.speed=5;
		emitterParams.bullet.direction = 4;
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter 
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter 
		this.emitters[4].angle = 0.99;//change to adjust emitter angle
		this.emitters[5].angle = (Math.PI)-0.99;//change to adjust emitter angle
		this.emitters[6].angle = 0.99;//change to adjust emitter angle
		this.emitters[7].angle = (Math.PI)-0.99;//change to adjust emitter angle
		this.emitters[4].offsetX = -500;//change to adjust emitter angle
		this.emitters[5].offsetX = 500;
		this.emitters[6].offsetX = -500;
		this.emitters[7].offsetX = 500;
		this.emitters[4].offsetY = 100;
		this.emitters[5].offsetY = 100;
		this.emitters[6].offsetY = 160;
		this.emitters[7].offsetY = 160;
		this.emitters[8].angle = (Math.PI)/2;//change to adjust emitter angle
		this.emitters[9].angle = (Math.PI)/2;//change to adjust emitter angle
		this.emitters[8].offsetX = 290;
		this.emitters[9].offsetX = -290;
		this.emitters[10].angle = (Math.PI)/2;//change to adjust emitter angle
		this.emitters[11].angle = (Math.PI)/2;//change to adjust emitter angle
		this.emitters[10].offsetX = 255;
		this.emitters[11].offsetX = -255;
		
	};
	BHell_Enemy_SuperFanTestimony1_p1.prototype.updateEmitters = function () {
		if(this.frameCounter%4 === 0){
			//"var x = amplitude * sin(TWO_PI * frameCount / period" reffer to this for harmonic oscillations: https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-oscillations/a/oscillation-amplitude-and-period
			var x=170 * Math.sin(2*Math.PI * this.frameCounter / 120);
			var y=0;
			//reffer to the this for 3D rotations : https://math.stackexchange.com/questions/17246/is-there-a-way-to-rotate-the-graph-of-a-function
			this.emitters[0].offsetX = (x)*Math.cos(this.angle1)-(y)*Math.sin(this.angle1);//last part is just random number generator
			this.emitters[0].offsetY = (x)*Math.sin(this.angle1)+(y)*Math.cos(this.angle1);
			this.emitters[1].offsetX = (-x)*Math.cos(this.angle2)-(y)*Math.sin(this.angle2)+100;//last part is just random number generator
			this.emitters[1].offsetY = (-x)*Math.sin(this.angle2)+(y)*Math.cos(this.angle2);
			this.emitters[2].offsetX = (x)*Math.cos(this.angle3)-(y)*Math.sin(this.angle3)-100;//last part is just random number generator
			this.emitters[2].offsetY = (x)*Math.sin(this.angle3)+(y)*Math.cos(this.angle3);
			//this.emitters[0].shoot(this.emitters,true);
			this.emitters[1].shoot(this.emitters,true);
			this.emitters[2].shoot(this.emitters,true);
		}
		if(this.frameCounter%6 === 0){
			this.emitters[4].shoot(this.emitters,true);
			this.emitters[5].shoot(this.emitters,true);
			this.emitters[6].shoot(this.emitters,true);
			this.emitters[7].shoot(this.emitters,true);
			this.emitters[8].shoot(this.emitters,true);
			this.emitters[9].shoot(this.emitters,true);
			this.emitters[10].shoot(this.emitters,true);
			this.emitters[11].shoot(this.emitters,true);
		}
		if(this.frameCounter%this.p === 0){
			this.emitters[3].shoot(this.emitters,true);
		}
	};
	BHell_Enemy_SuperFanTestimony1_p1.prototype.initializeHoming = function (parent) {
        var emitterParams = {};
		emitterParams.bullet = {};
		emitterParams.sprite="$EyeBullets";////FIX THIS PART U DUMBASS MAKE SURE TO ALLOW PASSABLE PARAMS
        emitterParams.bullet.speed = 7;
        emitterParams.bullet.index = 2;
        emitterParams.bullet.frame = 2;
        emitterParams.bullet.direction = 8;
        emitterParams.period = 0;
        emitterParams.alwaysAim = true;
		emitterParams.aim = true; 
		emitterParams.bullet.hitboxshape = "circle";
		emitterParams.bullet.hitboxradius=100;
		this.emitters.push(new my.BHell_Emitter_Homing(this.x, this.y, emitterParams, parent, my.enemyBullets));
		this.emitters.push(new my.BHell_Emitter_Homing(this.x, this.y, emitterParams, parent, my.enemyBullets));
		this.emitters[12].offsetX=250;
		this.emitters[13].offsetX=-250;
		this.spawntime=0;
	};
	BHell_Enemy_SuperFanTestimony1_p1.prototype.updateHoming = function() {
        if (this.frameCounter == (30+this.spawntime)){
			this.emitters[12].shoot(this.coatEmitters,true);
			this.emitters[13].shoot(this.coatEmitters,true);
			this.spawntime+=90;
		};
	};
	BHell_Enemy_SuperFanTestimony1_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	//main update loop
	BHell_Enemy_SuperFanTestimony1_p1.prototype.update = function () {
		
		// Update line color V.L. 11/08/2020
			if (this.prev_hp == this.hp) {
				if (this.bombedWrong == true) {
					this.setColorTone([255, 0, 0, 1]);
				} else {
					this.setColorTone([0, 0, 0, 1]);
				}
			} else {
				this.setColorTone([255, 255, 0, 1]);
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
				this.updateHoming(); 
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
// SuperFanTestimony1 Pattern 2
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_SuperFanTestimony1_p2 = my.BHell_Enemy_SuperFanTestimony1_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony1_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony1_p2.prototype.constructor = BHell_Enemy_SuperFanTestimony1_p2;

	BHell_Enemy_SuperFanTestimony1_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 3; // speed of boss moving 
        params.hitbox_w = 407; // hitbox width
        params.hitbox_h = 82; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		my.player.bombs = 0; 
		//some variables needed to change states a counter to keep track of time, state etc
        this.frameCounter = 0;
		this.state = "started";
		this.initializeVL4P1Emitter(parent);
		
		my.player.currentLine = 1;
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_SuperFanTestimony1_p2.prototype.initializeVL4P1Emitter = function (parent) {
		var emitterParams = {};
        emitterParams.bullet = {};
		emitterParams.bullet.direction = 2;
		emitterParams.bullet.speed = 2;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),
        emitterParams.n = 4;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
		this.increment=0.2;
		emitterParams.bullet = {};
		emitterParams.bullet.speed=4;
		emitterParams.bullet.direction = 4;
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters[1].angle = 3*Math.PI/4;//change to adjust emitter angle
		this.angle1= this.emitters[1].angle+ (Math.PI/2)
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters[2].angle = Math.PI/4;//change to adjust emitter angle
		this.angle2= this.emitters[2].angle+ (Math.PI/2)
	};
	//initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_SuperFanTestimony1_p2.prototype.updateEmitters = function () {
		if(this.frameCounter%6==0){
			this.emitters[0].shoot(this.emitters,true)
			this.emitters[0].a+=this.increment;
			this.emitters[0].b+=this.increment;
			//"var x = amplitude * sin(TWO_PI * frameCount / period" reffer to this for harmonic oscillations: https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-oscillations/a/oscillation-amplitude-and-period
			var x=125 * Math.sin(2*Math.PI * this.frameCounter / 120);
			var y=0;
			//reffer to the this for 3D rotations : https://math.stackexchange.com/questions/17246/is-there-a-way-to-rotate-the-graph-of-a-function
			this.emitters[1].offsetX = 400+((x)*Math.cos(this.angle1)-(y)*Math.sin(this.angle1));//last part is just random number generator
			this.emitters[1].offsetY = (x)*Math.sin(this.angle1)+(y)*Math.cos(this.angle1);
			this.emitters[1].shoot(this.emitters,true);
			this.emitters[2].offsetX = -400+((-x)*Math.cos(this.angle2)-(y)*Math.sin(this.angle2));//last part is just random number generator
			this.emitters[2].offsetY = (-x)*Math.sin(this.angle2)+(y)*Math.cos(this.angle2);
			this.emitters[2].shoot(this.emitters,true);
		}
		if(this.emitters[0].a>4.5){this.increment= -0.2;}
		if(this.emitters[0].a<0){this.increment= 0.2;}
	};
	BHell_Enemy_SuperFanTestimony1_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	//main update loop
	BHell_Enemy_SuperFanTestimony1_p2.prototype.update = function () {
		
		// Update line color V.L. 11/08/2020
			if (this.prev_hp == this.hp) {
				if (this.bombedWrong == true) {
					this.setColorTone([255, 0, 0, 1]);
				} else {
					this.setColorTone([0, 0, 0, 1]);
				}
			} else {
				this.setColorTone([255, 255, 0, 1]);
			}
			
			this.prev_hp = this.hp; 
		
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
//=============================================================================
// SuperFanTestimony1 Pattern 3
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_SuperFanTestimony1_p3 = my.BHell_Enemy_SuperFanTestimony1_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony1_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony1_p3.prototype.constructor = BHell_Enemy_SuperFanTestimony1_p3;

	BHell_Enemy_SuperFanTestimony1_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 3; // speed of boss moving 
        params.hitbox_w = 144; // hitbox width
        params.hitbox_h = 72; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		my.player.bombs = 0; 
		//some variables needed to change states a counter to keep track of time, state etc
        this.frameCounter = 0;
		this.state = "started";
		this.initializeVL4P1Emitter(parent);
		this.initializeCat(parent);

		// set player.can_bomb to true by V.L.
		my.player.currentLine = 2;
		my.player.can_bomb = false; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_SuperFanTestimony1_p3.prototype.initializeVL4P1Emitter = function (parent) {
		var emitterParams = {};
		emitterParams.bullet = {};
		emitterParams.bullet.speed=4;
		emitterParams.bullet.direction = 4;
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters[0].angle = Math.PI;//change to adjust emitter angle
		this.angle1= this.emitters[0].angle+ (Math.PI/2)
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets,false)); // initialize the emmiter, check BHell_Emmiter
		this.emitters[1].angle = 0;//change to adjust emitter angle
		this.angle2= this.emitters[1].angle+ (Math.PI/2)
		var emitterParams = {};
        emitterParams.bullet = {};
		emitterParams.bullet.direction = 2;
		emitterParams.bullet.speed = 3;
        emitterParams.a = 7.0;//a: Arc's initial angle (in radians),
        emitterParams.b = 8.7;//b: Arc's final angle (in radians),
        emitterParams.n = 10;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
	};
	//initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_SuperFanTestimony1_p3.prototype.updateEmitters = function () {
		if(this.frameCounter%6==0){
			//"var x = amplitude * sin(TWO_PI * frameCount / period" reffer to this for harmonic oscillations: https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-oscillations/a/oscillation-amplitude-and-period
			var x=125 * Math.sin(2*Math.PI * this.frameCounter / 120);
			var y=0;
			//reffer to the this for 3D rotations : https://math.stackexchange.com/questions/17246/is-there-a-way-to-rotate-the-graph-of-a-function
			this.emitters[0].offsetX = 500+((x)*Math.cos(this.angle1)-(y)*Math.sin(this.angle1));//last part is just random number generator
			this.emitters[0].offsetY = 200+(x)*Math.sin(this.angle1)+(y)*Math.cos(this.angle1);
			this.emitters[0].shoot(this.emitters,true);
			this.emitters[1].offsetX = -500+((-x)*Math.cos(this.angle2)-(y)*Math.sin(this.angle2));//last part is just random number generator
			this.emitters[1].offsetY = 200+(-x)*Math.sin(this.angle2)+(y)*Math.cos(this.angle2);
			this.emitters[1].shoot(this.emitters,true);
		}
		// if(this.frameCounter%41==0){
		// 	this.emitters[2].shoot(this.emitters,true);
		// 	this.emitters[2].a++;
		// }
	};
	BHell_Enemy_SuperFanTestimony1_p3.prototype.initializeCat = function () {
        this.updateCatCounter = 0;
        this.spawnNumber=2;
        this.spawnCounter = 0;
    };
    BHell_Enemy_SuperFanTestimony1_p3.prototype.updateCat = function() {
        // Spawn a suicide cat enemy every 3 seconds.
        var image = {"characterName":"$Cat","direction":2,"pattern":2,"characterIndex":2};//cat sprite is messed up fix later
        var params = {};
        params.animated = true;
        params.frame = 2;
        params.aim = false;
        params.speed =1;
        params.hp = 8;
		params.bullet = {};
		params.bullet.speed = 2;
        this.updateCatCounter = this.updateCatCounter + 1; //change to adjust cat spawn rate 
        /////lots of shenanigans
        if ((this.updateCatCounter) % 10 == 0 && this.spawnNumber-1>=this.spawnCounter) {
            my.controller.enemies.push(new my.BHell_Enemy_FanCat(this.x + 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            my.controller.enemies.push(new my.BHell_Enemy_FanCat(this.x - 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
                my.controller.enemies[1].destroy();
            }
        }
        if ((this.updateCatCounter) % 300 == 0 && this.spawnNumber>=this.spawnCounter) {
            my.controller.enemies.push(new my.BHell_Enemy_FanCat(this.x + 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            my.controller.enemies.push(new my.BHell_Enemy_FanCat(this.x - 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
                my.controller.enemies[1].destroy();
            }
        }
    };
	BHell_Enemy_SuperFanTestimony1_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};

	//main update loop
	BHell_Enemy_SuperFanTestimony1_p3.prototype.update = function () {
		
		// Update line color V.L. 11/08/2020
			if (this.prev_hp == this.hp) {
				if (this.bombedWrong == true) {
					this.setColorTone([255, 0, 0, 1]);
				} else {
					this.setColorTone([0, 0, 0, 1]);
				}
			} else {
				this.setColorTone([255, 255, 0, 1]);
			}
			
			this.prev_hp = this.hp; 
		
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
				this.updateCat();  
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
	BHell_Enemy_SuperFanTestimony1_p3.prototype.destroy = function() {

		//adding these to the correct line allow it to transition to a different phase
		my.player.bombed = true;
		my.player.PhaseOver = true;
		my.player.nextMap = Number(31);//the 3 here is the map number change this to whatever map number u want to transition there on victory
		
		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
			
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
    return my;
} (BHell || {}));
//=============================================================================
// Suicide Cat Enemy
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_FanCat = my.BHell_Enemy_FanCat = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_FanCat.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_FanCat.prototype.constructor = BHell_Enemy_FanCat;

    BHell_Enemy_FanCat.prototype.initialize = function (x, y, image, params, parent, enemyList) {
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList); 
        var emitterParams = {};
        emitterParams.period = 15; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 6;
        if(params.bullet.speed!=false){emitterParams.bullet.speed=params.bullet.speed;}
        emitterParams.period = 110;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),
        emitterParams.n = 10;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
        this.mover = new my.BHell_Mover_Chase();
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
    }; 

    BHell_Enemy_FanCat.prototype.crash = function() {
        if (this.boss !== true) {
            my.explosions.push(new my.BHell_Explosion(this.x, this.y, this.parent, my.explosions));
            this.destroy();
        }
        $gameBHellResult.enemiesCrashed++;

        return true;
    };

    BHell_Enemy_FanCat.prototype.die = function() {
        this.destroy(); 
    };

    BHell_Enemy_FanCat.prototype.destroy = function() {  

        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
    };
    return my;
} (BHell || {}));