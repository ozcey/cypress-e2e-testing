import { admin_user } from "../../fixtures/userData";

describe('Auth Tests', {tags: ['@UI', '@e2e']}, () => {

    before(() => {
        cy.visit('/login');
        cy.viewport('macbook-16');
    })

    it('User should login to account', () => {
        cy.contains('Log in to your account')
        // fill the form
        cy.get('#username').type(admin_user.username);
        cy.get('#password').type(admin_user.password);
        // submit the form
        cy.get('#submit').click();
        // user should be taken to user page
        cy.contains('User Home');
        cy.contains("User play a critical role in transforming job seekers’ lives ");
        cy.get('#logout').click();
    });

    it('User should get an error message when logging via invalid credentails', () => {
        cy.contains('Log in to your account')
        // fill the form
        cy.get('#username').type("abc12345");
        cy.get('#password').type("1234567890");
        // submit the form
        cy.get('#submit').click();
        cy.get('.alert').should('contain.text', 'Please enter a valid email and password!');
        cy.get('.alert').find('.close').click();
    });

    it('User should get an error message when logging via username that is less than 3 characters', () => {
        cy.contains('Log in to your account')
        cy.reload();
        // fill the form
        cy.get('#username').type("ab");
        cy.get('#submit').click();
        cy.get('.mat-error').should('contain.text', 'Invalid or missing username');
    });

    it('User should get an error message when logging via password that is less than 6 characters', () => {
        cy.contains('Log in to your account')
        cy.reload();
        // fill the form
        cy.get('#password').type("12345");
        cy.get('#submit').click();
        cy.get('.mat-error').should('contain.text', 'Missing password!');
    });

});