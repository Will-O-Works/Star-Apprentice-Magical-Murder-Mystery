//=============================================================================
// VictoriaTestimony1 Pattern 1
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony1_p1 = my.BHell_Enemy_VictoriaTestimony1_p1 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony1_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony1_p1.prototype.constructor = BHell_Enemy_VictoriaTestimony1_p1;
	BHell_Enemy_VictoriaTestimony1_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 25;//change to adjust Line HP
        params.speed = 4; // change to adjust speed of boss moving 
        params.hitbox_w = 488; // change to adjust hitbox width
        params.hitbox_h = 80; // change to adjust hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.bombedWrong = false;
        this.frameCounter = 0;
		this.state = "started";
        this.initializeBrick();
        this.initializeEmitters(parent);
		/* set player.can_bomb to true by V.L. */
		my.player.can_bomb = false; 
		my.player.currentLine = 0;
		this.p = 16; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);
    };
    BHell_Enemy_VictoriaTestimony1_p1.prototype.initializeEmitters = function (parent) {
        var emitterParams={};
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction=2;
        emitterParams.bullet.speed = 2;
        emitterParams.aim= false;
        emitterParams.alwaysAim =false;
        emitterParams.angle=Math.PI/2;
        emitterParams.a = 5.5;
        emitterParams.b = 8.5;
        emitterParams.n = 15;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        var emitterParams={};
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction=8;
        emitterParams.bullet.speed = 4;
        emitterParams.angle=Math.PI/2;
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[1].offsetX = 320;
        this.emitters[2].offsetX = -320;
        this.emitters[3].offsetX = 350;
        this.emitters[4].offsetX = -350;
        this.emitters[5].offsetX = 380;
        this.emitters[6].offsetX = -380;
        this.punish=0;
        for (let i = 1; i < this.emitters.length; i++) {
            this.emitters[i].offsetY=-120;    
        }  
    }
    BHell_Enemy_VictoriaTestimony1_p1.prototype.updateEmitters = function (parent) {
        if(this.frameCounter%(30-this.punish)==0)
        {
            this.emitters[0].a+=0.85;
            this.emitters[0].b+=0.85;
            this.emitters[0].shoot(true);
        }
        if(this.frameCounter%9==0)
        {
            this.emitters[1].shoot(true);
            this.emitters[2].shoot(true);
            this.emitters[3].shoot(true);
            this.emitters[4].shoot(true);
            this.emitters[5].shoot(true);
            this.emitters[6].shoot(true);
        }
    }
	BHell_Enemy_VictoriaTestimony1_p1.prototype.initializeBrick = function () {
        this.spawnNumber=27;
        this.spawnCounter = 0;
        this.lineNum=3;
	};
	//initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_VictoriaTestimony1_p1.prototype.updateBrick = function () {
        if (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$JeevesSmall","direction":2,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 0;
            params.speed =3;
            params.hp = 12;
            params.posX = this.x+200-(50*((this.spawnCounter-1)%(this.spawnNumber/this.lineNum)));
            params.posY=this.y+150-(50*Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            params.bullet = {};
            params.bullet.sprite="$VictoriaBullets1"
            params.bullet.direction=4;
            params.bullet.speed=5;//+(Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            my.controller.enemies.push(new my.BHell_Enemy_Brick(this.x, this.y, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
            }
        }  
	};
	BHell_Enemy_VictoriaTestimony1_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};	
	BHell_Enemy_VictoriaTestimony1_p1.prototype.destroy = function() {	
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}	
        my.BHell_Enemy_Base.prototype.destroy.call(this);
    };	
	//main update loop
	BHell_Enemy_VictoriaTestimony1_p1.prototype.update = function () {
		
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
				this.punish=15; 
			}
			if (my.player.bombed == true) {
				this.destroy(); 
			}
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
                if(this.frameCounter%3===0){
                    this.updateBrick();
                }  
                this.updateEmitters();
				break;
			case "dying": // die.
				this.destroy();
                break;
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
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
		// Update the time counter and reset it every 20 seconds.
		this.frameCounter = (this.frameCounter + 1) % 1200;
	}
    return my;
} (BHell || {}));
//=============================================================================
// VictoriaTestimony1 Pattern 2
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony1_p2 = my.BHell_Enemy_VictoriaTestimony1_p2 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony1_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony1_p2.prototype.constructor = BHell_Enemy_VictoriaTestimony1_p2;
	BHell_Enemy_VictoriaTestimony1_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 25;//change to adjust Line HP
        params.speed = 3.5; // change to adjust speed of boss moving 
        params.hitbox_w = 360; // change to adjust hitbox width
        params.hitbox_h = 72; // change to adjust hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.bombedWrong = false;
        this.frameCounter = 0;
		this.state = "started";
        this.initializeBrick(parent);
        this.initializeEmitters(parent);
        this.initializeSwipe(parent);

		/* set player.can_bomb to true by V.L. */
		my.player.can_bomb = false;
        my.player.currentLine = 1;
		
		this.p = 16; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still((Graphics.width / 2)+6, 125, 0, this.hitboxW, this.hitboxH);
    };
    BHell_Enemy_VictoriaTestimony1_p2.prototype.initializeEmitters = function (parent) {
        var emitterParams = {};
        emitterParams.aim=false;
        emitterParams.alwaysAim=false;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction=6;
        emitterParams.bullet.speed=5;
        var emitterTotal=10;
        for (let index = 0; index < emitterTotal; index+=2) {
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[index].angle= (Math.PI*1.32);
            this.emitters[index].offsetX= 500;
            this.emitters[index].offsetY= 400-((index/2)*40);
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[index+1].angle= (Math.PI*1.68);
            this.emitters[index+1].offsetX= -500;
            this.emitters[index+1].offsetY= 400-((index/2)*40);
        }
    };
    BHell_Enemy_VictoriaTestimony1_p2.prototype.updateEmitters = function (parent) {
        if(this.frameCounter%10==0){
            for (let index = 0; index < 10; index++) {
                this.emitters[index].shoot(true);
            }
        }
    };
    BHell_Enemy_VictoriaTestimony1_p2.prototype.initializeBrick = function () {
        this.spawnNumber=18;
        this.spawnCounter = 0;
        this.lineNum=2;
	};
	//initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_VictoriaTestimony1_p2.prototype.updateBrick = function () {
        if (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$JeevesSmall","direction":2,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 0;
            params.speed =3;
            params.hp = 12;
            params.posX = this.x+200-(50*((this.spawnCounter-1)%(this.spawnNumber/this.lineNum)));
            params.posY=this.y+120-(50*Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            params.bullet = {};
            params.bullet.sprite="$VictoriaBullets1"
            params.bullet.direction=4;
            params.bullet.speed=5;//+(Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            my.controller.enemies.push(new my.BHell_Enemy_Brick(this.x, this.y, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
            }
        }  
	};
	// BHell_Enemy_VictoriaTestimony1_p2.prototype.initializeBrick = function (parent) {
    //     this.spawnNumber=6;
    //     this.spawnCounter = 0;
    //     this.lineNum=2;
    //     this.wallSize = (this.spawnNumber/this.lineNum)-1;
	// };
	// //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	// BHell_Enemy_VictoriaTestimony1_p2.prototype.updateBrick = function (frameCounter) {
    //     while (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
    //         var image = {"characterName":"$Cat","direction":2,"pattern":2,"characterIndex":2};
    //         var params = {};
    //         params.animated = false;
    //         params.frame = 2;
    //         params.speed =4;
    //         params.hp = 999;
    //         params.wallSize=this.wallSize;
    //         params.Xposition =  ((this.spawnCounter-1)%(this.spawnNumber/this.lineNum));
    //         params.posX = this.x+(this.wallSize*25)-(50*((this.spawnCounter-1)%(this.spawnNumber/this.lineNum)));
    //         params.posY=this.y+150-(50*Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
    //         params.bullet = {};
    //         my.controller.enemies.push(new my.BHell_Enemy_BrickFollow(this.x, this.y, image, params, this.parent, my.controller.enemies,frameCounter));
    //         this.spawnCounter+=1;
    //         if(this.spawnCounter==1)
    //         {
    //         my.controller.enemies[1].destroy();
    //         }
    //     }  
    // };
    BHell_Enemy_VictoriaTestimony1_p2.prototype.initializeSwipe = function (parent) {
		this.p = 2; 
        var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction=4;
        emitterParams.bullet.speed = 4;
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[10].angle=Math.PI/2;
        this.emitters[10].alwaysAim = false;
        this.emitters[10].offsetX = -150;
        this.emitters[11].angle=Math.PI/2;
        this.emitters[11].alwaysAim = false;
        this.emitters[11].offsetX= 150;
        this.angl1= -(Math.PI/20);
        this.angl2= (Math.PI/20);
        this.flip=false;
    };

    BHell_Enemy_VictoriaTestimony1_p2.prototype.updateSwipe = function() {
        if (this.frameCounter % 10 == 0){
            this.emitters[10].shoot(true);
            this.emitters[11].shoot(true);
            if(this.emitters[10].angle>=Math.PI||this.emitters[11].angle<=0)
            {
                this.flip=true;
            }
            if(this.flip==true)
            {
                this.angl1= -(this.angl1);
                this.flip = false;
            }
            this.emitters[10].angle-=this.angl1;
            this.emitters[11].angle-=this.angl1;
        } 
    };
	BHell_Enemy_VictoriaTestimony1_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};	
	BHell_Enemy_VictoriaTestimony1_p2.prototype.destroy = function() {
        while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}	
        my.BHell_Enemy_Base.prototype.destroy.call(this);
    };	
	//main update loop
	BHell_Enemy_VictoriaTestimony1_p2.prototype.update = function () {
		
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
			}
			if (my.player.bombed == true) {
				this.destroy(); 
			}
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
                if(this.frameCounter%3===0){
                    this.updateBrick(this.frameCounter);  
                }  
                this.updateEmitters();
                this.updateSwipe();
				break;
			case "dying": // die.
				this.destroy();
                break;
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
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
		// Update the time counter and reset it every 20 seconds.
		this.frameCounter = (this.frameCounter + 1) % 1200;
	}
    return my;
} (BHell || {}));
//=============================================================================
// VictoriaTestimony1 Pattern 3
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony1_p3 = my.BHell_Enemy_VictoriaTestimony1_p3 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony1_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony1_p3.prototype.constructor = BHell_Enemy_VictoriaTestimony1_p3;
	BHell_Enemy_VictoriaTestimony1_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 45;//change to adjust Line HP
        params.speed = 4; // change to adjust speed of boss moving 
        params.hitbox_w = 458; // change to adjust hitbox width
        params.hitbox_h = 72; // change to adjust hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.bombedWrong = false;
        this.frameCounter = 0;
		this.state = "started";
        this.initializeBrick(parent);
        this.initializeEmitters(parent);
		/* set player.can_bomb to true by V.L. */
		my.player.can_bomb = true; 
		my.player.currentLine = 2;
		
        this.p = 16; 
        
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 100, 0, this.hitboxW, this.hitboxH);
	};
	BHell_Enemy_VictoriaTestimony1_p3.prototype.initializeBrick = function (parent) {
        this.spawnNumber=8;
        this.spawnCounter = 0;
    };
    //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_VictoriaTestimony1_p3.prototype.updateBrick = function () {
        if (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$JeevesSmall","direction":2,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 2;
            params.speed =5;
            params.hp = 8;
            params.bullet = {};
            params.bullet.sprite="$VictoriaBullets1"
            params.bullet.direction=4;
            //params.posX = this.x+125-(50*(this.spawnCounter-1));
            params.posX = this.x;
            params.num=this.spawnCounter;
            //params.posY=this.y+125;
            params.posY=this.y;
            //my.controller.enemies.push(new my.BHell_Enemy_BrickOrbit(this.x + 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            //if(this.spawnCounter<15){
            my.controller.enemies.push(new my.BHell_Enemy_BrickOrbit(this.x, this.y, -170, image, params, this.parent, my.controller.enemies));
            //}
            my.controller.enemies.push(new my.BHell_Enemy_BrickOrbit(this.x, this.y, -220,image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
            my.controller.enemies[1].destroy();
            }
        }  
	};
    BHell_Enemy_VictoriaTestimony1_p3.prototype.initializeEmitters = function (parent) {
        this.swap=false;
        var emitterParams = {};
        emitterParams.aim=false;
        emitterParams.alwaysAim=false;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction=6;
        emitterParams.bullet.speed=5;
        var emitterTotal=10;
        this.updateRate =100;
        for (let index = 0; index < emitterTotal; index+=2) {
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[index].angle= (Math.PI*1.32);
            this.emitters[index].offsetX= -250-((index/2)*40);
            this.emitters[index].offsetY= 430;
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[index+1].angle= (Math.PI*1.68);
            this.emitters[index+1].offsetX= 250+((index/2)*40);
            this.emitters[index+1].offsetY= 430;
        }
        var emitterParams = {};
            emitterParams.x = 0;
            emitterParams.y = 0;
            emitterParams.aim = false;
            emitterParams.alwaysAim =false;
            emitterParams.a = 6.3;//a: Arc's initial angle (in radians),change to adjust
            emitterParams.b = 9.3;//b: Arc's final angle (in radians),change to adjust
            emitterParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom updatechange to adjust
            emitterParams.bullet = {};
            emitterParams.bullet.sprite="$VictoriaBullets2"
            emitterParams.bullet.direction=4;
            emitterParams.bullet.speed=4;
            this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
    BHell_Enemy_VictoriaTestimony1_p3.prototype.updateEmitters = function (parent) {
        if(this.frameCounter%10==0){
            for (let index = 0; index < 10; index++) {
                this.emitters[index].shoot(true);
            }
        }
        if(this.updateRate<0){this.updateRate=100}
        //if(this.frameCounter%2==0){this.updateRate--;}
        if(this.frameCounter%this.updateRate==0){
            this.emitters[10].shoot(true);
            // if(this.swap==false){
            //     this.emitters[10].a+= 0.4;
            //     this.emitters[10].b+= 0.4;
            //     this.swap=true;
            // }
            // else{
            //     this.emitters[10].a-= 0.4;
            //     this.emitters[10].b-= 0.4;
            //     this.swap=false;
            // }
        }
        console.log(this.updateRate);
    };
    
	
	BHell_Enemy_VictoriaTestimony1_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};	
	BHell_Enemy_VictoriaTestimony1_p3.prototype.destroy = function() {
        //adding these to the correct line allow it to transition to a different phase
        //the 3 here is the map number change this to whatever map number u want to transition there on victory
        while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}	
        my.BHell_Enemy_Base.prototype.destroy.call(this);
        my.player.PhaseOver = true;
        my.player.nextMap = Number(37);
        
    };	
	//main update loop
	BHell_Enemy_VictoriaTestimony1_p3.prototype.update = function () {
		
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
			}
			if (my.player.bombed == true&& this.state !== "bombed") {
				my.controller.destroyEnemyBullets(); 
				this.timer = 0; 
				this.hp = 999;  // Give the line a large hp so itd doesn't get destroyed when bomb is used 
				this.state = "bombed";
			}
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
                if(this.frameCounter%15===0){
                    this.updateBrick();
                } 
                this.updateEmitters(); 
				break;
			case "dying": // die.
				this.destroy();
                break;
            case "bombed":  
                this.timer = (this.timer + 1) % 1200;
                this.shoot(false);
                console.log(this.timer);
                if (this.timer > 70) {
                    // Clear screen after count down V.L. 10/20/2020
                    my.controller.generators = [];
                    my.controller.activeGenerators = [];
                    console.log("boom");
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
//=============================================================================
// Brick Emitter
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_Brick = my.BHell_Enemy_Brick = function() {
        this.initialize.apply(this, arguments);
    };
    
    BHell_Enemy_Brick.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Brick.prototype.constructor = BHell_Enemy_Brick;
    
    BHell_Enemy_Brick.prototype.initialize = function (x, y, image, params, parent, enemyList) {
        this.frameCounter =0;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.mover = new my.BHell_Mover_Still(params.posX, params.posY, 0, this.hitboxW, this.hitboxH);
    
        var emitterParams = {};
        emitterParams.x = 0;
        emitterParams.y = 0;
        emitterParams.period = this.period;
        emitterParams.aim = true;
        emitterParams.alwaysAim =true;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),change to adjust
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),change to adjust
        emitterParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom updatechange to adjust
        emitterParams.bullet = Object.assign({}, this.bullet);
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
    BHell_Enemy_Brick.prototype.hit = function () {
        my.BHell_Enemy_Base.prototype.hit.call(this);
        if (this.frameCounter%2===0)
        {
            this.emitters[0].shoot(true);
        }
    };
    BHell_Enemy_Brick.prototype.die = function() {
        this.emitters[0].shoot(true);
        this.destroy(); 
    };
    BHell_Enemy_Brick.prototype.destroy = function() {  
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
    };
    BHell_Enemy_Brick.prototype.update = function() {
        my.BHell_Sprite.prototype.update.call(this);
        this.move();
        this.frameCounter =(this.frameCounter+1)%1200;
     }
    return my;
} (BHell || {}));
//=============================================================================
// Brick Emitter with trail
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_BrickFollow = my.BHell_Enemy_BrickFollow = function() {
        this.initialize.apply(this, arguments);
    };
    
    BHell_Enemy_BrickFollow.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_BrickFollow.prototype.constructor = BHell_Enemy_BrickFollow;
    
    BHell_Enemy_BrickFollow.prototype.initialize = function (x, y, image, params, parent, enemyList,globalframeCounter) {
        this.frameCounter =0;
        this.globalframeCounter=globalframeCounter;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        //this.mover = new my.BHell_Mover_Still(params.posX, params.posY, 0, this.hitboxW, this.hitboxH);
        this.mover = new my.Bhell_Mover_Trailing(params.posX, params.posY, 0, this.hitboxW, this.hitboxH,params.Xposition,this.globalframeCounter,params.wallSize);
    
        var emitterParams = {};
        emitterParams.x = 0;
        emitterParams.y = 0;
        emitterParams.period = this.period;
        emitterParams.aim=true;
        emitterParams.alwaysAim=true;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),change to adjust
        emitterParams.b = 2*Math.PI;//b: Arc's final angle (in radians),change to adjust
        emitterParams.n = 10;//n: number of bullets for each shot tho this is irrelevant since were using a custom updatechange to adjust
        emitterParams.bullet = Object.assign({}, this.bullet);
        emitterParams.bullet.speed=1;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        if(this.y<250){
            var emitterParams = {};
            emitterParams.x = 0;
            emitterParams.y = 0;
            emitterParams.period = this.period;
            emitterParams.aim=true;
            emitterParams.alwaysAim=true;
            emitterParams.bullet = Object.assign({}, this.bullet);
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        }
        this.shoot =false;
        this.shotcount=0;
    };
    BHell_Enemy_BrickFollow.prototype.hit = function () {
        my.BHell_Enemy_Base.prototype.hit.call(this);
        //this.emitters[0].shoot(true);
        this.shoot = true
    };
    BHell_Enemy_BrickFollow.prototype.die = function() {
        this.emitters[0].shoot(true);
        this.destroy(); 
    };
    BHell_Enemy_BrickFollow.prototype.destroy = function() {  
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
    };
    BHell_Enemy_BrickFollow.prototype.update = function() {
        my.BHell_Sprite.prototype.update.call(this);
        this.move();
        // if(this.y<250&&this.frameCounter%75==0){
        //     this.emitters[1].shoot(true);
        // }
        this.frameCounter =(this.frameCounter+1)%1200;
     }
    return my;
} (BHell || {}));
//=============================================================================
// Brick Emitter with orbit
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_BrickOrbit = my.BHell_Enemy_BrickOrbit = function() {
        this.initialize.apply(this, arguments);
    };
    
    BHell_Enemy_BrickOrbit.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_BrickOrbit.prototype.constructor = BHell_Enemy_BrickOrbit;
    
    BHell_Enemy_BrickOrbit.prototype.initialize = function (x, y, radius,image, params, parent, enemyList) {
        this.frameCounter =0;
        this.radius = radius
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.mover = new my.BHell_Mover_SOrbit(this.radius, false, params.posX,params.posY,params.num);
    
        var emitterParams={};
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 3;
        emitterParams.aim = true;
        emitterParams.alwaysAim = true;
        emitterParams.angle=Math.PI/2;
        emitterParams.a = 7;
        emitterParams.b = 7.5;
        emitterParams.n = 6;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
    };
    BHell_Enemy_BrickOrbit.prototype.hit = function () {
        my.BHell_Enemy_Base.prototype.hit.call(this);
        if (this.frameCounter%3===0)
        {
            this.emitters[0].shoot(true);
        }
    };
    BHell_Enemy_BrickOrbit.prototype.die = function() {
        this.emitters[0].shoot(true);
        this.destroy(); 
    };
    BHell_Enemy_BrickOrbit.prototype.destroy = function() {  
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
    };
    BHell_Enemy_BrickOrbit.prototype.update = function() {
        my.BHell_Sprite.prototype.update.call(this);
        this.move();
        this.frameCounter =(this.frameCounter+1)%1200;
     }
    return my;
} (BHell || {}));
// =============================================================================
// SOrbit Mover
// =============================================================================
var BHell = (function (my) {

    var BHell_Mover_SOrbit = my.BHell_Mover_SOrbit = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Mover_SOrbit.prototype = Object.create(my.BHell_Mover_Base.prototype);
    BHell_Mover_SOrbit.prototype.constructor = BHell_Mover_SOrbit;

	BHell_Mover_SOrbit.prototype.initialize = function(radius, counterclockwise,x,y,num) {
        my.BHell_Mover_Base.prototype.initialize.call(this);
        this.x=x;
        this.y= y;
        this.inPosition = false;
        this.radius = radius;
        this.counterclockwise = counterclockwise;
        this.t = 3 * Math.PI / 2;
        this.leftLimit =2*Math.PI;
        this.rightLimit=Math.PI;
        this.num=num;
        // if(this.radius==-170){
        //     this.leftLimit-=0.3;
        //     this.rightLimit+=0.3;

        // };
        if(this.radius==-220){
            this.rightLimit-=0.2;
            this.leftLimit+=0.2;
        };
    };

    BHell_Mover_SOrbit.prototype.move = function (oldX, oldY, speed) {
        var ret = [];
        if (this.inPosition) {
            speed=2;
            ret.push(this.x + this.radius * Math.cos(this.t));
            ret.push(this.y + this.radius * Math.sin(this.t));

            if (this.counterclockwise) {
                this.t -= speed * Math.PI / 360;
            }
            else {
                this.t += speed * Math.PI / 360;
            }
            if (this.t > this.leftLimit) {
                this.counterclockwise=true;

            }
            if (this.t < this.rightLimit) {
                this.counterclockwise=false;
            }
        }
        else {
            var dx = this.x - oldX;
            var dy = this.y - oldY - this.radius;
            if (Math.abs(dx) <= 2 && Math.abs(dy) <= 2) { // If the error is less than two pixels
                this.inPosition = true;
                ret.push(dx + oldX);
                ret.push(dy + oldY);
            }
            else {
                var angle = Math.atan2(dy, dx);
                ret.push(oldX + Math.cos(angle) * speed);
                ret.push(oldY + Math.sin(angle) * speed);
            }
        }
        return ret;
    };
    return my;
} (BHell || {}));
// =============================================================================
// LimitedBounce Mover
// =============================================================================
var BHell = (function (my) {

    var LimitedBounce = my.LimitedBounce = function() {
        this.initialize.apply(this, arguments);
    };

    LimitedBounce.prototype = Object.create(my.BHell_Mover_Base.prototype);
    LimitedBounce.prototype.constructor = LimitedBounce;

	LimitedBounce.prototype.initialize = function(x, y, angle, w, h,Xposition,frameCounter,wallSize) {
        my.BHell_Mover_Base.prototype.initialize.call(this);
        this.Xposition=Xposition;
        this.inPosition = false;
        this.initX = x;
        this.initY = y;
        this.signX = +1;
        this.signY = +1;
        this.angle = angle;
        this.w = w;
        this.h = h;
        this.wallSize =wallSize;
        this.frameCounter=frameCounter;
        this.limit = 80;
    };

    LimitedBounce.prototype.move = function (oldX, oldY, speed) {
        var ret = [];
        if (this.inPosition&&(this.frameCounter>60)) {
            var destX = oldX + Math.cos(this.angle) * speed * this.signX;
            var destY = oldY + Math.sin(this.angle) * speed * this.signY;
            if (destX < (this.w+(100*(this.wallSize-this.Xposition))/ 2)+this.limit) {
                destX = (this.w+(100*(this.wallSize-this.Xposition))/ 2)+this.limit;
                this.signX = -this.signX;
            }
            else if (destX > (Graphics.width - (this.w+(100*this.Xposition) / 2))-this.limit) {
                destX = (Graphics.width - (this.w+(100*this.Xposition) / 2))-this.limit;
                this.signX = -this.signX;
            }
            if (destY < this.h / 2) {
                destY = this.h / 2;
                this.signY = -this.signY;
            }
            else if (destY > Graphics.height - this.h / 2) {
                destY = Graphics.height - this.h / 2;
                this.signY = -this.signY;
            }
            ret.push(destX);
            ret.push(destY);
        }
        else {
            var dx = this.initX - oldX;
            var dy = this.initY - oldY;
            if (Math.abs(dx) <= 2 && Math.abs(dy) <= 2) { // If the error is less than two pixels
                this.inPosition = true;
                ret.push(this.initX);
                ret.push(this.initY);
            }
            else {
                var angle = Math.atan2(dy, dx);
                ret.push(oldX + Math.cos(angle) * speed);
                ret.push(oldY + Math.sin(angle) * speed);
            }
        }
        this.frameCounter++;
        return ret;
    };

    return my;
} (BHell || {}));
//=============================================================================
//Trailing Mover
//=============================================================================
var BHell = (function (my) {

    var Bhell_Mover_Trailing = my.Bhell_Mover_Trailing = function() {
        this.initialize.apply(this, arguments);
    };

    Bhell_Mover_Trailing.prototype = Object.create(my.BHell_Mover_Base.prototype);
    Bhell_Mover_Trailing.prototype.constructor = Bhell_Mover_Trailing;

	Bhell_Mover_Trailing.prototype.initialize = function(x, y, angle, w, h,Xposition,frameCounter,wallSize) {
        my.BHell_Mover_Base.prototype.initialize.call(this);
        this.Xposition=Xposition+1;
        this.inPosition = false;
        this.initX = x;
        this.initY = y;
        this.signX = +1;
        this.signY = +1;
        this.angle = angle;
        this.w = w;
        this.h = h;
        this.wallSize =wallSize;
        this.frameCounter=frameCounter;
        this.limit = 80;
        this.speed=200;
    };

    Bhell_Mover_Trailing.prototype.move = function (oldX, oldY, speed) {
        var ret = [];
        speed=4.5;
        if (this.inPosition == false) {
            var dx = this.initX - oldX;
            var dy = this.initY - oldY;
            if (Math.abs(dx) <= 2 && Math.abs(dy) <= 2) { // If the error is less than two pixels
                this.inPosition = true;
                ret.push(this.initX);
                ret.push(this.initY);
            }
            else {
                var angle = Math.atan2(dy, dx);
                ret.push(oldX + Math.cos(angle) * speed);
                ret.push(oldY + Math.sin(angle) * speed);
            }
        } 
        if (my.player.justSpawned) {
            ret.push(oldX);
            ret.push(oldY);
        }
        if (this.frameCounter>60){
            if(this.Xposition<2)
            {
                var dx = my.player.x - oldX + (this.w*(2-this.Xposition));
                var dy = oldY;
                var angle = Math.atan2(dy, dx);
                ret.push(oldX + Math.cos(angle) * speed);
                ret.push(oldY);
            }
            else if(this.Xposition>2){
                var dx = my.player.x - oldX - (this.w*(this.Xposition%2));
                var dy = oldY;
                var angle = Math.atan2(dy, dx);
                ret.push(oldX + Math.cos(angle) * speed);
                ret.push(oldY);
            }
            else if(this.Xposition==2){
                var dx = my.player.x - oldX;
                var dy = oldY;
                var angle = Math.atan2(dy, dx);
                ret.push(oldX + (Math.cos(angle)) * speed);
                ret.push(oldY);
            }
        }
        else {
            ret.push(oldX);
            ret.push(oldY);
        }
        this.frameCounter++;
		return ret;
    };

    return my;
} (BHell || {}));



































































