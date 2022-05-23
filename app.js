const express = require("express");
const mongoose = require("mongoose");
const modelsModule = require("./models.js");
const cors = require("cors");
const UserSchema = modelsModule.UserSchema;
const ClubSchema = modelsModule.ClubSchema;
const EventSchema = modelsModule.EventSchema;
const OfferSchema = modelsModule.OfferSchema;
const ReviewSchema = modelsModule.ReviewSchema;
const ReservationSchema = modelsModule.ReservationSchema;
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const uri = process.env.ATLAS_CONNECTION;

mongoose.connect(uri, {});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB connected.");
});

app.get("/api/v1/allUsers", async (req, res) => {
  await UserSchema.find({}, (err, result) => {
    console.log("users from db: ", result);
    res.send(result);
  }).clone();
});

app.get("/api/v1/user", async (req, res) => {
  UserSchema.findOne({ uid: req.body.uid }).then((user) => {
    if (user) {
      res.status(200).json({
        message: "Found!",
        user,
      });
    } else {
      res.status(404).json({
        message: "User not found!",
      });
    }
  });
});

app.patch("/api/v1/user", async (req, res) => {
  try {
    console.log("req.body: ", req.body);

    await UserSchema.updateOne(
      { uid: req.body.uid },
      {
        name: req.body.name,
        type: req.body.type,
        address: req.body.address,
        profileImage: req.body.profileImage,
      },
      function (err, result) {}
    ).clone();
    res.send("User updated");
  } catch (err) {
    console.log("error: ", err);
  }
});

app.delete("/api/v1/user", async (req, res) => {
  try {
    console.log("req.body: ", req.body);

    await UserSchema.deleteOne({ uid: req.body.uid }, (err) => {
      if (err) console.log("Error deleting user.");
    }).clone();
    res.send("User deleted");
  } catch (err) {
    console.log("error: ", err);
  }
});

app.post("/api/v1/user", async (req, res) => {
  const currentUser = new UserSchema({
    uid: req.body.uid,
    name: req.body.name,
    type: req.body.type,
    address: req.body.address,
    profileImage: req.body.profileImage,
  });

  UserSchema.find({ uid: req.body.uid }, function (err, docs) {
    if (docs.length) {
      res.status(200).json({
        user: docs,
      });
    } else {
      currentUser.save((err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: err._message,
          });
        } else {
          console.log(result);
          res.status(200).json({
            message: "Success!",
            user: result,
          });
        }
      });
    }
  });
});

app.get("/api/v1/allUsers", async (req, res) => {
  await UserSchema.find({}, (err, result) => {
    console.log("users from db: ", result);
    res.send(result);
  }).clone();
});

app.get("/api/v1/user", async (req, res) => {
  ///get by name
  await UserSchema.find({ uid: req.body.uid }, (err, result) => {
    console.log("user from db: ", result);
    res.send(result);
  }).clone();
});

app.patch("/api/v1/user", async (req, res) => {
  try {
    console.log("req.body: ", req.body);

    await UserSchema.updateOne(
      { uid: req.body.uid },
      {
        name: req.body.name,
        type: req.body.type,
        address: req.body.address,
        profileImage: req.body.profileImage,
      },
      function (err, result) {}
    ).clone();
    res.send("User updated");
  } catch (err) {
    console.log("error: ", err);
  }
});

app.delete("/api/v1/reservation", async (req, res) => {
  try {
    console.log("req.body: ", req.body);

    await ReservationSchema.deleteOne({ _id: req.body._id }, (err) => {
      if (err) console.log("Error deleting reservation.");
    }).clone();
    res.send("Reservation deleted");
  } catch (err) {
    console.log("error: ", err);
  }
});

app.post("/api/v1/reservation", async (req, res) => {
  try {
    console.log("req.body: ", req.body);

    const newReservation = new ReservationSchema({
      clubId: req.body.clubId,
      userId: req.body.userId,
      date: req.body.date,
    });

    await ReservationSchema.create(newReservation);
    res.send("Reservation added");
  } catch (err) {
    console.log("error: ", err);
  }
});

app.post("/api/v1/club", async (req, res) => {
  try {
    console.log("req.body: ", req.body);

    // TO DO: DE TESTAT DACA EXISTA DEJA UN CLUB LA ACEL UID (VEZI EXEMPLU CA LA USERS)

    const newClub = new ClubSchema(req.body.club);

    await ClubSchema.create(newClub);
    res.send("Club added");
  } catch (err) {
    console.log("error: ", err);
  }
});

app.get("/api/v1/club", async (req, res) => {
  console.log(req.query);
  ClubSchema.findOne({ ownerId: req.query.id }).then((club) => {
    if (club) {
      res.status(200).json({
        message: "Found!",
        club,
      });
    } else {
      res.status(404).json({
        message: "Club not found!",
      });
    }
  });
});

app.get("/api/v1/clubbyid", async (req, res) => {
  console.log(req.query.id);
  ClubSchema.findById(req.query.id).then((club) => {
    if (club) {
      res.status(200).json({
        message: "Found!",
        club,
      });
    } else {
      res.status(404).json({
        message: "Club not found!",
      });
    }
  });
});

app.get("/api/v1/clubs", async (req, res) => {
  console.log(req.body);
  ClubSchema.find({}).then((clubs) => {
    if (clubs) {
      res.status(200).json({
        message: "Found!",
        clubs,
      });
    } else {
      res.status(404).json({
        message: "Clubs not found!",
      });
    }
  });
});

// =========================

app.get("/api/v1/offers", async (req, res) => {
  console.log(req.query.id);
  OfferSchema.find({ clubId: req.query.id }).then((offers) => {
    if (offers) {
      res.status(200).json({
        message: "Found!",
        offers,
      });
    } else {
      res.status(404).json({
        message: "Offers not found!",
      });
    }
  });
});

// ============================

app.post("/api/v1/event", async (req, res) => {
  const event = new EventSchema(req.body.event);

  event.save((err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err._message,
      });
    } else {
      console.log(result);
      res.status(200).json({
        message: "Success!",
        user: result,
      });
    }
  });
});

app.get("/api/v1/events", async (req, res) => {
  console.log(req.query.id);
  EventSchema.find({ clubId: req.query.id }).then((events) => {
    if (events) {
      res.status(200).json({
        message: "Found!",
        events,
      });
    } else {
      res.status(404).json({
        message: "events not found!",
      });
    }
  });
});

// ====

app.post("/api/v1/offer", async (req, res) => {
  const offer = new OfferSchema(req.body.offer);

  offer.save((err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err._message,
      });
    } else {
      console.log(result);
      res.status(200).json({
        message: "Success!",
        user: result,
      });
    }
  });
});

app.get("/api/v1/offers", async (req, res) => {
  console.log(req.query.id);
  OfferSchema.find({ clubId: req.query.id }).then((offers) => {
    if (offers) {
      res.status(200).json({
        message: "Found!",
        offers,
      });
    } else {
      res.status(404).json({
        message: "offers not found!",
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on localhost:${port}`);
});
