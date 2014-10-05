import StaffSettings = require('./../model/StaffSettings')

class StaffWidth {

  private _staffWidth:number;
  private _barWidth:number;
  private _firstBarWidth:number;
  private _chordWidth:number;

  constructor(public settings:StaffSettings) {
    this._staffWidth = StaffSettings.WIDTH - settings.margin.left - settings.margin.right;
    this._barWidth = (this._staffWidth - settings.clefWidth) / settings.barCount;
    this._firstBarWidth = this._barWidth + settings.clefWidth;
    this._chordWidth = this._barWidth / settings.musicalTime;
  }

  public getOffsetLeft(barIndex:number):number {
    var index = barIndex % this.settings.barCount;
    switch(index) {
      case 0:
        return this.settings.margin.left;
      case 1:
        return this.settings.margin.left + this._firstBarWidth;
      default :
        return this.settings.margin.left + this._firstBarWidth + this._barWidth * (index - 1);
    }
  }

  public getOffsetLeftChordArray(barIndex:number):number[] {
    var base = this.getOffsetLeft(barIndex);
    var offsets:number[] = [];
    for(var i = 0; i < this.settings.musicalTime; i++) {
      offsets.push(base + this._chordWidth * i);
    }
    return offsets;
  }

  get firstBarWidth():number {
    return this._firstBarWidth;
  }

  get barWidth():number {
    return this._barWidth;
  }
}

export = StaffWidth

