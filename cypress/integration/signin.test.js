/// <reference types="cypress" />
import faker from "faker";

describe("Signin", () => {
  before(() => {});

  beforeEach(() => {
    cy.visit("/", { timeout: 100000 });
    cy.clearAuth();
    cy.reload(true);
  });

  afterEach(() => {
    cy.signOut();
  });

  it("should navigate to the home screen when logging in with email verified user", () => {
    const email = faker.internet.email().toLowerCase();
    const password = faker.internet.password();

    cy.createUser(email, password).then(function () {
      cy.verifyUserEmail(email).then(function () {
        cy.signOut().then(function () {
          cy.get("#email").type(email);
          cy.get("#password").type(password);
          cy.get("#loginBtn").click();
          cy.location("pathname").should("equal", "/events");
        });
      });
    });
  });

  it.only("should show an error when logging in with invalid credentials", () => {
    const email = faker.internet.email().toLowerCase();
    const password = faker.internet.password();

    cy.createUser(email, password).then(function () {
      cy.verifyUserEmail(email).then(function () {
        cy.signOut().then(function () {
          cy.get("#email").type(email);
          cy.get("#password").type("somethingincorrect");
          cy.get("#loginBtn").click();
          cy.get("#messages").should("exist");
          cy.location("pathname").should("equal", "/");
        });
      });
    });
  });

  it("should show the email verification view if not verified", () => {
    const email = faker.internet.email().toLowerCase();
    const password = faker.internet.password();

    cy.createUser(email, password).then(function () {
      cy.verifyUserEmail(email).then(function () {
        cy.location("pathname").should("equal", "/");
        cy.get("#sendEmailBtn").should("exist");
      });
    });
  });

  it("should logout the user when clicking the logout button", () => {
    const email = faker.internet.email().toLowerCase();
    const password = faker.internet.password();

    cy.createUser(email, password).then(function () {
      cy.verifyUserEmail(email).then(function () {
        cy.signOut().then(function () {
          cy.get("#email").type(email);
          cy.get("#password").type(password);
          cy.get("#loginBtn").click();
          cy.get("#signoutBtn").click();
          cy.location("pathname").should("equal", "/");
        });
      });
    });
  });

  it("should store the email if remember me is checked", () => {
    const email = faker.internet.email().toLowerCase();
    const password = faker.internet.password();

    cy.createUser(email, password).then(function () {
      cy.verifyUserEmail(email).then(function () {
        cy.signOut().then(function () {
          cy.get("#email").type(email);
          cy.get("#password").type(password);
          cy.get("#rememberCheckBox").click();
          cy.get("#loginBtn")
            .click()
            .should(() => {
              expect(localStorage.getItem("fourSeasonsEmail")).to.eq(email);
            });
        });
      });
    });
  });
});
