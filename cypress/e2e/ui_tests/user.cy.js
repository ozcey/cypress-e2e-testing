import { user, user2 } from "../../fixtures/userData";

describe('User Tests', () => {
    before(() => {
        // sign up as admin using api
        // cy.request({
        //     method: 'POST',
        //     url: 'http://localhost:5000/career-center/api/auth/signup',
        //     body: user,
        //     failOnStatusCode: false
        // }).then((res) => {
        //     expect(res.status).equal(200);
        //     expect(res.body.message).to.equal('User registered successfully.');
        // });

        // login as admin
        cy.loginViaUI(user.username, user.password)
    });

    it('User should create a new user', () => {
        cy.get('#create_user').click();
        cy.contains('Create User');
        // fill the form
        cy.get('#name').type(user2.name);
        cy.get('#username').type(user2.username);
        cy.get('#email').type(user2.email);
        cy.get('#password').type(user2.password);
        cy.get('#roles').click();
        cy.contains(user2.role).click()
        // submit the form
        cy.get('#submit').click();
    });
});