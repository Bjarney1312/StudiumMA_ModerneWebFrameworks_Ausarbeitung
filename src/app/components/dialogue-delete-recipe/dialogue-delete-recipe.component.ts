import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-dialogue-delete-recipe',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogTitle
  ],
  templateUrl: './dialogue-delete-recipe.component.html',
  styleUrl: './dialogue-delete-recipe.component.css'
})
export class DialogueDeleteRecipeComponent {

  constructor(public dialogRef: MatDialogRef<DialogueDeleteRecipeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  /**
   * Schließt den Dialog, ohne etwas zu tun, wenn der Nutzer auf Abbrechen klickt.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
