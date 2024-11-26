const { Constants } = require("../Data/Constant");

cc.Class({
    extends: cc.Component,

    properties: {
        positionTouch: cc.Vec2,
        player: cc.Node,
        camera: cc.Node,
        rigidBody: cc.RigidBody,
        tut: cc.Node,
        enemyController: cc.Node,
        gamePlay: cc.Node,
        btn_revive: cc.Node,
    },

    start () {
        this.bodyPlayer = this.player.getChildByName("Body");
        this.isTouched = false;

        this.node.parent.on(cc.Node.EventType.TOUCH_START, (event)=>{
            if(this.tut.active){
                this.tut.active = false;
                this.player.getComponent("PlayerController").isMove = true;
                this.enemyController.getComponent("EnemyController").startCreateEnemy();
                this.gamePlay.getComponent("GamePlay").showBoss();
            }
            Constants.isGameStart = true;
            this.isTouched = true;
            this.moveWithTouch(event);
        });

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event)=>{
            this.moveWithTouch(event);
            
        });

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, (event)=>{
            this.isTouched = false;
        });

        this.node.on(cc.Node.EventType.TOUCH_END, (event)=>{
            this.isTouched = false;
        });
    },


    registerReviveAction() {
        this.btn_revive.on(cc.Node.EventType.TOUCH_START, this.handleBtnReviveTouchStart, this);
    },

    handleBtnReviveTouchStart() {
        cc.audioEngine.stopAll();
        Constants.countDie >= 1 && cc.director.loadScene("Game");
    },

    moveWithTouch(event){
        this.positionTouch = event.getLocation();
        let localTouchPos = this.node.convertToNodeSpaceAR(this.positionTouch);
        this.positionTouch = localTouchPos;

        this.positionTouch.x += this.camera.x;
        this.positionTouch.y += this.camera.y;

        var anglePlayer = cc.misc.radiansToDegrees(Math.atan((this.player.y - localTouchPos.y)/(this.player.x - localTouchPos.x)));

        this.bodyPlayer.angle = anglePlayer;


        if((this.player.x - localTouchPos.x) > 0){
            this.bodyPlayer.scaleX = -1;
        }else{
            this.bodyPlayer.scaleX = 1;
        }


    },

    update (dt) {
        if(Constants.isGameStart && !Constants.isShowPopupOptions) {
            Constants.gameTime += 0.01;
            if(Constants.gameTime >= 3) {
                Constants.isShowPopupOptions = true;
                this.gamePlay.getComponent("GamePlay").showPopupOptions();
            }
        } 
    },
});
