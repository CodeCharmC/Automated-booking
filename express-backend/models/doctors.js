const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  specialty: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  experience: {
    type: Number,
    required: true
  },
  officeHours: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false,
    trim: true,
    default: '/assets/profile.jpg',
    validate: {
      validator: function(v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  }
});

doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

doctorSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Doctor', doctorSchema);
