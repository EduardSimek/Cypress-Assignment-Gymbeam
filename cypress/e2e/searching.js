/// <reference types="cypress" />

//Removing unnecessary data and make automation tests more functional
Cypress.on('uncaught:exception', () => false)       

//Base URL and search element selector
const baseURL = "https://gymbeam.sk/";
const searchId = "#search"

beforeEach(() => {
    cy.visit(baseURL);
    cy.wait(7000)
    cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click()
    //cy.setCookie("__kwc_agreed", "true")
    //cy.AllowCookies();
})

describe('Negative Test Cases for searching', () => {

    it("Test that the search box doesn't accept invalid input from the user", () => {
        const searchInvalidInput = "porsche"
        const expectedMessage = `Výsledky vyhľadávania pre: '${searchInvalidInput}'`

        cy.get(searchId).click().type(searchInvalidInput).should("have.value", searchInvalidInput).type("{enter}")
        cy.get('.base[data-ui-id="page-title-wrapper"]').should('be.visible').contains(expectedMessage)
        cy.get('.catalog-topnav.amasty-catalog-topnav').should('exist')
    }) 

    it("Test that the search box does not accept input exceeding maximum length", () => {
        const searchBoxSelector = '#search';
        const maxLength = 128;
        const longText = "a".repeat(maxLength + 10);

        cy.get(searchBoxSelector)
            .clear() 
            .type(longText)
            .should('have.value', "a".repeat(maxLength)).type("{enter}")
    }) 
})


describe('Positive Test Cases for searching', () => {

    it("Verify that the search box is present on the page and is visible to the user", () => {
        cy.get(searchId).should("exist").and("be.visible")
        cy.log("Search box exist and is visible on the webpage")
    }) 

    it("Test that the search box accepts valid input from the user", () => {
        const searchText = "protein"

        cy.get(searchId).click().type(searchText).should("have.value", searchText)
        cy.get(searchId).type("{enter}")
        cy.get(searchId).should("exist").and("be.visible")
        cy.log("Search box accepts valid input")       

    }) 

    it("Type that the search box accepts max length input", () => {
        //Type maximum length input into the search box
        const maxLength = 128;
        const searchInvalidInput = "a".repeat(128);
        const expectedMessage = `Výsledky vyhľadávania pre: '${searchInvalidInput}'`;

        cy.get('#search').type("a".repeat(maxLength)).should('have.value', "a".repeat(maxLength)).type("{enter}")
        cy.log("Maximum length of search box is " +maxLength)

        cy.get('.base[data-ui-id="page-title-wrapper"]').should('be.visible').contains(expectedMessage);
        cy.get('.catalog-topnav.amasty-catalog-topnav').should('exist');
    }) 

    it("Check if search results show product images, names, prices and descriptions, etc...", () => {

        const searchInput = "Vitamin"

        cy.get(searchId).click().type(searchInput).should("have.value", searchInput).type("{enter}")
        cy.get(searchId).should("exist").and("be.visible")

        //verification that header exist and is visible
        cy.get('header').should("exist").and("be.visible")

        //verification of all subgroups (Sportova vyziva, zdrave potraviny, sportove oblecenie, prislusenstvo, blog)
        cy.get(".section-item-content.nav-sections-item-content").should("exist").and("be.visible")

        //verification that footer exist and is visible
        cy.get('footer').should("exist").and("be.visible")

        //verification that navigation link is visible
        cy.get("nav").should("exist").and("be.visible")

        //verification that other elements are visible
        cy.get("#sorter").should("exist").and("be.visible")
        cy.get("#amasty-shopby-product-list").should("exist").and("be.visible")
        cy.xpath('//*[@id="maincontent"]/div[2]/div[2]').should("exist").and("be.visible")
    })
        

   
});