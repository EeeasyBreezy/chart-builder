function getByDataCy(dataCy: string) {
    return cy.get(`[data-cy="${dataCy.replace('.', '\\.')}"]`);
}

declare global {
    namespace Cypress {
        interface Chainable {
            getByDataCy: typeof getByDataCy;
        }
    }
}

export { getByDataCy as getByDataCy };
