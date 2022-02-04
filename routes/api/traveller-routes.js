const router = require('express').Router();
const { Location, Traveller, Trip } = require('../../models');

// The `/api/travellers` endpoint


//GET ROUTE TO SHOW ALL TRAVELLERS
router.get('/', (req, res) => {
  Traveller.findAll()
  .then((travellerData) => {
    res.status(200).json(travellerData);
  }).catch(err=> {
    console.log(err);
    res.status(400).json(err);
  })
  ;
});

//GET ROUTE TO SHOW A TRAVELLER BY ID
router.get('/:id', async (req, res) => {
  try {
    const travellerData = await Traveller.findByPk(req.params.id, {include:[Trip]});
  if (!travellerData) {
    res.status(404).json({message: "No traveller with this id!"});
    return;
  }
  res.status(200).json(travellerData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//POST ROUTE TO CREATE A NEW TRAVELLER
router.post('/', (req, res) => {
  Traveller.create(req.body)
  .then((newTraveller) => res.status(200).json(newTraveller))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

//PUT ROUTE TO UPDATE A TRAVELLER BY ID
router.put('/:id', async (req, res) => {
try {
  const travellerData = await Traveller.update(req.body, {
    where: {
      id: req.params.id
    },
  });
  if(!travellerData[0]) {
    res.status(404).json({ message: 'No traveller with this id'});
    return;
  }
  res.status(200).json(travellerData);
} catch (err) {
  res.status(400).json(err);
}
});

//DELETE ROUTE TO DELETE A TRAVELLER BY ID
router.delete('/:id', (req, res) => {
  Traveller.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTraveller) => {
      res.status(200).json(deletedTraveller);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
