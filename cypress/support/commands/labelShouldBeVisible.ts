function labelShouldBeVisible(text: string) {
    cy.findByRole('label', { name: text }).should('be.visible');
}

declare global {
    namespace Cypress {
        interface Chainable {
            labelShouldBeVisible: typeof labelShouldBeVisible;
        }
    }
}

export { labelShouldBeVisible };
