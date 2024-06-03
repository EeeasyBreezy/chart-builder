import { validateFilledAddChartDialogState, validateInitialAddChartDialogState } from "./Validation";


export function addChart() {
    cy.buttonValidateAndClick('Add Chart');
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
}
