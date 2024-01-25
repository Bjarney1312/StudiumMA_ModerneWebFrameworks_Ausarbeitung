import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService} from '../../services/recipe.service';
import { Recipe } from '../../data/recipe';
import {MatChipsModule} from '@angular/material/chips';
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {MatTableModule} from '@angular/material/table';
import {Ingredient} from "../../data/ingredient";
@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [
    MatChipsModule,
    MatIcon,
    NgForOf,
    MatTableModule
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit{
  route: ActivatedRoute = inject(ActivatedRoute);
  recipeService = inject(RecipeService);
  recipe: Recipe | undefined;

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
    this.dataSource = this.recipe?.ingredients ? this.recipe?.ingredients : [];
  }

}
