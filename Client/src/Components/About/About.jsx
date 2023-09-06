import React from "react";
import style from "./About.module.css";
import Perfil from "../../assets/perfil.jpeg";
import Instagram from '../../assets/instagram.png';
import Gmail from '../../assets/gmail.png';
import Github from '../../assets/github.png'

export default function About() {
  return (
    <>
    <div className={style.aboutContainer}>
      <h2>ABOUT ME</h2>
      <div className={style.perfil}>
        <img src={Perfil}></img>
      </div>
      <div className={style.text}>
        <p>
          Mi nombre es Maximiliano Valli, tengo 38 años y soy de la provincia de Santa Fe,<br></br>
          empecé este año a estudiar en Henry porque tenía ganas de aprender
          programación.<br></br>
          <br></br>
          Hasta ahora la expericia es genial y esta página fue construída con
          todo lo que aprendí.
        </p>
        <div>
          <a href='https://www.instagram.com/maxi.valli.aicardi/' target="_blank"> <img src={Instagram} alt="instagram" className={style.logo}/> </a>
          <a href='mailto:maximilianovalli.sc@gmail.com'> <img src={Gmail} alt="gmail" className={style.logo}/> </a>
          <a href='https://github.com/maxivalli' target="_blank"> <img src={Github} alt="github" className={style.logo}/> </a>
        </div>
      </div>
    </div>
    </>
  );
}