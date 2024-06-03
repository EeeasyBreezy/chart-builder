function textInputShouldBeEnabled(dataCy: string) {
    cy.getByDataCy(dataCy).should('have.css', 'pointer-events', 'auto');
}

declare global {
    namespace Cypress {
        interface Chainable {
            textInputShouldBeEnabled: typeof textInputShouldBeEnabled;
        }
    }
}

export { textInputShouldBeEnabled };
