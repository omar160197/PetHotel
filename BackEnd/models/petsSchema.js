const {mongoose}=require('mongoose');
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const pestSchema = new mongoose.Schema({
//   _id: { type: Number, alise: "petId" },
  name :{type:String,require:true},
  type:{type:String,require:true},
  size: {type:String, enum: ["small", "meduim","large"] },
  ownerId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
  breed:{type:String,require:true},
  
})

// pestSchema.plugin(AutoIncrement, { inc_field: "petId" });

const Pets = mongoose.model("pets",pestSchema);
module.exports=Pets