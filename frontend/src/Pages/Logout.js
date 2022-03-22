import Swal from 'sweetalert2';

export function logout (){
    
    Swal.fire({
        title: 'Cerrando sesion',
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          window.localStorage.removeItem('usuarioattendance');
          Swal.fire({
            icon: 'success',
            title: 'Has salido de la app',
            showConfirmButton: false,
            timer: 2000,
          })
        }
      })
      window.location = "/";
}
