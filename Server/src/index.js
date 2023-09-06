const http = require('http');
const characters = require("./utils/data")

http.createServer((req, res) => {
  const {url} = req;
  // Configuración del encabezado CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Aquí se manejarán las solicitudes y respuestas del servidor

  if(url.includes("/rickandmorty/character")){
    let urlId = url.split("/").pop()
    let found = characters.find((character) => character.id === Number(urlId))
    res
    .writeHead(200, { "content-type": "application/json"})
    .end(JSON.stringify(found))
  }


}).listen(3001)
