import { Component, inject } from '@angular/core';
import { JobCard } from '../job-card/job-card';
import { JobSeekerService } from '../../../../core/services/job-seeker-service';
import { Button } from '../../../../shared/components/button/button';
import { Router } from '@angular/router';
import { InfoPanel } from "../info-panel/info-panel";

@Component({
  selector: 'app-job-list',
  imports: [JobCard, Button, InfoPanel],
  templateUrl: './job-list.html',
  styleUrl: './job-list.scss',
})
export class JobList {
  jobSeekerService = inject(JobSeekerService);

  jobs = this.jobSeekerService.jobs;

  ngOnInit(): void {
    this.jobSeekerService.loadJobs();
  }

  onSortClick() {
    this.jobSeekerService.sortBySalary('salary');
  }

  onWorkTypeClick(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.jobSeekerService.sortByWorkType(target.value);
  }
}
