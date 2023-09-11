const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character";

async function getCharById(req, res) {
  try{
  const { id } = req.params;

  const response = await axios(`${URL}/${id}`)
    const data = response.data;

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

    } catch(error) {
      res.status(500).json({ message: error.message });
    };
}

module.exports = {getCharById};