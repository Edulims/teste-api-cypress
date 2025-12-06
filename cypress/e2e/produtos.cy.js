/// <reference types = "cypress"/>

describe('Teste de API em Produtos', () => {

    let token
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => {
            token = tkn
        })
    });
    
    it('Deve Listar produtos - GET', () => {
        cy.request({
            method: 'GET',
            url: 'produtos',

        }).should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.produtos).exist
            expect(response.body).to.have.property('produtos')
        })
    });

    it('Deve Cadastrar produtos - POST', () => {
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

    it('Deve editar um produto com sucesso', () => {
        let produto = 'Produto Teste EDITADO ' + Math.floor(Math.random() * 100000)
        cy.cadastrarProduto(token, produto, 99, 'Produto EDITADO', 112)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'PUT',
                    url: `produtos/${id}`,
                    headers: {authorization: token},
                    body: {
                        "nome": produto,
                        "preco": 999,
                        "descricao": "PRODUTO EDITADO",
                        "quantidade": 111
                    }
                }).should((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                })
                    })
        
        
    });

    it('Deve excluir um produto com sucesso', () => {
        cy.cadastrarProduto(token, 'Produto Teste DELETADO', 100, 'Teste', 999)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `produtos/${id}`,
                    headers: {authorization: token}
                }).should((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                
                })
            })
        
    });
})