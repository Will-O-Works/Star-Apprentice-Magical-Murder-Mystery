/*:
 * @plugindesc Alternate menu for Star Apprentice: Magical Murder Mystery
 * @author ravyn
 * @requiredAssets img/pictures/Menu_BG.png
 * @requiredAssets img/pictures/Menu_BGExit[1x5].png
 * @requiredAssets img/pictures/Evidence_BG.png
 * @requiredAssets img/pictures/BG.png
 */ 
var menuBGBitmap = ImageManager.loadPicture("Menu_BG");
var menuBGSprite = new Sprite(menuBGBitmap);
var evidenceBGBitmap = ImageManager.loadPicture("Evidence_BG");
var evidenceBGSprite = new Sprite(evidenceBGBitmap);
var optionsBGBitmap = ImageManager.loadPicture("Options_BG");
var optionsBGSprite = new Sprite(optionsBGBitmap);
var saveBGBitmap = ImageManager.loadPicture("Save_BG");
var saveBGSprite = new Sprite(saveBGBitmap);
var itemBGBitmap = ImageManager.loadPicture("BG");
var itemBGSprite = new Sprite(itemBGBitmap);
var leftArrowBitmap = ImageManager.loadPicture("Left_Arrow");
var leftArrow = new Sprite(leftArrowBitmap);
var rightArrowBitmap = ImageManager.loadPicture("Right_Arrow");
var rightArrow = new Sprite(rightArrowBitmap);
var evidenceArrowY = 456;
var evidenceLeftArrowX = 522;
var evidenceRightArrowX = 740;
var arrowTime = 6;
var arrowMove = 6;
var evidenceRightArrowTimer = 0;
var evidenceLeftArrowTimer = 0;
var arrowImageInit = false;
var unravelled_timer_length = 15;
var menuBGAnimFrames = 5;
var timerInterval = (menuBGAnimFrames - 1)/(unravelled_timer_length);
var o_unravelled_timer_length = 21;
var o_menuBGAnimFrames = 7;
var o_timerInterval = (o_menuBGAnimFrames - 1)/(o_unravelled_timer_length);
var s_unravelled_timer_length = 24;
var s_menuBGAnimFrames = 8;
var s_timerInterval = (s_menuBGAnimFrames - 1)/(s_unravelled_timer_length);
var e_unravelled_timer_length = 24;
var e_menuBGAnimFrames = 8;
var e_timerInterval = (e_menuBGAnimFrames - 1)/(e_unravelled_timer_length);
var evidenceWidth = 406;
var evidenceItemSize = 156;
var evidenceOffset = 56;
var saveOffset = 56;
var current_title = "Star Apprentice";
var itemReadX = 100;
var itemReadY = 144;
var textDescX = 400;
var textDescY = 153;
var itemBG = null;
var unravelled = false;
var unravelled_timer = 0;
var itemImageInit = true;
var rightHeld = 0;
var leftHeld = 0;
var volumeCooldown = 0;
var maxVolumeCooldown = 3;
var optionsAmount = 3;

// SFX change
Scene_Map.prototype.callMenu = function() {
    AudioManager.playSe({name: 'journal_open', pan: 0, pitch: 100, volume: 90});
    SceneManager.push(Scene_Menu);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};

Window_Selectable.prototype.processCancel = function() {
    AudioManager.playSe({name: 'journal_close', pan: 0, pitch: 100, volume: 90});
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
};

Window_ChoiceList.prototype.processCancel = function() {
    SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
};

Window_Selectable.prototype.playOkSound = function() {
    AudioManager.playSe({name: 'journal_open', pan: 0, pitch: 100, volume: 90});
};

Window_Options.prototype.playOkSound = function() {
    SoundManager.playOk();
};

Window_ItemList.prototype.playOkSound = function() {
    SoundManager.playOk();
};

Window_ChoiceList.prototype.playOkSound = function() {
    if ($gameMessage.choices().length == 2) {
        // For yes or nos
        if (this.index() == 0) {
            SoundManager.playOk();
        } else {
            SoundManager.playCancel();
        }
    } else {
        // For multiple choices
        SoundManager.playOk();
    }

};


