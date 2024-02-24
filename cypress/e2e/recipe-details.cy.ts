describe('Recipe-Details test', () => {

    beforeEach(() => {
        cy.visit('/details/0');
    });

    it('visits the first test recipe', () => {
        cy.url().should('eq', 'http://localhost:4200/details/0');
        cy.location('pathname').should('eq', '/details/0');
    })

    it('has the correct title', () => {
        cy.title().should('equal', 'My Cooking Recipes');
    });

    it('shows the recipe name', () => {
        cy.get('[data-testid="recipe-details-name"]').should('have.text', 'Hühner-Kokos-Suppe');
    });

    it('shows the preperation time and the total time', () => {
        cy.get('[data-testid="recipe-details-time-chip"]').should('have.length', 2);
        cy.get('[data-testid="recipe-details-time-chip"]').eq(0).should('have.text', 'alarm Vorbereitungszeit ca. 15 Minuten ');
        cy.get('[data-testid="recipe-details-time-chip"]').eq(1).should('have.text', 'alarm Gesamtzeit ca. 30 Minuten ');
    });

    it('shows the ingredient table with the 11 ingredients from test recipe', () => {
        cy.get('[data-testid="recipe-details-ingredient-table"]').should('exist');
        cy.get('th').should('have.length', 2);
        cy.get('th').eq(0).should('have.text', ' Zutat');
        cy.get('th').eq(1).should('have.text', ' Menge');
        cy.get('tr').should('have.length', 12);
    });

    it('changes the person count', () => {
        cy.get('[data-testid="recipe-details-persons"]').should('have.text', 'Zutaten für 2 Personen');
        cy.get('[data-testid="recipe-details-add-person"]').click();
        cy.get('[data-testid="recipe-details-persons"]').should('have.text', 'Zutaten für 3 Personen');
        cy.get('[data-testid="recipe-details-remove-person"]').click();
        cy.get('[data-testid="recipe-details-persons"]').should('have.text', 'Zutaten für 2 Personen');
    });

    it('can not show ingredients for fewer than 0 persons', () => {
        cy.get('[data-testid="recipe-details-remove-person"]').click();
        cy.get('[data-testid="recipe-details-persons"]').should('have.text', 'Zutaten für 2 Personen');
        cy.get('[data-testid="recipe-details-remove-person"]').click();
        cy.get('[data-testid="recipe-details-persons"]').should('have.text', 'Zutaten für 1 Personen');
        cy.get('[data-testid="recipe-details-remove-person"]').click();
        cy.get('[data-testid="recipe-details-persons"]').should('have.text', 'Zutaten für 0 Personen');
        cy.get('[data-testid="recipe-details-remove-person"]').click();
        cy.get('[data-testid="recipe-details-persons"]').should('have.text', 'Zutaten für 0 Personen');
    });

    it('changes the amount of ingredients', () => {
        cy.get('td').eq(1).should('have.text', ' 1 Stk.');
        cy.get('[data-testid="recipe-details-add-person"]').click();
        cy.get('td').eq(1).should('have.text', ' 1.5 Stk.');
        cy.get('[data-testid="recipe-details-remove-person"]').click();
        cy.get('td').eq(1).should('have.text', ' 1 Stk.');
    });

    it('shows the steps of the test recipe', () => {
        cy.get('[data-testid="recipe-details-steps"]').should('have.length', 3);
    });
})
