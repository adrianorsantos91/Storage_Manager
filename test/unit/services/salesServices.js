// const sinon = require('sinon');
// const { expect } = require('chai');
// const salesServices = require('../../../services/salesServices');
// const connection = require('../../../models/connection');

// describe('1 - Busca todos os dados de vendas no DB', () => {
//   describe('Quando não existe nenhuma venda', () => {
//     before(async () => {
//       sinon.stub(connection, 'execute').resolves([[]]);
//     });

//     after(async () => {
//       connection.execute.restore();
//     });

//     it('Retornar um array', async () => {
//       const [resultado] = await salesServices.getAll();
//       expect(resultado).to.be.an('array');
//     });

//     it('Array esta vazio', async () => {
//       const [resultado] = await salesServices.getAll();
//       expect(resultado).to.be.empty;
//     });
//   });
//   describe('Quando existe vendas', () => {
//     before(async () => {
//       const vendas = {
//         "id": 1,
//         "date": "2022-06-07T05:56:58.000Z",
//         "product_id": 1,
//         "quantity": 10
//       };

//       sinon.stub(connection, 'execute').resolves([[vendas]]);
//     });

//     after(async () => {
//       connection.execute.restore();
//     });

//     it('Retornar um array', async () => {
//       const [resultado] = await salesServices.getAll();
//       expect(resultado).to.be.an('array');
//     });

//     it('Array não esta vazio', async () => {
//       const [resultado] = await salesServices.getAll();
//       expect(resultado).to.not.be.empty;
//     });

//     it('O array possui itens do tipo objeto', async () => {
//       const [resultado] =  await salesServices.getAll();
//       expect(resultado[0]).to.be.an('object');
//     });

//     it(`O objeto possui as propriedades: "id", "date", "product_id" e "quantity"`, async () => {
//       const [resultado] =  await salesServices.getAll();
//       expect(resultado[0]).to.include.all.keys("id", "date", "product_id", "quantity");
//   });
//   });
// });

// describe('2 - Busca todos os dados por id no DB', () => {
//   describe('Quando não existe nenhuma venda', () => {
//     before(async () => {
//       sinon.stub(connection, 'execute').resolves([[]]);
//     });

//     after(async () => {
//       connection.execute.restore();
//     });

//     it('Retornar um array', async () => {
//       const [resultado] = await salesServices.getById(1);
//       expect(resultado).to.be.an('array');
//     });

//     it('Array esta vazio', async () => {
//       const [resultado] = await salesServices.getById(1);
//       expect(resultado).to.be.empty;
//     });
//   });
//   describe('Quando existe vendas', () => {
//     before(async () => {
//       const vendas = {
//         "id": 1,
//         "date": "2022-06-07T05:56:58.000Z",
//         "product_id": 1,
//         "quantity": 10
//       };

//       sinon.stub(connection, 'execute').resolves([[vendas]]);
//     });

//     after(async () => {
//       connection.execute.restore();
//     });

//     it('Retornar um array', async () => {
//       const [resultado] = await salesServices.getById(1);
//       expect(resultado).to.be.an('array');
//     });

//     it('Array não esta vazio', async () => {
//       const [resultado] = await salesServices.getById(1);
//       expect(resultado).to.not.be.empty;
//     });

//     it('O array possui itens do tipo objeto', async () => {
//       const [resultado] =  await salesServices.getById(1);
//       expect(resultado[0]).to.be.an('object');
//     });

//     it(`O objeto possui as propriedades: "id", "date", "product_id" e "quantity"`, async () => {
//       const [resultado] =  await salesServices.getById(1);
//       expect(resultado[0]).to.include.all.keys("id", "date", "product_id", "quantity");
//   });
//   });
// });

// describe('3 - Insere novos produtos no DB', () => {
//   const vendas = [
//     {
//     "product_id": 5,
//      "quantity": 20
//     }
//   ];

//   before(async () => {
//     const execute = [{ id: 1 }];
//     sinon.stub(connection, 'execute').resolves([[execute]]);
//   });

//   after(async () => {
//     connection.execute.restore();
//   });

//   describe('Quando é inserido com sucesso', async () => {
//     it('retorna um objeto', async () => {
//       const response = await salesServices.create(vendas);
//       expect(response).to.be.a('object');
//     });

//     it('Objeto não esta vazio', async () => {
//       const response = await salesServices.create(vendas);
//       expect(response).to.not.be.empty;
//     });

//     it(`O objeto possui as propriedades: "id" e "itemsSold"`, async () => {
//       const response =  await salesServices.create(vendas);
//       expect(response).to.include.all.keys("id", "itemsSold");
//     })

//     it('Retornar um array itemsSold', async () => {
//       const response = await salesServices.create(vendas);
//       expect(response.itemsSold).to.be.an('array');
//     });

//     it('itemsSold array não esta vazio', async () => {
//       const response = await salesServices.create(vendas);
//       expect(response.itemsSold).to.not.be.empty;
//     });

//     it(`O array itemsSold possui objeto com as propriedades: "product_id" e "quantity"`, async () => {
//       const response =  await salesServices.create(vendas);
//       expect(response.itemsSold[0]).to.include.all.keys("product_id", "quantity");
//     })
// });
// })

// // describe('4 - Atualizar produtos no DB', () => {
// //   describe('Quando não existe o produto', () => {
// //     let executeSpy;
// //     beforeEach(() => {
// //         executeSpy = sinon.stub(connection, 'execute').resolves([[{ changedRows: 0 }]]);
// //     });

