import { IPost } from "@/interfaces/IPost";

describe("Posts Loading Tests", () => {
  const mockPosts = {
    data: [
      {
        id: 1,
        title: "Primeiro Post",
        content: "Conteúdo do primeiro post",
        user: {
          id: 1,
          username: "Usuário 1",
          email: "usuario1@example.com",
          profilePictureUrl: "https://example.com/profile1.jpg",
        },
        createdAt: "2023-01-01T12:00:00Z",
        updatedAt: "",
        coverImageUrl: "https://example.com/cover1.jpg",
        likeCount: 5,
        commentCount: 2,
        createdBy: "Usuário 1",
      },
      {
        id: 2,
        title: "Segundo Post",
        content: "Conteúdo do segundo post",
        user: {
          id: 2,
          username: "Usuário 2",
          email: "usuario2@example.com",
          profilePictureUrl: "https://example.com/profile1.jpg",
        },
        createdAt: "2023-01-02T14:30:00Z",
        updatedAt: "",
        createdBy: "Usuário 2",
        coverImageUrl: "https://example.com/cover2.jpg",
        likeCount: 10,
        commentCount: 5,
      },
    ] as IPost[],
    isFound: true,
    message: "Posts encontrados com sucesso",
    isSuccess: true,
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  

  context("Usuário não autenticado", () => {
    it("deve redirecionar para página de login quando não autenticado", () => {
      cy.visit("/");

      cy.url().should("include", "/signin");
    });
  });

  context("Usuário autenticado", () => {
    beforeEach(() => {
      cy.setCookie("token", "valid-auth-token");

      cy.intercept("GET", "/api/Post", {
        statusCode: 200,
        body: mockPosts,
      }).as("getPosts");
    });

    it("deve carregar e exibir os posts quando autenticado", () => {
      cy.visit("/");

      cy.wait("@getPosts");

      cy.url().should("eq", Cypress.config().baseUrl + "/");

      cy.get('[data-testid="post-component"]').should("have.length", 2);

      cy.get('[data-testid="post-component"]')
        .first()
        .within(() => {
          cy.get('[data-testid="post-title"]').should(
            "contain",
            "Primeiro Post"
          );
          
          cy.get('[data-testid="post-author"]').should("contain", "Usuário 1");
          cy.get('[data-testid="post-likes"]').should("contain", "5");
        });

      cy.get('[data-testid="post-component"]')
        .eq(1)
        .within(() => {
          cy.get('[data-testid="post-title"]').should(
            "contain",
            "Segundo Post"
          );
          cy.get('[data-testid="post-author"]').should("contain", "Usuário 2");
          cy.get('[data-testid="post-likes"]').should("contain", "10");
        });
    });

    it("deve exibir mensagem quando não há posts disponíveis", () => {
      cy.intercept("GET", "/api/Post", {
        statusCode: 200,
        body: {
          data: [],
          isFound: true,
          message: "Não há posts disponíveis",
          isSuccess: true,
        },
      }).as("getEmptyPosts");

      cy.visit("/");

      cy.wait("@getEmptyPosts");

      cy.get('[data-testid="post-component"]').should("not.exist");

    });

    it("deve lidar com erros na API ao carregar posts", () => {
      cy.intercept("GET", "/api/Post", {
        statusCode: 500,
        body: {
          message: "Erro ao carregar posts",
          isSuccess: false,
        },
      }).as("getPostsError");

      cy.visit("/");

      cy.wait("@getPostsError");

      cy.get('[data-testid="post-component"]').should("not.exist");
    });
  });
});
