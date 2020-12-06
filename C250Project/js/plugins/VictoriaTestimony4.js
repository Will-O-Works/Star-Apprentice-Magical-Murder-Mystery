//=============================================================================
// VictoriaTestimony4 Pattern 1
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony4_p1 = my.BHell_Enemy_VictoriaTestimony4_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VictoriaTestimony4_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony4_p1.prototype.constructor = BHell_Enemy_VictoriaTestimony4_p1;

	BHell_Enemy_VictoriaTestimony4_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 3; // speed of boss moving 
        params.hitbox_w = 622; // hitbox width
        params.hitbox_h = 82; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		//some variables needed to change states a counter to keep track of time, state etc
        this.frameCounter = 0;
		this.state = "started";
		this.initializeEmitter(parent);
		this.initializeRain(parent);
		this.initializeZaWarudo(parent);
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_VictoriaTestimony4_p1.prototype.initializeEmitter = function (parent) {
		var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 2;
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction = 2;
        emitterParams.period = 150;
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
		emitterParams.n = 10;
		emitterParams.bullet.test4="true";
		this.burstcount = 0;
		this.shotcount=0;
		this.burstLimit = 5;
		this.shotLimit=10;
		this.p=10;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
	};
	BHell_Enemy_VictoriaTestimony4_p1.prototype.initializeRain = function (parent) {
		var emitterParams = {};
		emitterParams.bullet = {};
		emitterParams.bullet.sprite = "$VictoriaBullets1";
		emitterParams.bullet.direction = 8;
		emitterParams.angle=Math.PI/2;
		emitterParams.bullet.speed = 4;
		emitterParams.bullet.stoppable = "false";
		emitterParams.bullet.num=0;
		emitterParams.bullet.moveTime=1000;
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters[2].offsetX=300;
		this.emitters[3].offsetX=-300;
		this.emitters[4].offsetX=350;
		this.emitters[5].offsetX=-350;
		//
		this.emitters[2].offsetY=-125;
		this.emitters[3].offsetY=-125;
		this.emitters[4].offsetY=-125;
		this.emitters[5].offsetY=-125;
	};
	BHell_Enemy_VictoriaTestimony4_p1.prototype.updateEmitters = function () {
		if(this.punish==true){
			this.emitters[0].bulletParams.speed=3;
			this.emitters[1].bulletParams.speed=3;
			this.p=6;
			this.burstLimit = 20;
			this.shotLimit=20;
		}
		if(this.frameCounter%this.p==0&&this.burstcount<this.burstLimit&&my.player.Timestop==false){
            this.emitters[0].shoot(this.emitters,true);
            this.emitters[0].a+=(Math.PI/25);
            this.emitters[0].b+=(Math.PI/25);
            this.burstcount++;
        } 
        else if(this.frameCounter% 200 ==0&&my.player.Timestop==false){
			this.burstcount=0;
			this.shotcount=0;
        }
        if(this.frameCounter%this.p==0&&this.shotcount<this.shotLimit&&my.player.Timestop==false){
            this.emitters[1].shoot(this.emitters,true);
            this.emitters[1].a-=(Math.PI/25);
			this.emitters[1].b-=(Math.PI/25);
			this.shotcount++
		}
	};
	BHell_Enemy_VictoriaTestimony4_p1.prototype.updateRain = function () {
		
		if(this.frameCounter%6==0){
			var x1=80 * Math.sin(2*Math.PI * this.frameCounter / 60)+380+(Math.random()*10);
			var x2=80 * Math.sin(2*Math.PI * this.frameCounter / 40)+340+(Math.random()*10);
			var x3=80 * Math.sin(2*Math.PI * this.frameCounter / 60)-340+(Math.random()*10);
			var x4=80 * Math.sin(2*Math.PI * this.frameCounter / 40)-380+(Math.random()*10);
			var y=-125;
			this.emitters[2].offsetX = (x1)*Math.cos(this.angle)-(y)*Math.sin(this.angle);
			this.emitters[2].offsetY = (x1)*Math.sin(this.angle)+(y)*Math.cos(this.angle);
			this.emitters[2].shoot(this.emitters,true);
			this.emitters[3].offsetX = (x2)*Math.cos(this.angle)-(y)*Math.sin(this.angle);
			this.emitters[3].offsetY = (x2)*Math.sin(this.angle)+(y)*Math.cos(this.angle);
			this.emitters[3].shoot(this.emitters,true);
			this.emitters[4].offsetX = (x3)*Math.cos(this.angle)-(y)*Math.sin(this.angle);
			this.emitters[4].offsetY = (x3)*Math.sin(this.angle)+(y)*Math.cos(this.angle);
			this.emitters[4].shoot(this.emitters,true);
			this.emitters[5].offsetX = (x4)*Math.cos(this.angle)-(y)*Math.sin(this.angle);
			this.emitters[5].offsetY = (x4)*Math.sin(this.angle)+(y)*Math.cos(this.angle);
			this.emitters[5].shoot(this.emitters,true);
		}
	};
	BHell_Enemy_VictoriaTestimony4_p1.prototype.initializeZaWarudo = function (parent) {
		this.firstpause =true;
		this.change=0;
		this.angle=(Math.PI/300);
		this.punish=false;
    };
	BHell_Enemy_VictoriaTestimony4_p1.prototype.updateZaWarudo = function() {
        if(this.frameCounter==122){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
        }
        if(my.player.Timestop==true&&this.frameCounter<200)
        {
			for (i = 0; i < my.enemyBullets.length; i ++ ) {
				if(my.enemyBullets[i].test4=="true"){
					var c= Math.cos(this.angle);
					var s= Math.sin(this.angle);
					var px = my.enemyBullets[i].x-this.x;
					var py = my.enemyBullets[i].y-this.y;
					var xnew = px*c - py*s;
					var ynew = px*s + py*c;
					my.enemyBullets[i].x=xnew+this.x;
					my.enemyBullets[i].y=ynew+this.y;
					my.enemyBullets[i].angle+=this.angle;
				}
			}
			this.change+=this.angle;
        }
        if(this.frameCounter==235){
			my.player.Timestop=false;
			this.angle= -this.angle;
        }
    };
	BHell_Enemy_VictoriaTestimony4_p1.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony4_p1.prototype.destroy = function() {
		//below block of code auto casts bomb YA
		// //adding these to the correct line allow it to transition to a different phase
		// my.player.bombed = true;
		// my.player.PhaseOver = true;
		// my.player.nextMap = Number(31);//the 3 here is the map number change this to whatever map number u want to transition there on victory
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	//main update loop
	BHell_Enemy_VictoriaTestimony4_p1.prototype.update = function () {
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
			this.punish=true; 
		}
		if (my.player.bombed == true&& this.state !== "bombed") {
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
					this.frameCounter = 0;
				}
				break;
			case "active": // Shoot.
				this.updateEmitters();
				this.updateZaWarudo();
				//this.updateRain();
				break;
			case "dying": // die.
				this.timer = (this.timer + 1) % 1200;
				this.shoot(false);
				this.destroy();
				break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
		// Update the time counter and reset it every 20 seconds.
		console.log(this.frameCounter);
		this.frameCounter = (this.frameCounter + 1) % 258;
	}
	
    return my;
} (BHell || {}));
//=============================================================================
// VictoriaTestimony4 Pattern 2
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony4_p2 = my.BHell_Enemy_VictoriaTestimony4_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VictoriaTestimony4_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony4_p2.prototype.constructor = BHell_Enemy_VictoriaTestimony4_p2;

	BHell_Enemy_VictoriaTestimony4_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 3; // speed of boss moving 
        params.hitbox_w = 566; // hitbox width
        params.hitbox_h = 82; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		//some variables needed to change states a counter to keep track of time, state etc
        this.frameCounter = 0;
		this.state = "started";
		this.initializeEmitter(parent);
		this.initializeZaWarudo(parent);
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_VictoriaTestimony4_p2.prototype.initializeEmitter = function (parent) {
		var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 1;
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction = 2;
        emitterParams.period = 150;
		emitterParams.num_bullet=10;
        emitterParams.angle = Math.PI/4;
		emitterParams.shape=4;
		emitterParams.bullet.test4="true";
		this.emitters.push(new my.BHell_Emitter_Geometry(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 1;
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction = 2;
        emitterParams.period = 150;
		emitterParams.num_bullet=10;
        emitterParams.angle = Math.PI/2;
		emitterParams.shape=4;
		emitterParams.bullet.test4="true";
		this.emitters.push(new my.BHell_Emitter_Geometry(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 1.5;
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction = 2;
		emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
		emitterParams.n = 34;
		emitterParams.bullet.test4="true";
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.burst=0;
		
	};
	BHell_Enemy_VictoriaTestimony4_p2.prototype.updateEmitters = function () {
		if(this.frameCounter%10==0&&my.player.Timestop==false&&this.burst<1){
            this.emitters[0].shoot(this.emitters,true);
			this.emitters[1].shoot(this.emitters,true);
			this.emitters[2].shoot(this.emitters,true);
			this.burst++;
        } 
		else if(this.frameCounter%500==0&&my.player.Timestop==false){
            this.burst=0;
		}
		
	};
	BHell_Enemy_VictoriaTestimony4_p2.prototype.initializeZaWarudo = function (parent) {
		this.firstpause =true;
		this.change=0;
		this.angle=(Math.PI/300);
		var emitterParams = {};
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction = 6;
        emitterParams.bullet.speed = 2;
        emitterParams.a = 0;
        emitterParams.b = 2*Math.PI;
        emitterParams.n = 11;
        emitterParams.bullet.speed = 2;
        emitterParams.bullet.num = 0;
        emitterParams.bullet.moveTime=85;
        emitterParams.bullet.dif=15;
        emitterParams.bullettype = "vic2";
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
		this.punish=false;
		this.wavecount=2;
	};
	BHell_Enemy_VictoriaTestimony4_p2.prototype.updateZaWarudo = function() {
		if(this.punish==true){
			this.wavecount=4;
			this.emitters[3].bulletParams.speed=3;
		}
        if(this.frameCounter==65){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
        }
        if(my.player.Timestop==true&&this.frameCounter<153)
        {
			for (i = 0; i < my.enemyBullets.length; i ++ ) {
				if(my.enemyBullets[i].test4=="true"){
					var c= Math.cos(this.angle);
					var s= Math.sin(this.angle);
					var px = my.enemyBullets[i].x-this.x;
					var py = my.enemyBullets[i].y-this.y;
					var xnew = px*c - py*s;
					var ynew = px*s + py*c;
					my.enemyBullets[i].x=xnew+this.x;
					my.enemyBullets[i].y=ynew+this.y;
					my.enemyBullets[i].angle+=this.angle;
				}
			}
			this.change+=this.angle;          
            if(this.emitters[3].bulletParams.num<this.wavecount){
                this.emitters[3].x=my.player.x;
                this.emitters[3].y=my.player.y;
                this.emitters[3].bulletParams.num++;
                this.emitters[3].shoot(this.emitters,true);
            }
        }
        if(this.frameCounter==188){
			my.player.Timestop=false;
			this.angle= -this.angle;
			this.emitters[3].bulletParams.num=0;
        }
    };
	BHell_Enemy_VictoriaTestimony4_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	//main update loop
	BHell_Enemy_VictoriaTestimony4_p2.prototype.update = function () {
		console.log(this.frameCounter);
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
			this.punish=true; 
		}
		if (my.player.bombed == true&& this.state !== "bombed") {
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
					this.frameCounter = 0;
				}
				break;
			case "active": // Shoot.
				this.updateEmitters();
				this.updateZaWarudo();
				break;
			case "dying": // die.
				this.timer = (this.timer + 1) % 1200;
				this.shoot(false);
				this.destroy();
				break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
		// Update the time counter and reset it every 20 seconds.
		this.frameCounter = (this.frameCounter + 1) % 273;
	}
	BHell_Enemy_VictoriaTestimony4_p2.prototype.destroy = function() {
		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
    return my;
} (BHell || {}));
//=============================================================================
// VictoriaTestimony4 Pattern 3
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony4_p3 = my.BHell_Enemy_VictoriaTestimony4_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VictoriaTestimony4_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony4_p3.prototype.constructor = BHell_Enemy_VictoriaTestimony4_p3;

	BHell_Enemy_VictoriaTestimony4_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 3; // speed of boss moving 
        params.hitbox_w = 468; // hitbox width
        params.hitbox_h = 82; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		//some variables needed to change states a counter to keep track of time, state etc
        this.frameCounter = 0;
		this.state = "started";
		this.initializeEmitter(parent);
		this.initializeZaWarudo(parent);
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true;
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_VictoriaTestimony4_p3.prototype.initializeEmitter = function (parent) {
		var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 1.5;
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction = 2;
        emitterParams.period = 150;
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
		emitterParams.n = 44;
		emitterParams.bullet.test4 = "true";
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.speed = 3;
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction = 2;
        emitterParams.period = 150;
		emitterParams.num_bullet=15;
        emitterParams.angle = Math.PI/4;
		emitterParams.shape=4;
		emitterParams.bullet.test4 = "true";
		this.emitters.push(new my.BHell_Emitter_Geometry(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters[0].offsetX=60;
		this.emitters[1].offsetX=-60;
		this.emitters[2].offsetY=-60;
		this.emitters[3].offsetY=60;
		this.burst=0;
		
	};
	BHell_Enemy_VictoriaTestimony4_p3.prototype.updateEmitters = function () {
		if(this.frameCounter%10==0&&my.player.Timestop==false&&this.burst<1){
            this.emitters[0].shoot(this.emitters,true);
			this.emitters[1].shoot(this.emitters,true);
			this.emitters[2].shoot(this.emitters,true);
			this.emitters[3].shoot(this.emitters,true);
			this.emitters[4].shoot(this.emitters,true);
			this.burst++;
        } 
		else if(this.frameCounter%600==0&&my.player.Timestop==false){
            this.burst=0;
		}
	};
	BHell_Enemy_VictoriaTestimony4_p3.prototype.initializeZaWarudo = function (parent) {
		this.firstpause =true;
		this.change=0;
		this.angle=(Math.PI/300);
		var emitterParams = {};
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets2"
        emitterParams.bullet.direction = 6;
        emitterParams.bullet.speed = 2;
        emitterParams.a = 0;
        emitterParams.b = 2*Math.PI;
        emitterParams.n = 11;
        emitterParams.bullet.speed = 2;
        emitterParams.bullet.num = 0;
        emitterParams.bullet.moveTime=80;
        emitterParams.bullet.dif=15;
        emitterParams.bullettype = "vic2";
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets));
	};
	BHell_Enemy_VictoriaTestimony4_p3.prototype.updateZaWarudo = function() {
        if(this.frameCounter==110){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
        }
        if(my.player.Timestop==true&&this.frameCounter<200)
        {
			for (i = 0; i < my.enemyBullets.length; i ++ ) {
				if(my.enemyBullets[i].test4=="true"){
					var c= Math.cos(this.angle);
					var s= Math.sin(this.angle);
					var px = my.enemyBullets[i].x-this.x;
					var py = my.enemyBullets[i].y-this.y;
					var xnew = px*c - py*s;
					var ynew = px*s + py*c;
					my.enemyBullets[i].x=xnew+this.x;
					my.enemyBullets[i].y=ynew+this.y;
					my.enemyBullets[i].angle+=this.angle;
				}
			}
			this.change+=this.angle;
			if(this.emitters[5].bulletParams.num<3){
                this.emitters[5].x=my.player.x;
                this.emitters[5].y=my.player.y;
                this.emitters[5].bulletParams.num++;
                this.emitters[5].shoot(this.emitters,true);
            }
        }
        if(this.frameCounter==235){
			my.player.Timestop=false;
			this.angle= -this.angle;
			this.emitters[5].bulletParams.num=0;
        }
    };
	BHell_Enemy_VictoriaTestimony4_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	//main update loop
	BHell_Enemy_VictoriaTestimony4_p3.prototype.update = function () {
		console.log(this.frameCounter);
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
			if (my.player.bombed == true) {
				this.die(); 
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
				this.updateEmitters();
				this.updateZaWarudo();
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
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
		// Update the time counter and reset it every 20 seconds.
		this.frameCounter = (this.frameCounter + 1) % 480;
	}
	BHell_Enemy_VictoriaTestimony4_p3.prototype.destroy = function() {
		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.player.PhaseOver = true;
		my.player.nextMap = Number(42);
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
    return my;
} (BHell || {}));

/*var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony4_p2 = my.BHell_Enemy_VictoriaTestimony4_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VictoriaTestimony4_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony4_p2.prototype.constructor = BHell_Enemy_VictoriaTestimony4_p2;

	BHell_Enemy_VictoriaTestimony4_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 3; // speed of boss moving 
        params.hitbox_w = 400; // hitbox width
        params.hitbox_h = 100; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		//some variables needed to change states a counter to keep track of time, state etc
        this.frameCounter = 0;
		this.state = "started";
		this.initializeEmitter(parent);
		this.initializeZaWarudo(parent);
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_VictoriaTestimony4_p2.prototype.initializeEmitter = function (parent) {
		var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 2;
        emitterParams.bullet.direction = 2;
        emitterParams.period = 150;
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
        emitterParams.n = 30;
        this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.emitters.push(new my.BHell_Emitter_Spray(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		this.shotcount=0;
	};
	BHell_Enemy_VictoriaTestimony4_p2.prototype.updateEmitters = function () {
		if(this.frameCounter%6==0&&this.shotcount<10&&my.player.Timestop==false){
            if(this.frameCounter%15){
                this.emitters[0].shoot(this.emitters,true);
				this.emitters[1].shoot(this.emitters,true);
				this.shotcount++;
            }
            else{
                this.emitters[0].shoot(this.emitters,true);
                this.emitters[0].a+=(Math.PI/30);
                this.emitters[0].b+=(Math.PI/30);
                this.emitters[1].shoot(this.emitters,true);
                this.emitters[1].a-=(Math.PI/30);
				this.emitters[1].b-=(Math.PI/30);
				this.shotcount++;
			}
		}
		if(this.frameCounter==200){this.shotcount=0;}
	};
	BHell_Enemy_VictoriaTestimony4_p2.prototype.initializeZaWarudo = function (parent) {
		this.firstpause =true;
		this.change=0;
		this.angle=(Math.PI/300);
    };
	BHell_Enemy_VictoriaTestimony4_p2.prototype.updateZaWarudo = function() {
        if(this.frameCounter==122){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
        }
        if(my.player.Timestop==true&&this.frameCounter<200)
        {
			for (i = 0; i < my.enemyBullets.length; i ++ ) {
				var c= Math.cos(this.angle);
				var s= Math.sin(this.angle);
				var px = my.enemyBullets[i].x-this.x;
				var py = my.enemyBullets[i].y-this.y;
				var xnew = px*c - py*s;
				var ynew = px*s + py*c;
				my.enemyBullets[i].x=xnew+this.x;
				my.enemyBullets[i].y=ynew+this.y;
				my.enemyBullets[i].angle+=this.angle;
			}
			this.change+=this.angle;
        }
        if(this.frameCounter==235){
			my.player.Timestop=false;
			this.angle= -this.angle;
        }
    };
	BHell_Enemy_VictoriaTestimony4_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	//main update loop
	BHell_Enemy_VictoriaTestimony4_p2.prototype.update = function () {
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
		this.frameCounter = (this.frameCounter + 1) % 12000;
	}
	BHell_Enemy_VictoriaTestimony4_p2.prototype.destroy = function() {
		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
		//inherit destroy function from BHell_Enemy_Base by V.L.
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		// inherit destroy function from BHell_Enemy_Base by V.L.
	};
    return my;
} (BHell || {}));*/

