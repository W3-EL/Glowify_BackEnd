const express = require('express');
const Paymentrouter = express.Router();
const { Addpayment ,Verifypayment } = require('../controllers/paymentController');




Paymentrouter.post('/', Addpayment);
Paymentrouter.get('/:id', Verifypayment);



module.exports = Paymentrouter;
