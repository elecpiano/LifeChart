
const {ccclass, property} = cc._decorator;

@ccclass
export default class GlobalData extends cc.Component{
    ParamList:string[] = new Array<string>();
    Compare:boolean = false;
    // CompareParam:string = "";

    onLoad () {
        cc.game.addPersistRootNode(this.node);
    }

}
