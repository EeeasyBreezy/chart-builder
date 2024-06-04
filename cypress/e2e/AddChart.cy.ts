import { addChart } from '../support/utils/Charts';
import { validateInitialAddChartDialogState } from '../support/utils/Validation';

describe('AddChart', () => {
    const shouldAddChart = 'shouldAddChart';
    const shouldNotAddChartWhenFormIsInvalid = 'shouldNotAddChartWhenFormIsInvalid';
    const shouldValidateAutocomplete = 'shouldValidateAutocomplete';
    const shouldCloseDialog = 'shouldCloseDialog';
    const shouldHightLightErrorOnSelection = 'shouldHightLightErrorOnSelection';

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
    });

    it.only(shouldHightLightErrorOnSelection, () => {
        cy.intercept('GET', '/api/series?id=*', {
            fixture: 'series/producerPriceIndexByCommodity.json',
        }).as('getSeries');

        cy.intercept('GET', '/api/search?*', {
            fixture: 'search/producerPriceIndexByCommodity.json',
            delay: 2000,
        }).as('getSearch');

        cy.buttonValidateAndClick('Add Chart');
        validateInitialAddChartDialogState();

        cy.findByRole('dialog').within(() => {
            cy.getByDataCy('chartAutocomplete').click();
            cy.getByDataCy('chartAutocomplete').type('Producer');
        });
        cy.wait('@getSearch');

        cy.findByText(
            'Producer Price Index by Commodity: Rubber and Plastic Products: All Other Consumer, Institutional, and Commercial Products & Producer Price Index by Commodity: Rubber and Plastic Products: All Other Consumer, Institutional, and Commercial Products',
        ).click();
    });

    it(shouldCloseDialog, () => {
        cy.buttonValidateAndClick('Add Chart');
        validateInitialAddChartDialogState();

        cy.findByRole('dialog').within(() => {
            cy.getByDataCy('chartAutocomplete').click();
            cy.getByDataCy('chartAutocomplete').type('Personal Saving Rate');
        });
        cy.wait('@search');
        cy.findByText('Personal Saving Rate').last().click();
        cy.wait('@getSeries');

        cy.findByTestId('CloseOutlinedIcon').click();
        cy.findByRole('dialog').should('not.exist');

        cy.buttonValidateAndClick('Add Chart');
        validateInitialAddChartDialogState();
    });

    it(shouldValidateAutocomplete, () => {
        cy.buttonValidateAndClick('Add Chart');
        // search for a chart
        cy.findByRole('dialog').within(() => {
            cy.getByDataCy('chartAutocomplete').click();
            cy.getByDataCy('chartAutocomplete').type('Personal Saving Rate');
        });
        cy.textShouldBeVisible('Loading...');
        cy.wait('@search');

        cy.get('body').click(10, 10); // make autocomplete loose focus and validate that it has persisted entered value
        cy.findByRole('dialog').within(() => {
            cy.getByDataCy('chartAutocomplete').within(() => {
                cy.get('input').should('have.value', 'Personal Saving Rate');
            });
        });

        cy.findByRole('dialog').within(() => {
            cy.getByDataCy('chartAutocomplete').click();
        });
        cy.findByText('Personal Saving Rate').last().click(); // select value from Auto complete

        // clear autocomplete
        cy.findByRole('dialog').within(() => {
            cy.findByTestId('CloseIcon').click();
            cy.getByDataCy('chartAutocomplete').within(() => {
                cy.get('input').should('have.value', '');
            });
            cy.getByDataCy('chartAutocomplete').click();
        });
        cy.textShouldBeVisible('No options');
    });

    [
        ['D', 'Daily'],
        ['W', 'Weekly'],
        ['M', 'Monthly'],
        ['Q', 'Quarterly'],
        ['SA', 'Semi-Annualy'],
        ['A', 'Annualy'],
    ].forEach((frequencyShort, frequency) => {
        it(shouldAddChart, () => {
            cy.fixture('series/personalSavingRate.json').then((data) => {
                data.frequency = frequency;
                data.frequency_short = frequencyShort;

                cy.intercept('GET', '/api/series?id=*', (request) => {
                    request.reply({
                        statusCode: 200,
                        body: data,
                    });
                }).as('getSeries');
                addChart();
            });
        });
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

            cy.typeIntoInput('xLabel', longString);
            cy.textShouldBeVisible('Must be at most 64 characters');
            cy.buttonShouldBeDisabled('Save');
            cy.clearInput('xLabel');
            cy.textShouldBeVisible('Required');

            cy.clearInput('yLabel');
            cy.typeIntoInput('yLabel', longString);
            cy.textShouldBeVisible('Must be at most 64 characters');
            cy.buttonShouldBeDisabled('Save');
            cy.clearInput('yLabel');
        });
    });
});
