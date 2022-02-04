const router = require('express').Router(); //required to use express router
const apiRoutes = require('./api'); //require all of the route files that exist in /api

router.use('/api', apiRoutes);

//this response will send if the user accesses a url that doesn't exist
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;