//=============================================================================
// Jeeves Enemy
//=============================================================================
// var BHell = (function (my) {
//     var BHell_Enemy_Jeeves1 = my.BHell_Enemy_Jeeves1 = function() {
//         this.initialize.apply(this, arguments);
//     };
    
//     BHell_Enemy_Jeeves1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
//     BHell_Enemy_Jeeves1.prototype.constructor = BHell_Enemy_Jeeves1;
    
//     BHell_Enemy_Jeeves1.prototype.initialize = function (x, y, image, params, parent, enemyList,side) {
//         this.frameCounter =0;
//         this.side = side;
//         my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
//         this.mover = new my.BHell_Mover_Still(params.posX, params.posY, 0, this.hitboxW, this.hitboxH);
    
//         var emitterParams = {};
//         emitterParams.x = 0;
//         emitterParams.y = 0;
//         emitterParams.period = this.period;
//         emitterParams.aim = false;
//         emitterParams.alwaysAim =false;
//         emitterParams.a = 0;//a: Arc's initial angle (in radians),change to adjust
//         emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),change to adjust
//         emitterParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom updatechange to adjust
//         emitterParams.bullet = Object.assign({}, this.bullet);
//         this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
//         this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
//         this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
//         if(this.side="l")
//         {
//             this.emitters[0].angle=1;
//             this.emitters[0].offsetY =20; 
//             this.emitters[1].angle=1;
//         }
//         if(this.side="r")
//         {
//             this.emitters[0].angle=2;
//             this.emitters[0].offsetY =20; 
//             this.emitters[1].angle=2;
//         }
//         this.emitters[2].aim=true;
//         this.emitters[2].alwaysAim =true;
//     };
//     BHell_Enemy_Jeeves1.prototype.hit = function () {
//         my.BHell_Enemy_Base.prototype.hit.call(this);
//     };
//     BHell_Enemy_Jeeves1.prototype.die = function() {
//         this.destroy(); 
//     };
//     BHell_Enemy_Jeeves1.prototype.destroy = function() {  
//         if (this.parent != null) {
//             this.parent.removeChild(this);
//         }
//         this.enemyList.splice(this.enemyList.indexOf(this), 1);
//     };
//     BHell_Enemy_Jeeves1.prototype.update = function() {
//         my.BHell_Sprite.prototype.update.call(this);
//         this.move();
//         if(this.frameCounter%20){
//             this.emitters[0].shoot(true);
//             this.emitters[1].shoot(true);
//             this.emitters[2].shoot(true);
//         }
//         this.frameCounter =(this.frameCounter+1)%1200;
//      }
//     return my;
// } (BHell || {}));




















































