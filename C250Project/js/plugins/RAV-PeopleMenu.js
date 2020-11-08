var miscPortraitBitmap = ImageManager.loadFace("Misc_Portrait");
var miscPortrait = new Sprite(miscPortraitBitmap);
var starApprenticePortraitBitmap = ImageManager.loadFace("StarApprentice_Portrait");
var starApprenticePortrait = new Sprite(starApprenticePortraitBitmap);
var detectivePortraitBitmap = ImageManager.loadFace("Detective_Portrait");
var detectivePortrait = new Sprite(detectivePortraitBitmap);
var fanPortraitBitmap = ImageManager.loadFace("Fan_Portrait");
var fanPortrait = new Sprite(fanPortraitBitmap);
var vagrantPortraitBitmap = ImageManager.loadFace("Vagrant_Portrait");
var vagrantPortrait = new Sprite(vagrantPortraitBitmap);
var blackPortraitBitmap = ImageManager.loadFace("Black_Portrait");
var blackPortrait = new Sprite(blackPortraitBitmap);
var whitePortraitBitmap = ImageManager.loadFace("White_Portrait");
var whitePortrait = new Sprite(whitePortraitBitmap);
var tycoonPortraitBitmap = ImageManager.loadFace("Tycoon_Portrait");
var tycoonPortrait = new Sprite(tycoonPortraitBitmap);
var blankCharacterBitmap = ImageManager.loadPicture("Blank_Character");
var selectedCharacterBitmap = ImageManager.loadPicture("Selected_Character");
var selectedCharacter = new Sprite(selectedCharacterBitmap);
var leftArrowBitmap = ImageManager.loadPicture("Left_Arrow");
var leftArrow = new Sprite(leftArrowBitmap);
var rightArrowBitmap = ImageManager.loadPicture("Right_Arrow");
var rightArrow = new Sprite(rightArrowBitmap);
var upArrowBitmap = ImageManager.loadPicture("Up_Arrow");
var upArrow = new Sprite(upArrowBitmap);
var downArrowBitmap = ImageManager.loadPicture("Down_Arrow");
var downArrow = new Sprite(downArrowBitmap);
var selectionBuffer = 70;
var selectionY = 12;
var arrowY = 56;
var v_arrowY = 488;
var upArrowX = 98;
var downArrowX = 500;
var v_arrowTime = 6;
var v_arrowMove = 4;
var upArrowTimer = 0;
var downArrowTimer = 0;
var leftArrowX = 28;
var rightArrowX = 560;
var arrowTime = 6;
var arrowMove = 6;
var rightArrowTimer = 0;
var leftArrowTimer = 0;
var characterSpacing = 70;
var characterY = 12;
var p_unravelled = false;
var p_unravelled_timer = 0;
var p_unravelled_timer_length = 21;
var peopleBGAnimFrames = 7;
var peopleBGBitmap = ImageManager.loadPicture("People_BG");
var peopleBG = new Sprite(peopleBGBitmap);
var p_timerInterval = (peopleBGAnimFrames - 1)/(p_unravelled_timer_length);
var character = 0;
const char = {
    NONE: 0,
    STARAPPRENTICE: 1,
    DETECTIVE: 2,
    VAGRANT: 3,
    FAN: 4,
    BLACK: 5,
    WHITE: 6,
    TYCOON: 7,
    JEEVES: 8
};
var characterPortraits = [
    miscPortrait,
    starApprenticePortrait,
    detectivePortrait,
    vagrantPortrait,
    fanPortrait,
    blackPortrait,
    whitePortrait,
    tycoonPortrait
];
var characterSelections = [0,0,0,0,0,0,0,0];
var characterPortrait = characterPortraits[character];
var charactersAmount = characterPortraits.length;
var startingLine = 0;
var scrollableUp = false;
var scrollableDown = false;

var _GS_init = Game_System.prototype.initialize; 
Game_System.prototype.initialize = function() {
    _GS_init.call(this); 
    this.characterNames = ["???", "???", "???", "???", "???", "???", "???", "???"];
    this.characterNamePlates = ["Name_Question", "Name_Question", "Name_Question", "Name_Question", "Name_Question", "Name_Question", "Name_Question", "Name_Question"];
    this.characterTexts = ["???", "???", "???", "???", "???", "???", "???", "???"];
    this.characterLevels = [0,0,0,0,0,0,0,0];
    this.evidenceLevel = 0;
};

function Character_Data() {
    this.initialize.apply(this, arguments);
};

