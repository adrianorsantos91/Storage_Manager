const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');
const productsMock = require('../../../Mock/productsMock');

describe('1 - Busca todos os dados de vendas no DB [Controllers - Product]', async () => {
  const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getAll').resolves(productsMock);
    })

    after(() => {
      productsServices.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsControllers.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productsControllers.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
});
describe('2 - Busca todos os dados das produtos por id no DB', async () => {
  describe("quando não é inserido com sucesso", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getById').resolves([]);
    })

    after(() => {
      productsServices.getById.restore();
    });

    it('é chamado o método "status" passando o código 404', async () => {
      await productsControllers.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Product not found"', async () => {
      await productsControllers.getById(request, response);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });
  describe("quando é inserido com sucesso", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getById').resolves([{
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }]);
    })

    after(() => {
      productsServices.getById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsControllers.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um object', async () => {
      await productsControllers.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
describe('3 - Insere novos produtos no DB', async () => {
  describe("quando não é inserido com sucesso", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'Martelo de Thor',
      };

      response.status = sinon.stub().returns(response);
      // response.send = sinon.stub().returns();
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, "create").resolves(false);
      sinon.stub(productsServices, "getAll").resolves(productsMock);
    });

    after(() => {
      productsServices.create.restore();
      productsServices.getAll.restore();
    });

    it("é chamado o status com o código 409", async () => {
      await productsControllers.create(request, response);

      expect(response.status.calledWith(409)).to.be.equal(true);
    });
  });
  describe("quando é inserido com sucesso", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: "Gavião",
        quantity: 1
      };

      response.status = sinon.stub().returns(response);
      // response.send = sinon.stub().returns();
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, "create").resolves(true);
      sinon.stub(productsServices, "getAll").resolves(productsMock);
    });

    after(() => {
      productsServices.create.restore();
      productsServices.getAll.restore();
    });

    it("é chamado o status com o código 201", async () => {
      await productsControllers.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
});

describe('4 - Atualizar os produtos pelo id no DB', async  () => {

  describe('quanto não é atualizado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = { id: 1};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, 'updateById').resolves(false);
    })

    after(() => {
      productsServices.updateById.restore();
    });

    it('é chamado o método "status" passando o código 404', async () => {
      await productsControllers.updateById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Product not found"', async () => {
      await productsControllers.updateById(request, response);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  })
  describe('quando é atualizado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = { id: 1};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, 'updateById').resolves([
        {
          "productId": 5,
          "quantity": 15
        }
     ]);
    })

    after(() => {
      productsServices.updateById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsControllers.updateById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um object', async () => {
      await productsControllers.updateById(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  })
});

describe('5 - Delete produtos no DB', () => {

  describe('quando não é deletado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, 'deleteById').resolves(false);
    })

    after(() => {
      productsServices.deleteById.restore();
    });

    it('é chamado o método "status" passando o código 404', async () => {
      await productsControllers.deleteById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Dados inválidos"', async () => {
      await productsControllers.deleteById(request, response);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  })
  describe('quando é deletado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      response.end = sinon.stub().returns();

      sinon.stub(productsServices, 'deleteById').resolves({});
    })

    after(() => {
      productsServices.deleteById.restore();
    });

    it('é chamado o método "status" passando o código 204', async () => {
      await productsControllers.deleteById(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });

    it('é chamado o end', async () => {
      await productsControllers.deleteById(request, response);
      expect(response.end.calledWith()).to.be.equal(true);
    });
  });
});
