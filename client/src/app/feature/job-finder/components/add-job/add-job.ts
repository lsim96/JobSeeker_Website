import { Job } from '../../models/jobs.model';
import { JobSeekerService } from './../../../../core/services/job-seeker-service';
import { Component, inject } from '@angular/core';
import { JobForm } from "../job-form/job-form";

@Component({
  selector: 'app-add-job',
  imports: [JobForm],
  templateUrl: './add-job.html',
  styleUrl: './add-job.scss',
})
export class AddJob {
  private jobSeekerService = inject(JobSeekerService);

  onJobAdd(value: Job) {
    const newJob: Job = {
      id: Date.now(),
      ...value,
    };

    this.jobSeekerService.addJob(newJob);
  }
}
