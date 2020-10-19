var miscPortraitBitmap = Bitmap.load("/img/faces/Misc_Portrait.png");
var miscPortrait = new Sprite(miscPortraitBitmap);
var starApprenticePortraitBitmap = Bitmap.load("/img/faces/StarApprentice_Portrait.png");
var starApprenticePortrait = new Sprite(starApprenticePortraitBitmap);
var detectivePortraitBitmap = Bitmap.load("/img/faces/Detective_Portrait.png");
var detectivePortrait = new Sprite(detectivePortraitBitmap);
var fanPortraitBitmap = Bitmap.load("/img/faces/Fan_Portrait.png");
var fanPortrait = new Sprite(fanPortraitBitmap);
var vagrantPortraitBitmap = Bitmap.load("/img/faces/Vagrant_Portrait.png");
var vagrantPortrait = new Sprite(vagrantPortraitBitmap);
var blackPortraitBitmap = Bitmap.load("/img/faces/Black_Portrait.png");
var blackPortrait = new Sprite(blackPortraitBitmap);
var whitePortraitBitmap = Bitmap.load("/img/faces/White_Portrait.png");
var whitePortrait = new Sprite(whitePortraitBitmap);
var tycoonPortraitBitmap = Bitmap.load("/img/faces/Tycoon_Portrait.png");
var tycoonPortrait = new Sprite(tycoonPortraitBitmap);
var blankCharacterBitmap = Bitmap.load("/img/pictures/Blank_Character.png");
var selectedCharacterBitmap = Bitmap.load("/img/pictures/Selected_Character.png");
var selectedCharacter = new Sprite(selectedCharacterBitmap);
var leftArrowBitmap = Bitmap.load("/img/pictures/Left_Arrow.png");
var leftArrow = new Sprite(leftArrowBitmap);
var rightArrowBitmap = Bitmap.load("/img/pictures/Right_Arrow.png");
var rightArrow = new Sprite(rightArrowBitmap);
var selectionBuffer = 70;
var selectionY = 12;
var arrowY = 56;
var leftArrowX = 28;
var rightArrowX = 560;
var arrowTime = 6;
var arrowMove = 6;
var rightArrowTimer = 0;
var leftArrowTimer = 0;
var p_unravelled = false;
var p_unravelled_timer = 0;
var p_unravelled_timer_length = 21;
var peopleBGAnimFrames = 7;
var peopleBGBitmap = Bitmap.load("/img/pictures/People_BG.png");
var peopleBG = new Sprite(peopleBGBitmap);
var p_timerInterval = (peopleBGAnimFrames - 1)/(p_unravelled_timer_length);
var character = 0;
const characters = {
    NONE: 0,
    STARAPPRENTICE: 1,
    DETECTIVE: 2,
    FAN: 3,
    VAGRANT: 4,
    BLACK: 5,
    WHITE: 6,
    TYCOON: 7
};
var characterNames = [
    "???",
    "Star Apprentice",
    "Detective",
    "Fan",
    "Vagrant",
    "Black",
    "White",
    "Tycoon"
];
var characterTexts = [
    "???",
    "This is you!",
    ":(",
    "Weird!",
    "Cool!",
    "Edgy!",
    "Nice!",
    "Rich!"
];
var characterPortraits = [
    miscPortrait,
    starApprenticePortrait,
    detectivePortrait,
    fanPortrait,
    vagrantPortrait,
    blackPortrait,
    whitePortrait,
    tycoonPortrait
];
var characterUnlocked = [
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false
];
var characterSelections = [0,0,0,0,0,0,0,0];
var characterName = characterNames[character];
var characterText = characterTexts[character];
var characterPortrait = characterPortraits[character];
var charactersAmount = characterPortraits.length;

function Scene_People() {
    this.initialize.apply(this, arguments);
}

Scene_People.prototype = Object.create(Scene_MenuBase.prototype);
Scene_People.prototype.constructor = Scene_People;

Scene_People.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_People.change_char = function (char) {
    // Sets the character
    character = char;
    if (!characterUnlocked[char]) {
        characterPortrait = characterPortraits[0];
    } else {
        characterPortrait = characterPortraits[char];
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
    Scene_People.change_char(0);
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
            Scene_People.change_char(1);
            this._peopleWindow.drawAllItems();
            this._titleWindow.drawAllItems();
            this._textWindow.drawAllItems();
            for (i = 1; i < charactersAmount; i++) {
                characterSelections[i] = this.addChild(new Sprite(blankCharacterBitmap));
                characterSelections[i].x = Math.ceil((70 * i)/2)*2; // Aligns it to the pixel grid
                characterSelections[i].y = 12;
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
            this._init = true;
        } else {
            if (Input.isTriggered("right")) {
                rightArrowTimer = arrowTime + 1 // Account for the one extra frame that resets it;
                AudioManager.playSe({name: 'textadvanceclick', pan: 0, pitch: 100, volume: 90});
                this._peopleWindow.removeChild(portraitImage);
                if (character >= charactersAmount - 1) {
                    character = 1;
                } else {
                   character++;
                }
                Scene_People.change_char(character);
                this._peopleWindow.drawAllItems();
                this._titleWindow.drawAllItems();
                this._textWindow.drawAllItems();
            } else if (Input.isTriggered("left")) {
                leftArrowTimer = arrowTime + 1;
                AudioManager.playSe({name: 'textadvanceclick', pan: 0, pitch: 100, volume: 90});
                this._peopleWindow.removeChild(portraitImage);
                if (character <= 1) {
                    character = charactersAmount - 1;
                } else {
                    character--;
                }
                Scene_People.change_char(character);
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
        }
    } else {
        peopleBGSpriteImage.setTransform(0, -540 * Math.floor(p_unravelled_timer * p_timerInterval));
        if (p_unravelled_timer >= p_unravelled_timer_length) {
            p_unravelled = true;
        }
        p_unravelled_timer++;
    }
    if (Input.isTriggered("cancel")) {
        AudioManager.playSe({name: 'deny', pan: 0, pitch: 100, volume: 90});
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
    this.drawText(characterUnlocked[character] ? characterNames[character] : characterNames[0], 0, 150, 596, "center");
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
    this.drawText(characterUnlocked[character] ? characterTexts[character] : characterTexts[0], 56, 223);
}