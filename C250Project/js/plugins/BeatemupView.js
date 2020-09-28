//=============================================================================
// BeatemupView
//=============================================================================

/*:
 * @plugindesc Beatemup View.
 * @author ravyn
 *
 * @help This plugin does not provide plugin commands.
 */


(function() {
    var interpreter = new Game_Interpreter();
    var Alias_Game_CharacterBase_setDirection = Game_CharacterBase.prototype.setDirection;
    Game_CharacterBase.prototype.setDirection = function(d) {
        if (d === 4 || d === 6) {
            if (!this._dashing) {
                this._realMoveSpeed = 4;
                this._moveSpeedSpd = 4;
                this._moveSpeed = 4;
            } else {
                this._realMoveSpeed = 5;
                this._moveSpeedSpd = 5;
                this._moveSpeed = 5;
            }
            Alias_Game_CharacterBase_setDirection.call(this, d);
        } else {
            if (!this._dashing) {
                this._realMoveSpeed = 3;
                this._moveSpeedSpd = 3;
                this._moveSpeed = 3;
            } else {
                this._realMoveSpeed = 4;
                this._moveSpeedSpd = 4;
                this._moveSpeed = 4;
            }
        }
    };
}());
