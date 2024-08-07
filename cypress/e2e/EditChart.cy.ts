import { addChart } from '../support/utils/Charts';
import { validateLabelInput } from '../support/utils/Validation';

describe('AddChart', () => {
    const shouldChangeLabels = 'shouldChangeLabels';
    const shouldNotChangeLabelsWhenFormIsInvalid = 'shouldNotChangeLabelsWhenFormIsInvalid';
    const shouldChangeChartType = 'shouldChangeChartType';
    const shouldChangeCheckboxes = 'shouldChangeCheckboxes';
    const shouldValidateColors = 'shouldValidateColors';
    const shouldManipulateData = 'shouldManipulateData';
    const shouldDeleteChart = 'shouldDeleteChart';
    const shouldEditChartsConcurrently = 'shouldEditChartsConcurrently';
    const shouldAddChartConcurrently = 'shouldAddChartConcurrently';
    const shouldHideAggregateWhenMinFreqSelected = 'shouldHideAggregateWhenMinFreqSelected';

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

    it(shouldHideAggregateWhenMinFreqSelected, () => {
        addChart();
        cy.get('canvas').click();

        cy.textShouldBeVisible('Data Manipulation');
        cy.textShouldBeVisible('Units');
        cy.textShouldBeVisible('Frequency');
        cy.findByText('Aggregate').should('not.exist');

        cy.findByText('Monthly').click();
        cy.findByText('Annualy').click();
        cy.textShouldBeVisible('Aggregate');
        cy.textShouldBeVisible('End of period');
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
        cy.clearInput("xLabel");
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

        cy.getByDataCy('chartType').click();
        cy.findByText('Area').click();
        cy.getByDataCy('lineStyle').should('exist');
        cy.getByDataCy('Area Fill').should('exist');
    });

    it(shouldChangeCheckboxes, () => {
        addChart();
        cy.get('canvas').click();

        cy.textShouldBeVisible('Labels Visibility');
        cy.findByText('Hide Points').click();
        cy.findByText('Hide X Label').click();
        cy.findByText('Hide Y Label').click();

        cy.getByDataCy('Hide Points').within(() => cy.get('input').should('not.be.checked'));
        cy.getByDataCy('Hide X Label').within(() => cy.get('input').should('be.checked'));
        cy.getByDataCy('Hide Y Label').within(() => cy.get('input').should('be.checked'));
    });

    it.skip(shouldValidateColors, () => { // fails in CI
        addChart();
        cy.get('canvas').click();

        cy.textShouldBeVisible('Edit Colors');
        cy.textShouldBeVisible('Plot Color');
        cy.textShouldBeVisible('X Axis Color');
        cy.textShouldBeVisible('Y Axis Color');

        cy.getByDataCy('Plot Color').click();
        cy.get('#rc-editable-input-2').click().clear().type('8898E7'); // change color to blue
        cy.get('body').click(10, 10); // close outside of color picker to apply changes

        cy.getByDataCy('Plot Color').click();
        cy.get('#rc-editable-input-12').should('have.value', '8898E7');
    });

    it(shouldManipulateData, () => {
        addChart();
        cy.get('canvas').click();

        cy.textShouldBeVisible('Data Manipulation');
        cy.textShouldBeVisible('Units');
        cy.textShouldBeVisible('Frequency');

        cy.intercept('GET', '/api/observations?id=*', { fixture: 'observations/personalSavingRate.log.json' }).as(
            'getLogObservations',
        );

        cy.getByDataCy('Units').click();
        cy.findByText('Natural Log').click();
        cy.wait('@getLogObservations').its('response.statusCode').should('eq', 200);
        cy.getByDataCy('Units')
            .invoke('text')
            .then((text) => {
                const cleanedText = text.replace(/\u200B/g, '');
                expect(cleanedText).to.equal('Natural Log');
            });

        cy.intercept('GET', '/api/observations?id=*', { fixture: 'observations/personalSavingRate.log.json' }).as(
            'getLogAnnualObservations',
        );
        cy.getByDataCy('Frequency').click();
        cy.findByText('Annualy').click();
        cy.wait('@getLogAnnualObservations').its('response.statusCode').should('eq', 200);
        cy.getByDataCy('Frequency')
            .invoke('text')
            .then((text) => {
                const cleanedText = text.replace(/\u200B/g, '');
                expect(cleanedText).to.equal('Annualy');
            });
    });

    it(shouldDeleteChart, () => {
        addChart();
        cy.get('canvas').click();

        cy.buttonValidateAndClick('Delete Chart');
        cy.findByRole('dialog').within(() => {
            cy.textShouldBeVisible('Are you sure you want to delete the chart?');
            cy.buttonValidateAndClick('Cancel');
        });

        cy.findByRole('dialog').should('not.exist');

        cy.buttonValidateAndClick('Delete Chart');
        cy.findByRole('dialog').within(() => {
            cy.textShouldBeVisible('Are you sure you want to delete the chart?');
            cy.buttonValidateAndClick('Yes');
        });

        cy.getByDataCy('chartSettingsPanel').should('have.css', 'pointer-events', 'none');
        cy.getByDataCy('chartSettingsPanel').should('have.css', 'opacity', '0.5');
        cy.get('canvas').should('not.exist');
        cy.findByRole('dialog').should('not.exist');
    });

    it(shouldEditChartsConcurrently, () => {
        // add 2 charts
        addChart();
        addChart(false);
        cy.get('canvas').should('have.length', 2);

        cy.get('canvas').then((charts) => {
            cy.wrap(charts[0]).click();
            cy.clearInput('title');
            cy.typeIntoInput('title', 'Chart 1');
            cy.buttonValidateAndClick('Apply Changes');

            // simulate long request to load first chart
            cy.intercept('GET', '/api/observations?id=PSAVERT&*', {
                fixture: 'observations/personalSavingRate.json',
                delay: 4000,
            }).as('getObservations');

            cy.findByText('Monthly').click();
            cy.findByText('Annualy').click();

            cy.wrap(charts[1]).click();

            cy.getByDataCy('Chart 1').should('be.visible'); // check loading spinner

            // edit 2nd chart while first one is loading
            cy.getByDataCy('Plot Color').click();
            cy.get('#rc-editable-input-2').click().clear().type('8898E7'); // change color to blue
            cy.get('body').click(10, 10); // close outside of color picker to apply changes
            cy.clearInput('title');
            cy.typeIntoInput('title', 'Chart 2');
            cy.clearInput('xLabel');
            cy.typeIntoInput('xLabel', 'x axis');
            cy.clearInput('yLabel');
            cy.typeIntoInput('yLabel', 'y axis');
            cy.buttonValidateAndClick('Apply Changes');

            cy.wait('@getObservations'); // wait until request for the 1st chart is completed
            cy.getByDataCy('Chart 1').should('not.exist'); // check loading spinner is gone

            cy.wrap(charts[1]).click(); // validate changes for 2nd are intact
            cy.textInputShouldHaveValue('title', 'Chart 2');
            cy.textInputShouldHaveValue('xLabel', 'x axis');
            cy.textInputShouldHaveValue('yLabel', 'y axis');
            cy.getByDataCy('Plot Color').click();
            cy.get('#rc-editable-input-12').should('have.value', '8898E7');
        });
    });

    it(shouldAddChartConcurrently, () => {
        addChart();

        cy.get('canvas').click();
        cy.intercept('GET', '/api/observations?id=PSAVERT&*', {
            fixture: 'observations/personalSavingRate.json',
            delay: 6000,
        }).as('getObservations');

        cy.findByText('Monthly').click();
        cy.findByText('Annualy').click();

        cy.getByDataCy('Personal Saving Rate').should('be.visible'); // check loading spinner

        addChart(false); // add 2nd chart while first 1 is loading
        cy.wait('@getObservations'); // wait until request for the 1st chart is completed

        cy.get('canvas').should('have.length', 2); // validate 2 charts on page

    });
});
