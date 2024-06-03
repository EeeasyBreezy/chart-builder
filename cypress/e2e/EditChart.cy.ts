import { addChart } from '../support/utils/Charts';
import { validateLabelInput } from '../support/utils/Validation';

describe('AddChart', () => {
    const shouldChangeLabels = 'shouldChangeLabels';
    const shouldNotChangeLabelsWhenFormIsInvalid = 'shouldNotChangeLabelsWhenFormIsInvalid';
    const shouldChangeChartType = 'shouldChangeChartType';
    const shouldChangeCheckboxes = 'shouldChangeCheckboxes';

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

    it(shouldChangeLabels, () => {
        addChart();

        // validate chart settings panel is disabled when no chart is selected
        cy.getByDataCy('chartSettingsPanel').should('have.css', 'pointer-events', 'none');
        cy.getByDataCy('chartSettingsPanel').should('have.css', 'opacity', '0.5');

        cy.get('canvas').click();

        cy.textShouldBeVisible('Edit Labels');

        // validate chart settings panel is enabled when a chart is selected
        cy.getByDataCy('chartSettingsPanel').should('have.css', 'pointer-events', 'auto');
        cy.getByDataCy('chartSettingsPanel').should('have.css', 'opacity', '1');
        cy.textShouldBeVisible('Chart Options: Personal Saving Rate'); // title in settings is available
        validateLabelInput('Personal Saving Rate', 'Date', 'Percent'); // labels in settings are available

        cy.clearInput('title');
        cy.clearInput('xLabel');
        cy.clearInput('yLabel');
        cy.buttonShouldBeDisabled('Apply Changes');

        cy.typeIntoInput('title', 'This is new title');
        cy.typeIntoInput('xLabel', 'This is new x label');
        cy.typeIntoInput('yLabel', 'This is new y label');
        cy.buttonValidateAndClick('Apply Changes');
    });

    it(shouldNotChangeLabelsWhenFormIsInvalid, () => {
        addChart();
        cy.get('canvas').click();

        cy.clearInput('title');
        cy.clearInput('xLabel');
        cy.clearInput('yLabel');
        cy.buttonShouldBeDisabled('Apply Changes');

        const longString = 'a'.repeat(130);
        cy.typeIntoInput('title', longString);
        cy.textShouldBeVisible('Must be at most 128 characters');
        cy.buttonShouldBeDisabled('Apply Changes');

        cy.typeIntoInput('xLabel', longString);
        cy.textShouldBeVisible('Must be at most 64 characters');
        cy.buttonShouldBeDisabled('Apply Changes');

        cy.typeIntoInput('yLabel', longString);
        cy.textShouldBeVisible('Must be at most 64 characters');
        cy.buttonShouldBeDisabled('Apply Changes');
    });

    it(shouldChangeChartType, () => {
        addChart();
        cy.get('canvas').click();

        cy.textShouldBeVisible('Chart Type');
        cy.getByDataCy('lineStyle').should('exist');

        cy.getByDataCy('lineStyle').click();
        cy.findByText('Dashed').click();

        cy.getByDataCy('chartType').click();

        cy.findByText('Bar').click();

        cy.getByDataCy('chartType')
            .invoke('text')
            .then((text) => {
                const cleanedText = text.replace(/\u200B/g, '');
                expect(cleanedText).to.equal('Bar');
            });
        cy.getByDataCy('lineStyle').should('not.exist');
    });

    it(shouldChangeCheckboxes, () => {
        addChart();
        cy.get('canvas').click();

        cy.textShouldBeVisible('Labels Visibility');
        cy.findByText('Hide Points').click();
        cy.findByText('Hide X Label').click();
        cy.findByText('Hide Y Label').click();
    });
});
