import StaffTypeEnum = require('./StaffTypeEnum')

class StaffType {

  private sType:StaffTypeEnum;

  // private
  constructor(sType:StaffTypeEnum) {
    this.sType = sType;
  }

  public static Staff = new StaffType(StaffTypeEnum.Staff);
  public static GrandStaff = new StaffType(StaffTypeEnum.GrandStaff);
  public static Line = new StaffType(StaffTypeEnum.Line);

}

export = StaffType

