const express = require('express');
const mongoose = require('mongoose');
const { CustomerSchema, validateCustomerBody, validateCustomerPostBody } = require('../DBModels/customer');
const { validateSessionID } = require('../DBModels/session');

const router = express.Router();

//gets list of all customers
router.get('/', async (req, res) => {
    //checks if the body of the request is correct
    const validError = validateCustomerBody(req.body);
    if(validError) return res.status(400).send(validError.details[0].message);

    //checks if the session ID is active
    const activeSession = validateSessionID(req.body.session_ID);
    if(!activeSession) return res.status(401).send('Unauthorized Request');

    //asynchronously gather all the customers and send
    const customers = await CustomerSchema.find({
        customer_client_ID: req.body.customer_client_ID 
    });

    return {
        newEntry: customers,
        session_ID: req.body.session_ID
    };
});

//gets a single customer by customer ID 
router.get('/:customerID', (res, req) => {
    //checks if the body of the request is correct
    const validError = validateCustomerBody(req.body);
    if(validError) return res.status(400).send(validError.details[0].message);

    //checks if the session ID is active
    const activeSession = validateSessionID(req.body.session_ID);
    if(!activeSession) return res.status(401).send('Unauthorized Request');

    //asynchronously gather all the customers and send
    const customers = await CustomerSchema.findOne({
        customer_client_ID: req.body.customer_client_ID,
        customer_ID: req.params.customerID
    });

    return {
        newEntry: customers,
        session_ID: req.body.session_ID
    };
});


//creates a new customer
router.post('/', (res, req) => {
    //checks if the body of the request is correct
    const validError = validateCustomerPostBody(req.body);
    if(validError) return res.status(400).send(validError.details[0].message);

    //checks if the session ID is active
    const activeSession = validateSessionID(req.body.session_ID);
    if(!activeSession) return res.status(401).send('Unauthorized Request');

    //creating the new entry
    const newEntry = await new CustomerSchema.create({
        customer_client_ID: req.body.customer_client_ID,
        customer_ID: req.body.customer_ID,
        customer_email: req.body.customer_email,
        customer_name: req.body.customer_name, //probably will modify name to be validated using a regex
        customer_address: req.body.customer_address, //probably will modify using regex
        customer_phone: req.body.customer_phone,
        customer_payment_method: req.body.customer_payment_method,
        customer_status: req.body.customer_status
    });

    await CustomerSchema.save();

    return {
        new_entry: newEntry,
        session_ID: req.body.session_ID
    }
});

//updates a new customer
router.put('/:customerID', (res, req) => {
     //checks if the body of the request is correct
     const validError = validateCustomerPostBody(req.body);
     if(validError) return res.status(400).send(validError.details[0].message);
 
     //checks if the session ID is active
     const activeSession = validateSessionID(req.body.session_ID);
     if(!activeSession) return res.status(401).send('Unauthorized Request');
 
     //asynchronously gather all the customers and send
     const customers = await CustomerSchema.findOne({
         customer_client_ID: req.body.customer_client_ID,
         customer_ID: req.param.customerID
     });

    customers.customer_client_ID = req.body.customer_client_ID;
    customers.customer_ID = req.body.customer_ID;
    customers.customer_email = req.body.customer_email;
    customers.customer_name = req.body.customer_name; 
    customers.customer_address = req.body.customer_address;
    customers.customer_phone = req.body.customer_phone;
    customers.customer_payment_method = req.body.customer_payment_method;
    customers.customer_status = req.body.customer_status;
    
    await CustomerSchema.save();

    return {
        new_entry: customers,
        session_ID: req.body.session_ID
    }
});

//deletes an existing customer
router.delete('/:customerID', (req, res) => {
    //checks if the body of the request is correct
    const validError = validateCustomerBody(req.body);
    if(validError) return res.status(400).send(validError.details[0].message);

    //checks if the session ID is active
    const activeSession = validateSessionID(req.body.session_ID);
    if(!activeSession) return res.status(401).send('Unauthorized Request');

    //asynchronously gather all the customers and send
    const customers = await CustomerSchema.deleteOne({
        customer_client_ID: req.body.customer_client_ID,
        customer_ID: req.params.customerID
    });

    await CustomerSchema.save();
    
    return {
        newEntry: customers,
        session_ID: req.body.session_ID
    };  
});

module.exports = router;