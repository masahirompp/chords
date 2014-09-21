interface BaseDTO<T> {
  success : boolean;
  messages : string[];
  data : T;
}

export = BaseDTO
