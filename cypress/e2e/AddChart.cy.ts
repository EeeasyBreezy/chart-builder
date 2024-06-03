describe('AddChart', () => {
    const shouldAddChart = 'shouldAddChart';

    it.only(shouldAddChart, () => {
        cy.visit('http://localhost:3000');
        cy.buttonValidateAndClick('Add Chart');

        cy.findByRole('dialog').within(() => {
            cy.textShouldBeVisible('Add Chart');
            cy.labelShouldBeVisible('Measurement*');
            cy.labelShouldBeVisible('Title*');
            cy.labelShouldBeVisible('X Label*');
            cy.labelShouldBeVisible('Y Label*');
        });
    });
});
