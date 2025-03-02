import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../utils/alerts';
import { validators } from '../../utils/validators';
import './Profile.css';

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
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
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
        <div className='profile-layer-1'></div>
        <div className='profile-layer-2'></div>
        <div className='profile-container d-flex justify-content-center align-items-center w-100 h-100'>
          <div className='profile-edit-container d-flex flex-column p-5 rounded-5 shadow-lg w-100'>
            <h1 className='profile-edit-title mb-5'>Editar Perfil</h1>
            <h3 className='profile-edit-subtitle text-decoration-underline mb-5'>Información de usuario</h3>
            <form onSubmit={handleSaveProfile} className='w-100'>
              <div className="row">
                {fields.map((field, index) => (
                  <div key={index} className='col-md-6 mb-3'>
                    <label htmlFor={field.name} className='form-label mx-auto mb-3'>{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={editForm[field.name]}
                      onChange={handleChange}
                      className='form-control mx-auto ps-3 py-2 border-black rounded-3'
                      required={field.name !== 'password'}
                    />
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center mt-3 gap-3">
                <button type="submit" className="bg-black text-white px-4 py-1 rounded-pill" disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar'}
                </button>
                <button type="button" className="bg-black text-white px-4 py-1 rounded-pill" onClick={handleCancelEdit}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='profile-primary-container'>
        <div className='profile-bg-management'></div>
        <div className='profile-layer-1'></div>
        <div className='profile-layer-2'></div>
        <div className='profile-container d-flex justify-content-center align-items-center w-100 h-100'>
          <div className='profile-settings-container d-flex flex-column justify-content-center align-items-center p-10 rounded-5 shadow-lg w-100 px-5 mx-auto'>
            <h2 className='profile-settings-title mt-5 mb-4'>Perfil</h2>
            <h3 className='text-decoration-underline mb-5'>Información de usuario</h3>
            <form onSubmit={handleEditProfile}>
              {fields.map((field, index) => 
                (field.name !== 'confirmPassword' && field.name !== 'confirmEmail') ? (
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
                ) : null
              )}
              <div className="mt-4 d-flex justify-content-center">
                <button type="submit" className="mx-auto bg-black text-white px-4 py-1 rounded-pill text-lg">Editar</button>
              </div>
            </form>
            <div className="mt-4 d-flex justify-content-center">
              <button onClick={handleManageReservations} className="mx-auto bg-black text-white px-4 py-1 rounded-pill text-lg">
                Gestionar reservas
              </button>
            </div>
            <div className='mt-4 d-flex justify-content-center'>
              <button onClick={handleGoHome} className='bg-black text-white px-4 py-1 rounded-pill text-lg'>Volver</button>
            </div>
            <p className="profile-logout-btn text-decoration-underline mt-3 mb-5" onClick={handleLogout}>Cerrar sesión</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;