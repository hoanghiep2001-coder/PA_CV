const GameInfo = require("../Const/GameInfo");
var AudioManager = require("AudioManager");
var GameController = require("GameController");

cc.Class({
    extends: cc.Component,

    properties: {
        AudioManager: AudioManager,
        GameController: GameController,

        cardsToPick: {
            default: [],
            type: [cc.Node],
            serializable: true,
        },
        card_choose1: {
            default: null,
            type: cc.Node,
            serializable: true,
        },
        card_choose2: {
            default: null,
            type: cc.Node,
            serializable: true,
        },

        StepOne: {
            default: null,
            type: cc.Node,
            serializable: true,
        },
        StepTwo: {
            default: null,
            type: cc.Node,
            serializable: true,
        },

        pickedCard: null,
        IsFirstCardOpen: false,
        IsSecondCardOpen: false,
    },


    start() {
        // this.AudioManager.introSound.play();

        GameInfo.currentOption === 11 && this.registerEvent();
    },


    registerEvent() {        
        this.cardsToPick.forEach((card, index) => {
            card.on(cc.Node.EventType.TOUCH_START, () => this.handleCardTouchStart(card, index), this);
        });
    },


    handleCardTouchStart(card, index) {
        if (this.IsSecondCardOpen) return;

        let currentCard = card;

        if (this.pickedCard !== currentCard.name) {
            !this.IsFirstCardOpen
                ? this.handleStepOne(index, card)
                : this.handleShowStepTwo(index, card);
        }

        this.pickedCard = currentCard._name;

        this.GameController.handlePlaySoundIronSource();
    },


    handleStepOne(index, card) {
        this.IsFirstCardOpen = true;

        this.AudioManager.clickSound.play();

        let currentCardPos = card.getPosition();

        this.card_choose2.setPosition(currentCardPos);

        cc.tween(this.card_choose2)
        .to(0.5, {opacity: 255})
        .start();
    },


    handleShowStepTwo(index, card) {
        this.IsSecondCardOpen = true;

        this.AudioManager.clickSound.play();

        GameInfo.TutorialDoneStage1 = true;

        let currentCardPos = card.getPosition();

        this.card_choose1.setPosition(currentCardPos);

        cc.tween(this.card_choose1)
        .to(0.5, {opacity: 255})
        .start();

        if (this.IsFirstCardOpen && this.IsSecondCardOpen) {
            this.scheduleOnce(() => {
                this.stepOneAnimFade();
                this.mergeCard()
            }, 1);
        }
    },


    stepOneAnimFade() {
        cc.tween(this.StepOne)
        .to(0.5, {opacity: 0})
        .start();
    },


    mergeCard() {
        let MergingScene = this.StepTwo.getChildByName("Merging");
        let spine_speedLine = this.StepTwo.getChildByName("SpeedLine_1");
        let fx_Fusion = MergingScene.getChildByName("FX_Fusion");
        let cardWhite = MergingScene.getChildByName("card_white");
        let card1 = MergingScene.getChildByName("Card1");
        let card2 = MergingScene.getChildByName("Card2");
        let spine_angry = MergingScene.getChildByName("Angry");

        fx_Fusion.active = true;

        cc.tween(this.StepTwo)
            .to(0.5, { opacity: 255 })
            .call(() => fusion())
            .start();

        const fusion = () => {
            this.scheduleOnce(() => {
                this.AudioManager.introSound.stop();

                this.AudioManager.tuhuSound.play();

                MergingScene.getComponent(cc.Animation).play();

                this.scheduleOnce(() => {
                    spine_speedLine.getComponent(sp.Skeleton).timeScale = 1.1;

                    this.AudioManager.FusionSound.play();

                    cardWhite.active = true;
                    
                    spine_angry.active = true;

                    card1.active = false;

                    card2.active = false;

                    fx_Fusion.active = false;
                }, 1);

                this.scheduleOnce(() => {
                    cc.tween(cardWhite)
                    .to(1, {scale: 5})
                    .call(() => {
                        GameInfo.isDoneMergeCard = true;
                        GameInfo.currentOption = 10;
                        GameInfo.isChosenCharacter = true;
                        spine_speedLine.active = false;
                        this.AudioManager.bgSound.play();
                        this.hideThisComponent();
                    })
                    .start();
                    
                    spine_angry.active = false;

                    cc.log("Done Fusion");
                }, 4)
            }, 1)
        }
    },

    hideThisComponent() {
        cc.tween(this.node)
        .to(1, {opacity: 0})
        .call(() => this.node.active = false)
        .start();
    },
});
