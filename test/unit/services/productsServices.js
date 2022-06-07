const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productsServices');
const productsModels = require('../../../models/productsModels');

describe('1 - Busca todos os dados dos produtos no DB [Service]', () => {
  describe('Quando não existe nenhum produto', () => {
    before(() => {
      sinon.stub(productsModels, 'getAll').resolves([[]]);
    });

    after(() => {
      productsModels.getAll.restore();
    });

    it('Retornar um array', async () => {
      const resultado = await productsServices.getAll();
      expect(resultado).to.be.an('array');
    });

    it('Array esta vazio', async () => {
      const resultado = await productsServices.getAll();
      expect(resultado).to.be.empty;
    });
  });
  describe('Quando existe produtos', () => {
    before(() => {
      const produtos = {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        };

        sinon.stub(productsModels, 'getAll').resolves([[produtos]]);
    });

    after(() => {
      productsModels.getAll.restore();
    });

    it('Retornar um array', async () => {
      const resultado = await productsServices.getAll();
      expect(resultado).to.be.an('array');
    });

    it('Array não esta vazio', async () => {
      const resultado = await productsServices.getAll();
      expect(resultado).to.not.be.empty;
    });

    it('O array possui itens do tipo objeto', async () => {
      const resultado =  await productsServices.getAll();
      expect(resultado[0]).to.be.an('object');
    });

    it(`O objeto possui as propriedades: "id", "name" e "quantity"`, async () => {
      const resultado =  await productsServices.getAll();
      expect(resultado[0]).to.include.all.keys("id", "name", "quantity");
  });
  });
});

describe('2 - Busca todos os dados por id no DB', () => {
  describe('Quando não existe nenhum produto', () => {
    before(() => {
      sinon.stub(productsModels, 'getById').resolves([[]]);
    });

    after(() => {
      productsModels.getById.restore();
    });

    it('Retornar um array', async () => {
      const resultado = await productsServices.getById(1);
      expect(resultado).to.be.an('array');
    });

    it('Array esta vazio', async () => {
      const resultado = await productsServices.getById(1);
      expect(resultado).to.be.empty;
    });
  });
  describe('Quando existe produtos', () => {
    before(() => {
      const produtos = {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        };

        sinon.stub(productsModels, 'getById').resolves([[produtos]]);
    });

    after(() => {
      productsModels.getById.restore();
    });

    it('Retornar um array', async () => {
      const resultado = await productsServices.getById(1);
      expect(resultado).to.be.an('array');
    });

    it('Array não esta vazio', async () => {
      const resultado = await productsServices.getById(1);
      expect(resultado).to.not.be.empty;
    });

    it('O array possui itens do tipo objeto', async () => {
      const resultado =  await productsServices.getById(1);
      expect(resultado[0]).to.be.an('object');
    });

    it(`O objeto possui as propriedades: "id", "name" e "quantity"`, async () => {
      const resultado =  await productsServices.getById(1);
      expect(resultado[0]).to.include.all.keys("id", "name", "quantity");
  });
  });
});

describe('3 - Insere novos produtos no DB', () => {

  describe('Quando é inserido sem sucesso', async () => {
    const produto = {};
    before(() => {
      sinon.stub(productsServices, "create").resolves(false);
    });

    after(() => {
      productsServices.create.restore();
    });

    it('retorna um bollean', async () => {
      const response = await productsServices.create(produto);
      expect(response).to.be.a('boolean');
    });

    it('retorno é `false`', async () => {
      const response = await productsServices.create(produto);
      expect(response).to.be.equal(false);
    });
  });
  describe('Quando é inserido com sucesso', async () => {
    const produto = {
      "name": "Espada do Jaspion",
      "quantity": 10
    };

    before(async () => {
      const ID_PRODUCT = 1;
      sinon.stub(productsServices, "create").resolves({ id: ID_PRODUCT});
    });

    after(async () => {
      productsServices.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsServices.create(produto);
      expect(response).to.be.a('object');
    });

    it('Objeto não esta vazio', async () => {
      const response = await productsServices.create(produto);
      expect(response).to.not.be.empty;
    });

    it(`O objeto possui o "id" do novo produto`, async () => {
      const response =  await productsServices.create(produto);
      expect(response).to.have.a.property('id');
    });
  });
})

