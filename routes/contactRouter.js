const express = require('express');
const contactrouter = express.Router();
const requireAdminAuth = require('../middlewares/requireAdminAuth');
const { createContact, deleteContact, getContactById, getContact,countContacts } = require('../controllers/contactController');


contactrouter.post('/', createContact);


contactrouter.delete('/:id', requireAdminAuth, deleteContact);

contactrouter.get('/:id', getContactById);

contactrouter.get('/', getContact);
contactrouter.get('/count/c', countContacts);



module.exports = contactrouter;
