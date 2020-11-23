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
// VagrantBullet2(not used here)
//=============================================================================
var BHell = (function (my) {
    var BHell_Vagrant_Bullet2 = my.BHell_Vagrant_Bullet2 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Vagrant_Bullet2.prototype = Object.create(my.BHell_Sprite.prototype);
    BHell_Vagrant_Bullet2.prototype.constructor = BHell_Vagrant_Bullet2;
    BHell_Vagrant_Bullet2.prototype.initialize = function (x, y, angle, params, bulletList) {
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
        
    };
    
    /**
     * Updates the bullet's position. If it leaves the screen, it's destroyed.
     */
    BHell_Vagrant_Bullet2.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);
        this.x+=Math.cos(this.angle) * this.speed;
        this.y+=Math.sin(this.angle) * this.speed;
        if (this.y < -this.height || this.y > Graphics.height + this.height || this.x < -this.width || this.x > Graphics.width + this.width) {
        this.outsideMap = true;}
        if(this.frameCounter==80){
            this.angle+=(Math.PI/2);
        }
        this.frameCounter++;
    };
    // Add effects on bullet hit by V.L.
    BHell_Vagrant_Bullet2.prototype.hit_effect = function() {
        my.effects.push(new my.BHell_Hit_Effect(this.x, this.y, this.sprite, this.index, this.parent, my.effects));
    };
    BHell_Vagrant_Bullet2.prototype.isOutsideMap = function () {
        return this.outsideMap;
    };
    
    /**
     * Removes the bullet from the screen and from its container.
     */
    BHell_Vagrant_Bullet2.prototype.destroy = function() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.bulletList.splice(this.bulletList.indexOf(this), 1);
    };
    
    return my;
} (BHell || {}));
//=============================================================================
// Cloud Emitter
//=============================================================================
var BHell = (function (my) {
	var BHell_Emitter_Cloud = my.BHell_Emitter_Cloud = function () {
        this.initialize.apply(this, arguments);       
    };

    BHell_Emitter_Cloud.prototype = Object.create(my.BHell_Emitter_Burst.prototype);
    BHell_Emitter_Cloud.prototype.constructor = BHell_Emitter_Cloud;


    BHell_Emitter_Cloud.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Burst.prototype.initialize.call(this, x, y, params, parent, bulletList); 
        this.Alpha=0
        this.Beta=Math.PI
        if (params != null) {
            this.Beta=params.Beta||this.Beta;
            this.Alpha=params.Alpha||this.Alpha;
        }
        
    };

    BHell_Emitter_Cloud.prototype.shoot = function () {
        var offX = 0;
        var offY = 0;
        this.bulletParams.reverse=1;
        for (var k = 0; k < this.shots; k++) {
            this.angle = (Math.random() * (this.Beta - this.Alpha))+this.Alpha;
            var r = Math.random() * this.dispersion / 5;
            var phi = Math.random() * 2 * Math.PI;
            offX = r * Math.cos(phi);
            offY = r * Math.sin(phi);
            var bullet;
            if (this.aim) {
                if (this.alwaysAim || this.oldShooting === false) {
                    var dx = my.player.x - this.x + this.aimX;
                    var dy = my.player.y - this.y + this.aimY;
                    this.aimingAngle = Math.atan2(dy, dx);
                }
                bullet = new my.BHell_Bullet(this.x + offX, this.y + offY, this.aimingAngle, this.bulletParams, this.bulletList);
            }
            else {
                bullet = new my.BHell_Bullet(this.x + offX, this.y + offY, this.angle, this.bulletParams, this.bulletList);
            }
            this.parent.addChild(bullet);
            this.bulletList.push(bullet);
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
// NonViolent Cat Enemy
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_NonViolentCat = my.BHell_Enemy_NonViolentCat = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_NonViolentCat.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_NonViolentCat.prototype.constructor = BHell_Enemy_NonViolentCat;

    BHell_Enemy_NonViolentCat.prototype.initialize = function (x, y, image, params, parent, enemyList) {
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList); 
        this.shooting = 120;
    if (params != null) {
        var tmp = my.parse(params.shooting, this.x, this.y, this.patternWidth(), this.patternHeight(), Graphics.width, Graphics.height, Graphics.width, Graphics.height);
        if (tmp > 0) {
            this.shooting = tmp;
        }
    }

    this.destX = Math.random() * Graphics.width;
    this.destY = Math.random() * 125;
    this.j = 0;
    var emitterParams = {};
        emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 6;
        emitterParams.period = 90;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),
        emitterParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom update
        this.mover = new my.BHell_Mover_Chase();
        this.frameCounter=0;
};

BHell_Enemy_NonViolentCat.prototype.update = function () {
    my.BHell_Sprite.prototype.update.call(this);
    this.frameCounter=(this.frame+1)%120;
    if (this.moving) {
        var dx = this.destX - this.x;
        var dy = this.destY - this.y;
        var angle = Math.atan2(dy, dx);
        if (dx > 0) {
            this.x += Math.min(dx, Math.cos(angle) * this.speed);
        }
        else if (dx < 0) {
            this.x += Math.max(dx, Math.cos(angle) * this.speed);
        }
        if (dy > 0) {
            this.y += Math.min(dy, Math.sin(angle) * this.speed);
        }
        else if (dy < 0) {
            this.y += Math.max(dy, Math.sin(angle) * this.speed);
        }
        var shootingAngle = 0;
        if (this.aim === false && this.rnd === true) {
            shootingAngle = Math.random() * 2 * Math.PI;
        }
        this.emitters.forEach(e => {
            e.move(this.x, this.y);
            e.angle = shootingAngle;
            e.update();
        });
        if (Math.abs(dx) < 2 && Math.abs(dx) < 2) {
            this.destX = Math.random() * Graphics.width;
            this.destY = Math.random() * 125;
            this.moving = false;
            var params = {};
            params.animated = true;
            params.frame = 2;
        }
    }
    else {
        this.j = (this.j + 1) % this.shooting;
        this.shoot(true);
        this.emitters.forEach(e => {
            e.update();
        });
        if (this.j === 0) {
            this.moving = true;
            this.shoot(false);
        }
    }
};
BHell_Enemy_NonViolentCat.prototype.crash = function() {
    if (this.boss !== true) {
        my.explosions.push(new my.BHell_Explosion(this.x, this.y, this.parent, my.explosions));
        this.destroy();
    }
    $gameBHellResult.enemiesCrashed++;

    return true;
};

BHell_Enemy_NonViolentCat.prototype.die = function() {
    this.destroy(); 
};

BHell_Enemy_NonViolentCat.prototype.destroy = function() {  

    if (this.parent != null) {
        this.parent.removeChild(this);
    }
    this.enemyList.splice(this.enemyList.indexOf(this), 1);
};

    return my;
} (BHell || {}));
//=============================================================================
// VagrantLine1 Pattern 1
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantTestimony1_p1 = my.BHell_Enemy_VagrantTestimony1_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony1_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony1_p1.prototype.constructor = BHell_Enemy_VagrantTestimony1_p1;

	BHell_Enemy_VagrantTestimony1_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 1;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 386; // hitbox width
        params.hitbox_h = 75; // hitbox height
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.frameCounter =0;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        this.initializeProngs(parent);
        this.initializeCloud(parent);
        this.initializeCage(parent);
        this.initializeCat(parent);

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    }
    //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
    BHell_Enemy_VagrantTestimony1_p1.prototype.initializeProngs = function (parent) {
		var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
        //emitterParams.angle = Math.PI/2;
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
        this.emitters[0].offsetX = 180;
        this.emitters[1].offsetX = -180;
        this.emitters[0].angle = (Math.PI/2)-0.6;
        this.emitters[1].angle = (Math.PI/2)+0.6;
        this.emitters[2].angle = (Math.PI/2);
        this.bulletcounter=0;
    }
    BHell_Enemy_VagrantTestimony1_p1.prototype.initializeCloud = function (parent) {
        var emitterParams = {};
        emitterParams.dispersion=135;
        emitterParams.shots=30;
        emitterParams.angle=(3*Math.PI/4)+0.1;
        emitterParams.bullet = {};
        emitterParams.bullet.direction= 2;
        emitterParams.bullet.speed = 4;
        emitterParams.bullettype="vagrant";
        emitterParams.bullet.amp=1.3;
        emitterParams.bullet.angularvelocity=(2*Math.PI-0.8);
        emitterParams.bullet.period=50;
        emitterParams.bullet.reverse=-1;
        this.emitters.push(new my.BHell_Emitter_Burst(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[3].offsetX = -10;
        this.emitters[3].offsetY = 100;
        this.cloudCount=0;
        this.increment = Math.PI/10;
        this.incrementDispersion=15;
        this.incrementShots=2;
    };
    BHell_Enemy_VagrantTestimony1_p1.prototype.initializeCage = function (parent) {
        var emitterParams = {};
		emitterParams.period = 10;
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 3;
        this.trackingCounter = 0; //adjust to change length of bullets
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters[4].offsetX = 180;
        this.emitters[4].offsetY = 30;
        this.emitters[5].offsetX = -180;
        this.emitters[5].offsetY = 30;
        this.emitters[4].angle = 0;
        this.emitters[5].angle = (Math.PI);
        this.emitters[6].offsetX = 180;
        this.emitters[6].offsetY = 50;
        this.emitters[7].offsetX = -180;
        this.emitters[7].offsetY = 50;
        this.emitters[6].angle = 0;
        this.emitters[7].angle = (Math.PI);
    };
    //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
    BHell_Enemy_VagrantTestimony1_p1.prototype.updateProngs = function () { 
        if(this.frameCounter%6==0&&this.bulletcounter<4){
            this.emitters[0].shoot(this.emitters,true);
            this.emitters[1].shoot(this.emitters,true);
            this.emitters[2].shoot(this.emitters,true);
            this.bulletcounter++; 
        }
        else if(this.frameCounter%70==0){this.bulletcounter=0;}
            
    };
    BHell_Enemy_VagrantTestimony1_p1.prototype.updateCloud = function () { 
        
        if(this.cloudCount <6){
            //if(this.frameCounter%==)
            if(this.frameCounter%10==0){
                this.emitters[3].shoot(this.emitters,true);
                this.emitters[3].angle-= this.increment;
                this.emitters[3].dispersion-= this.incrementDispersion;
                this.emitters[3].shots-= this.incrementShots;
                this.cloudCount++;
            }
        }
        else{
            if(this.frameCounter%170==0){
                this.cloudCount=0;
                //this.emitters[3].angle=(3*Math.PI/4);
                this.increment=(this.increment*-1);
                this.emitters[3].dispersion= 135;
                this.emitters[3].shots= 30;
            }
        }     
    };
    BHell_Enemy_VagrantTestimony1_p1.prototype.updateCage = function () {
        if(this.frameCounter%6==0){
            this.emitters[4].shoot(this.emitters,true);
            this.emitters[5].shoot(this.emitters,true);
            this.emitters[6].shoot(this.emitters,true);
            this.emitters[7].shoot(this.emitters,true);
        }
    }
    BHell_Enemy_VagrantTestimony1_p1.prototype.initializeCat = function () {
        this.updateCatCounter = 0;
        this.spawnNumber=2;
        this.spawnCounter = 0;
    };
    BHell_Enemy_VagrantTestimony1_p1.prototype.updateCat = function() {
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
    BHell_Enemy_VagrantTestimony1_p1.prototype.destroy = function() {
		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_VagrantTestimony1_p1.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        this.state = "dying";
        this.frameCounter = 0;
        my.controller.destroyEnemyBullets();
    };
    //main update loop
    BHell_Enemy_VagrantTestimony1_p1.prototype.update = function () {
        
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
            this.emitters[0].bulletParams.speed = 6; 
            this.emitters[1].bulletParams.speed = 8; 
            this.emitters[2].bulletParams.speed = 8; 
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
                this.updateProngs();  
                this.updateCloud();
                this.updateCage();
                this.updateCat();
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
// VagrantLine1 Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_VagrantTestimony1_p2 = my.BHell_Enemy_VagrantTestimony1_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony1_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony1_p2.prototype.constructor = BHell_Enemy_VagrantTestimony1_p2;

	BHell_Enemy_VagrantTestimony1_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        my.player.currentLine = 1;
        params.hp = 1;
        params.speed = 5; // speed of boss moving 
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

		this.circle_p = 10000; // increase frequency for angry state
        this.radius = 100;
        this.counterclockwise = false;
        this.dir = my.parse(params.dir, this.x, this.y, this.patternWidth(), this.patternHeight(), Graphics.width, Graphics.height);
        this.mover = new my.BHell_Mover_Still(Graphics.width/2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
       //this.mover = new my.BHell_Mover_Still(580, 230, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
        
    }
    BHell_Enemy_VagrantTestimony1_p2.prototype.initializeVL1P2Emitter = function (parent) {
        var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = false; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 4;
        emitterParams.bullettype="vagrant";
        emitterParams.bullet.amp=2;
        emitterParams.bullet.angularvelocity=(2*Math.PI-0.8);
        emitterParams.bullet.period=50;
        emitterParams.bullet.reverse=-1;
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
        //emitterParamsC.bullettype="vagrant2";
        emitterParamsC.bullettype="vagrant";
        emitterParamsC.bullet = {};
        emitterParamsC.bullet.speed = 3;
        emitterParamsC.bullet.direction = 2;
        emitterParamsC.bullet.amp=1.3;
        emitterParamsC.bullet.angularvelocity=(2*Math.PI-0.8);
        emitterParamsC.bullet.period=50;
        emitterParamsC.bullet.reverse=-1;
        emitterParamsC.shots=10;
        emitterParamsC.radius=100;
        
        this.emitters.push(new my.BHell_Emitter_CircleGeometry(this.x, this.y, emitterParamsC, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters[0].angle= (Math.PI/4)+0.3;
        this.emitters[0].offsetX = 180;
        this.emitters[1].angle= (3*Math.PI/4)-0.3;
        this.emitters[1].offsetX = -180;
        this.emitters[2].angle= Math.PI/2;
    };

     //initalizeing Tracking emitter update, Cirlce emitter update, die and any other extra functions here
     BHell_Enemy_VagrantTestimony1_p2.prototype.updateAngle = function () { 
        this.emitters[0].shoot(this.emitters,true);
        this.emitters[1].shoot(this.emitters,true);
        this.emitters[2].shoot(this.emitters,true);  
        this.trackingCounter += 1
    };
    BHell_Enemy_VagrantTestimony1_p2.prototype.updateCircle = function () { 
        this.emitters[3].shoot(this.emitters,true); 
        this.emitters[3].angle+= (Math.PI/20);
        
    };
    BHell_Enemy_VagrantTestimony1_p2.prototype.destroy = function() {

        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(6);//the 3 here is the map number change this to whatever map number u want to transition there on victory
		
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
    };
    BHell_Enemy_VagrantTestimony1_p2.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        this.state = "dying";
        this.frameCounter = 0;
        my.controller.destroyEnemyBullets();
    };
    //main update loop
    BHell_Enemy_VagrantTestimony1_p2.prototype.update = function () {
		
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
				this.circle_p = 30; 
				// this.emitters[0].bulletParams.speed = 6; 
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
                this.state = "active";
                break;
            case "active": // Shoot.
                if(this.mover.inPosition==true){
                    this.speed=1;
                    //this.mover = new my.BHell_Mover_Finisher(this.dir,this.radius-10, this.counterclockwise,Graphics.width / 2,Graphics.height / 2-40); // initialize the enemy's movement, check BHell_Mover
                    this.circle_p=60;
                }
                if(this.frameCounter%8 === 0)
                {    
                    if (this.trackingCounter<3){this.updateAngle();}//change if comparator to adjust amout of bullets per wave
                    else if(this.frameCounter%40 === 0){this.trackingCounter=0;}//change mod to ajust gap between waves
                }
                if(this.frameCounter%this.circle_p === 0){

                    this.updateCircle();
                }   
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
// VagrantLine1 Pattern 3
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantTestimony1_p3 = my.BHell_Enemy_VagrantTestimony1_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantTestimony1_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantTestimony1_p3.prototype.constructor = BHell_Enemy_VagrantTestimony1_p3;

	BHell_Enemy_VagrantTestimony1_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        my.player.currentLine = 2;
        params.hp = 1;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 306; // hitbox width
        params.hitbox_h = 68; // hitbox height
        params.animated = false;
        this.frameCounter =0;
        this.state = "started";
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        //this one uses the custom emitter below for the rotation
        this.initializeCloud(parent);
		// set player.can_bomb to true by V.L.
        my.player.can_bomb = true; 
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VagrantTestimony1_p3.prototype.initializeCloud = function (parent) {
        var emitterParams = {};
        emitterParams.dispersion=200;
        emitterParams.shots=35;
        emitterParams.angle=(Math.PI/2);
        emitterParams.bullet = {};
        emitterParams.bullet.direction= 2;
        emitterParams.bullet.speed = 2;
        emitterParams.Beta = Math.PI;
        emitterParams.Aplha = 0;
        // emitterParams.bullettype="vagrant";
        // emitterParams.bullet.amp=1.3;
        // emitterParams.bullet.angularvelocity=(2*Math.PI-0.8);
        // emitterParams.bullet.period=50;
        // emitterParams.bullet.reverse=-1;
        this.emitters.push(new my.BHell_Emitter_Cloud(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[0].offsetX = -30;
        this.emitters[0].offsetY = 100;
        this.cloudCount=0;
    };
    BHell_Enemy_VagrantTestimony1_p3.prototype.updateCloud = function () { 
        if(this.frameCounter%30==0&&this.cloudCount <4){
            this.emitters[0].shoot(this.emitters,true);
            this.emitters[0].dispersion-=50;
            this.emitters[0].shots-=5;
            this.emitters[0].Alpha+=0.15;
            this.emitters[0].Beta-=0.15;
            this.cloudCount++;
        }
        else if(this.frameCounter%120==0 && this.cloudCount >=4){
            this.emitters[0].Alpha=0.2;
            this.emitters[0].Beta=Math.PI-0.2;
            this.emitters[0].dispersion=200;;
            this.emitters[0].shots=35;
            this.cloudCount=0;
        }
    };
        
    BHell_Enemy_VagrantTestimony1_p3.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        this.state = "dying";
        my.controller.destroyEnemyBullets();
    };

    BHell_Enemy_VagrantTestimony1_p3.prototype.destroy = function() {

        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(6);//the 3 here is the map number change this to whatever map number u want to transition there on victory
        
        /* inherit destroy function from BHell_Enemy_Base by V.L. */
        my.BHell_Enemy_Base.prototype.destroy.call(this);
        /* inherit destroy function from BHell_Enemy_Base by V.L. */
    };

    //main update loop
    BHell_Enemy_VagrantTestimony1_p3.prototype.update = function () {
        
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
                this.updateCloud(); 
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





/*some more potential vic stuff
BHell_Enemy_VagrantTestimony1_p3.prototype.initializeCircles = function (parent) {
        var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 2;
        emitterParams.bullet.direction = 2;
        emitterParams.period = 150;
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
        emitterParams.n = 10;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.burstcount = 0;

    }
    BHell_Enemy_VagrantTestimony1_p3.prototype.updateCircles = function (parent) {
        if(this.frameCounter%6==0&&this.burstcount<4){
            this.emitters[0].shoot(this.emitters,true);
            this.emitters[0].a+=(Math.PI/25);
            this.emitters[0].b+=(Math.PI/25);
            this.burstcount++;
        } 
        else if(this.frameCounter% 120 ==0){
            this.burstcount=0;
        }
        if(this.frameCounter%10==0){
            this.emitters[1].shoot(this.emitters,true);
            this.emitters[1].a-=(Math.PI/25);
            this.emitters[1].b-=(Math.PI/25);
        }
    }*/

/*some cool patterns for final vic fight
BHell_Enemy_VagrantTestimony1_p3.prototype.initializeCircles = function (parent) {
        var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 4;
        emitterParams.bullet.direction = 2;
        emitterParams.period = 150;
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
        emitterParams.n = 20;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
    }
    BHell_Enemy_VagrantTestimony1_p3.prototype.updateCircles = function (parent) {
        if(this.frameCounter%3==0){
            if(this.frameCounter%60){
                this.emitters[0].shoot(this.emitters,true);
                this.emitters[1].shoot(this.emitters,true);
            }
            else{
                this.emitters[0].shoot(this.emitters,true);
                this.emitters[0].a+=(Math.PI/60);
                this.emitters[0].b+=(Math.PI/60);
                this.emitters[1].shoot(this.emitters,true);
                this.emitters[1].a-=(Math.PI/60);
                this.emitters[1].b-=(Math.PI/60);
            }
            
        }
    }
*/

/*some wierd heartbeat stuff from vivan's old sine emitter(put at the top or it dosnt work?)
var BHell = (function (my) {
	var BHell_Emitter_Sine = my.BHell_Emitter_Sine = function () {
        this.initialize.apply(this, arguments);
    };

    BHell_Emitter_Sine.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Sine.prototype.constructor = BHell_Emitter_Sine;


    BHell_Emitter_Sine.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList); 
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = this.params.sprite;
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = this.params.direction;
		//this.bulletParams.speed = this.params.speed; 
		
		// initialize your own variables 
		this.angle = 0; 
		this.change = 0; 
		// or inherit prameters from the enemy class
		 if (params != null) {
            this.angle = params.angle || this.angle;
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
    };

    BHell_Emitter_Sine.prototype.shoot = function () {
        this.bulletParams.speed = 2; //give the bullet a speed. you can do this in sample.js as well 
		// create bullet by new my.BHell_Bullet(x, y, direction(0 is to the right), this.bulletParams(this includes speed, see sample.js), this.bulletList);
		var bullet = new my.BHell_Bullet(this.x, this.y, this.angle, this.bulletParams, this.bulletList);
		this.parent.addChild(bullet);
		this.bulletList.push(bullet);
		
		for (i = 0; i < this.bulletList.length; i ++ ) {
			this.bulletList[i].angle += Math.sin(this.change) * Math.PI / 4;
		}
		
		this.change += Math.PI / 2; 
		this.angle += Math.PI / 6; // change the angle by 30 degrees every time 
    };
    return my;
} (BHell || {}));*/

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