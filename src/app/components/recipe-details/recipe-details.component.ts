import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../data/recipe';
import {MatChipsModule} from '@angular/material/chips';
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {MatTableModule} from '@angular/material/table';
import {Ingredient} from "../../data/ingredient";
import {MatButtonModule} from '@angular/material/button';
import {UserService} from "../../services/user.service";
import {Favorites} from "../../data/favorites";
import {MatDialog} from "@angular/material/dialog";
import {Location} from '@angular/common';
import {DialogueDeleteRecipeComponent} from "../dialogue-delete-recipe/dialogue-delete-recipe.component";

@Component({
    selector: 'app-recipe-details',
    standalone: true,
    imports: [
        MatChipsModule,
        MatIcon,
        NgForOf,
        MatTableModule,
        MatButtonModule,
        RouterLink
    ],
    templateUrl: './recipe-details.component.html',
    styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {

    recipe: Recipe | undefined;
    persons: number | undefined = 0;
    ingredients: Ingredient[] | undefined = [];
    userFavorites: Favorites = {} as Favorites;

    dataSource: Ingredient[] = [];
    displayedColumns: string[] = ['Zutat', 'Menge'];
    favorite_text: string = 'Zu Favoriten hinzufügen';

    constructor(private dialog: MatDialog, private location: Location, private route: ActivatedRoute,
                private recipeService: RecipeService, private userService: UserService) {}

    /*---------------------------------------------------------------------------------------------------
                                                     Funktionen
      -----------------------------------------------------------------------------------------------------*/

    ngOnInit() {
        this.loadRecipe();
        this.loadFavorites('1');
    }

    /**
     * Lädt das von Nutzer ausgewählte Rezept anhand der ID aus der Rezeptdatenbank.
     */
    private loadRecipe(): void {
        const id = String(this.route.snapshot.paramMap.get('id'));
        this.recipeService.getRecipe(id)
            .subscribe(recipe => {
                this.recipe = recipe;
                this.ingredients = recipe.ingredients;
                this.dataSource = recipe.ingredients;
                this.persons = recipe.persons;
            });
    }

    /**
     * Lädt die Favoriten des Benutzers.
     * @param userid ID des Benutzers
     */
    private loadFavorites(userid: string): void {
        this.userService.getFavorite(userid).subscribe(favorites => {
            this.userFavorites = favorites;
            if (this.userFavorites.favorite_recipe_ids.filter((id) => this.recipe?.id === id).length === 0) {
                this.favorite_text = 'Zu Favoriten hinzufügen';
            } else {
                this.favorite_text = 'Aus Favoriten entfernen';
            }
            this.userService.updateFavorites(this.userFavorites).subscribe();
            this.updateFavoritesStorage();
        });
    }

    /**
     * Fügt der Anzahl der Personen für das Rezept eine Person hinzu und berechnet die Mengen der Zutaten neu.
     */
    protected addPerson(): void {
        if (this.persons !== undefined && this.recipe !== undefined) {

            this.persons += 1;

            let regularNumberOfPersons = this.recipe.persons;
            let newNumberOfPersons = this.persons;

            this.ingredients = this.recipe.ingredients.map(ingredient => {
                return {
                    ingredient: ingredient.ingredient,
                    amount: (ingredient.amount / regularNumberOfPersons) * newNumberOfPersons,
                    unit: ingredient.unit
                };
            });
            this.dataSource = this.ingredients;
        }
    }

    /**
     * Entfernt eine Person von der Anzahl der Personen für das Rezept und berechnet die Mengen der Zutaten neu.
     */
    protected removePerson(): void {
        if (this.persons !== undefined && this.recipe !== undefined && this.persons > 0) {
            this.persons -= 1;

            let regularNumberOfPersons = this.recipe.persons;
            let newNumberOfPersons = this.persons;

            this.ingredients = this.recipe.ingredients.map(ingredient => {
                return {
                    ingredient: ingredient.ingredient,
                    amount: (ingredient.amount / regularNumberOfPersons) * newNumberOfPersons,
                    unit: ingredient.unit
                };
            });
            this.dataSource = this.ingredients;
        }
    }

    /**
     * Fügt das Rezept zur Favoritenliste des Benutzers hinzu oder entfernt es, wenn es sich bereits in der
     * Favoritenliste befindet. Aktualisiert den LocalStorage entsprechend.
     */
    protected addToFavorites(): void {

        if (this.userFavorites !== undefined) {

            if (this.userFavorites.favorite_recipe_ids.filter((id) => this.recipe?.id === id).length === 0) {
                this.userFavorites.favorite_recipe_ids.push(<string>this.recipe?.id);
                this.favorite_text = 'Aus Favoriten entfernen';
            } else {
                this.userFavorites.favorite_recipe_ids = this.userFavorites.favorite_recipe_ids.filter((id) => this.recipe?.id !== id);
                this.favorite_text = 'Zu Favoriten hinzufügen';
            }
        }
        this.userService.updateFavorites(this.userFavorites).subscribe();
        this.updateFavoritesStorage();
    }


    /**
     * Löscht das Rezept und führt den Nutzer zur Startseite der Anwendung.
     * @protected
     */
    protected deleteRecipe(): void {
        const id = String(this.route.snapshot.paramMap.get('id'));

        const dialogRef = this.dialog.open(DialogueDeleteRecipeComponent, {
            width: '300px',
            data: {}, disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.recipeService.deleteRecipe(id).subscribe();
                this.updateRecipeStorage();
                this.location.back()
            }
        });
    }

    /**
     * Aktualisiert den LocalStorage für die Rezepte.
     * @private
     */
    private updateRecipeStorage(): void {
        this.recipeService.getRecipes().subscribe(recipes => {
            localStorage.setItem('recipes', JSON.stringify(recipes))
        });
    }

    /**
     * Aktualisiert den LocalStorage für die Favoriten.
     * @private
     */
    private updateFavoritesStorage(): void {
        this.userService.getFavorites().subscribe(favorites => {
            localStorage.setItem('favorites', JSON.stringify(favorites))
        });
    }

}
