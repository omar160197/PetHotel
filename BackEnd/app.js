// const express = require('express')
const { ApolloServer }  = require('apollo-server');
const mongoose= require('mongoose')
const typeDefs=require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers');
const io = require('socket.io');


require("dotenv").config();



  /*-------------------------------- create server --------------------------*/
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,  
})


// io.on('connection', socket => {
//   console.log('a user connected');
  
//   socket.on('disconnect', reason => {
//     console.log('user disconnected');
//   });

//   socket.on('room', data => {
//     console.log('room join');
//     console.log(data);
//     socket.join(data.room);
//   });

//   socket.on('leave room', data => {
//     console.log('leaving room');
//     console.log(data);
//     socket.leave(data.room)
//   });

//   socket.on('new message', data => {
//     console.log(data.room);
//     socket.broadcast
//     .to(data.room)
//     .emit('receive message', data)
//   });
// });


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

