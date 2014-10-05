import StaffType = require('./StaffType');
import StaffTypeEnum = require('./StaffTypeEnum');
import Clef = require('./Clef');

class StaffSettings {
  // const
  public static HEIGHT:number = 2970; //A4 based
  public static WIDTH:number = 2100;  //A4 based
  public static TITLE_BAR_WIDTH:number = 500;
  public static SINGLE_STAFF_HEIGHT = 100;
  public static BASE_LINE_SPACE = 20;

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
  public clefId:string;
  public _gClef:Clef;
  public _fClef:Clef;

  public musicalTime:number;
  public underlineSpace:number;
  public lineSpace:number;
  public staffSpace:number;
  public grandStaffSpace:number;
  public barCount:number;

  public fontSize:number;

  constructor(option?:any) {

    this.margin = {
      top: 200,
      bottom: 200,
      left: 200,
      right: 200
    };

    this.offsetTitle = 100;
    this.offsetSection = 100;

    this.showClef = true;
    this.showKeySignature = false;
    this.showMusicalTime = false;

    this.staffType = StaffType.Line;
    this.clefId = 'GClef';
    this._gClef = Clef.factory('GClef');
    this._fClef = Clef.factory('FClef');

    this.musicalTime = 8;
    this.underlineSpace = 20;
    this.lineSpace = StaffSettings.BASE_LINE_SPACE;
    this.staffSpace = 200;
    this.grandStaffSpace = 200;
    this.barCount = 4;

    this.fontSize = 45;

    if(option) {
      if(option.margin) this.margin = option.margin;

      if(option.offsetTitle) this.offsetTitle = option.offsetTitle;
      if(option.offsetSection) this.offsetSection = option.offsetSection;

      if(option.showClef) this.showClef = option.showClef;
      if(option.showKeySignature) this.showKeySignature = option.showKeySignature;
      if(option.showMusicalTime) this.showMusicalTime = option.showMusicalTime;

      if(option.staffType) this.staffType = StaffType.factory(option.staffType);
      if(option.clefId) this.clefId = option.clefId;

      if(option.musicalTime) this.musicalTime = option.musicalTime;
      if(option.underlineSpace) this.underlineSpace = option.underlineSpace;
      if(option.lineSpace) this.lineSpace = option.lineSpace;
      if(option.staffSpace) this.staffSpace = option.staffSpace;
      if(option.grandStaffSpace) this.grandStaffSpace = option.grandStaffSpace;
      if(option.barCount) this.barCount = option.barCount;

      if(option.fontSize) this.fontSize = option.fontSize;
    }
  }

  get clef():Clef {
    if(this.clefId === 'GClef') {
      return this._gClef;
    }
    return this._fClef;
  }

  get gClef():Clef {
    return this._gClef;
  }

  get fClef():Clef {
    return this._fClef;
  }

  get staffHeight():number {
    switch(this.staffType.enum) {
      case StaffTypeEnum.GrandStaff:
        return this.lineSpace * 4 * 2 + this.grandStaffSpace;
      case StaffTypeEnum.Line:
        return StaffSettings.SINGLE_STAFF_HEIGHT;
      case StaffTypeEnum.Staff:
        return this.lineSpace * 4;
    }
  }

}

export = StaffSettings

