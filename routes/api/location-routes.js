const router = require('express').Router();
const { Location, Traveller, Trip } = require('../../models');

// The `/api/locations` endpoint


//GET ROUTE TO SHOW ALL LOCATIONS
router.get('/', (req, res) => {
  Location.findAll({
    include:[Trip,Traveller]
  }).then((tripData) => {
    res.status(200).json(tripData);
  }).catch(err=> {
    console.log(err);
    res.status(400).json(err);
  })
  ;
});

//GET ROUTE TO SHOW A LOCATION BY ID
router.get('/:id', async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {include:[Trip,Traveller]});
  if (!locationData) {
    res.status(404).json({message: "No location with this id!"});
    return;
  }
  res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//POST ROUTE TO CREATE A NEW LOCATION
router.post('/', (req, res) => {
  Location.create(req.body)
  .then((newLocation) => res.status(200).json(newLocation))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

//PUT ROUTE TO UPDATE A LOCATION BY ID
router.put('/:id', async (req, res) => {
try {
  const locationData = await Location.update(req.body, {
    where: {
      id: req.params.id
    },
  });
  if(!locationData[0]) {
    res.status(404).json({ message: 'No location with this id'});
    return;
  }
  res.status(200).json(locationData);
} catch (err) {
  res.status(400).json(err);
}
});

//DELETE ROUTE TO DELETE A LOCATION BY ID
router.delete('/:id', (req, res) => {
  Location.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedLocation) => {
      res.status(200).json(deletedLocation);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
