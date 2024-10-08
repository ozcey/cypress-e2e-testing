/// <reference types="Cypress" />
import { user } from '../../fixtures/userDataForAPI.js';

let userId, token;

describe('Auth API Tests', () => {

    it('User can register a new account', () => {
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
            userId = body.data.id;
        });
    });

    it('User can log in to account', () => {
        const body = {
            "email": user.email,
            "password": user.password
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
            token = body.token;
        });
    });

    it('User can retrieve logged in user details', () => {
        cy.api({
            method: 'GET',
            url: '/auth/me',
            failOnStatusCode: false,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            expect(res.status).equal(200);
            expect(res.body).to.have.property('data');
            const { data } = res.body;
            expect(data).to.have.property('email', user.email);
            expect(data).to.have.property('name', user.name);
            expect(data).to.have.property('id', userId);
        });
    });


    it('User can update details', () => {
        const body = {
            "email": 'john@gmail.com',
            "name": 'John Walker'
        };

        cy.api({
            method: 'PUT',
            url: '/auth/updatedetails',
            body: body,
            failOnStatusCode: false,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            const { body } = res;
            expect(res.status).equal(200);
            expect(body).to.have.property('message', 'User details updated successfully!');
        });
    });

    it('User can update password', () => {
        const body = {
            "currentPassword": user.password,
            "newPassword": '12345678'
        };

        cy.api({
            method: 'PUT',
            url: '/auth/updatepassword',
            body: body,
            failOnStatusCode: false,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            const { body } = res;
            expect(res.status).equal(200);
            expect(body).to.have.property('message', 'User password updated successfully!');
        });
    });

    it('User can delete account', () => {
        cy.api({
            method: 'DELETE',
            url: '/user/delete/' + userId,
            failOnStatusCode: false,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            expect(res.status).equal(200);
            expect(res.body).to.have.property('message', 'User deleted successfully!');
        });
    });
})