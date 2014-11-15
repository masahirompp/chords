interface IContact {
  provider:string;
  id:string;
  displayName:string;
  name : {
    familyName:string;
    givenName:string;
    middleName:string;
  };
  emails: any;
  photos: any;
}

export = IContact;
