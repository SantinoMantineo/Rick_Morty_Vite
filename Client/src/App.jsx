//Importaciones de módulos y bibliotecas
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
//Importacion de actions de Redux
import { useDispatch } from "react-redux";
import { removeFavorite } from "./Redux/actions";
import { clearFavorites } from "./Redux/actions";
//Importaciones componentes
import Cards from "./components/Cards/Cards";
import Navbar from "./components/Navbar/Navbar";
import ImageP from "./components/ImageP/ImageP";
import Footer from "./components/Footer/Footer";
//Importaciones vistas
import NotFound from "./components/Error/NotFound";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import LandingPage from "./components/LandingPage/LandingPage";
import Favorites from "./components/Favorites/Favorites";
//Importacion de estilos
import style from "./App.module.css";
import videoBg from "./assets/videoBG.mp4"

function App() {
  //Para manejar la validación y el inicio de sesion

  const EMAIL = "santinomantineo@gmail.com";
  const PASSWORD = "123123";

  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  const dispatch = useDispatch();

  function login(userData) {
    if (userData.password === PASSWORD && userData.email === EMAIL) {
      setAccess(true);
      navigate("/home");
    }
  }
  //Redirecciona a la pagina de inicio si no se ha iniciado sesion

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  //Para manejar el el cierre de sesion

  function logout() {
    setAccess(false);
    setCharacters([]); //Limpia la lista de personajes
    dispatch(clearFavorites()); // Limpia los favoritos en Redux
    navigate("/");
  }

  //Para manejar el boton de cierre de las Cards

  const [characters, setCharacters] = useState([]);

  const closeHandler = (id) => {
    let deleted = characters.filter((character) => character.id !== Number(id));

    dispatch(removeFavorite(id)); //Remueve el personaje de favoritos en Redux
    setCharacters(deleted); // Actualiza la lista de personajes
  };

  //Para manejar la busqueda y cargar la Card

  const searchHandler = (id) => {
    if (id > 826) {
      window.alert("¡Solo hay 826 IDs de personajes!");
      return;
    }

    const isIdLoaded = characters.some(
      (character) => character.id === Number(id)
    );
    if (isIdLoaded) {
      window.alert("¡Ese ID ya está cargado!");
      return;
    }

    axios(`http://localhost:3001/rickandmorty/character/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]); //Agrega el personaje a la lista
        } else {
          window.alert("¡Debe ingresar un ID!");
        }
      })

      .catch((error) => {
        console.log("Error:", error);

        window.alert("Ocurrió un error al realizar la solicitud");
      });
  };

  return (
    <div className={style.App}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage login={login} />
            </>
          }
        />
        <Route
          path="/home"
          element={
            access ? (
              <>
                <Navbar onSearch={searchHandler} onLogout={logout} />
                <Cards characters={characters} onClose={closeHandler} />
                <Footer />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/favoritos"
          element={
            access ? (
              <>
                <Navbar onSearch={searchHandler} onLogout={logout} />
                <Favorites />
                <Footer />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/about"
          element={
            access ? (
              <>
                <Navbar onSearch={searchHandler} onLogout={logout} />
                <About />
                <Footer />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/image/:id"
          element={
            access ? (
              <>
                <Navbar onSearch={searchHandler} onLogout={logout} />
                <ImageP />
                <Footer />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/detail/:id"
          element={
            access ? (
              <>
                <Navbar onSearch={searchHandler} onLogout={logout} />
                <Detail />
                <Footer />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <video className={style.video} src={videoBg} autoPlay loop muted/>
    </div>
  );
}

export default App;

//`https://rym2-production.up.railway.app/api/character/${1}?key=henrym-maxivalli`
