const Joi = require('joi');
const mongoose = require('mongoose');

//defining document schema for cutomers collection
const CustomerSchema = mongoose.model('Customer', mongoose.Schema({
    customer_client_ID: {type: String, required: true},
    customer_ID: {type: String, required: true},
    customer_email: {type: String, required: true},
    customer_name: {type: String, required: true}, //probably will modify name to be validated using a regex
    customer_address: {type: String, required: true}, //probably will modify using regex
    customer_phone: {type: String, required: true},
    customer_payment_method: {type: String, required: true, enum: ['Cash on Delivery', 'Bank Transfer']},
    customer_status: {type: String, required: true, enum: ['Delivered', 'Processed', 'Cancelled']},
}));


function validateCustomerBody(customer){
    const customerSchema = Joi.object({
        customer_client_ID: Joi.string.length(64).required(),
        session_ID: Joi.string().length(64).required()
    });

    return customerSchema.validate(customer);
}

function validateCustomerPostBody(customer){
    const customerSchema = Joi.object({
        customer_client_ID: Joi.string.length(64).required(),
        session_ID: Joi.string().length(64).required(),
        customer_email: Joi.string().required(),
        customer_name: Joi.string().required(), //probably will modify name to be validated using a regex
        customer_address: Joi.string().required(), //probably will modify using regex
        customer_phone: Joi.string().required(),
        customer_payment_method: Joi.string().required(),
        customer_status: Joi.string().required(),
    });

    return customerSchema.validate(customer);
}

module.exports.CustomerSchema = CustomerSchema;
module.exports.validateCustomerBody = validateCustomerBody;
module.exports.validateCustomerPostBody = validateCustomerPostBody;