Character_Data.Names = function(character, level) {
    switch (character) {
        case char.STARAPPRENTICE:
            switch (level) {
                case 0:
                    return "???";
                    break;
                case 1:
                    return "Minnie";
                    break;
                default: 
                    return this.Names(character, 1);
                    break;
            }
            break;
        case char.DETECTIVE:
            switch (level) {
                case 0:
                    return "???";
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                    return "Detective";
                    break;
                case 5:
                    return "Maxwell Lasnam";
                    break;
                default: 
                    return this.Names(character, 5);
                    break;
            }
            break;
        case char.VAGRANT:
            switch (level) {
                case 0:
                    return "???";
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    return "Cat Lady";
                    break;
                case 8:
                    return "Roxanne";
                    break;
                default:
                    return this.Names(character, 8);
                    break;
            }
            break;
        case char.FAN:
            switch (level) {
                case 0:
                    return "???";
                    break;
                case 1:
                    return "Fan";
                    break;
                case 2:
                    return "Charlotte";
                    break;
                default: 
                    return this.Names(character, 2);
                    break;
            }
            break;
        case char.BLACK:
            switch (level) {
                case 0:
                    return "???";
                    break;
                case 1:
                    return "Lily";
                    break;
                default: 
                    return this.Names(character, 1);
                    break;
            }
            break;
        case char.WHITE:
            switch (level) {
                case 0:
                    return "???";
                    break;
                case 1:
                    return "Iris";
                    break;
                default: 
                    return this.Names(character, 1);
                    break;
            }
            break;
        case char.TYCOON:
            switch (level) {
                case 0:
                    return "???";
                case 1:
                    return "Victoria Windsor";
                    break;
                default: 
                    return this.Names(character, 1);
                    break;
            }
            break;
    }
}

Character_Data.NamePlates = function(character, level) {
    switch (character) {
        case char.STARAPPRENTICE:
            switch (level) {
                case 0:
                    return "Name_Question";
                    break;
                case 1:
                    return "Name_StarApprentice";
                    break;
                default: 
                    return this.NamePlates(character, 1);
                    break;
            }
            break;
        case char.DETECTIVE:
            switch (level) {
                case 0:
                    return "Name_Question";
                    break;
                case 1:
                    return "Name_Detective"
                    break;
                default: 
                    return this.NamePlates(character, 1);
                    break;
            }
            break;
        case char.VAGRANT:
            switch (level) {
                case 0:
                    return "Name_Question";
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    return "Name_CatLady";
                    break;
                case 8:
                    return "Name_Vagrant";
                    break;
                default:
                    return this.NamePlates(character, 8);
                    break;
            }
            break;
        case char.FAN:
            switch (level) {
                case 0:
                    return "Name_Question";
                    break;
                case 1:
                    return "Name_Fan"
                    break;
                case 2:
                    return "Name_Charlotte"
                    break;
                default: 
                    return this.NamePlates(character, 2);
                    break;
            }
            break;
        case char.BLACK:
            switch (level) {
                case 0:
                    return "Name_Question";
                    break;
                case 1:
                    return "Name_Black";
                    break;
                default: 
                    return this.NamePlates(character, 1);
                    break;
            }
            break;
        case char.WHITE:
            switch (level) {
                case 0:
                    return "Name_Question";
                    break;
                case 1:
                    return "Name_White";
                    black;
                default: 
                    return this.NamePlates(character, 1);
                    break;
            }
            break;
        case char.TYCOON:
            switch (level) {
                case 0:
                    return "Name_Question";
                case 1:
                    return "Name_Tycoon";
                    break;
                default: 
                    return this.NamePlates(character, 1);
                    break;
            }
            break;
    }
}

