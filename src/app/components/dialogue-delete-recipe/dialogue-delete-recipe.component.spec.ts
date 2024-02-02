import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueDeleteRecipeComponent } from './dialogue-delete-recipe.component';

describe('DialogueDeleteRecipeComponent', () => {
  let component: DialogueDeleteRecipeComponent;
  let fixture: ComponentFixture<DialogueDeleteRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogueDeleteRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogueDeleteRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
