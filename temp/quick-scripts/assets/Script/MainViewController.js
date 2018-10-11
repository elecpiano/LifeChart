(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/MainViewController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '86d3fL7Y6VGib/crS/mU/p5', 'MainViewController', __filename);
// Script/MainViewController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var LifeChartController_1 = require("./LifeChartController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MainViewController = /** @class */ (function (_super) {
    __extends(MainViewController, _super);
    function MainViewController() {
        //#region Property
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.compareMenu = null;
        _this.AddFavoriteButton = null;
        _this.LifeChartPrefab = null;
        _this.ScrollView = null;
        _this.ItemsPanel = null;
        _this.LifeChartNodes = new Array();
        _this.COLOR_NORMAL = "#ffffff";
        _this.COLOR_HIGHLIGHT = "#ffb53a";
        _this.UserData = "";
        _this.UserDataArr = new Array();
        _this.GlobalData = null;
        return _this;
        //#endregion
    }
    //#endregion
    //#region Lifecycle
    MainViewController.prototype.onLoad = function () {
        this.compareMenu.on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagationImmediate();
        }, this.compareMenu);
        this.compareMenu.active = false;
        // this.AddFavoriteButton.active = false;
        var globalNode = cc.director.getScene().getChildByName('GlobalNode');
        this.GlobalData = globalNode.getComponent(Global_1.default);
        if (this.GlobalData.Compare) {
            this.GlobalData.Compare = false;
            // console.log("xxx CompareParam : " + this.CompareParam);
        }
    };
    MainViewController.prototype.start = function () {
        // console.log("xxx @start : " + this.GlobalData.ParamList);
        var _this = this;
        this.node.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () { return _this.DoThingsAfterProgress(); })));
    };
    MainViewController.prototype.DoThingsAfterProgress = function () {
        this.EnsureUserDataAccess();
        this.UserData = this.GetUserData();
        this.UserDataArr = this.UserData.split(";");
        // this.SetFavoriteButton();
        for (var i = 0; i < this.GlobalData.ParamList.length; i++) {
            this.AddLifeChart(this.GlobalData.ParamList[i]);
        }
    };
    // update (dt) {}
    //#endregion
    //#region Life Chart
    MainViewController.prototype.AddLifeChart = function (param) {
        var node = cc.instantiate(this.LifeChartPrefab);
        var controller = node.getComponent(LifeChartController_1.default);
        controller.mainView = this;
        this.LifeChartNodes.push(node);
        this.ItemsPanel.addChild(node);
        node.x = 0;
        node.y = 0;
        var unsaved = this.TagUnsaved(param);
        controller.Calculate(param, unsaved);
    };
    MainViewController.prototype.TagUnsaved = function (param) {
        var unsaved = true;
        for (var i = 0; i < this.UserDataArr.length; i++) {
            if (param == this.UserDataArr[i]) {
                unsaved = false;
                break;
            }
        }
        return unsaved;
    };
    MainViewController.prototype.RemoveLifeChart = function (chart) {
        var idx = 0;
        while (idx < this.LifeChartNodes.length) {
            var node = this.LifeChartNodes[idx];
            if (node == chart.node) {
                this.LifeChartNodes.splice(idx, 1);
                this.ItemsPanel.removeChild(node);
                this.GlobalData.ParamList.splice(idx, 1);
            }
            idx++;
        }
    };
    //#endregion
    //#region Favotie
    MainViewController.prototype.SetFavoriteButtonVisibility = function () {
        if (this.GlobalData.ParamList.length == 1) {
            var param = this.GlobalData.ParamList[0];
            var exists = false;
            for (var i = 0; i < this.UserDataArr.length; i++) {
                if (param == this.UserDataArr[i]) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                this.AddFavoriteButton.active = true;
            }
        }
    };
    MainViewController.prototype.AddFavorite = function () {
        // console.log("xxx @AddFavorite - " + this.GlobalData.ParamList);
        for (var i = 0; i < this.GlobalData.ParamList.length; i++) {
            var param = this.GlobalData.ParamList[i];
            var exists = false;
            for (var i_1 = 0; i_1 < this.UserDataArr.length; i_1++) {
                if (param == this.UserDataArr[i_1]) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                this.UserDataArr.push(param);
                this.UserData += ";" + param;
                this.SaveUserData();
            }
        }
        var idx = 0;
        while (idx < this.LifeChartNodes.length) {
            var node = this.LifeChartNodes[idx];
            var controller = node.getComponent(LifeChartController_1.default);
            controller.SetSaved();
            idx++;
        }
    };
    //#endregion
    //#region Navigation
    MainViewController.prototype.GoHome = function () {
        cc.director.loadScene("InputView");
    };
    MainViewController.prototype.CompareInput = function () {
        this.GlobalData.Compare = true;
        // this.GlobalData.CompareParam = "";
        cc.director.loadScene("InputView");
    };
    MainViewController.prototype.GoList = function () {
        cc.director.loadScene("ListView");
    };
    MainViewController.prototype.CompareList = function () {
        this.GlobalData.Compare = true;
        // this.GlobalData.CompareParam = "";
        cc.director.loadScene("ListView");
    };
    //#endregion
    //#region Compare
    MainViewController.prototype.ShowCompareMenu = function () {
        this.compareMenu.active = true;
    };
    MainViewController.prototype.HideCompareMenu = function () {
        this.compareMenu.active = false;
    };
    //#endregion
    //#region WX Data API
    MainViewController.prototype.EnsureUserDataAccess = function () {
        // if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        // }
        var fs = wx.getFileSystemManager();
        var data = null;
        try {
            data = fs.readFileSync(wx.env.USER_DATA_PATH + "/userdata.txt", 'utf8');
        }
        catch (error) {
        }
        if (data == null) {
            fs.writeFileSync(wx.env.USER_DATA_PATH + "/userdata.txt", 'initial', 'utf8');
        }
    };
    MainViewController.prototype.SaveUserData = function () {
        var str = this.UserData;
        var fs = wx.getFileSystemManager();
        fs.writeFileSync(wx.env.USER_DATA_PATH + "/userdata.txt", str, 'utf8');
        console.log("xxx save user data : " + str);
    };
    MainViewController.prototype.GetUserData = function () {
        var fs = wx.getFileSystemManager();
        var data = null;
        try {
            data = fs.readFileSync(wx.env.USER_DATA_PATH + "/userdata.txt", 'utf8');
        }
        catch (error) {
        }
        console.log("xxx get user data : " + data);
        return data;
    };
    __decorate([
        property(cc.Node)
    ], MainViewController.prototype, "compareMenu", void 0);
    __decorate([
        property(cc.Node)
    ], MainViewController.prototype, "AddFavoriteButton", void 0);
    __decorate([
        property(cc.Prefab)
    ], MainViewController.prototype, "LifeChartPrefab", void 0);
    __decorate([
        property(cc.ScrollView)
    ], MainViewController.prototype, "ScrollView", void 0);
    __decorate([
        property(cc.Node)
    ], MainViewController.prototype, "ItemsPanel", void 0);
    MainViewController = __decorate([
        ccclass
    ], MainViewController);
    return MainViewController;
}(cc.Component));
exports.default = MainViewController;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=MainViewController.js.map
        