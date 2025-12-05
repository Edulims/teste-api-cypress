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
        let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNzY0OTc4MjA2LCJleHAiOjE3NjQ5Nzg4MDZ9.44ey4Mv5sb8S6wfRjVWSg_-3aAB1-WFSdr1n-xx41ZE"
        cy.request({
            method: 'POST',
            url: 'produtos',
            headers: {authorization: token},
            body: {
                "nome": "Produto Teste 01",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381
            }
            }).should((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

});