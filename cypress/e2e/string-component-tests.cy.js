import { DELAY_IN_MS } from "../../src/constants/delays";

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
      cy.get("input").type("239fml");
      cy.get("button").contains("Развернуть").click();

      cy.get("[class*=circle_circle]")
        .should("have.length", 6)
        .each(($item, index) => {
          if (index === 0) cy.wrap().contains("2");
          if (index === 1) cy.wrap().contains("3");
          if (index === 2) cy.wrap().contains("9");
          if (index === 3) cy.wrap().contains("f");
          if (index === 4) cy.wrap().contains("m");
          if (index === 5) cy.wrap().contains("l");

          //status Changing 1 step

          if (index === 0 || index === 5) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
            if (index === 0) expect($item).to.contain("2");
            if (index === 5) expect($item).to.contain("l");
          }
        });

      cy.wait(DELAY_IN_MS);

      //status Modified 1 step
      cy.get("[class*=circle_circle]").each(($item, index) => {
        if (index === 0 || index === 5) {
          cy.wrap($item).should(
            "have.css",
            "border",
            "4px solid rgb(127, 224, 81)"
          );
          if (index === 0) expect($item).to.contain("l");
          if (index === 5) expect($item).to.contain("2");
        }
        if (index === 1 || index === 4) {
          cy.wrap($item).should(
            "have.css",
            "border",
            "4px solid rgb(210, 82, 225)"
          );
          if (index === 1) expect($item).to.contain("3");
          if (index === 4) expect($item).to.contain("m");
        }
      });

      cy.wait(DELAY_IN_MS);

      //status Modifided 2 step

      cy.get("[class*=circle_circle]").each(($item, index) => {
        if (index === 1 || index === 4) {
          cy.wrap($item).should(
            "have.css",
            "border",
            "4px solid rgb(127, 224, 81)"
          );
          if (index === 1) expect($item).to.contain("m");
          if (index === 4) expect($item).to.contain("3");
        }
        if (index === 2 || index === 3) {
          cy.wrap($item).should(
            "have.css",
            "border",
            "4px solid rgb(210, 82, 225)"
          );
          if (index === 1) expect($item).to.contain("9");
          if (index === 4) expect($item).to.contain("f");
        }
      });

      cy.wait(DELAY_IN_MS);

      //status Modifided 3 step

      cy.get("[class*=circle_circle]").each(($item, index) => {
        if (index === 2 || index === 3) {
          cy.wrap($item).should(
            "have.css",
            "border",
            "4px solid rgb(127, 224, 81)"
          );
          if (index === 1) expect($item).to.contain("f");
          if (index === 4) expect($item).to.contain("9");
        }
      });

      cy.get("[class*=circle_circle]")
        .should("have.length", 6)
        .each(($item, index) => {
          if (index === 0) cy.wrap().contains("l");
          if (index === 1) cy.wrap().contains("m");
          if (index === 2) cy.wrap().contains("f");
          if (index === 3) cy.wrap().contains("9");
          if (index === 4) cy.wrap().contains("3");
          if (index === 5) cy.wrap().contains("2");
        });
    });
  });
});

/*
Строка

    Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.
    Проверьте, что строка разворачивается корректно.
    Важно, чтобы у вас на каждом шаге анимации были проверки на корректность выполненной операции и корректность стилей.

*/
