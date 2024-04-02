// const jobModel = require("../Models/JobModel");


// app.post("/job", async (req, res) => {
//     try {
//       const { title, Description, location } = req.body;
//       const job = new jobModel({ title, Description, location });
//       await job.save();
//       res.status(201).json({ success: true, message: "Job posted successfully" });
//     } catch (error) {
//       console.error("Error posting job:", error);
//       res.status(500).json({ success: false, message: "Failed to post job" });
//     }
//   });
