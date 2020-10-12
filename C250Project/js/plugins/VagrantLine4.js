var BHell = (function (my) {

    var BHell_Enemy_VagrantLine4 = my.BHell_Enemy_VagrantLine4 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantLine4.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine4.prototype.constructor = BHell_Enemy_VagrantLine4;

	BHell_Enemy_VagrantLine4.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 320; // hitbox width
        params.hitbox_h = 100; // hitbox height
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 

		var emitterParams = {};
		emitterParams.period = 1; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player, need to add more stuff in BHell_Emitter_Sine for it to work 
        emitterParams.alwaysAim = true;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;

		//emitterParams.shoot_x = Graphics.width / 4 + Math.random() * Graphics.width / 2; 
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 250, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
		this.emitters.push(new my.BHell_Emitter_Sine(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
		
		this.j = 0; 
		this.can_die = false; 
    };

    return my;
} (BHell || {}));

