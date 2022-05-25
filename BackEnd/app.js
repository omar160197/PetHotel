// const express = require('express')
const { ApolloServer }  = require('apollo-server');
const mongoose= require('mongoose')
const typeDefs=require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers');

require("dotenv").config();



  /*-------------------------------- create server --------------------------*/
const server = new ApolloServer({
  typeDefs,
  resolvers  
})

/*------------------------------- connect to DB-------------------------------*/
mongoose.connect(process.env.DB_URI)    
         .then(()=>{
            console.log("conneted to mySecondData");
  //listening on port
  const port = process.env.PORT || 5000;
  return server.listen({port: port});
})
.then((res) => {
    console.log(`Server running at ${res.url}`)
});

