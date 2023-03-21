const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

app.get('/projects', (req, res) => {
  const url = 'https://docs.atlassian.com/jira-software/REST/9.5.0/#agile/1.0/board/{boardId}/project-getProjects';
  // const url = 'https://jira.atlassian.com/rest/api/latest/issue/JRA-9?expand=names,renderedFields';


  axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const h2Elements = $('h2');
      console.log(h2Elements.text()); // Print text inside h2 elements to console
      res.send('Check console for h2 elements');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: Could not retrieve HTML page');
    });
});




app.listen(port, () => console.log(`API listening at http://localhost:${port}`));
