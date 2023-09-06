import style from "./NotFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={style.NotFound}>
      <div>
        <h1>404</h1>
        <p>Page not found</p>
      </div>
      <div className={style.button}>
        <Link to="/home">
          <button>Take me Home</button>
        </Link>
      </div>
    </div>
  );
}