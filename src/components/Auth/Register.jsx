import { useState } from "react";
import '/src/components/Auth/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    user: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const fields = [
    { name: "fullName", type: "text", placeholder: "Nombre completo", label: "Nombre completo" },
    { name: "user", type: "text", placeholder: "Usuario", label: "Usuario"},
    { name: "email", type: "email", placeholder: "Email", label: "Email"},
    { name: "confirmEmail", type: "email", placeholder: "Email", label: "Confirmar email"},
    { name: "password", type: "password", placeholder: "Contraseña", label: "Contraseña"},
    { name: "confirmPassword", type: "password", placeholder: "Contraseña", label: "Confirmar contraseña"},
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (formData.email !== formData.confirmEmail) {
      alert("Los correos no coinciden");
      return;
    }
    console.log("Register with", formData);
  };

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
            ¿Ya tienes cuenta? <a href="#" className="text-blue-600">Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