Character_Data.Texts = function(character, level) {
    switch (character) {
        case char.STARAPPRENTICE:
            switch (level) {
                case 0:
                    return "???";
                    break;
                case 1:
                    return " ★ This is me!";
                    break;
                default: 
                    return this.Texts(character, 1);
                    break;
            }
            break;
        case char.DETECTIVE:
            switch (level) {
                case 0:
                    return "???";
                    break;
                case 1:
                    return " ★ An esteemed detective, my\n     boss, and mentor. A good mind\n     and a better friend.\n ★ Has been acting strange\n     lately. There's something\n     he's not telling me."
                    break;
                case 2:
                    return this.Texts(character, 1) + "\n ★ When I'm done searching for \n     the cat, we're going to chat \n     about why we're really on\n     this train."
                    break;
                case 3:
                    return this.Texts(character, 2) + "\n ★ He's been the victim of a\n     heinous crime! I must find\n     whoever did this!";
                    break;
                case 4:
                    return this.Texts(character, 3) + "\n ★ Whoever murdered him knew\n     about his abilities and what\n     room he would be in.";
                    break;
                default: 
                    return this.Texts(character, 4);
                    break;
            }
            break;
        case char.VAGRANT:
            switch (level) {
                case 0:
                    return "???";
                    break;
                case 1:
                    return " ★ Has lost her cat, but I'm \n     going to find it.";
                    break;
                case 2:
                    return this.Texts(character, 1) + "\n ★ The cat has been \n     found!";
                    break;
                case 3: 
                    return this.Texts(character, 1) + "\n ★ The cat, Snowy, has been\n     found!";
                    break;
                case 4:
                    if ($gameSystem.characterLevels[character] < 10) {
                        return this.Texts(character, 3) + "\n ★ Claims girl in the next car\n     saw her coming out of the\n     Detective's room."
                    } else {
                        return this.Texts(character, 3) + "\n ★ Claims girl in the next car\n     saw her coming out of the\n     Detective's room. The girl\n     turned out to be Charlotte.\n     Alibi confirmed."
                    }
                    break;
                case 5:
                    return this.Texts(character, 4) + "\n ★ She had some kind of history\n     with the Detective."
                    break;
                case 6:
                    return this.Texts(character, 5) + "\n ★ Her ticket was purchased\n     before the Detective's, plus\n     our room was changed, so she\n     couldn't have known where he\n     would be beforehand. But why\n     does she know when his ticket\n     was bought?"
                    break;
                case 7:
                case 8:
                    return this.Texts(character, 6) + "\n ★ She was an informant for\n     the Detective. She won't give \n     me details, but the two of \n     them came onto the train to \n     investigate something.";
                    break;
                case 9:
                    return this.Texts(character, 7) + "\n ★ The investigation target and\n     the murderer are on this\n     train, and they're in first\n     class with us."
                    break;
                default: 
                    return this.Texts(character, 9);
                    break;
            }
            break;
        case char.FAN:
            switch (level) {
                case 0:
                    return "???";
                    break;
                case 1:
                    return " ★ Apparently, the detective\n     has a fan. A big, crazy one.\n ★ She wants to meet the\n     Detective, but that'll have to\n     wait."
                    break;
                case 2:
                    return this.Texts(character, 1) + "\n ★ Despite my better judgement,\n     Charlotte will be assisting\n     me on this case. I'm mostly\n     trying to keep her out of\n     trouble.\n ★ Charlotte confirmed\n     Roxanne's alibi."
                    break;
                default: 
                    return this.Texts(character, 1);
                    break;
            }
            break;
        case char.BLACK:
            switch (level) {
                case 0:
                    return "???";
                    break;
                case 1:
                    return " ★ Works for Victoria Windsor.\n     Cuddly as a landmine. Iris'\n     twin sister.";
                    break;
                case 2:
                    return this.Texts(character, 1) + "\n ★ She was in the Military.";
                    break;
                case 3:
                    return this.Texts(character, 2) + "\n ★ She is currently a rich\n     tycoon's bodyguard, so I\n     assume she is very good with\n     weapons.";
                    break;
                case 4:
                    return this.Texts(character, 3) + "\n ★ There's something weird about\n     her eyes ...";
                    break;
                case 5:
                    return this.Texts(character, 4) + "\n ★ Claimed that the burnt ashes\n     in her room were from a\n     breakup letter.";
                    break;
                case 6:
                    return this.Texts(character, 5) + "\n ★ Sounds like the army was the\n     first place she ever fit in,\n     so why did she leave? Was\n     she discharged?";
                    break;
                default: 
                    return this.Texts(character, 6);
                    break;
            }
            break;
        case char.WHITE:
            switch (level) {
                case 0:
                    return "???";
                    break;
                case 1:
                    return " ★ Works for Victoria Windsor.\n     Saccharine sweet. Lily's\n     twin sister.";
                    break;
                case 2:
                    return this.Texts(character, 1) + "\n ★ She's a smooth speaker, good\n     at working people. She got me\n    off topic twice!";
                    break;
                case 3:
                    return this.Texts(character, 2) + "\n ★ Weird eyes like her sister.";
                    break;
                case 4:
                    return this.Texts(character, 3) + "\n ★ Shockingly, was more popular\n     and generally accepted when\n     the twins were kids.";
                    break;
                default: 
                    return this.Texts(character, 4);
                    break;
            }
            break;
        case char.TYCOON:
            switch (level) {
                case 0:
                    return "???";
                    break;
                case 1:
                    return " ★ Won't let me through to the\n     rest of the train for some\n     reason.";
                    break;
                case 2:
                    return this.Texts(character, 1) + "\n ★ Owner of the Windsor\n     Locomotive Company, the line\n     I'm on right now. Fits the\n     description of a powerful\n     person.";
                    break;
                case 3:
                    return this.Texts(character, 2) + "\n ★ She's an elitist, alright. I\n     can tell she's barely\n     controlling herself. A\n     combination like this is\n     explosive, especially over\n     something important to them.";
                    break;
                case 4:
                    return this.Texts(character, 3) + "\n ★ Has control over an ethereal\n     servant. That thing is big,\n     strong, and it can seemingly\n     disappear at will. The\n     perfect weapon.";
                    break;
                default: 
                    return this.Texts(character, 4);
                    break;
            }
            break;
    }
}

