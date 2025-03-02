import { user2, admin_user } from "../../fixtures/userData";

describe('User Tests', {tags: ['@UI', '@e2e']}, () => {
    beforeEach(() => {
        // login as admin
        cy.loginViaUI(admin_user.username, admin_user.password);
        cy.viewport('macbook-15');
    });

    it('Admin user should see the user table', () => {
        cy.contains('User Home');
        cy.contains("User play a critical role in transforming job seekers’ lives ");

        cy.get('table').should('exist');
        // verify table headers
        const headers = ['No', 'Name', 'Email', 'Username', 'Actions'];
        cy.get('th').each(($header, i) => {
            cy.wrap($header).should('contain.text', headers[i]);
        });
        // verify admin user in the table
        cy.get('.mat-column-email').contains(admin_user.email).parent().as('column');
        cy.get('@column').find('.mat-column-name').should('contain', admin_user.name);
        cy.get('@column').find('.mat-column-username').should('contain', admin_user.username);
    });

    it('Admin user should create a new user', () => {
        cy.contains('User Home');
        cy.contains("User play a critical role in transforming job seekers’ lives ");
        cy.get('#create_user').click();
        cy.contains('Create User');
        // fill the form
        cy.get('#name').type(user2.name);
        cy.get('.mat-form-field-infix > #username').type(user2.username);
        cy.get('#email').type(user2.email);
        cy.get('#password').type(user2.password);
        cy.get('#roles').click();
        cy.contains(user2.role).click()
        // submit the form
        cy.get('#submitButton').click();
        cy.get('.alert').contains('User created successfully');
        cy.get('.close').click();
    });

    it('Admin user should see new user added to table', () => {
        cy.contains('User Home');
        cy.contains("User play a critical role in transforming job seekers’ lives ");
        // verify table headers
        const headers = ['No', 'Name', 'Email', 'Username', 'Actions'];
        cy.get('th').each(($header, i) => {
            cy.wrap($header).should('contain.text', headers[i]);
        });
        // verify user in the table
        cy.get('.mat-column-email').contains(user2.email).parent().as('column');
        cy.get('@column').find('.mat-column-name').should('contain', user2.name);
        cy.get('@column').find('.mat-column-username').should('contain', user2.username);
    });

    it('Admin user should delete the user', () => {
        cy.contains('User Home');
        cy.contains("User play a critical role in transforming job seekers’ lives ");
        // verify table headers
        const headers = ['No', 'Name', 'Email', 'Username', 'Actions'];
        cy.get('th').each(($header, i) => {
            cy.wrap($header).should('contain.text', headers[i]);
        });
        // verify user in the table
        cy.get('.mat-column-email').contains(user2.email).parent().as('column');
        cy.get('@column').find('.mat-icon').contains('delete').as('deleteButton');
        cy.get('@deleteButton').click();
        cy.get('app-user-modal').should('exist').and('be.visible').as('modal');
        cy.get('@modal').should('contain.text', 'Delete').and('contain.text', 'Are you sure?');
        cy.get('@modal').find('button').contains('Yes').click();
        cy.get('.mat-snack-bar-container').should('contain.text', 'User deleted successfully!').as('message');
        cy.get('@message').contains('Close').click();
    });
});