//=============================================================================
// Beat Emitter
//=============================================================================
var BHell = (function (my) {
	var BHell_Emitter_Beat = my.BHell_Emitter_Beat = function () {
        this.initialize.apply(this, arguments);       
    };

    BHell_Emitter_Beat.prototype = Object.create(my.BHell_Emitter_Spray.prototype);
    BHell_Emitter_Beat.prototype.constructor = BHell_Emitter_Beat;

    BHell_Emitter_Beat.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Spray.prototype.initialize.call(this, x, y, params, parent, bulletList);  
        this.type = params.type||"default"; 
        this.frameCounter=1;
    };

    BHell_Emitter_Beat.prototype.shoot = function () {
		//if(this.frameCounter>80){
			switch(this.type){
            case "default":
                if(this.frameCounter%65==0){
					console.log(this.a);
					AudioManager.playSe({name: "heartbeat", volume: 100, pitch: 100, pan: 0});
                    for (var k = 0; k < this.n; k++) {
                        var bullet;
                        if (this.aim) {
                            if (this.alwaysAim || this.oldShooting === false) {
                                var dx = my.player.x - this.x + this.aimX;
                                var dy = my.player.y - this.y + this.aimY;
                                this.aimingAngle = Math.atan2(dy, dx);
                            }
                            bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle - (this.b - this.a) / 2 + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList);
                            }
                        else {
                            bullet = new my.BHell_Bullet(this.x, this.y, this.a + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList);
                        }
                        this.parent.addChild(bullet);
                        this.bulletList.push(bullet);
                    }
				}
				if(this.frameCounter%80==0){
                    for (var k = 0; k < this.n; k++) {
                        var bullet;
                        if (this.aim) {
                            if (this.alwaysAim || this.oldShooting === false) {
                                var dx = my.player.x - this.x + this.aimX;
                                var dy = my.player.y - this.y + this.aimY;
                                this.aimingAngle = Math.atan2(dy, dx);
                            }
                            bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle - (this.b - this.a) / 2 + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList);
                            }
                        else {
                            bullet = new my.BHell_Bullet(this.x, this.y, this.a + (this.b - this.a) / this.n * (k + 0.5), this.bulletParams, this.bulletList);
                        }
                        this.parent.addChild(bullet);
                        this.bulletList.push(bullet);
                    }
				}
				this.a+=Math.PI/200;
				this.b+=Math.PI/200;
			break;
		}//}
		this.frameCounter++;
		if(this.frameCounter%85==0){this.frameCounter=1;}
    };
    return my;
} (BHell || {}));
//=============================================================================
// Final Boss Heart
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_Heart = my.BHell_Enemy_Heart = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Heart.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Heart.prototype.constructor = BHell_Enemy_Heart;

	BHell_Enemy_Heart.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 50;
        params.speed = 25;
        params.hitbox_w = 96;
        params.hitbox_h = 96;
        params.animated = true;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		my.player.bombs = 0; 
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, Graphics.height / 2, 0, this.hitboxW, this.hitboxH);
		
		this.testimony = my.parse(params.t, this.x, this.y, this.patternWidth(), this.patternHeight(), Graphics.width, Graphics.height); 

		var emitterParams = {};
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 2;
		emitterParams.bullet.sprite = "$FanBullets";
        emitterParams.bullet.index = 0;
		emitterParams.center_x = -1; 
		emitterParams.center_y = -1;
		emitterParams.a = 0;
		emitterParams.b=2*Math.PI;
		emitterParams.n = 20;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		this.emitters.push(new my.BHell_Emitter_Beat(this.x, this.y, emitterParams, parent, my.enemyBullets));
		//this.emitters.push(new my.BHell_Emitter_Heart(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_Heart.prototype.update = function () {
		// Destroy itself if testimony = 2 by V.L. 11/29/2020
		if ($gameVariables.value(11) >= this.testimony) {
			
			console.log("destroyed"); 
			
			// kill the cats V.L.
			while (my.controller.enemies[1] != null) {
				my.controller.enemies[1].destroy();
			}
			
			my.player.false_bomb = false; // restore the value of false_bomb to false by V.L. 10/18/2020
			
			this.emitters.forEach(e => { // Destroy the magic circle
				e.destroy();
			});
			
			my.controller.destroyEnemyBullets();
	
			my.player.bombs = 0;
			if (this.parent != null) {
				this.parent.removeChild(this);
			}
			this.enemyList.splice(this.enemyList.indexOf(this), 1);
			
			return; 
		}
		
		my.BHell_Enemy_Base.prototype.update.call(this);
	}; 
	
	BHell_Enemy_Heart.prototype.destroy = function() {

		$gameVariables.setValue(11, this.testimony)
			
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
    return my;
} (BHell || {}));


