import { JobList } from './feature/job-finder/components/job-list/job-list';
import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { NotFound } from './core/components/not-found/not-found';
import { Profile } from './feature/profile/profile';
import { Company } from './feature/company/company';
import { AddJob } from './feature/job-finder/components/add-job/add-job';
import { EditJob } from './feature/job-finder/components/edit-job/edit-job';
import { ContactUs } from './feature/contact-us/contact-us';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'jobs',
    loadComponent: () =>
      import('./feature/job-finder/components/job-list/job-list').then(
        (c) => c.JobList
      ),
  },
  {
    path: 'add-job',
    component: AddJob,
  },
  {
    path: 'edit-job',
    component: EditJob,
  },
  {
    path: 'contact-us',
    component: ContactUs,
  },
  {
    path: 'profile',
    component: Profile,
  },
  {
    path: 'company/:id',
    component: Company,
  },
  {
    path: '**',
    component: NotFound,
  },
];
