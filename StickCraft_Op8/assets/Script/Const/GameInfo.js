const {EnStickState, EnStickMode} = require("GameEnum");

var GameInfo = {
    currentOption: 11,

    IsPlaying : false,
    TotalEnemy: 0,
    TotalEnemyAlive: 0,
    StickState: EnStickState.Idle,
    StickMode: EnStickMode.Normal,
    
    // Button Action
    InputAttackDown: false,
    InputJumpDown: false,
    InputDashDown: false,
    InputMoveHorizontal: 0,
    
    GamePause: false,
    TutorialDoneStage1: false,
    TutorialStartStage2: false,
    TutorialDoneStage2: false,
    
    IsShowPopupInstall: false,
    isLose:  false,
    isWin:  false,
    
    
    // UI In Game
    isUpgradeWeapon: false,
    IsTouchBaseRevive: false,
    isDefeatBoss: false,
    isTouchTreasure: false,

    isChosenCharacter: false,
    isPickupSword: false,


    // FGP
    isDoneMergeCard: false,
}

module.exports = GameInfo;