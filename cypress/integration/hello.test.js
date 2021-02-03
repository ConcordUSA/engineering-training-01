/// <reference types="cypress" />

context("Actions", () => {
  it("should login", () => {
    //signup:
    //navigate to page
    cy.visit("/");
    //find login button
    //click login
    cy.get("#loginButton").click();
    cy.location("pathname").should("equal", "/login")
    //click create account button
    cy.get("#createAccountButton").click();
    cy.location("pathname").should("equal", "/createAccount")
    //enter first name
    cy.get("#firstNameField").type("Max");
    //enter last name
    cy.get("#lastNameField").type("Longchamp");
    //enter email
    cy.get("#emailField").type("max.longchamp@concordusa.com");
    //enter company
    cy.get("#companyField").type("Concord");
    //enter phone
    cy.get("#phoneField").type("555-555-5555");
    //enter password
    cy.get("#passwordField").type("securepassword");
    //enter password confirmation
    cy.get("#passwordConfirmField").type("securepassword");
    //click register button
    cy.get("#registerButton").click();
    //back to home
    cy.location("pathname").should("equal", "/")




  });
});
