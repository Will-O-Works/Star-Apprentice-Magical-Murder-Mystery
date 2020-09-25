var BHell = (function (my) {

    var BHell_Enemy_Shape = my.BHell_Enemy_Shape = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Shape.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Shape.prototype.constructor = BHell_Enemy_Shape;

	BHell_Enemy_Shape.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 300;
        params.speed = 2;
        params.hitbox_w = 300;
        params.hitbox_h = 150;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

		var emitterParams = {};
		emitterParams.period = 50; 
        this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 300, 0, this.hitboxW, this.hitboxH);
		this.emitters.push(new my.BHell_Emitter_Shape(this.x, this.y, emitterParams, parent, my.enemyBullets));
    };

    return my;
} (BHell || {}));

