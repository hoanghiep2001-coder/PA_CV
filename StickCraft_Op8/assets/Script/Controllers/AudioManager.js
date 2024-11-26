const GameInfo = require("../Const/GameInfo");

cc.Class({
    extends: cc.Component,

    properties: {
        bgSound: cc.AudioSource,
        hitSound: cc.AudioSource,
        dieSound: cc.AudioSource,
        getItemSound: cc.AudioSource,
        dashSound: cc.AudioSource,
        winSound: cc.AudioSource,
        runSound: cc.AudioSource,
        bladeSound: cc.AudioSource,
        bowSound: cc.AudioSource,
        hitBowSound: cc.AudioSource,
        touchBaseReviveSound: cc.AudioSource,
        levelUpSound: cc.AudioSource,

        // op 10 sounds
        Incrediable_sfx_Sound: cc.AudioSource,
        upgradeBgSound : cc.AudioSource,

        // op 11 sounds
        clickSound: cc.AudioSource,
        mergeSound: cc.AudioSource,
        introSound: cc.AudioSource,
        tuhuSound: cc.AudioSource,
        FusionSound: cc.AudioSource

    },


    stopAllSound() {
        this.bgSound.stop();
        this.hitSound.stop();
        this.dieSound.stop();
        this.getItemSound.stop();
        this.dashSound.stop();
        this.winSound.stop();
        this.runSound.stop();
        this.bladeSound.stop();
        this.bowSound.stop();
        this.hitBowSound.stop();

        if(GameInfo.currentOption === 10) {
            this.touchBaseReviveSound.stop();
            this.levelUpSound.stop();
            this.Incrediable_sfx_Sound.stop();
            this.upgradeBgSound.stop();
        }

        if(GameInfo.currentOption === 11) {
            this.clickSound.stop();
            this.mergeSound.stop();
        }
    },


    start() {

    },


});
