import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RecipeDetailsComponent} from './components/recipe-details/recipe-details.component';
import {AddRecipeComponent} from "./components/add-recipe/add-recipe.component";
import {FavoritesComponent} from "./components/favorites/favorites.component";


export const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'My Cooking Recipes'
    },
    {
        path: 'details/:id',
        component: RecipeDetailsComponent,
        title: 'My Cooking Recipes'
    },
    {
        path: 'new_recipe',
        component: AddRecipeComponent,
        title: 'My Cooking Recipes'
    },
    {
        path: 'favorites/:id',
        component: FavoritesComponent,
        title: 'My Favorites'
    }
];
