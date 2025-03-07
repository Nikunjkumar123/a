const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  password: {
    type: String,
  },
  emailVerified:{
    type:Boolean,
  },
  image:{
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  myToken: {
    type: String,
    default: '',
  },
  paymentDone: {
    type: Boolean,
    default: false,
  },
  Verified: {
    type: String,
    default: 'no',
  },
});

UserSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error('Error comparing passwords');
  }
};

UserSchema.methods.createToken = function () {
  const token = jwt.sign({ userId: this._id, email: this.email, role: this.role, name: this.fullName ,gender:this.gender}, process.env.SECRCET, { expiresIn: process.env.Expires });
  return token;
};

module.exports = mongoose.model('User', UserSchema);
