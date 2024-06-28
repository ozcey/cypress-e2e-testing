const user_id = '';

const user = {
    name: 'David Markson',
    username: 'davidn',
    email: 'davidn@gmail.com',
    password: 'password',
    roles: ['ROLE_USER']
}

describe.skip('end to end user api', () => {
    before(() => {
         cy.request('POST', '/auth/signup', user).then((res) => {
             console.log(res.body);
             expect(res.status).to.equal(200);
             expect(res.body).has.property('message', 'User registered successfully.');
         });

        cy.login(user.username, user.password);
       
    });

    beforeEach(() => {
        const auth = `Bearer ${Cypress.env('token')}`;
    })

     it('find user by email', () => {
         cy.request('GET', `/users/email/${user.email}`).then((res) => {
             expect(res.status).to.equal(200);
             expect(res.body).to.have.property('name');
             expect(res.body).to.have.property('id');
             user_id = res.body.id;
         });
     });

    it('update an existing user', () => {
       const updatedUser = {
           id: user_id,
           name: 'David Kane Markson',
           username: 'davidn',
           email: 'davidn@gmail.com',
           password: '12345678',
           roles: ['ROLE_USER']
       };
       const options = {
           method: 'PUT',
           url: '/users/update',
           body: updatedUser,
           headers: {
                auth
           }
       };
        cy.request(options).then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body).has.property('name', updatedUser.name);
            expect(res.body).has.property('password', updatedUser.password);
        });
    });

    it('find user by id', () => {
        cy.request('GET', `/users/id/${user_id}`).then((res) => {
             expect(res.status).to.equal(200);
             expect(res.body).to.have.property('name');
             expect(res.body).to.have.property('id');
        });
    });

    it('delete user by id', () => {
        cy.request('DELETE', `/users/delete/${user_id}`).then((res) => {
            expect(res.status).to.equal(200);
             expect(res.body).has.property('message', 'User deleted successfully.');
        });
    });
})