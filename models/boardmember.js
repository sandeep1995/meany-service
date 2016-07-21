var mongoose = require('mongoose');

var BoardMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String
  },
  profilePicURL: {
    type: String
  },
  profilePicKey: {
    type: String
  },
  contactEmail: {
    type: String,
    lowercase: true
  },
  contactPhone: {
    type: Number
  },

  societyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Society',
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
});

module.exports = mongoose.model("BoardMember", BoardMemberSchema);