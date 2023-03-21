const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/api/save-form-data', (req, res) => {
  const { firstName, lastName, mobileNo, emailAddress } = req.body;
  const formData = { firstName, lastName, mobileNo, emailAddress };
  const jsonFilePath = path.join(__dirname, 'form-data.json');

  if (fs.existsSync(jsonFilePath)) {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading JSON file');
      }

      const jsonData = JSON.parse(data);
      jsonData.push(formData);

      fs.writeFile(jsonFilePath, JSON.stringify(jsonData), 'utf8', (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error writing JSON file');
        }

        res.send('Form data saved successfully');
      });
    });
  } else {
    const jsonData = [formData];

    fs.writeFile(jsonFilePath, JSON.stringify(jsonData), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error writing JSON file');
      }

      res.send('Form data saved successfully');
    });
  }
  console.log(formData);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
/*Sure, let me explain the code step by step:

The code begins by importing the required modules, namely express, body-parser, fs, and path.

An instance of the Express application is created using express() and assigned to a variable called app.

The port number that the application will listen on is assigned to a constant variable called PORT. In this case, it is set to 3000.

The middleware body-parser is used to parse the incoming request body data. Two methods are used: json() to parse JSON data and urlencoded() to parse URL-encoded data. The option extended is set to true to allow the use of rich objects and arrays to be encoded in URL-encoded data.

The application defines a route for handling POST requests to /api/save-form-data.

The request body is destructured to obtain the values of firstName, lastName, mobileNo, and emailAddress sent in the POST request.

An object called formData is created to store the values obtained from the request body.

The path of the JSON file that will store the form data is created using path.join() method. The __dirname variable represents the current directory of the running script.

The fs.existsSync() method is used to check if the JSON file exists. If it does, it reads the contents of the file using fs.readFile() method.

If the file exists, the contents are parsed into an array called jsonData using JSON.parse(). The formData object is then added to the array.

The fs.writeFile() method is used to write the updated jsonData array back to the JSON file.

If there is an error while reading or writing the file, an error message is returned as a response with a status code of 500.

If the file does not exist, a new array called jsonData is created with the formData object.

The fs.writeFile() method is used to write the jsonData array to the JSON file.

If there is an error while writing the file, an error message is returned as a response with a status code of 500.

Finally, a response is sent back to the client with a message indicating that the form data has been saved successfully.

The app.listen() method is called to start the Express application and listen for incoming requests on the specified port. When the server starts successfully, a message is logged to the console.*/ 