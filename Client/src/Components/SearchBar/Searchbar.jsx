import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./SearchBar.module.css";
import searchIcon from "../../assets/search.png";
import randomIcon from "../../assets/random.png";
import favIcon from "../../assets/fav.png";
import musicIcon from "../../assets/music.png";

export default function SearchBar({ onSearch }) {
  const [id, setId] = useState("");

  function HandleChange(e) {
    e.preventDefault();

    let input = e.target.value;

    setId(input);
  }

  function handleRandomClick() {
    const randomId = Math.floor(Math.random() * 826) + 1;

    onSearch(randomId);

    setId("");
  }

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  function toggleAudio() {
    var audio = document.getElementById("myAudio");
    if (audio.paused) {
      audio.play();
      setIsAudioPlaying(true);
    } else {
      audio.pause();
      setIsAudioPlaying(false);
    }
  }

  function handleAudioEnded() {
    var audio = document.getElementById("myAudio");
    audio.currentTime = 0;
    audio.play();
  }

  return (
    <div className={style.searchBar}>
      <Link to="/favoritos" className={style.favButton}>
        <button>
          <img src={favIcon} />
        </button>
      </Link>
      <button className={style.random} onClick={handleRandomClick}>
        <img src={randomIcon} />
      </button>
      <input
        type="search"
        placeholder="Ingrese un ID"
        value={id}
        onChange={HandleChange}
      />
      <button className={style.search} onClick={() => onSearch(id)}>
        <img src={searchIcon} />
      </button>
      <button
        className={`${style.music} ${isAudioPlaying ? style.rotating : ""}`}
        onClick={toggleAudio}
      >
        <img src={musicIcon} />
      </button>
      <audio
        id="myAudio"
        src="https://ia800900.us.archive.org/32/items/tvtunes_27340/Rick%20and%20Morty.mp3"
        onEnded={handleAudioEnded}
      ></audio>
    </div>
  );
}