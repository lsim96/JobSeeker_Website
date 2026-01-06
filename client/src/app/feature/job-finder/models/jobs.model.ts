import { WorkType } from './jobs.enum';

export interface Job {
  id: number;
  companyName: string;
  companyLogo: string;
  position: string;
  expires: string;
  startingSalary: number;
  workType: WorkType;
  // Show the below in the details expanding element
  location: string;
  country: string;
  qualifications: string;
  description: string;
  isApplied: boolean;
  //Shown in the company details page + companyName and companyLogo
  companyAddress: string;
  companyIndustry: string;
  companyWebsite: string;
}
