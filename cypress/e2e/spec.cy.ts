
describe("test tests", () => {
    it("should pass", () => {
        expect(true).to.equal(true);
    });
    it("should display landing page", () => {
        cy.visit("http://localhost:3000/");
        cy.contains("Understand information, not an opinion");
    })
})
describe("Login", () => {
    it("should redirect to the login page", () => {
        cy.visit("http://localhost:3000/balanced_news");
        // wait for redirect
        cy.wait(1000);
        cy.url().should("include", "/login");
    })
})