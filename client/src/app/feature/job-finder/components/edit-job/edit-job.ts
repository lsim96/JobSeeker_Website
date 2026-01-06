import { Job } from '../../models/jobs.model';
import { JobSeekerService } from './../../../../core/services/job-seeker-service';
import { Component, inject } from '@angular/core';
import { JobForm } from '../job-form/job-form';

@Component({
  selector: 'app-edit-job',
  imports: [JobForm],
  templateUrl: './edit-job.html',
  styleUrl: './edit-job.scss',
})
export class EditJob {
  private jobSeekerService = inject(JobSeekerService);

  selectedJob = this.jobSeekerService.selectedJob;

  onEditJob(value: Job, id: number) {
    console.log(id);
    const updatedJob: Job = {
      id,
      ...value,
    };

    this.jobSeekerService.updateJob(updatedJob);
  }
}
