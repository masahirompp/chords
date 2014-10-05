import StaffSettings = require('./../model/StaffSettings')
import StaffType = require('./StaffType')
import StaffWidth = require('./StaffWidth')
import Clef = require('./Clef')
import ILinePoint = require('./../interface/ILinePoint')

class SvgStaffDef {
  private _width:StaffWidth;

  constructor(public settings:StaffSettings) {
    this._width = new StaffWidth(settings);
  }

  public getFirstBarDef():ILinePoint[] {
    var defs:ILinePoint[] = SvgStaffDef.getBarLineDef(this.settings.lineSpace,
      this._width.firstBarWidth,
      this.settings.staffType);
    defs.push({
      x1: 0,
      x2: 0,
      y1: 0,
      y2: this.settings.lineSpace * 4
    });
    defs.push({
      x1: this._width.firstBarWidth,
      x2: this._width.firstBarWidth,
      y1: 0,
      y2: this.settings.lineSpace * 4
    });
    return defs;
  }

  public getBarDef():ILinePoint[] {
    var defs:ILinePoint[] = SvgStaffDef.getBarLineDef(this.settings.lineSpace,
      this._width.barWidth,
      this.settings.staffType);
    defs.push({
      x1: this._width.barWidth,
      x2: this._width.barWidth,
      y1: 0,
      y2: this.settings.lineSpace * 4
    });
    return defs;
  }

  get clef():Clef {
    return this.settings.clef;
  }

  get gClef():Clef {
    return this.settings.gClef;
  }

  get fClef():Clef {
    return this.settings.fClef;
  }

  private static getBarLineDef(lineSpace:number, width:number, staffType:StaffType):ILinePoint[] {
    switch(staffType) {
      // TODO
      case StaffType.Line:
      case StaffType.Staff:
      case StaffType.GrandStaff:
        return this.getLineDefStaff(lineSpace, width);
    }
  }

  private static getLineDefStaff(lineSpace:number, width:number):ILinePoint[] {
    var lineDef:ILinePoint[] = [];
    for(var i = 0; i < 5; i++) {
      lineDef.push({
        x1: 0,
        x2: width,
        y1: lineSpace * i,
        y2: lineSpace * i
      });
    }
    return lineDef;
  }

}

export = SvgStaffDef

