export interface IDoctor {
  Id?: string;
  name: string;
  specialization: string;
  licenseNumber: string;
  education: string;
  phoneNumber: string;
  emailId: string;
  clinicAffiliation?: { clinicId: string }
  experience: number;
  fee: number;
  profilePic?: string;
  verification?: {
    isVerified: boolean;
    adharNumber?: String;
  };
}