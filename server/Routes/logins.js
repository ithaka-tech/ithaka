const express = require('express');
const { ClientSchema, validateLoginBody } = require('../DBModels/client');
const mongoose = require('mongoose');
const shajs = require('sha.js');
const { createNewSession } = require('../DBModels/session');

const router = express.Router();
     
router.get('/', (req, res) => {
    const error = validateLoginBody(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const loginAuth = validateLogin(req.body.client_email, req.body.client_password);
    if(!loginAuth) return res.status(400).send('Bad request'); //user email and password not found on our database

    res.send({
        session_ID: createNewSession(),//TODO Session ID logic
        account_info: loginAuth
    });
});

async function validateLogin(email, password) {

    const sha256pword = String(shajs.sha256().update(password).digest('hex'))
    const Client = await ClientSchema.findOne({client_email: email, client_password: sha256pword}).select({client_name, client_ID});
    //if non null return the objects desired info, else return null
    if(Client) return Client;
    return null;
}