const GameInfo = require("../Const/GameInfo");
const AudioManager = require("../Controllers/AudioManager")


cc.Class({
    extends: cc.Component,

    properties: {
        AudioManger: AudioManager
    },

    start () {

    },


    onCollisionEnter: function (other, self) {
        if(other.node.group == "Player"){
            cc.log("Base Revive Touched!");
            this.AudioManger.levelUpSound.play();
            GameInfo.IsTouchBaseRevive = true;
            this.node.active = false;
        }
    },
});
