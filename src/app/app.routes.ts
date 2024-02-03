import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RecipeDetailsComponent} from './components/recipe-details/recipe-details.component';
import {AddRecipeComponent} from "./components/add-recipe/add-recipe.component";
import {FavoritesComponent} from "./components/favorites/favorites.component";
import {UpdateRecipeComponent} from "./components/update-recipe/update-recipe.component";

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
        title: 'Rezept hinzufügen'
    },
    {
        path: 'favorites/:id',
        component: FavoritesComponent,
        title: 'Meine Favoriten'
    },
    {
        path: 'update_recipe/:id',
        component: UpdateRecipeComponent,
        title: 'Rezept bearbeiten'
    }
];
