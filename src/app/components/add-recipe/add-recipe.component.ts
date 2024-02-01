import {Component, OnInit} from '@angular/core';
import {FormBuilder,FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {v4 as uuidv4} from "uuid";
import {Recipe} from "../../data/recipe";
import {RecipeService} from "../../services/recipe.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from '@angular/material/select';
import {Ingredient} from "../../data/ingredient";
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-add-recipe',
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
    MatStepperModule
  ],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})

export class AddRecipeComponent implements OnInit{

  recipe: Recipe = {} as Recipe;
  isLinear = false;

  recipe_information = this.formBuilder.group({
    name: '',
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
    unit: '',
  });

  steps = this.formBuilder.group({
    step: '',
  });

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipe.id = uuidv4();
  }

  onSubmit(): void {
    this.recipe.name = <string>this.recipe_information.value.name;
    this.recipe.persons = <number>this.recipe_information.value.persons;
    this.recipe.preperation_time = <string>this.recipe_information.value.preperation_time + ' ' + this.recipe_information.value.preperation_time_unit;
    this.recipe.total_time = <string>this.recipe_information.value.total_time + ' ' + this.recipe_information.value.total_time_unit;
    this.recipe.photo = <string>this.recipe_information.value.image_url;

    console.log(this.recipe)

    this.recipe_information.reset();
  }

  addIngredient(){
    let ingredient = {} as Ingredient;

    ingredient.ingredient = <string>this.ingredients.value.ingredient;
    ingredient.amount = <number>this.ingredients.value.amount;
    ingredient.unit = <string>this.ingredients.value.unit;

    this.recipe.ingredients.push(ingredient);
  }

  addStep(){
    let step = <string>this.steps.value.step;

    this.recipe.steps.push(step)
  }

}
