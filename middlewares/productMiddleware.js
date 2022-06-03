// const Joi = require('joi');

// const validateProducts = Joi.object({
//   name: Joi.string().min(5).required(),
//   quantity: Joi.number().greater(0).required,

// }).messages({
//   'any.required': '{{#label}} is required',
//   'string.min': '{{#label}} length must be at least 5 characters long',
//   'number.base': '{{#label}} must be numeric',
//   'number.greater': '{{#label}} must be greater than or equal to 1',
// });

// const validateProductsMiddleware = (req, res, next) => {
//   const { error } = validateProducts.validate(req.body, { abortEarly: false });
//   console.log('Joi Error', error);
//   if (error) {
//       const messages = error.details.map((e) => e.message);
//       return res.status(401).json({ errors: messages });
//   }
//   next();
// };

const validateNameProductsMiddleware = (req, res, next) => {
  const { name } = req.body;
   if (!name) {
     return res.status(400).send({ message: '"name" is required' });
   }

   if (name.length < 5) {
     return res.status(422).send(
       { message: '"name" length must be at least 5 characters long' },
      );
   }
   next();
};

const validateQuantityProductsMiddleware = (req, res, next) => {
  const { quantity } = req.body;
if (!quantity) {
  return res.status(400).send({ message: '"quantity" is required' });
 }
 console.log(typeof 10.5);

 // typeof quantity === 'number'
 if (!Number.isInteger(quantity) || quantity <= 0) {
  return res.status(422).send(
    { message: '"quantity" must be greater than or equal to 1' },
  );
 }
 next();
};

module.exports = {
  validateNameProductsMiddleware,
  validateQuantityProductsMiddleware,
 };
