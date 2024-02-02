import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../data/recipe';
import {MatChipsModule} from '@angular/material/chips';
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {MatTableModule} from '@angular/material/table';
import {Ingredient} from "../../data/ingredient";
import {MatButtonModule} from '@angular/material/button';
import {UserService} from "../../services/user.service";
import {Favorites} from "../../data/favorites";

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [
    MatChipsModule,
    MatIcon,
    NgForOf,
    MatTableModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  recipeService = inject(RecipeService);
  userService: UserService = inject(UserService);
  recipe: Recipe | undefined;
  persons: number | undefined = 0;
  ingredients: Ingredient[] | undefined = [];
  userFavorites: Favorites = {} as Favorites;

  dataSource: Ingredient[] = [];

  displayedColumns: string[] = ['Menge', 'Zutat'];

  constructor() {

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
        this.dataSource = recipe.ingredients;
        this.persons = recipe.persons;
      });

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

  addToFavorites(userid: string){

    this.userService.getFavorite(userid).subscribe(favorites =>{
      this.userFavorites = favorites;

      if(this.userFavorites!== undefined){
        // console.log(this.userFavorites);
        // console.log(this.userFavorites.favorite_recipe_ids);
        this.userFavorites.favorite_recipe_ids.push(<string>this.recipe?.id);
        this.userService.updateFavorites(this.userFavorites).subscribe();
        this.updateFavoritesStorage()
      }
    });
  }

  updateFavoritesStorage() {
    this.userService.getFavorites().subscribe(favorites => {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    });
  }
}
