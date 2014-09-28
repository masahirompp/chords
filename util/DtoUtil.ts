import BaseDTO = require('../dto/BaseDTO')

class DtoUtil {

  static makeSuccess(data:any):BaseDTO<any> {
    return <BaseDTO<any>> {
      success: true,
      messages: [],
      data: data
    }
  }

  static makeFail(data?:any, ...messages:string[]):BaseDTO<any> {
    return <BaseDTO<any>> {
      success: false,
      messages: messages,
      data: data
    }
  }

}

export = DtoUtil
