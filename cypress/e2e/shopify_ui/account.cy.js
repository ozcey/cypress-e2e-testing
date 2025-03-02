describe(
  "Shopify Account Tests",
  { tags: ["@ShopifyUI", "@Shopifye2e"] },
  () => {
    beforeEach(() => {
      cy.shopifyLogin("admin", "password");
      cy.viewport("macbook-16");
    });

    it("User should see account information", () => {
      const user = {
        name: "Admin User",
        username: "admin",
        email: "admin@example.com",
        password: "password",
      };
      cy.get(".card-title").should("have.text", "Account Information");

      cy.get(".card-body").children(".row").as("accountInfo");
      cy.get("@accountInfo").contains(user.name);
      cy.get("@accountInfo").contains(user.email);

      cy.get("form")
        .children(".row")
        .within(() => {
          cy.get(".form-label").should("contains.text", "Username");
          cy.get("#username").should(
            "have.attr",
            "ng-reflect-model",
            user.username
          );
          for(const key in user){
            cy.get(`#${key}`).as('input');
            cy.get('@input').should('have.attr', 'ng-reflect-model', user[key]);
            cy.get('@input').siblings('.form-label').should('have.text', key.charAt(0).toUpperCase() + key.slice(1) + ':');
          }
        });
    });
  }
);
