const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my_new_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for the data
const formDataSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
});

// Create a model for the data
const FormData = mongoose.model('FormData', formDataSchema);

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Save the form data to the database
app.post('/api/form-data', (req, res) => {
  const formData = new FormData({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  formData.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data');
    } else {
      res.status(200).send('Data saved successfully');
    }
  });
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
