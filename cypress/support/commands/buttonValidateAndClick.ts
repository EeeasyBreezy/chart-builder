function buttonValidateAndClick(name: string) {
    cy.findByRole('button', { name }).scrollIntoView().click();
}

declare global {
    namespace Cypress {
        interface Chainable {
            buttonValidateAndClick: typeof buttonValidateAndClick;
        }
    }
}

export { buttonValidateAndClick };
