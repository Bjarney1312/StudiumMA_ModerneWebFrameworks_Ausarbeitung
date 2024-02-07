describe('Favorite Recipes Test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('adds a recipe to favorites', () => {
        cy.get('[data-testid="recipe-card-link"]').eq(1).click();
        cy.url().should('eq', 'http://localhost:4200/details/1');
        cy.get('[data-testid="recipe-details-button-favorite"]').should('have.text', 'favorite Zu Favoriten hinzufügen ');
        cy.wait(2000);
        cy.get('[data-testid="recipe-details-button-favorite"]').focus().click();
        cy.get('[data-testid="recipe-details-button-favorite"]').should('have.text', 'favorite Aus Favoriten entfernen ');

        cy.get('[data-testid="app-button-favorites"]').focus().click();
        cy.wait(2000);
        cy.title().should('equal', 'Meine Favoriten');
        cy.get('[data-testid="recipe-card"]').should('have.length', 2);
        cy.get('[data-testid="recipe-card-name"]').eq(1).should('have.text', 'Kartoffelsuppe mit Hackbällchen')
    });


    it('removes a recipe from favorites', () => {
        cy.visit('/');
        cy.wait(2000);
        cy.get('[data-testid="recipe-card-link"]').eq(0).click();
        cy.url().should('eq', 'http://localhost:4200/details/0');
        cy.get('[data-testid="recipe-details-button-favorite"]').should('have.text', 'favorite Aus Favoriten entfernen ');
        cy.get('[data-testid="recipe-details-button-favorite"]').focus().click();
        cy.get('[data-testid="recipe-details-button-favorite"]').should('have.text', 'favorite Zu Favoriten hinzufügen ');

        cy.get('[data-testid="app-button-favorites"]').focus().click();
        cy.wait(2000);
        cy.title().should('equal', 'Meine Favoriten');
        cy.get('[data-testid="recipe-card"]').should('have.length', 0);
    });
})
