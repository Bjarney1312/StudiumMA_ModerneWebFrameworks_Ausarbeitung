import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { RouterLink} from "@angular/router";
import { RouterOutlet} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatIconModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  @Input() recipe!: Recipe;
}
