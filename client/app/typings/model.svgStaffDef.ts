/// <reference path="../../typings/tsd.d.ts" />

import StaffType = require('./model.staffType')
import ILinePoint = require('./interface.linePoint')

class SvgStaffDef {
  private lineSpace:number;
  private firstBarWidth:number;
  private barWidth:number;
  private staffType:StaffType;

  constructor(lineSpace:number, firstBarWidth:number, barWidth:number, staffType:StaffType) {
    this.lineSpace = lineSpace;
    this.firstBarWidth = firstBarWidth;
    this.barWidth = barWidth;
    this.staffType = staffType;
  }

  public getFirstBarDef():ILinePoint[] {
    var defs:ILinePoint[] = this.getBarLineDef(this.lineSpace, this.firstBarWidth, this.staffType);
    defs.push({
                x1 : 0,
                x2 : 0,
                y1 : 0,
                y2 : this.lineSpace * 4
              });
    defs.push({
                x1 : this.firstBarWidth,
                x2 : this.firstBarWidth,
                y1 : 0,
                y2 : this.lineSpace * 4
              });
    return defs;
  }

  public getBarDef():ILinePoint[] {
    var defs:ILinePoint[] = this.getBarLineDef(this.lineSpace, this.barWidth, this.staffType);
    defs.push({
                x1 : this.barWidth,
                x2 : this.barWidth,
                y1 : 0,
                y2 : this.lineSpace * 4
              });
    return defs;
  }

  private getBarLineDef(lineSpace:number, width:number, staffType:StaffType):ILinePoint[] {
    switch(staffType) {
      // TODO
      case StaffType.Line:
      case StaffType.Staff:
      case StaffType.GrandStaff:
        return this.getLineDefStaff(lineSpace, width);
    }
  }

  private getLineDefStaff(lineSpace:number, width:number):ILinePoint[] {
    var lineDef:ILinePoint[] = [];
    for(var i = 0; i < 5; i++) {
      lineDef.push({
                     x1 : 0,
                     x2 : width,
                     y1 : lineSpace * i,
                     y2 : lineSpace * i
                   });
    }
    return lineDef;
  }

}

export = SvgStaffDef

