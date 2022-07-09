describe("te app launched successfully", function () {
  it("the app is available at localhost:300", function () {
    cy.visit("http://localhost:3000");
  });
});
