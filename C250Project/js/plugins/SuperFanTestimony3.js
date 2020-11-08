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
		for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(120+(4*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth;i<(this.totalWidth*2)-12;i++){
                    this.emitters[i].shoot(this.emitters,true);
				};
				for(var i =(this.totalWidth)+12;i<(this.totalWidth*2);i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
            }
		}
        if(this.shenanigns==true){console.log("pulling shenanigans");this.frameCounter=0;this.shenanigns=false;} 
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