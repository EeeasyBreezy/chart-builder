describe('AddChart', () => {
    const shouldAddChart = 'shouldAddChart';

    beforeEach(() => {
        cy.intercept('GET', '/api/search?*', {
            fixture: 'search/personalSavingRate.json',
            statusCode: 200,
            delay: 2000,
        }).as('search');

        cy.intercept('GET', '/api/series?id=*', {
            fixture: 'series/personalSavingRate.json',
        }).as('getSeries');
    });

    it.only(shouldAddChart, () => {
        cy.visit('http://localhost:3000');
        cy.buttonValidateAndClick('Add Chart');

        // validate dialog
        cy.findByRole('dialog').within(() => {
            cy.textShouldBeVisible('Add Chart');
            cy.getByDataCy('chartAutocomplete').within(() => cy.findByLabelText('Measurement*').should('be.visible'));
            cy.getByDataCy('editTitle').within(() => cy.findByLabelText('Title*').should('be.visible'));
            cy.getByDataCy('editXLabel').within(() => cy.findByLabelText('X Axis*').should('be.visible'));
            cy.getByDataCy('editYLabel').within(() => cy.findByLabelText('Y Axis*').should('be.visible'));

            cy.buttonShouldBeDisabled('Save');
        });

        cy.findByRole('dialog').within(() => {
            cy.getByDataCy('chartAutocomplete').click();
            cy.getByDataCy('chartAutocomplete').type('Personal Saving Rate');
            cy.wait('@search');
        });

        cy.findByText('Personal Saving Rate').last().click();
        cy.wait('@getSeries');
    });
});
