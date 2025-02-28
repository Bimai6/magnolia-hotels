import { useState, useContext } from "react";
import Swal from "sweetalert2";
import '../Auth/Auth.css';
import Register from '../Auth/Register';
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
  const [showRegister, setShowRegister] = useState(false);

  const fields = [
    { name: "user", type: "text", placeholder: "Usuario", label: "Usuario" },
    { name: "password", type: "password", placeholder: "Contraseña", label: "Contraseña" },
  ];

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
      setShowRegister(true);

    } catch (error) {
      showAlert(`Error conectando a la base de datos: ${error.message}`, 'error');
    }
  };

  if(showRegister) {
    return <Register />;
  }

  return (
    <div className="login-primary-container flex justify-center min-h-screen bg-gray-300 p-5">
      <div className="login-container p-10 rounded-5 shadow-lg w-full px-5 mx-auto">
        <div className="login-logo-container">
        <img className="login-logo bg-white rounded-pill" src="https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/isotipo_1_k7fbrd.png" alt="Magnolia Hotels Logo" />     
        </div>
        <h2 className="login-title mb-5 text-center text-black pt-5">Iniciar sesion</h2>
        <form onSubmit={handleSubmit} className="row justify-content-center">
          {fields.map(({ name, type, placeholder, label }) => (
            <div key={name} className="login-form-field mb-4">
              <label htmlFor={name} className="label-login-fields block text-black mb-1">{label}</label>
              <br />
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className="w-100 pe-5 py-2 border-black border-1 rounded-3"
                required
              />
            </div>
          ))}
          <div className="col-12 mt-4 d-flex justify-content-center">
            <button type="submit" className="mx-auto bg-black text-white px-5 py-2 rounded-pill text-lg">
              Iniciar Sesión
            </button>
          </div>
          <p className="text-center mt-3 text-sm text-black pb-3">
            Tambien puedes <span className="register-anchor" onClick={() => setShowRegister(true)}>crear una cuenta</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;