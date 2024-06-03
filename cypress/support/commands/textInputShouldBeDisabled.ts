function textInputShouldBeDisabled(dataCy: string) {
    cy.getByDataCy(dataCy).should('have.css', 'pointer-events', 'none');
}

declare global {
    namespace Cypress {
        interface Chainable {
            textInputShouldBeDisabled: typeof textInputShouldBeDisabled;
        }
    }
}

export { textInputShouldBeDisabled };
