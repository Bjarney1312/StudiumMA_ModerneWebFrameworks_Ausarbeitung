import { Injectable } from '@angular/core';
import {Recipe} from "./recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  url = 'http://localhost:3000/recipes';

  async getAllRecipes(): Promise<Recipe[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getRecipeById(id: number): Promise<Recipe | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }
}
