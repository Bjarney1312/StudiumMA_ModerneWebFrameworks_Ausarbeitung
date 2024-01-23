import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';


const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'My Cooking Recipes'
    },
    {
        path: 'details/:id',
        component: RecipeDetailsComponent,
        title: 'My Cooking Recipes'
    }
];

export default routeConfig;
