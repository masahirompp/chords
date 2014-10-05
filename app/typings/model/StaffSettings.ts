import StaffType = require('./StaffType');
import StaffTypeEnum = require('./StaffTypeEnum');
import Clef = require('./Clef');

class StaffSettings {
  // const
  public static HEIGHT:number = 297; //A4 based
  public static WIDTH:number = 210;  //A4 based
  public static TITLE_BAR_WIDTH:number = 50;
  public static SINGLE_STAFF_HEIGHT = 10;
  public static BASE_LINE_SPACE = 2;

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
    this._gClef = Clef.factory('GClef');
    this._fClef = Clef.factory('FClef');

    this.musicalTime = 8;
    this.underlineSpace = 2;
    this.lineSpace = StaffSettings.BASE_LINE_SPACE;
    this.staffSpace = 20;
    this.grandStaffSpace = 20;
    this.barCount = 4;

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

  get clefWidth():number {
    switch(this.staffType.enum) {
      case StaffTypeEnum.GrandStaff:
        return this._gClef.width;
      case StaffTypeEnum.Line:
        return 0;
      case StaffTypeEnum.Staff:
        return this.clef.width;
    }
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

