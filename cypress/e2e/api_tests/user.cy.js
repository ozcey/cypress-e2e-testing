
/// <reference types="Cypress" />
import { user, new_user, updated_user } from '../../fixtures/userDataForAPI';

const proerties = ['name', 'email', 'username', 'role']
let newUserId;
describe('User API Tests', () => {
    before(() => {
        cy.register(user);
        cy.login(user.email, user.password);
    });

    after(() => {
        cy.api({
            method: 'DELETE',
            url: '/user/delete/' + Cypress.env('user_id'),
            failOnStatusCode: false,
            headers: {
                'Authorization': `Bearer ${Cypress.env('token')}`
            }
        }).then((res) => {
            console.log('res', res);
            expect(res.status).equal(200);
            expect(res.body).to.have.property('message', 'User deleted successfully!');
        });
    });

    it('Admin user can retrieve all users', () => {
        cy.api({
            method: 'GET',
            url: '/user',
            failOnStatusCode: false,
            headers: {
                'Authorization': `Bearer ${Cypress.env('token')}`
            }
        }).then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('users');
        });
    });

    it('Admin user can retrieve an user by id', () => {
        cy.api({
            method: 'GET',
            url: '/user/' + Cypress.env('user_id'),
            failOnStatusCode: false,
            headers: {
                'Authorization': `Bearer ${Cypress.env('token')}`
            }
        }).then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('user');
            const user_data = res.body.user;
            for (const property in user_data) {
                if (proerties.includes(property)) {
                    expect(user_data[property]).to.equal(user[property]);
                }
            }
        });
    });

    it('Admin user can create a new user', () => {
        cy.api({
            method: 'POST',
            url: '/user/create',
            body: new_user,
            failOnStatusCode: false,
            headers: {
                'Authorization': `Bearer ${Cypress.env('token')}`
            }
        }).then((res) => {
            const { body } = res;
            expect(res.status).equal(201);
            expect(body.data).to.have.property('id');
            const user_data = res.body.data;
            for (const property in user_data) {
                if (proerties.includes(property)) {
                    expect(user_data[property]).to.equal(new_user[property]);
                }
            }
            newUserId = body.data.id;
        });
    });


    it('Admin user can update an existing user', () => {
        cy.api({
            method: 'PUT',
            url: '/user/update/' + newUserId,
            body: updated_user,
            failOnStatusCode: false,
            headers: {
                'Authorization': `Bearer ${Cypress.env('token')}`
            }
        }).then((res) => {
            expect(res.status).equal(200);
            expect(res.body).to.have.property('message', 'User updated successfully!');
        });
    });


    it('Admin user can delete account', () => {
        cy.api({
            method: 'DELETE',
            url: '/user/delete/' + newUserId,
            failOnStatusCode: false,
            headers: {
                'Authorization': `Bearer ${Cypress.env('token')}`
            }
        }).then((res) => {
            expect(res.status).equal(200);
            expect(res.body).to.have.property('message', 'User deleted successfully!');
        });
    });
})