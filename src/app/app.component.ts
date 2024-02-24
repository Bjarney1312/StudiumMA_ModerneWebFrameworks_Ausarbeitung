import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatButtonModule} from '@angular/material/button';
import {Recipe} from "./data/recipe";
import {RecipeService} from "./services/recipe.service";
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

@Component({
    imports: [RouterOutlet,
        HomeComponent,
        RouterModule,
        MatIcon,
        MatToolbar,
        MatIconButton,
        MatButtonModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule],
    selector: 'app-root',
    standalone: true,
    styleUrl: './app.component.css',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'My Cooking Recipes';

    recipes: Recipe[] = [];
    recipe!: Recipe;

    constructor(private recipeService: RecipeService) {
    }

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
                this.recipes = recipes;
            });
    }
}
