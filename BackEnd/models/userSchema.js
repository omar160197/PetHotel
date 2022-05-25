const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
//   _id: { type: Number, alise: userId },
  username:{type:String,default:null},
  phone:{type:String},
  bio:{type:String},
  email: {
    type: String,
    unique:true,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Please enter a valid email",
    ],
  },
//   image:String,
 password: { type: String},
 token:{type:String}
}
);

// userSchema.plugin(AutoIncrement, { inc_field: "userId" });
const User = mongoose.model("users", userSchema);
module.exports = User;
