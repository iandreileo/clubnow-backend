const { ObjectId, Double } = require('bson')
const mongoose = require('mongoose')

const ClubSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        ownerId: { type: ObjectId, required: true },
        address: { type: String, required: true },
        images: { type: Array, required: true },
        foundationDate: { type: Date, required: true },
        musicGenre: { type: String },
        city: { type: String, required: true },
        approved: { type: Boolean }
         
    },
    {collection: 'Clubs'}
)

exports.ClubSchema = mongoose.model('Club', ClubSchema)

const EventSchema = new mongoose.Schema(
    {
        clubId: { type: ObjectId, required: true },
        date: { type: Date, required: true },
        profileImage: { type: String }
        
    },
    {collection: 'Events'}
)

exports.EventSchema = mongoose.model('Event', EventSchema)

const OfferSchema = new mongoose.Schema(
    {
        clubId: { type: ObjectId, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        profileImage: { type: String },
        price: { type: Number, required: true },
        products: { type: Array, required: true }
    },
    {collection: 'Offers'}
)

exports.OfferSchema = mongoose.model('Offer', OfferSchema)

const ReviewSchema = new mongoose.Schema(
    {
        clubId: { type: ObjectId, required: true },
        userId: { type: ObjectId, required: true },
        comment: {type: String, required: true},
        date: {type: Date, default: Date.now},
        approved: {type: Boolean}
    },
    {collection: 'Reviews'}
)

exports.ReviewSchema = mongoose.model('Review', ReviewSchema)

const ReservationSchema = new mongoose.Schema(
    {
        clubId: { type: ObjectId, required: true },
        userId: { type: ObjectId, required: true },
        date: {type: Date, required: true}
    },
    {collection: 'Reservations'}
)

exports.ReservationSchema = mongoose.model('Reservation', ReservationSchema)

const UserSchema = new mongoose.Schema(
    {
        uid: {type: String, required: true},
        name: { type: String, required: true },
        type: { type: Number, required: true },
        address: { type: String, required: true },
        profileImage: { type: String }
    },
    {collection: 'Users'}
)

exports.UserSchema = mongoose.model('User', UserSchema)


