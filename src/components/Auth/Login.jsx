import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from '../../context/AuthContext';

const showAlert = (message, icon = "error") => {
  Swal.fire({
    title: icon === "success" ? "¡Éxito!" : "¡Atención!",
    html: message,
    icon,
    confirmButtonText: "Aceptar",
  });
};

const validators = {
  password: password => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password),
  username: username => /^[a-zA-Z0-9]{3,}$/.test(username)
};

function Login() {
  const [formData, setFormData] = useState({
    user: "",
    password: ""
  });
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validators.username(formData.user)) {
      return showAlert("El nombre de usuario debe tener al menos 3 caracteres alfanuméricos.");
    }
    if (!validators.password(formData.password)) {
      return showAlert("La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número.");
    }

    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      const userFound = users.find(u => u.user === formData.user);
      
      if (!userFound) {
        return showAlert('Usuario no encontrado', 'error');
      }

      if (userFound.password !== formData.password) {
        return showAlert('Contraseña incorrecta', 'error');
      }

      showAlert("Inicio de sesión exitoso", "success");
      login(userFound);

    } catch (error) {
      showAlert(`Error conectando a la base de datos: ${error.message}`, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className="register-title mb-5 text-black pt-5">Iniciar sesión</h2>
        <label>Usuario</label>
        <input type="text" name="user" value={formData.user} onChange={handleChange} />
      </div>
      <div>
        <label>Contraseña</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;