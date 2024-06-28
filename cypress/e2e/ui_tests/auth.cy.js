import { user } from "../../fixtures/userData";

describe('Auth Tests', () => {

    before(() => {
        cy.viewport('macbook-16');
    })

    it.skip('User should sign up for a new account', () => {
        cy.visit('/signup');
        cy.contains('Sign up')
        // fill the form
        cy.get('#name').type(user.name);
        cy.get('#username').type(user.username);
        cy.get('#email').type(user.email);
        cy.get('#password').type(user.password);
        // submit the form
        cy.get('#submit').click();
    });

    it('User should login to account', () => {
        cy.visit('/login');
        cy.contains('Login to your account')
        // fill the form
        cy.get('#username').type(user.username);
        cy.get('#password').type(user.password);
        // submit the form
        cy.get('#submit').click();
    });

});