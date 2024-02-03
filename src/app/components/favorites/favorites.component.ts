import {Component, inject, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {RecipesComponent} from "../recipes/recipes.component";
import {Recipe} from "../../data/recipe";
import {RecipeService} from "../../services/recipe.service";
import {UserService} from "../../services/user.service";
import {Favorites} from "../../data/favorites";

@Component({
    selector: 'app-favorites',
    standalone: true,
    imports: [
        MatIconModule,
        MatMiniFabButton,
        NgForOf,
        RecipesComponent,
        MatButton
    ],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
    recipeList: Recipe[] = []
    favorites: Favorites = {} as Favorites;
    favoriteList: Recipe[] = []
    recipeService: RecipeService = inject(RecipeService);
    userService: UserService = inject(UserService)
    filteredFavoritesList: Recipe[] = []

    ngOnInit(): void {
        this.getRecipes();
        this.getFavorites("1");
    }

    /*---------------------------------------------------------------------------------------------------
                                             Funktionen
    -----------------------------------------------------------------------------------------------------*/

    getRecipes(): void {
        this.recipeService.getRecipes()
            .subscribe(recipes => {
                this.recipeList = recipes;
            });
    }

    filterResults(text: string) {
        if (!text) {
            this.filteredFavoritesList = this.favoriteList;
            return;
        }

        this.filteredFavoritesList = this.favoriteList.filter(
            recipe => recipe?.name.toLowerCase().includes(text.toLowerCase())
        );
    }

    getFavorites(userid: string){
        this.userService.getFavorite(userid).subscribe(favorites => {
            this.favorites = favorites;
            console.log(this.favorites.favorite_recipe_ids)

            this.favoriteList = this.recipeList.filter(
                x => this.favorites.favorite_recipe_ids
                    .map(y => y).includes(x.id));

            this.filteredFavoritesList = this.favoriteList;
        })
    }
}
