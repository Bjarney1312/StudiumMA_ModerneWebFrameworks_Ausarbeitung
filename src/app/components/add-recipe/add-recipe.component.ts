import {Component, OnInit, ViewChild} from '@angular/core';
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
import {MatStepperModule} from '@angular/material/stepper';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef} from "@angular/material/table";
import {NgForOf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

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

  recipe: Recipe = {} as Recipe;
  isLinear = true;
  dataSource_ingredients: Ingredient[] = [];
  recipes: Recipe[] = [];

  displayedColumns: string[] = ['Zutat', 'Menge', 'Entfernen'];

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

  button_ingredients_disabled: boolean = true;
  button_steps_disabled: boolean = true;

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.recipe.id = uuidv4();
    this.recipe.ingredients = [];
    this.recipe.steps = [];
    this.recipeService.getRecipes()
      .subscribe(recipes => {
        this.recipes = recipes;
      });
  }

  onSubmit(): void {
    this.saveRecipe(this.recipe)
    this.updateStorage()
    this.router.navigate(['/']);
  }

  saveRecipe(recipe: Recipe) {
    if (!recipe) {
      return;
    }
    this.recipeService.addRecipe(recipe as Recipe)
      .subscribe(recipe => {
        this.recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
      });
  }

  updateStorage() {
    this.recipeService.getRecipes().subscribe(recipes => {
      localStorage.setItem('recipes', JSON.stringify(recipes))
    });
  }

  addRecipeInformation() {
    this.recipe.name = <string>this.recipe_information.value.name;
    this.recipe.persons = <number>this.recipe_information.value.persons;
    this.recipe.preperation_time = <string>this.recipe_information.value.preperation_time + ' ' + this.recipe_information.value.preperation_time_unit;
    this.recipe.total_time = <string>this.recipe_information.value.total_time + ' ' + this.recipe_information.value.total_time_unit;
    this.recipe.photo = <string>this.recipe_information.value.image_url;
  }

  addIngredient() {
    console.log(this.ingredients.value.ingredient)

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

  removeIngredient(element: Ingredient) {
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      if (element.ingredient === this.recipe.ingredients[i].ingredient) {
        this.recipe.ingredients.splice(i, 1);
        this.ingredientTable.renderRows();
      }
    }
    if (this.recipe.ingredients.length === 0) {
      this.button_ingredients_disabled = true;
    }
  }

  addStep() {

    if (this.steps.value.step !== '' && this.steps.value.step !== null) {
      let step = <string>this.steps.value.step;
      this.recipe.steps.push(step)
      this.steps.reset();
      this.button_steps_disabled = false;
    }
  }

  removeStep(element: number) {
    this.recipe.steps.splice(element, 1);
    if (this.recipe.steps.length === 0) {
      this.button_steps_disabled = true;
    }
  }

  enableLinearMode() {
    this.isLinear = true;
  }
}
