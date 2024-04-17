const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
   title:{
    type: String,
   }, 
   Description:{
      type:String,
   },
   requirements:{
      type:String,
   },
    responsibilities: {
      type:String,
    },
   location:{
      type: String,
   },
   jobCategory:{
      type: String,
       ref:'categories',
   },
      });
      

const jobModel = mongoose.model("Job", jobSchema);

module.exports = jobModel;