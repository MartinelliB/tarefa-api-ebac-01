Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
    cy.request({
        method: 'POST', 
        url: 'produtos',
        headers: {authorization: token}, 
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          }, 
          failOnStatusCode: false
    })
 })
 Cypress.Commands.add('criarUsuario', (usuario) => {
  cy.request({
    method: 'POST',
    url: '/usuarios',
    body: {
      nome: usuario.nome,
      email: usuario.email,
      password: usuario.password,
      administrador: usuario.administrador
    },
       failOnStatusCode: false
     }).then((response) => {
       expect(response.status).to.eq(201)
  })
})