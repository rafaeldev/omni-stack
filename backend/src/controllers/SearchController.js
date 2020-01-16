const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringToArray = require('../services/parseStringToArray');

module.exports = {
  async index(req, res) {
    console.log(req.query);

    const { techs, latitude, longitude } = req.query;
    
    const techsArray = parseStringToArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [latitude, longitude]
          },
          $maxDistance: 10000,
        }
      }
    });

    return res.json({ devs })
  }
};
