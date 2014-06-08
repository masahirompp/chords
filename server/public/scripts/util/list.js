define([], function() {
  'use strict';

  function List() {
    this._list = [];
  }

  List.prototype.add = function(obj) {
    return this._list.push(obj);
  };

  List.prototype.empty = function() {
    this._list = [];
  };

  List.prototype.count = function() {
    return this._list.length;
  };

  List.prototype.get = function(index) {
    if (index > -1 && index < this._list.length) {
      return this._list[index];
    }
  };

  List.prototype.insert = function(obj, index) {
    var pointer = -1;

    if (index === 0) {
      this._list.unshift(obj);
      pointer = index;
    } else if (index === this._list.length) {
      this._list.push(obj);
      pointer = index;
    }

    return pointer;
  };

  List.prototype.indexOf = function(obj, startIndex) {
    var i = startIndex,
      pointer = -1;
    while (i < this._list.length) {
      if (this._list[i] === obj) {
        pointer = i;
      }
      i++;
    }
    return pointer;
  };

  List.prototype.removeIndexAt = function(index) {
    if (index === 0) {
      this._list.shift();
    } else if (index === this._list.length - 1) {
      this._list.pop();
    }
  };

  return List;

});
