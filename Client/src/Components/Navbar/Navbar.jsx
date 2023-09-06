import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import style from "./Navbar.module.css";
import Logo from "../../assets/logo.png";

export default function Navbar({ onSearch, onLogout }) {
  return (
    <div className={style.container}>
    <div className={style.navbar}>
      <div className={style.logo}>
        <Link to="/home">
        <img src={Logo}></img>
        </Link>
      </div>
      <SearchBar onSearch={onSearch} className={style.search}/>
      <div className={style.buttons}>
        <Link to="/home" className={style.homeButton}>
          <h3>HOME</h3>
        </Link>
        <Link to="/about" className={style.aboutButton}>
          <h3>ABOUT</h3>
        </Link>
        <h3 onClick={onLogout} className={style.logoutButton}>
          LOGOUT
        </h3>
      </div>
    </div>
    </div>
  );
}