//=============================================================================
// Rain Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Rain = my.BHell_Emitter_Rain = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Rain.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Rain.prototype.constructor = BHell_Emitter_Rain;
	
    BHell_Emitter_Rain.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
		this.bulletParams.speed = 0; 
        this.bulletParams.index = this.params.index;
		/*this.bulletParams.sprite = "$TwinsBulletsBW"; 
		if (this.x < Graphics.width / 2) {
			this.bulletParams.direction = 4; 
		} else {
			this.bulletParams.direction = 2; 
		}*/
		this.bulletParams.sprite = "$FanBulletsVagrant"; 
		this.bulletParams.direction = 8; 
		this.bulletParams.type = "a"; 
		this.bulletParams.a = 0.0025; 
		
		this.bParams = {};
		this.bParams.speed = 5; 
        this.bParams.index = this.params.index;
		this.bParams.sprite = "$VictoriaBulletsBW"; 
		this.bParams.direction = 2; 
		
		this.speed = 1; 
		this.add = 0; 
		this.angle = 0; 
		this.type = 0; 
		
		this.count = 0; 
		
		this.swap = params.swap; 
		
		this.reverse = false;  // going from up to down
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
		
    };

    BHell_Emitter_Rain.prototype.shoot = function () {
		
		if (this.swap == 1) {
			if (this.bParams.type == "w") {
				this.bParams.type = "b"; 
				this.bParams.direction = 2; 
			} else {
				this.bParams.type = "w"; 
				this.bParams.direction = 4; 
			}
			console.log("swap")
			this.swap = 0; 
		}
		
		if (this.reverse === true) {
			this.angle = -Math.PI/3 - Math.PI/3 * Math.random(); 
		} else {
			this.angle = Math.PI/3 + Math.PI/3 * Math.random(); 
			
			// if (this.count == 0 || this.count == 2) {

				var bullet = new my.BHell_BW_Bullet(this.x, this.y, 0, this.bParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				var bullet = new my.BHell_BW_Bullet(this.x, this.y, Math.PI, this.bParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
			// }
			
			this.count = (this.count + 1) % 2; 
		}
		
		if (this.count == 1) {
			var bullet = new my.BHell_Marching_Bullet(this.x + 50, this.y, this.angle, this.bulletParams, this.bulletList);
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);

			var bullet = new my.BHell_Marching_Bullet(this.x - 50, this.y, this.angle, this.bulletParams, this.bulletList);
			this.parent.addChild(bullet);
			this.bulletList.push(bullet);
		}

    };

    return my;
} (BHell || {}));

//=============================================================================
// Semi_Circle Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Semi_Circle = my.BHell_Emitter_Semi_Circle = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Semi_Circle.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Semi_Circle.prototype.constructor = BHell_Emitter_Semi_Circle;
	
    BHell_Emitter_Semi_Circle.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
		this.bulletParams.speed = 2; // 5; 
        this.bulletParams.index = this.params.index;
		
		this.bulletParams.sprite = "$FanBulletsBW"; 
		this.bulletParams.direction = 2; 
		this.bulletParams.type = "b"; 
		
		this.count = 64; 
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
		
		this.count_down = 1; 
		
    };

    BHell_Emitter_Semi_Circle.prototype.shoot = function () {
		
		if (this.count_down == 1) {
			this.count_down = 0; 
			return; 
		}
		
		for (j = 0; j < this.count; j++) {
				var bullet = new my.BHell_BW_Bullet(this.x, this.y, Math.PI / this.count * j, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
		}
		
		if (this.bulletParams.type == "b") {
			this.bulletParams.direction = 4; 
			this.bulletParams.type = "w"; 
		} else {
			this.bulletParams.direction = 2; 
			this.bulletParams.type = "b"; 
		}
		
    };

    return my;
} (BHell || {}));

