const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Token schema
const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '24h',
  },
});

// Token model
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