Character_Data.changeLevel = function(character, level, force=false) {
    if (level > $gameSystem.characterLevels[character] || force) {
        $gameSystem.characterLevels[character] = level;
        $gameSystem.characterNames[character] = this.Names(character, level);
        $gameSystem.characterNamePlates[character] = this.NamePlates(character, level);
        $gameSystem.characterTexts[character] = this.Texts(character, level);
    }
}

function Scene_People() {
    this.initialize.apply(this, arguments);
}

Scene_People.prototype = Object.create(Scene_MenuBase.prototype);
Scene_People.prototype.constructor = Scene_People;

Scene_People.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_People.changeChar = function (chara) {
    // Sets the character
    character = chara;
    if ($gameSystem.characterLevels[character] === 0 || (character === char.TYCOON && $gameSystem.characterLevels[character] < 3)) {
        characterPortrait = characterPortraits[0];
    } else {
        characterPortrait = characterPortraits[character];
    }
    if (typeof selectedCharacterImage != "undefined") {
        selectedCharacterImage.setTransform(Math.ceil((70 * character)/2)*2, selectedCharacterImage.y);
    }
}

Scene_People.prototype.create = function () {
    p_unravelled = false;
    p_unravelled_timer = 0;
    characterSelections = [0,0,0,0,0,0,0,0];
    leftArrowTimer = 0;
    rightArrowTimer = 0;
    upArrowTimer = 0;
    downArrowTimer = 0;
    startingLine = 0;
    scrollableUp = false;
    scrollableDown = false;
    Scene_People.changeChar(0);
    this._init = false;
    Scene_MenuBase.prototype.create.call(this);
    this._peopleWindow = new Window_People(0, 0, 960, 540);
    this._titleWindow = new Window_Title(0, 0, 614, 540);
    this._textWindow = new Window_Text(0, 0, 558, 540);
    peopleBGSpriteImage = this.addChild(peopleBG);
    this.addWindow(this._peopleWindow);
    this.addChild(this._titleWindow);
    this.addChild(this._textWindow);
}

