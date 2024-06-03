import { validateFilledAddChartDialogState, validateInitialAddChartDialogState } from '../support/utils/AddChart.utils';

describe('AddChart', () => {
    const shouldAddChart = 'shouldAddChart';
    const shouldNotAddChartWhenFormIsInvalid = 'shouldNotAddChartWhenFormIsInvalid';

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

        cy.visit('http://localhost:3000');
        cy.buttonValidateAndClick('Add Chart');
    });

    it(shouldAddChart, () => {
        validateInitialAddChartDialogState();

        // search for a chart
        cy.findByRole('dialog').within(() => {
            cy.getByDataCy('chartAutocomplete').click();
            cy.getByDataCy('chartAutocomplete').type('Personal Saving Rate');
            cy.wait('@search');
        });

        // select a chart
        cy.findByText('Personal Saving Rate').last().click();
        cy.wait('@getSeries');

        validateFilledAddChartDialogState();

        cy.buttonValidateAndClick('Save');

        cy.wait('@getObservations');
        cy.findByRole('dialog').should('not.exist');
    });

    it(shouldNotAddChartWhenFormIsInvalid, () => {
        validateInitialAddChartDialogState();

        // search for a chart
        cy.findByRole('dialog').within(() => {
            cy.getByDataCy('chartAutocomplete').click();
            cy.getByDataCy('chartAutocomplete').type('Personal Saving Rate');
            cy.wait('@search');
        });

        // select a chart
        cy.findByText('Personal Saving Rate').last().click();
        cy.wait('@getSeries');

        // clear title
        cy.findByRole('dialog').within(() => {
            cy.getByDataCy('editTitle').clear();
            cy.buttonShouldBeDisabled('Save');
        });

        const longString = 'a'.repeat(200);
        cy.findByRole('dialog').within(() => {
            cy.typeIntoInput('title', longString);
            cy.textShouldBeVisible('Must be at most 128 characters');
            cy.buttonShouldBeDisabled('Save');

            cy.clearInput('title');

            cy.typeIntoInput('title', 'Personal Saving Rate');

            cy.clearInput('xLabel');
            cy.clearInput('yLabel');

            cy.typeIntoInput('xLabel', longString);
            cy.textShouldBeVisible('Must be at most 64 characters');
            cy.buttonShouldBeDisabled('Save');
            cy.clearInput('xLabel');
            cy.textShouldBeVisible('Required');

            cy.typeIntoInput('yLabel', longString);
            cy.textShouldBeVisible('Must be at most 64 characters');
            cy.buttonShouldBeDisabled('Save');
            cy.clearInput('yLabel');

        });
    });
});
