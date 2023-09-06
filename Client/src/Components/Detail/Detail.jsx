import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Detail.module.css";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
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
  };

  return (
    <>
      <div className={style.component}>
        <img
          src={character.image && character.image}
          alt={character.name}
        ></img>
        <h3 className={style.name}>{character.name && character.name}</h3>
        <p className={style.data}>
          <span>Gender: </span>
          <span className={style.value}>{character.gender && character.gender}</span>
        </p>
        <p className={style.data}>
          <span>Status: </span>
          <span className={style.value}>{character.status && character.status}</span>
        </p>
        <p className={style.data}>
          <span>Species: </span>
          <span className={style.value}>{character.species && character.species}</span>
        </p>
        <p className={style.data}>
          <span>Origin: </span>
          <span className={style.value}>{character.origin?.name}</span>
        </p>
        <p className={style.data}>
          <span>Location: </span>
          <span className={style.value}>{character.location?.name}</span>
        </p>
        <button onClick={goBack} className={style.back}>
          BACK
        </button>
      </div>
    </>
  );
}