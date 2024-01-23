import { Component, inject } from '@angular/core';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeService } from "../../services/recipe.service";
import {NgForOf} from "@angular/common";
import {Recipe} from "../../data/recipe";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipesComponent, NgForOf, MatIcon, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  recipeList: Recipe[] = []
  recipeService: RecipeService = inject(RecipeService);
  filteredRecipeList: Recipe[] = []

  constructor() {
    this.recipeService.getAllRecipes().then((recipeList: Recipe[]) => {
      this.recipeList = recipeList;
      this.filteredRecipeList = recipeList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredRecipeList = this.recipeList;
      return;
    }

    this.filteredRecipeList = this.recipeList.filter(
        recipe => recipe?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
