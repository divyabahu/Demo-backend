const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/harryKart', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// define schema for form data
const formDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNo: String,
  emailAddress: String,
});
let data=[];
// create model for form data using schema
const FormData = mongoose.model('FormData', formDataSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/create', async (req, res) => {
  const formData = { firstName:req.firstName, lastName:req.lastName, mobileNo:req.mobileNo, 
    emailAddress:req.emailAddress };
    data.push(formData);
  console.log(data," form data")
  try {
    // create new instance of FormData model with form data
    const formDataDoc = new FormData(data);
    // save form data to database
    await formDataDoc.save();
    res.send('Form data saved successfully')+JSON.stringify(req.body);
  } catch (err) {
    console.error(err);
    console.log("getting the data");
    res.status(500).send(formData);
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

