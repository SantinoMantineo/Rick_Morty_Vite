import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./ImageP.module.css";

export default function ImageP() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);

  const goBack = () => {
    navigate(-1);
  }

  return (
    <>
    <div className={style.container}>
      <img src={character.image} alt={character.name}></img>
      <button onClick={goBack} className={style.back}>BACK</button>
    </div>
    </>
  );
}