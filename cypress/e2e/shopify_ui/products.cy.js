describe(
  "Shopify Products Tests",
  { tags: ["@ShopifyUI", "@Shopifye2e"] },
  () => {
    beforeEach(() => {
      cy.visit("/product");
      cy.viewport("macbook-16");
    });

    it("User should see products home page", () => {
      cy.contains("Our Products");

      const products = [
        {
          name: "Sneakers",
          description: "Casual sneakers",
          demographic: "Unisex",
          price: "$60",
        },
        {
          name: "Boots",
          description: "Leather boots",
          demographic: "Unisex",
          price: "$80",
        },
      ];

      for (const product of products) {
        cy.get(".card-title")
          .contains(product.name)
          .parent(".card-body")
          .as("productCard");

        cy.get("@productCard")
          .find(".card-text")
          .should("contain.text", product.description);

        cy.get("@productCard")
          .find(".card-text")
          .should("contain.text", product.demographic);

        cy.get("@productCard")
          .find(".card-text")
          .should("contain.text", product.price);

        cy.get("@productCard")
          .find("button")
          .should("be.visible")
          .and("be.enabled")
          .and("contain.text", "Add to Cart");
      };
    });
  }
);
