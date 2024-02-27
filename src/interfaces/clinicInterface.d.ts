export interface Iclinic {
  Id: string;
  // doctors: IDoctor[];
  location:{
    gmapLocation:[Number, Number];
    state:String;
    city?:String;
    pinCode:String;
    address?:String;
    landMark?:String;
  };
  phone:Number;
  clinicOwner:String;
  ownerVerification:{ adharNumber: String } | { passportNumber: String } | { panCard: String };
  clinicFee: Number;
  clinicRating: Number;
  prevServices: Iappointment[];
  role: 'clinic' | 'doctor' | 'patient';
}