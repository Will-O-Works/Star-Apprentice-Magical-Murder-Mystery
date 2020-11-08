//=============================================================================
// FanTestimony1 Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_Credits = my.BHell_Enemy_Credits = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_Credits.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_Credits.prototype.constructor = BHell_Enemy_Credits;

	BHell_Enemy_Credits.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 999;
        params.speed = 0;
        params.hitbox_w = 0;
        params.hitbox_h = 0;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 0, 0, this.hitboxW, this.hitboxH);
    };
	
		
	BHell_Enemy_Credits.prototype.destroy = function() {

		//adding these to the correct line allow it to transition to a different phase
		my.player.PhaseOver = true;
		my.player.nextMap = Number(16);//the 3 here is the map number change this to whatever map number u want to transition there on victory
			
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
	
    return my;
} (BHell || {}));
