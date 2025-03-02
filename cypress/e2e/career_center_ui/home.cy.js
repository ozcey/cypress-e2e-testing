import { cardData } from "../../fixtures/homeData";

describe('Home Tests', {tags: ['@UI', '@e2e']}, () => {
    beforeEach(() => {
        cy.visit("/");
        cy.viewport("macbook-16");
    });

    it('User should see home page', () => {
        cy.contains('Career Planning Center');
        cy.contains('Start Your Professional Career');
        cy.contains('The first step is to submit your information');
        cy.get('.btn-secondary').contains('Apply Now')
            .should('be.visible')
            .and('have.attr', 'href', '/applicant/new')
            .as('applyNowButton');
        // verify it should take to the new applicant page after clicking Apply Now button
        cy.get('@applyNowButton').click();
        cy.url().should('include', '/applicant/new');
        cy.go('back');
    });

    it('User should see info cards on home page', () => {
        for (const card of cardData) {
            cy.get('.card-header').should('contain.text', card.card_header);
            cy.get('.card-title').should('contain.text', card.card_title);
            cy.get('.card-text').should('contain.text', card.card_text);
            // button
            cy.get('.btn').contains(card.button.name).as('button');
            cy.get("@button").realHover('mouse');
            cy.get('@button').should('have.css', 'background-color', card.button.color);
            // verify url after cliking the button
            cy.get('@button').click();
            cy.url().should('include', card.button.href);
            cy.go('back');
        };
    });
});
