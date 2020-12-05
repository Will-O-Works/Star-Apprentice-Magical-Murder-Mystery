//=============================================================================
// VictoriaTestimony2 Pattern 1 Test
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony2_p1 = my.BHell_Enemy_VictoriaTestimony2_p1 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony2_p1.prototype.constructor = BHell_Enemy_VictoriaTestimony2_p1;
    BHell_Enemy_VictoriaTestimony2_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 5; //change to adjust speed of boss moving 
        params.hitbox_w = 282; //change to adjust hitbox width
        params.hitbox_h = 74; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeDolla(parent);
        this.initializeZaWarudo(parent);
        this.initializeBrick(parent);
		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
		my.player.currentLine = 0;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.initializeDolla = function (parent) {
        var emitterParams = {};
        emitterParams.angle = Math.PI/2;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite = "$VictoriaBullets1";
        emitterParams.bullet.direction = 8;
        emitterParams.bullet.speed = 4;
        emitterParams.aim =false;
        emitterParams.alwaysAim=false;
        emitterParams.bullet.shape="rectangle";
        emitterParams.bullet.hitboxheight=20;
        emitterParams.bullet.hitboxwidth=20;
        this.totalWidth =20;
        for(var i =0;i<this.totalWidth;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = 280-(i*30);
            this.emitters[i].offsetY = -100
        }
        var emitterParams = {};
        emitterParams.angle = Math.PI/2;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite = "$VictoriaBullets1";
        emitterParams.bullet.direction = 8;
        emitterParams.bullet.speed = 3;
        emitterParams.aim =false;
        emitterParams.alwaysAim=false;
        emitterParams.angle = 3*Math.PI/2;
        emitterParams.bullet.hitboxshape="rectangle";
        emitterParams.bullet.hitboxheight=20;
        emitterParams.bullet.hitboxwidth=20;
        for(var i =this.totalWidth;i<(this.totalWidth*2);i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = 280-((i%this.totalWidth)*30);
            this.emitters[i].offsetY = 400
        }
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.initializeZaWarudo = function (parent) {
        this.firstpause =true;
        this.stopcounter=0;
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.initializeBrick = function () {
        this.spawnNumber=1;
        this.spawnCounter = 0;
        this.lineNum=2;
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.updateDolla = function() {
        if(my.player.Timestop==false){this.shenanigns==false;
        for(var wave =0;wave<6;wave++){
            if (this.frameCounter==(60+(5*wave))) {//change to adjust block spawn rate
                for(var i =5;i<this.totalWidth-5;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<6;wave++){
            if (this.frameCounter==(60+(6*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth;i<(this.totalWidth*2)-15;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                for(var i =this.totalWidth+15;i<(this.totalWidth*2);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<8;wave++){
            if (this.frameCounter==(280+(6*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+5;i<(this.totalWidth*2)-10;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<7;wave++){
            if (this.frameCounter==(240+(5*wave))) {//change to adjust block spawn rate
                for(var i =0;i<(this.totalWidth)-15;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<10;wave++){
            if (this.frameCounter==(240+(5*wave))) {//change to adjust block spawn rate
                for(var i =10;i<(this.totalWidth)-5;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<15;wave++){
            if (this.frameCounter==(320+(6*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+15;i<(this.totalWidth*2);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        
        // //-----------------------------------------
        for(var wave =0;wave<15;wave++){
            if (this.frameCounter==(340+(5*wave))) {//change to adjust block spawn rate
                for(var i =10;i<(this.totalWidth-5);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<10;wave++){
            if (this.frameCounter==(420+(6*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+5;i<(this.totalWidth*2)-10;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<10;wave++){
            if (this.frameCounter==(460+(5*wave))) {//change to adjust block spawn rate
                for(var i =0;i<(this.totalWidth-15);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                if(wave==9){this.shenanigns=true;}
            };
        };
        if(this.shenanigns==true&&this.frameCounter==580){console.log("pulling shenanigans");this.frameCounter=0;this.stopcounter=0;this.shenanigns=false;}}    
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.updateBrick = function () {
        if (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$JeevesSmall","direction":2,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 0;
            params.speed =5;
            params.hp = 8;
            params.moveTime=50;
            params.dif=10;
            params.period=25;
            params.waveNum=2;
            params.type="triangle";
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x, this.y, image, params, this.parent, my.controller.enemies));
                my.controller.enemies[1].destroy();
            }
            else{
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x+350, this.y+160, image, params, this.parent, my.controller.enemies));
                my.controller.enemies.push(new my.BHell_Enemy_TSBrick(this.x-350, this.y+160, image, params, this.parent, my.controller.enemies));
            }
        }  
	};
    BHell_Enemy_VictoriaTestimony2_p1.prototype.updateZaWarudo = function() {
        if(this.stopcounter==100){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
            this.spawnCounter = 0;
        }
        if(this.stopcounter%3 == 0&&my.player.Timestop==true&&this.stopcounter<370)
        {
            this.updateBrick();            
        }
        if(this.stopcounter==210){
            my.player.Timestop=false;
            console.log(my.player.immortalTimeout);
            my.player.immortalityTimer-30;
            this.frameCounter-=110;
        }
        this.stopcounter++;
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
    };
	BHell_Enemy_VictoriaTestimony2_p1.prototype.destroy = function() {
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.update = function () {
		
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
                this.updateDolla(); 
                this.updateZaWarudo();
				break;
			case "dying": // die.
				this.destroy();
				break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = ((this.frameCounter) % 1200)+1;
	};
    return my;
} (BHell || {}));
//=============================================================================
// VictoriaTestimony2 Pattern 2 Test
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony2_p2 = my.BHell_Enemy_VictoriaTestimony2_p2 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony2_p2.prototype.constructor = BHell_Enemy_VictoriaTestimony2_p2;
    BHell_Enemy_VictoriaTestimony2_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 5; //change to adjust speed of boss moving 
        params.hitbox_w = 368; //change to adjust hitbox width
        params.hitbox_h = 83; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeDolla(parent);
        this.initializeZaWarudo(parent);
        this.initializeBrick(parent);
        this.stopCounter=0;

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = true;
		my.player.currentLine = 1;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype.initializeDolla = function (parent) {
        var emitterParams = {};
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBulletsTemp"
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 5;
        emitterParams.aim =false;
        emitterParams.alwaysAim=false;
        this.totalWidth =16;
        for(var i =0;i<this.totalWidth;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = -500;
            this.emitters[i].offsetY = 70+(i*20);
        }
        emitterParams.angle = Math.PI;
        for(var i =this.totalWidth;i<this.totalWidth*2;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = 500;
            this.emitters[i].offsetY = 70+((i%this.totalWidth)*20);
        }
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype.initializeZaWarudo = function (parent) {
        this.firstpause =true;
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype.initializeBrick = function () {
        this.spawnNumber=1;
        this.spawnCounter = 0;
        this.lineNum=2;
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype.updateDolla = function() {
        if(my.player.Timestop==false){this.shenanigns = false;
        for(var wave =0;wave<7;wave++){
            if (this.frameCounter==(60+(6*wave))) {//change to adjust block spawn rate
                for(var i =11;i<this.totalWidth;i++){            
                    this.emitters[i].shoot(this.emitters,true);             
                };
            };
        }
        for(var wave =0;wave<7;wave++){
            if (this.frameCounter==(60+(6*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+8;i<(this.totalWidth*2)-5;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        }
        for(var wave =0;wave<12;wave++){
            if (this.frameCounter==(100+(6*wave))) {//change to adjust block spawn rate
                for(var i =4;i<this.totalWidth-8;i++){            
                    this.emitters[i].shoot(this.emitters,true);             
                };
            };
        }
        for(var wave =0;wave<12;wave++){
            if (this.frameCounter==(110+(6*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth;i<(this.totalWidth*2)-12;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        }
        for(var wave =0;wave<10;wave++){
            if (this.frameCounter==(195+(6*wave))) {//change to adjust block spawn rate
                for(var i =3;i<(this.totalWidth)-6;i++){
                    //this.emitters[i].bulletParams.speed=7;
                    this.emitters[i].shoot(this.emitters,true);
                    //this.emitters[i].bulletParams.speed=7;
                };
            };
        }
        for(var wave=0;wave<10;wave++){
            if (this.frameCounter==(230+(6*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth;i<(this.totalWidth*2)-13;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        }
        for(var wave=0;wave<10;wave++){
            if (this.frameCounter==(290+(6*wave))) {//change to adjust block spawn rate
                for(var i =0;i<(this.totalWidth-13);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                for(var i =this.totalWidth+8;i<(this.totalWidth*2);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        }
        // //---------------------------------------------------------------------------------------
        for(var wave=0;wave<5;wave++){
            if (this.frameCounter==(410+(5*wave))) {//change to adjust block spawn rate
                for(var i =0;i<(this.totalWidth-12);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        };
        for(var wave=0;wave<5;wave++){
            if (this.frameCounter==(430+(5*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+4;i<(this.totalWidth*2)-8;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        };
        for(var wave=0;wave<5;wave++){
            if (this.frameCounter==(440+(5*wave))) {//change to adjust block spawn rate
                for(var i =8;i<(this.totalWidth-4);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        };
        for(var wave=0;wave<5;wave++){
            if (this.frameCounter==(420+(5*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+12;i<(this.totalWidth*2);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        };
        //---------------------------------------------------------------------------------------
        for(var wave=0;wave<5;wave++){
            if (this.frameCounter==(500+(7*wave))) {//change to adjust block spawn rate
                for(var i =1;i<(this.totalWidth)-2;i++){
                    this.emitters[i].bulletParams.speed=3;
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        };
        for(var wave=0;wave<5;wave++){
            if (this.frameCounter==(500+(7*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+1;i<(this.totalWidth*2)-2;i++){
                    this.emitters[i].bulletParams.speed=3;
                    this.emitters[i].shoot(this.emitters,true);
                };
                if(wave==5){this.shenanigns=true;}
            };
        };
        if(this.shenanigns==true){console.log("pulling shenanigans");this.frameCounter=0;this.shenanigns=false;}}        
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype.updateBrick = function () {
        if (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$JeevesSmall","direction":2,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 0;
            params.speed =5;
            params.hp = 8;
            params.moveTime=50;
            params.dif=10;
            params.period=25;
            params.waveNum=2;
            params.type="triangle";
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
    BHell_Enemy_VictoriaTestimony2_p2.prototype.updateZaWarudo = function() {
        if(this.stopCounter==100){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
            this.spawnCounter = 0;
        }
        if(this.stopCounter%3 == 0&&my.player.Timestop==true&&this.stopCounter<370)
        {
            this.updateBrick();            
        }
        if(this.stopCounter==210){
            my.player.Timestop=false;
            this.frameCounter-=110;
            console.log(my.player.immortalTimeout);
            my.player.immortalityTimer-50;
        }
        this.stopCounter++;
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony2_p2.prototype.destroy = function() {
        my.player.PhaseOver = true;
        my.player.nextMap = Number(51);
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype.update = function () {
		
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
			}
			if (my.player.bombed == true && this.state !== "bombed") {
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
                this.updateDolla();
                this.updateZaWarudo();
				break;
			case "dying": // die.
				this.destroy();
                break;
            case "bombed":  
                this.timer = (this.timer + 1) % 1200;
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
        this.frameCounter++
        if(this.frameCounter%600==0){
            this.stopCounter=0;
            this.frameCounter=0
        }
		
	};
    return my;
} (BHell || {}));
//=============================================================================
// VictoriaTestimony2 Pattern 3 Test
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony2_p3 = my.BHell_Enemy_VictoriaTestimony2_p3 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony2_p3.prototype.constructor = BHell_Enemy_VictoriaTestimony2_p3;
    BHell_Enemy_VictoriaTestimony2_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 472; //change to adjust hitbox width
        params.hitbox_h = 78; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeDollaV(parent);
        this.initializeDollaH(parent);
        this.initializeZaWarudo(parent);
        this.initializeBrick(parent);
        this.stopCounter=0;
        

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
		my.player.currentLine = 2;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.initializeDollaV = function (parent) {
        var emitterParams = {};
        emitterParams.angle = Math.PI/2;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite = "$VictoriaBullets1";
        emitterParams.bullet.direction = 8;
        emitterParams.bullet.speed = 3;
        emitterParams.aim =false;
        emitterParams.alwaysAim=false;
        this.totalWidth =20;
        for(var i =0;i<this.totalWidth;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = 280-(i*30);
            this.emitters[i].offsetY = -100
        }
        emitterParams.angle = 3*Math.PI/2;
        for(var i =this.totalWidth;i<(this.totalWidth*2);i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = 280-((i%this.totalWidth)*30);
            this.emitters[i].offsetY = 400
        }
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.updateDollaV = function() {
        if(my.player.Timestop==false){this.shenanigns==false;
            for(var wave =0;wave<12;wave++){
                if (this.frameCounter==(120+(6*wave))) {//change to adjust block spawn rate
                    for(var i =6;i<this.totalWidth-6;i++){
                        this.emitters[i].shoot(this.emitters,true);
                    };
                }
            }
            for(var wave =0;wave<6;wave++){
                if (this.frameCounter==(230+(6*wave))) {//change to adjust block spawn rate
                    for(var i =this.totalWidth;i<(this.totalWidth*2)-14;i++){
                        this.emitters[i].shoot(this.emitters,true);
                    };
                    for(var i =this.totalWidth+14;i<(this.totalWidth*2);i++){
                        this.emitters[i].shoot(this.emitters,true);
                    };
                }
            }
            //---------------------------------------------------------------------------
            for(var wave =0;wave<12;wave++){
                if (this.frameCounter==(410+(6*wave))) {//change to adjust block spawn rate
                    for(var i =5;i<this.totalWidth-5;i++){
                        this.emitters[i].shoot(this.emitters,true);
                    };
                    if(wave==11){this.shenanigns=true;}
                };
            };
            if(this.shenanigns==true){console.log("pulling shenanigans");this.frameCounter=0;this.stopCounter=0;this.shenanigns=false;}
        } 
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.initializeDollaH = function (parent) {
        var emitterParams = {};
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction = 6;
        emitterParams.bullet.speed = 5;
        emitterParams.aim =false;
        emitterParams.alwaysAim=false;
        this.totalHeight =(this.totalWidth*2)+16;
        this.totalHeight2= this.totalHeight+16;
        for(var i =this.totalWidth*2;i<this.totalHeight;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = -500;
            this.emitters[i].offsetY = 70+((i%this.totalWidth)*20);
        }
        emitterParams.angle = Math.PI;
        for(var i =this.totalHeight;i<this.totalHeight2;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = 500;
            this.emitters[i].offsetY = 70+((i%this.totalHeight)*20);
        }
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.initializeZaWarudo = function (parent) {
        this.firstpause =true;
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.updateBrick = function () {
        if (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$JeevesSmall","direction":2,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 0;
            params.speed =5;
            params.hp = 8;
            params.moveTime=50;
            params.dif=10;
            params.period=25;
            params.waveNum=3;
            params.type="triangle";
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
    BHell_Enemy_VictoriaTestimony2_p3.prototype.initializeBrick = function () {
        this.spawnNumber=1;
        this.spawnCounter = 0;
        this.lineNum=2;
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.updateDollaH = function() {
        if(my.player.Timestop==false){for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(60+(6*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalWidth*2)+4;i<this.totalHeight-3;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(60+(6*wave))) {//change to adjust block spawn rate
                for(var i =this.totalHeight+4;i<this.totalHeight2-3;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        //---------------------------------------------------------------------------
        //---------------------------------------------------------------------------
        for(var wave =0;wave<10;wave++){
            if (this.frameCounter==(280+(7*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalWidth*2)+8;i<this.totalHeight-4;i++){
                    this.emitters[i].shoot(this.emitters,true);           
                };
            };
        }
        //---------------------------------------------------------------------------
        for(var wave =0;wave<10;wave++){
            if (this.frameCounter==(280+(6*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalHeight)+12;i<this.totalHeight2;i++){
                    this.emitters[i].shoot(this.emitters,true);         
                };
            };
        }
        for(var wave =0;wave<10;wave++){
            if (this.frameCounter==(310+(6*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalHeight)+4;i<this.totalHeight2-8;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        for(var wave =0;wave<10;wave++){
            if (this.frameCounter==(310+(6*wave))) {//change to adjust block spawn rate
                
                for(var i =(this.totalWidth*2);i<this.totalHeight-12;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        };
    }
    BHell_Enemy_VictoriaTestimony2_p3.prototype.updateZaWarudo = function() {
        if(this.stopCounter==100){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
            this.spawnCounter = 0;
        }
        if(this.stopCounter%3 == 0&&my.player.Timestop==true&&this.stopCounter<370)
        {
            this.updateBrick();            
        }
        if(this.stopCounter==210){
            my.player.Timestop=false;
            this.frameCounter-=110;
            console.log(my.player.immortalTimeout);
            my.player.immortalityTimer-10;
        }
        this.stopCounter++;
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony2_p3.prototype.destroy = function() {
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.update = function () {
		
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
                this.updateDollaV(); 
                this.updateDollaH(); 
                this.updateZaWarudo();
				break;
			case "dying": // die.
				this.destroy();
				break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter++;
		if(this.frameCounter%1200==0){
            this.stopCounter=0;
            this.frameCounter=0;
        }
	};
    return my;
} (BHell || {}));