Scene_People.prototype.update = function () {
    if (p_unravelled) {
        if (!this._init) {
            Scene_People.changeChar(1);
            this._peopleWindow.drawAllItems();
            this._titleWindow.drawAllItems();
            this._textWindow.drawAllItems();
            for (i = 1; i < charactersAmount; i++) {
                characterSelections[i] = this.addChild(new Sprite(blankCharacterBitmap));
                characterSelections[i].x = Math.ceil((characterSpacing * i)/2)*2; // Aligns it to the pixel grid
                characterSelections[i].y = characterY;
                if ($gameSystem.characterLevels[i] === 0) {
                    characterSelections[i].opacity = 85;
                }
            }
            // Selection overlay
            selectedCharacterImage = this.addChild(selectedCharacter);
            selectedCharacterImage.x = Math.ceil((selectionBuffer * 1)/2)*2;
            selectedCharacterImage.y = selectionY;
            // Arrows
            leftArrowImage = this.addChild(leftArrow);
            leftArrowImage.x = leftArrowX;
            leftArrowImage.y = arrowY;
            rightArrowImage = this.addChild(rightArrow);
            rightArrowImage.x = rightArrowX;
            rightArrowImage.y = arrowY;
            upArrowImage = this.addChild(upArrow);
            upArrowImage.y = v_arrowY;
            upArrowImage.x = -100;
            downArrowImage = this.addChild(downArrow);
            downArrowImage.y = v_arrowY;
            downArrowImage.x = -100
            this._init = true;
        } else {
            var mouseX = TouchInput._x;
            var mouseY = TouchInput._y;
            // Buttons
            var mouseXOnLeftButton = mouseX >= leftArrowImage.x && mouseX <= leftArrowImage.x + leftArrowImage.width;
            var mouseYOnLeftButton = mouseY >= leftArrowImage.y && mouseY <= leftArrowImage.y + leftArrowImage.height;
            var mouseOnLeftButton = mouseXOnLeftButton && mouseYOnLeftButton;
            var mouseXOnRightButton = mouseX >= rightArrowImage.x && mouseX <= rightArrowImage.x + rightArrowImage.width;
            var mouseYOnRightButton = mouseY >= rightArrowImage.y && mouseY <= rightArrowImage.y + rightArrowImage.height;
            var mouseOnRightButton = mouseXOnRightButton && mouseYOnRightButton;
            var mouseXOnUpButton = mouseX >= upArrowImage.x && mouseX <= upArrowImage.x + upArrowImage.width;
            var mouseYOnUpButton = mouseY >= upArrowImage.y && mouseY <= upArrowImage.y + upArrowImage.height;
            var mouseOnUpButton = mouseXOnUpButton && mouseYOnUpButton;
            var mouseXOnDownButton = mouseX >= downArrowImage.x && mouseX <= downArrowImage.x + downArrowImage.width;
            var mouseYOnDownButton = mouseY >= downArrowImage.y && mouseY <= downArrowImage.y + downArrowImage.height;
            var mouseOnDownButton = mouseXOnDownButton && mouseYOnDownButton;

            // Character selections
            var startChar = characterSelections[1];
            var finalChar = characterSelections[charactersAmount - 1];
            // This distbetween/2 nonsense aligns it so the selection is centered on the characters, rather than the start of their index
            // The minus one is a safety net so you can't select something unselectable
            var distBetween = characterSpacing - startChar.width;
            var mouseXOnCharacters = mouseX >= startChar.x && mouseX <= finalChar.x + finalChar.width + distBetween/2 - 1;
            var mouseYOnCharacters = mouseY >= startChar.y && mouseY <= finalChar.y + finalChar.height + distBetween/2 - 1;
            var mouseOnCharacters = mouseXOnCharacters && mouseYOnCharacters;
            if (TouchInput.isTriggered() && mouseOnCharacters) {
                // Returns an index by dividing the mouse position by the spacing and flooring it.
                var selectedIndex = Math.floor((mouseX - startChar.x + distBetween/2)/(characterSpacing)) + 1;
                if (selectedIndex != character) {
                    AudioManager.playSe({name: 'textadvanceclick', pan: 0, pitch: 100, volume: 90});
                    this._peopleWindow.removeChild(portraitImage);
                    character = selectedIndex
                    Scene_People.changeChar(character);
                    this._peopleWindow.drawAllItems();
                    this._titleWindow.drawAllItems();
                    this._textWindow.drawAllItems();
                }
            }
            if (Input.isRepeated("right") || (TouchInput.isRepeated() && mouseOnRightButton)) {
                startingLine = 0;
                scrollableUp = false;
                scrollableDown = false;
                rightArrowTimer = arrowTime + 1 // Account for the one extra frame that resets it;
                AudioManager.playSe({name: 'textadvanceclick', pan: 0, pitch: 100, volume: 90});
                this._peopleWindow.removeChild(portraitImage);
                if (character >= charactersAmount - 1) {
                    character = 1;
                } else {
                   character++;
                }
                Scene_People.changeChar(character);
                this._peopleWindow.drawAllItems();
                this._titleWindow.drawAllItems();
                this._textWindow.drawAllItems();
            } else if (Input.isRepeated("left") || (TouchInput.isRepeated() && mouseOnLeftButton)) {
                startingLine = 0;
                scrollableUp = false;
                scrollableDown = false;
                leftArrowTimer = arrowTime + 1;
                AudioManager.playSe({name: 'textadvanceclick', pan: 0, pitch: 100, volume: 90});
                this._peopleWindow.removeChild(portraitImage);
                if (character <= 1) {
                    character = charactersAmount - 1;
                } else {
                    character--;
                }
                Scene_People.changeChar(character);
                this._peopleWindow.drawAllItems();
                this._titleWindow.drawAllItems();
                this._textWindow.drawAllItems();
            }
            if (leftArrowTimer > 0) {
                leftArrowImage.setTransform(leftArrowX - arrowMove, arrowY);
                if (leftArrowTimer == 1) {
                    leftArrowImage.setTransform(leftArrowX, arrowY);
                }
                leftArrowTimer--;
            }
            if (rightArrowTimer > 0) {
                rightArrowImage.setTransform(rightArrowX + arrowMove, arrowY);
                if (rightArrowTimer == 1) {
                    rightArrowImage.setTransform(rightArrowX, arrowY);
                }
                rightArrowTimer--;
            }

            var scrollThreshold = 20;

            if (scrollableDown && (Input.isRepeated("down") || (TouchInput.isRepeated() && mouseOnDownButton) || (TouchInput.wheelY >= scrollThreshold))) {
                startingLine++;
                downArrowTimer = v_arrowTime + 1;
                this._textWindow.drawAllItems();
                AudioManager.playSe({name: 'select_hover', pan: 0, pitch: 100, volume: 90});
            } else if (scrollableUp && (Input.isRepeated("up") || (TouchInput.isRepeated() && mouseOnUpButton) || (TouchInput.wheelY <= -scrollThreshold))) {
                startingLine--;
                upArrowTimer = v_arrowTime + 1;
                this._textWindow.drawAllItems();
                AudioManager.playSe({name: 'select_hover', pan: 0, pitch: 100, volume: 90});
            }

            if (downArrowTimer > 0) {
                downArrowImage.setTransform(downArrowX, v_arrowY + arrowMove);
                if (downArrowTimer == 1) {
                    downArrowImage.setTransform(downArrowX, v_arrowY);
                }
                downArrowTimer--;
            }
            if (upArrowTimer > 0) {
                upArrowImage.setTransform(upArrowX, v_arrowY - arrowMove);
                if (upArrowTimer == 1) {
                    upArrowImage.setTransform(upArrowX, v_arrowY);
                }
                upArrowTimer--;
            }

            if (!scrollableDown && downArrowTimer === 0) {
                downArrowImage.x = -100;
            } else {
                downArrowImage.x = downArrowX;
            }
            if (!scrollableUp && upArrowTimer === 0) {
                upArrowImage.x = -100;
            } else {
                upArrowImage.x = upArrowX;
            }
        }
    } else {
        peopleBGSpriteImage.setTransform(0, -540 * Math.floor(p_unravelled_timer * p_timerInterval));
        if (p_unravelled_timer >= p_unravelled_timer_length) {
            p_unravelled = true;
        }
        p_unravelled_timer++;
    }
    if (Input.isTriggered("cancel") || Input.isTriggered("menu") || TouchInput.isCancelled() || Input.isTriggered("ok")) {
        AudioManager.playSe({name: 'journal_close', pan: 0, pitch: 100, volume: 90});
        SceneManager.pop();
    }
}

