//=============================================================================
// SuperFanTestimony2 Pattern 1
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_SuperFanTestimony2_p1 = my.BHell_Enemy_SuperFanTestimony2_p1 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony2_p1.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony2_p1.prototype.constructor = BHell_Enemy_SuperFanTestimony2_p1;

	BHell_Enemy_SuperFanTestimony2_p1.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 75; 
		emitterParams.after_period = 50; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsWhite";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 1;
		
		emitterParams.baseSpeed = 2; 
		this.emitters.push(new my.BHell_Emitter_Opposite(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 5; 
		emitterParams.bullet_count = 3; 
		emitterParams.space_angle = Math.PI/18; 
		emitterParams.center_x = 1; 
		this.emitters.push(new my.BHell_Emitter_Spin(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.center_x = Graphics.width; 
		this.emitters.push(new my.BHell_Emitter_Spin(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 150; 
		this.emitters.push(new my.BHell_Emitter_Heart_Drop(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_SuperFanTestimony2_p1.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			//this.emitters[0].attack_between = 125; 
			// this.emitters[0].attack_between = 5; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
    return my;
} (BHell || {}));

//=============================================================================
// SuperFanTestimony2 Pattern 2
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_SuperFanTestimony2_p2 = my.BHell_Enemy_SuperFanTestimony2_p2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony2_p2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony2_p2.prototype.constructor = BHell_Enemy_SuperFanTestimony2_p2;

	BHell_Enemy_SuperFanTestimony2_p2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 125;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 100; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsWhite";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true; 
		my.player.currentLine = 1;
		
		emitterParams.period = 1; 
		emitterParams.attack_between = 250; 
		this.emitters.push(new my.BHell_Emitter_Flower(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 50; 
		this.emitters.push(new my.BHell_Emitter_Go_Home(this.x, this.y, emitterParams, parent, my.enemyBullets));
		
		emitterParams.period = 75; 
		this.emitters.push(new my.BHell_Emitter_Cross(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_SuperFanTestimony2_p2.prototype.destroy = function() {

		//adding these to the correct line allow it to transition to a different phase
		my.player.PhaseOver = true;
		my.player.nextMap = Number(32);//the 3 here is the map number change this to whatever map number u want to transition there on victory
			
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.destroy.call(this);
		/* inherit destroy function from BHell_Enemy_Base by V.L. */
	};
	
    return my;
} (BHell || {}));

//=============================================================================
// SuperFanTestimony2 Pattern 3
//=============================================================================
var BHell = (function (my) {

    var BHell_Enemy_SuperFanTestimony2_p3 = my.BHell_Enemy_SuperFanTestimony2_p3 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_SuperFanTestimony2_p3.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_SuperFanTestimony2_p3.prototype.constructor = BHell_Enemy_SuperFanTestimony2_p3;

	BHell_Enemy_SuperFanTestimony2_p3.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 25;
        params.hitbox_w = 300;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 125, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 1; 
		emitterParams.after_period = 250; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;
		emitterParams.bullet.sprite = "$TwinsBulletsBW";
        emitterParams.bullet.index = 0;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = false; 
		my.player.currentLine = 2;
		
		this.emitters.push(new my.BHell_Emitter_P3(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };
	
	BHell_Enemy_SuperFanTestimony2_p3.prototype.update = function() {
		
		if (this.bombedWrong == true) {
			// Write the bombedWrong penalty in here
			//this.emitters[0].attack_between = 125; 
			// this.emitters[0].num_bullet = 4; 
		}
		
		/* inherit update function from BHell_Enemy_Base by V.L. */
		my.BHell_Enemy_Base.prototype.update.call(this);
		/* inherit update function from BHell_Enemy_Base by V.L. */
	} 
	
    return my;
} (BHell || {}));