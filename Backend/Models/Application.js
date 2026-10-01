const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Interview",
        "Rejected",
        "Selected",
      ],
      default: "Applied",
    },

    // Interview details
    interview: {
      date: {
        type: String,
        default: "",
      },

      time: {
        type: String,
        default: "",
      },

      mode: {
        type: String,
        default: "",
      },

      link: {
        type: String,
        default: "",
      },

      notes: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index(
  { job: 1, student: 1 },
  { unique: true }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

module.exports = Application;