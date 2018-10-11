"use strict";
cc._RF.push(module, '62bedZqNsZJUq4oFxoRFkoS', 'Global');
// Script/Global.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GlobalData = /** @class */ (function (_super) {
    __extends(GlobalData, _super);
    function GlobalData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ParamList = new Array();
        _this.Compare = false;
        return _this;
    }
    // CompareParam:string = "";
    GlobalData.prototype.onLoad = function () {
        cc.game.addPersistRootNode(this.node);
    };
    GlobalData = __decorate([
        ccclass
    ], GlobalData);
    return GlobalData;
}(cc.Component));
exports.default = GlobalData;

cc._RF.pop();