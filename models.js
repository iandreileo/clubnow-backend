const { ObjectId, Double } = require("bson");
const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ownerId: { type: String, required: true },
    address: { type: String, required: true },
    images: { type: Array },
    profileImage: {type: String},
    foundationDate: { type: String, required: true },
    musicGenre: { type: String },
    city: { type: String, required: true },
    approved: { type: Boolean },
  },
  { collection: "Clubs" }
);

exports.ClubSchema = mongoose.model("Club", ClubSchema);

const EventSchema = new mongoose.Schema(
  {
    clubId: { type: String },
    ownerId: { type: String },
    date: { type: String },
    eventName: { type: String },
    description: { type: String },
    profileImage: { type: String },
  },
  { collection: "Events" }
);

exports.EventSchema = mongoose.model("Event", EventSchema);

const OfferSchema = new mongoose.Schema(
  {
    clubId: { type: String, required: true },
    name: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    profileImage: { type: String },
    price: { type: Number },
    products: { type: String },
  },
  { collection: "Offers" }
);

exports.OfferSchema = mongoose.model("Offer", OfferSchema);

const ReviewSchema = new mongoose.Schema(
  {
    clubId: { type: ObjectId, required: true },
    userId: { type: String, required: true },
    review: {type: String, required: true},
    date: { type: Date, default: Date.now },
    approved: { type: Boolean },
  },
  { collection: "Reviews" }
);

exports.ReviewSchema = mongoose.model("Review", ReviewSchema);

const ReservationSchema = new mongoose.Schema(
  {
    clubId: { type: ObjectId, required: true },
    userId: { type: ObjectId, required: true },
    approved: {type: Boolean},
    date: { type: Date, default: Date.now },
  },
  { collection: "Reservations" }
);

exports.ReservationSchema = mongoose.model("Reservation", ReservationSchema);

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String },
    type: { type: Number },
    address: { type: String },
    profileImage: { type: String },
    isAdmin: {type: Boolean}
  },
  { collection: "Users" }
);

exports.UserSchema = mongoose.model("User", UserSchema);
