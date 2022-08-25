const { gql } = require('apollo-server');

module.exports = gql`


type User {
   _id:ID 
   username:String
   email:String
   password:String
   token:String  
}


input RegisterInput{
   username:String
   email:String
   password:String
}

input LoginInput{
    email:String
    password:String
 }

input UpdateInput{
   username:String
   email:String
   password:String
}

input GetUserInput{
   email:String
}

type Query {
    user(id: ID!): User
}

type Pet{
    _id:ID
    ownerId:ID
    type:String
    breed:String
    size:String
    name:String
}

input CreatePet{
    ownerId:ID
    type:String
    breed:String
    size:String
    name:String
}

input GetAllPetsInput{
    ownerId:ID
}
 
input GetOnePetInput{
    petId:ID
}

input EditPet{
    petId:ID
    type:String
    breed:String
    size:String
    name:String
    ownerId:ID
}

input DeletePet{
    petId:ID
    ownerId:ID
}

scalar Date

type Booking{
    _id:ID
    from:Date
    to:Date
    fee:Int
    status:String
    ownerId:ID
    petId:ID
    petName:String
    note:String
}

input CreateBookingInput{
    from:Date
    to:Date
    fee:Int
    status:String
    ownerId:ID
    petId:ID
    note:String
    petName:String
}

input UpdateBookingInput{
    from:Date
    to:Date
    fee:Int
    status:String
    petId:ID
    note:String
    petName:String
    bookingId:ID
    ownerId:ID
}

input GetBookingInput{
    ownerId:ID
}

input DeleteBookingInput{
    bookId:ID
    ownerId:ID
}

input DeleteUser{
    email:String
}

type Mutation {
    createPet(petInput:CreatePet):[Pet]
    getAllPets(getAllPets:GetAllPetsInput):[Pet] 
    getOnePet(getOnePet:GetOnePetInput):Pet
    editPet(editPetInput:EditPet):[Pet]
    deletePet(deletePetInput:DeletePet):[Pet]

    createBook(createBookingInput:CreateBookingInput):[Booking]  
    getAllBooking(getBookingInput:GetBookingInput):[Booking]
    updateBooking(updateBookingInput:UpdateBookingInput):[Booking]
    deleteBooking(deleteBookingInput:DeleteBookingInput):[Booking]

    registerUser(registerInput:RegisterInput):User 
    loginUser(loginUserInput:LoginInput):User
    updateUser(updateUserInput:UpdateInput):[User]
    getUser(getUserInput:GetUserInput):[User]
    deleteUser(deleteUserInput:DeleteUser):[User]    
}
`