//=============================================================================
// Yoyuko Bullet Emitters for vagrant
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Yoyuko = my.BHell_Emitter_Yoyuko = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Yoyuko.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Yoyuko.prototype.constructor = BHell_Emitter_Yoyuko;
	
    BHell_Emitter_Yoyuko.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
		this.bulletParams.speed = 0; 
        this.bulletParams.index = this.params.index;
		this.bulletParams.sprite = "$FinalFanBullets"; 
		this.bulletParams.direction = 6; 
		this.bulletParams.timer = this.period; // 120; 
		
		this.angle = 0; 

		this.num_bullet = 7; // number of bullets in a Testimony
		this.baseSpeed = 2.5; 
		this.angle = 0; 
		this.aim_type = 0; 
		this.count = 0; 
		
		this,count_down = 1; 
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
		
    };

    BHell_Emitter_Yoyuko.prototype.shoot = function () {
		
		if (this.count_down == 1) {
			this.count_down = 0; 
			return; 
		}
		
		if (this.count % 5 == 1) {
			this.bulletParams.direction = 6; 
				
			var dx = my.player.x - this.x;
			var dy = my.player.y - this.y;
			this.angle = Math.atan2(dy, dx);
			
			for (var j = 1; j < this.num_bullet; j++) {
				
				this.bulletParams.speed = this.baseSpeed * j; 
				this.bulletParams.type = "y1"; 

				var bullet = new my.BHell_Marching_Bullet(this.x, this.y, this.angle + Math.PI/3, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				var bullet = new my.BHell_Marching_Bullet(this.x, this.y, this.angle - Math.PI/3, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
			}
			
		}
 		
		if (this.count % 5 == 2) {
			
			//if (this.bulletParams.timer == 120) {
			//	this.bulletParams.timer = 110; 
			//}
			
			var bp = this.bulletParams; 
			bp.speed = 0.5; 
			bp.type = "y2"; 
			bp.direction = 2; 
			
			for (var b = 0; b < this.bulletList.length; b ++) {
				
				if (this.bulletList[b].type == "y1") {
				
					for (var j = 0; j < 3; j++) {
						
						this.bulletParams.b = (Math.PI * 2) / 3 * j; 
						var bullet = new my.BHell_Marching_Bullet(this.bulletList[b].x, this.bulletList[b].y, this.bulletList[b].angle + (Math.PI * 2) / 3 * j, bp, this.bulletList);
						this.parent.addChild(bullet);
						this.bulletList.push(bullet);
					}

				}
			}
		}
		
		if (this.count % 5 == 3) {

			this.bulletParams.direction = 4; 
			
			for (var b = 0; b < this.bulletList.length; b ++) {

				if (this.bulletList[b].type == "y2") {
					
					var dx = my.player.x - this.bulletList[b].x;
					var dy = my.player.y - this.bulletList[b].y;
					this.angle = Math.atan2(dy, dx);

					for (var j = 0; j < 5; j++) {
						this.bulletParams.speed = 0.5 + 2 * j / 3; 
					
						var bullet = new my.BHell_Bullet(this.bulletList[b].x, this.bulletList[b].y, this.bulletList[b].b + this.angle, this.bulletParams, this.bulletList);
						this.parent.addChild(bullet);
						this.bulletList.push(bullet);

					}

				}
			}
			
			// this.bulletParams.timer = this.period; 
		}
		
		this.count += 1; 

    };

    return my;
} (BHell || {}));


//=============================================================================
// Go_Everywhere Bullet Emitters for victoria
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Go_Everywhere = my.BHell_Emitter_Go_Everywhere = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Go_Everywhere.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Go_Everywhere.prototype.constructor = BHell_Emitter_Go_Everywhere;
	
    BHell_Emitter_Go_Everywhere.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
		this.bulletParams.speed = 0; 
        this.bulletParams.index = this.params.index;
		this.bulletParams.sprite = "$FinalFanBullets"; 
		this.bulletParams.direction = 8; 
		this.bulletParams.type = "x"; 
		this.bulletParams.a = 0.01; 
		this.bulletParams.b = 0; 
		
		this.angle = 0; 

		this.radius = 90; 
		this.max_radius = 2 * Graphics.width; 
		this.count = 8; 
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
		
    };

    BHell_Emitter_Go_Everywhere.prototype.shoot = function () {
		
		if (this.radius < this.max_radius) {
			
			my.player.Timestop = true; 

			for (j = 0; j < this.count; j++) {
				
				this.angle += Math.PI/40; 
				this.bulletParams.b = this.angle; 
				bullet = new my.BHell_Marching_Bullet(this.radius * Math.cos(2 * Math.PI / this.count * j) + my.player.x, this.radius * Math.sin(2 * Math.PI / this.count * j) + my.player.y, 2 * Math.PI / this.count * j, this.bulletParams, this.bulletList);
				
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
			}
			
		} else {
			my.player.Timestop = false; 
		}
		
		this.radius += 30; 
		
		if (this.radius > 8 * this.max_radius) {
			this.radius = 90; 
		}

    };

    return my;
} (BHell || {}));

