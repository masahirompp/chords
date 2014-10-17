/// <reference path="../../../tsd/d3/d3.d.ts" />

class Scale {

  private _original:number;
  private _target:number;
  private _scale:D3.Scale.LinearScale;

  constructor(original:number, target:number) {
    this._original = original;
    this._target = target;
    this._scale = d3.scale.linear()
      .domain([0,
               this._original])
      .range([0,
              this._target]);
  }

  public calc(x:number):number {
    return Math.floor(this._scale(x) * 100) / 100; // 小数点第二位まで求める。
  }

  public floor(x:number):number {
    return Math.floor(this._scale(x));
  }
}

export = Scale

