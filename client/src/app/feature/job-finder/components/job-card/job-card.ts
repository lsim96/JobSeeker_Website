import { CommonModule, CurrencyPipe } from '@angular/common';
import { JobSeekerService } from '../../../../core/services/job-seeker-service';

import { Job } from './../../models/jobs.model';
import { Component, inject, input } from '@angular/core';
import { ToggleDetails } from '../../../../core/directives/toggle-details';
import { Button } from '../../../../shared/components/button/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-card',
  imports: [CurrencyPipe, ToggleDetails, CommonModule, Button],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {
  job = input.required<Job>();

  jobSeekerService = inject(JobSeekerService);
  router = inject(Router);

  jobs = this.jobSeekerService.jobs;

  onJobApply() {
    this.jobSeekerService.applyForJob(this.job().id);
  }

  onEditClick() {
    this.jobSeekerService.jobDetails(this.job().id);
    this.router.navigate(['/edit-job']);
  }

  onLogoClick() {
    this.jobSeekerService.companyDetails(this.job().id);

    this.router.navigate(['company', this.job().id]);
  }
}
