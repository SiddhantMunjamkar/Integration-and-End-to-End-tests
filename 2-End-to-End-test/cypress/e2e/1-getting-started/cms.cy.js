describe('Testing app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('is able to log in', () => {
    cy.contains('Login').should('exist')
    cy.contains('Login').click()
    cy.contains('Signin to your Account').should('exist', { timeout: 10000 })
    cy.get('#email').type('harkirat.iitr@gmail.com');

    // Fill in the password field
    cy.get('#password').type('123random');

    cy.get('button').eq(4).click()

    cy.contains('View Content').should("exist", {timeout: 10000})
  })

})
