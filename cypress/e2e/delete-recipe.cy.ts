describe('Recipe-Details test', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('cancels a deletion request of a recipe', () => {
        cy.get('[data-testid="recipe-card-link"]').eq(0).click();
        cy.url().should('eq', 'http://localhost:4200/details/0');
        cy.get('[data-testid="recipe-details-button-delete"]').should('have.text', 'delete Löschen ');
        cy.get('[data-testid="recipe-details-button-delete"]').focus().click();
        cy.wait(2000);
        cy.get('[data-testid="delete-dialogue-button-cancel"]').focus().click();
        cy.url().should('eq', 'http://localhost:4200/details/0');
    });

    it('deletes a recipe', () => {
        cy.get('[data-testid="recipe-card"]').should('have.length', 4);
        cy.get('[data-testid="recipe-card-link"]').eq(0).click();
        cy.url().should('eq', 'http://localhost:4200/details/0');
        cy.get('[data-testid="recipe-details-button-delete"]').should('have.text', 'delete Löschen ');
        cy.get('[data-testid="recipe-details-button-delete"]').focus().click();
        cy.wait(2000);
        cy.get('[data-testid="delete-dialogue-button-delete"]').focus().click();
        cy.url().should('eq', 'http://localhost:4200/');
        cy.get('[data-testid="recipe-card"]').should('have.length', 3);
    });

})
