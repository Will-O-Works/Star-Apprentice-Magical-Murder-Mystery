var BHell = (function (my) {

	/** 
	 * Circle emitter by V.L.
	 */ 
	var BHell_Emitter_Circle = my.BHell_Emitter_Circle = function () {
        this.initialize.apply(this, arguments);
    };

    BHell_Emitter_Circle.prototype = Object.create(my.BHell_Emitter_Base.prototype);
    BHell_Emitter_Circle.prototype.constructor = BHell_Emitter_Circle;


    BHell_Emitter_Circle.prototype.initialize = function (x, y, params, parent, bulletList) {
        my.BHell_Emitter_Base.prototype.initialize.call(this, x, y, params, parent, bulletList); 
		
        this.n = 360;
        this.dutyCycle = 0.25;
        this.pulses = 16;
        this.invert = false;

        this.aim = true;
        this.alwaysAim = true;
        this.aimX = 0;
        this.aimY = 0;
		this.after_period = 40; 

        this.aimingAngle = 0;
		
		this.shooting = false; // Every emitter is a finite-state machine, this parameter switches between shooting and non-shooting states.
        this.oldShooting = false; // Previous shooting state.
        this.j = 0; // Frame counter. Used for state switching.
		this.round = 0; 

        if (params != null) {
            this.n = params.n || this.n;
            this.dutyCycle = params.duty_cycle || this.dutyCycle;
            this.pulses = params.pulses || this.pulses;
            this.invert = params.invert || this.invert;
            this.aim = params.aim || this.aim;
            this.alwaysAim = params.always_aim || this.alwaysAim;
            this.aimX = params.aim_x || this.aimX;
            this.aimY = params.aim_y || this.aimY;
			this.after_period = params.after_period || this.after_period;
        }
    };

    BHell_Emitter_Circle.prototype.shoot = function () {
        var pulseWidth = Math.round(this.n / this.pulses);
        var dutyCount = Math.round(this.dutyCycle * pulseWidth);

        for (var k = 0; k < this.n; k++) {

            if (((k % pulseWidth) < dutyCount) ^ this.invert) {
                var bullet;
                if (this.aim) {
                    if (this.alwaysAim || this.oldShooting === false) {
                        var dx = my.player.x - this.x + this.aimX;
                        var dy = my.player.y - this.y + this.aimY;
                        this.aimingAngle = Math.atan2(dy, dx);
                    }

                    bullet = new my.BHell_Bullet(this.x, this.y, this.aimingAngle - Math.PI + 2 * Math.PI / this.n * (k - dutyCount / 2), this.bulletParams, this.bulletList);
                }
                else {
                    bullet = new my.BHell_Bullet(this.x, this.y, 2 * Math.PI / this.n * (k - dutyCount / 2), this.bulletParams, this.bulletList);
                }

                this.parent.addChild(bullet);
                this.bulletList.push(bullet);
            }
        }
		
		this.round ++; 
		
		if (this.round == 2) {
			this.period = this.after_period; 
		}
		
    };
	
    return my;
} (BHell || {}));



var BHell = (function (my) {
	
	/** 
	 * VagrantLine5 by V.L.
	 */ 

    var BHell_Enemy_VagrantLine5 = my.BHell_Enemy_VagrantLine5 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantLine5.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine5.prototype.constructor = BHell_Enemy_VagrantLine5;
//cat
	BHell_Enemy_VagrantLine5.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 75;
        params.speed = 4;
        params.hitbox_w = 550;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);
		this.mover = new my.BHell_Mover_Still(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);

		var emitterParams = {};
		emitterParams.period = 75; 
		emitterParams.after_period = 50; 
		emitterParams.aim = true;
		emitterParams.alwaysAim = true;
		emitterParams.bullet = {};
        emitterParams.bullet.direction = 6;

		// set player.can_bomb to true by V.L.
		my.player.can_bomb = true; 
		
		this.emitters.push(new my.BHell_Emitter_Circle(this.x, this.y, emitterParams, parent, my.enemyBullets));

    };

    BHell_Enemy_VagrantLine5.prototype.destroy = function() {

        my.player.can_bomb = false; 
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        this.enemyList.splice(this.enemyList.indexOf(this), 1);
        //adding these to the correct line allow it to transition to a different phase
        my.player.PhaseOver = true;
        my.player.nextMap = Number(5);//the 3 here is the map number change this to whatever map number u want to transition there on victory
    };
	
	
    return my;
} (BHell || {}));