//=============================================================================
// Arrow Bullet Emitters
//=============================================================================

var BHell = (function (my) {
	
	var BHell_Emitter_Arrow = my.BHell_Emitter_Arrow = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Arrow.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Arrow.prototype.constructor = BHell_Emitter_Arrow;
	
    BHell_Emitter_Arrow.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
		this.bulletParams.speed = 5; 
        this.bulletParams.index = this.params.index;

		this.bulletParams.sprite = "$Bullets"; 
		this.bulletParams.direction = 4; 
		
		this.angle = 0; 
		this.count = 8; 
		this.attack_between = 100; 
		this.timer = 0; 
		
		this.count = 8; 
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
		
    };

    BHell_Emitter_Arrow.prototype.shoot = function () {
		
		if (this.timer % this.attack_between == 0) {
			var dx = my.player.x - this.x;
			var dy = my.player.y - this.y;
			this.aimingAngle = Math.atan2(dy, dx);
		}
		
		if (this.timer % this.attack_between < 20) {
			
			if (this.timer % 2 == 0) {
				for (j = 0; j < this.count; j++) {
					var bullet = new my.BHell_Fan_Bullet(this.x, this.y, this.aimingAngle + 2 * Math.PI / this.count * j, this.bulletParams, this.bulletList);
					this.parent.addChild(bullet);
					this.bulletList.push(bullet);
				}
	
			} 
		}
		
		this.timer += 1; 
    };

    return my;
} (BHell || {}));


//=============================================================================
// Final Cat Enemy
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_FinalCat = my.BHell_Enemy_FinalCat = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_FinalCat.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_FinalCat.prototype.constructor = BHell_Enemy_FinalCat;

    BHell_Enemy_FinalCat.prototype.initialize = function (x, y, image, params, parent, enemyList) {
		console.log(parent); 

        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList); 
        var emitterParams = {};
        emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = false; // if aims at player 
        emitterParams.alwaysAim = false;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 2;
        emitterParams.bullet.speed = 6;
		emitterParams.swap = params.swap; 

        this.emitters.push(new my.BHell_Emitter_Rain(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
    }; 
	
	BHell_Enemy_FinalCat.prototype.move = function () {

		if (this.y >= Graphics.height) {
			this.emitters[0].swap = 1; 
			this.reverse = true; 
			this.emitters[0].reverse = this.reverse; 
			
		}
		
		if (this.y <= 0) {
			this.reverse = false; 
			this.emitters[0].reverse = this.reverse; 
		}
		
		if (this.reverse == false) {
			this.y += 6; 
		} else {
			this.y -= 6; 
		}

		this.emitters.forEach(e => {
			if (e.still == false) {
				e.move(this.x, this.y);
			}
		});
	};

	BHell_Enemy_FinalCat.prototype.shoot = function (t) {
		this.emitters.forEach(e => {
			e.shooting = t;
		});
	};


    BHell_Enemy_FinalCat.prototype.die = function() {
        this.destroy(); 
    };
	
	BHell_Enemy_FinalCat.prototype.destroy = function() {

		this.emitters.forEach(e => { // Destroy the magic circle
			e.destroy();
		});

		my.controller.destroyEnemyBullets();

		if (this.parent != null) {
			this.parent.removeChild(this);
		}
		this.enemyList.splice(this.enemyList.indexOf(this), 1);
	};


    return my;
} (BHell || {}));

