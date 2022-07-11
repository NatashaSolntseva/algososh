import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("queue component works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  describe("check the button's status", () => {
    it("If the input is empty, then the add buttons are not available", () => {
      cy.get("input").should("have.value", "");
      cy.contains("Добавить в head").should("be.disabled");
      cy.contains("Добавить в tail").should("be.disabled");
      cy.contains("Удалить из head").should("not.be.disabled");
      cy.contains("Удалить из tail").should("not.be.disabled");
      cy.contains("Добавить по индексу").should("be.disabled");
      cy.contains("Удалить по индексу").should("be.disabled");
    });

    it("If the value input is not empty, then the add button is available", () => {
      cy.get('input[name="value"]').type("239");
      cy.contains("Добавить в head").should("not.be.disabled");
      cy.contains("Добавить в tail").should("not.be.disabled");
      cy.contains("Удалить из head").should("not.be.disabled");
      cy.contains("Удалить из tail").should("not.be.disabled");
      cy.contains("Добавить по индексу").should("be.disabled");
      cy.contains("Удалить по индексу").should("be.disabled");
    });

    it("If the value and index inputs are not empty, then the add by index button is available", () => {
      cy.get('input[name="value"]').type("239");
      cy.get('input[name="index"]').type("2");
      cy.contains("Добавить в head").should("not.be.disabled");
      cy.contains("Добавить в tail").should("not.be.disabled");
      cy.contains("Удалить из head").should("not.be.disabled");
      cy.contains("Удалить из tail").should("not.be.disabled");
      cy.contains("Добавить по индексу").should("not.be.disabled");
      cy.contains("Удалить по индексу").should("not.be.disabled");
    });

    it("If the  index input is not empty, then the delete by index button is available", () => {
      cy.get('input[name="index"]').type("2");
      cy.contains("Добавить в head").should("be.disabled");
      cy.contains("Добавить в tail").should("be.disabled");
      cy.contains("Удалить из head").should("not.be.disabled");
      cy.contains("Удалить из tail").should("not.be.disabled");
      cy.contains("Добавить по индексу").should("be.disabled");
      cy.contains("Удалить по индексу").should("not.be.disabled");
    });
  });

  describe("check the linked list algo and render works correctly", () => {
    it("Check render a default linked list", () => {
      cy.get("[class*=circle_content]")
        .should("have.length", 6)
        .each(($item, index) => {
          cy.wrap($item)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
          if (index === 0) {
            expect($item).to.contain("head");
          }
          if (index === 5) {
            expect($item).to.contain("tail");
          }
        });
    });

    it("Check add node to the head of the linked list", () => {
      cy.get('input[name="value"]').type("239");
      cy.contains("Добавить в head").click();

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 0) {
          cy.wrap($item)
            .siblings()
            .find("[class*=circle_small]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)")
            .should("have.text", "239");
        }
      });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 0) {
          cy.wrap($item)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(127, 224, 81)")
            .should("have.text", "239");
        }
      });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 0) {
          expect($item).to.contain("head");
          cy.wrap($item)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)")
            .should("have.text", "239");
        }
      });
    });

    it("Check add node to the tail of the linked list", () => {
      cy.get('input[name="value"]').type("239");
      cy.contains("Добавить в tail").click();

      for (let i = 0; i <= 6; i++) {
        cy.get("[class*=circle_content]").each(($item, index) => {
          let currentIdx = i;
          if (index < currentIdx)
            cy.wrap($item)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)");
          if (index === currentIdx) {
            cy.wrap($item)
              .siblings()
              .find("[class*=circle_small]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)")
              .should("have.text", "239");
          }
        });

        cy.wait(SHORT_DELAY_IN_MS);
      }

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 6) {
          cy.wrap($item)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(127, 224, 81)")
            .should("have.text", "239");
        }
      });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 6) {
          cy.wrap($item)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)")
            .should("have.text", "239");
          expect($item).to.contain("tail");
        }
      });
    });

    it("Check add node by index to the linked list", () => {
      cy.get('input[name="value"]').type("239");
      cy.get('input[name="index"]').type("3");
      cy.contains("Добавить по индексу").click();

      for (let i = 0; i <= 3; i++) {
        cy.get("[class*=circle_content]").each(($item, index) => {
          let currentIdx = i;
          if (index < currentIdx)
            cy.wrap($item)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)");
          if (index === currentIdx) {
            cy.wrap($item)
              .siblings()
              .find("[class*=circle_small]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)")
              .should("have.text", "239");
          }
        });

        cy.wait(SHORT_DELAY_IN_MS);
      }

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 3) {
          cy.wrap($item)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(127, 224, 81)")
            .should("have.text", "239");
        }
      });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 3) {
          cy.wrap($item)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)")
            .should("have.text", "239");
          expect($item).to.contain("3");
        }
      });
    });

    it("Check remove node from the head of the linked list", () => {
      cy.contains("Удалить из head").click();

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 0) {
          cy.wrap($item)
            .siblings()
            .find("[class*=circle_small]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)")
            .should("not.have.text", "");
        }
      });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 0) {
          cy.wrap($item)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 0) {
          expect($item).to.contain("head");
          cy.wrap($item)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });
    });

    it("Check remove node from the tail of the linked list", () => {
      cy.contains("Удалить из tail").click();

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 5) {
          cy.wrap($item)
            .siblings()
            .find("[class*=circle_small]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)")
            .should("not.have.text", "");
        }
      });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 5) {
          cy.wrap($item)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        }
      });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 5) {
          expect($item).to.contain("tail");
          cy.wrap($item)
            .find("[class*=circle_circle]")
            .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        }
      });
    });

    it("Check remove node by index", () => {
      cy.get('input[name="value"]').type("239");
      cy.get('input[name="index"]').type("3");
      cy.contains("Удалить по индексу").click();

      for (let i = 0; i <= 3; i++) {
        cy.get("[class*=circle_content]").each(($item, index) => {
          let currentIdx = i;
          if (index <= currentIdx)
            cy.wrap($item)
              .find("[class*=circle_circle]")
              .should("have.css", "border", "4px solid rgb(210, 82, 225)");
        });
        cy.wait(SHORT_DELAY_IN_MS);
      }
      cy.get("[class*=circle_content]").each(($item, index) => {
        if (index === 3) {
          cy.wrap($item)
            .siblings()
            .find("[class*=circle_small]")
            .should("have.css", "border", "4px solid rgb(210, 82, 225)")
            .should("not.have.text", "");
        }
      });

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_content]").each(($item) => {
        cy.wrap($item)
          .find("[class*=circle_circle]")
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      });
    });
  });
});

/*
Список

    Проверьте, что если в инпуте пусто,
     то кнопка добавления недоступна,
      кнопки добавления по индексу и удаления по индексу недоступны тоже.
      
    Проверьте корректность:
        отрисовки дефолтного списка.
        добавления элемента в head.
        добавления элемента в tail.
        добавления элемента по индексу.
        удаления элемента из head.
        удаления элемента из tail.
        удаления элемента по индексу.


*/
