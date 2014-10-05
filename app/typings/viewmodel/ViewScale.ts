import StaffSettings = require('../model/StaffSettings')
import Scale = require('./../util/Scale')

class ViewScale {

  private _width:number;
  private _height:number;
  private _ratio:number;
  private _viewWidth:number;
  private _viewHeight:number;
  private _scale:Scale;

  constructor() {
    this._width = StaffSettings.WIDTH;
    this._height = StaffSettings.HEIGHT;
    this._ratio = 1;
    this._viewWidth = StaffSettings.WIDTH;
    this._viewHeight = StaffSettings.HEIGHT;
    this.resize();
    this._scale = new Scale(StaffSettings.WIDTH, this._viewWidth);
  }

  public resize():ViewScale {
    this.load();
    this.applyView();
    return this;
  }

  public calc(x:number):number {
    return this._scale.calc(x);
  }

  public floor(x:number):number {
    return this._scale.floor(x);
  }

  private load() {
    this._viewWidth = $('#content-score').width();
    this._ratio = this._viewWidth / this._width;
    this._viewHeight = Math.ceil(this._height * this._ratio);
  }

  private applyView() {
    $('#score')
      .attr({
        width: this._viewWidth,
        height: this._viewHeight
      });
  }

  get viewHeight():number {
    return this._viewHeight;
  }

  get viewWidth():number {
    return this._viewWidth;
  }
}

export = ViewScale

