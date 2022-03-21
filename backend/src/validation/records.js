const {checkSchema} = require("express-validator");

const recordValidator = checkSchema({
  "name": {
    trim: true,
    notEmpty: {
      errorMessage: 'Name field is empty.',
      options: {ignore_whitespace: true}
    },
  },
  "quantity": {
    notEmpty: {
      errorMessage: "Quantity is empty.",
      options: {ignore_whitespace: true}
    },
    isInt: {
      errorMessage: 'Quantity is not a number or less than equals to 0.',
      options: {
        gt: 0
      },
      bail: true,
    },
    toInt: true
  },
  "price": {
    notEmpty: {
      errorMessage: "Price is empty.",
      options: {ignore_whitespace: true}
    },
    isInt: {
      errorMessage: 'Price is not a number or less than equals to 0.',
      options: {
        gt: 0
      },
      bail: true
    },
    toInt: true
  },
  "additional_info": {
    optional: {
      options: {nullable: true}
    },
    notEmpty: {
      errorMessage: "Additional info is empty.",
      options: {ignore_whitespace: true}
    }
  }
});

module.exports = {
  recordValidator
}