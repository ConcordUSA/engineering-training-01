/// <reference types="cypress" />
import faker from "faker";
import getConfigs from "../support/environment";
const { testUid } = getConfigs();
const testPrefix = "__test__";

context("Signup", () => {
  // it("Adds document to test_hello_world collection of Firestore", () => {
  //   cy.callFirestore("add", "test_hello_world", { some: "value" });
  // });
  // it("Adds document to test_hello_world collection of Firestore", () => {
  //   cy.callFirestore("add", "test_hello_world", { some: "value" });
  // });
  // successful registration
  it.skip("should navigate successfully given required data", () => {
    const password = faker.internet.password();
    cy.visit("/");
    cy.get("#createAccountBtn").click();
    cy.location("pathname").should("equal", "/createAccount");
    cy.get("#firstName").type(faker.name.firstName());
    cy.get("#lastName").type(faker.name.lastName());
    cy.get("#email").type(`${testPrefix}${faker.internet.email()}`);
    cy.get("#company").type(faker.company.companyName());
    cy.get("#companyPhone").type("123-123-1234");
    cy.get("#personalPhone").type("123-123-1235");
    cy.get("#password").type(password);
    cy.get("#passwordConfirm").type(password);
    cy.get("#registerButton").click();
    // todo: search for emailVerification
    cy.location("pathname").should("equal", "/");
    // CLEANUP
    // TODO: delete the user that was made
  });

  // TODO: have unverified user created with a test id....if not verified, should see email verification screen

  // it.skip("should not register successfully given non-matching passwords", () => {});
  // it.skip("should not register successfully given bad data", () => {});
  // it.skip("should not register successfully given missing data", () => {});

  it.skip("should display the emailVerification view when logged in without email being verified", () => {
    // TODO: Figure out how to make this happen :)
    cy.visit("/emailVerification");
    cy.location("pathname").should("equal", "/emailVerification");
  });
});

context("Signin", () => {
  // successful login
  // unsuccessful login (missing required fields)
  it("should navigate to the home screen when logging in with email verified user", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("/signout");
    // cy.visit("/");
    cy.get("#email").type("adam.schnaare@concordusa.com");
    cy.get("#password").type("password");
    cy.get("#loginBtn").click();
    cy.location("pathname").should("equal", "/");
  });
});
