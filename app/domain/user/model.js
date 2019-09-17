const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: { 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
}

const userSchema = new Schema({
  	email: {
		type: String, 
		required: true, 
		unique: true
	},
	username: {
		type: String, 
		required: true, 
		unique: true
  	},
	password: {
		type: String, 
	},
	active: {
		type: Boolean,
		default: true
	}
}, schemaOptions);

userSchema.statics.findOneByUsername = function(username) {
	return User.findOne({ username }).exec();
}

userSchema.statics.findOneByEmail = function(email) {
	return User.findOne({ email }).exec();
}

userSchema.statics.findOneByUniqueIdentifier = function(identifier) {
	return User.findOne({$or: [
		{email: identifier},
		{username: identifier}
	]}).exec();
}

userSchema.methods.hashPassword = function() {
	return new Promise((resolve) => {
		bcrypt.hash(this.password, 10)
		.then((hash) => {
			this.password = hash
			resolve(this);
		});
	});
}

userSchema.methods.getBarearToken = function() {
	return jwt.sign({ email : this.email, username : this.username }, "secret");
}

userSchema.statics.verifyCredentials = function(user, plainPassword) {
	return new Promise((resolve) => {
		bcrypt.compare(plainPassword, user.password)
		.then(result => !result ? resolve(null) : resolve(user));
	});
}


const User = mongoose.model('User', userSchema);

module.exports = User;