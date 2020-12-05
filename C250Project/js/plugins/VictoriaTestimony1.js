// =============================================================================
// VictoriaTestimony1 Pattern 1 Test
// =============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony1_p1 = my.BHell_Enemy_VictoriaTestimony1_p1 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony1_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony1_p1.prototype.constructor = BHell_Enemy_VictoriaTestimony1_p1;
    BHell_Enemy_VictoriaTestimony1_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 504; //change to adjust hitbox width
        params.hitbox_h = 82; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeZaWarudo(parent);
        this.initializeBrick(parent);
		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
		my.player.currentLine = 2;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony1_p1.prototype.initializeZaWarudo = function (parent) {
        this.firstpause =true;
    };
    BHell_Enemy_VictoriaTestimony1_p1.prototype.initializeBrick = function () {
        this.spawnNumber=1;
        this.spawnCounter = 0;
        this.lineNum=2;
        this.punish=false;
	};
    BHell_Enemy_VictoriaTestimony1_p1.prototype.updateZaWarudo = function() {
        if(this.frameCounter==100){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
            this.spawnCounter = 0;
        }
        if(this.frameCounter%10 == 0&&my.player.Timestop==true&&this.frameCounter<370)
        {
            this.updateBrick();
        }
        if(this.frameCounter==200){
            my.player.Timestop=false;
        }
    };
    BHell_Enemy_VictoriaTestimony1_p1.prototype.updateBrick = function () {
        if (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$JeevesSmall","direction":2,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 0;
            params.speed =4;
            params.hp = 8;
            params.moveTime=70;
            params.dif=20;
            params.period=25;
            params.waveNum=3;
            params.type=3;
            if(this.punish==true){
                params.moveTime=100;
                params.dif=20;
                params.period=25;
                params.waveNum=4;
                params.bulletspeed=2;
            }
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x, this.y, image, params, this.parent, my.controller.enemies));
                my.controller.enemies[1].destroy();
            }
            else{
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x, this.y+100, image, params, this.parent, my.controller.enemies));
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x-300, this.y+250, image, params, this.parent, my.controller.enemies));
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x+300, this.y+250, image, params, this.parent, my.controller.enemies));
            }
        }  
	};
    BHell_Enemy_VictoriaTestimony1_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony1_p1.prototype.destroy = function() {
        my.player.PhaseOver = true;
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
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
			// Added bomb wrong case 
			if (my.player.false_bomb == true && this.bombedWrong == false) {
				this.bombedWrong = true; 
                this.hp = this.full_hp;
                this.punish=true;
			}
			if (this.bombedWrong == true) {
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
				}
				break;
			case "active": // Shoot.
                this.updateZaWarudo();
                //this.updateSwipe();
				break;
			case "dying": // die.
				this.destroy();
				break;
		}; 
		// Update the emitter's position.
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = ((this.frameCounter) % 240)+1;
	};
    return my;
} (BHell || {}));
// =============================================================================
// VictoriaTestimony1 Pattern 2 Test
// =============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony1_p2 = my.BHell_Enemy_VictoriaTestimony1_p2 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony1_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony1_p2.prototype.constructor = BHell_Enemy_VictoriaTestimony1_p2;
    BHell_Enemy_VictoriaTestimony1_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 530; //change to adjust hitbox width
        params.hitbox_h = 84; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeZaWarudo(parent);
        this.initializeBrick(parent);
		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
		my.player.currentLine = 0;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony1_p2.prototype.initializeZaWarudo = function (parent) {
        this.firstpause =true;
        var emitterParams = {};
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 4;
        emitterParams.a = 0;
        emitterParams.b = 2*Math.PI;
        emitterParams.n = 8;
        emitterParams.bullet.speed = 2.5;
        emitterParams.bullet.num = 0;
        emitterParams.bullet.moveTime=90;
        emitterParams.bullet.dif=4;
        emitterParams.bullettype = "vic1";
        this.emitters.push(new my.BHell_Emitter_Animism(this.x, this.y, emitterParams, parent, my.enemyBullets));
        var emitterParams = {};
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction = 6;
        emitterParams.bullet.speed = 2;
        emitterParams.a = 0;
        emitterParams.b = 2*Math.PI;
        emitterParams.n = 11;
        emitterParams.bullet.speed = 2;
        emitterParams.bullet.num = 0;
        emitterParams.bullet.moveTime=75;
        emitterParams.bullet.dif=15;
        emitterParams.bullettype = "vic2";
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
    BHell_Enemy_VictoriaTestimony1_p2.prototype.initializeBrick = function () {
        this.spawnNumber=1;
        this.spawnCounter = 0;
        this.lineNum=2;
        this.punish=false;
	};
    BHell_Enemy_VictoriaTestimony1_p2.prototype.updateZaWarudo = function() {
        if(this.punish==true){
            this.emitters[0].bulletParams.speed=3.5;
            this.emitters[0].bulletParams.moveTime=100;
        }
        if(this.frameCounter==100){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
            this.spawnCounter = 0;
            this.emitters[0].bulletParams.num=0;
        }
        if(this.frameCounter%10 == 0&&my.player.Timestop==true&&this.frameCounter<370)
        {
            this.updateBrick();
        }
        if(this.frameCounter%3 == 0&&my.player.Timestop==true&&this.frameCounter<160){
            if(this.frameCounter<130){
                this.emitters[0].a-=(Math.PI/60)
                this.emitters[0].b-=(Math.PI/60)
                this.emitters[0].shoot(this.emitters,true);
            }
            else if(this.frameCounter>140){
                this.emitters[0].a+=(Math.PI/60);
                this.emitters[0].b+=(Math.PI/60);
                this.emitters[0].shoot(this.emitters,true);
            }
            this.emitters[0].bulletParams.num++;
            if(this.emitters[1].bulletParams.num<1){
                this.emitters[1].x=my.player.x;
                this.emitters[1].y=my.player.y;
                this.emitters[1].bulletParams.num++;
                //this.emitters[1].shoot(this.emitters,true);
            }
        }
        if(this.frameCounter==210){
            my.player.Timestop=false;
            this.emitters[1].bulletParams.num=0;
        }
    };
    BHell_Enemy_VictoriaTestimony1_p2.prototype.updateBrick = function () {
        if (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$JeevesSmall","direction":2,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 0;
            params.speed =5;
            params.hp = 8;
            params.moveTime=80;
            params.dif=15;
            params.period=25;
            params.waveNum=3;
            params.type=2;
            params.bulletspeed=2;
            this.spawnCounter+=1;
            if(this.punish==true){
                params.moveTime=100;
                params.waveNum=4;
            }
            if(this.spawnCounter==1)
            {
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x, this.y, image, params, this.parent, my.controller.enemies));
                my.controller.enemies[1].destroy();
            }
            else{
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x+400, this.y+200, image, params, this.parent, my.controller.enemies));
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x-400, this.y+200, image, params, this.parent, my.controller.enemies));
            }
        }  
	};
    BHell_Enemy_VictoriaTestimony1_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony1_p2.prototype.destroy = function() {
        my.player.PhaseOver = true;
        my.player.nextMap = Number(37);
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
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
			// Added bomb wrong case 
			if (my.player.false_bomb == true && this.bombedWrong == false) {
				this.bombedWrong = true; 
				this.hp = this.full_hp; 
			}
			if (this.bombedWrong == true) {
				// Write the bombedWrong penalty in here
				this.punish=true; 
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
				}
				break;
			case "active": // Shoot.
                this.updateZaWarudo();
				break;
			case "dying": // die.
				this.destroy();
                break;
            case "bombed":  
                this.timer = (this.timer + 1) % 1200;
                this.shoot(false);
                my.controller.generators = [];
                my.controller.activeGenerators = [];
                this.destroy();
            break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter ++;
        if(this.frameCounter>=280){this.frameCounter=0;}
	};
    return my;
} (BHell || {}));
// =============================================================================
// VictoriaTestimony1 Pattern 3 Test
// =============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony1_p3 = my.BHell_Enemy_VictoriaTestimony1_p3 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony1_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony1_p3.prototype.constructor = BHell_Enemy_VictoriaTestimony1_p3;
    BHell_Enemy_VictoriaTestimony1_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 530; //change to adjust hitbox width
        params.hitbox_h = 84; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeZaWarudo(parent);
        this.initializeBrick(parent);
		// set player.can_bomb to true by V.L.
        my.player.can_bomb = true;
		my.player.currentLine = 0;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony1_p3.prototype.initializeZaWarudo = function (parent) {
        this.firstpause =true;
        var emitterParams = {};
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction = 6;
        emitterParams.bullet.speed = 3;
        emitterParams.a = 0;
        emitterParams.b = 2*Math.PI;
        emitterParams.n = 11;
        emitterParams.bullet.speed = 2;
        emitterParams.bullet.num = 0;
        emitterParams.bullet.moveTime=115;
        emitterParams.bullet.dif=15;
        emitterParams.bullettype = "vic2";
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
    BHell_Enemy_VictoriaTestimony1_p3.prototype.initializeBrick = function () {
        this.spawnNumber=1;
        this.spawnCounter = 0;
        this.lineNum=2;
	};
    BHell_Enemy_VictoriaTestimony1_p3.prototype.updateZaWarudo = function() {
        if(this.frameCounter==100){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
            this.spawnCounter = 0;
            this.emitters[0].bulletParams.num=0;
        }
        if(this.frameCounter%10 == 0&&my.player.Timestop==true&&this.frameCounter<370)
        {
            this.updateBrick();            
            if(this.emitters[0].bulletParams.num<4){
                this.emitters[0].x=my.player.x;
                this.emitters[0].y=my.player.y;
                this.emitters[0].bulletParams.num++;
                this.emitters[0].shoot(this.emitters,true);
            }
           
        }
        if(this.frameCounter==250){
            my.player.Timestop=false;
        }
    };
    BHell_Enemy_VictoriaTestimony1_p3.prototype.updateBrick = function () {
        if (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$JeevesSmall","direction":2,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 0;
            params.speed =5;
            params.hp = 8;
            params.moveTime=80;
            params.dif=20;
            params.period=25;
            params.waveNum=3;
            params.type=3;
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x, this.y, image, params, this.parent, my.controller.enemies));
                my.controller.enemies[1].destroy();
            }
            else{
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x+300, this.y+50, image, params, this.parent, my.controller.enemies));
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x-300, this.y+50, image, params, this.parent, my.controller.enemies));
            }
        }  
	};
    BHell_Enemy_VictoriaTestimony1_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony1_p3.prototype.destroy = function() {
        my.player.PhaseOver = true;
        //my.player.nextMap = Number(42);
        my.player.nextMap = Number(50);
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
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
				}
				break;
			case "active": // Shoot.
                this.updateZaWarudo();
				break;
			case "dying": // die.
				this.destroy();
                break;
            case "bombed":  
                this.timer = (this.timer + 1) % 1200;
                my.player.Timestop=false;
                this.shoot(false);
                // Clear screen after count down V.L. 10/20/2020
                my.controller.generators = [];
                my.controller.activeGenerators = [];
                this.destroy();
            break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter ++;
        if(this.frameCounter>=300){this.frameCounter=0;}
	};
    return my;
} (BHell || {}));



