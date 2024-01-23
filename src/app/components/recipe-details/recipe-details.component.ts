import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecipeService} from '../../services/recipe.service';
import { Recipe } from '../../data/recipe';
@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  recipeId = -1;
  recipeService = inject(RecipeService);
  recipe: Recipe | undefined;

  constructor() {
    const recipeId = parseInt(this.route.snapshot.params['id'], 10);
    this.recipeService.getRecipeById(recipeId).then(recipe => {
      this.recipe = recipe;
    });
  }
}
