/// <reference types="cypress" />
import contrato from '../contrato/usuarios.contrato'
const { faker } = require('@faker-js/faker');

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response=>{
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios',
    }).should((response)=>{
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let usuario = 'Usuario Ebac' + Math.floor(Math.random() * 10000000000000)
    let emailFaker = faker.internet.email();
    cy.request({
      method:'POST',
      url:'usuarios',
      body:{
      "nome": usuario,
      "email": emailFaker,
      "password": "teste",
      "administrador": "true"
    }
    }).should((response)=>{
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      failOnStatusCode: false,
      body: {
      "nome": "Fulano da Silva",
      "email": "beltranoqa.com.br",
      "password": "teste",
      "administrador": "true"
}
    }).should((response)=>{
      expect(response.status).equal(400)
      expect(response.body.email).equal('email deve ser um email válido')
    })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.request({
      method:'PUT',
      url:'usuarios'+'/0uxuPY0cbmQhpEz1',
      body:{
           "nome": "Teste da Silva1",
           "email": "beltra@qa.com.br",
           "password": "teste123",
           "administrador": "false"
      }
    }).should(response =>{
      expect(response.body.message).equal('Registro alterado com sucesso')
      expect(response.status).equal(200)
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
  let usuario = 'Usuario Ebac ' + Math.floor(Math.random() * 10000000000000);
  let emailFaker = faker.internet.email();
  cy.request({
    method: 'POST',
    url: 'usuarios',
    body: {
      nome: usuario,
      email: emailFaker,
      password: 'teste',
      administrador: 'true'
    }
  }).then((response) => {
    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal('Cadastro realizado com sucesso');
    const idUsuario = response.body._id;

    cy.request({
      method: 'DELETE',
      url: `usuarios/${idUsuario}`
    }).then((respostaDelete) => {
      expect(respostaDelete.status).to.equal(200);
      expect(respostaDelete.body.message).to.equal('Registro excluído com sucesso');
    });
  });
});
})