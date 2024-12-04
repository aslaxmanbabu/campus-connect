const application = require("../models/applicationSchema.js");
const Teacher = require("../models/teacherSchema.js"); // Import Teacher model

const applicationCreate = async (req, res) => {
  try {
    const newApplication = new application(req.body);

    // Find the respective teacher based on the sender ID in the application
    const teacher = await Teacher.findById(req.body.reviewer);

    console.log(req.body);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Notify the teacher about the new application (implement your notification mechanism here)
    console.log(`Notification sent to ${teacher.email} about new application.`);

    // Save the application
    const result = await newApplication.save();

    console.log(req.body);

    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const applicationList = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    let applications;
    applications = await application
      .find({
        $or: [{ user: id }, { school: id }, { reviewer: id }],
      })
      .populate("user", "name");

    if (applications.length > 0) {
      res.send(applications);
    } else {
      res.send({ message: "No applications found" });
    }
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTeachersNames = async (req, res) => {
  try {
    // Query the database to find all teachers
    const teachers = await Teacher.find({}, "name");

    if (teachers.length > 0) {
      // Send the list of teacher names in the response
      res.json(teachers);
    } else {
      res.status(404).json({ message: "No teachers found" });
    }
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const { schoolId } = req.params;

    if (!schoolId) {
      return res.status(400).json({ message: "School ID is required" });
    }

    // Query the database to find all applications for the specific school ID
    const applications = await Application.find({ school: schoolId });

    if (applications.length > 0) {
      // Send the list of applications in the response
      res.json(applications);
    } else {
      res
        .status(404)
        .json({ message: "No applications found for this school" });
    }
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  applicationCreate,
  applicationList,
  getAllTeachersNames,
  getAllApplications,
};
