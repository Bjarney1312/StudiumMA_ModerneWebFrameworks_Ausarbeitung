import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {v4 as uuidv4} from "uuid";
import {Recipe} from "../../data/recipe";
import {RecipeService} from "../../services/recipe.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from '@angular/material/select';
import {Ingredient} from "../../data/ingredient";
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef} from "@angular/material/table";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-recipe',
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatLabel,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatStepperModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTableModule,
        NgForOf
    ],
    templateUrl: './add-recipe.component.html',
    styleUrl: './add-recipe.component.css'
})

export class AddRecipeComponent implements OnInit {
    @ViewChild('ingredientTable') ingredientTable!: MatTable<Ingredient>;
    @ViewChild('stepper') stepper!: MatStepper;

    recipe: Recipe = {} as Recipe;
    recipes: Recipe[] = [];

    displayedColumns: string[] = ['Zutat', 'Menge', 'Entfernen'];
    dataSource_ingredients: Ingredient[] = [];

    button_ingredients_disabled: boolean = true;
    button_steps_disabled: boolean = true;
    isLinear: boolean = true;

    // FormGroups
    recipe_information = this.formBuilder.group({
        name: ['', Validators.required],
        preperation_time: '',
        preperation_time_unit: 'Minuten',
        total_time: '',
        total_time_unit: 'Minuten',
        image_url: '',
        persons: 1,
    });

    ingredients = this.formBuilder.group({
        ingredient: '',
        amount: 0,
        unit: 'g',
    });

    steps = this.formBuilder.group({
        step: '',
    });

    constructor(private formBuilder: FormBuilder, private recipeService: RecipeService, private router: Router) {}

    /*---------------------------------------------------------------------------------------------------
                                                   Funktionen
    -----------------------------------------------------------------------------------------------------*/
    ngOnInit(): void {
        this.recipe.id = uuidv4();
        this.recipe.ingredients = [];
        this.recipe.steps = [];
        this.recipeService.getRecipes()
            .subscribe(recipes => {
                this.recipes = recipes;
            });
    }

    /**
     * Speichert das neue Rezept und führt den Nutzer wieder zur Startseite der Anwendung.
     * Wurde über die obere Leiste des Steppers die Prüfung umgangen, ob sich Zutaten
     * in der Zutatenliste befinden und diese ist leer, wird das Rezept nicht gespeichert
     * und der Nutzer wird einen Schritt zurückgebracht.
     */
    protected onSubmit(): void {
        if (this.recipe.ingredients.length === 0) {
            this.stepper.previous();
        } else {
            this.saveRecipe(this.recipe)
            this.updateStorage()
            this.router.navigate(['/']);
        }
    }

    /**
     * Speichert das Rezept in der Datenbank und aktualisiert den LocalStorage. Wird in der
     * OnSubmit-Methode im Formular des letzten Schritts des Steppers zum Erstellen von Rezepten
     * aufgerufen.
     * @param recipe Rezept, dass gespeichert werden soll.
     */
    private saveRecipe(recipe: Recipe): void {
        if (!recipe) {
            return;
        }
        this.recipeService.addRecipe(recipe as Recipe)
            .subscribe(recipe => {
                this.recipes.push(recipe);
                localStorage.setItem('recipes', JSON.stringify(this.recipes));
            });
    }

    /**
     * Übernimmt die allgemeinen Rezeptinformationen, sobald der Button zum Abschließen des
     * ersten Schritts vom Stepper geklickt wird.
     */
    protected addRecipeInformation(): void {
        this.recipe.name = <string>this.recipe_information.value.name;
        this.recipe.persons = <number>this.recipe_information.value.persons;
        this.recipe.preperation_time = <string>this.recipe_information.value.preperation_time + ' ' + this.recipe_information.value.preperation_time_unit;
        this.recipe.total_time = <string>this.recipe_information.value.total_time + ' ' + this.recipe_information.value.total_time_unit;
        this.recipe.photo = <string>this.recipe_information.value.image_url;
    }

    /**
     * Fügt der Zutatenliste des neuen Rezepts eine Zutat hinzu. Der Button um zum nächsten
     * Schritt des Steppers zu gelangen bleibt bzw. wird aktiviert, da sich min. eine Zutat
     * in der Zutatenliste befindet.
     */
    protected addIngredient(): void {
        if (this.ingredients.value.ingredient !== '' && this.ingredients.value.ingredient !== null) {
            let ingredient = {} as Ingredient;

            ingredient.ingredient = <string>this.ingredients.value.ingredient;
            ingredient.amount = <number>this.ingredients.value.amount;
            ingredient.unit = <string>this.ingredients.value.unit;

            this.recipe.ingredients.push(ingredient);
            this.dataSource_ingredients = this.recipe.ingredients;
            this.ingredientTable.renderRows();
            this.ingredients.reset();
            this.ingredients.value.ingredient = '';

            this.button_ingredients_disabled = false;
            this.isLinear = false;
        }
    }

    /**
     * Entfernt eine Zutat aus der Zutatenliste des Rezepts. Der Nutzer kann nur zum
     * nächsten Schritt des Steppers gehen, wenn sich mindestens eine Zutat in der Liste
     * befindet. Andernfalls wird der Button für den nächsten Schritt deaktiviert.
     * @param element Zutat, die entfernt werden soll
     */
    protected removeIngredient(element: Ingredient): void {
        for (let i = 0; i < this.recipe.ingredients.length; i++) {
            if (element.ingredient === this.recipe.ingredients[i].ingredient) {
                this.recipe.ingredients.splice(i, 1);
                this.ingredientTable.renderRows();
            }
        }
        if (this.recipe.ingredients.length === 0) {
            this.button_ingredients_disabled = true;
            this.isLinear = true;
        }
    }

    /**
     * Fügt der Liste mit Zubereitungsschritten einen Schritt hinzu. Der Button zum Speichern
     * des Rezepts bleibt bzw. wird deaktiviert, da sich min. ein Zubereitungsschritt in der
     * Liste befindet.
     */
    protected addStep(): void {
        if (this.steps.value.step !== '' && this.steps.value.step !== null) {
            let step = <string>this.steps.value.step;
            this.recipe.steps.push(step)
            this.steps.reset();
            this.button_steps_disabled = false;
        }
    }

    /**
     * Entfernt einen Zubereitungsschritt aus der Liste mit Zubereitungsschritten des Rezepts.
     * Der Nutzer kann den Butten zum Speichern des Rezepts nur klicken, wenn sich mindestens ein
     * Zubereitungsschritt in der Liste befindet. Andernfalls wird der Button deaktiviert.
     * @param element Zubereitungsschritt, der entfernt werden soll
     */
    protected removeStep(element: number): void {
        this.recipe.steps.splice(element, 1);
        if (this.recipe.steps.length === 0) {
            this.button_steps_disabled = true;
        }
    }

    /**
     * Methode zum Aktualisieren des LocalStorage.
     */
    private updateStorage(): void {
        this.recipeService.getRecipes().subscribe(recipes => {
            localStorage.setItem('recipes', JSON.stringify(recipes))
        });
    }

    /**
     * Aktiviert den linearen Modus des Steppers. Der Nutzer kann nur einen Schritt weiter gehen, wenn
     * alle FormControls valide sind.
     */
    protected enableLinearMode(): void {
        this.isLinear = true;
    }
}
