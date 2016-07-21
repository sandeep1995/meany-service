var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({

    role: {
        type: String,
        enum: ['Resident', 'Admin', 'Super Admin'],
        default: 'Resident'
    },

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },

    contactEmail: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },

    contactPhone: [{
        type: Number
    }],

    block: {
        type: String,
        default: ''
    },

    flatNo: {
        type: String,
        default: ''
    },

    profession: {
        type: String,
        default: ''
    },

    organization: {
        type: String,
        default: ''
    },

    designation: {
        type: String,
        default: ''
    },

    car: [{
        carNumber: {
            type: String,
            default: ''
        },
        parkingSpace: {
            type: String,
            default: ''
        }
    }],

    profilePicURL: {
        type: String,
        default: ''
    },

    profilePicKey: {
        type: String,
        default: ''
    },

    isProfilePrivate: {
        type: Boolean,
        default: false
    },

    myServices: [{
        type: String,
        default: ''
    }],

    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        required: function(){
            if (this.role == 'Resident')
                return true;
            else if (this.role == 'Admin')
                return false;
        }
    }

});


// Save user's hashed password
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function () {

            }, function (err, hash) {
                if (err) {
                    return next(err);
                }
                // saving actual password as hash
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// compare two password

UserSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