function Window_People() {
    this.initialize.apply(this, arguments);
}

Window_People.prototype = Object.create(Window_Base.prototype);
Window_People.prototype.constructor = Window_People

Window_People.prototype.drawAllItems = function () {
    portraitImage = this.addChild(characterPortrait);
    // 2/3 into the screen
    portraitImage.x = Math.ceil(((4 * 960 / 5) - portraitImage.width/2)/2) * 2; // Rounds to the nearest full pixel
    portraitImage.y = 540 - portraitImage.height;
}

function Window_Title() {
    this.initialize.apply(this, arguments);
}

Window_Title.prototype = Object.create(Window_Base.prototype);
Window_Title.prototype.constructor = Window_Title

Window_Title.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
}

Window_Title.prototype.drawAllItems = function () {
    this.contents.clear();
    this.drawText($gameSystem.characterNames[character], 0, 150, 596, "center");
}

function Window_Text() {
    this.initialize.apply(this, arguments);
}

Window_Text.prototype = Object.create(Window_Base.prototype);
Window_Text.prototype.constructor = Window_Text

Window_Text.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
}

Window_Text.prototype.drawAllItems = function () {
    this.contents.clear();
    var texts = $gameSystem.characterTexts[character].split("\n");
    var lineHeight = 30;
    var maxLines = 8;
    if (texts.length > 8) {
        if (startingLine + maxLines < texts.length) {
            scrollableDown = true;
        } else {
            scrollableDown = false;
        }
        if (startingLine > 0) {
            scrollableUp = true;
        } else {
            scrollableUp = false;
        }
        texts = texts.slice(startingLine, startingLine + maxLines);
        
    }
    for (i = 0; i < texts.length; i++) {
        this.drawText(texts[i], 56, 223 + (lineHeight * i) );
    }
}