function clearInput(name: string) {
    cy.get(`input[name="${name}"]`).clear();
}

declare global {
    namespace Cypress {
        interface Chainable {
            clearInput: typeof clearInput;
        }
    }
}

export { clearInput };