// Initialize the scene menu itself
Scene_Menu.prototype.create = function() {
    unravelled = false;
    unravelled_timer = 0;
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createGoldWindow();
    this.createStatusWindow();

    var ww = Graphics.boxWidth - this._statusWindow.width;
    this._commandWindow.x = 320 - ww/2;
    this._commandWindow.y = 92;
    $gameSwitches.setValue(19, true);
};

var _Scene_Menu_update = Scene_Menu.prototype.update;

Scene_Menu.prototype.update = function() {
    document.body.style.cursor = 'default';
    _Scene_Menu_update.call(this);
};

// Force the sprite behind the windowlayer
var _Scene_Menu_createWindowLayer = Scene_Menu.prototype.createWindowLayer;

Scene_Menu.prototype.createWindowLayer = function() {
    menuBGSpriteImage = this.addChild(menuBGSprite);
    _Scene_Menu_createWindowLayer.call(this);
};

// Make the cursor invisible if not unravelled yet
var _Window_MenuCommand_updateCursor = Window_MenuCommand.prototype._updateCursor;

Window_MenuCommand.prototype._updateCursor = function() {
    _Window_MenuCommand_updateCursor.call(this);
    if (!unravelled) {
        this._windowCursorSprite.alpha = 0;
    }
};

// Sets height for window menu
Window_MenuCommand.prototype.lineHeight = function() {
    return 64;
};

// Update script
var _Window_MenuCommand_update = Window_MenuCommand.prototype.update;

Window_MenuCommand.prototype.update = function() {
    _Window_MenuCommand_update.call(this);
    if (!unravelled) {
        menuBGSpriteImage.setTransform(0, -540 * Math.floor(unravelled_timer * timerInterval));
        if (unravelled_timer >= unravelled_timer_length) {
            unravelled = true;
            this.drawAllItems();
        }
        unravelled_timer++;
    }
};

// DrawAllItems script, make the items invisible if not unravelled yet
var _Window_MenuCommand_drawAllItems = Window_MenuCommand.prototype.drawAllItems;

Window_MenuCommand.prototype.drawAllItems = function () {
    if (unravelled) {
        _Window_MenuCommand_drawAllItems.call(this);
    }
}

// OPTIONS MENU

// Deletes useless general options
Window_Options.prototype.addGeneralOptions = function() {
    // Empty
};

// Deletes useless sound options
Window_Options.prototype.addVolumeOptions = function() {
    this.addCommand(TextManager.bgmVolume, 'bgmVolume');
    this.addCommand(TextManager.seVolume, 'seVolume');
};

Window_Options.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        // Overwritten in update    
    } else {
        this.changeValue(symbol, true);
    }
};

Window_Options.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        // Overwritten in update   
    } else {
        this.changeValue(symbol, false);
    }
};

// Options initialize the scene menu itself
var _Scene_Options_create = Scene_Options.prototype.create;
Scene_Options.prototype.create = function() {
    o_unravelled = false;
    o_unravelled_timer = 0;
    _Scene_Options_create.call(this);
};

Scene_Options.prototype.createOptionsWindow = function() {
    this._optionsWindow = new Window_Options();
    this._optionsWindow.setHandler('cancel', this.popScene.bind(this));
    var offset = 96;
    var menuHeight = 388;
    this._optionsWindow.y = offset + menuHeight/2 - this._optionsWindow.itemHeight() * (optionsAmount/2);
    this.addWindow(this._optionsWindow);
};

// Options force sprite
var _Scene_Options_createWindowLayer = Scene_Options.prototype.createWindowLayer;

Scene_Options.prototype.createWindowLayer = function() {
    optionsBGSpriteImage = this.addChild(optionsBGSprite);
    _Scene_Options_createWindowLayer.call(this);
};

// Options make the cursor invisible if not unravelled yet
var _Window_Options_updateCursor = Window_Options.prototype._updateCursor;

Window_Options.prototype._updateCursor = function() {
    _Window_Options_updateCursor.call(this);
    if (typeof o_unravelled == "boolean") {
        if (!o_unravelled) {
            this._windowCursorSprite.alpha = 0;
        }
    }
};

