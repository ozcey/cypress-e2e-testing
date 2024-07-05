import { volunteer, cardData } from "../../fixtures/volunteerData";

describe('Volunteer Tests', {tags: ['@UI', '@e2e']}, () => {

    beforeEach(() => {
        cy.visit('/volunteer');
        cy.viewport('macbook-16');
    })

    it('Volunteer should see volunteer home page', () => {
        cy.contains('Volunteer Home');
        cy.contains("Volunteers play a critical role in transforming job");
        cy.get('.btn-primary')
            .should('contain.text', 'Sign up')
    });

    it('Volunteer should sign up successfully', () => {
        cy.contains('Volunteer Home');
        cy.get('.btn-primary')
            .should('contain.text', 'Sign up')
            .click();
        // form fields
        cy.contains('Volunteer Sign Up Form');
        cy.get('#name').type(volunteer.name);
        cy.get('#email').type(volunteer.email);
        cy.get('#phone').type(volunteer.phone);
        cy.get('#jobTitle').type(volunteer.job_title);
        cy.get('#industry').type(volunteer.industry);
        cy.get('#areaOfInterest').type(volunteer.area_of_interest);
        cy.get('#submitButton')
            .should('contain.text', 'Submit')
            .click();
        // verify success message
        cy.get('#successMessage')
            .should('contain.text', 'Volunteer created successfully.');
        cy.get('.close').click();
    });

    it('Volunteer should see Opportunities section on home page', () => {
        cy.contains('Volunteer Home');
        // Opportunities section
        cy.contains('Volunteering With Job Seekers').scrollIntoView();
        cy.contains('Opportunities');
        cy.contains('Below are opportunities for important individual volunteering');
        // Opportunities cards
        for(const card of cardData){
            cy.get('.row').within(() => {
                cy.get('.card-title').should('contain.text', card.title);
                cy.get('.card-text').should('contain.text', card.description);
                cy.get('.text-muted').should('contain.text', 'Time-Commitment').as('time');
                cy.get('@time').find('strong').should('contain.text', card.time_commitment);
            });
        }
    })

})