//=============================================================================
// VagrantLine2.js
//=============================================================================

/*:
duplicate and edit this code to make a new boss. edit bullethell JSON file when done so the main plugin recognizes it.
link to predifined stuff u can use or extend: https://hashakgik.github.io/BulletHell-RMMV/BHell.html
*/ 

var BHell = (function (my) {

    
    var BHell_Enemy_VagrantLine2 = my.BHell_Enemy_VagrantLine2 = function() {
        this.initialize.apply(this, arguments);
    };

    BHell_Enemy_VagrantLine2.prototype = Object.create(my.BHell_Enemy_Base.prototype);
    BHell_Enemy_VagrantLine2.prototype.constructor = BHell_Enemy_VagrantLine2;

    //initalize function. set sprite hitbox params here along with speed
    BHell_Enemy_VagrantLine2.prototype.initialize = function(x, y, image, params, parent, enemyList) {
        params.hp = 10000;
        params.speed = 1;
        params.hitbox_w = 280;
        params.hitbox_h = 100;
        params.animated = false;
        my.BHell_Enemy_Base.prototype.initialize.call(this, x, y, image, params, parent, enemyList);

        //for multiple emitters initalize them here:
        this.initializecoat(parent);

        //some variables needed to change states of the boss j is a counter to keep track of time, state and recived damage are obvious
        this.j = 0;
        this.state = "started";
        this.receivedDamage = 0;

        //initalize the mover function which dictaes the movement pattern here:
        this.mover = new my.BHell_Mover_Bounce(Graphics.width / 2, 200, 0, this.hitboxW, this.hitboxH);
    };
//
//
//
//Def custom functions and class extensions here:

    //##this a generic audio and score display function that will  be modified at a later date
    BHell_Enemy_VagrantLine2.prototype.die = function() {
        $gameBHellResult.score += this.killScore;
        AudioManager.playSe({name:"Collapse4", volume:50, pitch:50, pan:0});
        this.changeState("dying");

        my.controller.destroyEnemyBullets();
    };

    //Def the emitters here:
    BHell_Enemy_VagrantLine2.prototype.initializecoat = function (parent) {
        //this is left in as a sample it shows how to implement an existing emitter, 
        //to make a new emitter from scratch reffer to : https://hashakgik.github.io/BulletHell-RMMV/tutorial-emitter_js.html
        var coatParams = {};
        coatParams.bullet = {};
        coatParams.bullet.speed = 0.5;
        coatParams.bullet.index = 0;
        coatParams.bullet.frame = 0;
        coatParams.bullet.direction = 2;
        coatParams.period = 300;
        coatParams.a = 0;
        coatParams.b = 2 * Math.PI;
        coatParams.n = 45;
        this.coatEmitters = [];
        this.coatEmitters.push(new my.BHell_Emitter_Spray(0, 0, coatParams, parent, my.enemyBullets));
        this.coatEmitters.push(new my.BHell_Emitter_Spray(0, 0, coatParams, parent, my.enemyBullets));
        this.coatEmitters[0].offsetX = -46;
        this.coatEmitters[0].offsetY = -68;
        this.coatEmitters[1].offsetX = 100;
        this.coatEmitters[1].offsetY = -60;
    };

    //function that moves the emitters relative to the sprite
    BHell_Enemy_VagrantLine2.prototype.move = function () {
        if (this.mover != null) {
            var p = this.mover.move(this.x, this.y, this.speed);
            this.x = p[0];
            this.y = p[1];
        }
        this.coatEmitters.forEach(e => {
            e.move(this.x, this.y);
        });
    };

    //setter that switches on/off  emitters takes in boolean example use on line 106
    BHell_Enemy_VagrantLine2.prototype.shoot = function(emitters, t) {
        // Replaces BHell_Enemy_Base.shoot(t). It enables only SOME emitters at the time (not all of them).
        emitters.forEach(e => {
            e.shooting = t && !my.player.justSpawned;//also stops fire for a few secs after player respawn
        });
    };

    //setter that changes state of boss and turns off fire between state changes
    BHell_Enemy_VagrantLine2.prototype.changeState = function(s) {
        if (this.state === "changing") {
            this.state = s;
        }
        else {
            this.scheduledState = s;
            this.state = "changing";
        }
        this.shoot(this.coatEmitters, false);
        this.j = 0;
    };

    //function calls inherited method used for dealing with player dagmae and if "stunned" increments the damage by 1
    BHell_Enemy_VagrantLine2.prototype.hit = function () {
        if (this.state !== "dying") {
            my.BHell_Enemy_Base.prototype.hit.call(this);

            if (this.state != "stunned") {
                this.receivedDamage++;
            }
        }
    };

    //update function that makes the hand shoot
    BHell_Enemy_VagrantLine2.prototype.updatecoat = function() {
        this.shoot(this.coatEmitters, true);
    };
//
//
//  
//Def core update function here it also serves as a finite state machine for the boss behaviours:
    BHell_Enemy_VagrantLine2.prototype.update = function () {
        my.BHell_Sprite.prototype.update.call(this);

        if (this.state !== "dying" && this.state !== "stunned") {
            this.move();
        }

        if (this.receivedDamage > 100 && this.mover.inPosition === true) {
            my.explosions.push(new my.BHell_Explosion(this.lastX, this.lastY, this.parent, my.explosions));
            this.changeState("stunned");
            my.controller.destroyEnemyBullets();
        }

        switch (this.state) {
            case "started":
                if (this.mover.inPosition === true) {
                    this.speed = 0;
                    AudioManager.playSe({name: "Monster5", volume: 100, pitch: 100, pan: 0});
                    this.changeState("pattern 1");
                }
                break;
            case "pattern 1": // Shoots from the coat and the claws for 10 seconds, then switches to pattern 2
                if (this.j > 600) {
                    this.changeState("pattern 1");
                } else {
                    this.updatecoat();
                }
                break;

            case "stunned": // Does nothing for 10 seconds.
                if (this.j > 600) {
                    this.changeState("pattern 1");
                }
                break;
            case "dying": // Spawns explosions for 5 seconds, then dies.
                if (this.j > 300) {
                    this.destroy();
                }
                else if (this.j % 10 === 0) {
                    my.explosions.push(new my.BHell_Explosion(Math.floor(Math.random() * this.hitboxW) + this.x - this.hitboxW / 2, Math.floor(Math.random() * this.hitboxH) + this.y - this.hitboxH / 2, this.parent, my.explosions));
                }
                break;
            case "changing": // Wait 3 seconds without shooting before actually changing to the scheduled state.
                if (this.j > 180) {
                    this.changeState(this.scheduledState);
                }
                break;
        }
        this.coatEmitters.forEach(e => {
            e.update();
        });

        // Update the received damage counter for the stunned state.
        if (this.j % 60 == 0) {
            this.receivedDamage = 0;
        }

        // Update the time counter and reset it every 20 seconds.
        this.j = (this.j + 1) % 1200;
    };
    return my;
//
//
//
} (BHell || {}));