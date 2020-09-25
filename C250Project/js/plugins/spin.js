var BHell = (function (my) {

    var BHell_Enemy_Spin = my.BHell_Enemy_Spin = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Spin.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Spin.prototype.constructor = BHell_Enemy_Spin;

	BHell_Enemy_Spin.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 300;
        params.speed = 3;
		params.hitbox_w = 300;
        params.hitbox_h = 150;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		var emitterParams = {};
		emitterParams.period = 0; 
		this.mover = new my.BHell_Mover_Bounce(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);
        //this.mover = new my.BHell_Mover_Chase(Graphics.width / 2, 200, params.speed);
		this.emitters.push(new my.BHell_Emitter_Spin(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };

    return my;
} (BHell || {}));