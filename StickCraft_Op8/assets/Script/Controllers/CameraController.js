
const GameInfo = require("GameInfo");

cc.Class({
    extends: cc.Component,

    properties: {
        Player_Node:cc.Node,

        BG_Layer_Back:cc.Node,

        BG_Layer_Mid:cc.Node,

        BG_Layer_Cloud:cc.Node,
    },


    start () {

    },


    update (dt) {

        if(GameInfo.currentOption === 11 && !GameInfo.isDoneMergeCard) return;

        let target_position = this.Player_Node.getPosition();
        target_position.y = cc.misc.clampf(target_position.y,0,220);
        
        // Move Camera to offset halft size
        target_position.x  -= 240;
        target_position.y  -= 160;

        let current_position = this.node.getPosition();

        current_position.lerp( target_position , 0.1 , current_position );

        this.node.setPosition(current_position);

        this.BG_Layer_Back.setPosition(current_position.x,current_position.y);

        this.BG_Layer_Cloud.setPosition(current_position.x/2,current_position.y/2);

        this.BG_Layer_Mid.setPosition(current_position.x/4,current_position.y/4);
    },
});
