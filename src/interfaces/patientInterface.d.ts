export interface IPatient {
  patientId: string;
  name: string;
  phoneNumber: Number;
  currentLocation: {
    name: string;
    location:[Number, Number]
  };
  savedAddress?: {
    address: string;
    landmark: string;
    pincode: string;
    city: string;
    state: string;
  };
  gender: 'male' | 'female' | 'other';
  age: Number;
  profilePic: string;
  medical_Culture: string;
  medicalIssues: string;
  prevMedicalHistory: string;
  ongoingMedication: string;
  personalDetails: { adharNumber: String } | { passportNumber: String } | { panCard: String };
  // How to Link wit Diff Schema
  appointment?: Iappointment[{}]; 
  date: Date;
}

export interface Iclinic {
  clinicId: string;
  doctors: Idoctor[];
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
}

export interface Idoctor {
  doctorId: string;
  docName: string;
  schedule:{};
  specialization: string;
  experience: Number;
  fee: Number;
  profilePic: string;
  docLicense: string;
  Verification:{ adharNumber: String } | { passportNumber: String } | { panCard: String };
}

export interface Iappointment {
  appointmentId: string;
  patientID: IPatient;
  doctorID: Idoctor;
  clinicID: Iclinic;
  medicalDetails: String;
  ongoingMedication: String;
  prevMedicalHistory: String;
  diagnosedDisease: String;
  curentState: 'confirmed' | 'paid' | 'done'
}