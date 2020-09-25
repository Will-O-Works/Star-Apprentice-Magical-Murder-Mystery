var BHell = (function (my) {

    var BHell_Enemy_Flower = my.BHell_Enemy_Flower = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Flower.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Flower.prototype.constructor = BHell_Enemy_Flower;

	BHell_Enemy_Flower.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 300;
		params.speed = 1;
		params.hitbox_w = 300;
        params.hitbox_h = 150;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		var emitterParams = {};
		emitterParams.period = 2; 
		this.mover = new my.BHell_Mover_Chase(Graphics.width / 2, 200, params.speed);
		//this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);
		this.emitters.push(new my.BHell_Emitter_Flower(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };

    return my;
} (BHell || {}));