const express = require("express");
​
const app = express();
const playStore = require("./playstore")
const PORT = 1234;
​
​
// app.listen(PORT, () => {
//   console.log(`app is listening on port ${PORT}`)
// })
​
​
app.get('/apps', (req, res) => {
  const { sort, genres } = req.query
​
  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res.status(404).send('Not Found')
​
    } else {
​
      let results = playStore.sort((a, b) => b.Rating - a.Rating)
      res.json(results);
    }
  };
​
  if (genres) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      return res.status(400).send('The genre does not exist')
​
    } else {
​
      let results = playStore.filter(a => a.Genres === genres)
      res.json(results)
    }
  };
​
  return(res.json(playStore))
​
​
});
​
module.exports = app