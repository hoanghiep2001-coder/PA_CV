const GameInfo = require("GameInfo");
const AudioManager = require("AudioManager");
const CONST = require("../Const/CONST");


cc.Class({
    extends: cc.Component,

    properties: {
        InstallPopup: cc.Node,
        ChangeYourOrientation: cc.Node,

        AudioManager: AudioManager,
        // Dhhiep
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;

        let physics_manager = cc.director.getPhysicsManager()
        physics_manager.enabled = true;
        physics_manager.gravity = cc.v2 (0, -2000);

        this._changeOrientation = false;
        this._lastOrientationIsLandscape = true;
    },


    start () {
        // this.InstallPopup.active = false;
        window.gameReady && window.gameReady();

        // this.AudioManager.bgSound.play();
        this.handleYourOrientation();

        cc.view.setResizeCallback (()=>{
            this.handleYourOrientation();
        });
    },


     handleIronSourcePlaySound() {
        if (CONST.IronSource.isPlayBgSound) {
          return;
        }
    
        if (CONST.IronSource.SoundState) {
          this.AudioManager.bgSound.play();
        }
    
        CONST.IronSource.isPlayBgSound = true;
      },
    
    
       handleMuteSoundIronSource() {
        CONST.IronSource.State = parseInt(localStorage.getItem("cocosSoundState"), 10)
    
        if (CONST.IronSource.State) {
          if (CONST.IronSource.State === 1 && !CONST.IronSource.SoundState && !CONST.IronSource.isEndGame) {
            CONST.IronSource.SoundState = true;

            GameInfo.isUpgradeWeapon 
            ? this.AudioManager.upgradeBgSound.play()
            : this.AudioManager.bgSound.play();
          }
    
          if (CONST.IronSource.State === 2 && CONST.IronSource.SoundState) {
            CONST.IronSource.SoundState = false;
            this.AudioManager.stopAllSound();
          }
        }
      },


    showPopupInstall(){
        this.InstallPopup.active = true;
        this.InstallPopup.setPosition(0, 0);
    },


    handleYourOrientation(){
        if(cc.view.getFrameSize().width > cc.view.getFrameSize().height){
            this.ChangeYourOrientation.active = false;
            GameInfo.GamePause = false;
        } else {
            this.ChangeYourOrientation.active = true;
            GameInfo.GamePause = true;
        }
    },


    update (dt) {
        if(window.isHitArrow) {
            window.isHitArrow = false;
            this.AudioManager.hitBowSound.play();
        }

        // ironsource
        this.handleMuteSoundIronSource();
    },
});
