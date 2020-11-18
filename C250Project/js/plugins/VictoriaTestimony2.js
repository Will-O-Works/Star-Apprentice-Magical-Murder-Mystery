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
        emitterParams.bullet.speed = 5;
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
    BHell_Enemy_VictoriaTestimony2_p1.prototype.updateDolla = function() {
        this.shenanigns==false;
        for(var wave =0;wave<6;wave++){
            if (this.frameCounter==(60+(4*wave))) {//change to adjust block spawn rate
                for(var i =5;i<this.totalWidth-5;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<6;wave++){
            if (this.frameCounter==(60+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth;i<(this.totalWidth*2)-15;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                for(var i =this.totalWidth+15;i<(this.totalWidth*2);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<7;wave++){
            if (this.frameCounter==(125+(4*wave))) {//change to adjust block spawn rate
                for(var i =0;i<this.totalWidth-15;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                for(var i =10;i<this.totalWidth;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<15;wave++){
            if (this.frameCounter==(180+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+5;i<(this.totalWidth*2)-10;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<8;wave++){
            if (this.frameCounter==(280+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+5;i<(this.totalWidth*2)-10;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<7;wave++){
            if (this.frameCounter==(240+(4*wave))) {//change to adjust block spawn rate
                for(var i =0;i<(this.totalWidth)-15;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<10;wave++){
            if (this.frameCounter==(240+(4*wave))) {//change to adjust block spawn rate
                for(var i =10;i<(this.totalWidth)-5;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<30;wave++){
            if (this.frameCounter==(320+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+15;i<(this.totalWidth*2);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        
        // //-----------------------------------------
        for(var wave =0;wave<50;wave++){
            if (this.frameCounter==(340+(3*wave))) {//change to adjust block spawn rate
                for(var i =10;i<(this.totalWidth-5);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<30;wave++){
            if (this.frameCounter==(420+(3*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+5;i<(this.totalWidth*2)-10;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<50;wave++){
            if (this.frameCounter==(460+(3*wave))) {//change to adjust block spawn rate
                for(var i =0;i<(this.totalWidth-15);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                if(wave==49){this.shenanigns=true;}
            };
        };
        if(this.shenanigns==true){console.log("pulling shenanigans");this.frameCounter=0;this.shenanigns=false;}    
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony2_p1.prototype.destroy = function() {
        my.player.PhaseOver = true;
        my.player.nextMap = Number(8);
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
// VictoriaTestimony2 Pattern 1 Test
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony2_p2 = my.BHell_Enemy_VictoriaTestimony2_p2 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony2_p2.prototype.constructor = BHell_Enemy_VictoriaTestimony2_p2;
    BHell_Enemy_VictoriaTestimony2_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 318; //change to adjust hitbox width
        params.hitbox_h = 83; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeDolla(parent);

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
        emitterParams.bullet.speed = 7;
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
    BHell_Enemy_VictoriaTestimony2_p2.prototype.updateDolla = function() {
        this.shenanigns = false;
        for(var wave =0;wave<7;wave++){
            if (this.frameCounter==(60+(4*wave))) {//change to adjust block spawn rate
                for(var i =12;i<this.totalWidth;i++){            
                    this.emitters[i].shoot(this.emitters,true);             
                };
            };
        }
        for(var wave =0;wave<7;wave++){
            if (this.frameCounter==(60+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+8;i<(this.totalWidth*2)-4;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        }
        for(var wave =0;wave<14;wave++){
            if (this.frameCounter==(90+(4*wave))) {//change to adjust block spawn rate
                for(var i =4;i<this.totalWidth-8;i++){            
                    this.emitters[i].shoot(this.emitters,true);             
                };
            };
        }
        for(var wave =0;wave<14;wave++){
            if (this.frameCounter==(100+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth;i<(this.totalWidth*2)-12;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        }
        for(var wave =0;wave<23;wave++){
            if (this.frameCounter==(150+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+10;i<(this.totalWidth*2);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        }
        for(var wave =0;wave<15;wave++){
            if (this.frameCounter==(185+(5*wave))) {//change to adjust block spawn rate
                for(var i =3;i<(this.totalWidth)-6;i++){
                    //this.emitters[i].bulletParams.speed=7;
                    this.emitters[i].shoot(this.emitters,true);
                    //this.emitters[i].bulletParams.speed=7;
                };
            };
        }
        for(var wave=0;wave<10;wave++){
            if (this.frameCounter==(220+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth;i<(this.totalWidth*2)-13;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        }
        for(var wave=0;wave<15;wave++){
            if (this.frameCounter==(280+(4*wave))) {//change to adjust block spawn rate
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
            if (this.frameCounter==(400+(3*wave))) {//change to adjust block spawn rate
                for(var i =0;i<(this.totalWidth-12);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        };
        for(var wave=0;wave<5;wave++){
            if (this.frameCounter==(420+(3*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+4;i<(this.totalWidth*2)-8;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        };
        for(var wave=0;wave<5;wave++){
            if (this.frameCounter==(430+(3*wave))) {//change to adjust block spawn rate
                for(var i =8;i<(this.totalWidth-4);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        };
        for(var wave=0;wave<5;wave++){
            if (this.frameCounter==(410+(3*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+12;i<(this.totalWidth*2);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        };
        //---------------------------------------------------------------------------------------
        for(var wave=0;wave<5;wave++){
            if (this.frameCounter==(480+(5*wave))) {//change to adjust block spawn rate
                for(var i =0;i<(this.totalWidth)-2;i++){
                    this.emitters[i].bulletParams.speed=6;
                    this.emitters[i].shoot(this.emitters,true);
                };
            };
        };
        for(var wave=0;wave<5;wave++){
            if (this.frameCounter==(480+(5*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth;i<(this.totalWidth*2)-2;i++){
                    this.emitters[i].bulletParams.speed=6;
                    this.emitters[i].shoot(this.emitters,true);
                };
                if(wave==24){this.shenanigns=true;}
            };
        };
        if(this.shenanigns==true){console.log("pulling shenanigans");this.frameCounter=0;this.shenanigns=false;}        
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony2_p2.prototype.destroy = function() {
        my.player.PhaseOver = true;
        my.player.nextMap = Number(38);
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
        this.frameCounter = ((this.frameCounter) % 1200)+1;
		
	};
    return my;
} (BHell || {}));
//=============================================================================
// VictoriaTestimony2 Pattern 1 Test
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
        emitterParams.bullet.speed = 5;
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
        this.shenanigns==false;
        for(var wave =0;wave<12;wave++){
            if (this.frameCounter==(120+(4*wave))) {//change to adjust block spawn rate
                for(var i =6;i<this.totalWidth-6;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<6;wave++){
            if (this.frameCounter==(220+(4*wave))) {//change to adjust block spawn rate
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
            if (this.frameCounter==(400+(4*wave))) {//change to adjust block spawn rate
                for(var i =5;i<this.totalWidth-5;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                if(wave==11){this.shenanigns=true;}
            };
        };
        if(this.shenanigns==true){console.log("pulling shenanigans");this.frameCounter=0;this.shenanigns=false;} 
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.initializeDollaH = function (parent) {
        var emitterParams = {};
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction = 6;
        emitterParams.bullet.speed = 7;
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
    BHell_Enemy_VictoriaTestimony2_p3.prototype.updateDollaH = function() {
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(60+(4*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalWidth*2)+4;i<this.totalHeight;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(60+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalHeight+4;i<this.totalHeight2;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        //---------------------------------------------------------------------------
        //---------------------------------------------------------------------------
        for(var wave =0;wave<20;wave++){
            if (this.frameCounter==(260+(4*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalWidth*2)+8;i<this.totalHeight-4;i++){
                    this.emitters[i].shoot(this.emitters,true);           
                };
            };
        }
        //---------------------------------------------------------------------------
        for(var wave =0;wave<20;wave++){
            if (this.frameCounter==(260+(4*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalHeight)+12;i<this.totalHeight2;i++){
                    this.emitters[i].shoot(this.emitters,true);         
                };
            };
        }
        for(var wave =0;wave<20;wave++){
            if (this.frameCounter==(290+(4*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalHeight)+4;i<this.totalHeight2-8;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        //---------------------------------------------------------------------------
        //---------------------------------------------------------------------------
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony2_p3.prototype.destroy = function() {
        my.player.PhaseOver = true;
        my.player.nextMap = Number(8);
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
