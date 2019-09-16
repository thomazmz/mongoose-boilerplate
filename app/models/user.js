const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
	password: {
		type: String, 
		default: true
	}
}, schemaOptions);

userSchema.methods.hashPassword = function() {
	return new Promise((resolve, reject) => {
		bcrypt.hash(this.password, 10)
		.then(hash => {
			this.password = hash
			resolve(this)
		})
		.catch(err => reject({ status : 500, message : "Internal server error"}));
	});
}

userSchema.methods.isAvailable = function() {
	return new Promise((resolve, reject) => {
		User.find({ email : this.email })
		.exec()
		.then(result => {
			if (result.length > 0) reject({ status : 409, message : "Email not available"});
			else resolve(this);
		});
	});
}

userSchema.methods.getBarearToken = function() {

}  

userSchema.statics.verifyCredentials = function(email, password) {
	return new Promise((resolve, reject) => {
		User.findOne({ email })
		.exec()
		.then(user => {
			if (user) {
				reject({ status : 400, message : "Invalid credentials"});
			} else {
				bcrypt.compare(password, user.password)
				.then(result => {
					if (result) resolve(user);
					else reject({ status : 400, message : "Invalid credentials"});
				});
			}
		});
	});
}

const User = mongoose.model('User', userSchema);

module.exports = User;