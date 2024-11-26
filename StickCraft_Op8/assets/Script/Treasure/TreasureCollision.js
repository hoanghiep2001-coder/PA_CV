const GameInfo = require("../Const/GameInfo");



cc.Class({
    extends: cc.Component,

    properties: {
  
    },

    start () {

    },


    onCollisionEnter: function (other, self) {
        if(other.node.group == "Player" && GameInfo.isDefeatBoss){
            cc.log("Treasure Touched!");
            GameInfo.isTouchTreasure = true;
            this.node.active = false;
            // this.AudioManger.levelUpSound.play();

        }
    },
});
