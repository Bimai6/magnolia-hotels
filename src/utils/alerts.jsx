import Swal from "sweetalert2";

export const showAlert = (message, icon = "error") => {
  Swal.fire({
    title: icon === "success" ? "¡Éxito!" : "¡Atención!",
    html: message,
    icon,
    confirmButtonText: "Aceptar"
  });
};