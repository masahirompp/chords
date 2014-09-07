/// <reference path="../../typings/tsd.d.ts" />

import Point = require('./interface.point')
import StaffHeight = require('model.staffHeight')
import StaffWidth = require('model.staffWidth')

class StaffManager {

  private _height:StaffHeight;
  private _width:StaffWidth;

  private _barIndex:number = 0;
  private _lineIndex:number = 0;

  constructor(height:StaffHeight, width:StaffWidth) {
    this._height = height;
    this._width = width;
  }

  public isFirstBar():boolean {
    return this._barIndex === 1;
  }

  public  next() {
    if(this._barIndex % this._width.barCount === 0) {
      this._barIndex = 1;
      this._lineIndex++;
    } else {
      this._barIndex++;
    }
  }

  public nextLine() {
    if(this._barIndex !== 1) {
      this._barIndex = 1;
      this._lineIndex++;
    }
  }

  public getStaffPoint():Point {
    return {
      x: this.getStaffPointX(),
      y: this.getStaffPointY()
    };
  }

  public getChordPoint():Point[] {
    var xs:number[] = this.getChordPointXs();
    var y:number = this.getChordPointY();
    return _.map<number,Point>(xs, x => {
      return {
        x: x,
        y: y
      }
    });
  }

  private getStaffPointX():number {
    if(this.isFirstBar()) {
      return 0;
    }
    return this._width.firstBarWidth + (this._width.barWidth * (this._barIndex - 2));
  }

  private getStaffPointY():number {
    return this._height.offsetTop + (this._height.staffLineHeight * this._lineIndex);
  }

  private getChordPointXs():number[] {
    var base:number = this.getStaffPointX();
    if(this.isFirstBar()) {
      base = base + this._width.clefWidth;
    }
    var points:number[] = [];
    for(var i:number = 0; i < this._width.musicalTime; i++) {
      points.push(base + this._width.chordWidth * i);
    }
    return points;
  }

  private getChordPointY() {
    return this.getStaffPointY() - this._height.underlineSpace;
  }
}

export = StaffManager
