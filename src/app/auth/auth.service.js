import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8080/auth/";

/*--------------------------------USUARIO------------------------------------*/

export const sign_up = async (user) => {
  const usuario = await fetch(API_URL + "nuevo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: String(user.first_name).trim(),

      email: String(user.email).trim(),
      password: String(user.password).trim(),
      rol: String("user").trim(),
    }),
  });
  return usuario;
};

export const sign_in = async (user) => {
  return await fetch(API_URL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: String(user.username).trim(),
      password: String(user.password).trim(),
    }),
  });
};

export const userConected = async (response) => {
  await sessionStorage.setItem("user", JSON.stringify({'id':response.id,'nombre':response.nombre}));
  sessionStorage.setItem("token", response.token);
};

export const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};

export const getUserToken = () => {
  const token = sessionStorage.getItem("token");
  return token;
};

export const getUser = async () => {
  return await JSON.parse(sessionStorage.getItem("user"));
};

export const addUsuario = async (usuario) => {
  
  const user = await getUser();
  console.log(user);
  return await fetch(API_URL + "persona/nuevo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: String(usuario.nombre).trim()+ "_"+String(" "+usuario.apellido).trim(),
      tipoDocumento: String(usuario.tipoDocumento).trim(),
      documento: parseInt(usuario.numeroDocumento),
      creador: user.id,
    }),
  });
};

export const editarUsuario = async (usuario) => {
  const user = await getUser();
  return await fetch(API_URL + "persona/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: String(usuario.nombre).trim()+ "_"+String(" "+usuario.apellido).trim(),
      tipoDocumento: String(usuario.tipoDocumento).trim(),
      documento: parseInt(usuario.documento),
      creador: user.id,
    }),
  });
};

export const listUsuarios = async () => {
  return await fetch(API_URL+"persona/list/persona");
}

export const eliminarUsuario = async (cedula) => {
  const response = await fetch(API_URL + "persona/eliminar/"+cedula, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario_Id: parseInt(cedula),
    }),
  });
  return await response.json();
};

export const findUsuario = async(cedula)=>{
  return await fetch(API_URL+"persona/buscarByDoc/"+cedula);
}

/*--------------------------------END------------------------------------*/

/*--------------------------------VEHICULOS------------------------------------*/
export const addEmpresa = async (empresa) => {
  return await fetch(API_URL + "empresas/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: String(empresa.nombre).trim(),
    }),
  });
};

export const getEmpresas = async (id_user) => {
  return await fetch(API_URL + "empresa/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario_Id: parseInt(id_user),
    }),
  });
};

/*--------------------------------END------------------------------------*/

/*--------------------------------OPCIONES EMPRESA------------------------------------*/

export const getOpciones = async (id_empresa) => {
  return await fetch(API_URL + "funcionalidad/FunEmpresa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      empresa_Id: parseInt(id_empresa),
    }),
  });
};

/*--------------------------------END------------------------------------*/

