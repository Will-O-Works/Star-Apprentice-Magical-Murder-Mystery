function Scene_People() {
    this.initialize.apply(this, arguments);
}

Scene_People.prototype = Object.create(Scene_MenuBase.prototype);
Scene_People.prototype.constructor = Scene_People;

Scene_People.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_People.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this._peopleWindow = new Window_People(0, 0, 320, 240);
    this.addWindow(this._peopleWindow)
}

Scene_People.prototype.update = function () {
    if (!this.drawnWindows) {
        this._peopleWindow.drawAllItems();
        this.drawnWindows = true;
    }

    if (Input.isTriggered("cancel")) SceneManager.pop();
}

function Window_People() {
    this.initialize.apply(this, arguments);
}

Window_People.prototype = Object.create(Window_Base.prototype);
Window_People.prototype.constructor = Window_People

Window_People.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.drawAllItems();
}

Window_People.prototype.drawAllItems = function () {
    this.contents.clear();
    this.drawText($gameVariables.value(2), 0, 0, this.width - this.padding * 2, "center");
    this.drawIcon(45, 48, 48);
    this.drawFace("Fan_Portrait", 0, 96, 42, 148, 148);
}