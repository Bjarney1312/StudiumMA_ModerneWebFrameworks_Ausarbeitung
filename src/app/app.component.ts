import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DialogueAddRecipeComponent} from "./components/dialogue-add-recipe/dialogue-add-recipe.component";
import {Recipe} from "./data/recipe";
import {RecipeService} from "./services/recipe.service";
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';


@Component({
  imports: [RouterOutlet,
    HomeComponent,
    RouterModule,
    MatIcon,
    MatToolbar,
    MatIconButton,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.css',
  templateUrl: './app.component.html'
})
export class AppComponent{
  title = 'MCR - My cooking recipes';

  recipes: Recipe[] = [];
  recipe!: Recipe;

  constructor(public dialog: MatDialog, private recipeService: RecipeService,) {}


  // add(recipe: Recipe): void {
  //   if (!recipe) {
  //     return;
  //   }
  //   this.recipeService.addRecipe(recipe as Recipe)
  //     .subscribe(recipe => {
  //       this.recipes.push(recipe);
  //       localStorage.setItem('recipes', JSON.stringify(this.recipe));
  //     });
  // }
  //
  // openAddRecipeDialogue(): void {
  //   const dialogRef = this.dialog.open(DialogueAddRecipeComponent, {
  //     width: '560px',
  //     data: {recipe: {}}, disableClose: true
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result !== undefined) {
  //
  //       this.recipe = result;
  //       this.recipe.name = "";
  //       // this.add(this.recipe);
  //     }
  //   });
  // }
}
