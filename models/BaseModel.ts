class BaseModel {
  _id: string;

  get isValid(): boolean {
    return !!this._id
  }
}

export = BaseModel