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

  public staffSpace:number;
  public lineSpace:number;
  public underlineSpace:number;
  public hasPageNo:boolean;
  public staffType:StaffType;
  public barCount:number;
  public musicalTime:number;
  public hasClef:boolean;
  public clef:Clef;
  public hasKey:boolean;
  public hasBarNo:boolean;

  constructor(option?:any) {
    this.staffSpace = 20;
    this.lineSpace = 2;
    this.underlineSpace = 2;
    this.hasPageNo = true;
    this.staffType = StaffType.Line;
    this.barCount = 4;
    this.musicalTime = 8;
    this.hasClef = true;
    this.clef = Clef.GClef;
    this.hasKey = false;
    this.hasBarNo = false;
    if(option){
      if(option.staffSpace) this.staffSpace = option.staffSpace;
      if(option.lineSpace) this.lineSpace = option.lineSpace;
      if(option.underlineSpace) this.underlineSpace = option.underlineSpace;
      if(option.hasPageNo) this.hasPageNo = option.hasPageNo;
      if(option.staffType) this.staffType = StaffType.factory(option.staffType);
      if(option.barCount) this.barCount = option.barCount;
      if(option.musicalTime) this.musicalTime = option.musicalTime;
      if(option.hasClef) this.hasClef = option.hasClef;
      if(option.clef) this.clef = Clef.factory(option.clef);
      if(option.hasKey) this.hasKey = option.hasKey;
      if(option.hasBarNo) this.hasBarNo = option.hasBarNo;
    }
  }

}

export = StaffSettings

