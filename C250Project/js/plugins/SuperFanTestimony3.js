//=============================================================================
// SuperFanTestimony3 Pattern 1 Test
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_SuperFanTestimony3_p1 = my.BHell_Enemy_SuperFanTestimony3_p1 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_SuperFanTestimony3_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony3_p1.prototype.constructor = BHell_Enemy_SuperFanTestimony3_p1;
    BHell_Enemy_SuperFanTestimony3_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 386; //change to adjust hitbox width
        params.hitbox_h = 75; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeDollaV(parent);
        this.initializeDollaH(parent);
        this.initializeZaWarudo(parent);
        

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_SuperFanTestimony3_p1.prototype.initializeDollaV = function (parent) {
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
    BHell_Enemy_SuperFanTestimony3_p1.prototype.updateDollaV = function() {
        this.shenanigns==false;
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(60+(4*wave))) {//change to adjust block spawn rate
                for(var i =8;i<this.totalWidth-8;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
		}
		for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(90+(4*wave))) {//change to adjust block spawn rate
                for(var i =4;i<this.totalWidth-12;i++){
                    this.emitters[i].shoot(this.emitters,true);
				};
				for(var i =12;i<this.totalWidth-4;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
		}
		for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(120+(4*wave))) {//change to adjust block spawn rate
                for(var i =0;i<this.totalWidth-16;i++){
                    this.emitters[i].shoot(this.emitters,true);
				};
				for(var i =16;i<this.totalWidth;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
		}
		//----------------------------------------------------------------------
		for(var wave =0;wave<40;wave++){
            if (this.frameCounter==(270+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth;i<(this.totalWidth*2)-12;i++){
                    this.emitters[i].shoot(this.emitters,true);
				};
				for(var i =(this.totalWidth)+12;i<(this.totalWidth*2);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
        }
        for(var wave =0;wave<30;wave++){
            if (this.frameCounter==(320+(4*wave))) {//change to adjust block spawn rate
                for(var i =8;i<(this.totalWidth)-8;i++){
                    this.emitters[i].shoot(this.emitters,true);
				};
            }
		}
    };
    BHell_Enemy_SuperFanTestimony3_p1.prototype.initializeDollaH = function (parent) {
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
    BHell_Enemy_SuperFanTestimony3_p1.prototype.updateDollaH = function() {
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(150+(4*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalWidth*2)+8;i<this.totalHeight;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(150+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalHeight;i<this.totalHeight2-8;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
		}
        //----------------------------------------------------------------------
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(440+(4*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalWidth*2);i<this.totalHeight-8;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(440+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalHeight;i<this.totalHeight2-8;i++){
                    this.emitters[i].shoot(this.emitters,true);            
                };
            };
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(495+(4*wave))) {//change to adjust block spawn rate
                for(var i =(this.totalWidth*2)+8;i<this.totalHeight;i++){
                    this.emitters[i].bulletParams.speed=4.5;
                    this.emitters[i].shoot(this.emitters,true); 
                    this.emitters[i].bulletParams.speed=7;           
                };
            };
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(495+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalHeight+8;i<this.totalHeight2;i++){
                    this.emitters[i].bulletParams.speed=4.5;
                    this.emitters[i].shoot(this.emitters,true); 
                    this.emitters[i].bulletParams.speed=7;           
                };
                if(wave==3){this.shenanigns=true;}
            };
        }
        if(this.shenanigns==true){console.log("pulling shenanigans");this.frameCounter=0;this.shenanigns=false;} 
    };
    BHell_Enemy_SuperFanTestimony3_p1.prototype.initializeZaWarudo = function (parent) {
        var emitterParams={};
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;;
        emitterParams.n = 20;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 2;
        emitterParams.bullet.num = 0;
        emitterParams.rotating=true;
        emitterParams.bullet.stoppable="false";
        emitterParams.bullet.moveTime=100;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[this.totalHeight2].offsetX=300;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[this.totalHeight2+1].offsetX=-300;
    };
    BHell_Enemy_SuperFanTestimony3_p1.prototype.updateZaWarudo = function() {
        if(this.frameCounter==270){
            my.player.Timestop=true;
        }
        if(this.frameCounter%20 == 0&&my.player.Timestop==true&&this.frameCounter<370)
        {
            this.emitters[this.totalHeight2].shoot(true);
            this.emitters[this.totalHeight2].bulletParams.num++;
            this.emitters[this.totalHeight2+1].shoot(true);
            this.emitters[this.totalHeight2+1].bulletParams.num++;
        }
        if(this.frameCounter==400){
            my.player.Timestop=false;
        }
    };
    BHell_Enemy_SuperFanTestimony3_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_SuperFanTestimony3_p1.prototype.destroy = function() {
        my.player.PhaseOver = true;
        my.player.nextMap = Number(8);
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_SuperFanTestimony3_p1.prototype.update = function () {
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
		this.frameCounter = ((this.frameCounter) % 1200)+1;
	};
    return my;
} (BHell || {}));
//=============================================================================
// VictoriaTestimony1 Pattern 2
//=============================================================================
//=============================================================================
// SuperFanTestimony1 Pattern 3
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_SuperFanTestimony3_p2 = my.BHell_Enemy_SuperFanTestimony3_p2 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony3_p2.prototype.constructor = BHell_Enemy_SuperFanTestimony3_p2;
	BHell_Enemy_SuperFanTestimony3_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 45;//change to adjust Line HP
        params.speed = 3.5; // change to adjust speed of boss moving 
        params.hitbox_w = 410; // change to adjust hitbox width
        params.hitbox_h = 80; // change to adjust hitbox heights
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
		/* set player.can_bomb to true by V.L. */
		
		this.p = 16; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still((Graphics.width / 2)+6, 125, 0, this.hitboxW, this.hitboxH);
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype.initializeEmitters = function (parent) {
        var emitterParams = {};
        emitterParams.aim=false;
        emitterParams.alwaysAim=false;
        emitterParams.bullet={};
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
    BHell_Enemy_SuperFanTestimony3_p2.prototype.updateEmitters = function (parent) {
        if(this.frameCounter%10==0){
            for (let index = 0; index < 10; index++) {
                this.emitters[index].shoot(true);
            }
        }
    };
	BHell_Enemy_SuperFanTestimony3_p2.prototype.initializeBrick = function (parent) {
        this.spawnNumber=6;
        this.spawnCounter = 0;
        this.lineNum=2;
        this.wallSize = (this.spawnNumber/this.lineNum)-1;
	};
	//initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_SuperFanTestimony3_p2.prototype.updateBrick = function (frameCounter) {
        while (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$Cat","direction":2,"pattern":2,"characterIndex":2};
            var params = {};
            params.animated = false;
            params.frame = 2;
            params.speed =4;
            params.hp = 999;
            params.wallSize=this.wallSize;
            params.Xposition =  ((this.spawnCounter-1)%(this.spawnNumber/this.lineNum));
            params.posX = this.x+(this.wallSize*25)-(50*((this.spawnCounter-1)%(this.spawnNumber/this.lineNum)));
            params.posY=this.y+150-(50*Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            params.bullet = {};
            my.controller.enemies.push(new my.BHell_Enemy_BrickFollow(this.x, this.y, image, params, this.parent, my.controller.enemies,frameCounter));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
            my.controller.enemies[1].destroy();
            }
        }  
    };
    BHell_Enemy_SuperFanTestimony3_p2.prototype.initializeSwipe = function (parent) {
		this.p = 2; 
        var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 4;
        emitterParams.bullet.direction = 2;
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

    BHell_Enemy_SuperFanTestimony3_p2.prototype.updateSwipe = function() {
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
	BHell_Enemy_SuperFanTestimony3_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};	
	BHell_Enemy_SuperFanTestimony3_p2.prototype.destroy = function() {
        while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}	
        my.BHell_Enemy_Base.prototype.destroy.call(this);
    };	
	//main update loop
	BHell_Enemy_SuperFanTestimony3_p2.prototype.update = function () {
		
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