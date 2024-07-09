Cypress.Commands.add('filMandatoryFildsAndSubmit', function(){
    cy.get('#firstName').type('Guilherme')
    cy.get('#lastName').type('Cerutti')
    cy.get('#email').type('Guilhermeceruttipaim@gmail.com')
    cy.get('#open-text-area').type('test')
    cy.contains('button', 'Enviar').click()
  
    
})