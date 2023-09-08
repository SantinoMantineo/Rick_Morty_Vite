const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character";

function getCharById(req, res) {
  //(req, res)
  const { id } = req.params;

  axios(`${URL}/${id}`)
    .then((response) => response.data)
    .then((data) => {
      const character = {
        id: id,
        name: data.name,
        gender: data.gender,
        species: data.species,
        origin: data.origin?.name,
        image: data.image,
        status: data.status,
      };

      /* res
        .writeHead(200, { "content-type": "application/json" })
        .end(JSON.stringify(character)); */

      character.name;
      res.status(200).json(character);
    })
    .catch((error) => {
      /* res.writeHead(500, { "content-type": "text/plain" }).end(error.message); */

      res.status(500).json({ message: error.message });
    });
}

module.exports = {getCharById};