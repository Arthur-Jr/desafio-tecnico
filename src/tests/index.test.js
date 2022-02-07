const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../api');
const { expect } = chai;

chai.use(chaiHttp);

describe('Testes da paginação', () => {
  let response;

  describe('Com "totalPage" menor que 5"', () => {
    it('Deve retornar um array com cinco números e o número 3 selecionado.', async () => {
      const expectedArray = [ '1', '2', '**3**', '4', '5' ];

      response = await chai.request(server)
      .get('/paginacao?page=3&totalPage=5');

      expect(response).to.have.status(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('paginacao');
      expect(response.body.paginacao).to.have.length(5);
      expect(response.body.paginacao).to.deep.equal(expectedArray);
    });

    it('Deve retornar um array com cinco números e o número 1 selecionado.', async () => {
      const expectedArray = [ '**1**', '2', '3', '4', '5' ];

      response = await chai.request(server)
      .get('/paginacao?page=1&totalPage=5');

      expect(response).to.have.status(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('paginacao');
      expect(response.body.paginacao).to.have.length(5);
      expect(response.body.paginacao).to.deep.equal(expectedArray);
    });
  });

  describe('Com "totalPage" maior que 5"', () => {
    it('Deve retornar um array com cinco números, o número 5 selecionado e com reticências(...) no inicio e no final do array.', async () => {
      const expectedArray = [ '...', '3', '4', '**5**', '6', '7', '...' ];

      response = await chai.request(server)
      .get('/paginacao?page=5&totalPage=10');

      expect(response).to.have.status(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('paginacao');
      expect(response.body.paginacao).to.have.length(7);
      expect(response.body.paginacao).to.deep.equal(expectedArray);
    });

    it('Deve retornar um array com cinco números, o número 10 selecionado e com reticências(...) no inicio do array.', async () => {
      const expectedArray = [ '...', '6', '7', '8', '9', '**10**' ];

      response = await chai.request(server)
      .get('/paginacao?page=10&totalPage=10');

      expect(response).to.have.status(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('paginacao');
      expect(response.body.paginacao).to.have.length(6);
      expect(response.body.paginacao).to.deep.equal(expectedArray);
    });

    it('Deve retornar um array com cinco números, o número 2 selecionado e com reticências(...) no final do array.', async () => {
      const expectedArray = [ '1', '**2**', '3', '4', '5', '...' ];
  
      response = await chai.request(server)
      .get('/paginacao?page=2&totalPage=10');
  
      expect(response).to.have.status(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('paginacao');
      expect(response.body.paginacao).to.have.length(6);
      expect(response.body.paginacao).to.deep.equal(expectedArray);
    });
  });
});