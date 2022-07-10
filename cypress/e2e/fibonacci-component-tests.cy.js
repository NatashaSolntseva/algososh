import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("fibonacci component works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  describe("check the button's status", () => {
    it("If the input is empty, then the add button is not available", () => {
      cy.get("input").should("have.value", "");
      cy.contains("Рассчитать").as("button");
      cy.get("@button").should("be.disabled");
    });
    it("If the input is not empty, then the add button is available", () => {
      //разные методы поиска кнопки. Кнопки две, первая "к оглавлению" - индекс 0.
      cy.get("button").eq(1).should("be.disabled");
      cy.get("input").type("5");
      cy.get("button").eq(1).should("not.be.disabled");
    });
    it("If input is entered incorrectly, then the add button is not available", () => {
      //разные методы поиска кнопки. Кнопки две, первая "к оглавлению" - индекс 0.
      cy.get("button").eq(1).should("be.disabled");
      cy.get("input").type("555");
      cy.get("button").eq(1).should("be.disabled");
    });
  });

  describe("check the string expands correctly", () => {
    it("Numbers are generated correctly", () => {
      cy.get("input").type("6");
      cy.get("button").contains("Рассчитать").click();
      cy.get("[class*=circle_circle]")
        .should("have.length", 1)
        .each(($item, index) => {
          if (index === 0) expect($item).to.contain("1");
        });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_circle]")
        .should("have.length", 2)
        .each(($item, index) => {
          if (index === 0) expect($item).to.contain("1");
          if (index === 1) expect($item).to.contain("1");
        });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_circle]")
        .should("have.length", 3)
        .each(($item, index) => {
          if (index === 0) expect($item).to.contain("1");
          if (index === 1) expect($item).to.contain("1");
          if (index === 2) expect($item).to.contain("2");
        });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_circle]")
        .should("have.length", 4)
        .each(($item, index) => {
          if (index === 0) expect($item).to.contain("1");
          if (index === 1) expect($item).to.contain("1");
          if (index === 2) expect($item).to.contain("2");
          if (index === 3) expect($item).to.contain("3");
        });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_circle]")
        .should("have.length", 5)
        .each(($item, index) => {
          if (index === 0) expect($item).to.contain("1");
          if (index === 1) expect($item).to.contain("1");
          if (index === 2) expect($item).to.contain("2");
          if (index === 3) expect($item).to.contain("3");
          if (index === 4) expect($item).to.contain("5");
        });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_circle]")
        .should("have.length", 6)
        .each(($item, index) => {
          if (index === 0) expect($item).to.contain("1");
          if (index === 1) expect($item).to.contain("1");
          if (index === 2) expect($item).to.contain("2");
          if (index === 3) expect($item).to.contain("3");
          if (index === 4) expect($item).to.contain("5");
          if (index === 5) expect($item).to.contain("8");
        });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_circle]")
        .should("have.length", 7)
        .each(($item, index) => {
          if (index === 0) expect($item).to.contain("1");
          if (index === 1) expect($item).to.contain("1");
          if (index === 2) expect($item).to.contain("2");
          if (index === 3) expect($item).to.contain("3");
          if (index === 4) expect($item).to.contain("5");
          if (index === 5) expect($item).to.contain("8");
          if (index === 6) expect($item).to.contain("13");
        });
    });
  });
});

/*
Фибоначчи

    Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.
    Проверьте, что числа генерируются корректно.

*/
