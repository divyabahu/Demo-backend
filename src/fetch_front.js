
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/projects', (req, res) => {
  const url = req.query.api; // Get the value of the `api` parameter from the query string

  axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const h3Elements = $('h3');
      const h3Texts = h3Elements.map((i, el) => $(el).text()).get(); // Extract text inside h2 elements
      console.log(h3Texts); // Print text inside h2 elements to console
      res.send('Check console for h2 elements');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: Could not retrieve HTML page');
    });
});

app.listen(port, () => console.log(`API listening at http://localhost:${port}`));
