function textShouldBeVisible(text: string) {
    cy.findByText(text).scrollIntoView().should('be.visible');
}

declare global {
    namespace Cypress {
        interface Chainable {
            textShouldBeVisible: typeof textShouldBeVisible;
        }
    }
}

export { textShouldBeVisible };
