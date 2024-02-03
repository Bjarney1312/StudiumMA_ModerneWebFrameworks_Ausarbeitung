import {Component, Inject, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
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
import {ActivatedRoute, Router, RouterModule, RouterOutlet} from "@angular/router";


@Component({
    selector: 'app-update-recipe',
    standalone: true,
    imports: [
        FormsModule,
        MatFormField,
        MatInput,
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
        NgForOf,
        RouterModule,
        RouterOutlet
    ],
    templateUrl: './update-recipe.component.html',
    styleUrl: './update-recipe.component.css'
})

export class UpdateRecipeComponent implements OnInit {
    @ViewChild('ingredientTable') ingredientTable!: MatTable<Ingredient>;
    @ViewChild('stepper') stepper!: MatStepper;

    recipe: Recipe = {} as Recipe;
    ingredients: Ingredient[] | undefined = [];
    recipes: Recipe[] = [];

    dataSource_ingredients: Ingredient[] = [];
    displayedColumns: string[] = ['Zutat', 'Menge', 'Entfernen'];

    button_ingredients_disabled: boolean = true;
    button_steps_disabled: boolean = false;
    isLinear = false;
    prep_time: number = 0;
    prep_unit: string = '';
    total_time: number = 0;
    total_unit: string = '';

    // FormGroups
    recipe_information = this.formBuilder.group({
        name: [this.recipe.name, Validators.required],
        preperation_time: '',
        preperation_time_unit: '',
        total_time: '',
        total_time_unit: '',
        image_url: this.recipe.photo,
        persons: 0,
    });

    recipe_ingredients = this.formBuilder.group({
        ingredient: '',
        amount: 0,
        unit: 'g',
    });

    recipe_steps = this.formBuilder.group({
        step: '',
    });

    constructor(private formBuilder: FormBuilder, private recipeService: RecipeService, private router: Router, private route: ActivatedRoute ) {}

    /*---------------------------------------------------------------------------------------------------
                                                Funktionen
    -----------------------------------------------------------------------------------------------------*/

    ngOnInit() {
        this.loadRecipe();
    }

    /**
     * Lädt das Rezept anhand seiner ID aus der Datenbank, dass bearbeitet werden soll.
     * @private
     */
    private loadRecipe(): void {
        const id = String(this.route.snapshot.paramMap.get('id'));
        this.recipeService.getRecipe(id)
            .subscribe(recipe => {
                this.recipe = recipe;
                this.ingredients = recipe.ingredients;
                this.dataSource_ingredients = recipe.ingredients;

                this.prep_time = Number(recipe.preperation_time.split(' ')[0])
                this.prep_unit = recipe.preperation_time.split(' ')[1]
                this.total_time = Number(recipe.preperation_time.split(' ')[0])
                this.total_unit = recipe.preperation_time.split(' ')[1];

                this.recipe_information.value.name = this.recipe.name;
                this.recipe_information.value.persons = this.recipe.persons;
                this.recipe_information.value.preperation_time = this.prep_time.toString();
                this.recipe_information.value.preperation_time_unit = this.prep_unit;
                this.recipe_information.value.total_time = this.total_time.toString();
                this.recipe_information.value.total_time_unit = this.total_unit;
                this.recipe_information.value.image_url = this.recipe.photo;
            })
    }

    /**
     * Aktualisiert das Rezept und führt den Nutzer zurück zur Detailansicht
     * des Rezepts. Wurde über die obere Leiste des Steppers die Prüfung umgangen, ob sich Zutaten
     * in der Zutatenliste befinden und diese ist leer, wird das Rezept nicht gespeichert
     * und der Nutzer wird einen Schritt zurückgebracht.
     * @protected
     */
    protected onSubmit(): void {
        if (this.recipe.ingredients.length === 0) {
            this.stepper.previous();
        } else {
            this.updateRecipe(this.recipe)
            this.updateStorage()
            this.router.navigate(['details/', this.recipe.id]);
        }
    }

    /**
     * Überschreibt das aktualisierte Rezept in der Datenbank.
     * @param recipe Rezept, das aktualsiert werden soll.
     * @private
     */
    private updateRecipe(recipe: Recipe): void {
        if (!recipe) {
            return;
        }
        this.recipeService.updateRecipe(recipe as Recipe)
            .subscribe();
    }


    /**
     * Aktualisiert die Angaben zum Rezept, wenn diese sich im ersten Schritt des Steppers
     * geändert haben.
     */
    protected updateRecipeInformation(): void {
        if (this.recipe_information.value.name !== null &&
            this.recipe_information.value.name !== '') {
            this.recipe.name = <string>this.recipe_information.value.name;
        }

        if (this.recipe_information.value.persons !== null &&
            this.recipe_information.value.persons !== 0) {
            this.recipe.persons = <number>this.recipe_information.value.persons;
        }

        if (this.recipe_information.value.preperation_time !== null &&
            this.recipe_information.value.preperation_time !== '' &&
            this.recipe_information.value.preperation_time_unit !== null &&
            this.recipe_information.value.preperation_time_unit !== '') {
            this.recipe.preperation_time = <string>this.recipe_information.value.preperation_time + ' ' + this.recipe_information.value.preperation_time_unit;
        }

        if (this.recipe_information.value.total_time !== null &&
            this.recipe_information.value.total_time !== '' &&
            this.recipe_information.value.total_time_unit !== null &&
            this.recipe_information.value.total_time_unit !== '') {
            this.recipe.total_time = <string>this.recipe_information.value.total_time + ' ' + this.recipe_information.value.total_time_unit;
        }

        if (this.recipe_information.value.image_url !== null &&
            this.recipe_information.value.image_url !== '') {
            this.recipe.photo = <string>this.recipe_information.value.image_url;
        }

        if (this.recipe.ingredients.length === 0) {
            this.button_ingredients_disabled = true;
            this.isLinear = true;
        } else {
            this.button_ingredients_disabled = false;
            this.isLinear = false;
        }
    }

    /**
     * Fügt der Zutatenliste des neuen Rezepts eine Zutat hinzu. Der Button um zum nächsten
     * Schritt des Steppers zu gelangen bleibt bzw. wird aktiviert, da sich min. eine Zutat
     * in der Zutatenliste befindet.
     */
    protected addIngredient(): void {

        if (this.recipe_ingredients.value.ingredient !== '' && this.recipe_ingredients.value.ingredient !== null) {
            let ingredient = {} as Ingredient;

            ingredient.ingredient = <string>this.recipe_ingredients.value.ingredient;
            ingredient.amount = <number>this.recipe_ingredients.value.amount;
            ingredient.unit = <string>this.recipe_ingredients.value.unit;

            this.recipe.ingredients.push(ingredient);
            this.dataSource_ingredients = this.recipe.ingredients;
            this.ingredientTable.renderRows();
            this.recipe_ingredients.reset();
            this.recipe_ingredients.value.ingredient = '';

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
        let step = <string>this.recipe_steps.value.step;
        this.recipe.steps.push(step)
        this.recipe_steps.reset();
        this.button_steps_disabled = false;
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
     * Aktualisiert den LocalStorage für Rezepte.
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
        this.isLinear = false;
    }
}
