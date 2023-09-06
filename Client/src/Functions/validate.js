export const validate = (user) => {
    let errors = {};
  
    if (!user.email) {
      errors.email = "Ingrese un email";
    } else if (!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(user.email)) {
      errors.email = "Ingrese un email válido";
    } else if (user.email.length > 35) {
      errors.email = "El email no puede tener más de 35 caracteres";
    }
  
    if (!user.password) {
      errors.password = "Ingrese una contraseña";
    } else if (!/\d/.test(user.password)) {
      errors.password = "La contraseña debe contener al menos un número";
    } else if (user.password.length < 6 || user.password.length > 10) {
      errors.password =
        "La contraseña debe tener una longitud entre 6 y 10 caracteres";
    }
  
    return errors;
  };