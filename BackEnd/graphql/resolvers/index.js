const userResolver= require('./users')
const petResolver=require('./pets')
const BookingResolver=require('./booking')
module.exports={
    Query:{
      ...userResolver.Query  
    },
    Mutation:{
      ...BookingResolver.Mutation,
      ...petResolver.Mutation,
      ...userResolver.Mutation
    }
}
