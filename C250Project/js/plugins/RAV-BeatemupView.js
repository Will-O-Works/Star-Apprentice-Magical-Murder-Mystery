//=============================================================================
// BeatemupView
//=============================================================================

/*:
 * @plugindesc Beatemup View.
 * @author ravyn
 *
 * @help This plugin does not provide plugin commands.
 */

var charPortrait = [
    'Nothing',
    'StarApprentice_Portrait[Exp5x4]',
    'Detective_Portrait[Exp3x2]',
    'Vagrant_Portrait[Exp4x3]',
    'Fan_Portrait[Exp4x4]',
    'Black_Portrait[Exp3x2]',
    'White_Portrait[Exp3x2]',
    'Tycoon_Portrait[Exp3x2]',
    'Jeeves_Portrait'
];

var allNamePlate = "Name_All";
var bothNamePlate = "Name_Both";
var sAX = 141;
var charX = 480;
var charY = 540;
var charInc = 40; // Amount that portraits move up or down
var charXs = []; // Array of all character X positions
var activeChar = 0;
var currentChars = [];
var nameX = 90;
var nameY = 380;
var fadeDist = 140;
var jeevesPos = 0;
var _ = undefined;

function BeatEmUp() {
    this.initialize.apply(this, arguments);
}

function VN() {
    this.initialize.apply(this, arguments);
}

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
    VN.init = function(chars = [char.STARAPPRENTICE], currentActiveChar = 1, slideSelf = true, slideOthers = false, newAdditions = [], slideDir = 1) {
        for (i = 1; i <= chars.length - 1; i++) {
            $bust(i).clear(0);
        }
        $gameSwitches.setValue(3, true);
        $gameMap._interpreter.wait(21);
        var prevChars = [];
        if (newAdditions.length > 0) {
            prevChars = Array.from(charXs);
        }
        charXs = [];
        currentChars = [];
        if (typeof currentActiveChar === "object") {
            activeChars = currentActiveChar;
        } else {
            activeChars = [currentActiveChar];
        }
        activeChar = currentActiveChar;
        var charAmount = chars.length;
        var fullRes = 960;
        var playerWidth = 280; // 280 is Minnie's max width
        var accessibleRes = fullRes - (playerWidth/2); // /2 to account for the buffer room on the ends 
        var startingPoint = fullRes - accessibleRes;
        
        for (i = 1; i <= charAmount; i++) {
            if (i === 1) {
                if (chars[i - 1] != undefined) {
                    $bust(i).loadBitmap('face', charPortrait[chars[i - 1]]);
                    $bust(i).moveTo((activeChars.contains(i) ? sAX : sAX - charInc) - (slideSelf ? fadeDist * slideDir : 0), activeChars.contains(i) ? charY : charY + charInc, 0);
                    if (slideSelf) {
                        $bust(i).moveTo(activeChars.contains(i) ? sAX : sAX - charInc, activeChars.contains(i) ? charY : charY + charInc);
                    }
                    $bust(i).fadeIn();
                    if (chars[i - 1] != char.STARAPPRENTICE) {
                        $bust(i).mirror();
                    }
                }
                charXs[i] = sAX;
                currentChars[i] = chars[i - 1];
            } else {
                var charXVal = 0;
                if (charAmount === 2) {
                    charXVal = charX;
                } else {
                    charXVal = startingPoint + ((accessibleRes / charAmount) * (i - 1));
                }
                if (chars[i - 1] != undefined) {
                    $bust(i).loadBitmap('face', charPortrait[chars[i - 1]]);
                    $bust(i).moveTo((prevChars[i] != undefined && !newAdditions.contains(i)) ? prevChars[i - (i < newAdditions[0] ? 0 : 1)] : (i === charAmount && newAdditions.length > 0 ? prevChars[charAmount - 1] : (charXVal + (slideOthers ? fadeDist * slideDir : 0))), activeChars.contains(i) ? charY : charY + charInc, 0);
                    if (slideOthers) {
                        $bust(i).moveTo(charXVal, activeChars.contains(i) ? charY : charY + charInc);
                    }
                    if (i != charAmount || newAdditions.length === 0) {
                        if (newAdditions.contains(i)) {
                            $bust(i).fadeOut(0);
                        }
                        $bust(i).fadeIn();
                    } else {
                        $bust(i).fadeIn(0);
                    }
                    if (chars[i - 1] === char.STARAPPRENTICE) {
                        $bust(i).mirror();
                    }
                }
                charXs[i] = charXVal;
                currentChars[i] = chars[i - 1];
            }
            activeChars.contains(i) ? $bust(i).light(0) : $bust(i).dim(0);
        }
        if (typeof currentActiveChar === "object") {
            activeChar = 0;
            var namePlate = currentActiveChar.length === 2 ? bothNamePlate : allNamePlate;
            setTimeout(VN.showName, 300, namePlate);
        } else {
            activeChar = currentActiveChar;
            if (currentActiveChar != 0) {
                if (newAdditions.length === 0) {
                    setTimeout(VN.showName, 300, $gameSystem.characterNamePlates[currentChars[activeChar]]);
                }
            } else {
                $gameScreen.erasePicture(2);
            }
        }
    }
    VN.showName = function(name) {
        $gameScreen.showPicture(2, name, 0, nameX, nameY, 100, 100, 255, 0);
    }
    VN.activeChar = function(char, evidence = false, charAmount = charXs.length - 1) {
        if (char != 1 && evidence) {
            char += 2;
        }
        var activeChars = [];
        if (typeof char === "object") {
            activeChars = char;
        } else {
            activeChars = [char];
        }
        if (char === jeevesPos - 1) {
            activeChars.push(jeevesPos);
        }
        for (i = 1; i <= charAmount; i++) {
            if (!evidence || i === 1 || i > 3) {
                if (activeChars.contains(i)) {
                    if (i === 1) {
                        $bust(i).moveTo(charXs[i], charY);
                    } else {
                        $bust(i).moveTo(charXs[i], charY);
                    }
                    $bust(i).light();
                } else {
                    if (i === 1) {
                        $bust(i).moveTo(charXs[i] - charInc, charY + charInc);
                    } else {
                        $bust(i).moveTo(charXs[i], charY + charInc);
                    }
                    $bust(i).dim();
                }
            }
        }
        if (typeof char === "object") {
            activeChar = 0;
            var namePlate = char.length == 2 ? bothNamePlate : allNamePlate;
            VN.showName(namePlate);
        } else {
            activeChar = char;
            if (char != 0) {
                VN.showName($gameSystem.characterNamePlates[currentChars[activeChar]]);
            } else {
                $gameScreen.erasePicture(2);
            }
        }
    }
    VN.addChar = function(chara, isActive = true, slide = true, charPos = charXs.length, slideDir = 1) {
        var fullRes = 960;
        var playerWidth = 280; // 280 is Minnie's max width
        var accessibleRes = fullRes - (playerWidth/2); // /2 to account for the buffer room on the ends 
        var startingPoint = fullRes - accessibleRes;
        if (isActive) {
            activeChar = charPos;
        }
        var charAmount = charXs.length - 1;
        if (charPos === 1) {
            $bust(charPos).loadBitmap('face', charPortrait[char]);
            $bust(charPos).moveTo((isActive ? sAX : sAX - charInc) - (slide ? fadeDist * slideDir : 0), isActive ? charY : charY + charInc, 0);
            if (slide) {
                $bust(charPos).moveTo(isActive ? sAX : sAX - charInc, isActive ? charY : charY + charInc);
            }
            $bust(charPos).fadeIn();
            if (char != char.STARAPPRENTICE) {
                $bust(charPos).mirror();
            }
            charXs[charPos] = sAX;
            if (isActive) {
                $bust(charPos).light(0);
                for (i = 2; i <= charAmount; i++) {
                    $bust(i).moveTo(charXs[i], charY + charInc);
                    $bust(i).dim();
                }
            } else {
                $bust(charPos).dim(0);
            }
        } else {
            charAmount++;
            $bust(charPos).loadBitmap('face', charPortrait[chara]);

            for (i = 1; i <= charAmount; i++) {
                if (i === 1) {
                    $bust(i).moveTo(i === activeChar ? charXs[i] : charXs[i] - charInc, i === activeChar ? charY : charY + charInc);
                } else {
                    var charXVal = 0;
                    if (charAmount === 2) {
                        charXVal = charX;
                    } else {
                        charXVal = startingPoint + ((accessibleRes / charAmount) * (i - 1));
                    }
                    if (i === charPos) {
                        $bust(i).moveTo(charXVal + (slide ? fadeDist * slideDir : 0), i === activeChar ? charY : charY + charInc, 0);
                        if (slide) {
                            $bust(i).moveTo(charXVal, i === activeChar ? charY : charY + charInc);
                        }
                        $bust(i).fadeIn();
                        if (chara === char.STARAPPRENTICE) {
                            $bust(i).mirror();
                        }
                    } else {
                        $bust(i).moveTo(charXVal, activeChar === i ? charY : charY + charInc);
                    }
                    charXs[i] = charXVal;
                }
                i === activeChar ? $bust(i).light() : $bust(i).dim();
            }
        }
        currentChars[charPos] = chara;
        VN.showName($gameSystem.characterNamePlates[currentChars[activeChar]]);
    }
    VN.addJeeves = function(slide = true) {
        var isActive = activeChar === charXs.length - 1;
        var fullRes = 960;
        var playerWidth = 280; // 280 is Minnie's max width
        var accessibleRes = fullRes - (playerWidth/2); // /2 to account for the buffer room on the ends 
        var startingPoint = fullRes - accessibleRes;
        var charAmount = charXs.length - 1;
        $bust(charAmount + 1).loadBitmap('face', charPortrait[char.JEEVES]);
        currentChars[charAmount + 1] = char.JEEVES;
        charXs[charAmount + 1] = charXs[charAmount];
        var charXVal = charXs[charAmount] + 200;
        $bust(charAmount + 1).moveTo(slide ? charXs[charAmount + 1] : charXVal, isActive ? charY : charY + charInc, 0);
        if (slide) {
            $bust(charAmount + 1).moveTo(charXVal, isActive ? charY : charY + charInc, 40);
            $bust(charAmount + 1).fadeIn(40);
        } else {
            $bust(charAmount + 1).fadeIn();
        }
        charXs[i] = charXVal;
        isActive ? $bust(charAmount + 1).light(0) : $bust(charAmount + 1).dim(0);
        jeevesPos = charAmount + 1;
    }
    VN.removeChar = function(charPos, isActive = false, slide = true) {
        var prevActive = activeChar;
        if (!isActive && activeChar === charPos) {
            activeChar = 0;
        } else if (isActive) {
            activeChar = charPos;
        }
        var charAmount = charXs.length - 1;
        if (charPos === 1) {
            if (activeChar === charPos) {
                $bust(i).moveTo(charXs[i], charY);
                $bust(charPos).light();
            } else {
                $bust(i).moveTo(charXs[i] - charInc, charY + charInc);
                $bust(charPos).dim();
            }
            for (i = 2; i <= charAmount; i++) {
                $bust(i).moveTo(charXs[i], i === activeChar ? charY : charY + charInc);
                i === activeChar ? $bust(i).light() : $bust(i).dim();
            }
            $bust(charPos).slideOutToLeft();
        } else {
            $bust(9).loadBitmap('face', charPortrait[currentChars[charPos]], false);
            prevActive === charPos ? $bust(9).light(0) : $bust(9).dim(0);
            $bust(9).moveTo(charXs[charPos], isActive ? charY : charY + charInc, 0);
            $bust(9).moveTo(charXs[charPos], isActive ? charY : charY + charInc);
            isActive ? $bust(9).light() : $bust(9).dim();
            slide ? $bust(9).slideOutToRight() : $bust(9).fadeOut();
            if (charAmount == 2) {
                $bust(charPos).clear(0);
            }
            var tempNewCharXs = [];
            var tempNewCurrentChars = [];
            tempNewCharXs[1] = charXs[1];
            tempNewCurrentChars[1] = currentChars[1];
            for (i = 2; i <= charAmount; i++) {
                if (i != charPos) {
                    if (i === activeChar) {
                        activeChar = tempNewCharXs.length;
                    }
                    if (charXs[i] != undefined) {
                        tempNewCharXs.push(charXs[i]);
                        tempNewCurrentChars.push(currentChars[i]);
                        $bust(i).clear(0);
                    }
                }
            }
            charXs.length = 0;
            currentChars.length = 0;
            charXs = tempNewCharXs;
            currentChars = tempNewCurrentChars;
            charAmount--;
            for (i = 2; i <= charAmount; i++) {
                $bust(i).loadBitmap('face', charPortrait[currentChars[i]]);
                $bust(i).moveTo(charXs[i], i === activeChar ? charY : charY + charInc, 0);
            }
            for (i = 1; i <= charAmount; i++) {
                if (i === 1) {
                    $bust(i).moveTo(i === activeChar ? charXs[i] : charXs[i] - charInc, i === activeChar ? charY : charY + charInc);
                } else {

                    var charXVal = 0;
                    if (charAmount === 2) {
                        charXVal = charX;
                    } else {
                        charXVal = startingPoint + ((accessibleRes / charAmount + 1) * i);
                    }
                    $bust(i).moveTo(charXVal, activeChar === i ? charY : charY + charInc);
                    charXs[i] = charXVal;
                    //currentChars[i] = char;
                }
                i === activeChar ? $bust(i).light() : $bust(i).dim();
            }
        }
    }
    VN.evidence = function(evidence) {
        $bust(2).loadBitmap('face', evidence);
        $bust(2).moveTo(480, 302, 0);
        $bust(3).loadBitmap('face', 'BG');
        $bust(3).moveTo(480, 340, 0);
        $bust(2).light(0);
        $bust(3).light(0);
        $bust(2).fadeIn();
        $bust(3).fadeIn();
    }
    VN.showEvidence = function(evidence) {
        var charAmount = charXs.length - 1;
        var fullRes = 960;
        var playerWidth = 280; // Minnie width, plus room to accomodate evidence
        var accessibleRes = fullRes - (playerWidth/2); // /2 to account for the buffer room on the ends 
        var startingPoint = fullRes - accessibleRes;
        for (i = 2; i <= charAmount; i++) {
            var charXVal = 0;
            charXVal = startingPoint + ((accessibleRes / (charAmount + 1)) * (i));
            $bust(i).moveTo(charXVal, activeChar === i ? charY : charY + charInc);
            charXs[i] = charXVal;
        }
        var evidenceXVal = startingPoint + ((accessibleRes / (charAmount + 1)));
        $bust(charAmount + 1).loadBitmap('face', evidence);
        $bust(charAmount + 1).moveTo(evidenceXVal, 302, 0);
        $bust(charAmount + 2).loadBitmap('face', 'BG');
        $bust(charAmount + 2).moveTo(evidenceXVal, 340, 0);
        $bust(charAmount + 1).light(0);
        $bust(charAmount + 2).light(0);
        $bust(charAmount + 1).fadeIn();
        $bust(charAmount + 2).fadeIn();
        for (i = 2; i <= charAmount; i++) {
            var charXVal = 0;
            charXVal = startingPoint + ((accessibleRes / (charAmount + 1)) * (i));
            $bust(i).moveTo(charXVal, activeChar === i ? charY : charY + charInc);
            charXs[i] = charXVal;
        }
    }
    VN.evidenceClear = function() {
        var fullRes = 960;
        var playerWidth = 280; // Minnie width, plus room to accomodate evidence
        var accessibleRes = fullRes - (playerWidth/2); // /2 to account for the buffer room on the ends 
        var startingPoint = fullRes - accessibleRes;
        var charAmount = charXs.length - 1;
        $bust(charAmount + 1).fadeOut();
        $bust(charAmount + 2).fadeOut();
        for (i = 2; i <= charAmount; i++) {
            var charXVal = 0;
            if (charAmount === 2) {
                charXVal = charX;
            } else {
                charXVal = startingPoint + ((accessibleRes / charAmount) * (i - 1));
            }
            $bust(i).moveTo(charXVal, activeChar === i ? charY : charY + charInc);
            charXs[i] = charXVal;
        }
    }
    VN.end = function() {
        for (i = 1; i <= charXs.length; i++) {
            $bust(i).dim();
        }
        $gameSwitches.setValue(4, true);
        charXs = [];
        currentChars = [];
        prevChars = [];
        jeevesPos = 0;
    }
    VN.forceEnd = function() {
        for (i = 1; i <= charXs.length; i++) {
            $bust(i).dim();
            $bust(i).clear();
        }
        $gameSwitches.setValue(4, true);
        charXs = [];
        currentChars = [];
        prevChars = [];
        jeevesPos = 0;
    }

}());
