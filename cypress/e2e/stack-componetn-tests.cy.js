import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("stack component works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });

  describe("check the button's status", () => {
    it("If the input is empty, then the add button is not available", () => {
      cy.get("input").should("have.value", "");
      cy.contains("Добавить").should("be.disabled");
    });

    it("If the input is not empty, then the add button is available", () => {
      cy.get("input").type("239");
      cy.contains("Добавить").should("not.be.disabled");
      cy.contains("Удалить").should("be.disabled");
      cy.contains("Очистить").should("be.disabled");
    });

    it("After adding the element, then the clear and del buttons is available", () => {
      cy.get("input").type("239");
      cy.contains("Добавить").click();
      cy.contains("Добавить").should("be.disabled");
      cy.contains("Удалить").should("not.be.disabled");
      cy.contains("Очистить").should("not.be.disabled");
    });

    it("After clear the stack, then all buttons is not available", () => {
      cy.get("input").type("239");
      cy.contains("Добавить").click();
      cy.get("input").type("fml");
      cy.contains("Добавить").click();
      cy.get("input").clear();
      cy.contains("Очистить").click();
      cy.contains("Добавить").should("be.disabled");
      cy.contains("Удалить").should("be.disabled");
      cy.contains("Очистить").should("be.disabled");
    });
  });

  describe("check the stack algo and render works correctly", () => {
    it("Check add elements", () => {
      //add an element
      cy.get("input").type("Y");
      cy.contains("Добавить").click();

      //checking content
      cy.get("[class*=circle_content]")
        .should("have.length", 1)
        .each(($item) => {
          expect($item).to.contain("Y");
          expect($item).to.contain("top");
          expect($item).to.contain("0");
        });

      //checking rendering
      cy.get("[class*=circle_circle]")
        .should("have.length", 1)
        .each(($item) => {
          cy.wrap($item).should(
            "have.css",
            "border",
            "4px solid rgb(210, 82, 225)"
          );
        });

      cy.wait(SHORT_DELAY_IN_MS);

      //checking rendering
      cy.get("[class*=circle_circle]")
        .should("have.length", 1)
        .each(($item) => {
          cy.wrap($item).should(
            "have.css",
            "border",
            "4px solid rgb(0, 50, 255)"
          );
        });

      //add next element
      cy.get("input").type("E");
      cy.contains("Добавить").click();

      //checking content
      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($item, index) => {
          if (index === 0) {
            expect($item).to.contain("Y");
            expect($item).to.contain("0");
          } else {
            expect($item).to.contain("E");
            expect($item).to.contain("1");
            expect($item).to.contain("top");
          }
        });

      //checking rendering
      cy.get("[class*=circle_circle]")
        .should("have.length", 2)
        .each(($item, index) => {
          if (index === 1) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
          }
        });

      cy.wait(SHORT_DELAY_IN_MS);

      //checking rendering
      cy.get("[class*=circle_circle]")
        .should("have.length", 2)
        .each(($item, index) => {
          if (index === 1) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(0, 50, 255)"
            );
          }
        });

      //add next 3 element
      cy.get("input").type("S");
      cy.contains("Добавить").click();

      //checking content
      cy.get("[class*=circle_content]")
        .should("have.length", 3)
        .each(($item, index) => {
          if (index === 0) {
            expect($item).to.contain("Y");
            expect($item).to.contain("0");
          }
          if (index === 1) {
            expect($item).to.contain("E");
            expect($item).to.contain("1");
          }
          if (index === 2) {
            expect($item).to.contain("S");
            expect($item).to.contain("2");
            expect($item).to.contain("top");
          }
        });

      //checking rendering
      cy.get("[class*=circle_circle]")
        .should("have.length", 3)
        .each(($item, index) => {
          if (index === 2) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
          }
        });

      cy.wait(SHORT_DELAY_IN_MS);

      //checking rendering
      cy.get("[class*=circle_circle]")
        .should("have.length", 3)
        .each(($item, index) => {
          if (index === 2) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(0, 50, 255)"
            );
          }
        });
    });

    it("Check remove elements", () => {
      // first add some elements
      cy.get("input").type("2");
      cy.contains("Добавить").click();
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get("input").type("3");
      cy.contains("Добавить").click();
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get("input").type("9");
      cy.contains("Добавить").click();
      cy.wait(SHORT_DELAY_IN_MS);

      // el button clicked, last element deleted
      cy.contains("Удалить").click();

      cy.get("[class*=circle_circle]")
        .should("have.length", 3)
        .each(($item, index) => {
          if (index === 2)
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
        });
      cy.wait(SHORT_DELAY_IN_MS);
      //element deleted after delay
      cy.get("[class*=circle_content]")
        .should("have.length", 2)
        .each(($item, index) => {
          if (index === 1) {
            expect($item).to.contain("3");
            expect($item).to.contain("top");
            expect($item).to.contain("1");
          }
        });

      // el button clicked, last element eleted
      cy.contains("Удалить").click();

      cy.get("[class*=circle_circle]")
        .should("have.length", 2)
        .each(($item, index) => {
          if (index === 1) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
          }
        });

      cy.wait(SHORT_DELAY_IN_MS);
      //element deleted after delay
      cy.get("[class*=circle_content]")
        .should("have.length", 1)
        .each(($item) => {
          expect($item).to.contain("2");
          expect($item).to.contain("top");
          expect($item).to.contain("0");
        });
      // Удаляем последний
      cy.contains("Удалить").click();
      cy.get("[class*=circle_content]").should("have.length", 0);
    });

    it("Check clear stack", () => {
      cy.get("input").type("2");
      cy.contains("Добавить").click();
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get("input").type("3");
      cy.contains("Добавить").click();
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get("input").type("9");
      cy.contains("Добавить").click();
      cy.wait(SHORT_DELAY_IN_MS);
      cy.contains("Очистить").click();
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get("[class*=stack-page_list-elem]").should("have.length", 0);
    });
  });
});

/*

Стек

    Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.
    Проверьте правильность добавления элемента в стек.
    Важно убедиться, что цвета элементов меняются и каждый шаг анимации отрабатывает корректно.
    Проверить правильность удаления элемента из стека.
    Проверьте поведение кнопки «Очистить».
    Добавьте в стек несколько элементов, по нажатию на кнопку «Очистить» длина стека должна быть равна 0.

*/
