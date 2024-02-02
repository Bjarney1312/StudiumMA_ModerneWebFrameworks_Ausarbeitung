import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Recipe } from "../data/recipe";
import {Favorites} from "../data/favorites";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let recipes: Recipe [] = [
      {
        "id": "0",
        "name": "Spaghetti Bolognese",
        "preperation_time": "15 Min",
        "total_time": "30 Min",
        "photo": "https://img.chefkoch-cdn.de/rezepte/923511197717113/bilder/1518873/crop-240x300/hirschgulasch.jpg",
        "persons": 4,
        "ingredients": [
          {
            "ingredient": "spaghetti",
            "amount": 500,
            "unit": "g"
          },
          {
            "ingredient": "tomaten",
            "amount": 400,
            "unit": "g"
          }
        ],
        "steps": [
          "Schritt 1: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          "Schritt 2"
        ],
        "created": "23.01.2024"
      }
    ];

    let favorites: Favorites[] = [
      {
        "id": "1",
        "favorite_recipe_ids": [""],
      }
    ];

    if(localStorage.getItem('recipes') !== null && localStorage.getItem('favorites') !== null){
      recipes = JSON.parse(<string>localStorage.getItem('recipes')) || []
      favorites = JSON.parse(<string>localStorage.getItem('favorites')) || []
      return {recipes, favorites};
    }
    else{
      localStorage.setItem('recipes', JSON.stringify(recipes))
      localStorage.setItem('favorites', JSON.stringify(favorites))
      return {recipes, favorites};
    }

  }
}
