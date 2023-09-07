import React from "react";
import style from "./About.module.css";
import Perfil from "../../assets/perfil.jpeg";
import Instagram from '../../assets/instagram.png';
import Gmail from '../../assets/gmail.png';
import Github from '../../assets/github.png'

export default function About() {
  return (
    <div className={style.aboutContainer}>
      <h2>ABOUT ME</h2>
      <div className={style.grid}>
        <div className={style.aboutImg}>
          <div>
            <img src={Perfil}  className={style.img}></img>
          </div>
          <div className={style.iconos}>
            <a href='https://www.instagram.com/santii_mantineo/' target="_blank"> <img src={Instagram} alt="instagram" className={style.logo}/> </a>
            <a href='mailto:santinomantineo.@gmail.com'> <img src={Gmail} alt="gmail" className={style.logo}/> </a>
            <a href='https://github.com/SantinoMantineo' target="_blank"> <img src={Github} alt="github" className={style.logo}/> </a>
          </div>
        </div>
        <div className={style.aboutP}>
          <h2>¿Quien Soy?</h2>
          <p className={style.P}>
            I am a passionate designer and front-end
            programmer dedicated to crafting visually 
            stunning and user-friendly interfaces.
            <br></br>
            <br></br>
            I am highly motivated to expand 
            my skills and stay current with 
            the ever-evolving features and technologies.
          </p>
        </div>
      </div>
      </div>
  );
}