//Cypress tests
describe("Appointments", () => {
  
  //Everything inside beforeEach is common to all tests and is run at the start for each test. Removes duplicate code in similar tests
  beforeEach(() => {

    //Reset server before each test is run
    cy.request("GET", "http://localhost:8001/api/debug/reset");

    //Below cy.request did not work (redirects to http://localhost:8000/api/debug/reset), hardcoded in url instead above
    // cy.request("GET", "/api/debug/reset")
  
    //Go to the root of our web server
    cy.visit("/");

    //Verify it contains Monday
    cy.contains("Monday");
  });
  
  //Test to make sure user can book interview
  it("should book an interview", () => {

    //Select first button with alt=Add attribute on page and click it
    cy.get("[alt=Add]").first().click();

    //Select element with data-testid=student-name-input attribute and type in a new student name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    //Select element with alt='Sylvia Palmer' attribute and click it (interviewers)
    cy.get("[alt='Sylvia Palmer']").click();

    //Select element with text of Save and click it (Save button)
    cy.contains("Save").click();

    //Verify that the following elements appear on screen somewhere (new appointment student and interviewer) 
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  //Test to make sure user can edit an existing interview
  it("should edit an interview", () => {

    //Select first button with alt=Edit attribute on page and click it (need to force true as button hidden unless hover over)
    cy.get("[alt=Edit]").first().click({ force: true });

    //Select element with data-testid=student-name-input attribute, clear the field and type in a new student name
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    //Select element with alt='Sylvia Palmer' attribute and click it (interviewers)
    cy.get("[alt='Tori Malcolm']").click();
  
    //Select element with text of Save and click it (Save button)
    cy.contains("Save").click();

    //Verify that the following elements appear on screen somewhere (edited appointment student and interviewer)
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  //Test to make sure user can edit an existing interview
  it("should cancel an interview", () => {

    //Select first button with alt=Delete attribute on page and click it
    cy.get("[alt=Delete]").first().click({ force: true });
  
    //Select element that has text "Confirm" and click it
    cy.contains("Confirm").click();

    //Verify that Deleting component shows up
    cy.contains("Deleting").should("exist");
    //Verify that Deleting component goes away after delete
    cy.contains("Deleting").should("not.exist");

    //Verify that the deleted elements should not appear on the screen somewhere (deleted appointment student and interviewer)
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });


  

});


 