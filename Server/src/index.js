const http = require('http');
const { getCharById } = require("./controllers/getCharById")

http.createServer((req, res) => {
  // Configuración del encabezado CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Aquí se manejarán las solicitudes y respuestas del servidor
  if(req.url.includes("/rickandmorty/character")){
    const id = req.url.split("/").at(-1)
    getCharById(res, +id)
  }


}).listen(3001, "localhost")