// Options update script
var _Window_Options_update = Window_Options.prototype.update;

Window_Options.prototype.update = function() {
    _Window_Options_update.call(this);
    if (volumeCooldown > 0) {
        volumeCooldown--;
    }
    if (typeof o_unravelled == "boolean") {
        if (!o_unravelled) {
            optionsBGSpriteImage.setTransform(0, -540 * Math.floor(o_unravelled_timer * o_timerInterval));
            if (o_unravelled_timer >= o_unravelled_timer_length) {
                o_unravelled = true;
            }
            o_unravelled_timer++;
        } else {
            this.drawAllItems();
        }
    }
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (this.isVolumeSymbol(symbol)) {
        var value = this.getConfigValue(symbol);

        if (Input.isTriggered("right")) {
            if (rightHeld === 0) {
                value += 1;
                value = value.clamp(0, 100);
                this.changeValue(symbol, value);
            }
        }
        if (Input.isTriggered("left")) {
            if (leftHeld === 0) {
                value -= 1;
                value = value.clamp(0, 100);
                this.changeValue(symbol, value);
            }
        }

        if (Input.isPressed("right")) {
            rightHeld++;
        } else {
            rightHeld = 0;
        }
        if (Input.isPressed("left")) {
            leftHeld++;
        } else {
            leftHeld = 0;
        }

        var changeAmountRight = Math.floor(rightHeld/10);
        var changeAmountLeft = Math.floor(leftHeld/10);

        if (changeAmountRight > 0 && volumeCooldown === 0) {
            value += changeAmountRight;
            value = value.clamp(0, 100);
            this.changeValue(symbol, value);
            volumeCooldown = maxVolumeCooldown;
        }

        if (changeAmountLeft > 0 && volumeCooldown === 0) {
            value -= changeAmountLeft;
            value = value.clamp(0, 100);
            this.changeValue(symbol, value);
            volumeCooldown = maxVolumeCooldown;
        }

    }
};

// Draw script
_Window_Options_drawAllItems = Window_Options.prototype.drawAllItems;
Window_Options.prototype.drawAllItems = function () {
    if (o_unravelled) {
        _Window_Options_drawAllItems.call(this);
    }
}

// SAVES MENU

// Get rid of this functionality
Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
    // Empty
};

// Save file
Window_SavefileList.prototype.drawGameTitle = function(info, x, y, width) {
    if (info.title) {
        this.drawText(current_title, x, y, width);
    }
};

// Makes cursor snap
Window_SavefileList.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = 960 - ((saveOffset + 18) * 2);
    rect.height = this.itemHeight();
    rect.x = saveOffset + index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
    return rect;
};


// Scene Create
var _Scene_File_create = Scene_File.prototype.create;
Scene_File.prototype.create = function() {
    s_unravelled = false;
    s_unravelled_timer = 0;
    _Scene_File_create.call(this);
};

// Help window text
Scene_File.prototype.createHelpWindow = function() {
    // Empty
};

// Save force sprite
var _Scene_File_createWindowLayer = Scene_File.prototype.createWindowLayer;

Scene_File.prototype.createWindowLayer = function() {
    saveBGSpriteImage = this.addChild(saveBGSprite);
    _Scene_File_createWindowLayer.call(this);
};

// Save make the cursor invisible if not unravelled yet
var _Window_SavefileList_updateCursor = Window_SavefileList.prototype._updateCursor;

Window_SavefileList.prototype._updateCursor = function() {
    _Window_SavefileList_updateCursor.call(this);
    if (typeof s_unravelled == "boolean") {
        if (!s_unravelled) {
            this._windowCursorSprite.alpha = 0;
        }
    }
};

// Save update script
var _Window_SavefileList_update = Window_SavefileList.prototype.update;

Window_SavefileList.prototype.update = function() {
    _Window_SavefileList_update.call(this);
    if (typeof s_unravelled == "boolean") {
        if (!s_unravelled) {
            saveBGSpriteImage.setTransform(0, -540 * Math.floor(s_unravelled_timer * s_timerInterval));
            if (s_unravelled_timer >= s_unravelled_timer_length) {
                s_unravelled = true;
            }
            s_unravelled_timer++;
        } else {
            this.drawAllItems();
        }
    }
};

