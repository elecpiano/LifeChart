(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/LifeChartController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dddefKDzJVA+JPLsT3QYulG', 'LifeChartController', __filename);
// Script/LifeChartController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LifeChartController = /** @class */ (function (_super) {
    __extends(LifeChartController, _super);
    function LifeChartController() {
        //#region Property
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cnName = null;
        _this.pinyinName = null;
        _this.birthday = null;
        _this.age = null;
        _this.firstCycle = null;
        _this.secondCycle = null;
        _this.forthCycle = null;
        _this.lifeRoad = null;
        _this.firstPeak = null;
        _this.secondPeak = null;
        _this.thirdPeak = null;
        _this.forthPeak = null;
        _this.firstRange = null;
        _this.secondRange = null;
        _this.thirdRange = null;
        _this.forthRange = null;
        _this.firstChallenge = null;
        _this.secondChallenge = null;
        _this.thirdChallenge = null;
        _this.forthChallenge = null;
        _this.firstCycleColor = null;
        _this.secondCycleColor = null;
        _this.forthCycleColor = null;
        _this.firstPeakColor = null;
        _this.secondPeakColor = null;
        _this.thirdPeakColor = null;
        _this.forthPeakColor = null;
        _this.firstChallengeColor = null;
        _this.secondChallengeColor = null;
        _this.thirdChallengeColor = null;
        _this.forthChallengeColor = null;
        _this.personYear = null;
        _this.personMonth = null;
        _this.biaoXianShuZi = null;
        _this.neiQuShuZi = null;
        _this.geRenTeZhi = null;
        _this.chengShuShuZi = null;
        _this.shenTi = null;
        _this.touNao = null;
        _this.qingXu = null;
        _this.zhiJue = null;
        _this.heiDongSection = null;
        _this.heiDongShuZi = null;
        _this.UnsavedTag = null;
        _this.Param = "";
        _this.COLOR_NORMAL = "#ffffff";
        _this.COLOR_HIGHLIGHT = "#ffcb97";
        _this.CHAR_LIST = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        _this.CHAR_NUM_MAP = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8];
        _this.mainView = null;
        return _this;
        //#endregion
    }
    //#endregion
    //#region Lifecycle
    LifeChartController.prototype.onLoad = function () {
        this.heiDongSection.active = false;
    };
    // start () {}
    // update (dt) {}
    //#endregion
    //#region Calculation
    LifeChartController.prototype.Calculate = function (param, unsaved) {
        var paramArr = param.split(" ");
        var hanziName = paramArr[0];
        var pinyinName = paramArr[1];
        var bDay = paramArr[2];
        var year = bDay.substr(0, 4);
        var month = bDay.substr(4, 2);
        var date = bDay.substr(6, 2);
        var datetime = new Date();
        var thisYear = datetime.getFullYear();
        var age = thisYear - Number(year);
        // name, birthday, age
        this.cnName.string = hanziName;
        this.pinyinName.string = pinyinName;
        this.birthday.string = bDay;
        this.age.string = age.toString() + "岁";
        // cycles
        this.firstCycle.string = this.GetAccumulatedNumber(month);
        this.secondCycle.string = this.GetAccumulatedNumber(date);
        this.forthCycle.string = this.GetAccumulatedNumber(year);
        // life road
        var temp = 0;
        var tempStr1 = "";
        var tempStr2 = "";
        var tempStr3 = "";
        var lastNumberOfLifeRoad = 0;
        for (var i = 0; i < bDay.length; i++) {
            temp += Number(bDay[i]);
        }
        tempStr1 = temp.toString();
        temp = 0;
        for (var i = 0; i < tempStr1.length; i++) {
            temp += Number(tempStr1[i]);
        }
        tempStr2 = temp.toString();
        lastNumberOfLifeRoad = temp;
        this.lifeRoad.string = tempStr1 + "/" + tempStr2;
        if (tempStr2.length > 1) {
            temp = 0;
            for (var i = 0; i < tempStr2.length; i++) {
                temp += Number(tempStr2[i]);
            }
            tempStr3 = temp.toString();
            lastNumberOfLifeRoad = temp;
            this.lifeRoad.string += "/" + tempStr3;
        }
        // peaks
        temp = Number(this.firstCycle.string) + Number(this.secondCycle.string);
        this.firstPeak.string = this.GetAccumulatedNumber(temp.toString());
        temp = Number(this.secondCycle.string) + Number(this.forthCycle.string);
        this.secondPeak.string = this.GetAccumulatedNumber(temp.toString());
        temp = Number(this.firstPeak.string) + Number(this.secondPeak.string);
        this.thirdPeak.string = this.GetAccumulatedNumber(temp.toString());
        temp = Number(this.firstCycle.string) + Number(this.forthCycle.string);
        this.forthPeak.string = this.GetAccumulatedNumber(temp.toString());
        // peak ranges
        var firstRangeEnd = 36 - lastNumberOfLifeRoad;
        var secondRangeStart = firstRangeEnd + 1;
        var secondRangeEnd = firstRangeEnd + 9;
        var thirdRangeStart = secondRangeEnd + 1;
        var thirdRangeEnd = secondRangeEnd + 9;
        var forthRangeStart = thirdRangeEnd + 1;
        this.firstRange.string = "0~" + firstRangeEnd.toString() + "岁";
        this.secondRange.string = secondRangeStart.toString() + "~" + secondRangeEnd.toString() + "岁";
        this.thirdRange.string = thirdRangeStart.toString() + "~" + thirdRangeEnd.toString() + "岁";
        this.forthRange.string = forthRangeStart.toString() + "岁~";
        // challenges
        temp = Number(this.firstCycle.string) - Number(this.secondCycle.string);
        this.firstChallenge.string = this.GetAccumulatedNumber(Math.abs(temp).toString());
        temp = Number(this.secondCycle.string) - Number(this.forthCycle.string);
        this.secondChallenge.string = this.GetAccumulatedNumber(Math.abs(temp).toString());
        temp = Number(this.firstChallenge.string) - Number(this.secondChallenge.string);
        this.thirdChallenge.string = this.GetAccumulatedNumber(Math.abs(temp).toString());
        temp = Number(this.firstCycle.string) - Number(this.forthCycle.string);
        this.forthChallenge.string = this.GetAccumulatedNumber(Math.abs(temp).toString());
        // highlight
        var currentLevel = 1;
        if (age <= firstRangeEnd) {
            this.Highlight(this.firstCycleColor);
            this.Highlight(this.firstPeakColor);
            this.Highlight(this.firstChallengeColor);
        }
        else if (age <= secondRangeEnd) {
            this.Highlight(this.secondCycleColor);
            this.Highlight(this.secondPeakColor);
            this.Highlight(this.secondChallengeColor);
        }
        else if (age <= thirdRangeEnd) {
            this.Highlight(this.secondCycleColor);
            this.Highlight(this.thirdPeakColor);
            this.Highlight(this.thirdChallengeColor);
        }
        else {
            this.Highlight(this.forthCycleColor);
            this.Highlight(this.forthPeakColor);
            this.Highlight(this.forthChallengeColor);
        }
        // person year & month
        var personYear = Number(this.GetAccumulatedNumber(thisYear.toString())) + Number(this.firstPeak.string);
        var personYearStr = this.GetAccumulatedNumber(personYear.toString());
        this.personYear.string = personYearStr;
        var personMonth = 10 - Number(personYearStr);
        this.personMonth.string = thisYear.toString() + "年" + personMonth.toString() + "月";
        // biao xian shu zi
        var lastNumOfBiaoXianShuZi = this.FillComplexNumbers(pinyinName, this.biaoXianShuZi);
        // nei qu shu zi
        tempStr1 = "";
        for (var i = 0; i < pinyinName.length; i++) {
            var char = pinyinName[i];
            if (char == "a" || char == "e" || char == "i" || char == "o" || char == "u") {
                tempStr1 += char;
            }
        }
        this.FillComplexNumbers(tempStr1, this.neiQuShuZi);
        // ge ren te zhi
        tempStr1 = "";
        for (var i = 0; i < pinyinName.length; i++) {
            var char = pinyinName[i];
            if (char != "a" && char != "e" && char != "i" && char != "o" && char != "u") {
                tempStr1 += char;
            }
        }
        this.FillComplexNumbers(tempStr1, this.geRenTeZhi);
        // cheng shu shu zi
        temp = lastNumberOfLifeRoad + lastNumOfBiaoXianShuZi;
        this.chengShuShuZi.string = this.GetAccumulatedNumber(temp.toString());
        // shen ti
        temp = 0;
        for (var i = 0; i < pinyinName.length; i++) {
            var char = pinyinName[i];
            var charNum = this.GetCharNum(char);
            if (charNum == 4 || charNum == 5) {
                temp++;
            }
        }
        this.shenTi.string = temp.toString();
        // tou nao
        temp = 0;
        for (var i = 0; i < pinyinName.length; i++) {
            var char = pinyinName[i];
            var charNum = this.GetCharNum(char);
            if (charNum == 1 || charNum == 8) {
                temp++;
            }
        }
        this.touNao.string = temp.toString();
        // qing xu
        temp = 0;
        for (var i = 0; i < pinyinName.length; i++) {
            var char = pinyinName[i];
            var charNum = this.GetCharNum(char);
            if (charNum == 2 || charNum == 3 || charNum == 6) {
                temp++;
            }
        }
        this.qingXu.string = temp.toString();
        // zhi jue
        temp = 0;
        for (var i = 0; i < pinyinName.length; i++) {
            var char = pinyinName[i];
            var charNum = this.GetCharNum(char);
            if (charNum == 7 || charNum == 9) {
                temp++;
            }
        }
        this.zhiJue.string = temp.toString();
        // hei dong shu zi
        tempStr1 = this.GetNeverAppearedNumbers([
            this.lifeRoad,
            this.firstPeak,
            this.secondPeak,
            this.thirdPeak,
            this.forthPeak,
            this.firstChallenge,
            this.secondChallenge,
            this.thirdChallenge,
            this.forthChallenge,
            this.biaoXianShuZi,
            this.neiQuShuZi,
            this.geRenTeZhi,
            this.chengShuShuZi
        ]);
        if (tempStr1.length > 0 && tempStr1.length < 7) {
            this.heiDongSection.active = true;
            this.heiDongShuZi.string = tempStr1;
        }
        //console.log("xxx " + tempStr1 + "," + tempStr2 + "," + tempStr3 );
        // unsaved tag
        this.UnsavedTag.active = unsaved;
    };
    LifeChartController.prototype.SetSaved = function () {
        this.UnsavedTag.active = false;
    };
    LifeChartController.prototype.GetAccumulatedNumber = function (param) {
        var temp = 0;
        while (param.length > 1) {
            temp = 0;
            for (var i = 0; i < param.length; i++) {
                temp += Number(param[i]);
            }
            param = temp.toString();
        }
        return param.toString();
    };
    LifeChartController.prototype.GetCharNum = function (char) {
        var idx = this.CHAR_LIST.indexOf(char);
        return this.CHAR_NUM_MAP[idx];
    };
    LifeChartController.prototype.FillComplexNumbers = function (str, lbl) {
        var temp = 0;
        var tempStr1 = "";
        var tempStr2 = "";
        var tempStr3 = "";
        var lastNum = 0;
        for (var i = 0; i < str.length; i++) {
            temp += this.GetCharNum(str[i]);
        }
        tempStr1 = temp.toString();
        temp = 0;
        for (var i = 0; i < tempStr1.length; i++) {
            temp += Number(tempStr1[i]);
        }
        tempStr2 = temp.toString();
        lastNum = temp;
        lbl.string = tempStr1 + "/" + tempStr2;
        if (tempStr2.length > 1) {
            temp = 0;
            for (var i = 0; i < tempStr2.length; i++) {
                temp += Number(tempStr2[i]);
            }
            tempStr3 = temp.toString();
            lbl.string += "/" + tempStr3;
            lastNum = temp;
        }
        return lastNum;
    };
    LifeChartController.prototype.Highlight = function (node) {
        if (node) {
            node.color = cc.hexToColor(this.COLOR_HIGHLIGHT);
        }
    };
    LifeChartController.prototype.GetNeverAppearedNumbers = function (labelArray) {
        var numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var fullStr = "";
        var result = "";
        for (var i = 0; i < labelArray.length; i++) {
            var str = labelArray[i].string;
            str = str.replace("/", "");
            fullStr += str;
        }
        for (var i = 0; i < fullStr.length; i++) {
            var idx = 0;
            while (idx < numArray.length) {
                if (numArray[idx] == fullStr[i]) {
                    numArray.splice(idx, 1);
                    break;
                }
                else {
                    idx++;
                }
            }
        }
        if (numArray.length > 0) {
            for (var i = 0; i < numArray.length; i++) {
                if (i == 0) {
                    result += numArray[i];
                }
                else {
                    result += "," + numArray[i];
                }
            }
        }
        return result;
    };
    //#endregion
    //#region Remove
    LifeChartController.prototype.RemoveFromStage = function () {
        this.mainView.RemoveLifeChart(this);
    };
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "cnName", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "pinyinName", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "birthday", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "age", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "firstCycle", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "secondCycle", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "forthCycle", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "lifeRoad", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "firstPeak", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "secondPeak", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "thirdPeak", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "forthPeak", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "firstRange", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "secondRange", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "thirdRange", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "forthRange", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "firstChallenge", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "secondChallenge", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "thirdChallenge", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "forthChallenge", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "firstCycleColor", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "secondCycleColor", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "forthCycleColor", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "firstPeakColor", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "secondPeakColor", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "thirdPeakColor", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "forthPeakColor", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "firstChallengeColor", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "secondChallengeColor", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "thirdChallengeColor", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "forthChallengeColor", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "personYear", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "personMonth", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "biaoXianShuZi", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "neiQuShuZi", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "geRenTeZhi", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "chengShuShuZi", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "shenTi", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "touNao", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "qingXu", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "zhiJue", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "heiDongSection", void 0);
    __decorate([
        property(cc.Label)
    ], LifeChartController.prototype, "heiDongShuZi", void 0);
    __decorate([
        property(cc.Node)
    ], LifeChartController.prototype, "UnsavedTag", void 0);
    LifeChartController = __decorate([
        ccclass
    ], LifeChartController);
    return LifeChartController;
}(cc.Component));
exports.default = LifeChartController;

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
        //# sourceMappingURL=LifeChartController.js.map
        