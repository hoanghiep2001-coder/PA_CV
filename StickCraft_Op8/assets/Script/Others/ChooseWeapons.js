var Player3D = require("Player3D");
const GameInfo = require("GameInfo");
var EnWeapon = require("GameEnum").EnWeapon;

cc.Class({
    extends: cc.Component,

    properties: {
        changeWeapon: {
            default: null,
            type: cc.Node,
            serializable: true
        },
        player: {
            default: null,
            type: cc.Node,
            serializable: true
        },
        Buttons: {
            default: [],       
            type: [cc.Button],
            serializable: true, 
        },
    },

    onLoad () {},

    start () {
        this.registerEvent();
    },

    // update (dt) {},

    onCollisionEnter: function (other, self) {
        if(other.node.group == "Player" && GameInfo.currentOption === 8){
            GameInfo.TutorialDoneStage1 = true;  
            GameInfo.GamePause = true;
        }
    },

    registerEvent: function () {
        this.Buttons.forEach((button, index) => {
            button.node.on(cc.Node.EventType.TOUCH_START, () => this.onClickWeapon(index), this)
        });
    },

    onClickWeapon: function (index) {
        this.player.getComponent(Player3D).changeWeapon(index);
        this.changeWeapon.active = false;
        this.node.active = false;
        this.node.destroy();
        GameInfo.GamePause = false;
    }

    // collectWeapon(player){
    //     console.log("Player collect weapon: " + this.weaponType);
    //     player.changeWeapon(this.weaponType);

    //     if(this.weaponType == EnWeapon.Sword){
    //         GameInfo.TutorialDoneStage1 = true;       
    //     }
        
    //     if(this.weaponType == EnWeapon.Archer){
    //         GameInfo.TutorialDoneStage2 = true;
    //     }

    //     this.node.destroy();
    // }


});