// Save script
_Window_SavefileList_drawAllItems = Window_SavefileList.prototype.drawAllItems;
Window_SavefileList.prototype.drawAllItems = function () {
    if (s_unravelled) {
        _Window_SavefileList_drawAllItems.call(this);
    }
}

Scene_File.prototype.createListWindow = function() {
    var x = 0;
    var y = 96;
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight - y - 20;
    this._listWindow = new Window_SavefileList(x, y, width, height);
    this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
    this._listWindow.setHandler('cancel', this.popScene.bind(this));
    this._listWindow.select(this.firstSavefileIndex());
    this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
    this._listWindow.setMode(this.mode());
    this._listWindow.refresh();
    this.addWindow(this._listWindow);
};

// ITEM MENU

// Item initialize the scene menu itself
var _Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
    e_unravelled = false;
    e_unravelled_timer = 0;
    _Scene_Item_create.call(this);
    // Makes a window that cuts off the bottom of the items
    this.blockingWindow = new Window_ItemList(0, 502, 960, 38);
    this.addWindow(this.blockingWindow);
};

// Item force sprite
var _Scene_Item_createWindowLayer = Scene_Item.prototype.createWindowLayer;

Scene_Item.prototype.createWindowLayer = function() {
    evidenceBGSpriteImage = this.addChild(evidenceBGSprite);
    _Scene_Item_createWindowLayer.call(this);
};

Window_ItemList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height + 100);
    this._category = 'none';
    this._data = [];
};

// Item make the cursor invisible if not unravelled yet
var _Window_ItemList_updateCursor = Window_ItemList.prototype._updateCursor;

Window_ItemList.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    var maxCols = this.maxCols();
    rect.width = evidenceWidth;
    rect.height = this.itemHeight();
    rect.x = evidenceOffset + index % maxCols * (rect.width + this.spacing()) - this._scrollX;
    rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
    return rect;
};

Window_ItemList.prototype.maxTopRow = function() {
    return Math.max(0, this.maxRows() - this.maxPageRows() + 1);
};

Window_ItemList.prototype._updateCursor = function() {
    _Window_ItemList_updateCursor.call(this);
    if (typeof e_unravelled == "boolean") {
        if (!e_unravelled || this._data.length === 0) {
            this._windowCursorSprite.alpha = 0;
        }
    }
    var row = this.row();
    if (row == this.bottomRow()) {
        this.setTopRow(row - 1);
    }
};

Window_ItemList.prototype.maxCols = function() {
    return 2;
};

Window_ItemList.prototype.itemHeight = function() {
    return 156;
};

Window_ItemList.prototype.spacing = function() {
    return 0;
};

Window_ItemList.prototype.selectLast = function() {
    var index = this._data.indexOf($gameParty.lastItem());
    this.select(index >= 0 ? index : 0);
};

Window_ItemList.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x - 2, rect.y, rect.width - numberWidth);
        this.changePaintOpacity(1);
    } else {
        var rect = this.itemRect(index);
        this.drawIcon(0, rect.x, rect.y);
    }
};

// Cursor wrapping code
Window_ItemList.prototype.cursorUp = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (index >= maxCols || (wrap && maxCols === 1)) {
        this.select((index - maxCols + maxItems) % maxItems);
    } else if (index === 0) {
        this.select(this._data.length - 1);
    } else if (index === 1) {
        this.select(this._data.length - 1);
    }
};

Window_ItemList.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index > 0 || (wrap && this.isHorizontal()))) {
        this.select((index - 1 + maxItems) % maxItems);
    } else if (index === 0) {
        this.select(this._data.length - 1);
    }
};

Window_ItemList.prototype.cursorDown = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
        this.select((index + maxCols) % maxItems);
    } else if (index === this._data.length - 1) {
        this.select(0);
    } else if (!this.isCursorLeft && index === this._data.length - 2) {
        this.select(this._data.length - 1);
    }
};

