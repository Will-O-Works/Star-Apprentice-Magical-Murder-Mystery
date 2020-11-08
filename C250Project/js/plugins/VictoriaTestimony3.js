// =============================================================================
// VictoriaTestimony3 Pattern 1 Test
// =============================================================================
var BHell = (function (my) {

    console.log("running");
    var BHell_Enemy_VictoriaTestimony3_p1 = my.BHell_Enemy_VictoriaTestimony3_p1 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony3_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony3_p1.prototype.constructor = BHell_Enemy_VictoriaTestimony3_p1;
    BHell_Enemy_VictoriaTestimony3_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 386; //change to adjust hitbox width
        params.hitbox_h = 75; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initalizeEmitters(parent)
        this.initializeZaWarudo(parent);
		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };

    BHell_Enemy_VictoriaTestimony3_p1.prototype.initalizeEmitters = function (parent) {
        var emitterParams = {};
		emitterParams.aim = true; // if aims at player 
        emitterParams.alwaysAim = true;
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 4;
        emitterParams.a = 7.5;
        emitterParams.b = 8.5;
        emitterParams.n = 11;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[0].offsetX = 420;
        this.emitters[1].offsetX = -420;
    };
    BHell_Enemy_VictoriaTestimony3_p1.prototype.initializeZaWarudo = function (parent) {
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
        this.emitters[2].offsetX=300;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[3].offsetX=-300;
    };
    BHell_Enemy_VictoriaTestimony3_p1.prototype.updateZaWarudo = function() {
        if(this.frameCounter==270){
            my.player.Timestop=true;
        }
        if(this.frameCounter%20 == 0&&my.player.Timestop==true&&this.frameCounter<370)
        {
            this.emitters[2].shoot(true);
            this.emitters[2].bulletParams.num++;
            this.emitters[3].shoot(true);
            this.emitters[3].bulletParams.num++;
        }
        if(this.frameCounter==400){
            my.player.Timestop=false;
        }
    };
    BHell_Enemy_VictoriaTestimony3_p1.prototype.updateEmitters = function() {
        if(this.frameCounter%90 == 0&&my.player.Timestop==false){
            this.emitters[0].shoot(this.emitters,true);
            this.emitters[1].shoot(this.emitters,true);
        }
    };
    BHell_Enemy_VictoriaTestimony3_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony3_p1.prototype.destroy = function() {
        my.player.PhaseOver = true;
        my.player.nextMap = Number(8);
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_VictoriaTestimony3_p1.prototype.update = function () {
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
                this.updateEmitters();
                this.updateZaWarudo();
				break;
			case "dying": // die.
				this.destroy();
				break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = ((this.frameCounter) % 550)+1;
        if(this.frameCounter==1){
            this.emitters[2].bulletParams.num=0;
            this.emitters[3].bulletParams.num=0;
        }
	};
    return my;
} (BHell || {}));
// =============================================================================
// VictoriaTestimony3 Pattern 2 Test
// =============================================================================
var BHell = (function (my) {
    console.log("running");
    var BHell_Enemy_VictoriaTestimony3_p2 = my.BHell_Enemy_VictoriaTestimony3_p2 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony3_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony3_p2.prototype.constructor = BHell_Enemy_VictoriaTestimony3_p2;
    BHell_Enemy_VictoriaTestimony3_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 386; //change to adjust hitbox width
        params.hitbox_h = 75; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initalizeEmitters(parent)
        this.initializeZaWarudo(parent);
		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };

    BHell_Enemy_VictoriaTestimony3_p2.prototype.initalizeEmitters = function (parent) {
        var emitterParams = {};
		emitterParams.aim = false; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 4;
        emitterParams.a = 7.25;
        emitterParams.b = 8.25;
        emitterParams.n = 6;
        this.increment=0.15;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
    BHell_Enemy_VictoriaTestimony3_p2.prototype.initializeZaWarudo = function (parent) {
        var emitterParams={};
        emitterParams.a = 6.5;
        emitterParams.b = 8.5;
        emitterParams.n = 10;
        emitterParams.aim=true;
        emitterParams.alwaysAim=true;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 2;
        emitterParams.bullet.num = 0;
        //emitterParams.rotating=true;
        emitterParams.bullet.stoppable="false";
        emitterParams.bullet.moveTime=100;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
    BHell_Enemy_VictoriaTestimony3_p2.prototype.updateZaWarudo = function() {
        if(this.frameCounter==240){
            my.player.Timestop=true;
        }
        if(this.frameCounter%15 == 0&&my.player.Timestop==true&&this.frameCounter<340){
            this.emitters[1].shoot(true);
            this.emitters[1].bulletParams.num++;
          
        }
        if(this.frameCounter==370){
            my.player.Timestop=false;
        }
    };
    BHell_Enemy_VictoriaTestimony3_p2.prototype.updateEmitters = function() {
        if(this.frameCounter%10 == 0&&my.player.Timestop==false){
            this.emitters[0].shoot(this.emitters,true);
            this.emitters[0].a+=this.increment;
            this.emitters[0].b+=this.increment;
        }
        if(this.emitters[0].a>8.5){this.increment=-0.15}
        if(this.emitters[0].a<6.5){this.increment=0.15}
    };
    BHell_Enemy_VictoriaTestimony3_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony3_p2.prototype.destroy = function() {
        my.player.PhaseOver = true;
        my.player.nextMap = Number(8);
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_VictoriaTestimony3_p2.prototype.update = function () {
		my.BHell_Sprite.prototype.update.call(this);
			// Added bomb wrong case 
			if (my.player.false_bomb == true && this.bombedWrong == false) {
				this.bombedWrong = true; 
				this.hp = this.full_hp; 
			}
			if (this.bombedWrong == true) {
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
                this.updateEmitters();
                this.emitters[1].offsetX=my.player.x-this.x;
                this.updateZaWarudo();
				break;
			case "dying": // die.
				this.destroy();
				break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = ((this.frameCounter) % 400)+1;
        if(this.frameCounter==1){
            this.emitters[1].bulletParams.num=0;
        }
	};
    return my;
} (BHell || {}));
// =============================================================================
// VictoriaTestimony3 Pattern 3 Test
// =============================================================================
var BHell = (function (my) {
    console.log("running");
    var BHell_Enemy_VictoriaTestimony3_p3 = my.BHell_Enemy_VictoriaTestimony3_p3 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony3_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony3_p3.prototype.constructor = BHell_Enemy_VictoriaTestimony3_p3;
    BHell_Enemy_VictoriaTestimony3_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 386; //change to adjust hitbox width
        params.hitbox_h = 75; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeZaWarudo(parent);
        this.initializeSwipe(parent);
		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony3_p3.prototype.initializeZaWarudo = function (parent) {
        var emitterParams={};
        emitterParams.a = 0;
        emitterParams.b = 2*Math.PI;
        emitterParams.n = 20;
        emitterParams.aim=false;
        emitterParams.alwaysAim=false;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 2;
        emitterParams.bullet.num = 0;
        emitterParams.bullet.stoppable="false";
        emitterParams.bullet.moveTime=100;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[1].offsetX=400;
        this.emitters[1].offsetY=250;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[2].offsetX=-400;
        this.emitters[2].offsetY=250;
    };
    BHell_Enemy_VictoriaTestimony3_p3.prototype.updateZaWarudo = function() {
        if(this.frameCounter==60){
            my.player.Timestop=true;
        }
        if(this.frameCounter%20 == 0&&my.player.Timestop==true&&this.frameCounter<120){
            this.emitters[0].shoot(true);
            this.emitters[0].bulletParams.num++; 
            this.emitters[0].a+=0.45;
            this.emitters[0].b+=0.45;
            this.emitters[1].shoot(true);
            this.emitters[1].bulletParams.num++;
            this.emitters[1].a-=0.45;
            this.emitters[1].b-=0.45;
            this.emitters[2].shoot(true);
            this.emitters[2].bulletParams.num++;   
            this.emitters[1].a-=0.45;
            this.emitters[1].b-=0.45;      
        }
        if(this.frameCounter==180){
            my.player.Timestop=false;
        }     
    };
    BHell_Enemy_VictoriaTestimony3_p3.prototype.initializeSwipe = function (parent) {
		this.p = 2; 
        var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 3;
        emitterParams.bullet.direction = 2;
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[3].angle=Math.PI/2;
        this.emitters[3].alwaysAim = false;
        this.emitters[3].offsetX = -150;
        this.emitters[4].angle=Math.PI/2;
        this.emitters[4].alwaysAim = false;
        this.emitters[4].offsetX= 150;
        this.angl1= -(Math.PI/20);
        this.angl2= (Math.PI/20);
        this.flip=false;
    };
    BHell_Enemy_VictoriaTestimony3_p3.prototype.updateSwipe = function() {
        if (this.frameCounter % 10 == 0){
            this.emitters[3].shoot(true);
            this.emitters[4].shoot(true);
            if(this.emitters[3].angle>=Math.PI||this.emitters[4].angle<=0)
            {
                this.flip=true;
            }
            if(this.flip==true)
            {
                this.angl1= -(this.angl1);
                this.flip = false;
            }
            this.emitters[3].angle-=this.angl1;
            this.emitters[4].angle-=this.angl1;
        } 
    };
    BHell_Enemy_VictoriaTestimony3_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony3_p3.prototype.destroy = function() {
        my.player.PhaseOver = true;
        my.player.nextMap = Number(8);
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_VictoriaTestimony3_p3.prototype.update = function () {
		my.BHell_Sprite.prototype.update.call(this);
			// Added bomb wrong case 
			if (my.player.false_bomb == true && this.bombedWrong == false) {
				this.bombedWrong = true; 
				this.hp = this.full_hp; 
			}
			if (this.bombedWrong == true) {
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
                this.updateZaWarudo();
                this.updateSwipe();
				break;
			case "dying": // die.
				this.destroy();
				break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = ((this.frameCounter) % 250)+1;
        if(this.frameCounter==1){
            this.emitters[0].bulletParams.num=0;
            this.emitters[1].bulletParams.num=0;
            this.emitters[2].bulletParams.num=0;        }
	};
    return my;
} (BHell || {}));