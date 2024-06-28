/// <reference types="cypress" />
import { volunteer } from "../../fixtures/volunteerData";

describe('Volunteer Tests', () => {

    beforeEach(() => {
        cy.visit('/volunteer');
        cy.viewport('macbook-16');
    })

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
        cy.get('#close').click();
    });

})