let myFavorites = [];

function postFav(req, res) {
  const character = req.body;

  myFavorites.push(character);
  
  res.status(200).json(myFavorites);
}

function deleteFav(req, res) {
  const { id } = req.params;

  myFavorites = myFavorites.filter(
    (favorite) => favorite.id !== id
  );

  res.status(200).json(myFavorites);
}

function clearFavorites(req, res) {
  myFavorites = []; // Borra todos los personajes favoritos
}

module.exports = { postFav, deleteFav, clearFavorites };
