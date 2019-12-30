
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
        this.addChild(container)

        let bg: egret.Bitmap = GameUtil.createBitmapByName('bg','jpg')
        container.addChild(bg)

        //因为使用了fixedWidth模式，自己根据舞台宽高，重新设置背景图片大小
        let ratioW = GameUtil.getStageWidth() / bg.width
        let ratioH = GameUtil.getStageHeight() / bg.height
        let ratio = bg.width / bg.height
        if (ratioW > ratioH) {
            bg.width = GameUtil.getStageWidth()
            bg.height = bg.width / ratio
        } else {
            bg.height = GameUtil.getStageHeight()
            bg.width = bg.height / ratio
        }
        bg.x = (GameUtil.getStageWidth() - bg.width) / 2

        SceneController.instance.setStage(container)
        SceneController.initGame()
    }

}