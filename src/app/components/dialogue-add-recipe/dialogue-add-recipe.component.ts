import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormControl, FormsModule, Validators} from "@angular/forms";
import {Recipe} from "../../data/recipe";
import {v4 as uuidv4} from 'uuid';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-dialogue-add-recipe',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogTitle
  ],
  templateUrl: './dialogue-add-recipe.component.html',
  styleUrl: './dialogue-add-recipe.component.css'
})
export class DialogueAddRecipeComponent implements OnInit{

  nameControl = new FormControl('', Validators.required);
  recipes: Recipe[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogueAddRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipe) {
  }

  ngOnInit(): void {
    this.data.id = uuidv4();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
