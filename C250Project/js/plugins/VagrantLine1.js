//=============================================================================
// VagrantLine1 Phase 1.js
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VagrantLine1_p1 = my.BHell_Enemy_VagrantLine1_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantLine1_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine1_p1.prototype.constructor = BHell_Enemy_VagrantLine1_p1;

	BHell_Enemy_VagrantLine1_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 320; // hitbox width
        params.hitbox_h = 100; // hitbox height
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 

		var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 6;

        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 250, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        emitterParams.bullet.speed = 6;
        emitterParams.period = 150;
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
        emitterParams.n = 20;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters[0].alwaysAim=true;
        this.emitters[1].alwaysAim=true;
        this.emitters[2].alwaysAim=true;
        this.emitters[0].offsetX = 180;
        this.emitters[1].offsetX = -180;
        this.emitters[3].offsetX = 180;
        this.emitters[4].offsetX = -180;        
    };
    return my;
} (BHell || {}));
//=============================================================================
// VagrantLine1_p2.js
//=============================================================================
var BHell = (function (my) {
    console.log("vagrant Lin 1 is being called")

    var BHell_Enemy_VagrantLine1_p2 = my.BHell_Enemy_VagrantLine1_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantLine1_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine1_p2.prototype.constructor = BHell_Enemy_VagrantLine1_p2;

	BHell_Enemy_VagrantLine1_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 320; // hitbox width
        params.hitbox_h = 100; // hitbox height
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true; 

		var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = false; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 6;

        this.mover = new my.BHell_Mover_Orbit(Graphics.width / 2, 250, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        emitterParams.bullet.speed = 6;
        emitterParams.period = 150;
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
        emitterParams.n = 20;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters[0].angle= (Math.PI/4)+0.3;
        this.emitters[0].offsetX = 180;
        this.emitters[1].angle= (3*Math.PI/4)-0.3;
        this.emitters[1].offsetX = -180;
        this.emitters[2].angle= Math.PI/2;
    };

    BHell_Enemy_VagrantLine1_p2.prototype.destroy = function() {

        my.player.can_bomb = false; 
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(3);//the 3 here is the map number change this to whatever map number u want to transition there on victory
    };

    return my;
} (BHell || {}));
//=============================================================================
// VagrantLine1_p3.js
//=============================================================================
var BHell = (function (my) {
    console.log("vagrant Lin 1 is being called")

    var BHell_Enemy_VagrantLine1_p3 = my.BHell_Enemy_VagrantLine1_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantLine1_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine1_p3.prototype.constructor = BHell_Enemy_VagrantLine1_p3;

	BHell_Enemy_VagrantLine1_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 320; // hitbox width
        params.hitbox_h = 100; // hitbox height
        params.animated = false;
        this.frameCounter =0;
        this.state = "started";
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        //this one uses the custom emitter below for the rotation
        this.initializeVL1P3Emitter(parent);

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false; 
        
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 250, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
        BHell_Enemy_VagrantLine1_p3.prototype.initializeVL1P3Emitter = function (parent) {
		var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = false; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 6;

        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        emitterParams.bullet.speed = 6;
        emitterParams.period = 150;
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
        emitterParams.n = 20;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters[0].angle= (Math.PI/4)+0.3;
        this.emitters[0].offsetX = -180;
        this.emitters[1].angle= (3*Math.PI/4)-0.3;
        this.emitters[1].offsetX = 180;
        this.emitters[2].angle= Math.PI/2;
        this.emitters[3].offsetX = 180;
        this.emitters[4].offsetX = -180;
        BHell_Enemy_VagrantLine1_p3.prototype.updateVL1P3Emitter = function () { 
            console.log("calling update")
            this.emitters[0].angle += (Math.PI/30);//change the denominator to adjust rotaion
            this.emitters[1].angle += -(Math.PI/30);//change the denominator to adjust rotaion
            this.emitters[0].shoot(this.emitters,true);
            this.emitters[1].shoot(this.emitters,true);
            this.emitters[2].shoot(this.emitters,true);    
        };
        BHell_Enemy_VagrantLine1_p3.prototype.die = function() {
            $gameBHellResult.score += this.killScore;
            this.state = "dying";
            this.j = 0;
            my.controller.destroyEnemyBullets();
        };
        BHell_Enemy_VagrantLine1_p3.prototype.update = function () {
            my.BHell_Sprite.prototype.update.call(this);
            if (this.state !== "dying" && this.state !== "stunned") {
                this.move();
            }
            switch (this.state) {
                case "started":
                    if (this.mover.inPosition === true) {
                        this.state = "pattern 1";
                        this.frameCounter = 0;
                    }
                    break;
                case "pattern 1": // Shoots from the hands and the claws for 10 seconds, then switches to pattern 2
                    if (this.frameCounter%5 === 0) {
                        this.updateVL1P3Emitter();
                    }
                    if(this.frameCounter%150 === 0){
                        this.shoot(this.emitters, true);
                    }   
                    break;
                case "dying": // Spawns explosions for 5 seconds, then dies.
                    if (this.frameCounter > 30) {
                        this.destroy();
                    }
                    break;
            }; 
            // Update the received damage counter for the stunned state.
            this.emitters.forEach(e => {e.update()});
            // Update the time counter and reset it every 20 seconds.
            this.frameCounter = (this.frameCounter + 1) % 1200;
        }
    };
} (BHell || {}));