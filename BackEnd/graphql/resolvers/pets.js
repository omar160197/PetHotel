require("dotenv").config();
const { ApolloError } = require("apollo-server-errors");
const Pets = require("../../models/petsSchema");

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
          return Pets.find({});
        });

        return res;
      } catch (err) {
        throw new ApolloError("cannot add this pet " + err);
      }
    },

    async getAllPets(_, { getAllPets: { ownerId } }) {
      //get all pets by ownerId
      try {
        const pets = Pets.find({ ownerId: ownerId });
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

    async editPet(_, { editPetInput: { petId, type, breed, size, name } }) {
      try {
        const existpet = await Pets.findOne({ _id: petId });
        // console.log(existpet);

        existpet.type = type;
        existpet.breed = breed;
        existpet.size = size;
        existpet.name = name;

        const res = await existpet.save().then(() => {
          return Pets.find({});
        });

        return res;
      } catch (err) {
        throw new ApolloError("cannot update this pet " + err);
      }
    },

    async deletePet(_, { deletePetInput: { petId } }) {
      try {
        const res = await Pets.deleteOne({ _id: petId }).then(() => {
          return Pets.find({});
        });

        return res;
      } catch (err) {
        throw new ApolloError("cannot update this pet " + err);
      }
    },
  },
};
