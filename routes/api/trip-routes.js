const router = require('express').Router();
const { Location, Traveller, Trip } = require('../../models');

// The `/api/trips` endpoint


//GET ROUTE TO SHOW ALL TRIPS
router.get('/', (req, res) => {
  Trip.findAll({
    include:[Traveller,Location]
  }).then((tripData) => {
    res.status(200).json(tripData);
  }).catch(err=> {
    console.log(err);
    res.status(400).json(err);
  })
  ;
});

//GET ROUTE TO SHOW A TRIP BY ID
router.get('/:id', async (req, res) => {
  try {
    const tripData = await Trip.findByPk(req.params.id, {include:[Traveller,Location]});
  if (!tripData) {
    res.status(404).json({message: "No trip with this id!"});
    return;
  }
  res.status(200).json(tripData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//POST ROUTE TO CREATE A NEW TRIP
router.post('/', (req, res) => {
  Trip.create(req.body)
  .then((newTrip) => res.status(200).json(newTrip))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

//PUT ROUTE TO UPDATE A TRIP BY ID
router.put('/:id', async (req, res) => {
try {
  const tripData = await Trip.update(req.body, {
    where: {
      id: req.params.id
    },
  });
  if(!tripData[0]) {
    res.status(404).json({ message: 'No trip with this id'});
    return;
  }
  res.status(200).json(tripData);
} catch (err) {
  res.status(400).json(err);
}
});

//DELETE ROUTE TO DELETE A TRIP BY ID
router.delete('/:id', (req, res) => {
  Trip.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTrip) => {
      res.status(200).json(deletedTrip);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
