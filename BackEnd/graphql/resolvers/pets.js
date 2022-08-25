require("dotenv").config();
const { ApolloError } = require("apollo-server-errors");
const Booking = require("../../models/bookingSchema");
const Pets = require("../../models/petsSchema");
const User = require("../../models/userSchema");

module.exports = {
  Mutation: {
    async createPet(_, { petInput: { ownerId, type, breed, size, name } }) {
      const newPet = new Pets({
        ownerId: ownerId,
        type: type,
        breed: breed,
        size: size,
        name: name,
      });

      try {
        const res = await newPet.save().then(() => {
          return Pets.find({ ownerId: ownerId });
        });

        return res;
      } catch (err) {
        throw new ApolloError("cannot add this pet " + err);
      }
    },

    async getAllPets(_, { getAllPets: { ownerId } }) {
      //get all pets by ownerId
      const user = await User.find({ _id: ownerId });
      let pets = "";
      try {
        if (user[0].username === "Admin") {
          pets = await Pets.find({});
        } else {
          pets = await Pets.find({ ownerId: ownerId });
        }

        return pets;
      } catch (error) {
        throw new ApolloError("cannot find pets", error);
      }
    },

    async getOnePet(_, { getOnePet: { petId } }) {
      //get all pets by ownerId
      try {
        const res = Pets.findOne({ _id: petId });
        return res;
      } catch (error) {
        throw new ApolloError("cannot find pets", error);
      }
    },

    async editPet(_, { editPetInput: { ownerId,petId, type, breed, size, name } }) {
      try {
        const owner = await User.findOne({ _id: ownerId });
        let res = "";


        const existpet = await Pets.findOne({ _id: petId });
        // console.log(existpet);

        existpet.type = type;
        existpet.breed = breed;
        existpet.size = size;
        existpet.name = name;

        if (owner.username !== "Admin") {
          res = await existpet.save().then(() => {
            return Pets.find({ownerId:ownerId});
          });
        }else{
          res = await existpet.save().then(() => {
            return Pets.find({});
          });
        }

        return res;
      } catch (err) {
        throw new ApolloError("cannot update this pet " + err);
      }
    },

    async deletePet(_, { deletePetInput: { petId, ownerId } }) {
      try {
        const owner = await User.findOne({ _id: ownerId });
        let res = "";
        if (owner.username !== "Admin") {
          res = await Pets.deleteOne({ _id: petId }).then(() => {
            return Pets.find({ownerId:ownerId});
          });
        }else{
          res = await Pets.deleteOne({ _id: petId }).then(() => {
            return Pets.find({});
          });
        }

        return res;
      } catch (err) {
        throw new ApolloError("cannot update this pet " + err);
      }
    },

// deleteMany
async deleteUser(_, { deleteUserInput: { email } }) {
  try {
    console.log("hello");
    const user = await User.find({ email: email });
    if (user && user.username !== "Admin") {
      await Pets.deleteMany({ ownerId: user._id });
      await Booking.deleteMany({ ownerId: user._id });
      const res = await User.deleteOne({ email: email }).then(() => {
        return User.find({});
      });
      return res;
    } else {
      throw new ApolloError("cannot delete admin email");
    }
  } catch (err) {
    throw new ApolloError("cannot delete this user " + err);
  }
},

  },
};
