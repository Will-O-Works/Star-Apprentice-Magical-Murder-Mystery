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
        params.hp = 75;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 386; //change to adjust hitbox width
        params.hitbox_h = 75; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =0;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeBrick(parent);

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 225, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony1_p1.prototype.initializeBrick = function () {
        this.spawnNumber=5;
        this.spawnCounter = 0;
    };
    BHell_Enemy_VictoriaTestimony1_p1.prototype.updateBrick = function() {
        console.log("updateBrick");
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
            console.log("made a brick");
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
        my.player.PhaseOver = true;
        my.player.nextMap = Number(9);
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_VictoriaTestimony1_p1.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        //this is to allow for angry mode if bomb is used wrong
        if (my.player.bombed == true  && this.state !== "bombed") {
			my.controller.destroyEnemyBullets(); 
			this.timer = 0; 
			this.hp = 999;  // Give the line a large hp so itd doesn't get destroyed when bomb is used 
			this.state = "bombed";
        }
        if (this.state !== "dying" && this.state !== "bombed") {
            this.move();
        }
        switch (this.state) {
            case "started":
                if (this.mover.inPosition === true) {
                    this.state = "pattern 1";
                    this.frameCounter = 0;
                }
                break;
            case "pattern 1":
                if(this.frameCounter%120===0)
                {
                    this.updateBrick();
                }
                break;
            case "dying":
                this.destroy();
                break;
			case "bombed":  
				this.timer = (this.timer + 1) % 1200;
				this.shoot(false);
				if (this.timer > 70) {
					my.controller.generators = [];
					my.controller.activeGenerators = [];
					this.destroy();
				}
				else if (this.timer % 10 === 0) {  // Explosion on the line effect 
					my.explosions.push(new my.BHell_Explosion(Math.floor(Math.random() * this.hitboxW) + this.x - this.hitboxW / 2, Math.floor(Math.random() * this.hitboxH) + this.y - this.hitboxH / 2, this.parent, my.explosions));
				}
				break;
        }; 
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = (this.frameCounter + 1) % 1200;
    };
    return my;
} (BHell || {}));
//=============================================================================
// VictoriaTestimony2 Pattern 
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
        this.frameCounter =0;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeBrick(parent);

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 225, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.initializeDolla = function () {
        this.spawnNumber=5;
        this.spawnCounter = 0;
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.updateBrick = function() {
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony2_p1.prototype.destroy = function() {
        my.player.PhaseOver = true;
        my.player.nextMap = Number(9);
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        //this is to allow for angry mode if bomb is used wrong
        if (my.player.bombed == true  && this.state !== "bombed") {
			my.controller.destroyEnemyBullets(); 
			this.timer = 0; 
			this.hp = 999;  // Give the line a large hp so itd doesn't get destroyed when bomb is used 
			this.state = "bombed";
        }
        if (this.state !== "dying" && this.state !== "bombed") {
            this.move();
        }
        switch (this.state) {
            case "started":
                if (this.mover.inPosition === true) {
                    this.state = "pattern 1";
                    this.frameCounter = 0;
                }
                break;
            case "pattern 1":
                if(this.frameCounter%120===0)
                {
                    this.updateBrick();
                }
                break;
            case "dying":
                this.destroy();
                break;
			case "bombed":  
				this.timer = (this.timer + 1) % 1200;
				this.shoot(false);
				if (this.timer > 70) {
					my.controller.generators = [];
					my.controller.activeGenerators = [];
					this.destroy();
				}
				else if (this.timer % 10 === 0) {  // Explosion on the line effect 
					my.explosions.push(new my.BHell_Explosion(Math.floor(Math.random() * this.hitboxW) + this.x - this.hitboxW / 2, Math.floor(Math.random() * this.hitboxH) + this.y - this.hitboxH / 2, this.parent, my.explosions));
				}
				break;
        }; 
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = (this.frameCounter + 1) % 1200;
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