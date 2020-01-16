const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringToArray = require('../services/parseStringToArray');

module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
  
    let dev = await Dev.findOne({ github_username });

    if (dev) {
      return res.json(dev);
    }

    const ghRes = await axios.get(`https://api.github.com/users/${github_username}`);
    
    const { name = login, avatar_url, bio } = ghRes.data;
    
    const techsArray = parseStringToArray(techs);
    
    const location = {
      type: 'Point',
      coordinates: [latitude, longitude],
    }
    
    dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    });
    
    return res.json(dev);
  },

  async index(req, res) {
    return res.json(await Dev.find());
  }
};