describe('4 - Atualizar produtos no DB', () => {
  describe('Quando não existe o produto chamando model', () => {
    let executeSpy;
    beforeEach(() => {
      executeSpy = sinon.stub(productsModels, "updateById").resolves([[{ changedRows: 0 }]]);
    });

    afterEach(() => {
      productsModels.updateById.restore();
    });

    it('Retorna o resultado `false`',  async () => {
      const resultado = await productsServices.updateById(1, { name: "name", quantity: 1 });
      expect(resultado).to.be.an('boolean');
      expect(resultado).to.be.equal(false);
      expect(executeSpy.callCount).to.be.equal(1);

      expect(executeSpy.getCalls()[0].args.length).to.be.equal(3);
      expect(executeSpy.getCalls()[0].args[0]).to.be.an('number');
      expect(executeSpy.getCalls()[0].args[1]).to.be.an('string');
      expect(executeSpy.getCalls()[0].args[2]).to.be.an('number');
    });
  });
  describe('Quando existe o produto chamando model', () => {
    let executeSpy;
    beforeEach(() => {
      executeSpy = sinon.stub(productsModels, "updateById").resolves([[{ changedRows: 1 }]]);
    });

    afterEach(() => {
      productsModels.updateById.restore();
    });

    it('Retorna o resultado `true`',  async () => {
      const resultado = await productsServices.updateById(1, { name: "name", quantity: 1 });
      expect(resultado).to.be.an('boolean');
      expect(resultado).to.be.equal(false);
      expect(executeSpy.callCount).to.be.equal(1);

      expect(executeSpy.getCalls()[0].args.length).to.be.equal(3);
      expect(executeSpy.getCalls()[0].args[0]).to.be.an('number');
      expect(executeSpy.getCalls()[0].args[1]).to.be.an('string');
      expect(executeSpy.getCalls()[0].args[2]).to.be.an('number');
    });
  });
  describe('Quando não existe o produto', () => {
    let executeSpy;
    beforeEach(() => {
      executeSpy = sinon.stub(productsServices, "updateById").resolves([[{ changedRows: 0 }]]);
    });

    afterEach(() => {
      productsServices.updateById.restore();
    });

    it('Retornar um array', async () => {
      const [resultado] =  await productsServices.updateById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado).to.be.an('array');
    });

    it('Retornar um objeto', async () => {
      const [resultado] =  await productsServices.updateById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado[0]).to.be.an('object');
    });

    it('retornar `changedRows` igual a 0', async () => {
      const [resultado] = await productsServices.updateById(1);
      expect(resultado[0]).to.has.key('changedRows');
      expect(resultado[0].changedRows).to.be.equal(0);
      expect(executeSpy.callCount).to.be.equal(1);
    });
  });
  describe('Quando existe o produto', () => {
    let executeSpy;

    beforeEach(() => {
      executeSpy = sinon.stub(productsServices, 'updateById').resolves([[{ changedRows: 1 }]]);
    });

    afterEach(() => {
      productsServices.updateById.restore();
    });

    it('Retornar um array', async () => {
      const [resultado] =  await productsServices.updateById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado).to.be.an('array');
    });

    it('Retornar um objeto', async () => {
      const [resultado] =  await productsServices.updateById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado[0]).to.be.an('object');
    });

    it('retornar `changedRows` igual a 1', async () => {
      const [resultado] = await productsServices.updateById(1);
      expect(resultado[0]).to.has.key('changedRows');
      expect(resultado[0].changedRows).to.be.equal(1);
      expect(executeSpy.callCount).to.be.equal(1);
    });
  });
});

describe('5 - Delete produtos no DB', () => {
  describe('Quando não existe o produto', () => {
    let deleteByIdSpy;
    beforeEach(() => {
      deleteByIdSpy = sinon.stub(productsServices, 'deleteById').resolves([[{ affectedRows: 0 }]]);
    });

    afterEach(() => {
      productsServices.deleteById.restore();
    });

    it('Retornar um array', async () => {
      const [resultado] =  await productsServices.deleteById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado).to.be.an('array');
    });

    it('Retornar um objeto', async () => {
      const [resultado] =  await productsServices.deleteById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado[0]).to.be.an('object');
    });

    it('retornar `affectedRows` igual a 0', async () => {
      const [resultado] = await productsServices.deleteById(1);
      expect(resultado[0]).to.has.key('affectedRows');
      expect(resultado[0].affectedRows).to.be.equal(0);
      expect(deleteByIdSpy.callCount).to.be.equal(1);
    });
  });
  describe('Quando existe o produto', () => {
    let deleteByIdSpy;
    beforeEach(() => {
      deleteByIdSpy = sinon.stub(productsServices, 'deleteById').resolves([[{ affectedRows: 1 }]]);
    });

    afterEach(() => {
      productsServices.deleteById.restore();
    });

    it('Retornar um array', async () => {
      const [resultado] =  await productsServices.deleteById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado).to.be.an('array');
    });

    it('Retornar um objeto', async () => {
      const [resultado] =  await productsServices.deleteById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado[0]).to.be.an('object');
    });

    it('retornar `affectedRows` igual a 1', async () => {
      const [resultado] = await productsServices.deleteById(1);
      expect(resultado[0]).to.has.key('affectedRows');
      expect(resultado[0].affectedRows).to.be.equal(1);
      expect(deleteByIdSpy.callCount).to.be.equal(1);
    });
});
});


