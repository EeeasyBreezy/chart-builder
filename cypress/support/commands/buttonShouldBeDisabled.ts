function buttonShouldBeDisabled(name: string) {
    cy.findAllByRole('button', { name }).scrollIntoView().should('be.disabled');
}

declare global {
    namespace Cypress {
        interface Chainable {
            buttonShouldBeDisabled: typeof buttonShouldBeDisabled;
        }
    }
}

export { buttonShouldBeDisabled };
