import StaffType = require('./StaffType');
import Clef = require('./Clef');

class StaffSettings {
  // const
  public HEIGHT:number = 297; //A4 based
  public WIDTH:number = 210;  //A4 based
  public BASE_CLEF_WIDTH:number = 14;
  public BASE_LINE_SPACE:number = 3;

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

  constructor() {
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
  }
}

export = StaffSettings

