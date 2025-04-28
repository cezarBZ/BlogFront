describe("Next.js Auth Middleware", () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  context("Usuário não autenticado", () => {
    it("deve redirecionar para /signin quando acessar rota protegida sem token", () => {
      cy.visit("/");

      cy.url().should("include", "/signin");
    });

    it("deve permitir acesso direto a rotas de autenticação", () => {
      cy.visit("/signin");

      cy.url().should("include", "/signin");

      cy.visit("/signup");

      cy.url().should("include", "/signup");
    });
  });

  context("Usuário autenticado", () => {
    beforeEach(() => {
      cy.setCookie("token", "valid-test-token");
    });

    it("deve permitir acesso a rotas protegidas quando autenticado", () => {
      cy.visit("/");

      cy.url().should("include", "/");
    });

    it("deve redirecionar para / quando tentar acessar rotas de autenticação estando autenticado", () => {
      cy.visit("/signin");

      cy.url().should("eq", Cypress.config().baseUrl + "/");

      cy.visit("/signup");

      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });

  context("Rotas públicas", () => {
    it("deve permitir acesso a rotas públicas sem autenticação", () => {
      cy.visit("/about");

      cy.url().should("include", "/about");
    });

    it("deve permitir acesso a rotas públicas com autenticação", () => {
      cy.setCookie("token", "valid-test-token");

      cy.visit("/about");

      cy.url().should("include", "/about");
    });
  });
});
