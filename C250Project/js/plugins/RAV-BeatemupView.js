//=============================================================================
// BeatemupView
//=============================================================================

/*:
 * @plugindesc Beatemup View.
 * @author ravyn
 *
 * @help This plugin does not provide plugin commands.
 */

function BeatEmUp() {
    this.initialize.apply(this, arguments);
}

(function() {
    var interpreter = new Game_Interpreter();
    var Alias_Game_CharacterBase_setDirection = Game_CharacterBase.prototype.setDirection;
    Game_CharacterBase.prototype.setDirection = function(d) {
        if (d === 4 || d === 6) {
            this._realMoveSpeed = 4;
            this._moveSpeedSpd = 4;
            this._moveSpeed = 4;
            Alias_Game_CharacterBase_setDirection.call(this, d);
        } else {
            this._realMoveSpeed = 3;
            this._moveSpeedSpd = 3;
            this._moveSpeed = 3;
        }
    };

    // Checks if a player is nearby
    BeatEmUp.playerNear = function(eventID, setXOffset=0, setYOffset=0) {
        // Doesn't work while an event is running
        var offsetsOn = false;
        if (setXOffset != 0 || setYOffset != 0) {
            offsetsOn = true;
        }
        var event = $gameMap.event(eventID);
        var collider = event.collider();
        xOffset = setXOffset;
        yOffset = setYOffset;
        var prevX = event.px / QMovement.tileSize;
        var prevY = event.py / QMovement.tileSize;
        if (offsetsOn) {
            event.setPosition(prevX + xOffset, prevY + yOffset);
        }
        nearby = (ColliderManager.getCharactersNear(collider, (function(chara) {
              if (chara.constructor !== Game_Player) return false;
              return 'break';
            })).length === 1);
        if (offsetsOn) {
            event.setPosition(prevX, prevY);
        }
        return nearby;
        }

    // Checks for if an event is in range for being clicked
    BeatEmUp.mouseClickedInRange = function(eventID, x1=24, x2=24, y1=24, y2=24) {
        var mouseX = $gameTemp.destinationPX();
        var mouseY = $gameTemp.destinationPY();
        var eventX = $gameMap.event(eventID).collider().center.x;
        var eventY = $gameMap.event(eventID).collider().center.y;
        var xInRange = mouseX >= (eventX - x1) && mouseX <= (eventX + x2);
        var yInRange = mouseY >= (eventY - y1) && mouseY <= (eventY + y2);
        var mouseInRange = xInRange && yInRange;
        return mouseInRange;
    }

    // Checks if the player is interacting with an event.
    BeatEmUp.eventInteract = function(eventID, x1=24, x2=24, y1=24, y2=24, xOffset=0, yOffset=0) {
        // x1, x2, y1, and y2 are mouse click ranges. The offsets are optional offset checks to check for collisions
        if (!$gameMap.isEventRunning()) {
            var mouseInRange = BeatEmUp.mouseClickedInRange(eventID, x1, x2, y1, y2);
            var walkingTowards = ($gamePlayer._movingWithMouse && mouseInRange)
            var interacting = (Input.isTriggered('ok') || walkingTowards)
            if (interacting && (BeatEmUp.playerNear(eventID, xOffset, yOffset))) {
                if (!$gameMap.isEventRunning()) {
                    return true;
                }
            }
        }
    }

}());