Window_ItemList.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
        this.select((index + 1) % maxItems);
    } else if (index === this._data.length - 1) {
        this.select(0);
    }
};

Window_ItemList.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var item_name = "";
        var item_name_2 = "";
        var cutOffIndex = 15;
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y);
        var item_width = this.contents.measureTextWidth(item.name);
        if (item.name.includes("\\n")) {
            item_name = item.name.split("\\n")[0];
            item_name_2 = item.name.split("\\n")[1];
        } else if (item_width > evidenceWidth - evidenceItemSize) {
            item_name = item.name.substr(0, cutOffIndex);
            item_name_2 = item.name.substr(cutOffIndex);
        } else {
            item_name = item.name;
        }
        this.drawText(item_name, x + iconBoxWidth + 2, y + 7, width - iconBoxWidth);
        if (item_name_2 != "") {
            this.drawText(item_name_2, x + iconBoxWidth + 2, y + 33, width - iconBoxWidth);
        }
    }
};

// Item update script scene
var _Scene_Item_update = Scene_Item.prototype.update;

Scene_Item.prototype.update = function() {
    _Scene_Item_update.call(this);
    var itemWin = this._itemWindow;
        if (this._actorWindow.active) {
        // Evidence cycling
        var mouseX = TouchInput._x;
        var mouseY = TouchInput._y;
        var mouseXOnLeftButton = mouseX >= evidenceLeftArrowImage.x && mouseX <= evidenceLeftArrowImage.x + evidenceLeftArrowImage.width;
        var mouseYOnLeftButton = mouseY >= evidenceLeftArrowImage.y && mouseY <= evidenceLeftArrowImage.y + evidenceLeftArrowImage.height;
        var mouseOnLeftButton = mouseXOnLeftButton && mouseYOnLeftButton;
        var mouseXOnRightButton = mouseX >= evidenceRightArrowImage.x && mouseX <= evidenceRightArrowImage.x + evidenceRightArrowImage.width;
        var mouseYOnRightButton = mouseY >= evidenceRightArrowImage.y && mouseY <= evidenceRightArrowImage.y + evidenceRightArrowImage.height;
        var mouseOnRightButton = mouseXOnRightButton && mouseYOnRightButton;
        var rightValid = itemWin.index() != itemWin.maxItems() - 1;
        var leftValid = itemWin.index() != 0;
        if (((Input.isRepeated("right") || (mouseOnRightButton && TouchInput.isRepeated()))) || ((Input.isRepeated("left") || (mouseOnLeftButton && TouchInput.isRepeated())))) {
            if (Input.isRepeated("right") || (mouseOnRightButton)) {
                evidenceRightArrowTimer = arrowTime + 1 // Account for the one extra frame that resets it
                itemWin.cursorRight(Input.isTriggered('right') || (mouseOnRightButton && TouchInput.isTriggered()));
                AudioManager.playSe({name: 'select_hover', pan: 0, pitch: 100, volume: 90});
            } else {
                evidenceLeftArrowTimer = arrowTime + 1 // Account for the one extra frame that resets it
                itemWin.cursorLeft(Input.isTriggered('left') || (mouseOnLeftButton && TouchInput.isTriggered()));
                AudioManager.playSe({name: 'select_hover', pan: 0, pitch: 100, volume: 90});
            }
            selectedItem.destroy();
            this._actorWindow.contents.clear();
            itemImageInit = false;
        }
    }
    selected_item = itemWin._data[itemWin.index()];
};

// Item update script
var _Window_ItemList_update = Window_ItemList.prototype.update;

Window_ItemList.prototype.update = function() {
    _Window_ItemList_update.call(this);
    if (typeof e_unravelled == "boolean") {
        if (!e_unravelled) {
            evidenceBGSpriteImage.setTransform(0, -540 * Math.floor(e_unravelled_timer * e_timerInterval));
            if (e_unravelled_timer >= e_unravelled_timer_length) {
                e_unravelled = true;
            }
            e_unravelled_timer++;
        } else {
            this.drawAllItems();
        }
    }
};

