//=============================================================================
// VictoriaTestimony1 Pattern 1 Test
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony1_p1 = my.BHell_Enemy_VictoriaTestimony1_p1 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony1_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony1_p1.prototype.constructor = BHell_Enemy_VictoriaTestimony1_p1;
	BHell_Enemy_VictoriaTestimony1_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust Line HP
        params.speed = 4; // change to adjust speed of boss moving 
        params.hitbox_w = 410; // change to adjust hitbox width
        params.hitbox_h = 80; // change to adjust hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.bombedWrong = false;
        this.frameCounter = 0;
		this.state = "started";
		this.initializeBrick(parent);

		/* set player.can_bomb to true by V.L. */
		my.player.can_bomb = false; 
		/* set player.can_bomb to true by V.L. */
		
		this.p = 16; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);
	};
	BHell_Enemy_VictoriaTestimony1_p1.prototype.initializeBrick = function (parent) {
        this.spawnNumber=5;
        this.spawnCounter = 0;
	};
	//initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
	BHell_Enemy_VictoriaTestimony1_p1.prototype.updateBrick = function () {
        if (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$Cat","direction":2,"pattern":2,"characterIndex":2};
            var params = {};
            params.animated = true;
            params.frame = 2;
            params.speed =3;
            params.hp = 8;
            params.bullet = {};
            //params.posX = this.x+125-(50*(this.spawnCounter-1));
            params.posX = this.x;
            //params.posY=this.y+125;
            params.posY=this.y;
            //my.controller.enemies.push(new my.BHell_Enemy_BrickOrbit(this.x + 300, this.y - 82, image, params, this.parent, my.controller.enemies));
            my.controller.enemies.push(new my.BHell_Enemy_BrickOrbit(this.x, this.y, image, params, this.parent, my.controller.enemies));
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
        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(8);//the 3 here is the map number change this to whatever map number u want to transition there on victory		
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };	
	//main update loop
	BHell_Enemy_VictoriaTestimony1_p1.prototype.update = function () {
		my.BHell_Sprite.prototype.update.call(this);
			/* Copy and paste this code into update function for not-for-bomb lines V.L. */
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
					this.frameCounter = 0;
				}
				break;
			case "active": // Shoot.
                if(this.frameCounter%3===0){
                    this.updateBrick();
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
    return my;
} (BHell || {}));
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
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 386; //change to adjust hitbox width
        params.hitbox_h = 75; //change to adjust hitbox height
        params.animated = false;
        params.aim =false;
        params.alwaysAim=false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeDolla(parent);

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.initializeDolla = function (parent) {
        var emitterParams = {};
        emitterParams.angle = Math.PI/2;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 4;
        this.waveWidth =8;
        for(var i =0;i<this.waveWidth;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = 30-(i*30);
            this.emitters[i].offsetY = -100
        }
        for(var i =this.waveWidth;i<this.waveWidth*2;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = ((i%this.waveWidth)*30)-30;
            this.emitters[i].offsetY = -100;
        }
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.updateDolla = function() {
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(2+(7*wave))) {//change to adjust block spawn rate
                for(var i =0;i<this.waveWidth;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                console.log(this.frameCounter);
            }
        } 
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(58+(7*wave))) {//change to adjust block spawn rate
                for(var i =this.waveWidth;i<this.waveWidth*2;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                console.log(this.frameCounter);
            }
        }
        this.frameCounter = ((this.frameCounter) % 114)+1;
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
		
	};
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
        emitterParams.angle = this.angle;
        emitterParams.aim = this.aim;
        emitterParams.aim_x = this.aimX;
        emitterParams.aim_y = this.aimY;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),change to adjust
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),change to adjust
        emitterParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom updatechange to adjust
        emitterParams.bullet = Object.assign({}, this.bullet);
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
    BHell_Enemy_Brick.prototype.hit = function () {
        my.BHell_Enemy_Base.prototype.hit.call(this);
        if (this.frameCounter%5===0)
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
// Brick Emitter with orbit
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_BrickOrbit = my.BHell_Enemy_BrickOrbit = function() {
        this.initialize.apply(this, arguments);
    };
    
    BHell_Enemy_BrickOrbit.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_BrickOrbit.prototype.constructor = BHell_Enemy_BrickOrbit;
    
    BHell_Enemy_BrickOrbit.prototype.initialize = function (x, y, image, params, parent, enemyList) {
        this.frameCounter =0;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.mover = new my.BHell_Mover_SOrbit(150, false, params.posX,params.posY);
    
        var emitterParams = {};
        emitterParams.x = 0;
        emitterParams.y = 0;
        emitterParams.period = this.period;
        emitterParams.angle = this.angle;
        emitterParams.aim = this.aim;
        emitterParams.aim_x = this.aimX;
        emitterParams.aim_y = this.aimY;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),change to adjust
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),change to adjust
        emitterParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom updatechange to adjust
        emitterParams.bullet = Object.assign({}, this.bullet);
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
    BHell_Enemy_BrickOrbit.prototype.hit = function () {
        my.BHell_Enemy_Base.prototype.hit.call(this);
        if (this.frameCounter%5===0)
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
//=============================================================================
// SOrbit Mover
//=============================================================================
var BHell = (function (my) {
    var BHell_Mover_SOrbit = my.BHell_Mover_SOrbit = function () {
        this.initialize.apply(this, arguments);
    };
    BHell_Mover_SOrbit.prototype = Object.create(my.BHell_Mover_Base.prototype);
    BHell_Mover_SOrbit.prototype.constructor = BHell_Mover_SOrbit;

    /**
     * Constructor.
     * @param radius Orbit distance from the player.
     * @param counterclockwise If true orbits in the counterclockwise direction.
     */
    BHell_Mover_SOrbit.prototype.initialize = function (radius, counterclockwise,x,y) {
        my.BHell_Mover_Base.prototype.initialize.call(this);
        this.x=x;
        this.y=y;
        this.inPosition = false;
        this.radius = radius;
        this.counterclockwise = counterclockwise;
        this.t = 3 * Math.PI / 2;
    };

    /**
     * If the player is not ready yet (e.g. it's just been resurrected) remains still, otherwise chases the player until the set
     * radius is reached, then starts orbiting.
     * @param oldX Old x coordinate.
     * @param oldY Old y coordinate.
     * @param speed Movement speed (pixels per frame during the chase phase, degrees per frame during the orbiting phase).
     * @returns {Array}
     */
    BHell_Mover_SOrbit.prototype.move = function (oldX, oldY, speed) {
        var ret = [];

        if (my.player.justSpawned) {
            this.inPosition = false;
            this.t = 3 * Math.PI / 2;
            ret.push(oldX);
            ret.push(oldY);
        }
        else {
            if (this.inPosition) {
                ret.push(this.x + this.radius * Math.cos(this.t));
                ret.push(this.y + this.radius * Math.sin(this.t));

                if (this.counterclockwise) {
                    this.t -= speed * Math.PI / 360;
                }
                else {
                    this.t += speed * Math.PI / 360;
                }
                if (this.t > 2 * Math.PI) {
                    this.t -= 2 * Math.PI;
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
        }

        return ret;
    };
} (BHell || {}));