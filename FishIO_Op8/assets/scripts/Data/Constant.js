
const { ccclass, property } = cc._decorator;

const Event = {
    touchStart: "touchstart",
    touchMove: "touchmove",
    touchEnd: "touchend",
    touchCancel: "touchcancel"
}


const IronSource = {
    // ironsource 
    SoundState: true,
    State: 1,
    isEndGame: false,
    isPlayBgSound: false,
}


const Responsive = {
    HORIZONTAL_IPX: "horizontal_IPX",
    HORIZONTAL_TABLET: "horizontal_Tablet",
    VERTICAL_IPX: "vertical_IPX",
    VERTICAL_MOBILE: "vertical_Mobile",
}


export class Constants {

    // state    
    static isClickGameStart = false;
    static isPlaySound = false;
    static isRotate = false;
    static countDie = 0;
    static isGameStart = false;
    static isShowPopupOptions = false;
    static gameTime = 0;


    // event
    static Event = Event;


    // ironSource
    static ironSource = IronSource;


    // Responsive
    static Responsive = Responsive;
}
