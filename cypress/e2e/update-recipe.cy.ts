describe('Update recipe test', () => {

    beforeEach(() => {
        cy.visit('/details/0');
        cy.wait(4000);
        cy.get('[data-testid="recipe-details-button-update"]').should('have.text', 'mode Bearbeiten ');
        cy.get('[data-testid="recipe-details-button-update"]').focus().click();
        cy.wait(4000);
        cy.url().should('eq', 'http://localhost:4200/update_recipe/0');
    });

    it('checks if recipe values present', () => {
        cy.get('[data-testid="update-recipe-name"]').should('have.value', 'Hühner-Kokos-Suppe');
        cy.get('[data-testid="update-recipe-persons"]').should('have.value', 2);
        cy.get('[data-testid="update-recipe-preptime"]').should('have.value', 15);
        cy.get('[data-testid="update-recipe-totaltime"]').should('have.value', 15);
        cy.get('[data-testid="update-recipe-image"]').should('have.value', 'https://i.ibb.co/tqyXVyB/Huehner-Kokos-Suppe.jpg');
    });

    it('checks data updates if changed', () => {
        cy.get('[data-testid="update-recipe-name"]').clear();
        cy.get('[data-testid="update-recipe-name"]').type('Cremige Hühner-Kokos-Suppe');
        cy.wait(2000);
        cy.get('[data-testid="update-recipe-button-step1-forward"]').focus().click();
        cy.get('tr').should('have.length', 16);
        cy.get('[data-testid="update-recipe-input-ingredient"]').focus().type('Testzutat');
        cy.get('[data-testid="update-recipe-input-amount"]').focus().type('100');
        cy.get('[data-testid="update-recipe-button-ingredient"]').focus().click();
        cy.get('tr').should('have.length', 17);
        cy.get('[data-testid="update-recipe-button-step2-forward"]').focus().click();

        cy.get('[data-testid="update-recipe-steplist"]').should('have.length', 3);
        cy.get('[data-testid="update-recipe-input-step"]').focus().type('Test-Zubereitungsschritt');
        cy.get('[data-testid="update-recipe-button-step"]').focus().click();
        cy.get('[data-testid="update-recipe-steplist"]').should('have.length', 4);
        cy.get('[data-testid="update-recipe-button-step3-forward"]').focus().click();

        cy.url().should('eq', 'http://localhost:4200/details/0');
        cy.get('[data-testid="recipe-details-name"]').should('have.text', 'Cremige Hühner-Kokos-Suppe');
        cy.get('[data-testid="recipe-details-persons"]').should('have.text', 'Zutaten für 2 Personen');
        cy.get('tr').should('have.length', 13);
        cy.get('[data-testid="recipe-details-steps"]').should('have.length', 4);
    });
})
