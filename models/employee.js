var mongoose = require('mongoose');

var ResidentEmployeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    contactPhone: {
        type: Number
    },
    role: {
        type: String
    },
    regularSchedule: {
        type: String
    },

    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: true
    },

    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

module.exports = mongoose.model("ResidentEmployee", ResidentEmployeeSchema);