// //     afterEach(() => {
// //         connection.execute.restore();
// //     });

// //     it('Retornar um array', async () => {
// //       const [resultado] =  await salesModels.updateById(1);
// //       console.log('update: %s', resultado);
// //       expect(resultado).to.not.be.empty;
// //       expect(resultado).to.be.an('array');
// //     });

// //     it('Retornar um objeto', async () => {
// //       const [resultado] =  await salesModels.updateById(1);
// //       expect(resultado).to.not.be.empty;
// //       expect(resultado[0]).to.be.an('object');
// //     });

// //     it('retornar `changedRows` igual a 0', async () => {
// //       const [resultado] = await salesModels.updateById(1);
// //       expect(resultado[0]).to.has.key('changedRows');
// //       expect(resultado[0].changedRows).to.be.equal(0);
// //       expect(executeSpy.callCount).to.be.equal(1);
// //     });

// //     it('verifica se está executando uma Query `UPDATE`',  async () => {
// //       await salesModels.updateById(1);
// //       expect(executeSpy.callCount).to.be.equal(1);
// //       expect(executeSpy.getCalls()[0].firstArg).to.contain("UPDATE");
// //   });
// //   });
// //   describe('Quando existe o produto', () => {
// //     let executeSpy;

// //     beforeEach(() => {
// //         executeSpy = sinon.stub(connection, 'execute').resolves([[{ affectedRows: 1 }]]);
// //     });

// //     afterEach(() => {
// //         connection.execute.restore();
// //     });

// //     it('Retornar um array', async () => {
// //       const [resultado] =  await salesModels.updateById(1);
// //       expect(resultado).to.not.be.empty;
// //       expect(resultado).to.be.an('array');
// //     });

// //     it('Retornar um objeto', async () => {
// //       const [resultado] =  await salesModels.updateById(1);
// //       expect(resultado).to.not.be.empty;
// //       expect(resultado[0]).to.be.an('object');
// //     });

// //     it('retornar `changedRows` igual a 1', async () => {
// //       const [resultado] = await salesModels.updateById(1);
// //       expect(resultado[0]).to.has.key('changedRows');
// //       expect(resultado[0].changedRows).to.be.equal(1);
// //       expect(executeSpy.callCount).to.be.equal(1);
// //     });

// //     it('verifica se está executando uma Query `UPDATE`',  async () => {
// //       await salesModels.updateById(1);
// //       expect(executeSpy.callCount).to.be.equal(1);
// //       expect(executeSpy.getCalls()[0].firstArg).to.contain("UPDATE");
// //   });
// // });
// // });

// /* */

// // describe('5 - Delete produtos no DB', () => {
// //   describe('Quando não existe o produto', () => {
// //     let executeSpy;
// //     beforeEach(() => {
// //         executeSpy = sinon.stub(connection, 'execute').resolves([[{ affectedRows: 0 }]]);
// //     });

// //     afterEach(() => {
// //         connection.execute.restore();
// //     });

// //     it('Retornar um array', async () => {
// //       const [resultado] =  await salesModels.deleteById(1);
// //       expect(resultado).to.not.be.empty;
// //       expect(resultado).to.be.an('array');
// //     });

// //     it('Retornar um objeto', async () => {
// //       const [resultado] =  await salesModels.deleteById(1);
// //       expect(resultado).to.not.be.empty;
// //       expect(resultado[0]).to.be.an('object');
// //     });

// //     it('retornar `affectedRows` igual a 0', async () => {
// //       const [resultado] = await salesModels.deleteById(1);
// //       expect(resultado[0]).to.has.key('affectedRows');
// //       expect(resultado[0].affectedRows).to.be.equal(0);
// //       expect(executeSpy.callCount).to.be.equal(1);
// //     });

// //     it('verifica se está executando uma Query `DELETE`',  async () => {
// //       await salesModels.deleteById(1);
// //       expect(executeSpy.callCount).to.be.equal(1);
// //       expect(executeSpy.getCalls()[0].firstArg).to.contain("DELETE");
// //     });
// //   });
// //   describe('Quando existe o produto', () => {
// //     let executeSpy;

// //     beforeEach(() => {
// //         executeSpy = sinon.stub(connection, 'execute').resolves([[{ affectedRows: 1 }]]);
// //     });

// //     afterEach(() => {
// //         connection.execute.restore();
// //     });

// //     it('Retornar um array', async () => {
// //       const [resultado] =  await salesModels.deleteById(1);
// //       expect(resultado).to.not.be.empty;
// //       expect(resultado).to.be.an('array');
// //     });

// //     it('Retornar um objeto', async () => {
// //       const [resultado] =  await salesModels.deleteById(1);
// //       expect(resultado).to.not.be.empty;
// //       expect(resultado[0]).to.be.an('object');
// //     });

// //     it('retornar `affectedRows` igual a 1', async () => {
// //       const [resultado] = await salesModels.deleteById(1);
// //       expect(resultado[0]).to.has.key('affectedRows');
// //       expect(resultado[0].affectedRows).to.be.equal(1);
// //       expect(executeSpy.callCount).to.be.equal(1);
// //     });

// //     it('verifica se está executando uma Query `DELETE`',  async () => {
// //       await salesModels.deleteById(1);
// //       expect(executeSpy.callCount).to.be.equal(1);
// //       expect(executeSpy.getCalls()[0].firstArg).to.contain("DELETE");
// //   });
// // });
// // });