Window_ItemList.prototype.updateHelp = function() {
    // No item description
};

Window_ItemList.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
};

// Item DrawAllItems script, make the items invisible if not unravelled yet
var _Window_ItemList_drawAllItems = Window_ItemList.prototype.drawAllItems;

Window_ItemList.prototype.drawAllItems = function () {
    if (e_unravelled) {
        _Window_ItemList_drawAllItems.call(this);
    }
}

Window_ItemList.prototype.processOk = function () {
    if (e_unravelled) {
        if (this._data.length > 0) {
            Window_Selectable.prototype.processOk.call(this);
            leftArrowTimer = 0;
            rightArrowTimer = 0;
            itemImageInit = false;
            arrowImageInit = false;
        } else {
            this.processCancel();
        }
    }
}

// Item selection menu

Window_MenuActor.prototype.initialize = function() {
    itemBG = null;
    Window_MenuStatus.prototype.initialize.call(this, 0, 0);
    this.hide();
};

var _Window_MenuActor_update = Window_MenuActor.prototype.update;

Window_MenuActor.prototype.update = function(index) {
    _Window_MenuActor_update.call(this);
    if (!arrowImageInit) {
        // Arrows
        evidenceLeftArrowImage = this.addChild(leftArrow);
        evidenceLeftArrowImage.x = evidenceLeftArrowX;
        evidenceLeftArrowImage.y = evidenceArrowY;
        evidenceRightArrowImage = this.addChild(rightArrow);
        evidenceRightArrowImage.x = evidenceRightArrowX;
        evidenceRightArrowImage.y = evidenceArrowY;
        arrowImageInit = true;
    }
    if (evidenceLeftArrowTimer > 0) {
        evidenceLeftArrowImage.setTransform(evidenceLeftArrowX - arrowMove, evidenceArrowY);
        if (evidenceLeftArrowTimer == 1) {
            evidenceLeftArrowImage.setTransform(evidenceLeftArrowX, evidenceArrowY);
        }
        evidenceLeftArrowTimer--;
    }
    if (evidenceRightArrowTimer > 0) {
        evidenceRightArrowImage.setTransform(evidenceRightArrowX + arrowMove, evidenceArrowY);
        if (evidenceRightArrowTimer == 1) {
            evidenceRightArrowImage.setTransform(evidenceRightArrowX, evidenceArrowY);
        }
        evidenceRightArrowTimer--;
    }

    if (!itemImageInit) {
        var selectedItemName = selected_item.name.replace("\\n", "");
        selectedItemBitmap = ImageManager.loadFace(selectedItemName);
        selectedItemSprite = new Sprite(selectedItemBitmap);
        selectedItem = this.addChild(selectedItemSprite);
        // The added values center it
        selectedItem.x = itemReadX + 72;
        selectedItem.y = itemReadY + 86;
        this.drawText(selectedItemName, textDescX, textDescY);
        var unslicedDesc = selected_item.description;
        if (selectedItemName === "Old Tickets") {
            if ($gameSystem.evidenceLevel >= 1) {
                unslicedDesc += "\n ★ Roxie's tickets were bought\nbefore our original ones. She\ncouldn't have known which room\nwe were in!";
            }
        }
        var tempDesc = unslicedDesc.split(/\n|\\n/);
        for (i = 0; i < tempDesc.length; i++) {
            this.drawText(tempDesc[i], textDescX, textDescY + this.lineHeight() * (2 + i));
        }
        itemImageInit = true;
    }
    if (!itemBG) {
        itemBG = this.addChild(itemBGSprite);
        itemBG.x = itemReadX;
        itemBG.y = itemReadY;
    }  
};

Window_MenuActor.prototype.drawAllItems = function(index) {
    // Erase drawing
};

Window_MenuActor.prototype._updateCursor = function(index) {
    this._windowCursorSprite.alpha = 0;
};

Window_MenuActor.prototype.processCancel = function () {
    selectedItem.destroy();
    this.contents.clear();
    SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
}

Window_MenuActor.prototype.processOk = function() {
    if (this.isCurrentItemEnabled()) {
        this.processCancel();
    }
};