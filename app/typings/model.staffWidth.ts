/// <reference path="../../typings/tsd.d.client.ts" />

class StaffWidth {

  private _width:number;
  private _clefWidth:number;
  private _barCount:number;
  private _musicalTime:number;
  private _hasClef:boolean;
  private _hasKey:boolean;
  private _hasBarNo:boolean;

  // nownow
  private _keyWidth:number = 0;

  private _paddingLeft:number;
  private _barWidth:number;
  private _firstBarWidth:number;
  private _chordWidth:number;

  constructor(width:number,
              clefWidth:number,
              barCount:number,
              musicalTime:number,
              hasClef:boolean,
              hasKey:boolean,
              hasBarNo:boolean) {
    this._width = width;
    this._clefWidth = clefWidth;
    this._barCount = barCount;
    this._musicalTime = musicalTime;
    this._hasClef = hasClef;
    this._hasKey = hasKey;
    this._hasBarNo = hasBarNo;

    // calculated
    this._paddingLeft = (hasClef ?
                        clefWidth :
                        0) + (hasKey ?
                              this._keyWidth :
                              0);
    this._barWidth = (width - this._paddingLeft) / barCount;
    this._firstBarWidth = this._paddingLeft + this._barWidth;
    this._chordWidth = this._barWidth / musicalTime;
  }

  get barCount():number {
    return this._barCount;
  }

  get musicalTime():number {
    return this._musicalTime;
  }

  get barWidth():number {
    return this._barWidth;
  }

  get firstBarWidth():number {
    return this._firstBarWidth;
  }

  get clefWidth():number {
    return this._clefWidth;
  }

  get chordWidth():number {
    return this._chordWidth;
  }
}

export = StaffWidth

