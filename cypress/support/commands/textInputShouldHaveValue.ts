function textInputShouldHaveValue(name: string, expected: string) {
    cy.get(`input[name="${name}"]`).should('have.value', expected);
}

declare global {
    namespace Cypress {
        interface Chainable {
            textInputShouldHaveValue: typeof textInputShouldHaveValue;
        }
    }
}

export { textInputShouldHaveValue };
