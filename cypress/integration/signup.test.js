/// <reference types="cypress" />
import faker from "faker";

context("Signup", () => {
  // successful registration
  it("should register successfully given required data", () => {
    const password = faker.internet.password();
    cy.visit("/");
    cy.get("#loginButton").click();
    cy.location("pathname").should("equal", "/login");
    cy.get("#createAccountButton").click();
    cy.location("pathname").should("equal", "/createAccount");
    cy.get("#firstName").type(faker.name.firstName());
    cy.get("#lastName").type(faker.name.lastName());
    cy.get("#email").type(faker.internet.email());
    cy.get("#company").type(faker.company.companyName());
    cy.get("#companyPhone").type(faker.phone.phoneNumber());
    cy.get("#personalPhone").type(faker.phone.phoneNumber());
    cy.get("#password").type(password);
    cy.get("#passwordConfirm").type(password);
    cy.get("#registerButton").click();
    cy.location("pathname").should("equal", "/");

    // CLEANUP
    // TODO: delete the user that was made (research on how to clear all data from emulators)
  });

  // unsuccessful registration (not-unique email)
  it.skip("should not register successfully given bad data", () => {});
  // unsuccessful registration (missing required fields)
  it.skip("should not register successfully given missing data", () => {});
});

// TODO Seed db with login info
// successful login
// unsuccessful login (missing required fields)
