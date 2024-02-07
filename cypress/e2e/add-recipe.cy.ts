describe('Add recipe test', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.wait(4000);
        cy.get('[data-testid="app-button-new-recipe"]').should('have.text', 'add Rezept hinzufügen ');
        cy.get('[data-testid="app-button-new-recipe"]').focus().click();
        cy.wait(4000);
        cy.url().should('eq', 'http://localhost:4200/new_recipe');
    });

    it('adds a new recipe', () => {
        cy.get('[data-testid="add-recipe-name"]').focus().type('Orangen');
        cy.get('[data-testid="add-recipe-persons"]').focus().clear().type('2');
        cy.get('[data-testid="add-recipe-preptime"]').focus().type('5');
        cy.get('[data-testid="add-recipe-totaltime"]').focus().type('5');
        cy.get('[data-testid="add-recipe-image"]').focus().type('https://i.ibb.co/g3s3bCQ/orangen.jpg');
        cy.get('[data-testid="add-recipe-button-step1-forward"]').focus().click();

        cy.get('[data-testid="add-recipe-button-step2-forward"]').should('be.disabled');
        cy.get('[data-testid="add-recipe-input-ingredient"]').focus().type('Orangen');
        cy.get('[data-testid="add-recipe-input-amount"]').focus().type('200');
        cy.get('tr').should('have.length', 5);
        cy.get('[data-testid="add-recipe-button-ingredient"]').focus().click();
        cy.get('tr').should('have.length', 6);
        cy.get('[data-testid="add-recipe-button-step2-forward"]').should('be.enabled');
        cy.get('[data-testid="add-recipe-button-step2-forward"]').focus().click();

        cy.get('[data-testid="add-recipe-button-step3-forward"]').should('be.disabled');
        cy.get('[data-testid="add-recipe-input-step"]').focus().type('Orangen schälen und in Stücke teilen');
        cy.get('[data-testid="add-recipe-button-step"]').focus().click();
        cy.get('[data-testid="add-recipe-button-step3-forward"]').should('be.enabled');
        cy.get('[data-testid="add-recipe-button-step3-forward"]').focus().click();

        cy.url().should('eq', 'http://localhost:4200/');
        cy.get('[data-testid="recipe-card"]').should('have.length', 5);
        cy.get('[data-testid="recipe-card-link"]').eq(4).click();

        cy.get('[data-testid="recipe-details-name"]').should('have.text', 'Orangen');
        cy.get('[data-testid="recipe-details-time-chip"]').eq(0).should('have.text', 'alarm Vorbereitungszeit ca. 5 Minuten ');
        cy.get('[data-testid="recipe-details-time-chip"]').eq(1).should('have.text', 'alarm Gesamtzeit ca. 5 Minuten ');
        cy.get('[data-testid="recipe-details-steps"]').should('have.length', 1);
        cy.get('tr').should('have.length', 2);
    });
})

// Quelle für das Bild der Orangen:
// https://pixabay.com/photos/oranges-citrus-fruits-fruits-1995056/

