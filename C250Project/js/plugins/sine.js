var BHell = (function (my) {

    var BHell_Enemy_Sine = my.BHell_Enemy_Sine = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Sine.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Sine.prototype.constructor = BHell_Enemy_Sine;

	BHell_Enemy_Sine.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 50;
        params.speed = 4; // speed of boss moving 
        params.hitbox_w = 300; // hitbox width
        params.hitbox_h = 100; // hitbox height
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 

		var emitterParams = {};
		emitterParams.period = 1; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player, need to add more stuff in BHell_Emitter_Sinee for it to work 
        emitterParams.alwaysAim = true;
        emitterParams.bullet = {};
        emitterParams.bullet.direction = 4;

		//emitterParams.shoot_x = Graphics.width / 4 + Math.random() * Graphics.width / 2; 
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 250, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
		this.emitters.push(new my.BHell_Emitter_Sine(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
    };

    return my;
} (BHell || {}));

