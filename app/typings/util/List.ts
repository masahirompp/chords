class List<T> {
  private _list:T[];

  constructor(list:T[]) {
    this._list = list ? list : [];
  }

  public add(obj:T) {
    this._list.push(obj);
  }

  public clear() {
    this._list = [];
  }

  public size():number {
    return this._list.length;
  }

  public get(index:number):T {
    if(index < 0 || this.size() <= index) {
      return null;
    }
    return this._list[index];
  }

  public insert(obj:T, index:number):boolean {
    if(index < 0 || this.size() < index) {
      return false
    }
    this._list.splice(index, 0, obj);
    return true;
  }

  public indexOf(obj:T, startIndex:number):number {
    var i:number = startIndex;
    while(i < this.size()) {
      if(this._list[i] === obj) {
        return i;
      }
      i++;
    }
    return -1;
  }

  public removeIndexAt(index:number):boolean {
    if(index < 0 || this.size() <= index) {
      return false
    }
    this._list.slice(index, 1);
    return true;
  }

}

export = List

