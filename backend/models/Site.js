const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  siteCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  siteName: {
    type: String,
    required: true,
    trim: true
  },
  region: {
    type: String,
    default: 'NSW'
  },
  siteType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  complianceTarget: {
    type: Number,
    default: 90
  }
}, { timestamps: true });

module.exports = mongoose.model('Site', siteSchema);