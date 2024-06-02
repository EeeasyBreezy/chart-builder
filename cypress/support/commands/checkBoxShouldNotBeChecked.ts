function checkboxShouldNotBeChecked(dataCy: string) {
    cy.get(`[data-cy="${dataCy}"] > input[type=checkbox]:not(:checked)`).should('exist');
}

declare global {
    namespace Cypress {
        interface Chainable {
            checkboxShouldNotBeChecked: typeof checkboxShouldNotBeChecked;
        }
    }
}

export { checkboxShouldNotBeChecked };
