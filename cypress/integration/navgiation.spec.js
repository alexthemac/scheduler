//Cypress tests
describe("Navigation", () => {

  //Test to make sure we can access site root
  it("should visit root", () => {
    cy.visit("/");
  });

  //Test to make sure we can navigate to a specific day
  it("should navigate to Tuesday", () => {
    cy.visit("/");
  
    //Select element with attribute data-testid=day and click it.
    cy.contains("[data-testid=day]", "Tuesday").click().should("have.class", "day-list__item--selected");
  });
});
