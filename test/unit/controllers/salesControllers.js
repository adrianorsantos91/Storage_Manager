const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesControllers = require('../../../controllers/salesControllers');
const salesMock = require('../../../Mock/salesMock');

describe('1 - Busca todos os dados de vendas no DB [Controllers - Sales]', async () => {
  const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, 'getAll').resolves(salesMock);
    })

    after(() => {
      salesServices.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await salesControllers.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await salesControllers.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
});
describe('2 - Busca todos os dados das produtos por id no DB', async () => {
  describe("quando é inserido sem sucesso", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = { id: 1};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, 'getById').resolves(false);
    })

    after(() => {
      salesServices.getById.restore();
    });

    it('é chamado o método "status" passando o código 404', async () => {
      await salesControllers.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Sale not found"', async () => {
      await salesControllers.getById(request, response);

      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });

  });
  describe("quando é inserido com sucesso", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};
      request.params = { id: 1};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, 'getById').resolves([
        {
          "date": "2022-06-09T16:32:54.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "date": "2022-06-09T16:32:54.000Z",
          "productId": 2,
          "quantity": 10
        }
      ]);
    })

    after(() => {
      salesServices.getById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await salesControllers.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await salesControllers.getById(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
describe('3 - Insere novos produtos no DB', async () => {
  describe("quando é inserido sem sucesso", async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: "Gavião",
        quantity: 1
      };

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(salesServices, "create").resolves(false);
    });

    after(() => {
      salesServices.create.restore();
    });

    it("é chamado o status com o código 400", async () => {
      await salesControllers.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it("é chamado o json com a mensagem 'Venda não adicionada'", async () => {
      await salesControllers.create(request, response);

      expect(response.send.calledWith('Venda não adicionada')).to.be.equal(true);
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
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, "create").resolves(true);
    });

    after(() => {
      salesServices.create.restore();
    });

    it("é chamado o status com o código 201", async () => {
      await salesControllers.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
});

describe('4 - Atualizar as vendas pelo id no DB', async  () => {
  describe('quando é deletado sem sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, 'updateById').resolves(false);
    })

    after(() => {
      salesServices.updateById.restore();
    });

    it('é chamado o método "status" passando o código 404', async () => {
      await salesControllers.updateById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Sale not found"', async () => {
      await salesControllers.updateById(request, response);
      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
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

      sinon.stub(salesServices, 'updateById').resolves([
        {
          "productId": 5,
          "quantity": 15
        }
     ]);
    })

    after(() => {
      salesServices.updateById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await salesControllers.updateById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um object', async () => {
      await salesControllers.updateById(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('5 - Delete produtos no DB', () => {
  describe('quando é deletado sem sucesso', () => {
    const response = {};
      const request = {};

      before(() => {
        request.params = { id: 1};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(salesServices, 'deleteById').resolves(false);
      })

      after(() => {
        salesServices.deleteById.restore();
      });

      it('é chamado o método "status" passando o código 404', async () => {
        await salesControllers.deleteById(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('é chamado o send com a mensagem "Sale not found"', async () => {
        await salesControllers.deleteById(request, response);
        expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
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

        sinon.stub(salesServices, 'deleteById').resolves({});
      })

      after(() => {
        salesServices.deleteById.restore();
      });

      it('é chamado o método "status" passando o código 204', async () => {
        await salesControllers.deleteById(request, response);

        expect(response.status.calledWith(204)).to.be.equal(true);
      });

      it('é chamado o send com a mensagem "Dados inválidos"', async () => {
        await salesControllers.deleteById(request, response);
        expect(response.end.calledWith()).to.be.equal(true);
      });
  })
});
