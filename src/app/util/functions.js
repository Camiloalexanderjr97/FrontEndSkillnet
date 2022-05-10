//Alertas Bonitas
import Swal from "sweetalert2";

export function alert_user_detail(usuario){
     let html = printUsuario(usuario);
          Swal.fire({
               title: "Usuario",
               html: html,
          })
}

function printUsuario(usuario){
     let array = usuario.name.split("_");
     let nombre = array[0];
     let apellido = array[1];
     let html = "<div>\
          <div>Nombre: "+nombre+"</div>\
          <div>Apellido: "+apellido+"</div>\
          <div>Tipo Documento: "+usuario.tipoDocumento+"</div>\
          <div>Numero Documento: "+usuario.documento+"</div>\
     </div>";
     
     return html;
}

export function alert_login(success, message) {
     Swal.fire({
          icon: 'success',
          title: String(success).trim(),
          text: String(message).trim(),
          showConfirmButton: false,
          timer: 1500
     });
};

export function alert_success(success, message){
     Swal.fire({
          title: success,
          text: message,
          icon:'success',
          showConfirmButton: false,
          timer: 1500
     });
};

export function alert_logout() {
     let timerInterval
     Swal.fire({
          title: 'Cerrando Sesión!',
          timer: 2500,
          timerProgressBar: true,
          didOpen: () => {
               Swal.showLoading()
               const b = Swal.getHtmlContainer().querySelector('b')
               timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
               }, 100)
          },
          willClose: () => {
               clearInterval(timerInterval)
          }
     }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
               console.log('I was closed by the timer')
          }
     })
}

export function alert_error(error, message) {
     Swal.fire({
          icon: 'error',
          title: error,
          text: message,
          showConfirmButton: false,
     });
};

function verificarContraseña() {
     let password = document.getElementById('password').value;
     if (password.length >= 8) {
          let codigo, mayus, mini, num;
          mayus = false;
          mini = false;
          num = false;
          for (let index = 0; index < password.length; index++) {
               codigo = password.charCodeAt(index);
               //Mayusculas
               if (codigo >= 65 && codigo <= 90) {
                    mayus = true;
               }
               //Minusculas
               if (codigo >= 97 && codigo <= 122) {
                    mini = true;
               }
               //Numeros
               if (codigo >= 48 && codigo <= 57) {
                    num = true;
               }
          }
          if (mayus && mini && num) {
               return true;
          }
     } else {
          alert_error("Error", "La contraseña debe tener como minimo 8 caracteres. \n Además, la contraseña debe tener al menos una letra mayuscula, una minuscula y un numero.");
          return false;
     }
}