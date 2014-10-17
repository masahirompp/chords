var hasOwnProperty = {}.hasOwnProperty;

class Dictionary<T> {

  constructor(dict?:Dictionary<T>) {
    if(!dict) return;
    var keys = dict.keys;
    for(var i = 0; i < keys.length; i++) {
      this[keys[i]] = dict.get(keys[i]);
    }
  }

  add(key:string, value:T):Dictionary<T> {
    if(!this.has(key)) {
      this[key] = value;
    }
    return this;
  }

  store(key:string, value:T):Dictionary<T> {
    this[key] = value;
    return this;
  }

  update(key:string, value:T):Dictionary<T> {
    if(this.has(key)) {
      this[key] = value;
    }
    return this;
  }

  has(key:string):boolean {
    return hasOwnProperty.call(this, key);
  }

  get(key:string):T {
    if(this.has(key)) {
      return this[key];
    }
    return null;
  }

  remove(key:string):Dictionary<T> {
    if(this.has(key)) {
      delete this[key];
    }
    return this;
  }

  get keys():string[] {
    var keys:string[] = [];
    var property;
    for(property in this) {
      if(hasOwnProperty.call(this, property)) {
        keys.push(property);
      }
    }
    return keys;
  }

  get values():T[] {
    var values:T[] = [];
    var property;
    for(property in this) {
      if(hasOwnProperty.call(this, property)) {
        values.push(this[property]);
      }
    }
    return values;
  }

  get count():number {
    return this.keys.length;
  }

}

export = Dictionary;
