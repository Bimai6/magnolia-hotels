export const validators = {
    email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    password: (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/.test(password),
    username: (username) => /^[a-zA-Z0-9]{3,}$/.test(username),
    validateForm: (form, isRegister = false, isProfile = false) => {
      const errors = [];

      if (!validators.username(form.user)) {
        errors.push('El nombre de usuario debe tener al menos 3 caracteres alfanuméricos.');
      }
      
      if (!validators.password(form.password)) {
        errors.push('La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número.');
      }

      if (isRegister || isProfile) {

        if (!validators.email(form.email)) {
            errors.push('El correo electrónico no es válido.');
          }
      
          if (form.email !== form.confirmEmail) {
            errors.push('Los correos no coinciden.');
          }
  
        if (form.password !== form.confirmPassword) {
          errors.push('Las contraseñas no coinciden.');
        }
      }
      return errors;
    }
  };
  