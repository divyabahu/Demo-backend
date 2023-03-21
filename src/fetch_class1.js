const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/projects', (req, res) => {
  const url = '';

  // Make API request using axios library
  axios.get(url)
    .then(response => {
      const data = response.data;
      res.send(data);
    })
    .catch(error => {
      console.error(error);
      res.send('An error occurred while fetching the content');
    });
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});

