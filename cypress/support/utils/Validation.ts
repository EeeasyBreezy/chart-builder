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
        cy.textShouldBeVisible('Start typing to search for a dataset');
        cy.textShouldBeVisible(
            'Data is provided by Federal Reserve Economic Data (FRED), Federal Reserve Bank of St. Louis',
        );
        cy.textShouldBeVisible('https://fred.stlouisfed.org/');
        cy.getByDataCy('chartAutocomplete').within(() => cy.findByLabelText('Dataset*').should('be.visible'));
        cy.getByDataCy('editTitle').within(() => cy.findByLabelText('Title*').should('be.visible'));
        cy.getByDataCy('editXLabel').within(() => cy.findByLabelText('X Axis*').should('be.visible'));
        cy.getByDataCy('editYLabel').within(() => cy.findByLabelText('Y Axis*').should('be.visible'));

        cy.textInputShouldBeDisabled('editTitle');
        cy.textInputShouldBeDisabled('editXLabel');
        cy.textInputShouldBeDisabled('editYLabel');
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
