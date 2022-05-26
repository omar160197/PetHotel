const User = require("../../models/userSchema");

const { ApolloError } = require("apollo-server-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Pets = require("../../models/petsSchema");
const Booking = require("../../models/bookingSchema");
require("dotenv").config();

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      //see if this user is already exists
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        throw new ApolloError(
          "this user is already exists" + email,
          "USER_ALREADY_EXISTS"
        );
      }
      //encryption passord
      const salt = bcrypt.genSaltSync(10);
      var encryptedPassword = bcrypt.hashSync(password, salt);

      //build out mongoose model
      const newUser = new User({
        username: username,
        email: email,
        password: encryptedPassword,
      });

      //save the new user
      const res = await newUser.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async loginUser(_, { loginUserInput: { email, password } }) {
      //check if email exists
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        throw new ApolloError(
          "this email is not exists" + email,
          ' "USER_NOT_EXISTS"'
        );
      }
      //check password
      if (checkUser) {
        const validPassword = await bcrypt.compare(
          password,
          checkUser.password
        );
        console.log(validPassword);
        if (!validPassword) {
          throw new ApolloError(
            "this password is inCorrect",
            "PASSWORD_NOT_CORRECT"
          );
        } else {
          const token = jwt.sign(
            { user_id: checkUser._id, email },
            process.env.SECRET
          );

          return {
            id: checkUser.id,
            token: token,
            ...checkUser._doc,
          };
        }
      }
    },

    async updateUser(_, { updateUserInput: { username, password, email } }) {
      try {
        const user = await User.findOne({ email: email });
        console.log(user);
        //encryption passord
        // const salt = bcrypt.genSaltSync(10);
        // var encryptedPassword = bcrypt.hashSync(password, salt);

        user.username = username;
        user.email = email;
        user.password = password;

        const res = await user.save().then(() => {
          return User.find({});
        });

        return res;
      } catch (err) {
        throw new ApolloError("cannot update this user " + err);
      }
    },

    async getUser(_, { getUserInput: { email } }) {
      // console.log(email);

      const users = await User.find({});

      return users;
    },
  },
  
  // deleteMany
  async deleteUser(_, { deleteUserInput: { email } }) {
    try {
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
  Query: {
    user: (_, { ID }) => User.findById(ID),
  },
};
