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

Cypress.Commands.add('register', (user) => {
    cy.api({
        method: 'POST',
        url: '/auth/register',
        body: user,
        failOnStatusCode: false
    }).then((res) => {
        const { body } = res;
        expect(res.status).equal(201);
        expect(body.data).to.have.property('id');
        expect(body.data).to.have.property('email', user.email);
        Cypress.env('user_id', body.data.id);
    });
});

Cypress.Commands.add('login', (email, password) => {
    const body = {
        "email": email,
        "password": password
    };

    cy.api({
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
