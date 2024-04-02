const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
    }, 
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    resume: {
        type: String,
    },
    coverLetter: { 
        type: String,
    },
});

const applicationModel = mongoose.model("Application", applicationSchema);

module.exports = applicationModel;
