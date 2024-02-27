export interface IPatient {
  Id: string;
  name: string;
  phoneNumber: Number;
  currentLocation: {
    name: string;
    location:[Number, Number]
  };
  savedAddress?: {
    address: string;
    landmark: string;
    city: string;
    pincode: string;
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
  role: 'clinic' | 'doctor' | 'patient';

}





