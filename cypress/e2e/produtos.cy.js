/// <reference types = "cypress"/>

describe('Teste de API em Produtos', () => {
    
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
        cy.request({
            method: 'POST',
            url: 'produtos',
            body: {
                "nome": "Produto Teste 01",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381
            }
        })
    });

});