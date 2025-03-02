import { filterData, cardsData } from "../../fixtures/coursesData";

describe("Courses Tests", { tags: ["@UI", "@e2e"] }, () => {
    before(() => {
        cy.visit("/courses");
        cy.viewport("macbook-16");
    });

    it("User should see filter options on the courses page", () => {
        cy.contains("Courses");
        cy.contains(
            "Apply to Career Center today! Learn more about the tuition-free training we offer and apply to IT courses that will help launch your career in tech."
        );

        cy.get('.col-md-3').within(() => {
            cy.contains('Filter Courses');
            cy.get('.mb-3').each(($filter, i) => {
                // filter category
                cy.wrap($filter).find('.form-label').should('contain.text', filterData[i].filter_by);
                // filter option
                cy.wrap($filter).find('.form-check-label').each(($filter_option, j) => {
                    cy.wrap($filter_option).should('contain.text', filterData[i].values[j]);
                })
            });
        });
    });

    it('User should see courses on the courses page', () => {
        for(const card of cardsData){
            cy.get('.card-title').contains(card.name).parents('.card-body').as('cardBody');
            cy.get('@cardBody').within(() => {
                cy.get('.card-text').should('contain.text', card.description);
                cy.get('#category').should('contain.text', card.category);
                cy.get('#certifications').should('contain.text', card.certifications);
                cy.get('#partners').should('contain.text', card.partners);
                cy.get('#venues').should('contain.text', card.venues);
                cy.get('#start_date').should('contain.text', card.start_date);
            });
        }
    });

    it('User should filter courses by Venue, Category, or Certification', () => {
        const filterOptions = {
            'venues': 'Remote',
            'category': 'Software Engineering',
            'certifications': 'AWS Certified Cloud Practitioner'
        };
        cy.contains('Filter Courses');

        for (const option in filterOptions) {
            const filterOption = filterOptions[option];
            cy.get('.form-check-label').contains(filterOption).siblings('.form-check-input').as('filterBy');
            cy.get('@filterBy').click();
            // verify all cards have the filter option
            cy.get('.card-body').each(($card) => {
                cy.wrap($card).find(`#${option}`).should('contain.text', filterOption);
            })
            cy.get('@filterBy').click();
        };
    });

    it('User should filter courses by two or more options', () => {
        const filterOptions = {
            'venues': 'Hybrid',
            'category': 'Cybersecurity',
            'certifications': 'CompTIA CySA+'
        };
        cy.contains('Filter Courses');
        // click all three options
        for (const option of Object.keys(filterOptions)) {
            cy.get('.form-check-label').contains(filterOptions[option]).siblings('.form-check-input').as(option);
            cy.get(`@${option}`).click();
        };
        // verify all cards have the filter option
        cy.get('.card-body').each(($card) => {
            for (const option in filterOptions) {
                const filterOption = filterOptions[option];
                cy.wrap($card).find(`#${option}`).should('contain.text', filterOption);
            };
        })

        // unclick all three options
        for (const option of Object.keys(filterOptions)) {
            cy.get(`@${option}`).click();
        };
    });
});
