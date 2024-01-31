import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueAddRecipeComponent } from './dialogue-add-recipe.component';

describe('DialogueAddRecipeComponent', () => {
  let component: DialogueAddRecipeComponent;
  let fixture: ComponentFixture<DialogueAddRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogueAddRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogueAddRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
