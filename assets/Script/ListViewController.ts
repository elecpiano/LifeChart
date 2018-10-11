import GlobalData from "./Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ListViewController extends cc.Component {

    //#region Property

    // @property(cc.Node)
    // HomeButton: cc.Node = null;
    @property(cc.Node)
    DeleteModeButton: cc.Node = null;
    @property(cc.Node)
    CancelDeleteButton: cc.Node = null;
    // @property(cc.Node)
    // cancelCompareButton: cc.Node = null;
    @property(cc.Node)
    GoBackButton: cc.Node = null;

    // @property(cc.Node)
    // MultiSelectButton: cc.Node = null;
    // @property(cc.Node)
    // CancelMultiSelectButton: cc.Node = null;
    @property(cc.Node)
    MultiSelectOKButton: cc.Node = null;

    @property(cc.Node)
    ItemTemplateNode: cc.Node = null;

    @property(cc.Node)
    ItemsPanel: cc.Node = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    UserData = "";
    UserDataArr = new Array<string>();
    ItemNodes = new Array<cc.Node>();

    GlobalData:GlobalData = null;

    //#endregion
    
    //#region Lifecycle

    onLoad () {
        this.GoBackButton.active = true;

        let globalNode = cc.director.getScene().getChildByName('GlobalNode');
        this.GlobalData = globalNode.getComponent(GlobalData);
        if (this.GlobalData.Compare) {
            this.DeleteModeButton.active = false;
            this.CancelDeleteButton.active = false;
            this.MultiSelectOKButton.active = true;
        }
        else{
            this.DeleteModeButton.active = true;                        
            this.CancelDeleteButton.active = false;
            this.MultiSelectOKButton.active = false;
        }
    }

    start () {
        this.node.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.callFunc(()=>this.DoThingsAfterProgress())
        ));
        // this.TestNode.getComponent(cc.Button).enabled = false;
    }

    DoThingsAfterProgress(){
        this.EnsureUserDataAccess();
        this.UserData = this.GetUserData();
        this.UserDataArr = this.UserData.split(";");
        // console.log("xxx populate list : " + this.UserData);
        this.PopulateList();

        if (this.GlobalData.Compare) {
            this.MultiSelectMode();
        }
    }

    // update (dt) {}

    //#endregion

    //#region Navigation

    GoBack(){
        cc.director.loadScene("MainView");
    }

    //#endregion

    //#region List View

    PopulateList(){
        this.ItemNodes.splice(0,this.ItemNodes.length);
        let target = this.ItemTemplateNode;

        // let strArr = this.UserData.split(";");
        if (this.UserDataArr.length > 1) {
            for (let i = 1; i < this.UserDataArr.length; i++){
                let itemNode = cc.instantiate(target);
                let lbl = itemNode.getChildByName("ItemLabel").getComponent(cc.RichText);
                lbl.string = this.UserDataArr[i].split(" ")[0];
                
                let bodyBtn = itemNode.getChildByName("ItemLabel");
                bodyBtn.getComponent(cc.Button).clickEvents[0].customEventData = this.UserDataArr[i];
                
                let btn1 = itemNode.getChildByName("btnDelete");
                let btn2 = itemNode.getChildByName("btnChecked");
                let btn3 = itemNode.getChildByName("btnUnchecked");

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
    }

    //#endregion

    //#region Item Click & delete

    TapItem(event, customEventData){
        // console.log("xxx item tap : " + customEventData);
        let param = customEventData.toString();

        if (!this.GlobalData.Compare) {
            this.GlobalData.ParamList.splice(0,this.GlobalData.ParamList.length);                
        }
        this.GlobalData.ParamList.push(param);

        cc.director.loadScene("MainView");
    }

    DeleteMode(){
        // this.CancelMultiSelect();

        this.DeleteModeButton.active = false;
        this.CancelDeleteButton.active = true;

        for (let i = 0; i < this.ItemNodes.length; i++) {
            let deleteBtn = this.ItemNodes[i].getChildByName("btnDelete");// getComponentInChildren(cc.Button);
            deleteBtn.active = true;
        }
    }

    CancelDelete(){
        if (!this.GlobalData.Compare) {
            this.DeleteModeButton.active = true;
        }
        this.CancelDeleteButton.active = false;

        for (let i = 0; i < this.ItemNodes.length; i++) {
            let deleteBtn = this.ItemNodes[i].getChildByName("btnDelete");//getComponentInChildren(cc.Button);
            deleteBtn.active = false;
        }
    }

    DeleteItem(event, customEventData){
        // console.log("xxx item delete : " + customEventData);

        let idx = 0;
        while (idx < this.ItemNodes.length) {
            let btn = this.ItemNodes[idx].getChildByName("btnDelete").getComponent(cc.Button);
            if (btn.clickEvents[0].customEventData == customEventData) {
                break;
            }
            idx ++;
        }

        let itemNode = this.ItemNodes.splice(idx,1)[0];
        this.ItemsPanel.removeChild(itemNode);
        this.UserDataArr.splice(idx+1,1);
        
        this.UserData = "";
        for (let i = 0; i < this.UserDataArr.length; i++) {
            if (i == (this.UserDataArr.length -1)) {
                this.UserData += this.UserDataArr[i];                
            }
            else{
                this.UserData += this.UserDataArr[i] + ";";
            }
        }

        this.SaveUserData();
    }

    //#endregion

    //#region Multi Select

    MultiSelectionParam = new Array<string>();
    MultiSelectItem(event, customEventData){
        this.MultiSelectionParam.push(customEventData.toString());

        for (let item of this.ItemNodes) {
            let uncheckBtn = item.getChildByName("btnChecked");
            let checkBtn = item.getChildByName("btnUnchecked");
            if (uncheckBtn.getComponent(cc.Button).clickEvents[0].customEventData == customEventData) {
                uncheckBtn.active = true;
                checkBtn.active = false;
            }
        }
    }

    MultiUnselectItem(event, customEventData){
        let idx = 0;
        while (idx < this.MultiSelectionParam.length) {
            if (this.MultiSelectionParam[idx] == customEventData) {
                this.MultiSelectionParam.splice(idx,1);
                break;
            }
            idx ++;
        }

        for (let item of this.ItemNodes) {
            let uncheckBtn = item.getChildByName("btnChecked");
            let checkBtn = item.getChildByName("btnUnchecked");
            if (uncheckBtn.getComponent(cc.Button).clickEvents[0].customEventData == customEventData) {
                uncheckBtn.active = false;
                checkBtn.active = true;
            }
        }
    }

    MultiSelectMode(){
        // this.CancelDelete();
        // this.MultiSelectButton.active = false;
        // this.CancelMultiSelectButton.active = true;
        this.MultiSelectOKButton.active = true;

        for (let i = 0; i < this.ItemNodes.length; i++) {
            let uncheckBtn = this.ItemNodes[i].getChildByName("btnChecked");
            let checkBtn = this.ItemNodes[i].getChildByName("btnUnchecked");
            checkBtn.active = true;
        }
    }

    CancelMultiSelect(){
        // this.MultiSelectButton.active = true;
        // this.CancelMultiSelectButton.active = false;
        // this.MultiSelectOKButton.active = false;

        for (let i = 0; i < this.ItemNodes.length; i++) {
            let uncheckBtn = this.ItemNodes[i].getChildByName("btnChecked");
            let checkBtn = this.ItemNodes[i].getChildByName("btnUnchecked");
            uncheckBtn.active = false;
            checkBtn.active = false;
        }

        this.MultiSelectionParam.splice(0, this.MultiSelectionParam.length);
    }

    MultiSelectOK(){
        if (!this.GlobalData.Compare) {
            this.GlobalData.ParamList.splice(0,this.GlobalData.ParamList.length);                
        }

        for (let param of this.MultiSelectionParam) {
            this.GlobalData.ParamList.push(param);            
        }

        cc.director.loadScene("MainView");
    }

    //#endregion

    //#region Compare

    CancelCompare(){
        cc.director.loadScene("MainView");
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

    GetUserData():string{
        let fs = wx.getFileSystemManager();
        let data = null;
        try {
            data = fs.readFileSync(`${wx.env.USER_DATA_PATH}/userdata.txt`, 'utf8');        
        }catch(error){
        }

        // console.log("xxx get user data : " + data);

        return data;
    }

    SaveUserData(){
        let str = this.UserData;

        let fs = wx.getFileSystemManager();
        fs.writeFileSync(`${wx.env.USER_DATA_PATH}/userdata.txt`, str, 'utf8');
        // console.log("xxx save user data : " + str);
    }

    //#endregion


}
