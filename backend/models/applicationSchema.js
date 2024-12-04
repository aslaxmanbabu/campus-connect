const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
  applicationType: {
    type: String,
    enum: ["leave", "event_attendance", "lor"], // Add more application types as needed
    required: true,
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teachers",
    required: true,
  },
  // Add any additional fields you need for the application
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
