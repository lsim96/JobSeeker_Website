import { WorkType } from './../../models/jobs.enum';
import { Job } from './../../models/jobs.model';
import { Component, effect, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-job-form',
  imports: [ReactiveFormsModule],
  templateUrl: './job-form.html',
  styleUrl: './job-form.scss',
})
export class JobForm {
  editJob = input<Job>();
  submitJob = output<Job>();

  jobForm = this.generateForm();
  workType = Object.values(WorkType);

  constructor() {
    effect(() => {
      if (this.editJob()) this.populateForm(this.editJob());
    });
  }

  generateForm() {
    return new FormGroup({
      companyName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      companyLogo: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      position: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      expires: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      startingSalary: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      workType: new FormControl(WorkType.REMOTE, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      location: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      country: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      qualifications: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(150)],
      }),
      description: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(150)],
      }),
      isApplied: new FormControl(false, {
        validators: [Validators.required],
      }),
      companyAddress: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      companyIndustry: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      companyWebsite: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  populateForm(job: Job) {
    this.jobForm.setValue({
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      position: job.position,
      expires: job.expires,
      startingSalary: job.startingSalary,
      workType: job.workType,
      location: job.location,
      country: job.country,
      qualifications: job.qualifications,
      description: job.description,
      isApplied: job.isApplied,
      companyAddress: job.companyAddress,
      companyIndustry: job.companyIndustry,
      companyWebsite: job.companyWebsite,
    });
  }

  onSubmit() {
    if (this.jobForm.invalid) return;

    this.submitJob.emit(this.jobForm.value as Job);
  }
}
