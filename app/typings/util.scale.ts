/// <reference path="../../typings/tsd.d.client.ts" />

class Scale {

  private _original:number;
  private _target:number;

  constructor(original:number, target:number) {
    this._original = original;
    this._target = target;
  }

  public getD3Scale():D3.Scale.LinearScale {
    return d3.scale.linear()
      .domain([0,
               this._original])
      .range([0,
              this._target]);
  }

}

export = Scale

