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
        this.initializeZaWarudo(parent);
        this.initalizeKives(parent)

		// set player.can_bomb to true by V.L.
        my.player.can_bomb = false;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
    };
    BHell_Enemy_VictoriaTestimony3_p1.prototype.initializeZaWarudo = function (parent) {
        var emitterParams={};
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
    BHell_Enemy_VictoriaTestimony3_p1.prototype.initalizeKives = function (parent) {
        var emitterParams={};
        emitterParams.aim=true;
        emitterParams.alwaysAim=true;
        this.emitters.push(new my.BHell_Emitter_Angle(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };
    BHell_Enemy_VictoriaTestimony3_p1.prototype.updateZaWarudo = function() {
        if(this.frameCounter%120==0){
            console.log("TOKI O TOMARE!");
            my.player.Timestop=true;
            my.controller.destroyEnemyBullets();
        }
        if(this.frameCounter%15 == 0&&my.player.Timestop==false)
        {
            this.emitters[0].shoot(true);
        }
        if(this.frameCounter%500 == 0){
            console.log("time resumes");
            my.player.Timestop=false;
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
                this.updateZaWarudo();
				break;
			case "dying": // die.
				this.destroy();
				break;
		}; 
		// Update the emitter's position.
		this.emitters.forEach(e => {e.update()});
        // Update the time counter and reset it every 20 seconds.
        this.frameCounter = ((this.frameCounter) % 1200)+1;
	};
    return my;
} (BHell || {}));
