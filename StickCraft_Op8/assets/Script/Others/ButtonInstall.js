var AudioManager = require("AudioManager");
const GameInfo = require("../Const/GameInfo");
cc.Class({
    extends: cc.Component,

    properties: {
        // DhHiep
        hideMask: cc.Node,
        AudioManager: AudioManager,

        CTA_win: cc.Node,
        CTA_lose: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        // mtg && applovin
        this.hideMask.on(cc.Node.EventType.TOUCH_START, this.installHandle, this);
        if(GameInfo.isLose) this.CTA_win.active = false;
        if(GameInfo.isWin) this.CTA_lose.active = false;

        cc.tween(this.node)
            .repeatForever(
                cc.tween(this.node)
                    .to(0.5, { scale: 0.9 })
                    .to(0.5, { scale: 1 }, { easing: 'elasticOut' })
            ).start();

        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            cc.tween(this.node).to(0.2, { scale: 0.9 }, this).start();
        }, this);

        this.node.on(cc.Node.EventType.MOUSE_UP, function (event) {
            cc.tween(this.node).to(0.2, { scale: 1 }, this).start();
        }, this);
    },

    // update (dt) {},

    installHandle() {
        // Handle for google playable ads
        cc.log("Click Install Handle");
        this.AudioManager.stopAllSound();



        //If ad network is tiktok
        if (typeof (playableSDK) != "undefined") {
            window.playableSDK.openAppStore();
            return;
        }

        // If ad network is google ads
        if (typeof (ExitApi) != "undefined") {
            ExitApi.exit();
            return;
        }

        // If ad netwrok is ironsources
        if (typeof (dapi) != "undefined") {
            dapi.openStoreUrl();
            return;
        }

        // If ad network support MRAID 2.0
        if (typeof (mraid) != "undefined") {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.ANDROID) {
                mraid.open("https://play.google.com/store/apps/details?id=com.stickman.craftman");
                return;
            }

            if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.IPHONE || cc.sys.os == cc.sys.IPAD) {
                mraid.open("https://itunes.apple.com/us/app/id1629824246?mt=8");
                return;
            }

            mraid.open("https://play.google.com/store/apps/details?id=com.stickman.craftman");
            return;
        }
        // If ad network is mindwork. window alway avaiable so skip undefined check
        window.install && window.install();
    },

});