//=============================================================================
// TimeStop Jeeves
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_TSBrick = my.BHell_Enemy_TSBrick = function() {
        this.initialize.apply(this, arguments);
    };
    
    BHell_Enemy_TSBrick.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_TSBrick.prototype.constructor = BHell_Enemy_TSBrick;
    
    BHell_Enemy_TSBrick.prototype.initialize = function (x, y, image, params, parent, enemyList) {
        this.frameCounter =0;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        var type =1;
        var moveTime=40;
        var dif= 10;
        this.period= 30;
        this.waveNum=1000;
        this.wavecounter=0;
        this.bulletspeed=1.5;
        if (params != null) {
            type =  params.type||type;
            moveTime =  params.moveTime||moveTime;
            dif =  params.dif||dif;
            type =  params.type||type;
            this.period =  params.period||this.period;
            this.waveNum =  params.waveNum||this.waveNum;
            this.bulletspeed =  params.bulletspeed||this.bulletspeed;
        }   
        var emitterParams={};
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
        emitterParams.n = 20;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = this.bulletspeed;
        emitterParams.bullet.num = 0;
        emitterParams.bullet.stoppable="false";
        emitterParams.bullet.moveTime=moveTime;
        emitterParams.bullet.dif=dif;
        emitterParams.bullettype = "vic1";
        if(type==1){
            this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        }
        if(type==2){
            emitterParams.aim=true;
            emitterParams.alwaysAim=true;
            emitterParams.a=Math.PI/4 -0.3;
            emitterParams.b=3*Math.PI/4 -0.3;
            emitterParams.n=8;
            this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        }
        if(type==3){
            emitterParams.n=15;
            emitterParams.aim=true;
            this.emitters.push(new my.BHell_Emitter_Animism(this.x, this.y, emitterParams, parent, my.enemyBullets));
        }
        if(type=="triangle"){
            emitterParams.num_bullet=6;
            emitterParams.angle = Math.PI/4;
            emitterParams.shape=3;
            emitterParams.rotate="clockwise";
            emitterParams.speed = 2;
            emitterParams.type = "timeStop";
            this.emitters.push(new my.BHell_Emitter_Geometry(this.x, this.y, emitterParams, parent, my.enemyBullets));
        }
        if(type=="square"){
            emitterParams.num_bullet=7;
            emitterParams.angle = Math.PI/4;
            emitterParams.shape=4;
            emitterParams.rotate="clockwise";
            emitterParams.speed = 2;
            emitterParams.type = "timeStop";
            this.emitters.push(new my.BHell_Emitter_Geometry(this.x, this.y, emitterParams, parent, my.enemyBullets));
        }
        
    };
    BHell_Enemy_TSBrick.prototype.hit = function () {
        my.BHell_Enemy_Base.prototype.hit.call(this);
    };
    BHell_Enemy_TSBrick.prototype.die = function() {
        this.destroy(); 
    };
    BHell_Enemy_TSBrick.prototype.destroy = function() {  
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
    };
    BHell_Enemy_TSBrick.prototype.update = function() {
        my.BHell_Sprite.prototype.update.call(this);
        if (this.frameCounter%this.period===0&&this.wavecounter<this.waveNum)
        {
            this.wavecounter++;
            this.emitters[0].shoot(true);
            this.emitters[0].bulletParams.num++;
        }
        if(my.player.Timestop==false){
            this.destroy();
        }
        this.frameCounter =(this.frameCounter+1)%1200;
     }
    return my;
} (BHell || {}));
//=============================================================================
// TimeStop Bullet
//=============================================================================
var BHell = (function (my) {
    var BHell_TimeStop_Bullet = my.BHell_TimeStop_Bullet = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_TimeStop_Bullet.prototype = Object.create(my.BHell_Sprite.prototype);
    BHell_TimeStop_Bullet.prototype.constructor = BHell_TimeStop_Bullet;
    BHell_TimeStop_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
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
        this.num=0;
        this.moveTime = 200;
        this.dif=10
        if (params != null) {
            speed = params.speed || speed;
            sprite = params.sprite || sprite;
            index = params.index || index;
            direction = params.direction || direction;
            frame = params.frame || frame;
            this.num = params.num || this.num;
            this.moveTime = params.moveTime || this.moveTime;
            this.dif = params.dif || this.dif;
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
        this.stoppable="false";
        
    };
    /**
     * Updates the bullet's position. If it leaves the screen, it's destroyed.
     */
    BHell_TimeStop_Bullet.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        if(my.player.Timestop==false){
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            if (this.y < -this.height || this.y > Graphics.height + this.height || this.x < -this.width || this.x > Graphics.width + this.width) {
            this.outsideMap = true;
            }
        }
        else if(this.stoppable=="false"&&my.player.Timestop==true){
            this.frameCounter++;

            if(this.frameCounter<(this.moveTime-(this.dif*this.num))){
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                if (this.y < -this.height || this.y > Graphics.height + this.height || this.x < -this.width || this.x > Graphics.width + this.width) {
                this.outsideMap = true;
            }
            else{this.stoppable=="true"};
            }
        }
    };
    // Add effects on bullet hit by V.L.
    BHell_TimeStop_Bullet.prototype.hit_effect = function() {
        my.effects.push(new my.BHell_Hit_Effect(this.x, this.y, this.sprite, this.index, this.parent, my.effects));
    };
    BHell_TimeStop_Bullet.prototype.isOutsideMap = function () {
        return this.outsideMap;
    };
    
    /**
     * Removes the bullet from the screen and from its container.
     */
    BHell_TimeStop_Bullet.prototype.destroy = function() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.bulletList.splice(this.bulletList.indexOf(this), 1);
    };
    
    return my;
} (BHell || {}));
//=============================================================================
// TimeStop Bullet(i dont know why there are two and im too scared to delete em)
//=============================================================================
var BHell = (function (my) {
    var BHell_TimeStop_Bullet = my.BHell_TimeStop_Bullet = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_TimeStop_Bullet.prototype = Object.create(my.BHell_Sprite.prototype);
    BHell_TimeStop_Bullet.prototype.constructor = BHell_TimeStop_Bullet;
    BHell_TimeStop_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
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
        this.num=0;
        this.moveTime = 200;
        this.dif=10
        if (params != null) {
            speed = params.speed || speed;
            sprite = params.sprite || sprite;
            index = params.index || index;
            direction = params.direction || direction;
            frame = params.frame || frame;
            this.num = params.num || this.num;
            this.moveTime = params.moveTime || this.moveTime;
            this.dif = params.dif || this.dif;
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
        this.stoppable="false";
        
    };
    /**
     * Updates the bullet's position. If it leaves the screen, it's destroyed.
     */
    BHell_TimeStop_Bullet.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        if(my.player.Timestop==false){
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            if (this.y < -this.height-200 || this.y > Graphics.height + this.height+200 || this.x < -this.width-200 || this.x > Graphics.width+200 + this.width) {
            this.outsideMap = true;
            }
        }
        else if(this.stoppable=="false"&&my.player.Timestop==true){
            this.frameCounter++;

            if(this.frameCounter<(this.moveTime-(this.dif*this.num))){
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                if (this.y < -this.height-200 || this.y > Graphics.height + this.height+200 || this.x < -this.width-200 || this.x > Graphics.width+200 + this.width) {
                this.outsideMap = true;
            }
            else{this.stoppable=="true"};
            }
        }
    };
    // Add effects on bullet hit by V.L.
    BHell_TimeStop_Bullet.prototype.hit_effect = function() {
        my.effects.push(new my.BHell_Hit_Effect(this.x, this.y, this.sprite, this.index, this.parent, my.effects));
    };
    BHell_TimeStop_Bullet.prototype.isOutsideMap = function () {
        return this.outsideMap;
    };
    
    /**
     * Removes the bullet from the screen and from its container.
     */
    BHell_TimeStop_Bullet.prototype.destroy = function() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.bulletList.splice(this.bulletList.indexOf(this), 1);
    };
    
    return my;
} (BHell || {}));
//=============================================================================
// TimeStop Direction ChangeBullet
//=============================================================================
var BHell = (function (my) {
    var BHell_TimeStopDC_Bullet = my.BHell_TimeStopDC_Bullet = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_TimeStopDC_Bullet.prototype = Object.create(my.BHell_TimeStop_Bullet.prototype);
    BHell_TimeStopDC_Bullet.prototype.constructor = BHell_TimeStopDC_Bullet;
    BHell_TimeStopDC_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
        my.BHell_TimeStop_Bullet.prototype.initialize.call(this, x, y, angle, params, bulletList);
    };
    BHell_TimeStopDC_Bullet.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        if(my.player.Timestop==false){
            this.x += Math.cos(this.angle+(Math.PI/2)) * this.speed;
            this.y += Math.sin(this.angle+(Math.PI/2)) * this.speed;
            if (this.y < -this.height-200 || this.y > Graphics.height + this.height+200 || this.x < -this.width-200 || this.x > Graphics.width+200 + this.width) {
            this.outsideMap = true;
            }
        }
        else if(this.stoppable=="false"&&my.player.Timestop==true){
            this.frameCounter++;

            if(this.frameCounter<(this.moveTime-(this.dif*this.num))){
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                if (this.y < -this.height-200 || this.y > Graphics.height + this.height+200 || this.x < -this.width-200 || this.x > Graphics.width+200 + this.width) {
                this.outsideMap = true;
            }
            else{this.stoppable=="true"};
            }
        }
    };
    return my;
} (BHell || {}));
//=============================================================================
// Direction ChangeBullet
//=============================================================================
var BHell = (function (my) {
    var BHell_DC_Bullet = my.BHell_DC_Bullet = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_DC_Bullet.prototype = Object.create(my.BHell_TimeStop_Bullet.prototype);
    BHell_DC_Bullet.prototype.constructor = BHell_DC_Bullet;
    BHell_DC_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
        my.BHell_TimeStop_Bullet.prototype.initialize.call(this, x, y, angle, params, bulletList);
        this.type="default";
        if(params!=null){
            this.type=params.type||this.ype;
        }
    };
    BHell_DC_Bullet.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        switch(this.type){
            case"default":
            if(my.player.Timestop==false){
                this.x += Math.cos(this.angle+(Math.PI/2)) * this.speed;
                this.y += Math.sin(this.angle+(Math.PI/2)) * this.speed;
                if (this.y < -this.height || this.y > Graphics.height + this.height || this.x < -this.width || this.x > Graphics.width + this.width) {
                this.outsideMap = true;
                }
            }
            else if(this.stoppable=="false"&&my.player.Timestop==true){
                this.frameCounter++;

                if(this.frameCounter<(this.moveTime-(this.dif*this.num))){
                    this.x += Math.cos(this.angle) * this.speed;
                    this.y += Math.sin(this.angle) * this.speed;
                    if (this.y < -this.height || this.y > Graphics.height + this.height || this.x < -this.width || this.x > Graphics.width + this.width) {
                    this.outsideMap = true;
                }
                else{this.stoppable=="true"};
                }
            }
            break;
        }
    };
    return my;
} (BHell || {}));
//=============================================================================
// TimeStop ReverseBullet
//=============================================================================
var BHell = (function (my) {
    var BHell_TimeStopR_Bullet = my.BHell_TimeStopR_Bullet = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_TimeStopR_Bullet.prototype = Object.create(my.BHell_TimeStop_Bullet.prototype);
    BHell_TimeStopR_Bullet.prototype.constructor = BHell_TimeStopR_Bullet;
    BHell_TimeStopR_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
        my.BHell_TimeStop_Bullet.prototype.initialize.call(this, x, y, angle, params, bulletList);
    };
    BHell_TimeStopR_Bullet.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        if(my.player.Timestop==false){
            this.x += Math.cos(this.angle) * -this.speed;
            this.y += Math.sin(this.angle) * -this.speed;
            if (this.y < -this.height-200 || this.y > Graphics.height + this.height+200 || this.x < -this.width-200 || this.x > Graphics.width+200 + this.width) {
            this.outsideMap = true;
            }
        }
        else if(this.stoppable=="false"&&my.player.Timestop==true){
            this.frameCounter++;

            if(this.frameCounter<(this.moveTime-(this.dif*this.num))){
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                if (this.y < -this.height-200 || this.y > Graphics.height + this.height+200 || this.x < -this.width-200 || this.x > Graphics.width+200 + this.width) {
                this.outsideMap = true;
            }
            else{this.stoppable=="true"};
            }
        }
    };
    return my;
} (BHell || {}));
//=============================================================================
// Animism Emitter(kinda used mostly just a spray emitter with some of the above custom bullets wanted to do more with it but time wont let me :')
//=============================================================================
var BHell = (function (my) {
	var BHell_Emitter_Animism = my.BHell_Emitter_Animism = function () {
        this.initialize.apply(this, arguments);       
    };

    BHell_Emitter_Animism.prototype = Object.create(my.BHell_Emitter_Spray.prototype);
    BHell_Emitter_Animism.prototype.constructor = BHell_Emitter_Animism;


    BHell_Emitter_Animism.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Spray.prototype.initialize.call(this, x, y, params, parent, bulletList);         
    };

    BHell_Emitter_Animism.prototype.shoot = function () {
        this.bulletParams.reverse=1;
        for (var k = 0; k < this.n; k++) {
            var bullet;
            switch(this.bullettype){
                case "default":
                    if (this.aim) {
                        if (this.alwaysAim || this.oldShooting === false) {
                            var dx = my.player.x - this.x + this.aimX;
                            var dy = my.player.y - this.y + this.aimY;
                            this.aimingAngle = Math.atan2(dy, dx);
                        }
                        bullet = new my.BHell_TimeStopDC_Bullet(this.x, this.y, this.aimingAngle - (this.b - this.a) / 2 + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList);
                    }
                    else {
                        bullet = new my.BHell_TimeStopDC_Bullets(this.x, this.y, this.a + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList);
                    }
                    break;
                case "vic1":
                    if (this.aim) {
                        if (this.alwaysAim || this.oldShooting === false) {
                            var dx = my.player.x - this.x + this.aimX;
                            var dy = my.player.y - this.y + this.aimY;
                            this.aimingAngle = Math.atan2(dy, dx);
                        }
                        bullet = new my.BHell_TimeStopDC_Bullet(this.x, this.y, this.aimingAngle - (this.b - this.a) / 2 + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList);
                    }
                    else {
                        bullet = new my.BHell_TimeStopDC_Bullet(this.x, this.y, this.a + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList);
                    }
                    break;
            }
            this.parent.addChild(bullet);
            this.bulletList.push(bullet);
        }
    };
    return my;
} (BHell || {}));