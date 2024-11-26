var Player3D = require("Player3D");
const {EnEnemies} = require("GameEnum");
const CONST = require("CONST");
const GameInfo = require("../Const/GameInfo");


cc.Class({
    extends: cc.Component,


    properties: {

    },


    onLoad () {

    },


    start () {
        
    },


    update (dt) {

    },


    onEnable() {
        this.scheduleOnce(function() {
            this.disableCollision();
        }, 0.15);
    },


    disableCollision(){
        this.node.active = false;
    },


    onCollisionEnter: function (other, self) {
        if(other.node.group == "Player"){
            let zombieParentNode = this.node.parent.parent,
                EnemyBehaviorComp = zombieParentNode.getComponent("EnemyBehavior");

            // setup dame Boss for op 9
            if(EnemyBehaviorComp.EnemyId == EnEnemies.Boss && GameInfo.currentOption === 9) {
                this.setUpDameEnemyForOp9(other);
                return;
            }
            
            
            // setup dame boss for op 10
            // if(EnemyBehaviorComp.EnemyId == EnEnemies.Boss && GameInfo.currentOption === 10) {
            //     this.setUpDameEnemyForOp9(other);
            // CONST.ZombieBaseAttack = 60;

            // return;
            // }
                
                
            // Basic Dame For Enemy
            CONST.ZombieBaseAttack = 60;

            other.getComponent(Player3D).hit(CONST.ZombieBaseAttack);
        }
    },


    setUpDameEnemyForOp9: (other) => {
        CONST.ZombieBaseAttack = 300;
        other.getComponent(Player3D).hit(CONST.ZombieBaseAttack);
    },
});
