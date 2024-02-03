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
    filteredFavoritesList: Recipe[] = []

    constructor(private recipeService: RecipeService, private userService: UserService ) {}

    /*---------------------------------------------------------------------------------------------------
                                                    Funktionen
     -----------------------------------------------------------------------------------------------------*/
    ngOnInit(): void {
        this.getRecipes();
        this.getFavorites("1");
    }

    /**
     * Lädt die vorhandenen Rezepte aus der Datenbank.
     */
    private getRecipes(): void {
        this.recipeService.getRecipes()
            .subscribe(recipes => {
                this.recipeList = recipes;
            });
    }

    /**
     * Lädt die Favoriten des Benutzers.
     * @param userid ID des Benutzers
     */
    private getFavorites(userid: string): void {
        this.userService.getFavorite(userid).subscribe(favorites => {
            this.favorites = favorites;

            this.favoriteList = this.recipeList.filter(recipe => this.favorites.favorite_recipe_ids
                .map(recipe_id => recipe_id).includes(recipe.id));

            this.filteredFavoritesList = this.favoriteList;
        })
    }

    /**
     * Filtert die Rezepte bei einer Suchanfrage des Benutzers.
     * @param text Rezeptname, nach dem gesucht wird.
     */
    protected filterResults(text: string): void {
        if (!text) {
            this.filteredFavoritesList = this.favoriteList;
            return;
        }
        this.filteredFavoritesList = this.favoriteList.filter(
            recipe => recipe?.name.toLowerCase().includes(text.toLowerCase())
        );
    }
}
