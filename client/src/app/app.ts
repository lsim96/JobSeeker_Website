import { Component } from '@angular/core';
import { Header } from './core/components/header/header';
import { JobList } from './feature/job-finder/components/job-list/job-list';
import { InfoPanel } from './feature/job-finder/components/info-panel/info-panel';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./core/components/footer/footer";
import { ScrollToTop } from "./shared/components/scroll-to-top/scroll-to-top";

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer, ScrollToTop],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
