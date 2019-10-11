'use strict';
const {contacts} = require('../db/db');
const validateContact = require('../middlewares/validateContact');
const validateMarketingPreference = require('../middlewares/validateMarketingPreference');
// GET-POST contacts, +
// GET-PUT-DELETE contacts/:contactId
// GET - POST contacts/:contactId/marketingPreferences
// GET - PUT - DELETE  contacts/:contactId/:marketingPreference
const findById = (id, arr) => {
    return arr.filter(contact => contact.id === id)[0];
};
const respond404 = (res, msg) => {
    return res.status(404).send({
        success: 'false',
        message: msg,
    });
};

const deleteById = (id, arr) => {
    //return arr.filter(el => el.id !== id);
    arr.map((contact, index) => {
        if (contact.id === id) {
            arr.splice(index, 1);
        }
    });
};

module.exports = app => {
    // RETURN ALL contacts
    app.get('/api/contacts', (req, res) => {
        res.status(200).send({
            success: 'true',
            message: 'contacts retrieved successfully',
            contacts
        })
    });
    // CREATE contact
    app.post('/api/contacts', validateContact, (req, res) => {
        const {firstname, lastname, email, marketingPreferences} = req.body;
        const contact = {
            id: contacts.length,
            firstname: firstname || '',
            lastname: lastname || '',
            email,
            marketingPreferences

        };
        contacts.push(contact);
        return res.status(201).send({
            success: 'true',
            message: 'contact added successfully',
            contact
        })
    });
    // GET single contact
    app.get('/api/contact/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        const contact = findById(id, contacts);
        if (contact) {
            return res.status(200).send({
                success: 'true',
                message: 'contact retrieved successfully',
                contact
            });
        } else {
            return respond404(res, 'contact does not exist');
        }

    });
    // DELETE contact
    app.delete('/api/contact/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        if (!findById(id, contacts)) {
            return respond404(res, 'contact does not exist');
        }
        deleteById(id, contacts);
        return res.status(200).send({
            success: 'true',
            message: 'Contact deleted successfuly',
        });


    });
    // UPDATE contact
    app.put('/api/contact/:id', validateContact, (req, res) => {
        const {firstname, lastname, email, marketingPreferences} = req.body;
        const id = parseInt(req.params.id, 10);
        const contact = findById(id, contacts);
        if (!contact) {
            return respond404(res, 'contact does not exist');
        }

        let itemIndex;
        contacts.map((item, index) => {
            if (item.id === id) {
                itemIndex = index;
            }
        });

        const updatedContact = {
            id: contact.id,
            firstname: firstname || contact.firstname,
            lastname: lastname || contact.lastname,
            email,
            marketingPreferences
        };
        if (itemIndex) contacts.splice(itemIndex, 1, updatedContact);

        return res.status(201).send({
            success: 'true',
            message: 'contact has been updated successfully',
            updatedContact,
        });
    });
    // GET contacts/:contactId/marketingPreferences
    app.get('/api/contacts/:contactId/marketingPreferences', (req, res) => {
        const id = parseInt(req.params.contactId, 10);
        const contact = findById(id, contacts);
        if (contact) {
            return res.status(200).send({
                success: 'true',
                message: 'marketingPreferences retrieved successfully',
                marketingPreferences: contact.marketingPreferences
            });
        } else {
            return respond404(res, 'contact does not exist');
        }
    });
    // POST contacts/:contactId/marketingPreferences
    app.post('/api/contacts/:contactId/marketingPreferences', validateMarketingPreference, (req, res) => {
        const {brandName, channel, optInStatus} = req.body;
        const id = parseInt(req.params.contactId, 10);
        const contact = findById(id, contacts);
        if (contact) {
            const newMarketingPreference = {
                id: contact.marketingPreferences.length,
                brandName,
                channel,
                optInStatus
            };
            contact.marketingPreferences = [...contact.marketingPreferences, newMarketingPreference];
            return res.status(201).send({
                success: 'true',
                message: 'marketing preference added successfully',
                marketingPreferences: contact.marketingPreferences
            })
        } else {
            return respond404(res, 'contact does not exist');
        }
    });
    // GET contacts/:contactId/:marketingPreference
    app.get('/api/contacts/:contactId/:marketingPreferenceId', (req, res) => {
        const contactId = parseInt(req.params.contactId, 10);
        const contact = findById(contactId, contacts);
        if (!contact) {
            return respond404(res, 'contact does not exist');
        } else {
            const marketingPreferenceId = parseInt(req.params.marketingPreferenceId, 10);
            const marketingPreference = findById(marketingPreferenceId, contact.marketingPreferences);
            if (!marketingPreference) {
                return respond404(res, 'marketing preference does not exist');
            } else {
                return res.status(200).send({
                    success: 'true',
                    message: 'marketingPreference retrieved successfully',
                    marketingPreference
                });
            }
        }
    });
    // PUT contacts/:contactId/:marketingPreference
    app.put('/api/contacts/:contactId/:marketingPreferenceId', validateMarketingPreference, (req, res) => {
        const {brandName, channel, optInStatus} = req.body;
        const contactId = parseInt(req.params.contactId, 10);
        const contact = findById(contactId, contacts);
        if (!contact) {
            return respond404(res, 'contact does not exist');
        } else {
            const marketingPreferenceId = parseInt(req.params.marketingPreferenceId, 10);
            let marketingPreference = findById(marketingPreferenceId, contact.marketingPreferences);
            if (!marketingPreference) {
                return respond404(res, 'marketing preference does not exist');
            } else {
                const updatedMarketingPreference = {
                    id: marketingPreference.id,
                    brandName,
                    channel,
                    optInStatus
                };
                let marketingPreferenceIndex = -1;
                contact.marketingPreferences.map((item, index) => {
                    if (item.id === marketingPreferenceId) {
                        marketingPreferenceIndex = index;
                    }
                });
                contact.marketingPreferences.splice(marketingPreferenceIndex, 1, updatedMarketingPreference);
                return res.status(200).send({
                    success: 'true',
                    message: 'marketingPreference updated successfully',
                    marketingPreference: updatedMarketingPreference
                });
            }
        }
    });
    // DELETE contacts/:contactId/:marketingPreference
    app.delete('/api/contacts/:contactId/:marketingPreferenceId', (req, res) => {
        const contactId = parseInt(req.params.contactId, 10);
        const contact = findById(contactId, contacts);
        if (!contact) {
            return respond404(res, 'contact does not exist');
        } else {
            const marketingPreferenceId = parseInt(req.params.marketingPreferenceId, 10);
            const marketingPreference = findById(marketingPreferenceId, contact.marketingPreferences);
            if (!marketingPreference) {
                return respond404(res, 'marketing preference does not exist');
            } else {
                deleteById(marketingPreferenceId, contact.marketingPreferences);
                return res.status(200).send({
                    success: 'true',
                    message: 'marketingPreference deleted successfully',
                    marketingPreference
                });
            }
        }
    })
};