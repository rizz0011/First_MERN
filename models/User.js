const mongoose = require("mongoose");
const {v4} = require('uuid')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  userID:{
    type:String,
    required:true,
    default:() =>  v4()
  },
  token:{
    type:String
  },
  postids: [
    { postID: {
      type: String
    }
    }
  ]
}, {timestamps:true});

const USERMODEL = mongoose.model("user", userSchema);

module.exports = USERMODEL;
