var BHell = (function (my) {

    var BHell_Enemy_Sample = my.BHell_Enemy_Sample = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Sample.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Sample.prototype.constructor = BHell_Enemy_Sample;

	BHell_Enemy_Sample.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 300;
        params.speed = 2; // speed of boss moving 
        params.hitbox_w = 300; // hitbox width
        params.hitbox_h = 150; // hitbox height
        params.animated = false; // if true, you need 3 frames of animation for the boss
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		var emitterParams = {};
		emitterParams.period = 50; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player, need to add more stuff in BHell_Emitter_Sample for it to work 
        emitterParams.alwaysAim = true;
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 250, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
		this.emitters.push(new my.BHell_Emitter_Sample(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
    };

    return my;
} (BHell || {}));