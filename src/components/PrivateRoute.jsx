import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Dialog } from '@mui/material';
import Login from './Auth/Login';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const { isLogged } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!isLogged) {
      setRedirect(true);  
      setTimeout(() => setOpen(true), 1300); 
    } else {
      setOpen(false);
    }
  }, [isLogged]);

  if (redirect) {
    return (
      <Navigate to="/" replace />
    );
  }

  if (!isLogged) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Login onClose={handleClose} />
      </Dialog>
    );
  }

  return element;
};

export default PrivateRoute;
