const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const UserModel = require("./Models/userModel");
const jobModel = require("./Models/JobModel")
const employerModel = require("./Models/employerModel")
const bcrypt = require("bcrypt");
const app = express();
const crypto = require('crypto');
const Token = require("./Models/Token");
const userModel = require("./Models/userModel");
const CategoryModel = require("./Models/categoryModel")
const applicationModel =require("./Models/applicationModel")

app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});

mongoose
  .connect("mongodb://localhost:27017/JobBoard", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "JobBoard super secret key", {
    expiresIn: maxAge,
  });
};


 
// user registration 
app.post("/SignUp", async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(16).toString("hex");

    const newUser = new UserModel({
      name,
      email,
      phone,
      password,
      verificationToken,
      isVerified: false,
    });

    // Hash the password
    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    // Create and save the verification token
    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const message = `${process.env.BASE_URL}/user/verify/${newUser.id}/${token.token}`;
    // Uncomment the following line to send verification email
    await sendEmail(newUser.email, "Verify Email", message);

    // Send verification email
    await sendEmail(newUser.email, 'Verification Email', verificationToken);


    // Generate JWT token
    const jwtToken = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: "3d",
    });

    // Set JWT as a cookie
    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: true,
    });

    res.status(201).json({ user: newUser._id, created: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/employer", async (req, res) => {
  try {
    const { name, email,company,website, phone, password, confirmPassword,Description } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await employerModel.findOne({ email,company });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(16).toString("hex");

    const newUser = new employerModel({
      name,
      email,
      company,
      website, 
      phone,
      password,
      Description,
      verificationToken,
      isVerified: false,
    });

    // Hash the password
    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    // Create and save the verification token
    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const message = `${process.env.BASE_URL}/user/verify/${newUser.id}/${token.token}`;
    // Uncomment the following line to send verification email
    await sendEmail(newUser.email, "Verify Email", message);

    // Send verification email
    await sendEmail(newUser.email, 'Verification Email', verificationToken);


    // Generate JWT token
    const jwtToken = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: "3d",
    });

    // Set JWT as a cookie
    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      secure: true,
    });

    res.status(201).json({ user: newUser._id, created: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.post("/job", async (req, res) => {
    try {
      const { title, Description,requirements,responsibilities,jobCategory, location ,
      } = req.body;
      const job = new jobModel({ title, Description,requirements, responsibilities,jobCategory, location });
      await job.save();
      res.status(201).json({ success: true, message: "Job posted successfully" });
    } catch (error) {
      console.error("Error posting job:", error);
      res.status(500).json({ success: false, message: "Failed to post job" });
    }
  });


//   get request 
app.get('/api/jobs' , async(req, res)=>{
    const query = req.query;
    const jobs = await jobModel.find(query)
    return res.status(201).json(jobs) 
})

app.get('/job/:jobId', async (req, res) => {
  try {
    const jobId = req.params.jobId; 
    const job = await jobModel.findById(jobId).exec();
    if (!job) {
      return res.status(404).json({ error: 'Job not found' }); 
    }
    return res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error); // Corrected log message
    res.status(500).json({ error: 'Internal server error' });
  }
});

 app.get('/user/:userId', async(req, res)=>{
  try{
    const userId = req.params.userId;
    const user =await userModel.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ error: 'user not found' }); 
    }
    return res.status(200).json(user);
  } catch(error){
    console.error("error fetching userId:", error)
     res.status(500).json({error: "internal server error "})
  }

 })


app.get('/jobs', async (req, res) => {
  const { query, location } = req.query;

  try {
    let filter = {};
    if (query) {
      filter.title = { $regex: new RegExp(query, 'i') }; // Case-insensitive search
    }
    if (location) {
      filter.location = { $regex: new RegExp(location, 'i') }; // Case-insensitive search
    }

    const jobs = await jobModel.find(filter);
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// CATEGORY
app.post('/api/category', async (req, res) => {
  const { name} = req.body;
  try {
    const category = new CategoryModel({ name });
    await category.save(category);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//application endpoint
app.post('/applyjob', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, resume, coverLetter } = req.body;

    console.log('Received job application data:', req.body); // Log the received data

    const application = new applicationModel({ fullName, email, phoneNumber, resume, coverLetter });

    console.log('Creating new job application document:', application); // Log the created document

    const savedJob = await application.save();

    console.log('Saved job application:', savedJob); // Log the saved document

    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Define more routes as needed

module.exports = app;
