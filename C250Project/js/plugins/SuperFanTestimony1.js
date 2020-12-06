//=============================================================================
// Fan lightning? Emitter(not used)
//=============================================================================
var BHell = (function (my) {
	var BHell_Emitter_Lightning = my.BHell_Emitter_Lightning = function () {
        this.initialize.apply(this, arguments);       
    };

    BHell_Emitter_Lightning.prototype = Object.create(my.BHell_Emitter_Spray.prototype);
    BHell_Emitter_Lightning.prototype.constructor = BHell_Emitter_Lightning;


    BHell_Emitter_Lightning.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Spray.prototype.initialize.call(this, x, y, params, parent, bulletList);  
        this.type = params.type||"angle"; 
        this.frameCounter=0;
        this.punishV=0;
		this.punish = params.punish||"false";
		this.xpos=this.x;
		this.pause=false;
    };

    BHell_Emitter_Lightning.prototype.shoot = function () {
        this.frameCounter++;
        if(this.punish == "true"){
            this.punishV=30;
        }
		if(this.frameCounter%(119-this.punishV)==0){this.frameCounter=1;}
		if(this.frameCounter%60==0){this.xpos=my.player.x;this.pause=true;}
		if(this.frameCounter%6==0){
			var bullet;
			bullet = new my.BHell_Vagrant_Bullet(this.xpos+this.aimX+20, this.y-150, this.angle, this.bulletParams, this.bulletList,false);
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);
		}
		if(this.frameCounter%20==0&&this.pause==true){this.pause=false;}    
	};
    return my;
} (BHell || {}));
//=============================================================================
// Gunner EYE Enemy
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_GunnerEye = my.BHell_Enemy_GunnerEye = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_GunnerEye.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_GunnerEye.prototype.constructor = BHell_Enemy_GunnerEye;

    BHell_Enemy_GunnerEye.prototype.initialize = function (x, y, image, params, parent, enemyList) {
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList); 
        this.shooting = 120;
        this.isCat=true;
    if (params != null) {
        var tmp = my.parse(params.shooting, this.x, this.y, this.patternWidth(), this.patternHeight(), Graphics.width, Graphics.height, Graphics.width, Graphics.height);
        if (tmp > 0) {
            this.shooting = tmp;
        }
    }
    this.destX = Math.random() * Graphics.width;
    this.destY = Math.random() * 300;
    this.j = 0;
    var emitterParams = {};
        emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 3;
        emitterParams.period = 90;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),
        emitterParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
        this.mover = new my.BHell_Mover_Chase();
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.frameCounter=0;
	};
	BHell_Enemy_GunnerEye.prototype.update = function () {
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
				this.destY = Math.random() * 300;
				this.moving = false;
			}
		}
		else 
		{
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
	}	;
	BHell_Enemy_GunnerEye.prototype.crash = function() {
		if (this.boss !== true) {
			my.explosions.push(new my.BHell_Explosion(this.x, this.y, this.parent, my.explosions));
			this.destroy();
		}
		$gameBHellResult.enemiesCrashed++;
		return true;
	};
	BHell_Enemy_GunnerEye.prototype.die = function() {
		this.destroy(); 
	};
	BHell_Enemy_GunnerEye.prototype.destroy = function() {  

		if (this.parent != null) {
			this.parent.removeChild(this);
		}
		this.enemyList.splice(this.enemyList.indexOf(this), 1);
	};

    return my;
} (BHell || {}));
//=============================================================================
// Final Split Emitter
//=============================================================================
var BHell = (function (my) {
	var BHell_Emitter_FinalSplit = my.BHell_Emitter_FinalSplit = function () {
        this.initialize.apply(this, arguments);       
    };

    BHell_Emitter_FinalSplit.prototype = Object.create(my.BHell_Emitter_Spray.prototype);
    BHell_Emitter_FinalSplit.prototype.constructor = BHell_Emitter_FinalSplit;


    BHell_Emitter_FinalSplit.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Spray.prototype.initialize.call(this, x, y, params, parent, bulletList);  
        this.type = params.type||"circle"; 
        this.frameCounter=0;
        this.punishV=0;
		this.punish = params.punish||"false";
		
    };

    BHell_Emitter_FinalSplit.prototype.shoot = function () {
        this.frameCounter++;
        if(this.punish == "true"){
            this.punishV=30;
        }
        if(this.frameCounter%(119-this.punishV)==0){this.frameCounter=1;}
        switch(this.type){
            case "circle":
                for (var k = 0; k < this.n; k++) {
                    var bullet;
                    if (this.aim) {
                        if (this.alwaysAim || this.oldShooting === false) {
                            var dx = my.player.x - this.x + this.aimX;
                            var dy = my.player.y - this.y + this.aimY;
                            this.aimingAngle = Math.atan2(dy, dx);
                        }
                        bullet = new my.BHell_FinalSplit(this.x, this.y, this.aimingAngle - (this.b - this.a) / 2 + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList,false);
                        }
                    else {
                        bullet = new my.BHell_FinalSplit(this.x, this.y, this.a + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList,false);
                    }
                    this.parent.addChild(bullet);
                    this.bulletList.push(bullet);
                }
             break;
        }
    };
    return my;
} (BHell || {}));
//=============================================================================
// Final Split bullet
//=============================================================================
var BHell = (function (my) {
    var BHell_FinalSplit = my.BHell_FinalSplit = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_FinalSplit.prototype = Object.create(my.BHell_Bullet.prototype);
    BHell_FinalSplit.prototype.constructor = BHell_FinalSplit;
    BHell_FinalSplit.prototype.initialize = function (x, y, angle, params, bulletList,supersplit) {
		my.BHell_Bullet.prototype.initialize.call(this, x, y, angle, params, bulletList,);
        this.frameCounter=0;
        this.bullet2Params=params;
        this.burstcount=params.burstcount;
        this.special=params.special
        this.distance= params.distance||40;
        this.supersplit=supersplit;
    }
    BHell_FinalSplit.prototype.update = function () {
        var a=0;
        var b=2*Math.PI
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.y < (-this.height-200) || this.y > (Graphics.height + this.height+200) || this.x < (-this.width-200) || this.x > (Graphics.width + this.width+200)) {
        this.outsideMap = true;
        }
        if(this.frameCounter==this.distance&&this.supersplit==false){
            for (var k = 0; k < this.burstcount; k++) {
				var bullet;
				this.bullet2Params.sprite="$EyeBullets-horiz";
				this.bullet2Params.direction=8;
				this.bullet2Params.animated=true;
                bullet = new my.BHell_HomingBullet(this.x, this.y, a + (b - a) / this.burstcount * (k + 0.5), this.bullet2Params, this.bulletList);
                this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				this.bullet2Params.sprite="$BigEyeBullets";
                this.bullet2Params.direction=8;
            }
            this.destroy();
		}
		my.BHell_Sprite.prototype.update.call(this);
        this.frameCounter++;
    }

    return my;
} (BHell || {}));
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
		this.initializeWatcher(parent);

		// set player.can_bomb to true by V.L.
		this.p = 81; 
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
		emitterParams.bullet.animated = false;
		emitterParams.bullet.direction = 8;
        emitterParams.a = 6.5;//a: Arc's initial angle (in radians),
        emitterParams.b = 9.2;//b: Arc's final angle (in radians),
        emitterParams.n = 10;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
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
		this.emitters[8].offsetY = -150;
		this.emitters[9].offsetY = -150;
		this.emitters[10].angle = (Math.PI)/2;//change to adjust emitter angle
		this.emitters[11].angle = (Math.PI)/2;//change to adjust emitter angle
		this.emitters[10].offsetX = 255;
		this.emitters[11].offsetX = -255;
		this.emitters[10].offsetY = -150;
		this.emitters[11].offsetY = -150;
		
	};
	BHell_Enemy_SuperFanTestimony1_p1.prototype.updateEmitters = function () {
		if(this.frameCounter%4 === 0){
			//"var x = amplitude * sin(TWO_PI * frameCount / period" reffer to this for harmonic oscillations: https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-oscillations/a/oscillation-amplitude-and-period
			var x=130 * Math.sin(2*Math.PI * this.frameCounter / 120);
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
		// emitterParams.bullet.sprite="$EyeBullets-horiz";
        // emitterParams.bullet.speed = 5;
        // emitterParams.bullet.index = 2;
		// emitterParams.bullet.frame = 2;
		emitterParams.bullet.sprite="$FanBulletsVagrant";
        emitterParams.bullet.speed = 7;
        emitterParams.bullet.index = 8;
        emitterParams.bullet.frame = 2;
        emitterParams.bullet.direction = 8;
        emitterParams.period = 0;
        emitterParams.alwaysAim = true;
		emitterParams.aim = true;
		emitterParams.bullet.repeat = 5;
		emitterParams.bullet.speed = 4;
		emitterParams.bullet.hitboxshape ="circle";
		emitterParams.bullet.hitboxradius =3;
		this.emitters.push(new my.BHell_Emitter_Homing(this.x, this.y, emitterParams, parent, my.enemyBullets));
		this.emitters.push(new my.BHell_Emitter_Homing(this.x, this.y, emitterParams, parent, my.enemyBullets));
		this.emitters[12].offsetX=250;
		this.emitters[13].offsetX=-250;
		this.spawncount=0;
		this.spawnlimit=1;
	};
	BHell_Enemy_SuperFanTestimony1_p1.prototype.updateHoming = function() {
        if (this.frameCounter %10==0&&this.spawncount<this.spawnlimit){
			this.emitters[12].shoot(this.coatEmitters,true);
			this.emitters[13].shoot(this.coatEmitters,true);
			this.spawncount++;
		};
		if (this.frameCounter %150==0&&this.spawncount>=this.spawnlimit){
			this.spawncount=0;
		}
	};
	BHell_Enemy_SuperFanTestimony1_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_SuperFanTestimony1_p1.prototype.initializeWatcher = function (parent) {
		var emitterParams = {};
		emitterParams.angle=Math.PI/2;
		emitterParams.bullet = {};
        emitterParams.bullet.type = "static";
		emitterParams.bullet.sprite="$BigEyeBullets";
		emitterParams.bullet.direction=2;
		emitterParams.bullet.static="true"
		emitterParams.bullet.nopause = "true";
		emitterParams.bullet.hitboxshape ="circle";
		emitterParams.bullet.hitboxradius =16;
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
		//this.emitters[1].offsetX=0;
		//this.emitters[1].offsetY=-80;
		this.count=0;
		this.num=1;
		this.a=Math.PI+0.46;
		this.b=-0.46;
	}
	BHell_Enemy_SuperFanTestimony1_p1.prototype.updateWatcher = function () { 
		if(this.frameCounter==1&&this.count<this.num){
			this.n=3
			for (var k = 0; k < this.n; k++) {
				this.emitters[14].x=300+175*(k);
				this.emitters[14].y=50;
				//this.emitters[1].angle=this.a + (this.b - this.a)/ this.n  * (k + 0.5)-Math.PI/2;
				console.log(this.a + (this.b - this.a)/ this.n  * (k + 0.5));
				this.emitters[14].shoot(this.emitters,true);
				console.log("pew");
			}
			this.count++;
		}
	};
	//main update loop
	BHell_Enemy_SuperFanTestimony1_p1.prototype.update = function () {
		
				
		// Destroy itself if testimony = 1 by V.L. 11/29/2020
		if ($gameVariables.value(11) >= 1) {

			
			my.player.false_bomb = false; // restore the value of false_bomb to false by V.L. 10/18/2020
			
			this.emitters.forEach(e => { // Destroy the magic circle
				e.destroy();
			});
			
			my.controller.destroyEnemyBullets();
	
			my.player.bombs = 0;
			if (this.parent != null) {
				this.parent.removeChild(this);
			}
			this.enemyList.splice(this.enemyList.indexOf(this), 1);
			
			return; 
		}
		
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
				this.updateHoming(); 
				this.updateWatcher(); 
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
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 386; // hitbox width
        params.hitbox_h = 75; // hitbox height
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.frameCounter =0;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        

		this.initializeDrunk(parent);
		this.initializeEye(parent);

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    }
    BHell_Enemy_SuperFanTestimony1_p2.prototype.initializeDrunk = function (parent) {
		var emitterParams = {};
		emitterParams.aim = false; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.angle = 0;
		emitterParams.bullet = {};
		emitterParams.bullet.sprite="$FanBullets2";
        emitterParams.bullet.direction = 8;
        emitterParams.bullet.speed = 3;
        emitterParams.bullettype="vagrant";
        emitterParams.bullet.amp=4;
		emitterParams.bullet.period=100;
		this.emitters.push(new my.BHell_Emitter_Lightning(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters[0].aimX=0;
		this.emitters[0].angle=Math.PI/2;
		this.emitters.push(new my.BHell_Emitter_Lightning(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters[1].aimX=200;
		this.emitters[1].angle=Math.PI/2;
		this.emitters.push(new my.BHell_Emitter_Lightning(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters[2].aimX=-200;
		this.emitters[2].angle=Math.PI/2;
    }
    //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
    BHell_Enemy_SuperFanTestimony1_p2.prototype.updateDrunk = function () { 
		this.emitters[0].shoot(this.emitters,true);
		this.emitters[1].shoot(this.emitters,true);
		this.emitters[2].shoot(this.emitters,true);
	};
	BHell_Enemy_SuperFanTestimony1_p2.prototype.initializeEye = function () {
        this.updateCatCounter = 0;
        this.spawnNumber=1;
        this.spawnCounter = 0;
	};
	
	BHell_Enemy_SuperFanTestimony1_p2.prototype.updateEye = function() {
        // Spawn a suicide cat enemy every 3 seconds.
        var image = {"characterName":"$BigEyeBullets","direction":2,"pattern":2,"characterIndex":2};//cat sprite is messed up fix later
        var params = {};
        params.animated = true;
        params.frame = 2;
        params.aim = false;
        params.speed =2;
        params.hp = 9999;
        params.violent="false";
        params.bullet = {};
        this.updateCatCounter = this.updateCatCounter + 1; //change to adjust cat spawn rate 
        /////lots of shenanigans
        if ((this.updateCatCounter) % 10 == 0 && this.spawnNumber-99>=this.spawnCounter) {
            my.controller.enemies.push(new my.BHell_Enemy_GunnerEye(this.x + 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            my.controller.enemies.push(new my.BHell_Enemy_GunnerEye(this.x - 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
                my.controller.enemies[1].destroy();
            }
        }
        if ((this.updateCatCounter) % 20 == 0 && this.spawnNumber>=this.spawnCounter) {
            my.controller.enemies.push(new my.BHell_Enemy_GunnerEye(this.x + 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            my.controller.enemies.push(new my.BHell_Enemy_GunnerEye(this.x - 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
                my.controller.enemies[1].destroy();
            }
        }
	};
    BHell_Enemy_SuperFanTestimony1_p2.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        this.state = "dying";
        this.frameCounter = 0;
        my.controller.destroyEnemyBullets();
    };
    BHell_Enemy_SuperFanTestimony1_p2.prototype.destroy = function() {

		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
    };
    //main update loop
    BHell_Enemy_SuperFanTestimony1_p2.prototype.update = function () {
        
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
            this.punish=30; 
            this.emitters[3].bulletParams.speed= 2;
            this.emitters[4].bulletParams.speed= 2;
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
				this.updateDrunk(); 
				this.updateEye();  
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
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 386; // hitbox width
        params.hitbox_h = 75; // hitbox height
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.frameCounter =0;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        

		this.initializePOP(parent);
		this.initializeWatcher(parent);

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    }
    BHell_Enemy_SuperFanTestimony1_p3.prototype.initializePOP = function (parent) {
		var emitterParams = {};
		emitterParams.bullet = {};
        emitterParams.bullet.speed = 3;
        emitterParams.period = 130;
        emitterParams.a = 0.2;
        emitterParams.b = Math.PI-0.2;
        emitterParams.n = 3;
        emitterParams.type = "circle";
		emitterParams.bullet.burstcount = 12;
		emitterParams.bullet.sprite="$BigEyeBullets";;
		emitterParams.bullet.direction = 8;
		emitterParams.bullet.pauseTime = 0;
		emitterParams.bullet.repeat = 1;
		emitterParams.bullet.trackerRefresh = 50;
        this.emitters.push(new my.BHell_Emitter_FinalSplit(this.x, this.y, emitterParams, parent, my.enemyBullets));
	}
	BHell_Enemy_SuperFanTestimony1_p3.prototype.initializeWatcher = function (parent) {
		var emitterParams = {};
		emitterParams.angle=Math.PI/2;
		emitterParams.bullet = {};
        emitterParams.bullet.type = "static";
		emitterParams.bullet.sprite="$BigEyeBullets";
		emitterParams.bullet.direction=2;
		emitterParams.bullet.static="true"
		emitterParams.bullet.nopause = "true";
		emitterParams.bullet.hitboxshape ="circle";
		emitterParams.bullet.hitboxradius =16;
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
		//this.emitters[1].offsetX=0;
		//this.emitters[1].offsetY=-80;
		this.count=0;
		this.num=1;
		this.a=Math.PI-0.26;
		this.b=0.26;
    }
    //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
    BHell_Enemy_SuperFanTestimony1_p3.prototype.updatePOP = function () { 
		if(this.frameCounter%100==0){
			this.emitters[0].shoot(this.emitters,true);
		}
	};
	BHell_Enemy_SuperFanTestimony1_p3.prototype.updateWatcher = function () { 
		if(this.frameCounter==1&&this.count<this.num){
			this.n=5
			for (var k = 0; k < this.n; k++) {
				this.emitters[1].x=Math.cos(this.a + (this.b - this.a)/ this.n  * (k + 0.5))*400+Graphics.width/2;
				this.emitters[1].y=Math.sin(this.a + (this.b - this.a)/ this.n  * (k + 0.5))*-400+Graphics.height/2+160;
				//this.emitters[1].angle=this.a + (this.b - this.a)/ this.n  * (k + 0.5)-Math.PI/2;
				console.log(this.a + (this.b - this.a)/ this.n  * (k + 0.5));
				this.emitters[1].shoot(this.emitters,true);
			}
			this.count++;
		}
	};
    BHell_Enemy_SuperFanTestimony1_p3.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        this.state = "dying";
        this.frameCounter = 0;
        my.controller.destroyEnemyBullets();
    };
    BHell_Enemy_SuperFanTestimony1_p3.prototype.destroy = function() {

		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
    };
    //main update loop
    BHell_Enemy_SuperFanTestimony1_p3.prototype.update = function () {
        
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
            this.punish=30; 
            this.emitters[3].bulletParams.speed= 2;
            this.emitters[4].bulletParams.speed= 2;
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
				this.updatePOP(); 
				this.updateWatcher(); 
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