(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ListViewController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '81c49CPZPtOjbrWMPvnJL8c', 'ListViewController', __filename);
// Script/ListViewController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Global_1 = require("./Global");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ListViewController = /** @class */ (function (_super) {
    __extends(ListViewController, _super);
    function ListViewController() {
        //#region Property
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property(cc.Node)
        // HomeButton: cc.Node = null;
        _this.DeleteModeButton = null;
        _this.CancelDeleteButton = null;
        // @property(cc.Node)
        // cancelCompareButton: cc.Node = null;
        _this.GoBackButton = null;
        // @property(cc.Node)
        // MultiSelectButton: cc.Node = null;
        // @property(cc.Node)
        // CancelMultiSelectButton: cc.Node = null;
        _this.MultiSelectOKButton = null;
        _this.ItemTemplateNode = null;
        _this.ItemsPanel = null;
        _this.scrollView = null;
        _this.UserData = "";
        _this.UserDataArr = new Array();
        _this.ItemNodes = new Array();
        _this.GlobalData = null;
        //#endregion
        //#region Multi Select
        _this.MultiSelectionParam = new Array();
        return _this;
        //#endregion
    }
    //#endregion
    //#region Lifecycle
    ListViewController.prototype.onLoad = function () {
        this.GoBackButton.active = true;
        var globalNode = cc.director.getScene().getChildByName('GlobalNode');
        this.GlobalData = globalNode.getComponent(Global_1.default);
        if (this.GlobalData.Compare) {
            this.DeleteModeButton.active = false;
            this.CancelDeleteButton.active = false;
            this.MultiSelectOKButton.active = true;
        }
        else {
            this.DeleteModeButton.active = true;
            this.CancelDeleteButton.active = false;
            this.MultiSelectOKButton.active = false;
        }
    };
    ListViewController.prototype.start = function () {
        var _this = this;
        this.node.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () { return _this.DoThingsAfterProgress(); })));
        // this.TestNode.getComponent(cc.Button).enabled = false;
    };
    ListViewController.prototype.DoThingsAfterProgress = function () {
        this.EnsureUserDataAccess();
        this.UserData = this.GetUserData();
        this.UserDataArr = this.UserData.split(";");
        // console.log("xxx populate list : " + this.UserData);
        this.PopulateList();
        if (this.GlobalData.Compare) {
            this.MultiSelectMode();
        }
    };
    // update (dt) {}
    //#endregion
    //#region Navigation
    ListViewController.prototype.GoBack = function () {
        cc.director.loadScene("MainView");
    };
    //#endregion
    //#region List View
    ListViewController.prototype.PopulateList = function () {
        this.ItemNodes.splice(0, this.ItemNodes.length);
        var target = this.ItemTemplateNode;
        // let strArr = this.UserData.split(";");
        if (this.UserDataArr.length > 1) {
            for (var i = 1; i < this.UserDataArr.length; i++) {
                var itemNode = cc.instantiate(target);
                var lbl = itemNode.getChildByName("ItemLabel").getComponent(cc.RichText);
                lbl.string = this.UserDataArr[i].split(" ")[0];
                var bodyBtn = itemNode.getChildByName("ItemLabel");
                bodyBtn.getComponent(cc.Button).clickEvents[0].customEventData = this.UserDataArr[i];
                var btn1 = itemNode.getChildByName("btnDelete");
                var btn2 = itemNode.getChildByName("btnChecked");
                var btn3 = itemNode.getChildByName("btnUnchecked");
                btn1.getComponent(cc.Button).clickEvents[0].customEventData = this.UserDataArr[i];
                btn2.getComponent(cc.Button).clickEvents[0].customEventData = this.UserDataArr[i];
                btn3.getComponent(cc.Button).clickEvents[0].customEventData = this.UserDataArr[i];
                btn1.active = false;
                btn2.active = false;
                btn3.active = false;
                this.ItemsPanel.addChild(itemNode);
                itemNode.x = 0;
                // itemNode.parent = target.parent;
                // itemNode.setPosition(column * this.ITEM_WIDTH + this.ITEM_MARGIN_L, 0 - row * this.ITEM_HEIGHT - this.ITEM_MARGIN_T);
                this.ItemNodes.push(itemNode);
            }
        }
        // this.ItemsPanel.y = -9999;
        this.scrollView.scrollToTop(0.1);
    };
    //#endregion
    //#region Item Click & delete
    ListViewController.prototype.TapItem = function (event, customEventData) {
        // console.log("xxx item tap : " + customEventData);
        var param = customEventData.toString();
        if (!this.GlobalData.Compare) {
            this.GlobalData.ParamList.splice(0, this.GlobalData.ParamList.length);
        }
        this.GlobalData.ParamList.push(param);
        cc.director.loadScene("MainView");
    };
    ListViewController.prototype.DeleteMode = function () {
        // this.CancelMultiSelect();
        this.DeleteModeButton.active = false;
        this.CancelDeleteButton.active = true;
        for (var i = 0; i < this.ItemNodes.length; i++) {
            var deleteBtn = this.ItemNodes[i].getChildByName("btnDelete"); // getComponentInChildren(cc.Button);
            deleteBtn.active = true;
        }
    };
    ListViewController.prototype.CancelDelete = function () {
        if (!this.GlobalData.Compare) {
            this.DeleteModeButton.active = true;
        }
        this.CancelDeleteButton.active = false;
        for (var i = 0; i < this.ItemNodes.length; i++) {
            var deleteBtn = this.ItemNodes[i].getChildByName("btnDelete"); //getComponentInChildren(cc.Button);
            deleteBtn.active = false;
        }
    };
    ListViewController.prototype.DeleteItem = function (event, customEventData) {
        // console.log("xxx item delete : " + customEventData);
        var idx = 0;
        while (idx < this.ItemNodes.length) {
            var btn = this.ItemNodes[idx].getChildByName("btnDelete").getComponent(cc.Button);
            if (btn.clickEvents[0].customEventData == customEventData) {
                break;
            }
            idx++;
        }
        var itemNode = this.ItemNodes.splice(idx, 1)[0];
        this.ItemsPanel.removeChild(itemNode);
        this.UserDataArr.splice(idx + 1, 1);
        this.UserData = "";
        for (var i = 0; i < this.UserDataArr.length; i++) {
            if (i == (this.UserDataArr.length - 1)) {
                this.UserData += this.UserDataArr[i];
            }
            else {
                this.UserData += this.UserDataArr[i] + ";";
            }
        }
        this.SaveUserData();
    };
    ListViewController.prototype.MultiSelectItem = function (event, customEventData) {
        this.MultiSelectionParam.push(customEventData.toString());
        for (var _i = 0, _a = this.ItemNodes; _i < _a.length; _i++) {
            var item = _a[_i];
            var uncheckBtn = item.getChildByName("btnChecked");
            var checkBtn = item.getChildByName("btnUnchecked");
            if (uncheckBtn.getComponent(cc.Button).clickEvents[0].customEventData == customEventData) {
                uncheckBtn.active = true;
                checkBtn.active = false;
            }
        }
    };
    ListViewController.prototype.MultiUnselectItem = function (event, customEventData) {
        var idx = 0;
        while (idx < this.MultiSelectionParam.length) {
            if (this.MultiSelectionParam[idx] == customEventData) {
                this.MultiSelectionParam.splice(idx, 1);
                break;
            }
            idx++;
        }
        for (var _i = 0, _a = this.ItemNodes; _i < _a.length; _i++) {
            var item = _a[_i];
            var uncheckBtn = item.getChildByName("btnChecked");
            var checkBtn = item.getChildByName("btnUnchecked");
            if (uncheckBtn.getComponent(cc.Button).clickEvents[0].customEventData == customEventData) {
                uncheckBtn.active = false;
                checkBtn.active = true;
            }
        }
    };
    ListViewController.prototype.MultiSelectMode = function () {
        // this.CancelDelete();
        // this.MultiSelectButton.active = false;
        // this.CancelMultiSelectButton.active = true;
        this.MultiSelectOKButton.active = true;
        for (var i = 0; i < this.ItemNodes.length; i++) {
            var uncheckBtn = this.ItemNodes[i].getChildByName("btnChecked");
            var checkBtn = this.ItemNodes[i].getChildByName("btnUnchecked");
            checkBtn.active = true;
        }
    };
    ListViewController.prototype.CancelMultiSelect = function () {
        // this.MultiSelectButton.active = true;
        // this.CancelMultiSelectButton.active = false;
        // this.MultiSelectOKButton.active = false;
        for (var i = 0; i < this.ItemNodes.length; i++) {
            var uncheckBtn = this.ItemNodes[i].getChildByName("btnChecked");
            var checkBtn = this.ItemNodes[i].getChildByName("btnUnchecked");
            uncheckBtn.active = false;
            checkBtn.active = false;
        }
        this.MultiSelectionParam.splice(0, this.MultiSelectionParam.length);
    };
    ListViewController.prototype.MultiSelectOK = function () {
        if (!this.GlobalData.Compare) {
            this.GlobalData.ParamList.splice(0, this.GlobalData.ParamList.length);
        }
        for (var _i = 0, _a = this.MultiSelectionParam; _i < _a.length; _i++) {
            var param = _a[_i];
            this.GlobalData.ParamList.push(param);
        }
        cc.director.loadScene("MainView");
    };
    //#endregion
    //#region Compare
    ListViewController.prototype.CancelCompare = function () {
        cc.director.loadScene("MainView");
    };
    //#endregion
    //#region WX Data API
    ListViewController.prototype.EnsureUserDataAccess = function () {
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
    ListViewController.prototype.GetUserData = function () {
        var fs = wx.getFileSystemManager();
        var data = null;
        try {
            data = fs.readFileSync(wx.env.USER_DATA_PATH + "/userdata.txt", 'utf8');
        }
        catch (error) {
        }
        // console.log("xxx get user data : " + data);
        return data;
    };
    ListViewController.prototype.SaveUserData = function () {
        var str = this.UserData;
        var fs = wx.getFileSystemManager();
        fs.writeFileSync(wx.env.USER_DATA_PATH + "/userdata.txt", str, 'utf8');
        // console.log("xxx save user data : " + str);
    };
    __decorate([
        property(cc.Node)
    ], ListViewController.prototype, "DeleteModeButton", void 0);
    __decorate([
        property(cc.Node)
    ], ListViewController.prototype, "CancelDeleteButton", void 0);
    __decorate([
        property(cc.Node)
    ], ListViewController.prototype, "GoBackButton", void 0);
    __decorate([
        property(cc.Node)
    ], ListViewController.prototype, "MultiSelectOKButton", void 0);
    __decorate([
        property(cc.Node)
    ], ListViewController.prototype, "ItemTemplateNode", void 0);
    __decorate([
        property(cc.Node)
    ], ListViewController.prototype, "ItemsPanel", void 0);
    __decorate([
        property(cc.ScrollView)
    ], ListViewController.prototype, "scrollView", void 0);
    ListViewController = __decorate([
        ccclass
    ], ListViewController);
    return ListViewController;
}(cc.Component));
exports.default = ListViewController;

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
        //# sourceMappingURL=ListViewController.js.map
        