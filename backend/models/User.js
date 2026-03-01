const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["producer", "consumer", "investor"],
    required: true
  },

  // ================= DIGITAL WALLET =================
  walletBalance: {
    type: Number,
    default: 1000,   // starting credits
    min: 0
  },

  // ================= FUTURE FEATURES (IMPORTANT) =================
  totalEnergyPurchased: {
    type: Number,
    default: 0
  },

  totalEnergySold: {
    type: Number,
    default: 0
  },

  totalInvested: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("User", UserSchema);