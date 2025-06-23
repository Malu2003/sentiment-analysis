import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';

export const routes: Routes = [
    {path:"",component: HomeComponent},
    {path:"sentiment",component: SentimentComponent},
    {path:"sentiment-results",component: SentimentComponent},
    {path:"**",redirectTo: ""},
];
