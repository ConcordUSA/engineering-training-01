/// <reference types="cypress" />

context("Actions", () => {
  it("should login", () => {
    cy.visit("/");
    cy.get("p").contains("Hello World");
  });
});
