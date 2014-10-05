import StaffType = require('./StaffType');
import Clef = require('./Clef');

class StaffSettings {
  // const
  public HEIGHT:number = 297; //A4 based
  public WIDTH:number = 210;  //A4 based
  public TITLE_BAR_WIDTH:number = 50;
  public SINGLE_STAFF_HEIGHT = 10;

  // あとで消す
  public BASE_CLEF_WIDTH = 10;
  public BASE_LINE_SPACE = 10;

  public margin:{
    top:number;
    bottom:number;
    left:number;
    right:number;
  };

  public offsetTitle:number;
  public offsetSection:number;

  public showClef:boolean;
  public showKeySignature:boolean;
  public showMusicalTime:boolean;

  public staffType:StaffType;
  public clef:Clef;

  public musicalTime:number;
  public underlineSpace:number;
  public lineSpace:number;
  public staffSpace:number;
  public barCount:number;

  constructor(option?:any) {

    this.margin = {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20
    };

    this.offsetTitle = 50;
    this.offsetSection = 30;

    this.showClef = true;
    this.showKeySignature = false;
    this.showMusicalTime = false;

    this.staffType = StaffType.Line;
    this.clef = Clef.GClef;

    this.musicalTime = 8;
    this.underlineSpace = 2;
    this.lineSpace = 2;
    this.staffSpace = 20;
    this.barCount = 4;

    if(option) {
      if(option.margin) this.margin = option.margin;

      if(option.offsetTitle) this.offsetTitle = option.offsetTitle;
      if(option.offsetSection) this.offsetSection = option.offsetSection;

      if(option.showClef) this.showClef = option.showClef;
      if(option.showKeySignature) this.showKeySignature = option.showKeySignature;
      if(option.showMusicalTime) this.showMusicalTime = option.showMusicalTime;

      if(option.staffType) this.staffType = StaffType.factory(option.staffType);
      if(option.clef) this.clef = Clef.factory(option.clef);

      if(option.musicalTime) this.musicalTime = option.musicalTime;
      if(option.underlineSpace) this.underlineSpace = option.underlineSpace;
      if(option.lineSpace) this.lineSpace = option.lineSpace;
      if(option.staffSpace) this.staffSpace = option.staffSpace;
      if(option.barCount) this.barCount = option.barCount;
    }
  }

}

export = StaffSettings

