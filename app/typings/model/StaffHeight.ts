import StaffSettings = require('./../model/StaffSettings')
import StaffType = require('./StaffType')

class StaffHeight {

  private _contentHeight:number;
  private _rowHeight:number;
  private _numberOfRowsPerPage:number;

  constructor(public settings:StaffSettings) {
    this._contentHeight = StaffSettings.HEIGHT - settings.margin.top - settings.margin.bottom;
    this._rowHeight = settings.staffHeight + settings.staffSpace;
    this._numberOfRowsPerPage = Math.floor(this._contentHeight / this._rowHeight);
  }

  public getPageIndex(lineIndex:number):number {
    return Math.floor(lineIndex / this._numberOfRowsPerPage);
  }

  public getOffsetTopStaff(lineIndex:number):number {
    return this.settings.margin.top + this._rowHeight * lineIndex;
  }

  public getOffsetTopChord(lineIndex:number):number {
    return this.getOffsetTopStaff(lineIndex) - this.settings.underlineSpace;
  }

  public getOffsetTopStaffWithinCurrentPage(lineIndex:number):number {
    return this.getOffsetTopStaff(lineIndex % this._numberOfRowsPerPage);
  }

  public getOffsetTopChordWithinCurrentPage(lineIndex:number):number {
    return this.getOffsetTopChord(lineIndex % this._numberOfRowsPerPage);
  }

}

export = StaffHeight
