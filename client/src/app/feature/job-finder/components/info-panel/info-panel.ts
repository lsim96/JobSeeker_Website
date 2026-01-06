import { JobSeekerService } from './../../../../core/services/job-seeker-service';
import { Component, computed, inject } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { AppliedJobsPipe } from '../../../../core/pipes/applied-jobs-pipe';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-info-panel',
  imports: [Button, AppliedJobsPipe, CurrencyPipe],
  templateUrl: './info-panel.html',
  styleUrl: './info-panel.scss',
})
export class InfoPanel {
  jobSeekerService = inject(JobSeekerService);

  jobs = this.jobSeekerService.jobs;

  numberOfTotalJobs = this.jobSeekerService.totalJobs;
  numberOfAppliedJobs = this.jobSeekerService.appliedToJobs;

  cancelApplication(jobId: number) {
    this.jobSeekerService.cancelJobApplication(jobId);
  }
}
