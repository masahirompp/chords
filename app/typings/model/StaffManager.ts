import Point = require('./../interface/IPoint')
import StaffSettings = require('./StaffSettings')
import StaffHeight = require('./StaffHeight')
import StaffWidth = require('./StaffWidth')

class StaffManager {

  private _height: StaffHeight;
  private _width: StaffWidth;

  private _barIndex: number = -1;
  private _lineIndex: number = -1;

  constructor(public settings: StaffSettings) {
    this._height = new StaffHeight(settings);
    this._width = new StaffWidth(settings);
  }

  public isFirstBar(): boolean {
    return this._barIndex % this.settings.barCount === 0;
  }

  public next(): StaffManager {
    this._barIndex++;
    if (this.isFirstBar()) {
      this._lineIndex++;
    }
    return this;
  }

  public nextLine(): StaffManager {
    while (!this.isFirstBar()) {
      this.next();
    }
    return this;
  }

  public getStaffPoint(): Point {
    return {
      x: this._width.getOffsetLeft(this._barIndex),
      y: this._height.getOffsetTopStaff(this._lineIndex)
    };
  }

  public getChordPoint(): Point[] {
    var xs: number[] = this._width.getOffsetLeftChordArray(this._barIndex);
    var y: number = this._height.getOffsetTopChord(this._lineIndex);
    return xs.map(x => {
      return {
        x: x,
        y: y
      }
    });
  }

}

export = StaffManager