//=============================================================================
// SuperFanTestimony4 Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_SuperFanTestimony4_p1 = my.BHell_Enemy_SuperFanTestimony4_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony4_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony4_p1.prototype.constructor = BHell_Enemy_SuperFanTestimony4_p1;

	BHell_Enemy_SuperFanTestimony4_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 125;
        params.hitbox_w = 506;
        params.hitbox_h = 82;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		my.player.bombs = 0; 
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 160; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$FanBulletsBlack";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true; 
		my.player.currentLine = 1;
		this.emitters.push(new my.BHell_Emitter_Leftright(this.x, this.y, emitterParams, parent, my.enemyBullets));		
		this.initializeWall(parent);
		this.initializeCrcle(parent);
		this.frameCounter=0;

	};
	BHell_Enemy_SuperFanTestimony4_p1.prototype.initializeCrcle = function (parent) {
        var emitterParams = {};
        emitterParams.a = 0;
        emitterParams.b = 2 * Math.PI;
        emitterParams.n = 10;
        emitterParams.bullet = {};
        emitterParams.bullet.speed = 2.5;
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$FanBulletsVagrant";
        emitterParams.bullet.burstcount = 4;
        emitterParams.type = "final";
        this.emitters.push(new my.BHell_Emitter_Split(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[1].offsetX= 150;
        this.emitters.push(new my.BHell_Emitter_Split(this.x, this.y, emitterParams, parent, my.enemyBullets));
        this.emitters[2].offsetX= -150;
		
		var emitterParams = {};
		emitterParams.period = 5; 
        emitterParams.bullet = {};
		emitterParams.bullet.sprite = "$FanBulletsVagrant";
        emitterParams.bullet.direction = 4;
        emitterParams.bullettype="vagrant";
        emitterParams.bullet.amp=4;
        emitterParams.bullet.period = 60;
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter
        this.emitters[5].angle= (Math.PI/4);
        this.emitters[5].offsetX = 180;
        this.emitters[5].offsetY = -40;
        this.emitters[6].angle= (3*Math.PI/4);
        this.emitters[6].offsetX = -180;
        this.emitters[6].offsetY = -40;
        this.emitters[3].angle= (Math.PI/4);
        this.emitters[3].offsetX = 140;
        this.emitters[4].angle= (3*Math.PI/4);
        this.emitters[4].offsetX = -140;
	};
	BHell_Enemy_SuperFanTestimony4_p1.prototype.initializeWall= function () {
        this.spawnNumber=18;
        this.spawnCounter = 0;
        this.lineNum=2;
	};
	BHell_Enemy_SuperFanTestimony4_p1.prototype.updateWall = function () {
        if (this.spawnNumber>=this.spawnCounter) {//change to adjust brick spawn rate
            var image = {"characterName":"$JeevesSmallRed","direction":2,"pattern":0,"characterIndex":0};
            var params = {};
            params.animated = false;
            params.frame = 0;
            params.speed =3;
            params.hp = 8;
            params.posX = this.x+200-(50*((this.spawnCounter-1)%(this.spawnNumber/this.lineNum)));
            params.posY=this.y+120-(50*Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            params.bullet = {};
            params.bullet.sprite="$VictoriaBullets1"
            params.bullet.direction=4;
            params.bullet.speed=3;//+(Math.floor((this.spawnCounter-1)/(this.spawnNumber/this.lineNum)));
            my.controller.enemies.push(new my.BHell_Enemy_Final_Brick(this.x, this.y, image, params, this.parent, my.controller.enemies));
            this.spawnCounter+=1;
            if(this.spawnCounter==1)
            {
                my.controller.enemies[1].destroy();
            }
        }  
	};
	BHell_Enemy_SuperFanTestimony4_p1.prototype.update = function () {
		if(this.frameCounter>60&&this.frameCounter%3===0){
			this.updateWall(this.frameCounter); 
		}
		my.BHell_Enemy_Base.prototype.update.call(this);
		this.frameCounter++
	}; 
	
	BHell_Enemy_SuperFanTestimony4_p1.prototype.die = function() {

		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}

		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.die.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
	BHell_Enemy_SuperFanTestimony4_p1.prototype.destroy = function() {

		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}
		
		my.player.Twinsmap = true; 

		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
    return my;
} (BHell || {}));

//=============================================================================
// SuperFanTestimony4 Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_SuperFanTestimony4_p2 = my.BHell_Enemy_SuperFanTestimony4_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony4_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony4_p2.prototype.constructor = BHell_Enemy_SuperFanTestimony4_p2;

	BHell_Enemy_SuperFanTestimony4_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {

		params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 324;
        params.hitbox_h = 72;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		my.player.bombs = 0; 
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

        this.initializeCat(parent); 
		
		var emitterparams = {};
		emitterparams.period = 150; 
		emitterparams.aim = true;
		emitterparams.alwaysAim = true;
		emitterparams.bullet = {};
        emitterparams.bullet.index = 0;
		
		this.emitters.push(new my.BHell_Emitter_Semi_Circle(this.x, this.y, emitterparams, parent, my.enemyBullets));
		
    };
	
	BHell_Enemy_SuperFanTestimony4_p2.prototype.update = function () {
		this.updateCat(this.frameCounter); 
		my.BHell_Enemy_Base.prototype.update.call(this);
		this.frameCounter++
	}; 
	
	BHell_Enemy_SuperFanTestimony4_p2.prototype.initializeCat = function () {
        this.updateCatCounter = 0;
        this.spawnNumber=1;
        this.spawnCounter = 0;
    };
    BHell_Enemy_SuperFanTestimony4_p2.prototype.updateCat = function() {
        // Spawn a suicide cat enemy every 3 seconds.
        var image = {"characterName":"$Cat","direction":2,"pattern":2,"characterIndex":2};//cat sprite is messed up fix later
        var params = {};
        params.animated = true;
        params.frame = 2;
        params.aim = false;
        params.speed =1;
        params.hp = 100;
		params.bullet = {};
		params.bullet.speed = 2;
        this.updateCatCounter = this.updateCatCounter + 1; //change to adjust cat spawn rate 
        /////lots of shenanigans
        if (this.spawnNumber-1>=this.spawnCounter) {
            for (var a = 0; a < 5; a++) {
				params.swap = 1; 
				my.controller.enemies.push(new my.BHell_Enemy_FinalCat(this.x - 300, this.y - a * 60, image, params, this.parent, my.controller.enemies));
				params.swap = 0; 
				my.controller.enemies.push(new my.BHell_Enemy_FinalCat(this.x + 300, this.y - 330 - a * 60, image, params, this.parent, my.controller.enemies));
			}
            this.spawnCounter+=1;
            if(this.spawnCounter==10)
            {
				for (var a = 0; a < 10; a++) {
					my.controller.enemies[1].destroy();
				}
            }
        }
    };
	
	BHell_Enemy_SuperFanTestimony4_p2.prototype.die = function() {

		// kill the cats V.L.
		while (my.controller.enemies[1] != null) {
			my.controller.enemies[1].destroy();
		}

		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.die.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
	BHell_Enemy_SuperFanTestimony4_p2.prototype.destroy = function() {

		my.player.Twinsmap = false; 
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
    return my;
} (BHell || {}));


//=============================================================================
// SuperFanTestimony4 Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_SuperFanTestimony4_p3 = my.BHell_Enemy_SuperFanTestimony4_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony4_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony4_p3.prototype.constructor = BHell_Enemy_SuperFanTestimony4_p3;

	BHell_Enemy_SuperFanTestimony4_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 100;
        params.speed = 125;
        params.hitbox_w = 506;
        params.hitbox_h = 82;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		my.player.bombs = 0; 
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterparams = {};
		emitterparams.period = 1; 
		emitterparams.aim = true;
		emitterparams.alwaysAim = true;
		emitterparams.bullet = {};
        emitterparams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 0;
		
		this.emitters.push(new my.BHell_Emitter_Go_Everywhere(this.x, this.y, emitterparams, parent, my.enemyBullets));
		
		var emitterparams = {};
		emitterparams.period = 100; 
		emitterparams.aim = true;
		emitterparams.alwaysAim = true;
		emitterparams.bullet = {};
        emitterparams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 0;

		this.emitters.push(new my.BHell_Emitter_Yoyuko(this.x, this.y, emitterparams, parent, my.enemyBullets));

    };


	BHell_Enemy_SuperFanTestimony4_p3.prototype.shoot = function (t) {
		this.emitters.forEach(e => {
			e.shooting = t;
		});
	};
	
	
	BHell_Enemy_SuperFanTestimony4_p3.prototype.destroy = function() {

		//adding these to the correct line allow it to transition to a different phase
		my.player.bombed = true;
		my.player.PhaseOver = true;
		my.player.nextMap = Number(48);//the 3 here is the map number change this to whatever map number u want to transition there on victory
			
		my.BHell_Enemy_Base.prototype.destroy.call(this);
	};
	
    return my;
} (BHell || {}));


