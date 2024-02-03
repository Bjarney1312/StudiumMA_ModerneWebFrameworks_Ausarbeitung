import {Component, inject, OnInit} from '@angular/core';
import {RecipesComponent} from '../recipes/recipes.component';
import {RecipeService} from "../../services/recipe.service";
import {NgForOf} from "@angular/common";
import {Recipe} from "../../data/recipe";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RecipesComponent, NgForOf, MatIconModule, MatButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

    recipeList: Recipe[] = []
    filteredRecipeList: Recipe[] = []

    constructor(private recipeService: RecipeService) {}

    /*---------------------------------------------------------------------------------------------------
                                           Funktionen
    -----------------------------------------------------------------------------------------------------*/
    ngOnInit(): void {
        this.getRecipes()
    }

    /**
     * Lädt die vorhandenen Rezepte aus der Datenbank.
     */
    private getRecipes(): void {
        this.recipeService.getRecipes()
            .subscribe(recipes => {
                this.recipeList = recipes;
                this.filteredRecipeList = recipes;
            });
    }

    /**
     * Filtert die Rezepte bei einer Suchanfrage des Benutzers.
     * @param text Rezeptname, nach dem gesucht wird.
     */
    protected filterResults(text: string): void {
        if (!text) {
            this.filteredRecipeList = this.recipeList;
            return;
        }
        this.filteredRecipeList = this.recipeList.filter(
            recipe => recipe?.name.toLowerCase().includes(text.toLowerCase())
        );
    }
}
