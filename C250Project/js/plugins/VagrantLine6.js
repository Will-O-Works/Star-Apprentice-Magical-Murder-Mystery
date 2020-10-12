var BHell = (function (my) {

    var BHell_Enemy_VagrantLine6 = my.BHell_Enemy_VagrantLine6 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantLine6.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine6.prototype.constructor = BHell_Enemy_VagrantLine6;

	BHell_Enemy_VagrantLine6.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 50;
        params.speed = 250; // speed of boss moving 
        params.hitbox_w = 300; // hitbox width
        params.hitbox_h = 100; // hitbox height
        params.animated = false; // if true, you need 3 frames of animation for the boss
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		var emitterParams = {};
		emitterParams.period = 10; // period for the emitter to activate
		emitterParams.aim = true; // if aims at player, need to add more stuff in BHell_Emitter_VagrantLine6 for it to work 
        emitterParams.alwaysAim = true;
		emitterParams.center_x = this.x; 
		emitterParams.center_y = this.y; 
		
		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 250, 0, this.hitboxW, this.hitboxH); // initialize the enemy's movement, check BHell_Mover
		this.emitters.push(new my.BHell_Emitter_Home(this.x, this.y, emitterParams, parent, my.enemyBullets)); // initialize the emmiter, check BHell_Emmiter 
    };

    return my;
} (BHell || {}));

