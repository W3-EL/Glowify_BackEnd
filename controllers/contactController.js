const Contact = require('../models/contactModel');

exports.createContact = async (req, res) => {
    try {
        const { fullname_contact, email, phone, message } = req.body;

        const newContact = new Contact({
            fullname_contact,
            email,
            phone,
            message
        });

        await newContact.save();

        res.status(201).json({ success: true, data: newContact });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


exports.getContact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        
        if (!contact) {
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }
        
        res.json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedContact = await Contact.findOneAndDelete({ _id: id });

        if (!deletedContact) {
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }

        res.json({ success: true, data: deletedContact });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
