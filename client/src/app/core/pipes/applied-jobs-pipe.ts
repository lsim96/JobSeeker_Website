import { Pipe, PipeTransform } from '@angular/core';
import { Job } from '../../feature/job-finder/models/jobs.model';

@Pipe({
  name: 'appliedJobsPipe',
})
export class AppliedJobsPipe implements PipeTransform {
  transform(value: Job[], isApplied: boolean): Job[] {
    const appliedToJobs = value.filter((job) => job.isApplied === isApplied);
    return appliedToJobs;
  }
}
