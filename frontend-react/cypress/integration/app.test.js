/// <reference types="cypress" />

describe("<SignIn/>", () => {
  it("renders correctly if user does not exist", () => {
    cy.visit("http://localhost:4000/");

    cy.url().should("include", `/signin`);

    cy.get("[data-cy=page-container]").should("be.visible");
    cy.get("[data-cy=title]").should("be.visible");
    cy.get("[data-cy=input-username]").should("be.visible");
    cy.get("[data-cy=input-password]").should("be.visible");
  });

  it("Shows errors if form data is incorrect", () => {
    cy.visit("http://localhost:4000/");

    cy.url().should("include", `/signin`);

    cy.get("[data-cy=input-username]")
      .should("be.visible")
      .as("input-username");

    cy.get("[data-cy=input-password]")
      .should("be.visible")
      .as("input-password");

    cy.get("[data-cy=submit]").should("be.visible").as("submit");

    cy.get("@submit").click();

    cy.get("[data-cy=error]")
      .should("be.visible")
      .should("have.length", "2")
      .as("error");

    cy.get("@input-username").click().type("+5 char no problem");
    cy.get("@input-password").click().type("nop");

    cy.get("@submit").click();

    cy.get("[data-cy=error]").should("be.visible").should("have.length", "1");

    cy.get("@input-username")
      .click()
      .type("+20 characters throws error sadly, aaaaaaaa");

    cy.get("@input-password")
      .click()
      .type("+20 characters throws error sadly, aaaaaaaa");
    cy.get("@submit").click();
    cy.get("[data-cy=error]").should("be.visible").should("have.length", "2");

    cy.get("@input-username").click().type("Correct user test");

    cy.get("@input-password").click().type("Correct password");
    cy.get("@submit").click();
    cy.get("[data-cy=error]")
      .should("be.visible")
      .should("have.length", "1")
      .contains("Invalid Credentials");
  });
});

describe("<SignUp/>", () => {
  it("Renders correctly", () => {
    cy.visit("http://localhost:4000/");

    cy.get("[data-cy=signup]").click();
    cy.url().should("contain", "/signup");

    cy.get("[data-cy=page-container]").should("be.visible");
    cy.get("[data-cy=title]").should("be.visible");
    cy.get("[data-cy=input-username]").should("be.visible");
    cy.get("[data-cy=input-password]").should("be.visible");
  });

  it("Shows errors if form data is incorrect", () => {
    cy.visit("http://localhost:4000/");

    cy.get("[data-cy=signup]").click();
    cy.url().should("contain", "/signup");

    cy.get("[data-cy=input-username]")
      .should("be.visible")
      .as("input-username");

    cy.get("[data-cy=input-password]")
      .should("be.visible")
      .as("input-password");

    cy.get("[data-cy=submit]").should("be.visible").as("submit");

    cy.get("@submit").click();

    cy.get("[data-cy=error]")
      .should("be.visible")
      .should("have.length", "2")
      .as("error");

    cy.get("@input-username").click().type("+5 char no problem");
    cy.get("@input-password").click().type("nop");

    cy.get("@submit").click();

    cy.get("[data-cy=error]").should("be.visible").should("have.length", "1");

    cy.get("@input-username")
      .click()
      .type("+20 characters throws error sadly, aaaaaaaa");

    cy.get("@input-password")
      .click()
      .type("+20 characters throws error sadly, aaaaaaaa");
    cy.get("@submit").click();
    cy.get("[data-cy=error]").should("be.visible").should("have.length", "2");
  });

  it("Deletes errors if correct form data is send", () => {
    cy.intercept("http://localhost:3000/auth/signup", { body: [] });
    cy.visit("http://localhost:4000/signup");

    cy.get("[data-cy=input-username]")
      .should("be.visible")
      .as("input-username");

    cy.get("[data-cy=input-password]")
      .should("be.visible")
      .as("input-password");

    cy.get("[data-cy=submit]").should("be.visible").as("submit");

    cy.get("@submit").click();

    cy.get("@input-username").click().type("Correct username");
    cy.get("@input-password").click().type("Correct password");
    cy.get("@submit").click();
    cy.get("[data-cy=error]").should("not.exist");
  });
});
