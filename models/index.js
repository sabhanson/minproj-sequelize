// import all the models since we will be assigning their associations below
const Location = require('./Location');
const Traveller = require('./Traveller');
const Trip = require('./Trip');



Trip.belongsTo(Traveller);

Traveller.hasMany(Trip);

Location.hasMany(Trip);

Location.belongsToMany(Trip, { through: Traveller});


module.exports = {
    Location:Location,
    Traveller:Traveller,
    Trip:Trip
};