//below lies cursed code that should not be uncommented lest it bring devistation to the game +. YA 






























// var BHell = (function (my) {
//     var BHell_Mover_SOrbit = my.BHell_Mover_SOrbit = function () {
//         this.initialize.apply(this, arguments);
//     };
//     BHell_Mover_SOrbit.prototype = Object.create(my.BHell_Mover_Base.prototype);
//     BHell_Mover_SOrbit.prototype.constructor = BHell_Mover_SOrbit;

//     BHell_Mover_SOrbit.prototype.initialize = function (radius, counterclockwise,x,y) {
//         my.BHell_Mover_Base.prototype.initialize.call(this);
//         this.x=x;
//         this.y=y;
//         this.inPosition = false;
//         this.radius = radius;
//         this.counterclockwise = counterclockwise;
//         this.t = 3 * Math.PI / 2;
//     };

//     BHell_Mover_SOrbit.prototype.move = function (oldX, oldY, speed) {
//         var ret = [];

//         if (my.player.justSpawned) {
//             this.inPosition = false;
//             this.t = 3 * Math.PI / 2;
//             ret.push(oldX);
//             ret.push(oldY);
//         }
//         else {
//             if (this.inPosition) {
//                 ret.push(this.x + this.radius * Math.cos(this.t));
//                 ret.push(this.y + this.radius * Math.sin(this.t));

//                 if (this.counterclockwise) {
//                     this.t -= speed * Math.PI / 360;
//                 }
//                 else {
//                     this.t += speed * Math.PI / 360;
//                 }
//                 if (this.t > 2 * Math.PI) {
//                     this.t -= 2 * Math.PI;
//                 }
//             }
//             else {
//                 var dx = this.x - oldX;
//                 var dy = this.y - oldY - this.radius;
//                 if (Math.abs(dx) <= 2 && Math.abs(dy) <= 2) { // If the error is less than two pixels
//                     this.inPosition = true;
//                     ret.push(dx + oldX);
//                     ret.push(dy + oldY);
//                 }
//                 else {
//                     var angle = Math.atan2(dy, dx);
//                     ret.push(oldX + Math.cos(angle) * speed);
//                     ret.push(oldY + Math.sin(angle) * speed);
//                 }
//             }
//         }

//         return ret;
//     };
// } (BHell || {}));