//=============================================================================
// Leftright marching Bullet Emitters
//=============================================================================
var BHell = (function (my) {
	
	var BHell_Emitter_Leftright = my.BHell_Emitter_Leftright = function () {
        this.initialize.apply(this, arguments);
    };
	
	BHell_Emitter_Leftright.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Leftright.prototype.constructor = BHell_Emitter_Leftright;
	
    BHell_Emitter_Leftright.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList);
		
		this.i = 0;
        this.parent = parent;
        this.params = params;
		
        this.bulletParams = {};
        this.bulletParams.sprite = "$TwinsBulletsBlack";
        this.bulletParams.index = this.params.index;
        this.bulletParams.direction = 8; // this.params.direction;
		
		this.num_bullet = 6; // number of bullets in a Testimony
		this.attack_between = Graphics.height / this.num_bullet; // time between two major attacks

		this.baseSpeed = 1; 
		this.angle = Math.PI / 2; 
		this.count = 1; 
		
		if (params != null) {
			this.bulletParams.sprite = params.bullet.sprite || this.bulletParams.sprite; 
        }
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
		this.j = 0; // Frame counter. Used for state switching.
	};
	
    BHell_Emitter_Leftright.prototype.shoot = function () {
		
		this.center_y = Graphics.height / 4 + Graphics.height / 2 * Math.random() ; 
		if (this.count == 0) {
			this.b_x = Graphics.width - 1; 
			this.angle = Math.PI; 
			this.count = 1; 
		} else {
			this.b_x = 0; 
			this.angle = 0; 
			this.count = 0; 
		}
		
		for (var j = 0; j < this.num_bullet; j++) {
			for (var k = 0; k < 5; k ++) {
				this.bulletParams.speed = this.baseSpeed + k / 2; 
				this.bulletParams.type = "a"; 
				this.bulletParams.a = (this.num_bullet - j) / 150; 
				this.b_y = this.center_y + j * this.attack_between; 
				
				var bullet = new my.BHell_Marching_Bullet(this.b_x, this.b_y, this.angle, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
				
				this.b_y = this.center_y - j * this.attack_between; 
				var bullet = new my.BHell_Marching_Bullet(this.b_x, this.b_y, this.angle, this.bulletParams, this.bulletList);
				this.parent.addChild(bullet);
				this.bulletList.push(bullet);
			}

        }
		
		// console.log("shooting...");
    };
    return my;
} (BHell || {}));





