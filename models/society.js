var mongoose = require('mongoose');

var SocietySchema = new mongoose.Schema({

	societyName: {
		type: String,
		required: true
	},

	societyAddress: {
		type: String,
		required: true
	},

	joinDate: {
		type: Date,
		default: Date.now
	},

	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: 'active'
	},

	locLat: {
		type: String,
		default: ''
	},

	locLong: {
		type: String,
		default: ''
	},

	contactPerson: {
		type: String,
		required: true
	},

	contactEmail: {
		type: String,
		default: ''
	},

	contactPhone: [Number],

	modulesSubscribed: [String],

	approvedPAX: {
		type: Number
	},

	merchId: {
		type: Number
	},

	merchKey: {
		type: Number
	},

	merchSalt: {
		type: String
	},

	services: [String]
});

module.exports = mongoose.model('Society', SocietySchema);