const sinon = require('sinon');
const { expect } = require('chai');
const productsModels = require('../../../models/productsModels');
const connection = require('../../../db/connection');

describe('1 - Busca todos os dados dos produtos no DB', () => {
  describe('Quando não existe nenhum produto', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retornar um array', async () => {
      const [resultado] = await productsModels.getAll();
      expect(resultado).to.be.an('array');
    });

    it('Array esta vazio', async () => {
      const [resultado] = await productsModels.getAll();
      expect(resultado).to.be.empty;
    });
  });
  describe('Quando existe produtos', () => {
    before(async () => {
      const produtos = {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        };

      sinon.stub(connection, 'execute').resolves([[produtos]]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retornar um array', async () => {
      const [resultado] = await productsModels.getAll();
      expect(resultado).to.be.an('array');
    });

    it('Array não esta vazio', async () => {
      const [resultado] = await productsModels.getAll();
      expect(resultado).to.not.be.empty;
    });

    it('O array possui itens do tipo objeto', async () => {
      const [resultado] =  await productsModels.getAll();
      expect(resultado[0]).to.be.an('object');
    });

    it(`O objeto possui as propriedades: "id", "name" e "quantity"`, async () => {
      const [resultado] =  await productsModels.getAll();
      expect(resultado[0]).to.include.all.keys("id", "name", "quantity");
  });
  });
});

describe('2 - Busca todos os dados por id no DB', () => {
  describe('Quando não existe nenhum produto', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retornar um array', async () => {
      const [resultado] = await productsModels.getById(1);
      expect(resultado).to.be.an('array');
    });

    it('Array esta vazio', async () => {
      const [resultado] = await productsModels.getById(1);
      expect(resultado).to.be.empty;
    });
  });
  describe('Quando existe produtos', () => {
    before(async () => {
      const produtos = {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        };

      sinon.stub(connection, 'execute').resolves([[produtos]]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Retornar um array', async () => {
      const [resultado] = await productsModels.getById(1);
      expect(resultado).to.be.an('array');
    });

    it('Array não esta vazio', async () => {
      const [resultado] = await productsModels.getById(1);
      expect(resultado).to.not.be.empty;
    });

    it('O array possui itens do tipo objeto', async () => {
      const [resultado] =  await productsModels.getById(1);
      expect(resultado[0]).to.be.an('object');
    });

    it(`O objeto possui as propriedades: "id", "name" e "quantity"`, async () => {
      const [resultado] =  await productsModels.getById(1);
      expect(resultado[0]).to.include.all.keys("id", "name", "quantity");
  });
  });
});

