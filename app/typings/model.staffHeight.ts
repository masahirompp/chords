/// <reference path="../../typings/tsd.d.client.ts" />

import StaffType = require('./model.staffType')

class StaffHeight {
  // nownow
  private _titleSpace:number = 5;
  private _firstChordSpace:number = 5;

  private _height:number;
  private _staffSpace:number;
  private _lineSpace:number;
  private _underlineSpace:number;
  private _printMode:boolean;
  private _hasPageNo:boolean;
  private _staffType:StaffType;
  private _offsetTop:number;
  private _staffHeight:number;
  private _staffLineHeight:number;

  constructor(height:number,
              staffSpace:number,
              lineSpace:number,
              underlineSpace:number,
              printMode:boolean,
              hasPageNo:boolean,
              staffType:StaffType) {
    this._height = height;
    this._staffSpace = staffSpace;
    this._lineSpace = lineSpace;
    this._underlineSpace = underlineSpace;
    this._printMode = printMode;
    this._hasPageNo = hasPageNo;
    this._staffType = staffType;

    // 最初の五線譜までの距離
    this._offsetTop = this._firstChordSpace + (printMode ?
                                             this._titleSpace :
                                             0);

    // 五線部分の高さ
    this._staffHeight = this.calcStaffHeight();

    // 五線から次の五線までの距離
    this._staffLineHeight = this._staffHeight + this._staffSpace;
  }

  get offsetTop():number {
    return this._offsetTop
  }

  get staffLineHeight():number {
    return this._staffLineHeight;
  }

  get underlineSpace():number {
    return this._underlineSpace;
  }

  private calcStaffHeight():number {
    switch(this._staffType) {
      case StaffType.GrandStaff:
      case StaffType.Staff:
      case StaffType.Line:
        return this._lineSpace * 4;
    }
  }
}

export = StaffHeight
