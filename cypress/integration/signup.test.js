/// <reference types="cypress" />
import faker from "faker";
const testId = "00test00";

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
    cy.get("#email").type(`${testId}${faker.internet.email()}`);
    cy.get("#company").type(faker.company.companyName());
    cy.get("#companyPhone").type("123-123-1234");
    cy.get("#personalPhone").type("123-123-1235");
    cy.get("#password").type(password);
    cy.get("#passwordConfirm").type(password);
    cy.get("#registerButton").click();
    cy.location("pathname").should("equal", "/");

    // CLEANUP
    // TODO: delete the user that was made
  });

  // unsuccessful registration (passwords don't match)
  it("should not register successfully given non-matching passwords", () => {
    const password = faker.internet.password();
    cy.visit("/");
    cy.get("#loginButton").click();
    cy.location("pathname").should("equal", "/login");
    cy.get("#createAccountButton").click();
    cy.location("pathname").should("equal", "/createAccount");
    cy.get("#firstName").type(faker.name.firstName());
    cy.get("#lastName").type(faker.name.lastName());
    cy.get("#email").type(`${testId}${faker.internet.email()}`);
    cy.get("#company").type(faker.company.companyName());
    cy.get("#companyPhone").type("123-123-1234");
    cy.get("#personalPhone").type("123-123-1235");
    cy.get("#password").type(password);
    cy.get("#passwordConfirm").type("password");
    cy.get("#registerButton").click();
    // TODO: look for whatever else we decide shows up in the UI
    cy.location("pathname").should("equal", "/createAccount");
  });
  // unsuccessful registration (not-unique email)
  it.skip("should not register successfully given bad data", () => {});
  // unsuccessful registration (missing required fields)
  it.skip("should not register successfully given missing data", () => {});

  it("should display the emailVerification view when logged in without email being verified", () => {
    // TODO: Figure out how to make this happen :)
    cy.visit("/emailVerification");
    cy.location("pathname").should("equal", "/emailVerification");
  });
});

context("Signin", () => {
  // successful login
  // unsuccessful login (missing required fields)
});