//everything reffered to as bricks below is the jeeves that arnt part of the time stop
//=============================================================================
// Brick Emitter
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_Final_Brick = my.BHell_Enemy_Final_Brick = function() {
        this.initialize.apply(this, arguments);
    };
    
    BHell_Enemy_Final_Brick.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Final_Brick.prototype.constructor = BHell_Enemy_Final_Brick;
    
    BHell_Enemy_Final_Brick.prototype.initialize = function (x, y, image, params, parent, enemyList) {
        this.frameCounter =0;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.mover = new my.BHell_Mover_Still(params.posX, params.posY, 0, this.hitboxW, this.hitboxH);
    
        var emitterParams = {};
        emitterParams.x = 0;
        emitterParams.y = 0;
        emitterParams.period = this.period;
        emitterParams.aim = true;
        emitterParams.alwaysAim =true;
        emitterParams.a = 0;//a: Arc's initial angle (in radians),change to adjust
        emitterParams.b = 2 * Math.PI;//b: Arc's final angle (in radians),change to adjust
        emitterParams.n = 20;//n: number of bullets for each shot tho this is irrelevant since were using a custom updatechange to adjust
        // emitterParams.bullet = Object.assign({}, this.bullet);
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
		emitterParams.bullet.sprite = "$FanBulletsVagrant";
        emitterParams.bullettype="vagrant";
        emitterParams.bullet.amp=4;
        emitterParams.bullet.period=60;
		
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets)); 
		this.emitters[0].angle= (Math.PI/2);
    };
    BHell_Enemy_Final_Brick.prototype.hit = function () {
        my.BHell_Enemy_Base.prototype.hit.call(this);
        if (this.frameCounter%1===0)
        {
            this.emitters[0].shoot(true);
        }
    };
    BHell_Enemy_Final_Brick.prototype.die = function() {
        this.emitters[0].shoot(true);
        this.destroy(); 
    };
    BHell_Enemy_Final_Brick.prototype.destroy = function() {  
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
    };
    BHell_Enemy_Final_Brick.prototype.update = function() {
        my.BHell_Sprite.prototype.update.call(this);
        this.move();
        this.frameCounter =(this.frameCounter+1)%1200;
     }
    return my;
} (BHell || {}));
