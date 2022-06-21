const express = require('express');
const { ClientSchema, validateNewClientBody } = require('../DBModels/client');
const shajs = require('sha.js');

const router = express.Router();
    
//post for creation of new client i.e bussiness
//JSON body of request is defined in validateNewClientBody() in ../DBModels/client.js
router.post('/', async (req, res) => {
    //validate schema
    const error = validateNewClientBody(res.body);
    if(error) return res.status(400).send(error.details[0].message);

    const exists = await ClientSchema.find({
        client_name: req.body.client_name,
        client_email: req.body.client_email,
        client_password: String(shajs.sha256().update(req.body.client_password).digest('hex'))
    });
    if(exists) return res.status(404).send('Client Already Exists');

    const newClient = new ClientSchema(req.body);
    const result = await newClient.save();
    return { 
        client: req.body       
    };

});

module.exports = router;