//=============================================================================
// SuperFanTestimony1 Pattern 3
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony4_p1 = my.BHell_Enemy_VictoriaTestimony4_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VictoriaTestimony4_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony4_p1.prototype.constructor = BHell_Enemy_VictoriaTestimony4_p1;

	BHell_Enemy_VictoriaTestimony4_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 85;
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
	BHell_Enemy_VictoriaTestimony4_p1.prototype.initializeEmitter = function (parent) {
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
		this.shotcount=0;
	};
	BHell_Enemy_VictoriaTestimony4_p1.prototype.updateEmitters = function () {
		if(this.frameCounter%10==0&&this.burstcount<5&&my.player.Timestop==false){
            this.emitters[0].shoot(this.emitters,true);
            this.emitters[0].a+=(Math.PI/25);
            this.emitters[0].b+=(Math.PI/25);
            this.burstcount++;
        } 
        else if(this.frameCounter% 200 ==0&&my.player.Timestop==false){
			this.burstcount=0;
			this.shotcount=0;
        }
        if(this.frameCounter%10==0&&this.shotcount<10&&my.player.Timestop==false){
            this.emitters[1].shoot(this.emitters,true);
            this.emitters[1].a-=(Math.PI/25);
			this.emitters[1].b-=(Math.PI/25);
			this.shotcount++
		}
	};
	BHell_Enemy_VictoriaTestimony4_p1.prototype.initializeZaWarudo = function (parent) {
		this.firstpause =true;
		this.change=0;
		this.angle=(Math.PI/300);
    };
	BHell_Enemy_VictoriaTestimony4_p1.prototype.updateZaWarudo = function() {
        if(this.frameCounter==168){
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
		this.frameCounter = (this.frameCounter + 1) % 240;
	}
	
    return my;
} (BHell || {}));
//=============================================================================
// SuperFanTestimony1 Pattern 3
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
		this.angle=(Math.PI/30);
		var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.sprite="$VictoriaBullets1"
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 1.5;
        emitterParams.bullet.num = 0;
        emitterParams.bullet.stoppable="false";
        emitterParams.bullet.moveTime=90;
        emitterParams.bullet.dif=20;
        emitterParams.bullettype = "vic1";
        emitterParams.type = "reverse";
        emitterParams.num_bullet=10;
        emitterParams.angle = Math.PI/4;
        emitterParams.shape=5;
        emitterParams.rotate="clockwise";
        emitterParams.speed = 2;
        this.emitters.push(new my.BHell_Emitter_Geometry(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
	BHell_Enemy_VictoriaTestimony4_p2.prototype.updateZaWarudo = function() {
        console.log(this.frameCounter)
        if(this.frameCounter==150){
            if(this.firstpause==true){
                AudioManager.playSe({name: "timestop", volume: 100, pitch: 100, pan: 0});
                this.firstpause=false;
            }
            else{AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});}
            my.player.Timestop=true;
        }
        if(my.player.Timestop==true&&this.frameCounter<180)
        {
			for (i = 0; i < my.enemyBullets.length; i ++ ) {
				var c= Math.cos(Math.PI/200);
				var s= Math.sin(Math.PI/200);
				var px = my.enemyBullets[i].x-this.x;
				var py = my.enemyBullets[i].y-this.y;
				var xnew = px*c - py*s;
				var ynew = px*s + py*c;
				my.enemyBullets[i].x=xnew+this.x;
				my.enemyBullets[i].y=ynew+this.y;
				my.enemyBullets[i].angle+=Math.PI/200;
			}
			this.change+=this.angle;
		}
        if(this.frameCounter==200){
            my.player.Timestop=false;
		}
		if(this.frameCounter==260){
            AudioManager.playSe({name: "timestop2", volume: 100, pitch: 100, pan: 0});
            my.player.Timestop=true;
        }
		if(this.frameCounter%3 == 0&&my.player.Timestop==true&&this.frameCounter>270)
        {
            if(this.emitters[2].bulletParams.num<3){
                this.emitters[2].x=my.player.x;
                this.emitters[2].y=my.player.y;
                this.emitters[2].bulletParams.num++;
                this.emitters[2].num_bullet-=2;
                this.emitters[2].shoot(this.emitters,true);
            }           
		}
		if(this.frameCounter==380){
            my.player.Timestop=false;
            this.emitters[2].bulletParams.num=0;
            this.emitters[2].num_bullet=10;
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
		this.frameCounter = (this.frameCounter + 1) % 460;
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
// SuperFanTestimony1 Pattern 3
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
        params.hitbox_w = 400; // hitbox width
        params.hitbox_h = 100; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		//some variables needed to change states a counter to keep track of time, state etc
        this.frameCounter = 0;
		this.state = "started";
		this.initializeEmitter(parent);
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_VictoriaTestimony4_p3.prototype.initializeEmitter = function (parent) {
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
		
	};
	BHell_Enemy_VictoriaTestimony4_p3.prototype.updateEmitters = function () {
		
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
		
	};
	BHell_Enemy_VictoriaTestimony4_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	//main update loop
	BHell_Enemy_VictoriaTestimony4_p3.prototype.update = function () {
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
	BHell_Enemy_VictoriaTestimony4_p3.prototype.destroy = function() {
		//adding these to the correct line allow it to transition to a different phase
		my.player.bombed = true;
		my.player.PhaseOver = true;
		my.player.nextMap = Number(31);//the 3 here is the map number change this to whatever map number u want to transition there on victory
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
// SuperFanTestimony1 Pattern 3
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
        params.hitbox_w = 400; // hitbox width
        params.hitbox_h = 100; // hitbox heights
		params.animated = false;
		my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		//some variables needed to change states a counter to keep track of time, state etc
        this.frameCounter = 0;
		this.state = "started";
		this.initializeEmitter(parent);
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		this.can_die = false;
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);// initialize the enemy's movement, check BHell_Mover
	};
	BHell_Enemy_VictoriaTestimony4_p3.prototype.initializeEmitter = function (parent) {
		var emitterParams = {};
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 4;
        emitterParams.bullet.direction = 2;
        emitterParams.period = 150;
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
        emitterParams.n = 20;
		this.emitters.push(new my.BHell_Emitter_Sine(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
		//this.emitters.push(new my.BHell_Emitter_Sine(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
	};
	BHell_Enemy_VictoriaTestimony4_p3.prototype.updateEmitters = function () {
		if(this.frameCounter%3==0){
			this.emitters[0].shoot(this.emitters,true);
            // if(this.frameCounter%60){
            //     this.emitters[0].shoot(this.emitters,true);
            //     this.emitters[1].shoot(this.emitters,true);
            // }
            // else{
            //     this.emitters[0].shoot(this.emitters,true);
            //     this.emitters[0].a+=(Math.PI/60);
            //     this.emitters[0].b+=(Math.PI/60);
            //     this.emitters[1].shoot(this.emitters,true);
            //     this.emitters[1].a-=(Math.PI/60);
            //     this.emitters[1].b-=(Math.PI/60);
            // }
        }
	};
	BHell_Enemy_VictoriaTestimony4_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 0;
		my.controller.destroyEnemyBullets();
	};
	//main update loop
	BHell_Enemy_VictoriaTestimony4_p3.prototype.update = function () {
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
	BHell_Enemy_VictoriaTestimony4_p3.prototype.destroy = function() {
		//adding these to the correct line allow it to transition to a different phase
		my.player.bombed = true;
		my.player.PhaseOver = true;
		my.player.nextMap = Number(31);//the 3 here is the map number change this to whatever map number u want to transition there on victory
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
		//initialize your own variables 
		this.angle = 0; 
		this.change = 0; 
		//or inherit prameters from the enemy class
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

