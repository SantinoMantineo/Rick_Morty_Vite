const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character";

function getCharById(req, res) {
  const { id } = req.params;

  axios(`${URL}/${id}`)
    .then((response) => response.data)
    .then((data) => {
      const character = {
        id: id,
        name: data.name,
        gender: data.gender,
        species: data.species,
        origin: data.origin,
        location: data.location,
        image: data.image,
        status: data.status,
      };

      character.name;
      res.status(200).json(character);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
}

module.exports = {getCharById};