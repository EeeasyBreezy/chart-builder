function checkboxShouldBeChecked(dataCy: string) {
    cy.get(`[data-cy="${dataCy}"] > input[type=checkbox]:checked`).should('exist');
}

declare global {
    namespace Cypress {
        interface Chainable {
            checkboxShouldBeChecked: typeof checkboxShouldBeChecked;
        }
    }
}

export { checkboxShouldBeChecked };
