function typeIntoInput(name: string, text: string) {
    cy.get(`input[name="${name}"]`).type(text);
}

declare global {
    namespace Cypress {
        interface Chainable {
            typeIntoInput: typeof typeIntoInput;
        }
    }
}

export { typeIntoInput };
