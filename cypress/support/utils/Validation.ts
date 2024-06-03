export function validateLabelInput(title: string, xLabel: string, yLabel: string) {
    cy.textInputShouldHaveValue('title', title);
    cy.textInputShouldHaveValue('xLabel', xLabel);
    cy.textInputShouldHaveValue('yLabel', yLabel);
}

export function validateInitialAddChartDialogState() {
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
}

export function validateFilledAddChartDialogState() {
    // validate dialog state after selecting a chart
    // inputs enabled and filled with values
    cy.findByRole('dialog').within(() => {
        cy.textInputShouldBeEnabled('editTitle');
        cy.textInputShouldBeEnabled('editXLabel');
        cy.textInputShouldBeEnabled('editYLabel');

        validateLabelInput('Personal Saving Rate', 'Date', 'Percent');
    });
}

