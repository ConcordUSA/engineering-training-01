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

  afterEach(() => {
    // cy.signOut();
  });

  it("should create a user", async () => {
    const user = generateUser();

    // given
    cy.visit("/createAccount", { timeout: 100000 });
    cy.get("#firstName").type(user.firstName);
    cy.get("#lastName").type(user.lastName);
    cy.get("#email").type(user.email);
    cy.get("#company").type(user.company);
    cy.get("#companyPhone").type(user.companyPhone);
    cy.get("#personalPhone").type(user.personalPhone);
    cy.get("#password").type(user.password);
    cy.get("#passwordConfirm").type(user.password);

    // when
    cy.get("#registerButton").click();
    // then
    cy.location("pathname").should("equal", "/createAccount");
    cy.get("h1").should("contain", "Categories");

    // when
    cy.get("#financeCheckbox").click();
    cy.get("#submitBtn").click();
    // then
    cy.location("pathname").should("equal", "/events");
    cy.get("#sendEmailBtn").should("exist");
  });

  it("should fail creating a user if fields are missing", async () => {
    const user = generateUser();
    cy.visit("/createAccount", { timeout: 100000 });

    // given
    cy.get("#lastName").type(user.lastName);
    cy.get("#email").type(user.email);
    cy.get("#company").type(user.company);
    cy.get("#companyPhone").type(user.companyPhone);
    cy.get("#personalPhone").type(user.personalPhone);
    cy.get("#password").type(user.password);
    cy.get("#passwordConfirm").type(user.password);

    // when
    cy.get("#registerButton").click();

    // then
    cy.get("#messages").should("exist");
  });
});
