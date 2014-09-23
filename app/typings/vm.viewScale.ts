import StaffSettings = require('model.staffSettings')

class ViewScale {

  private _width:number;
  private _height:number;
  private _ratio:number;
  private _viewWidth:number;
  private _viewHeight:number

  constructor(settings:StaffSettings) {
    this._width = settings.WIDTH;
    this._height = settings.HEIGHT;
    this._ratio = 1;
    this._viewWidth = settings.WIDTH;
    this._viewHeight = settings.HEIGHT;
    this.resize();
  }

  public resize():ViewScale {
    this.load();
    this.applyView();
    return this;
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

  get ratio():number {
    return this._ratio;
  }
}

export = ViewScale

