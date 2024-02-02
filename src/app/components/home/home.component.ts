import {Component, inject, OnInit} from '@angular/core';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeService } from "../../services/recipe.service";
import {NgForOf} from "@angular/common";
import {Recipe} from "../../data/recipe";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipesComponent, NgForOf, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  recipeList: Recipe[] = []
  recipeService: RecipeService = inject(RecipeService);
  filteredRecipeList: Recipe[] = []


  ngOnInit(): void {
    this.getRecipes()
  }

  /*---------------------------------------------------------------------------------------------------
                                           Funktionen
  -----------------------------------------------------------------------------------------------------*/

  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => {
        this.recipeList = recipes;
        this.filteredRecipeList = recipes;
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
