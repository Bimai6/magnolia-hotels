import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../utils/alerts';
import { validators } from '../../utils/validators';
import './Profile.css';

const API_URL = import.meta.env.VITE_API_URL;
const Profile = () => {
  const { user, logout, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: user?.fullName || '',
    user: user?.user || '',
    email: user?.email || '',
    confirmEmail: user?.email || '',
    password: user?.password || '',
    confirmPassword: user?.password || ''
  });
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    setShowEditProfile(true);
  };

  const handleManageReservations = (e) => {
    e.preventDefault();
    navigate('/my-reservations');
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const hasChanges = 
      editForm.user !== user.user || 
      editForm.fullName !== user.fullName || 
      editForm.email !== user.email || 
      editForm.password !== user.password;

    if (!hasChanges) {
      showAlert('No se realizaron cambios', 'warning');
      setLoading(false);
      return;
    }

    const errors = validators.validateForm(editForm, false, true);

    if (errors.length > 0) {
      errors.forEach(error => showAlert(error, 'error'));
      setLoading(false);
      return;
    }

    const updatedUser = {
      ...user,
      user: editForm.user,
      fullName: editForm.fullName,
      email: editForm.email,
      password: editForm.password
    };

    try {
      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar perfil');
      }

      const data = await response.json();
      login(data);
      setShowEditProfile(false);
      showAlert('Perfil actualizado', 'success');
    } catch (err) {
      showAlert(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setShowEditProfile(false);
    setEditForm({
      user: user.user,
      fullName: user.fullName,
      email: user.email,
      password: user.password
    });
  };

  const fields = [
    { name: 'user', type: 'text', label: 'Usuario' },
    { name: 'fullName', type: 'text', label: 'Nombre' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'confirmEmail', type: 'email', label: 'Confirmar Email' },
    { name: 'password', type: 'password', label: 'Contraseña' },
    { name: 'confirmPassword', type: 'password', label: 'Confirmar Contraseña' }
  ];

  if (showEditProfile) {
    return (
      <div className='profile-primary-container'>
        <div className='profile-bg-management'></div>
        <div className='bg-layer-1'></div>
        <div className='bg-layer-2'></div>
        <div className='profile-edit-container'>
          <h1 className='profile-edit-title mb-4'>Editar Perfil</h1>
          <h3 className='profile-edit-subtitle text-decoration-underline mb-4'>Información de usuario</h3>
          <form onSubmit={handleSaveProfile}>
            <div className="row">
              {fields.map((field, index) => (
                <div key={index} className='col-md-6 mb-3'>
                  <label htmlFor={field.name} className='form-label'>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={editForm[field.name]}
                    onChange={handleChange}
                    className='form-control'
                    required={field.name !== 'password'}
                  />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center mt-4 gap-3">
              <button type="submit" className="bg-black text-white px-4 py-1 rounded-pill text-lg" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
              <button type="button" className="bg-black text-white px-4 py-1 rounded-pill text-lg" onClick={handleCancelEdit}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className='profile-primary-container'>
      <div className='profile-bg-management'></div>
      <div className='bg-layer-1'></div>
      <div className='bg-layer-2'></div>
      <div className='profile-settings-container'>
        <h2 className='profile-settings-title mb-4'>Perfil</h2>
        <h3 className='text-decoration-underline mb-4'>Información de usuario</h3>
        <form onSubmit={handleEditProfile}>
          {fields.map((field, index) => 
            (field.name !== 'confirmPassword' && field.name !== 'confirmEmail') ? (
              <div key={index} className='mb-3'>
                <label className='form-label'>{field.label}</label>
                <input
                  type={field.type}
                  className='form-control'
                  placeholder={field.placeholder}
                  value={user?.[field.name] || ''}
                  readOnly
                />
              </div>
            ) : null
          )}
          <div className="mt-4 d-flex justify-content-center">
            <button type="submit" className="bg-black text-white px-4 py-1 rounded-pill text-lg">Editar</button>
          </div>
        </form>
        <div className="mt-4 d-flex justify-content-center">
          <button onClick={handleManageReservations} className="bg-black text-white px-4 py-1 rounded-pill text-lg">
            Gestionar reservas
          </button>
        </div>
        <div className='mt-4 d-flex justify-content-center'>
          <button onClick={handleGoHome} className='bg-black text-white px-4 py-1 rounded-pill text-lg'>Volver</button>
        </div>
        <p className="profile-logout-btn text-decoration-underline mt-3 mb-0" onClick={handleLogout}>Cerrar sesión</p>
      </div>
    </div>
  );
}

export default Profile;