describe("string component works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  describe("check the button's status", () => {
    it("If the input is empty, then the add button is not available", () => {
      cy.get("input").should("have.value", "");
      cy.contains("Развернуть").as("button");
      cy.get("@button").should("be.disabled");
    });
    it("If the input is not empty, then the add button is available", () => {
      //разные методы поиска кнопки. Кнопки две, первая "к оглавлению" - индекс 0.
      cy.get("button").eq(1).should("be.disabled");
      cy.get("input").type("239");
      cy.get("button").eq(1).should("not.be.disabled");
    });
  });

  describe("check the string expands correctly", () => {
    it("string reversal and animation work correctly ", () => {
      cy.get("input").type("vasilisa");
      cy.get("button").contains("Развернуть").click();
    });
  });
});

/*
Строка

    Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.
    Проверьте, что строка разворачивается корректно.
    Важно, чтобы у вас на каждом шаге анимации были проверки на корректность выполненной операции и корректность стилей.

*/
