// const sinon = require('sinon');
// const { expect } = require('chai');

// const productsServices = require('../../../services/productsServices');
// const connection = require('../../../models/connection');

// describe('Regra de negócio para o DB', () => {
//   describe('Quando não existe nenhum produto', () => {
//     before(async () => {
//       sinon.stub(connection, 'execute').resolves([[]]);
//     });

//     after(async () => {
//       connection.execute.restore();
//     });
//     it('Retornar um array', async () => {
//       const [resultado] = await productsServices.getAll();
//       expect(resultado).to.be.an('array');
//     });
//     it('Array esta vazio', async () => {
//       const [resultado] = await productsServices.getAll();
//       expect(resultado).to.be.empty;
//     });
//   });
//   describe('Quando existe produtos', () => {
//     before(async () => {
//       const produtos = {
//           "id": 1,
//           "name": "Martelo de Thor",
//           "quantity": 10
//         };

//       sinon.stub(connection, 'execute').resolves([[produtos]]);
//     });

//     after(async () => {
//       connection.execute.restore();
//     });
//     it('Retornar um array', async () => {
//       const [resultado] = await productsServices.getAll();
//       expect(resultado).to.be.an('array');
//     });
//     it('Array não esta vazio', async () => {
//       const [resultado] = await productsServices.getAll();
//       expect(resultado).to.not.be.empty;
//     });
//     it('O array possui itens do tipo objeto', async () => {
//       const [resultado] =  await productsServices.getAll();
//       expect(resultado[0]).to.be.an('object');
//     });
//     it(`O objeto possui as propriedades: "id", "name" e "quantity"`, async () => {
//       const [resultado] =  await productsServices.getAll();
//       expect(resultado[0]).to.include.all.keys("id", "name", "quantity");
//   });
//   })
// });
