import GlobalData from "./Global";
import MainViewController from "./MainViewController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LifeChartController extends cc.Component {

    //#region Property

    @property(cc.Label)
    cnName: cc.Label = null;
    @property(cc.Label)
    pinyinName: cc.Label = null;
    @property(cc.Label)
    birthday: cc.Label = null;
    @property(cc.Label)
    age: cc.Label = null;

    @property(cc.Label)
    firstCycle: cc.Label = null;
    @property(cc.Label)
    secondCycle: cc.Label = null;
    @property(cc.Label)
    forthCycle: cc.Label = null;

    @property(cc.Label)
    lifeRoad: cc.Label = null;

    @property(cc.Label)
    firstPeak: cc.Label = null;
    @property(cc.Label)
    secondPeak: cc.Label = null;
    @property(cc.Label)
    thirdPeak: cc.Label = null;
    @property(cc.Label)
    forthPeak: cc.Label = null;

    @property(cc.Label)
    firstRange: cc.Label = null;
    @property(cc.Label)
    secondRange: cc.Label = null;
    @property(cc.Label)
    thirdRange: cc.Label = null;
    @property(cc.Label)
    forthRange: cc.Label = null;

    @property(cc.Label)
    firstChallenge: cc.Label = null;
    @property(cc.Label)
    secondChallenge: cc.Label = null;
    @property(cc.Label)
    thirdChallenge: cc.Label = null;
    @property(cc.Label)
    forthChallenge: cc.Label = null;

    @property(cc.Node)
    firstCycleColor: cc.Node = null;
    @property(cc.Node)
    secondCycleColor: cc.Node = null;
    @property(cc.Node)
    forthCycleColor: cc.Node = null;
    @property(cc.Node)
    firstPeakColor: cc.Node = null;
    @property(cc.Node)
    secondPeakColor: cc.Node = null;
    @property(cc.Node)
    thirdPeakColor: cc.Node = null;
    @property(cc.Node)
    forthPeakColor: cc.Node = null;
    @property(cc.Node)
    firstChallengeColor: cc.Node = null;
    @property(cc.Node)
    secondChallengeColor: cc.Node = null;
    @property(cc.Node)
    thirdChallengeColor: cc.Node = null;
    @property(cc.Node)
    forthChallengeColor: cc.Node = null;

    @property(cc.Label)
    personYear: cc.Label = null;
    @property(cc.Label)
    personMonth: cc.Label = null;
    @property(cc.Label)
    biaoXianShuZi: cc.Label = null;
    @property(cc.Label)
    neiQuShuZi: cc.Label = null;
    @property(cc.Label)
    geRenTeZhi: cc.Label = null;
    @property(cc.Label)
    chengShuShuZi: cc.Label = null;

    @property(cc.Label)
    shenTi: cc.Label = null;
    @property(cc.Label)
    touNao: cc.Label = null;
    @property(cc.Label)
    qingXu: cc.Label = null;
    @property(cc.Label)
    zhiJue: cc.Label = null;

    @property(cc.Node)
    heiDongSection: cc.Node = null;
    @property(cc.Label)
    heiDongShuZi: cc.Label = null;

    @property(cc.Node)
    UnsavedTag: cc.Node = null;

    Param = "";

    COLOR_NORMAL = "#ffffff";
    COLOR_HIGHLIGHT = "#ffcb97";

    CHAR_LIST = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    CHAR_NUM_MAP = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8];

    mainView: MainViewController = null;

    //#endregion

    //#region Lifecycle

    onLoad () {
        this.heiDongSection.active = false;
    }

    // start () {}

    // update (dt) {}

    //#endregion

    //#region Calculation

    Calculate(param:string, unsaved:boolean ){
        let paramArr = param.split(" ");

        let hanziName = paramArr[0];        
        let pinyinName = paramArr[1];
        let bDay = paramArr[2];

        let year = bDay.substr(0,4);
        let month = bDay.substr(4,2);
        let date = bDay.substr(6,2);

        let datetime = new Date();
        let thisYear = datetime.getFullYear();

        let age = thisYear - Number(year);

        // name, birthday, age
        this.cnName.string = hanziName;
        this.pinyinName.string = pinyinName;
        this.birthday.string = bDay;
        this.age .string = age.toString() + "岁";

        // cycles
        this.firstCycle.string = this.GetAccumulatedNumber(month);
        this.secondCycle.string = this.GetAccumulatedNumber(date);
        this.forthCycle.string = this.GetAccumulatedNumber(year);

        // life road
        let temp = 0;
        let tempStr1 = "";
        let tempStr2 = "";
        let tempStr3 = "";
        let lastNumberOfLifeRoad = 0;
        for (let i = 0; i < bDay.length; i++) {
            temp += Number(bDay[i]);
        }
        tempStr1 = temp.toString();
        temp = 0;
        for (let i = 0; i < tempStr1.length; i++) {
            temp += Number(tempStr1[i]);
        }
        tempStr2 = temp.toString();
        lastNumberOfLifeRoad = temp;
        this.lifeRoad.string = tempStr1 + "/" + tempStr2;
        if (tempStr2.length > 1) {
            temp = 0;
            for (let i = 0; i < tempStr2.length; i++) {
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
        let firstRangeEnd = 36 - lastNumberOfLifeRoad;
        let secondRangeStart = firstRangeEnd + 1;
        let secondRangeEnd = firstRangeEnd + 9;
        let thirdRangeStart = secondRangeEnd + 1;
        let thirdRangeEnd = secondRangeEnd + 9;
        let forthRangeStart = thirdRangeEnd + 1;

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
        let currentLevel = 1;
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
        let personYear = Number(this.GetAccumulatedNumber(thisYear.toString())) + Number(this.firstPeak.string);
        let personYearStr = this.GetAccumulatedNumber(personYear.toString());
        this.personYear.string = personYearStr;
        let personMonth = 10 - Number(personYearStr);
        this.personMonth.string = thisYear.toString() + "年" + personMonth.toString() + "月";

        // biao xian shu zi
        let lastNumOfBiaoXianShuZi = this.FillComplexNumbers(pinyinName, this.biaoXianShuZi);

        // nei qu shu zi
        tempStr1 = "";
        for (let i = 0; i < pinyinName.length; i++) {
            let char = pinyinName[i];
            if (char == "a" || char == "e" || char == "i" || char == "o" || char == "u") {
                tempStr1 += char;
            }            
        }
        this.FillComplexNumbers(tempStr1, this.neiQuShuZi);

        // ge ren te zhi
        tempStr1 = "";
        for (let i = 0; i < pinyinName.length; i++) {
            let char = pinyinName[i];
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
        for (let i = 0; i < pinyinName.length; i++) {
            let char = pinyinName[i];
            let charNum = this.GetCharNum(char);
            if (charNum == 4 || charNum == 5) {
                temp ++;
            }
        }
        this.shenTi.string = temp.toString();

        // tou nao
        temp = 0;
        for (let i = 0; i < pinyinName.length; i++) {
            let char = pinyinName[i];
            let charNum = this.GetCharNum(char);
            if (charNum == 1 || charNum == 8) {
                temp ++;
            }
        }
        this.touNao.string = temp.toString();

        // qing xu
        temp = 0;
        for (let i = 0; i < pinyinName.length; i++) {
            let char = pinyinName[i];
            let charNum = this.GetCharNum(char);
            if (charNum == 2 || charNum == 3 || charNum == 6) {
                temp ++;
            }
        }
        this.qingXu.string = temp.toString();

        // zhi jue
        temp = 0;
        for (let i = 0; i < pinyinName.length; i++) {
            let char = pinyinName[i];
            let charNum = this.GetCharNum(char);
            if (charNum == 7 || charNum == 9) {
                temp ++;
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
    }

    SetSaved(){
        this.UnsavedTag.active = false;
    }

    GetAccumulatedNumber(param:string) : string  {
        let temp = 0;
        while (param.length>1) {
            temp = 0;
            for (let i = 0; i < param.length; i++) {
                temp += Number(param[i]);
            }
            param = temp.toString();
        }

        return param.toString();
    }

    GetCharNum(char:string) : number {
        let idx = this.CHAR_LIST.indexOf(char);
        return this.CHAR_NUM_MAP[idx];            
    }

    FillComplexNumbers(str:string, lbl:cc.Label) : number {
        let temp = 0;
        let tempStr1 = "";
        let tempStr2 = "";
        let tempStr3 = "";

        let lastNum = 0;

        for (let i = 0; i < str.length; i++) {
            temp += this.GetCharNum(str[i]);
        }
        tempStr1 = temp.toString();
        temp = 0;
        for (let i = 0; i < tempStr1.length; i++) {
            temp += Number(tempStr1[i]);
        }
        tempStr2 = temp.toString();
        lastNum = temp;
        lbl.string = tempStr1 + "/" + tempStr2;
        if (tempStr2.length > 1) {
            temp = 0;
            for (let i = 0; i < tempStr2.length; i++) {
                temp += Number(tempStr2[i]);
            }
            tempStr3 = temp.toString();
            lbl.string += "/" + tempStr3;
            lastNum = temp;  
        }

        return lastNum;
    }

    Highlight(node:cc.Node){
        if (node) {
            node.color = cc.hexToColor(this.COLOR_HIGHLIGHT);
        }
    }

    GetNeverAppearedNumbers(labelArray:cc.Label[]) : string {
        let numArray = ["1","2","3","4","5","6","7","8","9"];
        let fullStr = "";
        let result = "";

        for (let i = 0; i < labelArray.length; i++) {
            let str = labelArray[i].string;
            str = str.replace("/","");
            fullStr += str;
        }

        for (let i = 0; i < fullStr.length; i++) {
            let idx = 0;
            while (idx < numArray.length) {
                if (numArray[idx] == fullStr[i]) {
                    numArray.splice(idx,1);
                    break;
                }
                else{
                    idx++;
                }
            }
        }

        if (numArray.length > 0) {
            for (let i = 0; i < numArray.length; i++) {
                if (i == 0) {
                    result += numArray[i];                
                }
                else{
                    result += "," + numArray[i];
                }
            }
        }

        return result;
    }

    //#endregion

    //#region Remove

    RemoveFromStage(){
        this.mainView.RemoveLifeChart(this);
    }

    //#endregion
}
