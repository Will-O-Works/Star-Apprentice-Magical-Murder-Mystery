/*:
 * @plugindesc Alternate menu for Star Apprentice: Magical Murder Mystery
 * @author ravyn
 * @requiredAssets img/pictures/Menu_BG.png
 * @requiredAssets img/pictures/Menu_BGExit[1x5].png
 * @requiredAssets img/pictures/Evidence_BG.png
 * @requiredAssets img/pictures/BG.png
 */ 

var menuBGBitmap = Bitmap.load("/img/pictures/Menu_BG.png");
var menuBGSprite = new Sprite(menuBGBitmap);
var evidenceBGBitmap = Bitmap.load("/img/pictures/Evidence_BG.png");
var evidenceBGSprite = new Sprite(evidenceBGBitmap);
var itemBGBitmap = Bitmap.load("/img/pictures/BG.png");
var itemBGSprite = new Sprite(itemBGBitmap);
var unravelled_timer_length = 15;
var menuBGAnimFrames = 5;
var timerInterval = (menuBGAnimFrames - 1)/(unravelled_timer_length);
var e_unravelled_timer_length = 24;
var e_menuBGAnimFrames = 8;
var e_timerInterval = (e_menuBGAnimFrames - 1)/(e_unravelled_timer_length);
var evidenceWidth = 270
var evidenceItemSize = 64;
var evidenceOffset = 56;
var itemReadX = 100;
var itemReadY = 144;
var textDescX = 400;
var textDescY = 153;
var itemBG = null;
var unravelled = false;
var unravelled_timer = 0;
var itemImageInit = true;

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


// ITEM MENU

// Item initialize the scene menu itself
var _Scene_Item_prototype_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
    e_unravelled = false;
    e_unravelled_timer = 0;
    _Scene_Item_prototype_create.call(this);
};


// Item force sprite
var _Scene_Item_createWindowLayer = Scene_Item.prototype.createWindowLayer;

Scene_Item.prototype.createWindowLayer = function() {
    evidenceBGSpriteImage = this.addChild(evidenceBGSprite);
    _Scene_Item_createWindowLayer.call(this);
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

Window_ItemList.prototype._updateCursor = function() {
    _Window_ItemList_updateCursor.call(this);
    if (typeof e_unravelled == "boolean") {
        if (!e_unravelled) {
            this._windowCursorSprite.alpha = 0;
        }
    }
};

Window_ItemList.prototype.maxCols = function() {
    return 3;
};

Window_ItemList.prototype.itemHeight = function() {
    return 64;
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
        this.drawItemName(item, rect.x + evidenceItemSize - 66, rect.y, rect.width - numberWidth);
        this.changePaintOpacity(1);
    }
};

Window_ItemList.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var item_name = "";
        var item_name_2 = "";
        var cutOffIndex = 13;
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y);
        var item_width = this.contents.measureTextWidth(item.name);
        if (item_width > evidenceWidth - evidenceItemSize) {
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
    selected_item = this._data[this.index()];
};

Window_ItemList.prototype.updateHelp = function() {
    // No item description
};

// Item DrawAllItems script, make the items invisible if not unravelled yet
var _Window_ItemList_drawAllItems = Window_ItemList.prototype.drawAllItems;

Window_ItemList.prototype.drawAllItems = function () {
    if (e_unravelled) {
        _Window_ItemList_drawAllItems.call(this);
    }
}

Window_ItemList.prototype.processOk = function () {
    if (e_unravelled && this.index() != this._data.length - 1) {
        Window_Selectable.prototype.processOk.call(this);
        itemImageInit = false;
    } else if (e_unravelled) {
        this.callCancelHandler();
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
    if (!itemImageInit) {
        selectedItemBitmap = Bitmap.load("/img/faces/" + selected_item.name + ".png");
        selectedItemSprite = new Sprite(selectedItemBitmap);
        selectedItem = this.addChild(selectedItemSprite);
        selectedItem.x = itemReadX;
        selectedItem.y = itemReadY;
        this.drawText(selected_item.name, textDescX, textDescY);
        var tempDesc = selected_item.description.split(/\n|\\n/);
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
    Window_Selectable.prototype.processCancel.call(this);
}