describe('3 - Insere novos produtos no DB', () => {
  const produto = {
    "name": "Espada do Jaspion",
    "quantity": 10
  };

  before(async () => {
    const execute = [{ id: 1 }];
    sinon.stub(connection, 'execute').resolves([[execute]]);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('Quando é inserido com sucesso', async () => {
    it('retorna um objeto', async () => {
      const response = await productsModels.create(produto);
      expect(response).to.be.a('object');
    });

    it('Objeto não esta vazio', async () => {
      const response = await productsModels.create(produto);
      expect(response).to.not.be.empty;
    });

    it(`O objeto possui as propriedades: "id", "name" e "quantity"`, async () => {
      const response =  await productsModels.create(produto);
      expect(response).to.include.all.keys("id", "name", "quantity");
  })
});
})

describe('4 - Atualizar produtos no DB', () => {
  describe('Quando não existe o produto', () => {
    let executeSpy;
    beforeEach(() => {
        executeSpy = sinon.stub(connection, 'execute').resolves([[{ affectedRows: 0 }]]);
    });

    afterEach(() => {
        connection.execute.restore();
    });

    it('Retornar um array', async () => {
      const [resultado] =  await productsModels.updateById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado).to.be.an('array');
    });

    it('Retornar um objeto', async () => {
      const [resultado] =  await productsModels.updateById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado[0]).to.be.an('object');
    });

    it('retornar `affectedRows` igual a 0', async () => {
      const [resultado] = await productsModels.updateById(1);
      expect(resultado[0]).to.has.key('affectedRows');
      expect(resultado[0].affectedRows).to.be.equal(0);
      expect(executeSpy.callCount).to.be.equal(1);
    });

    it('verifica se está executando uma Query `UPDATE`',  async () => {
      await productsModels.updateById(1);
      expect(executeSpy.callCount).to.be.equal(1);
      expect(executeSpy.getCalls()[0].firstArg).to.contain("UPDATE");
  });
  });
  describe('Quando existe o produto', () => {
    let executeSpy;

    beforeEach(() => {
        executeSpy = sinon.stub(connection, 'execute').resolves([[{ affectedRows: 1 }]]);
    });

    afterEach(() => {
        connection.execute.restore();
    });

    it('Retornar um array', async () => {
      const [resultado] =  await productsModels.updateById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado).to.be.an('array');
    });

    it('Retornar um objeto', async () => {
      const [resultado] =  await productsModels.updateById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado[0]).to.be.an('object');
    });

    it('retornar `affectedRows` igual a 1', async () => {
      const [resultado] = await productsModels.updateById(1);
      expect(resultado[0]).to.has.key('affectedRows');
      expect(resultado[0].affectedRows).to.be.equal(1);
      expect(executeSpy.callCount).to.be.equal(1);
    });

    it('verifica se está executando uma Query `UPDATE`',  async () => {
      await productsModels.updateById(1);
      expect(executeSpy.callCount).to.be.equal(1);
      expect(executeSpy.getCalls()[0].firstArg).to.contain("UPDATE");
  });
});
});

describe('5 - Delete produtos no DB', () => {
  describe('Quando não existe o produto', () => {
    let executeSpy;
    beforeEach(() => {
        executeSpy = sinon.stub(connection, 'execute').resolves([[{ affectedRows: 0 }]]);
    });

    afterEach(() => {
        connection.execute.restore();
    });

    it('Retornar um array', async () => {
      const [resultado] =  await productsModels.deleteById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado).to.be.an('array');
    });

    it('Retornar um objeto', async () => {
      const [resultado] =  await productsModels.deleteById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado[0]).to.be.an('object');
    });

    it('retornar `affectedRows` igual a 0', async () => {
      const [resultado] = await productsModels.deleteById(1);
      expect(resultado[0]).to.has.key('affectedRows');
      expect(resultado[0].affectedRows).to.be.equal(0);
      expect(executeSpy.callCount).to.be.equal(1);
    });

    it('verifica se está executando uma Query `DELETE`',  async () => {
      await productsModels.deleteById(1);
      expect(executeSpy.callCount).to.be.equal(1);
      expect(executeSpy.getCalls()[0].firstArg).to.contain("DELETE");
    });
  });
  describe('Quando existe o produto', () => {
    let executeSpy;

    beforeEach(() => {
        executeSpy = sinon.stub(connection, 'execute').resolves([[{ affectedRows: 1 }]]);
    });

    afterEach(() => {
        connection.execute.restore();
    });

    it('Retornar um array', async () => {
      const [resultado] =  await productsModels.deleteById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado).to.be.an('array');
    });

    it('Retornar um objeto', async () => {
      const [resultado] =  await productsModels.deleteById(1);
      expect(resultado).to.not.be.empty;
      expect(resultado[0]).to.be.an('object');
    });

    it('retornar `affectedRows` igual a 1', async () => {
      const [resultado] = await productsModels.deleteById(1);
      expect(resultado[0]).to.has.key('affectedRows');
      expect(resultado[0].affectedRows).to.be.equal(1);
      expect(executeSpy.callCount).to.be.equal(1);
    });

    it('verifica se está executando uma Query `DELETE`',  async () => {
      await productsModels.deleteById(1);
      expect(executeSpy.callCount).to.be.equal(1);
      expect(executeSpy.getCalls()[0].firstArg).to.contain("DELETE");
  });
});
});

