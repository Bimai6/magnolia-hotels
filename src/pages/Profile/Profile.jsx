import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showCancelReservations, setShowCancelReservations] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  const handleEditProfile = (e) => {
    e.preventDefault();
    setShowEditProfile(true);
  }

  const handleCancelReservations = (e) => {
    e.preventDefault();
    setShowCancelReservations(true);
  }

  const fields = [
    { name: "user", type: "text", label: "Usuario" },
    { name: "fullName", type: "text", label: "Nombre" },
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Contraseña" }
  ];

  return (
    <>
      <div className='profile-primary-container'>
        <div className='profile-bg-management'></div>
        <div className='profile-layer-1'></div>
        <div className='profile-layer-2'></div>
        <div className='profile-container d-flex justify-content-center align-items-center w-100 h-100'>
          <div className='profile-settings-container d-flex flex-column justify-content-center align-items-center p-10 rounded-5 shadow-lg w-100 px-5 mx-auto'>
            <h2 className='profile-settings-title mt-4 mb-4'>Perfil</h2>
            <h3 className='text-decoration-underline mb-5'>Información de su usuario</h3>
            <form onSubmit={handleEditProfile}>
            {fields.map((field, index) => (
              <div key={index} className='d-flex flex-column justify-content-center mb-3 w-100'>
                <label className='form-label mx-auto mb-3'>{field.label}</label>
                <input
                  type={field.type}
                  className='form-control mx-auto py-2 text-center border-black border-1 rounded-3'
                  placeholder={field.placeholder}
                  value={user?.[field.name] || ''}
                  readOnly
                />
              </div>
            ))}
              <div className="mt-5 d-flex justify-content-center">
                <button type="submit" className="mx-auto bg-black text-white px-4 py-1 rounded-pill text-lg">Editar</button>
              </div>
            </form>
            <p className="profile-logout-btn text-decoration-underline mt-3 mb-5" onClick={handleLogout}>Cerrar sesión</p>
          </div>
          <div className='profile-reservations-container d-flex flex-column justify-content-center align-items-center p-10 rounded-5 shadow-lg w-100 px-5 mx-auto'>
              <h2 className='profile-reservations-title mt-4 mb-4'>Reservas</h2>
              <h3 className='text-decoration-underline mb-5'>Información de sus reservas</h3>
              <form onSubmit={handleCancelReservations}>
                <button type="submit" className="mx-auto bg-black text-white px-4 py-1 rounded-pill text-lg">Cancelar reservas</button>
              </form>
          </div>
        </div>
          
      </div>
    </>
  );
}

export default Profile;