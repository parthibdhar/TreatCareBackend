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