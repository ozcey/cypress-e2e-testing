/// <reference types="cypress" />
import { applicant, programOfferings } from "../../fixtures/applicantData";

describe("Applicant Tests", {tags: ['@UI', '@e2e']}, () => {
    beforeEach(() => {
        cy.visit("/applicant");
        cy.viewport("macbook-16");
    });

    it("Applicant should see applicant home page", () => {
        cy.contains("Applicant Home");
        cy.contains("Career Center’s FREE Career Coaching Program connects");
        cy.get(".btn-primary").should("contain.text", "Apply now");
    });

    it("Applicant should sign up successfully", () => {
        cy.contains("Applicant Home");
        cy.get(".btn-primary").should("contain.text", "Apply now").click();
        // Contact Info
        cy.get("#first_name").type(applicant.first_name);
        cy.get("#last_name").type(applicant.last_name);
        cy.get("#phone").type(applicant.phone);
        cy.get("#email").type(applicant.email);
        cy.get("#next_1").click();

        // Address info
        cy.get("#street").type(applicant.address.street);
        cy.get("#city").type(applicant.address.city);
        cy.get("#state").type(applicant.address.state);
        cy.get("#zipcode").type(applicant.address.zipcode);
        cy.get("#next_2").click();

        // Job info
        cy.get("#category").click();
        cy.wait(2000);
        cy.get("#mat-option-0 > .mat-option-text").click();
        cy.get("#age").type(applicant.age);
        cy.get("#gender").click();
        cy.wait(2000);
        cy.get("#mat-option-3 > .mat-option-text").click();
        cy.get("#degree").type(applicant.degree);
        cy.get("#languages").click();
        cy.wait(2000);
        cy.get("#mat-option-5 > .mat-option-text").click();
        cy.get("#next_3").click();

        // Submit
        cy.get("#submit").click();
        cy.get(".alert").contains("Applicant created successfully.");
        cy.get("#submit").should("be.disabled");
    });

    it("Applicant should see Program Offerings section on home page", () => {
        cy.contains("Applicant Home");
        cy.contains("Career Center’s FREE Career Coaching Program connects");
        cy.get(".btn-primary").should("be.visible");
        // program offerings section
        cy.contains("Program Offerings");
        cy.get(".mat-tab-group").within(() => {
            // verify program titles
            cy.get(".mat-tab-label-content").each(($title, i) => {
                cy.wrap($title).should("contain.text", programOfferings.titles[i]);
            });
            //   verify content
            const contentData = programOfferings.contentData;
            for (let i = 0; i < contentData.length; i++) {
                const content = contentData[i];
                cy.get(".mat-card-title").should("contain.text", content.title);
                cy.get(".mat-card-content").should("contain.text", content.content);
                if (i === 1) break;
                // click 1:1 Career Coaching card
                cy.get(".mat-tab-label-content").contains('1:1 Career Coaching').click();
            };
        });
    });
});
