import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResumeFormComponent } from './components/resume-form/resume-form.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
    {path:"",component: HomeComponent},
    {path:"resume_form",component: ResumeFormComponent},
    {path:"results",component: ResultsComponent},
];
