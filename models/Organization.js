const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    about_organization: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Organization = mongoose.model('organization', OrganizationSchema);
