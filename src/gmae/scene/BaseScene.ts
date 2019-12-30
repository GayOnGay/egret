/**
 * 实现BaseSCene类
 * 继承egret.DisplayObjectContainer类
 * 拥有initView方法，之后的所有场景继承自该类，只需要实现initView方法即可
 */
class BaseScene extends egret.DisplayObjectContainer {
    
    public constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE，this.initView, this)
    }

    protected initView(){
    }
}