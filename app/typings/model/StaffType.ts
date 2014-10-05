import StaffTypeEnum = require('./StaffTypeEnum')

class StaffType {

  private sType:StaffTypeEnum;

  // private
  constructor(sType:StaffTypeEnum) {
    this.sType = sType;
  }

  get id():string {
    if(this.sType === StaffTypeEnum.Line) {
      return 'Line';
    }
    if(this.sType === StaffTypeEnum.GrandStaff) {
      return 'GrandStaff';
    }
    return 'Staff';
  }

  get enum():StaffTypeEnum {
    return this.sType;
  }

  public static Staff = new StaffType(StaffTypeEnum.Staff);
  public static GrandStaff = new StaffType(StaffTypeEnum.GrandStaff);
  public static Line = new StaffType(StaffTypeEnum.Line);

  public static factory(id:String):StaffType {
    if(id === 'Line') {
      return this.Line;
    }
    if(id === 'GrandStaff') {
      return this.GrandStaff;
    }
    return this.Staff;
  }

}

export = StaffType

