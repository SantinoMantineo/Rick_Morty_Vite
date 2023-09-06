const axios = require('axios');

const getCharById = (res, id)=>{
    axios(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => response.data)
    .then(({ name, gender, species, origin, image, status}) => {
        const character = { 
        id: id,
        name: name, 
        gender: gender, 
        species: species,  
        origin: origin.name, 
        image: image, 
        status: status 
     }
     return res
     .writeHead(200, { "Content-type": "application/json"})
     .end(JSON.stringify(character))
    })
    .catch(error =>{
        return res
        .writeHead(500, {"Content-type": "text/plain"})
        .end(error.message)
    })
}

module.exports = {getCharById};