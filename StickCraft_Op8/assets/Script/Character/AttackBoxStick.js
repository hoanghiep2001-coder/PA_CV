var AudioManager = require("AudioManager");
const GameInfo = require("../Const/GameInfo");
const CONST = require("CONST");
// const {EnEnemies} = require("GameEnum");

cc.Class({
    extends: cc.Component,

    properties: {
        AudioManager: AudioManager,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onEnable (){
        this.scheduleOnce(function() {
            this.disableCollision();
        }, 0.15);
    },

    // update (dt) {},

    disableCollision(){
        this.node.active = false;
    },

    onCollisionEnter: function (other, self) {
        cc.log("Attack Box Stick: " , other.node.group);
        window.isUsingSword && this.AudioManager.bladeSound.play();
        window.isUsingFist && this.AudioManager.hitSound.play();

        
        if(other.node.group == "Enemy"){
            console.log("Hit Enemy");

            if(GameInfo.currentOption === 9) {

                if(other.getComponent("EnemyBehavior").EnemyId === EnEnemies.Boss) CONST.StickBaseAttack = 5;
    
                else CONST.StickBaseAttack = 150;
            } 

            CONST.StickBaseAttack = 150;
        }
    },
});
