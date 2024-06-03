describe('AddChart', () => {
    const shouldChangeLabels = 'shouldChangeLabels';
    const shouldNotChangeLabelsWhenFormIsInvalid = 'shouldNotChangeLabelsWhenFormIsInvalid';

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

    it.only(shouldChangeLabels, () => {
    });
       
});
