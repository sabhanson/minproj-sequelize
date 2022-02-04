// import all the models since we will be assigning their associations below
const Location = require('./Location');
const Traveller = require('./Traveller');
const Trip = require('./Trip');



Trip.belongsTo(Traveller);

Traveller.hasMany(Trip);

Location.hasMany(Traveller);


Location.hasMany(Trip);

Trip.belongsTo(Location);


module.exports = {
    Location:Location,
    Traveller:Traveller,
    Trip:Trip
};
