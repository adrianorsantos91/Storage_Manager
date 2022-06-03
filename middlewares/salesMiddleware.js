const validateProductIdSalesMiddleware = (req, res, next) => {
  const { productId } = req.body;
   if (!productId) {
     return res.status(400).send({ message: '"productId" is required' });
   }

   next();
};

const validateQuantitySalesMiddleware = (req, res, next) => {
  const { quantity } = req.body;
if (!quantity) {
  return res.status(400).send({ message: '"quantity" is required' });
 }

 // typeof quantity === 'number'
 if (!Number.isInteger(quantity) || quantity <= 0) {
  return res.status(422).send(
    { message: '"quantity" must be greater than or equal to 1' },
  );
 }

 next();
};

module.exports = {
  validateProductIdSalesMiddleware,
  validateQuantitySalesMiddleware,
 };
