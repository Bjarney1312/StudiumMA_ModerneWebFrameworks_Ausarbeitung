import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../data/recipe';
import {MatChipsModule} from '@angular/material/chips';
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {MatTableModule} from '@angular/material/table';
import {Ingredient} from "../../data/ingredient";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [
    MatChipsModule,
    MatIcon,
    NgForOf,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  recipeService = inject(RecipeService);
  recipe: Recipe | undefined;
  persons: number | undefined = 0;
  ingredients: Ingredient[] | undefined = [];

  dataSource: Ingredient[] = [];

  displayedColumns: string[] = ['Menge', 'Zutat'];

  constructor() {

  }

  ngOnInit() {
    this.loadRecipe();
  }

  async loadRecipe() {
    const recipeId = parseInt(this.route.snapshot.params['id'], 10);
    this.recipe = await this.recipeService.getRecipeById(recipeId);
    // this.dataSource = this.recipe?.ingredients ? this.recipe?.ingredients : []
    this.ingredients = this.recipe?.ingredients ? this.recipe?.ingredients : [];
    this.dataSource = this.ingredients ? this.ingredients : []

    this.persons = this.recipe?.persons;
    this.ingredients = this.recipe?.ingredients;
  }

  addPerson() {
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


  removePerson() {
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

}
