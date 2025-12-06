/// <reference types = "cypress"/>

describe('Teste de API em Produtos', () => {

    let token
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => {
            token = tkn
        })
    });
    
    it('Listar produtos - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',

        }).should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.produtos).exist
            expect(response.body).to.have.property('produtos')
        })
    });

    it.only('Cadastrar produtos - POST', () => {
        let produto = 'Produto Teste ' + Math.floor(Math.random() * 100000)
        cy.cadastrarProduto(token, produto, 99, 'teste', 112)
        .should((response) => {
                expect(response.status).to.equal(201)
                expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    it('Deve validar mensagem de produto já cadastrado', () => {
        cy.cadastrarProduto(token, 'Produto Teste 01', 99, 'Teste', 111)
        .should((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal('Já existe produto com esse nome')
        })

    })
})