interface BaseDTO<T> {
  success : boolean;
  message : string;
  data : T;
}

export = BaseDTO
