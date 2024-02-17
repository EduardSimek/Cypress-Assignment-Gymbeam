/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {

    return false;
});

describe ("Test Cases for Login Page", () => {

    const baseURL = "https://gymbeam.sk/customer/account/login/"


    beforeEach(() => {
              
        cy.visit(baseURL);
        cy.wait(5000)
        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click()
        

    });
    

    it("Register new users", () => {
        cy.get('.login-container > .block-new-customer > .block-content > .actions-toolbar > div.primary > .action').click()

        cy.get("#firstname").type("John")
        cy.get("#lastname").type("Smith")

        cy.get("#dob").click()
        //cy.get(".ui-datepicker-month").select("4")
        cy.get(".ui-datepicker-year").select("1999")
        cy.contains('a.ui-state-default', '9').click()

        cy.get('select#gender').select('1');

        cy.get("#email_address").type("js8458205@gmail.com")
        cy.get("#password").type("00001111aA")
        cy.get("#password-confirmation").type("00001111aA")

        cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()


    }) 

    it("Should log in with valid credentials", () => {
        cy.get("#email").type("js8458205@gmail.com")
        cy.get("#pass").type("00001111aA")
        cy.get("#send2").click()
    }) 
/*
    it("Should show an error message for invalid credentials", () => {
        
    }) 

    it("Should show an error message when the email is empty", () => {
        
    }) 

    it("Should show an error message when the password is empty", () => {
        
    }) 
    */


})
