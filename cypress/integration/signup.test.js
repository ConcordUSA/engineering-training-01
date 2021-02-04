/// <reference types="cypress" />
import faker from "faker";

context("Signup", () => {
  // successful login
  // unsuccessful registration (not-unique email)
  // unsuccessful registration (missing required fields)
  // unsuccessful login (missing required fields)

  // successful registration
  it("should register successfully when given required data", () => {
    const password = faker.internet.password();
    //signup:
    //navigate to page
    cy.visit("/");
    //find login button
    //click login
    cy.get("#loginButton").click();
    cy.location("pathname").should("equal", "/login");
    //click create account button
    cy.get("#createAccountButton").click();
    cy.location("pathname").should("equal", "/createAccount");
    //enter first name
    cy.get("#firstName").type(faker.name.firstName());
    //enter last name
    cy.get("#lastName").type(faker.name.lastName());
    //enter email
    cy.get("#email").type(faker.internet.email());
    //enter company
    cy.get("#company").type(faker.company.companyName());
    //enter phone(s)
    cy.get("#companyPhone").type(faker.phone.phoneNumber());
    cy.get("#personalPhone").type(faker.phone.phoneNumber());
    //enter password
    cy.get("#password").type(password);
    //enter password confirmation
    cy.get("#passwordConfirm").type(password);
    //click register button
    cy.get("#registerButton").click();
    //back to home
    cy.location("pathname").should("equal", "/");

    // CLEANUP
    // TODO: delete the user that was made (research on how to clear all data from emulators)
  });
});
