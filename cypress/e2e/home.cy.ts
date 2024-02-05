describe('My Cooking Recipes', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'My Cooking Recipes');
  });

  it('has the correct header', () => {
    cy.get('[data-testid="home-h1"]').should('have.text', 'Meine Rezepte');
  });

  it('should load test data', () => {
    cy.get('[data-testid="recipe-card"]').should('have.length', 4);
  });

  it('should search for recipe', () => {
    cy.get('[data-testid="home-input-search"]').type('Orientalischer Reissalat');
    cy.get('[data-testid="home-button-search"]').click();
    cy.get('[data-testid="recipe-card"]').should('have.length', 1);
    cy.get('[data-testid="recipe-card-name"]').should('have.text', 'Orientalischer Reissalat');
  });
})


