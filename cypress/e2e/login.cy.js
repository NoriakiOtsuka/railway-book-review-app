describe("first test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("validation error", () => {
    cy.get(".email-input").type('test@test');
    cy.get(".password-input").type('pass');
    cy.get(".login-button").click();
    cy.get(".input-validation").should('exist');
  });

  it("validation clear", () => {
    cy.get(".email-input").type('test@test');
    cy.get(".password-input").type('password');
    cy.get(".login-button").click();
    cy.get(".input-validation").should('not.exist');
    cy.visit("/");
    cy.url().should('eq', 'http://localhost:3000/')
  });
});