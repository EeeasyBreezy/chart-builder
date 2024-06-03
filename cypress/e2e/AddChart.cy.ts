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

        cy.intercept('GET', '/api/observations?id=PSAVERT&*', {
            fixture: 'observations/personalSavingRate.json',
        }).as('getObservations');
    });

    it.only(shouldAddChart, () => {
        cy.visit('http://localhost:3000');
        cy.buttonValidateAndClick('Add Chart');

        // validate dialog initial state
        // placeholders visible
        // inputs disabled
        cy.findByRole('dialog').within(() => {
            cy.textShouldBeVisible('Add Chart');
            cy.getByDataCy('chartAutocomplete').within(() => cy.findByLabelText('Measurement*').should('be.visible'));
            cy.getByDataCy('editTitle').within(() => cy.findByLabelText('Title*').should('be.visible'));
            cy.getByDataCy('editXLabel').within(() => cy.findByLabelText('X Axis*').should('be.visible'));
            cy.getByDataCy('editYLabel').within(() => cy.findByLabelText('Y Axis*').should('be.visible'));

            cy.textInputShouldBeDisabled('editTitle');
            cy.textInputShouldBeDisabled('editXLabel');
            cy.textInputShouldBeDisabled('editYLabel');

            cy.buttonShouldBeDisabled('Save');
        });

        // search for a chart
        cy.findByRole('dialog').within(() => {
            cy.getByDataCy('chartAutocomplete').click();
            cy.getByDataCy('chartAutocomplete').type('Personal Saving Rate');
            cy.wait('@search');
        });

        // select a chart
        cy.findByText('Personal Saving Rate').last().click();
        cy.wait('@getSeries');

        // validate dialog state after selecting a chart
        // inputs enabled and filled with values
        cy.findByRole('dialog').within(() => {
            cy.textInputShouldBeEnabled('editTitle');
            cy.textInputShouldBeEnabled('editXLabel');
            cy.textInputShouldBeEnabled('editYLabel');

            cy.textInputShouldHaveValue('title', 'Personal Saving Rate');
            cy.textInputShouldHaveValue('xLabel', 'Date');
            cy.textInputShouldHaveValue('yLabel', 'Percent');

            cy.buttonValidateAndClick('Save');
        });

        cy.wait('@getObservations');
        cy.findByRole('dialog').should('not.exist');
    });
});
