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

    it('Cadastrar produtos - POST', () => {
        let produto = 'Produto Teste ' + Math.floor(Math.random() * 100000)
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {authorization: token},
            body: {
                //TO DO criar produto automat
                "nome": produto,
                "preco": 99,
                "descricao": "Mouse",
                "quantidade": 111
            }
            }).should((response) => {
                expect(response.status).to.equal(201)
                expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    it.only('Deve validar mensagem de produto já cadastrado', () => {
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {authorization: token},
            body: {
                //TO DO criar produto automat
                "nome": 'Produto Teste 01',
                "preco": 99,
                "descricao": "Mouse",
                "quantidade": 111
            }, failOnStatusCode: false
            }).should((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal('Já existe produto com esse nome')
        })

    })
})