import BaseDTO = require('../dto/BaseDTO')

class DtoUtil<T> {

  private _success:boolean = false;
  private _messages:string[] = [];
  private _data:T;

  constructor(success:boolean, messages?:string[], data?:T) {
    this._success = success;
    if(!!messages) {
      this._messages = messages;
    }
    if(!!data) {
      this._data = data;
    }
  }

  public addMessage(message:string):DtoUtil<T> {
    this._messages.push(message);
    return this;
  }

  public setData(data:T):DtoUtil<T> {
    this._data = data;
    return this;
  }

  public json():BaseDTO<T> {
    return <BaseDTO<T>> {
      success: this._success,
      messages: this._messages,
      data: this._data
    }
  }

}

export = DtoUtil
