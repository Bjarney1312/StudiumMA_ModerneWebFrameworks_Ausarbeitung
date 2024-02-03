import {Component, OnInit, ViewChild} from '@angular/core';
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
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
} from "@angular/material/table";
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
    isLinear = false;
    dataSource_ingredients: Ingredient[] = [];
    recipes: Recipe[] = [];

    button_ingredients_disabled: boolean = true;
    button_steps_disabled: boolean = false;

    prep_time: number = 0;
    prep_unit: string = '';

    total_time: number = 0;
    total_unit: string = '';

    displayedColumns: string[] = ['Zutat', 'Menge', 'Entfernen'];

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


    constructor(private formBuilder: FormBuilder, private recipeService: RecipeService, private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.loadRecipe();
    }

    loadRecipe(): void {
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

    onSubmit(): void {
        if (this.recipe.ingredients.length === 0) {
            this.stepper.previous();
        }
        else {
            this.updateRecipe(this.recipe)
            console.log(this.recipe)
            this.updateStorage()
            this.router.navigate(['details/', this.recipe.id]);
        }
    }

    updateRecipe(recipe: Recipe) {
        if (!recipe) {
            return;
        }
        this.recipeService.updateRecipe(recipe as Recipe)
            .subscribe();
    }

    updateStorage() {
        this.recipeService.getRecipes().subscribe(recipes => {
            localStorage.setItem('recipes', JSON.stringify(recipes))
        });
    }

    updateRecipeInformation() {
        console.log(this.recipe_information.value.name)
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
            this.recipe_information.value.preperation_time_unit !== ''
        ) {
            this.recipe.preperation_time = <string>this.recipe_information.value.preperation_time + ' ' + this.recipe_information.value.preperation_time_unit;
        }

        if (this.recipe_information.value.total_time !== null &&
            this.recipe_information.value.total_time !== '' &&
            this.recipe_information.value.total_time_unit !== null &&
            this.recipe_information.value.total_time_unit !== ''
        ) {
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

    addIngredient() {

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

    removeIngredient(element: Ingredient) {
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

    addStep() {
        let step = <string>this.recipe_steps.value.step;
        this.recipe.steps.push(step)
        this.recipe_steps.reset();
        this.button_steps_disabled = false;
    }

    removeStep(element: number) {
        this.recipe.steps.splice(element, 1);
        if (this.recipe.steps.length === 0) {
            this.button_steps_disabled = true;
        }
    }

    enableLinearMode() {
        this.isLinear = false;
    }
}
