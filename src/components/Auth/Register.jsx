import { useState, useContext } from "react";
import { showAlert } from "../../utils/alerts";
import '../Auth/Auth.css';
import Login from '../Auth/Login';
import { validators } from '../../utils/validators';
import { AuthContext } from '../../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    user: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [showLogin, setShowLogin] = useState(false);
  const { login } = useContext(AuthContext);

  const fields = [
    { name: "fullName", type: "text", placeholder: "Nombre completo", label: "Nombre completo" },
    { name: "user", type: "text", placeholder: "Usuario", label: "Usuario" },
    { name: "email", type: "email", placeholder: "Email", label: "Email" },
    { name: "confirmEmail", type: "email", placeholder: "Email", label: "Confirmar email" },
    { name: "password", type: "password", placeholder: "Contraseña", label: "Contraseña" },
    { name: "confirmPassword", type: "password", placeholder: "Contraseña", label: "Confirmar contraseña" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validators.validateForm(formData, true);

  if (errors.length > 0) {
    errors.forEach(error => showAlert(error, 'error'));
    return;
  }

    try {
      const existingUsersResponse = await fetch("http://localhost:3000/users");
      const existingUsers = await existingUsersResponse.json();

      if (existingUsers.some(user => user.user === formData.user)) {
        return showAlert("El usuario ya está registrado", "warning");
      }

      const newUserId = parseInt(existingUsers[existingUsers.length - 1].id) + 1;

      const newUser = {
        id: newUserId.toString(),
        user: formData.user,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        myReservations: []
      };

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });
      
      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }

      login(newUser);
      showAlert("Inicio de sesión exitoso", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      showAlert("Error conectando a la base de datos", error);
    }
  };

  if (showLogin) {
    return <Login />;
  }

  return (
    <div className="register-primary-container flex items-center justify-center min-h-screen bg-gray-300 p-5">
      <div className="register-container p-10 rounded-5 shadow-lg w-full px-5 m-auto">
        <h2 className="register-title mb-5 text-black pt-5">Registro</h2>
        <form onSubmit={handleSubmit} className="row justify-content-center">
          {fields.map(({ name, type, placeholder, label }) => (
            <div key={name} className="register-form-field col-12 col-md-6 mb-4">
              <label htmlFor={name} className="label-register-fields block text-black mb-1">{label}</label>
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
              Registrarse
            </button>
          </div>
          <p className="text-center mt-3 text-sm text-black pb-3">
            ¿Ya tienes cuenta? <span className="login-anchor" onClick={() => setShowLogin(true)}>Inicia sesión</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
