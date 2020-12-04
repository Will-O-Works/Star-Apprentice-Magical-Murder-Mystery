//=============================================================================
// VagrantBullet
//=============================================================================
var BHell = (function (my) {
    var BHell_Vagrant_Bullet = my.BHell_Vagrant_Bullet = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Vagrant_Bullet.prototype = Object.create(my.BHell_Sprite.prototype);
    BHell_Vagrant_Bullet.prototype.constructor = BHell_Vagrant_Bullet;
    BHell_Vagrant_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
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
        var amp=0;   
        var period=1;
        var reverse = 1; 
        var angularvelocity=(2*Math.PI);
        if (params != null) {
            speed = params.speed || speed;
            sprite = params.sprite || sprite;
            index = params.index || index;
            direction = params.direction || direction;
            frame = params.frame || frame;
            period = params.period || period;
            amp = params.amp || amp;
            angularvelocity = params.angularvelocity || angularvelocity;
            reverse = params.reverse || reverse;
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
        this.period=period;
        this.amp=amp;
        this.reverse=reverse;
        this.angularvelocity = angularvelocity;
        
    };
    
    /**
     * Updates the bullet's position. If it leaves the screen, it's destroyed.
     */
    BHell_Vagrant_Bullet.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        //var x= Math.cos(this.angle) * this.speed;
        var y = Math.sin(this.angle) * this.speed;
        var x = this.reverse*(this.amp * Math.cos(this.angularvelocity * this.frameCounter / this.period));
        this.x += (x)*Math.cos(this.rotation)-(y)*Math.sin(this.rotation);
        this.y += (x)*Math.sin(this.rotation)+(y)*Math.cos(this.rotation);
        // this.x+=Math.cos(this.angle) * this.speed;
        // this.y+=Math.sin(this.angle) * this.speed;
        if (this.y < -this.height || this.y > Graphics.height + this.height || this.x < -this.width || this.x > Graphics.width + this.width) {
        this.outsideMap = true;}
        this.frameCounter++;
    };
    // Add effects on bullet hit by V.L.
    BHell_Vagrant_Bullet.prototype.hit_effect = function() {
        my.effects.push(new my.BHell_Hit_Effect(this.x, this.y, this.sprite, this.index, this.parent, my.effects));
    };
    BHell_Vagrant_Bullet.prototype.isOutsideMap = function () {
        return this.outsideMap;
    };
    
    /**
     * Removes the bullet from the screen and from its container.
     */
    BHell_Vagrant_Bullet.prototype.destroy = function() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.bulletList.splice(this.bulletList.indexOf(this), 1);
    };
    
    return my;
} (BHell || {}));
//=============================================================================
// VagrantBullet2 (Split bullet)
//=============================================================================
var BHell = (function (my) {
    var BHell_Vagrant_Bullet2 = my.BHell_Vagrant_Bullet2 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Vagrant_Bullet2.prototype = Object.create(my.BHell_Bullet.prototype);
    BHell_Vagrant_Bullet2.prototype.constructor = BHell_Vagrant_Bullet2;
    BHell_Vagrant_Bullet2.prototype.initialize = function (x, y, angle, params, bulletList) {
        my.BHell_Bullet.prototype.initialize.call(this, x, y, angle, params, bulletList);
        this.frameCounter=0;
        this.bullet2Params=params;
        this.burstcount=params.burstcount;
        this.special=params.special
        this.distance= params.distance||60;
    }
    BHell_Vagrant_Bullet2.prototype.update = function () {
        var a=0;
        var b=2*Math.PI
        my.BHell_Sprite.prototype.update.call(this);
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.y < (-this.height-200) || this.y > (Graphics.height + this.height+200) || this.x < (-this.width-200) || this.x > (Graphics.width + this.width+200)) {
        this.outsideMap = true;
        }
        if(this.frameCounter==this.distance){
            for (var k = 0; k < this.burstcount; k++) {
                var bullet;
                this.bullet2Params.direction=2;
                this.bullet2Params.speed-=1;
                bullet = new my.BHell_Bullet(this.x, this.y, a + (b - a) / this.burstcount * (k + 0.5), this.bullet2Params, this.bulletList);
                this.parent.addChild(bullet);
                this.bulletList.push(bullet);
                this.bullet2Params.direction=6;
                this.bullet2Params.speed+=1;
            }
            this.destroy();
        }
        this.frameCounter++;
    }

    return my;
} (BHell || {}));
//=============================================================================
// Split Emitter
//=============================================================================
var BHell = (function (my) {
	var BHell_Emitter_Split = my.BHell_Emitter_Split = function () {
        this.initialize.apply(this, arguments);       
    };

    BHell_Emitter_Split.prototype = Object.create(my.BHell_Emitter_Spray.prototype);
    BHell_Emitter_Split.prototype.constructor = BHell_Emitter_Split;


    BHell_Emitter_Split.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Spray.prototype.initialize.call(this, x, y, params, parent, bulletList);  
        this.type = params.type||"angle"; 
        this.frameCounter=0;
        this.punishV=0;
        this.punish = params.punish||"false";
    };

    BHell_Emitter_Split.prototype.shoot = function () {
        this.frameCounter++;
        if(this.punish == "true"){
            this.punishV=30;
        }
        if(this.frameCounter%(119-this.punishV)==0){this.frameCounter=1;}
        switch(this.type){
            case "angle":
                if (this.aim) {
                    if (this.alwaysAim || this.oldShooting === false) {
                        for (var k = 0; k < this.n; k++) {
                            var bullet;
                            var dx = my.player.x - this.x + this.aimX;
                            var dy = my.player.y - this.y + this.aimY;
                            this.aimingAngle = Math.atan2(dy, dx);
                            bullet = new my.BHell_Vagrant_Bullet2(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
                        }
                    }
                }
                else {
                    var bullet;
                    var dx = my.player.x - this.x + this.aimX;
                    var dy = my.player.y - this.y + this.aimY;
                    this.aimingAngle = Math.atan2(dy, dx);
                    bullet = new my.BHell_Vagrant_Bullet2(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
                }
                this.parent.addChild(bullet);
                this.bulletList.push(bullet);
            break;
            case "circle":
                for (var k = 0; k < this.n; k++) {
                    var bullet;
                    if (this.aim) {
                        if (this.alwaysAim || this.oldShooting === false) {
                            var dx = my.player.x - this.x + this.aimX;
                            var dy = my.player.y - this.y + this.aimY;
                            this.aimingAngle = Math.atan2(dy, dx);
                        }
                        bullet = new my.BHell_Vagrant_Bullet2(this.x, this.y, this.aimingAngle - (this.b - this.a) / 2 + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList);
                        }
                    else {
                        bullet = new my.BHell_Vagrant_Bullet2(this.x, this.y, this.a + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList);
                    }
                    this.parent.addChild(bullet);
                    this.bulletList.push(bullet);
                }
             break;
             case "final":
                if(this.frameCounter%6==0){
                    for (var k = 0; k < this.n; k++) {
                        var bullet;
                        if (this.aim) {
                            if (this.alwaysAim || this.oldShooting === false) {
                                var dx = my.player.x - this.x + this.aimX;
                                var dy = my.player.y - this.y + this.aimY;
                                this.aimingAngle = Math.atan2(dy, dx);
                            }
                            bullet = new my.BHell_Vagrant_Bullet2(this.x, this.y, this.aimingAngle - (this.b - this.a) / 2 + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList);
                            }
                        else {
                            bullet = new my.BHell_Vagrant_Bullet2(this.x, this.y, this.a + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList);
                        }
                        this.parent.addChild(bullet);
                        this.bulletList.push(bullet);
                    }
                }
             break;
             case "mix":
                if(this.frameCounter%66==0){
                    var bullet;
                    var dx = my.player.x - this.x + this.aimX;
                    var dy = my.player.y - this.y + this.aimY;
                    this.aimingAngle = Math.atan2(dy, dx);
                    bullet = new my.BHell_Vagrant_Bullet2(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
                    this.parent.addChild(bullet);
                    this.bulletList.push(bullet);
                }
                if(this.frameCounter%72==0){
                    var bullet;
                    var dx = my.player.x - this.x + this.aimX;
                    var dy = my.player.y - this.y + this.aimY;
                    this.aimingAngle = Math.atan2(dy, dx);
                    bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
                    this.parent.addChild(bullet);
                    this.bulletList.push(bullet);
                }
                if(this.frameCounter%78==0){
                    var bullet;
                    var dx = my.player.x - this.x + this.aimX;
                    var dy = my.player.y - this.y + this.aimY;
                    this.aimingAngle = Math.atan2(dy, dx);
                    bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle, this.bulletParams, this.bulletList);
                    this.parent.addChild(bullet);
                    this.bulletList.push(bullet);
                }
            break;
        }
    };
    return my;
} (BHell || {}));
//=============================================================================
// CircleGeometry Emitter(not used)
//=============================================================================
var BHell = (function (my) {
	var BHell_Emitter_CircleGeometry = my.BHell_Emitter_CircleGeometry = function () {
        this.initialize.apply(this, arguments);       
    };

    BHell_Emitter_CircleGeometry.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_CircleGeometry.prototype.constructor = BHell_Emitter_CircleGeometry;


    BHell_Emitter_CircleGeometry.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList); 
        this.angle = 0;
        this.shots = 1;
        this.radius=0;
        this.bullettype=false;
        this.offsetX=0;
        if (params != null) {
            this.angle = params.angle || this.angle;
            this.shots = params.shots || this.shots;
            this.bullettype=params.bullettype||this.bullettype;
            this.radius=params.radius||this.radius;
            this.offsetX=params.offsetX||this.offsetX;
        }
        this.frameCounter=0;
    };

    BHell_Emitter_CircleGeometry.prototype.shoot = function () {
        var offX = this.offsetX;
        var offY = 0;
        this.bulletParams.reverse=1;
        var x1=(100 * Math.sin(2*Math.PI * this.frameCounter / 10));
        var y=0;
        var buffer = ((x1)*Math.cos(Math.PI)-(y)*Math.sin(Math.PI/2));
        console.log(buffer);
        if(Math.random()>0.5){
            //var buffer = -(Math.random() *100);
        }
        else{
            //var buffer = (Math.random() *100);
        }
        for (var k = 0; k < this.shots; k++) {
            var phi = (k * (2*Math.PI/this.shots))+this.angle;
            offX = this.radius * Math.cos(phi);
            offY = this.radius * Math.sin(phi);
            var bullet;
            bullet = new my.BHell_Vagrant_Bullet(this.x + offX+buffer, this.y + offY, Math.PI/2, this.bulletParams, this.bulletList);
            this.parent.addChild(bullet);
            this.bulletList.push(bullet);
        }
        this.frameCounter++;
    };
    return my;
} (BHell || {}));
//=============================================================================
// VagrantTest2 Pattern 1
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantTestimony2_p1 = my.BHell_Enemy_VagrantTestimony2_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony2_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony2_p1.prototype.constructor = BHell_Enemy_VagrantTestimony2_p1;

	BHell_Enemy_VagrantTestimony2_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 386; // hitbox width
        params.hitbox_h = 75; // hitbox height
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.frameCounter =0;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        

        this.initializeVL1P1Emitter(parent);
        this.initializeCat();

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    }
    BHell_Enemy_VagrantTestimony2_p1.prototype.initializeVL1P1Emitter = function (parent) {

		var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
        emitterParams.bullet.speed = 3;
        this.trackingCounter = 0; //adjust to change length of bullets
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        var emitterParamsT = {};
        emitterParamsT.a = 0;//a: Arc's initial angle (in radians),change to adjust
        emitterParamsT.b = 2 * Math.PI;//b: Arc's final angle (in radians),change to adjust
        emitterParamsT.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom updatechange to adjust
        emitterParamsT.bullet = {};
        emitterParamsT.bullet.direction= 2;
        emitterParamsT.bullet.speed = 2;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParamsT, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParamsT, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters[0].alwaysAim=true;
        this.emitters[1].alwaysAim=true;
        this.emitters[2].alwaysAim=true;
        this.emitters[0].offsetX = 180;
        this.emitters[1].offsetX = -180;
        this.emitters[3].offsetX = 180;
        this.emitters[4].offsetX = -180;
        var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = false; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 3;
        emitterParams.bullettype="vagrant";
        emitterParams.bullet.amp=4;
        emitterParams.bullet.period=60;
        this.trackingCounter = 0; //adjust to change length of bullets
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters[5].offsetX=100;
        this.emitters[6].offsetX=-100; 
        this.emitters[7].offsetX=130;
        this.emitters[8].offsetX=-130;
        this.emitters[5].angle=Math.PI/4 +0.2;
        this.emitters[6].angle=3*Math.PI/4 -0.2; 
        this.emitters[7].angle=Math.PI/4 +0.2;
        this.emitters[8].angle=3*Math.PI/4 -0.2;
        this.emitters[7].bulletParams.reverse=-1;
        this.emitters[8].bulletParams.reverse=-1; 
        this.punish=80;
    }
    //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
    BHell_Enemy_VagrantTestimony2_p1.prototype.updateTracking = function () { 
        this.emitters[0].shoot(this.emitters,true);
        this.emitters[1].shoot(this.emitters,true);
        this.emitters[2].shoot(this.emitters,true);  
        this.trackingCounter += 1
    };
    BHell_Enemy_VagrantTestimony2_p1.prototype.updateCircle = function () { 
        this.emitters[3].shoot(this.emitters,true);
        this.emitters[4].shoot(this.emitters,true);  
    };
    BHell_Enemy_VagrantTestimony2_p1.prototype.updateDressing = function () { 
        if(this.frameCounter%5==0){
            this.emitters[5].shoot(this.emitters,true);
            this.emitters[6].shoot(this.emitters,true); 
            this.emitters[7].shoot(this.emitters,true);
            this.emitters[8].shoot(this.emitters,true);   
        }  
    };
    
    BHell_Enemy_VagrantTestimony2_p1.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        this.state = "dying";
        this.frameCounter = 0;
        my.controller.destroyEnemyBullets();
    };
    BHell_Enemy_VagrantTestimony2_p1.prototype.initializeCat = function () {
        this.updateCatCounter = 0;
        this.spawnNumber=2;
        this.spawnCounter = 0;
    };
    BHell_Enemy_VagrantTestimony2_p1.prototype.updateCat = function() {
        // Spawn a suicide cat enemy every 3 seconds.
        var image = {"characterName":"$Cat","direction":2,"pattern":2,"characterIndex":2};//cat sprite is messed up fix later
        var params = {};
        params.animated = true;
        params.frame = 2;
        params.aim = false;
        params.speed =3;
        params.hp = 5;
        params.bullet = {};
        this.updateCatCounter = this.updateCatCounter + 1; //change to adjust cat spawn rate 
        /////lots of shenanigans
        if (this.spawnNumber-1>=this.spawnCounter) {
            my.controller.enemies.push(new my.BHell_Enemy_NonViolentCat(this.x, this.y - 82, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
            }
        }
    };
    BHell_Enemy_VagrantTestimony2_p1.prototype.destroy = function() {

        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(9);//the 3 here is the map number change this to whatever map number u want to transition there on victory
		
		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
    };
    //main update loop
    BHell_Enemy_VagrantTestimony2_p1.prototype.update = function () {
        
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
                //this.updateCat();
                this.updateDressing();

                if (this.frameCounter%5==0&&this.trackingCounter<3){this.updateTracking();}//change if comparator to adjust amout of bullets per wave
                else if(this.frameCounter%80 === 0){this.trackingCounter=0;}//change mod to ajust gap between waves

                if(this.frameCounter%this.punish === 0){
                    this.updateCircle();
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
// VagrantTest2 Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_VagrantTestimony2_p2 = my.BHell_Enemy_VagrantTestimony2_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony2_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony2_p2.prototype.constructor = BHell_Enemy_VagrantTestimony2_p2;

	BHell_Enemy_VagrantTestimony2_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        my.player.currentLine = 1;
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 408; // hitbox width
        params.hitbox_h = 72; // hitbox height
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.frameCounter =0;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly

        this.initializeVL1P2Emitter(parent);
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 

		this.circle_p = 100; // increase frequency for angry state
        this.radius = 200;
        this.counterclockwise = true;
        this.dir = my.parse(params.dir, this.x, this.y, this.patternWidth(), this.patternHeight(), Graphics.width, Graphics.height);
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
        //this.mover = new my.BHell_Mover_Finisher(this.dir,this.radius, this.counterclockwise,Graphics.width / 2,Graphics.height / 2-40); // initialize the enemy's movement, check BHell_Mover
    }
    BHell_Enemy_VagrantTestimony2_p2.prototype.initializeVL1P2Emitter = function (parent) {
        var emitterParams = {};
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 4;
        emitterParams.bullettype="vagrant";
        emitterParams.bullet.amp=4;
        emitterParams.bullet.period=50;
        this.trackingCounter = 0;
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters[0].angle= (Math.PI/4)+0.3;
        this.emitters[0].offsetX = 180;
        this.emitters[1].angle= (3*Math.PI/4)-0.3;
        this.emitters[1].offsetX = -180;
        this.emitters[2].angle= Math.PI/2;
        var emitterParamsC = {};
        emitterParamsC.bullet = {};
        emitterParamsC.bullet.speed = 3;
        emitterParamsC.bullet.direction = 6;
        emitterParamsC.period = 130;
        emitterParamsC.a = 0;
        emitterParamsC.b = 2 * Math.PI;
        emitterParamsC.n = 10;
        emitterParamsC.type = "mix";
        emitterParamsC.bullet.burstcount = 8;
        this.emitters.push(new my.BHell_Emitter_Split(this.x, this.y, emitterParamsC, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters.push(new my.BHell_Emitter_Split(this.x, this.y, emitterParamsC, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters.push(new my.BHell_Emitter_Split(this.x, this.y, emitterParamsC, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters[3].aimX= (Math.PI/4)-0.3;
        this.emitters[3].offsetX = 180;
        this.emitters[4].aimX= -(Math.PI/4)+0.3;
        this.emitters[4].offsetX = -180;
        this.emitters[4].aimX= (Math.PI/4)-0.3;
    };

     //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
     BHell_Enemy_VagrantTestimony2_p2.prototype.updateAngle = function () { 
        if(this.frameCounter%6==0&&this.trackingCounter<6){
            this.emitters[0].shoot(this.emitters,true);
            this.emitters[1].shoot(this.emitters,true);
            this.emitters[2].shoot(this.emitters,true);  
            this.trackingCounter++;
        }
        else if(this.frameCounter%70==0){this.trackingCounter=0;}
    };
    BHell_Enemy_VagrantTestimony2_p2.prototype.updateSplit = function () { 
        this.emitters[3].shoot(this.emitters,true);
        this.emitters[4].shoot(this.emitters,true);
        this.emitters[5].shoot(this.emitters,true); 
    };
    BHell_Enemy_VagrantTestimony2_p2.prototype.destroy = function() {

        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(8);//the 3 here is the map number change this to whatever map number u want to transition there on victory
		
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
    };
    BHell_Enemy_VagrantTestimony2_p2.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        this.state = "dying";
        this.frameCounter = 0;
        my.controller.destroyEnemyBullets();
    };
    //main update loop
    BHell_Enemy_VagrantTestimony2_p2.prototype.update = function () {
		
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
                this.emitters[3].bulletParams.speed = 5;
                this.emitters[4].bulletParams.speed = 5;
                this.emitters[5].bulletParams.speed = 5;
                this.emitters[3].punish = "true";
                this.emitters[4].punish = "true";
				this.emitters[5].punish = "true"; 
			}
			
			if (my.player.bombed == true) {
				this.destroy(); 
			}
			
			if (this.state !== "dying") {
                this.move();
            }
            /* Copy and paste this code into update function for not-for-bomb lines V.L. */
            this.updateSplit();
        switch (this.state) {
            case "started":
                if (this.mover.inPosition === true) {
                    this.state = "active";
                    this.frameCounter = 0;
                }
                break;
            case "active": // Shoot.
                this.updateAngle();
                // if(this.frameCounter%this.circle_p === 0){
                //     this.updateSplit();
                // }
                // if(this.frameCounter==20){
                //     this.updateSplit();
                // }
                break;
            case "dying": // die.
                this.destroy();
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
        // Update the emitter's position.
        this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = (this.frameCounter + 1) % 1200;
    }
    return my;
} (BHell || {}));
//=============================================================================
// VagrantTest2 Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_VagrantTestimony2_p3 = my.BHell_Enemy_VagrantTestimony2_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony2_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony2_p3.prototype.constructor = BHell_Enemy_VagrantTestimony2_p3;

	BHell_Enemy_VagrantTestimony2_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        my.player.currentLine = 2;
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 306; // hitbox width
        params.hitbox_h = 68; // hitbox height
        params.animated = false;
        this.frameCounter =0;
        this.state = "started";
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        //this one uses the custom emitter below for the rotation
        this.initializeSwipe(parent);
        this.initializeCrcle(parent);
        this.initalizeProngs(parent);
		// set player.can_bomb to true by V.L.
        my.player.can_bomb = true; 
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VagrantTestimony2_p3.prototype.initializeSwipe = function (parent) {
		this.p = 2; 
        var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 3;
        emitterParams.bullet.direction = 6;
        emitterParams.bullet.burstcount = 3;
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[0].angle=Math.PI/2;
        this.emitters[0].alwaysAim = false;
        this.emitters[0].offsetX = -150;
        this.emitters[1].angle=Math.PI/2;
        this.emitters[1].alwaysAim = false;
        this.emitters[1].offsetX= 150;
        this.angl1= -(Math.PI/25);
        this.angl2= (Math.PI/25);
        this.flip=false;
    };
    BHell_Enemy_VagrantTestimony2_p3.prototype.updateSwipe = function() {
        if (this.frameCounter % 20 == 0&&my.player.Timestop==false){
            this.emitters[0].shoot(true);
            this.emitters[1].shoot(true);
            if(this.emitters[0].angle>=Math.PI||this.emitters[1].angle>=Math.PI)
            {
                this.flip=true;
            }
            if(this.flip==true)
            {
                this.angl1= -(this.angl1);
                this.flip = false;
            }
            this.emitters[0].angle+=this.angl1;
            this.emitters[1].angle-=this.angl1;
        } 
    };
    BHell_Enemy_VagrantTestimony2_p3.prototype.initializeCrcle = function (parent) {
        var emitterParams = {};
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
        emitterParams.n = 10;
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 3;
        emitterParams.bullet.direction = 6;
        emitterParams.bullet.burstcount = 4;
        emitterParams.type = "circle";
        this.emitters.push(new my.BHell_Emitter_Split(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[2].offsetX= 150;
        this.emitters.push(new my.BHell_Emitter_Split(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[3].offsetX= -150;
    };
    BHell_Enemy_VagrantTestimony2_p3.prototype.updateCricle = function () {  
        if(this.frameCounter%150==0){
            this.emitters[2].shoot(true);
            this.emitters[3].shoot(true);
        }
    };
    BHell_Enemy_VagrantTestimony2_p3.prototype.initalizeProngs = function (parent) {
        var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = false; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 3;
        emitterParams.bullettype="vagrant";
        emitterParams.bullet.amp=4;
        emitterParams.bullet.period=60;
        this.trackingCounter = 0; //adjust to change length of bullets
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters[4].offsetX=120;
        this.emitters[5].offsetX=-120; 
        this.emitters[6].offsetX=150;
        this.emitters[7].offsetX=-150;
        this.emitters[4].angle=Math.PI/4 +0.2;
        this.emitters[5].angle=3*Math.PI/4 -0.2; 
        this.emitters[6].angle=Math.PI/4 +0.2;
        this.emitters[7].angle=3*Math.PI/4 -0.2;
        this.emitters[6].bulletParams.reverse=-1;
        this.emitters[7].bulletParams.reverse=-1;
    };
    BHell_Enemy_VagrantTestimony2_p3.prototype.updateProngs = function (parent) {  
        if(this.frameCounter%5==0){
            this.emitters[5].shoot(this.emitters,true);
            this.emitters[6].shoot(this.emitters,true); 
            this.emitters[7].shoot(this.emitters,true);
            this.emitters[4].shoot(this.emitters,true);   
        } 
    };
    BHell_Enemy_VagrantTestimony2_p3.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        this.state = "dying";
        my.controller.destroyEnemyBullets();
    };
    BHell_Enemy_VagrantTestimony2_p3.prototype.destroy = function() {

        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(8);//the 3 here is the map number change this to whatever map number u want to transition there on victory
        
        /* inherit destroy function from BHell_Enemy_Base by V.L. */
        my.BHell_Enemy_Base.prototype.destroy.call(this);
        /* inherit destroy function from BHell_Enemy_Base by V.L. */
    };
    //main update loop
    BHell_Enemy_VagrantTestimony2_p3.prototype.update = function () {
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
        if (my.player.bombed == true  && this.state !== "bombed") {
            my.controller.destroyEnemyBullets(); 
            this.timer = 0; 
            this.hp = 999;  // Give the line a large hp so itd doesn't get destroyed when bomb is used 
            this.state = "bombed";
        }
        if (this.state !== "dying" && this.state !== "bombed") {
            this.move();
        }
        /* Copy and paste this code into update function for should-be-bombed lines by V.L. */
        switch (this.state) {
            case "started":
                if (this.mover.inPosition === true) {
                    this.state = "pattern 1";
                    this.frameCounter = 0;
                }
                break;
            case "pattern 1": // shoots main angle emitters every 5 frames and shoots all emitters every 150 frames
                this.updateSwipe();
                this.updateCricle();
                this.updateProngs();
                break;
            case "dying": // dies.
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
        this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = (this.frameCounter + 1) % 1200;
    }
} (BHell || {}));



//stair case bullets lol
// var BHell = (function (my) {
//     var BHell_Vagrant_Bullet = my.BHell_Vagrant_Bullet = function() {
//         this.initialize.apply(this, arguments);
//     };
//     BHell_Vagrant_Bullet.prototype = Object.create(my.BHell_Sprite.prototype);
//     BHell_Vagrant_Bullet.prototype.constructor = BHell_Vagrant_Bullet;
//     BHell_Vagrant_Bullet.prototype.initialize = function (x, y, angle, params, bulletList) {
//         var speed = 4;
//         var sprite = my.defaultBullet;
//         var index = 0;
//         var direction = 2;
//         var frame = 0;
//         var animated = false;
//         var animationSpeed = 15;
//         this.hitboxshape = "dot";
//         this.hitboxheight = 0;
//         this.hitboxwidth = 0;
//         this.hitboxradius = 0;    
//         if (params != null) {
//             speed = params.speed || speed;
//             sprite = params.sprite || sprite;
//             index = params.index || index;
//             direction = params.direction || direction;
//             frame = params.frame || frame;
//             if (params.animated !== false) {
//                 animated = true;
//             }
//             animationSpeed = params.animation_speed || animationSpeed;
//         }
//         my.BHell_Sprite.prototype.initialize.call(this, sprite, index, direction, frame, animated, animationSpeed);
//         this.anchor.x = 0.5;
//         this.anchor.y = 0.5;
//         this.rotation = angle + Math.PI / 2;
//         this.x = x;
//         this.y = y;
//         this.z = 15;
//         this.angle = angle;
//         this.speed = speed;
//         this.bulletList = bulletList;
//         this.outsideMap = false;
//         this.counter = 0
//         this.aimX = 0;
//         this.aimY = 0;
//         this.frameCounter=0;
//     };
    
//     /**
//      * Updates the bullet's position. If it leaves the screen, it's destroyed.
//      */
//     BHell_Vagrant_Bullet.prototype.update = function () {
//         my.BHell_Sprite.prototype.update.call(this);
//         //var y= Math.sin(this.angle) * this.speed;
        
//         if(this.frameCounter<=10){
            
//             var x= (5 * Math.sin(2*Math.PI * this.frameCounter / 20));
//             this.x += x;
//         }
//         else{
//             var y= Math.sin(this.angle) * this.speed;
//             this.y += y;
//         }
//         if (this.y < -this.height || this.y > Graphics.height + this.height || this.x < -this.width || this.x > Graphics.width + this.width) {
//         this.outsideMap = true;}
//         this.frameCounter=(this.frameCounter+1)%20;
//     };
//     // Add effects on bullet hit by V.L.
//     BHell_Vagrant_Bullet.prototype.hit_effect = function() {
//         my.effects.push(new my.BHell_Hit_Effect(this.x, this.y, this.sprite, this.index, this.parent, my.effects));
//     };
//     BHell_Vagrant_Bullet.prototype.isOutsideMap = function () {
//         return this.outsideMap;
//     };
    
//     /**
//      * Removes the bullet from the screen and from its container.
//      */
//     BHell_Vagrant_Bullet.prototype.destroy = function() {
//         if (this.parent != null) {
//             this.parent.removeChild(this);
//         }
//         this.bulletList.splice(this.bulletList.indexOf(this), 1);
//     };
    
//     return my;
// } (BHell || {}));