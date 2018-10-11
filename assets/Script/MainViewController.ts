import GlobalData from "./Global";
import LifeChartController from "./LifeChartController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainViewController extends cc.Component {

    //#region Property

    @property(cc.Node)
    compareMenu: cc.Node = null;

    @property(cc.Node)
    AddFavoriteButton: cc.Node = null;

    @property(cc.Prefab)
    LifeChartPrefab:cc.Prefab = null;

    @property(cc.ScrollView)
    ScrollView: cc.ScrollView = null;
    @property(cc.Node)
    ItemsPanel: cc.Node = null;

    LifeChartNodes = new Array<cc.Node>();

    COLOR_NORMAL = "#ffffff";
    COLOR_HIGHLIGHT = "#ffb53a";

    UserData = "";
    UserDataArr = new Array<string>();

    GlobalData:GlobalData = null;

    //#endregion

    //#region Lifecycle

    onLoad () {
        this.compareMenu.on(cc.Node.EventType.TOUCH_START, 
            (e)=>{
                e.stopPropagationImmediate();
            },this.compareMenu);
        this.compareMenu.active = false;
        // this.AddFavoriteButton.active = false;

        let globalNode = cc.director.getScene().getChildByName('GlobalNode');
        this.GlobalData = globalNode.getComponent(GlobalData);

        if (this.GlobalData.Compare) {
            this.GlobalData.Compare = false;
            // console.log("xxx CompareParam : " + this.CompareParam);
        }
    }

    start () {
        // console.log("xxx @start : " + this.GlobalData.ParamList);

        this.node.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.callFunc(()=>this.DoThingsAfterProgress())
        ));
    }

    DoThingsAfterProgress(){
        this.EnsureUserDataAccess();
        this.UserData = this.GetUserData();
        this.UserDataArr = this.UserData.split(";");
        // this.SetFavoriteButton();
        for (let i = 0; i < this.GlobalData.ParamList.length; i++) {
            this.AddLifeChart(this.GlobalData.ParamList[i]);
        }
    }

    // update (dt) {}

    //#endregion

    //#region Life Chart

    AddLifeChart(param:string){
        let node = cc.instantiate(this.LifeChartPrefab);
        let controller = node.getComponent(LifeChartController);
        controller.mainView = this;

        this.LifeChartNodes.push(node);
        this.ItemsPanel.addChild(node);
        node.x = 0;
        node.y = 0;

        let unsaved = this.TagUnsaved(param);
        controller.Calculate(param, unsaved);
    }

    TagUnsaved(param:string) : boolean {
        let unsaved = true;
        for (let i = 0; i < this.UserDataArr.length; i++) {
            if (param == this.UserDataArr[i]) {
                unsaved = false;
                break;
            }
        }

        return unsaved;
    }

    RemoveLifeChart(chart:LifeChartController){
        let idx = 0;
        while (idx < this.LifeChartNodes.length) {
            let node = this.LifeChartNodes[idx] 
            if (node == chart.node) {
                this.LifeChartNodes.splice(idx,1);
                this.ItemsPanel.removeChild(node);
                this.GlobalData.ParamList.splice(idx,1);
            }
            idx++;
        }
    }

    //#endregion

    //#region Favotie

    SetFavoriteButtonVisibility(){
        if (this.GlobalData.ParamList.length == 1) {
            let param = this.GlobalData.ParamList[0];
            let exists = false;
            for (let i = 0; i < this.UserDataArr.length; i++) {
                if (param == this.UserDataArr[i]) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                this.AddFavoriteButton.active = true;
            }
        }
    }

    AddFavorite(){
        // console.log("xxx @AddFavorite - " + this.GlobalData.ParamList);
        for (let i = 0; i < this.GlobalData.ParamList.length; i++) {
            let param = this.GlobalData.ParamList[i];

            let exists = false;
            for (let i = 0; i < this.UserDataArr.length; i++) {
                if (param == this.UserDataArr[i]) {
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

        let idx = 0;
        while (idx < this.LifeChartNodes.length) {
            let node = this.LifeChartNodes[idx];
            let controller = node.getComponent(LifeChartController);
            controller.SetSaved();
            idx++;
        }
    }

    //#endregion

    //#region Navigation

    GoHome(){
        cc.director.loadScene("InputView");
    }

    CompareInput(){
        this.GlobalData.Compare = true;
        // this.GlobalData.CompareParam = "";
        cc.director.loadScene("InputView");
    }

    GoList(){
        cc.director.loadScene("ListView");
    }

    CompareList(){
        this.GlobalData.Compare = true;
        // this.GlobalData.CompareParam = "";
        cc.director.loadScene("ListView");
    }

    //#endregion

    //#region Compare

    ShowCompareMenu(){
        this.compareMenu.active = true;
    }

    HideCompareMenu(){
        this.compareMenu.active = false;
    }

    //#endregion

    //#region WX Data API

    EnsureUserDataAccess(){
        // if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        // }
        let fs = wx.getFileSystemManager();
        let data = null;
        try {
            data = fs.readFileSync(`${wx.env.USER_DATA_PATH}/userdata.txt`, 'utf8');        
        }catch(error){
        }

        if (data == null) {
            fs.writeFileSync(`${wx.env.USER_DATA_PATH}/userdata.txt`, 'initial', 'utf8');
        }
    }

    SaveUserData(){
        let str = this.UserData;

        let fs = wx.getFileSystemManager();
        fs.writeFileSync(`${wx.env.USER_DATA_PATH}/userdata.txt`, str, 'utf8');
        console.log("xxx save user data : " + str);
    }

    GetUserData():string{
        let fs = wx.getFileSystemManager();
        let data = null;
        try {
            data = fs.readFileSync(`${wx.env.USER_DATA_PATH}/userdata.txt`, 'utf8');        
        }catch(error){
        }

        console.log("xxx get user data : " + data);

        return data;
    }

    //#endregion

}
