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
        params.hp = 999;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 386; //change to adjust hitbox width
        params.hitbox_h = 75; //change to adjust hitbox height
        params.animated = false;
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
        emitterParams.bullet.speed = 6;
        emitterParams.aim =false;
        emitterParams.alwaysAim=false;
        this.totalWidth =16;
        for(var i =0;i<this.totalWidth;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = 240-(i*30);
            this.emitters[i].offsetY = -100
        }
    };
    BHell_Enemy_VictoriaTestimony2_p1.prototype.updateDolla = function() {
        for(var wave =0;wave<3;wave++){
            if (this.frameCounter==(2+(7*wave))) {//change to adjust block spawn rate
                for(var i =0;i<this.totalWidth;i++){
                    if(i>11&&i<13){continue;}
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        }
        for(var wave =0;wave<3;wave++){
            if (this.frameCounter==(59+(7*wave))) {//change to adjust block spawn rate
                for(var i =5;i<this.totalWidth;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        }
        for(var wave =0;wave<3;wave++){
            if (this.frameCounter==(101+(7*wave))) {//change to adjust block spawn rate
                for(var i =0;i<this.totalWidth-7;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        }
        for(var wave =0;wave<3;wave++){
            if (this.frameCounter==(143+(7*wave))) {//change to adjust block spawn rate
                for(var i =7;i<this.totalWidth;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        }
        for(var wave =0;wave<3;wave++){
            if (this.frameCounter==(185+(7*wave))) {//change to adjust block spawn rate
                for(var i =0;i<this.totalWidth-7;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        }
        for(var wave =0;wave<3;wave++){
            if (this.frameCounter==(228+(7*wave))) {//change to adjust block spawn rate
                for(var i =7;i<this.totalWidth;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        }
        for(var wave =0;wave<3;wave++){
            if (this.frameCounter==(267+(7*wave))) {//change to adjust block spawn rate
                for(var i =0;i<this.totalWidth-7;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        }
        this.frameCounter = ((this.frameCounter) % 300)+1;
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
// VictoriaTestimony2 Pattern 1 Test
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony2_p2 = my.BHell_Enemy_VictoriaTestimony2_p2 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony2_p2.prototype.constructor = BHell_Enemy_VictoriaTestimony2_p2;
    BHell_Enemy_VictoriaTestimony2_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 999;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 45; //change to adjust hitbox width
        params.hitbox_h = 75; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeDolla(parent);

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype.initializeDolla = function (parent) {
        var emitterParams = {};
        emitterParams.angle = 0;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 8;
        emitterParams.aim =false;
        emitterParams.alwaysAim=false;
        this.totalWidth =11;
        for(var i =0;i<this.totalWidth;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = -500;
            this.emitters[i].offsetY = 70+(i*30);
        }
        emitterParams.angle = Math.PI;
        for(var i =this.totalWidth;i<this.totalWidth*2;i++){
            this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
            this.emitters[i].offsetX = 500;
            this.emitters[i].offsetY = 55+((i%this.totalWidth)*30);
        }
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype.updateDolla = function() {
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(2+(7*wave))) {//change to adjust block spawn rate
                for(var i =3;i<this.totalWidth;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(2+(7*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth;i<this.totalWidth*2-3;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(144+(7*wave))) {//change to adjust block spawn rate
                for(var i =this.totalWidth+3;i<this.totalWidth*2;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        }
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(144+(7*wave))) {//change to adjust block spawn rate
                for(var i =0;i<this.totalWidth-3;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        }
        this.frameCounter = ((this.frameCounter) % 300)+1;
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony2_p2.prototype.destroy = function() {
        my.player.PhaseOver = true;
        my.player.nextMap = Number(8);
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_VictoriaTestimony2_p2.prototype.update = function () {
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
// VictoriaTestimony2 Pattern 1 Test
//=============================================================================
var BHell = (function (my) {
    var BHell_Enemy_VictoriaTestimony2_p3 = my.BHell_Enemy_VictoriaTestimony2_p3 = function() {
        this.initialize.apply(this, arguments);
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VictoriaTestimony2_p3.prototype.constructor = BHell_Enemy_VictoriaTestimony2_p3;
    BHell_Enemy_VictoriaTestimony2_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;//change to adjust boss HP
        params.speed = 4; //change to adjust speed of boss moving 
        params.hitbox_w = 386; //change to adjust hitbox width
        params.hitbox_h = 75; //change to adjust hitbox height
        params.animated = false;
        this.frameCounter =1;
        this.state = "started";
        this.bombedWrong =false; //VL change this variable to true if bomb is used incorrectly
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
        this.initializeDolla(parent);

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.initializeDolla = function (parent) {
        var emitterParams = {};
        emitterParams.angle = Math.PI/2;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;
        emitterParams.bullet.speed = 4;
        emitterParams.aim =false;
        emitterParams.alwaysAim=false;
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
    BHell_Enemy_VictoriaTestimony2_p3.prototype.updateDolla = function() {
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(2+(7*wave))) {//change to adjust block spawn rate
                for(var i =0;i<this.waveWidth;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        } 
        for(var wave =0;wave<4;wave++){
            if (this.frameCounter==(58+(7*wave))) {//change to adjust block spawn rate
                for(var i =this.waveWidth;i<this.waveWidth*2;i++){
                    this.emitters[i].shoot(this.emitters,true);
                };
                //console.log(this.frameCounter);
            }
        }
        this.frameCounter = ((this.frameCounter) % 114)+1;
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.die = function() {
		this.state = "dying";
		this.frameCounter = 1;
		my.controller.destroyEnemyBullets();
	};
	BHell_Enemy_VictoriaTestimony2_p3.prototype.destroy = function() {
        my.player.PhaseOver = true;
        my.player.nextMap = Number(8);
		my.BHell_Enemy_Base.prototype.destroy.call(this);
    };
    BHell_Enemy_VictoriaTestimony2_p3.prototype.update = function () {
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
