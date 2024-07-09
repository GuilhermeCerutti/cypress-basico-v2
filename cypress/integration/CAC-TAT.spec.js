/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   beforeEach(function(){
    cy.visit('./src/index.html')
   })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  
    })
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'test, test,test, test,test, test,test, test,test, test,test, test,test, test,test, test,test, test,test, test,'
        cy.get('#firstName').type('Guilherme')
        cy.get('#lastName').type('Cerutti')
        cy.get('#email').type('Guilhermeceruttipaim@gmail.com')
        //{delay : 0 } serve para quando digitamos textos grandes, assim sendo instantaneo 
        cy.get('#open-text-area').type(longText, {delay : 0})
        //melhor usar o seletor type="submit" do que .button, pois e mais descritivo
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Guilherme')
        cy.get('#lastName').type('Cerutti')
        cy.get('#email').type('Guilhermeceruttipaim@gmail,com')
        cy.get('#open-text-area').type('test')
        cy.contains('button', 'Enviar').click()
        //be.visible = se esta visivel na tela 
        cy.get('.error').should('be.visible')
    
       })

    it('Campo de telefone continua vazio quando ditamos valor não-numérico', function(){
        cy.get('#phone')
        .type('abcdeftgijkl')
        .should('have.value', '')
    })

    it('camopo telefone quando marcado obrigatorio só pode ser enviado se tiver um numero', function(){
        cy.get('#firstName').type('Guilherme')
        cy.get('#lastName').type('Cerutti')
        cy.get('#email').type('Guilhermeceruttipaim@gmail,com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('test')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Guilherme')
        .should('have.value', 'Guilherme')
        .clear()
        .should('have.value', '')
        cy.get('#lastName')
        .type('Cerutti')
        .should('have.value', 'Cerutti')
        .clear()
        .should('have.value', '')
        cy.get('#email')
        .type('Guilherme@gmail.com')
        .should('have.value', 'Guilherme@gmail.com')
        .clear()
        .should('have.value', '')
        cy.get('#open-text-area')
        .type('test')
        .should('have.value', 'test')
        .clear()
        .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function(){
        cy.contains('button', 'Enviar').click()
       
        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
       cy.filMandatoryFildsAndSubmit()
        cy.get('.success')
        .should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto',function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
       
  })

  it('seleciona um produto (Mentoria) por seu valor (value)',function(){
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"',function(){
    cy.get('input[type="radio"][value = "feedback"]')
    .check()
    .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]')
        .should('have.length', 3)
        //.each para passar por cada um dos elementos 
        .each(function($radio) {
            //.wrap empacota neste caso o radio para mandar comando cypres 'check/should'
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input) {
              expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        //simulando com drag-drop como se o user estivesse arrastando o arquivo
        .selectFile('./cypress/fixtures/example.json', {action: "drag-drop"})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        //pega uma fixture e da um alias pra ela nesse caso '@sampleFile'
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        //dessa forma não precisa passar todo esse caminho .selectFile('./cypress/fixtures/example.json')
        .selectFile('@sampleFile')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        //para ver se abre em outra aba sem precisar clicar 
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr','target')
            .click()
        //removeu o valor _blank para abrir na mesma aba onde roda o cypress
        
    })

    
})