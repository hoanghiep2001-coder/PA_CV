const CONST = require("CONST");
const GameInfo = require("GameInfo");
const { EnGameStyle, EnGameSkin } = require("../Helper/GameEnum");
const AudioManager = require("AudioManager");

cc.Class({
    extends: cc.Component,

    properties: {
        GameStyle: {
            default: EnGameStyle.Basic,
            type: EnGameStyle,
        },

        AudioManager: {
            default: null,
            type: AudioManager,
            serializable: true,
        },

        BackGroundSprites: {
            default: [],
            type: [cc.SpriteFrame],
            serializable: true,
        },

        FollowCamera: cc.Node,

        // Btn Move
        ButtonMoveLeft: {
            default: null,
            type: cc.Button,
            serializable: true,
        },
        ButtonMoveRight: {
            default: null,
            type: cc.Button,
            serializable: true,
        },

        // Btn Attack
        ButtonAttack: {
            default: null,
            type: cc.Button,
            serializable: true,
        },
        ButtonJump: {
            default: null,
            type: cc.Button,
            serializable: true,
        },
        ButtonDash: {
            default: null,
            type: cc.Button,
            serializable: true,
        },

        // Button Weapon
        ButtonWeaponSword: {
            default: null,
            type: cc.Button,
            serializable: true,
        },
        ButtonWeaponArcher: {
            default: null,
            type: cc.Button,
            serializable: true,
        },

        // Info
        EnemyLiveText: {
            default: null,
            type: cc.Label,
            serializable: true,
        },
        StickLifeText: {
            default: null,
            type: cc.Label,
            serializable: true,
        },

        // Choose Weapon
        ChooseWeapon: {
            default: null,
            type: cc.Node,
            serializable: true,
        },

        // Transparent Wall Op9
        TransparentWalls: {
            default: [],
            type: [cc.Node],
            serializable: true,
        },


        // op 10
        spineStickMan: {
            default: null,
            type: sp.Skeleton,
            serializable: true,
        },
        ChooseYourCharacter: {
            default: null,
            type: cc.Node,
            serializable: true,
        },
        ButtonCharacters: {
            default: [],
            type: [cc.Node],
            serializable: true,
        },
        BaseRevive_Fx_fire: {
            default: null,
            type: cc.Node,
            serializable: true,
        },

        HandTutorialSword: cc.Node,

        HandTutorialArcher: cc.Node,

        MessageText: cc.Label,

        TempWall: cc.Node,

        InstallPopup: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        GameInfo.TotalEnemy = CONST.TotalEnemyInGame;
        GameInfo.TotalEnemyAlive = GameInfo.TotalEnemy;

        this._tutorialDoneStage1Called = false;
        this._tutorialStartStage2Called = false;
        this._tutorialDoneStage2Called = false;

        this._isShowedPopupInstall = false;

        GameInfo.GamePause = true;

        // this.scheduleOnce(function () {
        //     if (cc.view.getFrameSize().width > cc.view.getFrameSize().height) {
        //         GameInfo.GamePause = false;
        //     } else {
        //         GameInfo.GamePause = true;
        //     }
        // }, 3);
    },


    start() {
        this.InstallPopup.active = false;

        if (GameInfo.currentOption === 10) {
            this.registerEvent();
        }
    },


    registerEvent() {
        this.spineStickMan.node.opacity = 0;

        this.ButtonCharacters.forEach((btn) => {
            btn.on(cc.Node.EventType.TOUCH_START, this.hideChooseCharacter, this);
        });
    },


    hideChooseCharacter(e) {
        let node = e.target;

        GameInfo.isChosenCharacter = true;

        GameInfo.TutorialDoneStage1 = true;

        this.AudioManager.getItemSound.play();

        if (node.name === "Frame_2") this.spineStickMan.setSkin("Songoku");
        else this.spineStickMan.setSkin("Base");

        this.spineStickMan.node.opacity = 255;

        this.ChooseYourCharacter.active = false;
    },


    update(dt) {
        this.node.setPosition(this.FollowCamera.getPosition());

        this.EnemyLiveText.string = (GameInfo.TotalEnemy - GameInfo.TotalEnemyAlive) + "/" + GameInfo.TotalEnemy;

        // nếu op hiện tại là op 8 hoặc 10 thì không cho hiện text Change Weapon
        if (GameInfo.currentOption !== 8 && GameInfo.currentOption !== 10) {
            if (!GameInfo.TutorialStartStage2) {
                if (GameInfo.TotalEnemy - GameInfo.TotalEnemyAlive >= CONST.NumEnemyForStartStage2) {
                    GameInfo.TutorialStartStage2 = true;
                }
            }
        }


        if (GameInfo.isPickupSword) this.TempWall.active = false;


        if (GameInfo.currentOption === 10 && GameInfo.IsTouchBaseRevive) {
            if (!this.BaseRevive_Fx_fire.active) {
                this.BaseRevive_Fx_fire.active = true;
                this.TransparentWalls[0].active = false;
            }
        }


        if (!this._tutorialDoneStage1Called && GameInfo.TutorialDoneStage1) {
            this._tutorialDoneStage1Called = true;
            this.callWhenStage1Done();
        }


        if (!this._tutorialStartStage2Called && GameInfo.TutorialStartStage2) {
            this._tutorialStartStage2Called = true;
            this.callWhenStage2Start();
        }


        if (!this._tutorialDoneStage2Called && GameInfo.TutorialDoneStage2) {
            this._tutorialDoneStage2Called = true;
            this.callWhenStage2Done();
        }


        if (!this._isShowedPopupInstall && GameInfo.IsShowPopupInstall) {
            this._isShowedPopupInstall = true;
            this.showPopupInstall();
        }
    },

    callWhenStage1Done() {
        cc.log("Stage 1 Done");
        this.MessageText.node.active = false;

        // if (GameInfo.currentOption === 10) {
        //     this.TempWall.active = false;
        // }

        // hiện list vũ khí cho user chọn
        if (GameInfo.currentOption === 8) {
            this.ChooseWeapon.active = true;
        }
    },

    callWhenStage2Start() {
        cc.log("Stage 2 Start");
        this.TempWall.active = false;

        this.MessageText.node.active = true;
        this.MessageText.string = "CHANGE YOUR WEAPON!";

        // GameInfo.GamePause = true;

        // this.scheduleOnce(function() {
        //     GameInfo.GamePause = false;
        // }, 3);
    },

    callWhenStage2Done() {
        cc.log("Stage 2 Done");
        this.MessageText.node.active = false;

        if (GameInfo.currentOption === 9) {
            this.TransparentWalls.forEach(wall => {
                wall.active = true;
            });
        }
    },

    showPopupInstall() {
        this.InstallPopup.active = true;
        this.InstallPopup.setPosition(0, 0);
    }
});
