import { Component, inject } from '@angular/core';
import { JobSeekerService } from '../../core/services/job-seeker-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company',
  imports: [],
  templateUrl: './company.html',
  styleUrl: './company.scss',
})
export class Company {
  jobSeekerService = inject(JobSeekerService);

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const jobId = this.route.snapshot.params['id'];

    this.jobSeekerService.getCompanyById(parseInt(jobId));
  }
  selectedCompany = this.jobSeekerService.selectedCompany;
}
