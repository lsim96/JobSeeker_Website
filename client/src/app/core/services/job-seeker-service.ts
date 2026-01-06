import { computed, inject, Injectable, signal } from '@angular/core';
import { Job } from '../../feature/job-finder/models/jobs.model';
import { jobsMock } from '../../feature/job-finder/job-finder.mock';
import { Company } from '../../feature/job-finder/models/company.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JobSeekerService {
  jobs = signal<Job[]>([]);
  allJobsMock = signal<Job[]>([...jobsMock]);
  workTypeJobs = signal<Job[]>(jobsMock);

  private router = inject(Router);

  selectedCompany = signal<Company>(null);
  selectedJob = signal<Job>(null);

  sortDirection: 'asc' | 'desc' = 'desc';

  loadJobs() {
    this.jobs.set(jobsMock);
  }

  applyForJob(jobId: number) {
    this.jobs.update((prev) => {
      return prev.map((job) => {
        if (job.id !== jobId) {
          return job;
        }
        return { ...job, isApplied: true };
      });
    });
  }

  cancelJobApplication(jobId: number) {
    this.jobs.update((prev) => {
      return prev.map((job) => {
        if (job.id !== jobId) {
          return job;
        }
        return { ...job, isApplied: false };
      });
    });
  }

  sortBySalary(type: 'salary') {
    const fitleredJobs = [...this.jobs()];

    fitleredJobs.sort((a, b) => {
      if (type === 'salary') {
        return this.sortDirection === 'asc'
          ? a.startingSalary - b.startingSalary
          : b.startingSalary - a.startingSalary;
      }

      return 0;
    });

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.jobs.set(fitleredJobs);
  }

  sortByWorkType(workType?: string) {
    const filteredJobs =
      !workType || workType === 'Select'
        ? this.workTypeJobs()
        : this.workTypeJobs().filter((job) => job.workType === workType);

    this.jobs.set(filteredJobs);
  }

  jobDetails(id: number): Job {
    const job = this.jobs().find((job) => job.id === id);
    if (!job) return undefined;

    this.selectedJob.set(job);
    console.log(job);
    return job;
  }

  companyDetails(id: number): Company | undefined {
    const job = this.jobs().find((job) => job.id === id);

    if (!job) return undefined;

    const company = {
      id: job.id,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      companyAddress: job.companyAddress,
      companyIndustry: job.companyIndustry,
      companyWebsite: job.companyWebsite,
    };

    this.selectedCompany.set(company);

    return company;
  }

  getCompanyById(id: number) {
    if (this.selectedCompany()) return;

    this.companyDetails(id);
  }

  addJob(job: Job) {
    [this.allJobsMock, this.jobs].forEach((store) =>
      store.update((jobs) => [...jobs, job])
    );
    jobsMock.push(job);
    this.router.navigate(['/jobs']);
  }

  updateJob(updatedJob: Job) {
    const updateFn = (list: Job[]) =>
      list.map((job) =>
        job.id === updatedJob.id ? { ...job, ...updatedJob } : job
      );

    [this.allJobsMock, this.jobs].forEach((store) => store.update(updateFn));

    const index = jobsMock.findIndex((i) => i.id === Number(updatedJob.id));
    if (index !== -1) {
      jobsMock[index] = { ...jobsMock[index], ...updatedJob };
    } else {
      console.log('Not found');
    }

    this.router.navigate(['/jobs']);
  }

  totalJobs = computed(
    () => this.jobs().filter((job) => job.isApplied === false).length
  );

  appliedToJobs = computed(
    () => this.jobs().filter((job) => job.isApplied === true).length
  );
}
