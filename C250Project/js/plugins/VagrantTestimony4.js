
//=============================================================================
// Homing Bullet Emitters
//=============================================================================
var BHell = (function (my) {
    /**
     * Angle emitter. Creates a single bullet traveling at an angle. Optionally aims at the player.
     * @constructor
     * @memberOf BHell
     * @extends BHell.BHell_Emitter_Base
     */
    var BHell_Emitter_Homing = my.BHell_Emitter_Homing = function () {
        this.initialize.apply(this, arguments);
    };

    BHell_Emitter_Homing.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Homing.prototype.constructor = BHell_Emitter_Homing;

    /**
     * Constructor.
     * Additional parameters:
     *
     * - angle: the bullets' traveling angle. If aiming, it will be used as an offset for the angle between the emitter and the player,
     * - aim: if true the angle is relative to the player's position (i.e. angle = 0 and aim = true: the bullets will point
     *        towards the player, angle = 0.1 and aim = true: the bullets will be shot at 0.1 radians counterclockwise, from the player's direction)
     * - always_aim: if false (and aim = true) aiming only occours when there is a raising edge (shoot(false) -> shoot(true)),
     * - aim_x aiming horizontal offset (used only if aim = true),
     * - aim_y: aiming vertical offset (used only if aim = true).
     *
     * @param x
     * @param y
     * @param params
     * @param parent
     * @param bulletList
     */
    BHell_Emitter_Homing.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);

        this.angle = 0;
        this.aim = false;
        this.alwaysAim = false;
        this.aimX = 0;
        this.aimY = 0;
        this.aimingAngle = 0;
        this.bulletParams=params.bullet;
        if (params != null) {
            this.angle = params.angle || this.angle;
            this.aim = params.aim || this.aim;
            this.alwaysAim = params.always_aim || this.alwaysAim;
            this.aimX = params.aim_x || this.aimX;
            this.aimY = params.aim_y || this.aimY;
        }
    };
    /**
     * Shoots a single bullet towards this.angle or this.angle + angle between player and emitter.
     */
    BHell_Emitter_Homing.prototype.shoot = function () {
        var bullet;
        console.log(this.bulletParams.sprite);
        if (this.aim) {
            if (this.alwaysAim || this.oldShooting === false) {
                var dx = my.player.x - this.x + this.aimX;
                var dy = my.player.y - this.y + this.aimY;
                this.aimingAngle = Math.atan2(dy, dx);
            }
            bullet = new my.BHell_HomingBullet(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
        }
        else {
            bullet = new my.BHell_HomingBullet(this.x, this.y, this.angle, this.bulletParams, this.bulletList);
        }
        this.parent.addChild(bullet);
        this.bulletList.push(bullet);
    };
    return my;
} (BHell || {}));
//=============================================================================
// Custom Bullet Class
//=============================================================================
var BHell = (function (my) {

    /**
     * Bullet class. Represents a single bullet moving straight on the map.
     * @constructor
     * @memberOf BHell
     * @extends BHell.BHell_Sprite
     */
    var BHell_HomingBullet = my.BHell_HomingBullet = function() {
        this.initialize.apply(this, arguments);
    };
    
    BHell_HomingBullet.prototype = Object.create(my.BHell_Sprite.prototype);
    BHell_HomingBullet.prototype.constructor = BHell_HomingBullet;
    
    /**
     * Constructor.
     * Parameters:
     *
     * - speed: Moving speed (in pixels per frame),
     * - sprite: Bullet's charset,
     * - index: Charset index,
     * - direction: Charset direction,
     * - frame: Initial charset frame,
     * - animated: If true, the bullet's sprite will be animated,
     * - animation_speed: Number of updates required for frame change.
     *
     * @param x Initial x coordinate.
     * @param y Initial y coordinate.
     * @param angle Moving angle.
     * @param params Parameters object.
     * @param bulletList Array in which this bullet is contained.
     */
    BHell_HomingBullet.prototype.initialize = function (x, y, angle, params, bulletList) {
        var speed = 4;
        var sprite = my.defaultBullet;
        var index = 0;
        var direction = 2;
        var frame = 0;
        var animated = false;
        var animationSpeed = 15;
        //variable added to allow adjustable hitboxs YA 2020/10/26
        this.hitboxshape = "circle";
        this.hitboxheight = 0;
        this.hitboxwidth = 0;
        this.hitboxradius = 4;
        var repeat = 10;
        this.trackerRefresh =30;
        this.pauseTime=60;
        this.nopause="false";
        if (params != null) {
            speed = params.speed || speed;
            sprite = params.sprite || sprite;
            index = params.index || index;
            direction = params.direction || direction;
            frame = params.frame || frame;
            if (params.animated !== false) {
                animated = true;
            }
            animationSpeed = params.animation_speed || animationSpeed;
            this.trackerRefresh = params.trackerRefresh || this.trackerRefresh; 
            this.pauseTime = params.pauseTime || this.pauseTime; 
            this.repeat = params.repeat || repeat;
            this.nopause = params.nopause || this.nopause;
            
        }
        my.BHell_Sprite.prototype.initialize.call(this, sprite, index, direction, frame, animated, animationSpeed);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.rotation = angle + Math.PI / 2;
    
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
        this.spotted = false
        if(this.nopause=="true"){
            this.pauseTime=0;
        }
        
        //this.seeks = 0
    };
    
    /**
     * Updates the bullet's position. If it leaves the screen, it's destroyed.
     */
    BHell_HomingBullet.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        this.counter = this.counter +1;
		if (this.repeat > 0) {
			if (this.counter%this.trackerRefresh === 0){////////change to adjust tracking rate ie: how many times it logs the players position
				var dx = my.player.x - this.x + this.aimX;
				var dy = my.player.y - this.y + this.aimY;
				this.angle = Math.atan2(dy, dx);
                this.spotted = true;
			}
			if (this.spotted === true){
                if(this.counter>this.pauseTime)////change to adjust pause
				{
					//this.seeks = this.seeks+1;
					this.counter = 0;
					this.repeat -= 1; 
					this.spotted=false;
				}
			}
			else{
				this.x += Math.cos(this.angle) * this.speed;
				this.y += Math.sin(this.angle) * this.speed;
			}
		} else{
			this.x += Math.cos(this.angle) * this.speed;
			this.y += Math.sin(this.angle) * this.speed;
		}

        

        if (this.y < -this.height || this.y > Graphics.height + this.height || this.x < -this.width || this.x > Graphics.width + this.width) {
            this.outsideMap = true;
        }
    };
    // Add effects on bullet hit by V.L.
    BHell_HomingBullet.prototype.hit_effect = function() {
        my.effects.push(new my.BHell_Hit_Effect(this.x, this.y, this.sprite, this.index, this.parent, my.effects));
    };
    BHell_HomingBullet.prototype.isOutsideMap = function () {
        return this.outsideMap;
    };
    
    /**
     * Removes the bullet from the screen and from its container.
     */
    BHell_HomingBullet.prototype.destroy = function() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.bulletList.splice(this.bulletList.indexOf(this), 1);
    };
    
    return my;
} (BHell || {}));
//=============================================================================
// VagrantLine4 Pattern1 coat
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantTestimony4_p1 = my.BHell_Enemy_VagrantTestimony4_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony4_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony4_p1.prototype.constructor = BHell_Enemy_VagrantTestimony4_p1;

    //initalize function. set sprite hitbox params here along with speed
    BHell_Enemy_VagrantTestimony4_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        my.player.currentLine = 0;
        params.hp = 85;
        params.speed = 4;
        params.hitbox_w = 340;
        params.hitbox_h = 82;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		
		my.player.can_bomb = false; 

        //for multiple emitters initalize them here:
        this.initializeCoat(parent);

        //some variables needed to change states of the boss j is a counter to keep track of time, state and recived damage are obvious
        this.frameCounter = 0;
        this.state = "started";
        this.receivedDamage = 0;
        this.bulletcounter = 0;

        //initalize the mover function which dictaes the movement pattern here:
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);
    };

    BHell_Enemy_VagrantTestimony4_p1.prototype.initializeCoat = function (parent) {
		
		this.p = 160; 
		
        var coatParams = {};
        coatParams.bullet = {};
        coatParams.bullet.speed = 7;
        coatParams.bullet.frame = 2;
        coatParams.bullet.direction = 8;
        coatParams.period = 0;
        coatParams.alwaysAim = true;
        coatParams.aim = true; 
        this.coatEmitters = [];
        this.coatEmitters.push(new my.BHell_Emitter_Homing(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[0].aimX = 100;
        this.coatEmitters[0].alwaysAim = true;
        this.coatEmitters[0].offsetX = 150;
        this.coatEmitters[0].offsetY = 50;
        this.coatEmitters.push(new my.BHell_Emitter_Homing(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[1].offsetX = -150;
        this.coatEmitters[1].offsetY = 50;
        this.coatEmitters[1].aimX = -100;
        this.coatEmitters[1].alwaysAim = true;
        this.coatEmitters.push(new my.BHell_Emitter_Homing(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[2].offsetY = -50;
        this.coatEmitters[2].offsetX = -150;
        this.coatEmitters[2].aimX = -100;
        this.coatEmitters[2].alwaysAim = true;
        this.coatEmitters.push(new my.BHell_Emitter_Homing(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[3].offsetY = -50;
        this.coatEmitters[3].offsetX = 150;
        this.coatEmitters[3].aimX = -100;
        this.coatEmitters[3].alwaysAim = true;
        var coatParams = {};
        coatParams.bullet = {};
        coatParams.bullet.speed = 4;
        coatParams.bullet.direction = 4;
        coatParams.alwaysAim = true;
        coatParams.aim = true; 
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[4].offsetX=-180;
        this.coatEmitters[4].aimX = -300;
        this.coatEmitters[4].alwaysAim = true;
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[5].offsetX=180;
        this.coatEmitters[5].aimX = 300;
        this.coatEmitters[5].alwaysAim = true;
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[6].offsetX=-220;
        this.coatEmitters[6].aimX = -340;
        this.coatEmitters[6].alwaysAim = true;
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[7].offsetX=220;
        this.coatEmitters[7].aimX = 340;
        this.coatEmitters[7].alwaysAim = true;
        var coatParams = {};
        // coatParams.a = 0;//a: Arc's initial angle (in radians),
        // coatParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),
        // coatParams.n = 8;
        // coatParams.type = "circle";
        // coatParams.bullet = {};
        // coatParams.bullet.burstcount = 6;
        // coatParams.bullet.direction = 6;
        coatParams.a = 0;//a: Arc's initial angle (in radians),
        coatParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),
        coatParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
        //this.coatEmitters.push(new my.BHell_Emitter_Split(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters.push(new my.BHell_Emitter_Spray(this.x, this.y, coatParams, parent, my.enemyBullets));
    };

    BHell_Enemy_VagrantTestimony4_p1.prototype.updateCoat = function() {
        if (this.frameCounter % 200 == 0){
            this.coatEmitters[0].shoot(this.coatEmitters,true);
            this.coatEmitters[1].shoot(this.coatEmitters,true);
            //this.coatEmitters[2].shoot(this.coatEmitters,true);
            //this.coatEmitters[3].shoot(this.coatEmitters,true);
        }
        if (this.frameCounter % 15 == 0){
            this.coatEmitters[4].shoot(this.coatEmitters,true);
            this.coatEmitters[5].shoot(this.coatEmitters,true);
            this.coatEmitters[6].shoot(this.coatEmitters,true);
            this.coatEmitters[7].shoot(this.coatEmitters,true);
        } 
        if (this.frameCounter % this.p == 0){
            this.coatEmitters[8].shoot(this.coatEmitters,true);
        }
    };

    BHell_Enemy_VagrantTestimony4_p1.prototype.move = function () {
        if (this.mover != null) {
            var p = this.mover.move(this.x, this.y, this.speed);
            this.x = p[0];
            this.y = p[1];
        }
        this.coatEmitters.forEach(e => {e.move(this.x, this.y);});
    };

    BHell_Enemy_VagrantTestimony4_p1.prototype.update = function () {
		
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
                this.p = 60; 
                this.coatEmitters[2].bulletParams.speed=5;
			}
			
			if (my.player.bombed == true) {
				this.destroy(); 
			}
			
			if (this.state !== "dying") {
                this.move();
            }
			/* Copy and paste this code into update function for not-for-bomb lines V.L. */	
		// Add this line in update function so the line is destroyed when a bomb is used by V.L.
		if (my.player.bombed == true) {
			this.destroy(); 
		}
        switch (this.state) {
            case "started":
                if(this.mover.inPosition==true){
                    this.state = "pattern 1";
                }
                break;
            case "pattern 1": // Shoots from the hands and the claws for 10 seconds, then switches to pattern 2
                this.updateCoat();
                break;
            case "dying": // Spawns explosions for 5 seconds, then dies.
                if (this.frameCounter > 30) {
                    this.destroy();
                }
                break;
        }; 

        // Update the received damage counter for the stunned state.
        this.coatEmitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = (this.frameCounter + 1) % 1200;
    }

    BHell_Enemy_VagrantTestimony4_p1.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        this.state = "dying";
        this.frameCounter = 0;
    
        my.controller.destroyEnemyBullets();
    };

    BHell_Enemy_VagrantTestimony4_p1.prototype.hit = function () {
        if (this.state !== "dying") {
            my.BHell_Enemy_Base.prototype.hit.call(this);
    
            if (this.state != "stunned") {
                this.receivedDamage++;
            }
        }
    };
    return my;
} (BHell || {}));
//=============================================================================
// VagrantLine4 Pattern2 coat
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantTestimony4_p2 = my.BHell_Enemy_VagrantTestimony4_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony4_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony4_p2.prototype.constructor = BHell_Enemy_VagrantTestimony4_p2;

    //initalize function. set sprite hitbox params here along with speed
    BHell_Enemy_VagrantTestimony4_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        my.player.currentLine = 1;
        params.hp = 85;
        params.speed = 4;
        params.hitbox_w = 410;
        params.hitbox_h = 82;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

        //for multiple emitters initalize them here:
        this.initializeCoat(parent);

        //some variables needed to change states of the boss j is a counter to keep track of time, state and recived damage are obvious
        this.frameCounter = 0;
        this.state = "started";
        this.receivedDamage = 0;
        this.bulletcounter = 0;

		my.player.can_bomb = false; 

        //initalize the mover function which dictaes the movement pattern here:
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH)
    };

    BHell_Enemy_VagrantTestimony4_p2.prototype.initializeCoat = function (parent) {
		this.p = 13; 
        var coatParams = {};
        coatParams.bullet = {};
        coatParams.bullet.speed = 7;
        coatParams.bullet.index = 0;
        coatParams.bullet.frame = 2;
        coatParams.bullet.direction = 8;
        coatParams.period = 0;
        coatParams.alwaysAim = true;
        coatParams.aim = true; 
        this.coatEmitters = [];
        this.coatEmitters.push(new my.BHell_Emitter_Homing(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.catmax =6;//change to adjust max number of cats
        this.catcount=0;
        //fine tune aiming here
        this.coatEmitters[0].aimX = 100;
        this.coatEmitters[0].alwaysAim = true;
        this.coatEmitters[0].offsetX = 150;
        this.coatEmitters.push(new my.BHell_Emitter_Homing(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[1].offsetX = -150;
        //fine tune aiming here
        coatParams.aim = false; 
        var coatParams = {};
        coatParams.bullet = {};
        coatParams.bullet.speed = 4;
        coatParams.bullet.direction = 2;
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[2].angle=Math.PI/2;
        this.coatEmitters[2].alwaysAim = false;
        this.coatEmitters[2].offsetX = -150;
        this.coatEmitters[3].angle=Math.PI/2;
        this.coatEmitters[3].alwaysAim = false;
        this.coatEmitters[3].offsetX= 150;
        this.angl1=-(Math.PI/40);
        this.angl2=(Math.PI/40);
        this.flip=false;
        var coatParams = {};
        coatParams.bullet = {};
        coatParams.bullet.speed = 4;
        coatParams.bullet.direction = 4;
        coatParams.bullettype="vagrant";
        coatParams.bullet.amp=4;
        coatParams.bullet.period=60;
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        var coatParams = {};
        coatParams.bullet = {};
        coatParams.bullet.speed = 4;
        coatParams.bullet.direction = 4;
        coatParams.bullettype="vagrant";
        coatParams.bullet.amp=4;
        coatParams.bullet.period=60;
        coatParams.bullet.reverse=-1;
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[5].angle=Math.PI/2;
        this.coatEmitters[5].alwaysAim = false;
        this.coatEmitters[5].offsetX = 280;
        this.coatEmitters[4].angle=Math.PI/2;
        this.coatEmitters[4].alwaysAim = false;
        this.coatEmitters[4].offsetX= 300;
        this.coatEmitters[6].angle=Math.PI/2;
        this.coatEmitters[6].alwaysAim = false;
        this.coatEmitters[6].offsetX = -280;
        this.coatEmitters[7].angle=Math.PI/2;
        this.coatEmitters[7].alwaysAim = false;
        this.coatEmitters[7].offsetX= -300;
    };

    BHell_Enemy_VagrantTestimony4_p2.prototype.updateCoat = function() {
        if (this.frameCounter % 125 == 0&&this.catcount<=this.catmax){
            this.catcount++;
            this.coatEmitters[0].shoot(this.coatEmitters,true);
            this.coatEmitters[1].shoot(this.coatEmitters,true);
        }
        if (this.frameCounter % 10 == 0){
            this.coatEmitters[4].shoot(this.coatEmitters,true);
            this.coatEmitters[5].shoot(this.coatEmitters,true);
            this.coatEmitters[6].shoot(this.coatEmitters,true);
            this.coatEmitters[7].shoot(this.coatEmitters,true);
        }
        if (this.frameCounter % this.p == 0){
            this.coatEmitters[2].shoot(this.coatEmitters,true);
            this.coatEmitters[3].shoot(this.coatEmitters,true);
            if(this.coatEmitters[2].angle>=Math.PI||this.coatEmitters[2].angle<=0)
            {
                this.flip=true;
            }
            if(this.flip==true)
            {
                this.angl1=-(this.angl1);
                this.angl2=-(this.angl1);
                this.flip = false;
            }
            this.coatEmitters[2].angle+=this.angl1;
            this.coatEmitters[3].angle+=this.angl2;
        }
        
    };

    BHell_Enemy_VagrantTestimony4_p2.prototype.move = function () {
        if (this.mover != null) {
            var p = this.mover.move(this.x, this.y, this.speed);
            this.x = p[0];
            this.y = p[1];
        }
        this.coatEmitters.forEach(e => {e.move(this.x, this.y);});
    };

    BHell_Enemy_VagrantTestimony4_p2.prototype.update = function () {
		
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
				this.coatEmitters[2].bulletParams.speed = 5; 
				this.coatEmitters[3].bulletParams.speed = 5; 
				this.p = 8; 
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
                if(this.mover.inPosition==true){
                    this.state = "pattern 1";
                }
                //this.updateCoat();
                break;
            case "pattern 1": // Shoots from the hands and the claws for 10 seconds, then switches to pattern 2
                this.updateCoat();
                break;
            case "dying": // Spawns explosions for 5 seconds, then dies.
                if (this.frameCounter > 30) {
                    this.destroy();
                }
                break;
			/* Added bombed case if bomb is casted on the line by V.L. */
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
			/* Added bombed case if bomb is casted on the line by V.L. */
        }; 

        // Update the received damage counter for the stunned state.
        this.coatEmitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = (this.frameCounter + 1) % 1200;
    }

	BHell_Enemy_VagrantTestimony4_p2.prototype.destroy = function() {

        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(5);//the 3 here is the map number change this to whatever map number u want to transition there on victory
		
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
    };


    BHell_Enemy_VagrantTestimony4_p2.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        this.state = "dying";
        this.frameCounter = 0;
    
        my.controller.destroyEnemyBullets();
    };
	
    BHell_Enemy_VagrantTestimony4_p2.prototype.hit = function () {
        if (this.state !== "dying") {
            my.BHell_Enemy_Base.prototype.hit.call(this);
    
            if (this.state != "stunned") {
                this.receivedDamage++;
            }
        }
    };
    return my;
} (BHell || {}));
//=============================================================================
// VagrantLine4 Pattern3 coat
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantTestimony4_p3 = my.BHell_Enemy_VagrantTestimony4_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony4_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony4_p3.prototype.constructor = BHell_Enemy_VagrantTestimony4_p3;

    //initalize function. set sprite hitbox params here along with speed
    BHell_Enemy_VagrantTestimony4_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        my.player.currentLine = 2;
        params.hp = 85;
        params.speed = 4;
        params.hitbox_w = 527;
        params.hitbox_h = 82;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		
		my.player.can_bomb = true; 

        //for multiple emitters initalize them here:
        this.initializeCoat(parent);

        //some variables needed to change states of the boss j is a counter to keep track of time, state and recived damage are obvious
        this.frameCounter = 0;
        this.state = "started";
        this.receivedDamage = 0;
        this.bulletcounter = 0;

        //initalize the mover function which dictaes the movement pattern here:
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);
    };

    BHell_Enemy_VagrantTestimony4_p3.prototype.initializeCoat = function (parent) {
        var coatParams = {};
        coatParams.bullet = {};
        coatParams.bullet.speed = 7
        coatParams.bullet.index = 0;
        coatParams.bullet.frame = 2;
        coatParams.bullet.direction = 8;
        coatParams.period = 0;
        coatParams.alwaysAim = true;
        coatParams.aim = true; 
        this.coatEmitters = [];
        this.coatEmitters.push(new my.BHell_Emitter_Homing(this.x, this.y, coatParams, parent, my.enemyBullets));
        //fine tune aiming here
        this.coatEmitters[0].aimX = 100;
        this.coatEmitters[0].alwaysAim = true;
        this.coatEmitters[0].offsetX = 100;
        this.coatEmitters.push(new my.BHell_Emitter_Homing(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[1].offsetX = -100;
        //fine tune aiming here
        this.coatEmitters[1].aimX;
        this.coatEmitters[1].alwaysAim = false;
        var coatParams = {};
        coatParams.bullet = {};
        coatParams.bullet.speed = 4;
        coatParams.bullet.direction = 2;
        coatParams.a = 0;//a: Arc's initial angle (in radians),
        coatParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),
        coatParams.n = 8;
        coatParams.type = "circle";
        coatParams.bullet = {};
        coatParams.bullet.burstcount = 6;
        coatParams.bullet.direction = 6;
        this.coatEmitters.push(new my.BHell_Emitter_Split(this.x, this.y, coatParams, parent, my.enemyBullets));
        var coatParams = {};
        coatParams.bullet = {};
        coatParams.bullet.speed = 4;
        coatParams.bullet.direction = 4;
        coatParams.bullettype="vagrant";
        coatParams.bullet.amp=4;
        coatParams.bullet.period=60;
        coatParams.bullet.reverse=-1;
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[3].angle= (3*Math.PI/4)-0.4;//change to adjust angle of straight lines
        this.coatEmitters[3].alwaysAim = false;//change to adjust angles of straight lines
        this.coatEmitters[3].offsetX = -250;//change to adjust horizontal offset
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[4].angle= (3*Math.PI/4)-0.4;//change to adjust angle of straight lines
        this.coatEmitters[4].alwaysAim = false;//change to adjust angles of straight lines
        this.coatEmitters[4].offsetX = -220;//change to adjust horizontal offset
        var coatParams = {};
        coatParams.bullet = {};
        coatParams.bullet.speed = 4;
        coatParams.bullet.direction = 4;
        coatParams.bullettype="vagrant";
        coatParams.bullet.amp=4;
        coatParams.bullet.period=60;
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[5].angle= (Math.PI/4)+0.4;//change to adjust angle of straight lines
        this.coatEmitters[5].alwaysAim = false;//change to adjust angles of straight lines
        this.coatEmitters[5].offsetX = 250;//change to adjust horizontal offset
        this.coatEmitters.push(new my.BHell_Emitter_Angle(this.x, this.y, coatParams, parent, my.enemyBullets));
        this.coatEmitters[6].angle= (Math.PI/4)+0.4;//change to adjust angle of straight lines
        this.coatEmitters[6].alwaysAim = false;//change to adjust angles of straight lines
        this.coatEmitters[6].offsetX = 220;//change to adjust horizontal offset
        this.p=125;   
    };

    BHell_Enemy_VagrantTestimony4_p3.prototype.updateCoat = function() {
        if (this.frameCounter % 125 == 0){
            this.coatEmitters[0].shoot(this.coatEmitters,true);
            this.coatEmitters[1].shoot(this.coatEmitters,true);
        }
        if (this.frameCounter % this.p == 0){
            this.coatEmitters[2].shoot(this.coatEmitters,true);
        }
        if (this.frameCounter % 8 == 0){
            this.coatEmitters[3].shoot(this.coatEmitters,true);
            this.coatEmitters[4].shoot(this.coatEmitters,true);
            this.coatEmitters[5].shoot(this.coatEmitters,true);
            this.coatEmitters[6].shoot(this.coatEmitters,true);
        }
    };

    BHell_Enemy_VagrantTestimony4_p3.prototype.move = function () {
        if (this.mover != null) {
            var p = this.mover.move(this.x, this.y, this.speed);
            this.x = p[0];
            this.y = p[1];
        }
        this.coatEmitters.forEach(e => {e.move(this.x, this.y);});
    };

	BHell_Enemy_VagrantTestimony4_p3.prototype.destroy = function() {

        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(5);//the 3 here is the map number change this to whatever map number u want to transition there on victory
		
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
    };
	

    BHell_Enemy_VagrantTestimony4_p3.prototype.update = function () {
		
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
            /* Copy and paste this code into update function for should-be-bombed lines by V.L. */
		if (my.player.bombed == true) {
				this.die(); 
			}
			
			if (this.state !== "dying") {
                this.move();
            }
		
        /* Copy and paste this code into update function for should-be-bombed lines by V.L. */
        switch (this.state) {
            case "started":
                if(this.mover.inPosition === true){
                    this.state = "pattern 1";
                    this.speed =3;
                }
                break;
            case "pattern 1": // Shoots from the hands and the claws for 10 seconds, then switches to pattern 2
                this.updateCoat();
                break;
            case "dying": // die.
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
			/* Added bombed case if bomb is casted on the line by V.L. */
        }; 

        // Update the received damage counter for the stunned state.
        this.coatEmitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = (this.frameCounter + 1) % 1200;
    }

    BHell_Enemy_VagrantTestimony4_p3.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        this.state = "dying";
        this.frameCounter = 0;
    		
		if (my.player.bombed == true) {
			if (my.player.bomb_se == false) {
				AudioManager.playSe({name: "explosion2", volume: 100, pitch: 100, pan: 0});  
				my.player.bomb_se = true; 
			}
		} 
        my.controller.destroyEnemyBullets();
    };

    BHell_Enemy_VagrantTestimony4_p3.prototype.hit = function () {
        if (this.state !== "dying") {
            my.BHell_Enemy_Base.prototype.hit.call(this);
    
            if (this.state != "stunned") {
                this.receivedDamage++;
            }
        }
    };
    return my;
} (BHell || {}));
