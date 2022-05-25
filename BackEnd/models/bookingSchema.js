const {mongoose}=require('mongoose');
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const bookingSchema = new mongoose.Schema({
//   _id: { type: Number, alise: "petId" },
  from :{type:Date,require:true},
  to :{type:Date,require:true},
  note :{type:String,default:"no notes"},
  fee:{type:Number,require:true},
  status: {type:String, enum: ["Inprogress", "Booked","Completed"], default: 'Booked' },
  ownerId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
  petId:{type:mongoose.Schema.Types.ObjectId,ref:"pets"},
  petName:{type:String,require:true},
})

// bookingSchema.plugin(AutoIncrement, { inc_field: "petId" });

const Booking = mongoose.model("booking",bookingSchema);
module.exports=Booking