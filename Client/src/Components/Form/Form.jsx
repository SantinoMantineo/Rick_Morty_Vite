import { useState } from "react";
import { validate } from "../../functions/validate";
import style from "./Form.module.css";

export default function Form({ login }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...user,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!errors.email && !errors.password) {
      login(user);
    } else {
      alert("Datos incorrectos");
    }
  }

  return (
    <>
      <div className={style.container}>
        <h2>Inicia sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.email}>
            <input
              type="text"
              placeholder="santinomantineo@mail.com"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            {errors.email && <h5 className={style.error}>{errors.email}</h5>}
          </div>
          <div className={style.password}>
            <input
              type="password"
              placeholder="123123"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            {errors.password && (
              <h5 className={style.error}>{errors.password}</h5>
            )}
          </div>
          <div>
            <button type="submit" className={style.submit}>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}