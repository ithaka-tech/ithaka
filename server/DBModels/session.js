const mongoose = require('mongoose');
const Joi = require('joi');

const SessionSchema = mongoose.model('Sessions', mongoose.Schema({ }))

function validateSessionBody(session){

    const schema = Joi.object({
        session_ID: Joi.string().length(64).required()
    })
    
    return schema.validate(session);
}

function createNewSession(){
    const newSession = new SessionSchema({ });
    return String(newSession.id);
}

function validateSessionID(sessionID){
    const exists = SessionSchema.findById(sessionID);
    if(exists) return true;
    return false;
}

module.exports.SessionSchema = SessionSchema;
module.exports.validateSessionBody = validateSessionBody;
module.exports.validateSessionID = validateSessionID;
module.exports.createNewSession = createNewSession;