

describe('Shopify Sign up Tests', { tags: ['@ShopifyUI', '@Shopifye2e'] }, () => {

    beforeEach(() => {
        cy.visit('/signup');
        cy.viewport('macbook-16');
    });

    it('User should sign up successfully', () => {
        const user = {
            "name": "Mike Scott",
            "username": "mikescott",
            "email": "mikes@gmail.com",
            "password": "password"
        };
        cy.contains('Sign Up');
        // fill the form
        cy.get('#name').type(user.name);
        cy.get('#username').type(user.username);
        cy.get('#email').type(user.email);
        cy.get('#password').type(user.password);
        cy.get('.btn').contains('Sign Up').click();
        cy.get('.alert').should('have.text', 'Sign up successful');
    });
});

describe('Shopify Login Tests', { tags: ['@ShopifyUI', '@Shopifye2e'] }, () => {

    beforeEach(() => {
        cy.visit('/login');
        cy.viewport('macbook-16');
    });

    it('User should log in successfully', () => {
        const user = {
            "username": "admin",
            "password": "password"
        };
        cy.contains('Login');
        cy.get('.btn').contains('Login').as('loginBtn');
        cy.get('@loginBtn').should('be.disabled');
        // fill the form
        cy.get('#username').type(user.username);
        cy.get('#password').type(user.password);
        cy.get('@loginBtn').should('be.enabled').click();

        cy.url().should('include', '/account');
        cy.get('.card-title').should('have.text', 'Account Information');
        cy.get('.form-label').should('contains.text', 'Username');
        cy.get('#username').should('have.attr', 'ng-reflect-model', user.username);
    });
});