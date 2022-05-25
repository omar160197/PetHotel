const { ApolloError } = require("apollo-server-errors");
const Booking = require("../../models/bookingSchema");

module.exports = {
  Mutation: {
    async createBook(
      _,
      { createBookingInput: { from, to, fee, status, ownerId, petId, note,petName } }
    ) {
      //see if this booking exists
      try {
        const oldBooking = await Booking.findOne({ from: from });
        if (oldBooking) {
          throw new ApolloError("this Booking is taken in same date" + from);
        } else {
          try {
            const newBooking = new Booking({
              from: from,
              to: to,
              status: status,
              ownerId: ownerId,
              petId: petId,
              note: note,
              fee: fee,
              petName:petName
            });
            const res = await newBooking.save().then(() => {
              return Booking.find({});
            });
    
            return res;
          } catch (err) {
            throw new ApolloError(" " + err);
          }
        }
      } catch (err) {
        throw new ApolloError(" " + err);
      }
    },

    async getAllBooking(_, { getBookingInput: { ownerId } }) {
      try {
        const bookings = await Booking.find({ ownerId: ownerId });
        if (!bookings) {
          throw new ApolloError("cannot find any booking ");
        }
        return bookings;
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    async updateBooking(_, {updateBookingInput:{bookingId,from, to, fee, status, petId, note,petName}}) {
      try{
        const booking =await Booking.findOne({_id:bookingId})

        booking.from=from
        booking.to=to
        booking.fee=fee
        booking.status=status
        booking.petId=petId
        booking.note=note
        booking.petName=petName 

        const res = await booking.save().then(() => {
          return Booking.find({});
        });

        return res;
      }catch(err){
        throw new ApolloError(err)
      }

    },

    async deleteBooking(_, {deleteBookingInput:{bookId}}) {
      try {
        const res = await Booking.deleteOne({ _id: bookId }).then(() => {
          return Booking.find({});
        });

        return res;
      } catch (err) {
        throw new ApolloError("cannot update this pet " + err);
      }
    },
  },
};
