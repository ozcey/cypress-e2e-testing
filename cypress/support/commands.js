// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('register', () => {
    const requestBody = {
        "name": "Admin User",
        "username": "Admin",
        "password": "password",
        "role": "ROLE_ADMIN"
    };
    cy.request({
        method: 'POST',
        url: '/auth/register',
        body: requestBody,
        failOnStatusCode: false
    }).then((res) => {
        const { body } = res;
        expect(res.status).equal(201);
        expect(body).to.have.property('id');
        expect(body).to.have.property('username', body.username);
        Cypress.env('user_id', body.id);
        Cypress.env('username', requestBody.username);
        Cypress.env('password', requestBody.password);
    });
});

Cypress.Commands.add('login', () => {
    const body = {
        "username": Cypress.env('username'),
        "password": Cypress.env('password')
    };

    cy.request({
        method: 'POST',
        url: '/auth/login',
        body: body,
        failOnStatusCode: false
    }).then((res) => {
        const { body } = res;
        expect(res.status).equal(200);
        expect(body).to.have.property('token');
        Cypress.env('token', body.token);
    });

});
