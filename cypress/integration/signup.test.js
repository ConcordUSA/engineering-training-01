/// <reference types="cypress" />
import faker from "faker";

describe("Signup", () => {
  const generateUser = () => {
    return {
      uid: faker.random.uuid(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      company: faker.company.companyName(),
      companyPhone: faker.phone.phoneNumber(),
      personalPhone: faker.phone.phoneNumber(),
      password: faker.internet.password(),
      isAdmin: false,
    };
  };
  before(() => {});

  beforeEach(() => {
    cy.visit("/", { timeout: 100000 });
    cy.clearAuth();
    cy.reload(true);
  });

  it("should create a user", async () => {
    const user = generateUser();
    cy.visit("/createAccount", { timeout: 100000 });

    // user details form
    cy.get("#firstName").type(user.firstName);
    cy.get("#lastName").type(user.lastName);
    cy.get("#email").type(user.email);
    cy.get("#company").type(user.company);
    cy.get("#companyPhone").type(user.companyPhone);
    cy.get("#personalPhone").type(user.personalPhone);
    cy.get("#password").type(user.password);
    cy.get("#passwordConfirm").type(user.password);
    cy.get("#registerButton").click();

    // test
    cy.location("pathname").should("equal", "/createAccount");
    cy.get("h1").should("contain", "Categories");

    // interests form
    cy.get("#financeCheckbox").click();
    cy.get("#submitBtn").click();

    // test
    cy.location("pathname").should("equal", "/events");
    cy.get("#sendEmailBtn").should("exist");
  });
});
