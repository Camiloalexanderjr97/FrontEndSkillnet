import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import * as authService from '../../auth/auth.service';
import { useParams } from 'react-router-dom';
import { alert_error, alert_success, alert_user_detail } from '../../util/functions'

const Crud_Opcion = () => {

     const { id } = useParams();
     const [upUser, setUpUser] = useState({
          nombre: "",
          apellido: "",
          tipoDocumento: "",
          documento: "",
     });

     const [usuario, setUsuario] = useState({
          nombre: "",
          apellido: "",
          tipoDocumento: "",
          numeroDocumento: ""
     });
     const [usuarios, setUsuarios] = useState([]);

     async function guardarUsuario() {
          try {
               const response = await authService.addUsuario(usuario);
               response.json().then(value => {
                    if (parseInt(response.status) !== 201) {
                         alert_error("Error!", value.mensaje);
                    } else {
                         setUsuario(value);
                         alert_success("Exito!", value.mensaje);
                         setTimeout(()=>{window.location.reload()},1500);
                    }
               })
          } catch (error) {
               console.log(error);
          }
     }

     async function buscarUsuario() {
          try {
               let cedula = document.getElementById("buscar_cedula").value;
               const response = await authService.findUsuario(cedula);
               response.json().then(value => {
                    if (parseInt(response.status) !== 200) {
                         alert_error("Error!", value.mensaje);
                    } else {
                         setUpUser({
                              nombre: splitNombre(value.name)[0],
                              apellido: splitNombre(value.name)[1],
                              tipoDocumento: value.tipoDocumento,
                              documento: value.documento,
                         });
                         document.getElementById("buscarUsuarioForm").hidden = true;
                         document.getElementById("actualizarUsuario").hidden = false;
                    }
               })
          } catch (error) {
               console.log(error);
          }
     }

     async function consultarUsuarios() {
          try {
               
               const response = await authService.listUsuarios();
               response.json().then(value => {
                    if (parseInt(response.status) !== 200) {
                         alert_error("Error!", value.mensaje);
                    } else {
                         setUsuarios(value);
                    }
               })
          } catch (error) {
               console.log(error);
          }
     }

     useEffect(() => {
          consultarUsuarios()
     }, [])

     async function eliminarUsuario() {
          try {
               let cedula = document.getElementById("id_user_delete").value;
               authService.eliminarUsuario(cedula).then(response => {
                    if (response !== true) {
                         alert_error("Error!", "No se pudo eliminar el usuario.");
                    } else {
                         alert_success("Exito!", "Usuario eliminado correctamente.");
                         setTimeout(()=>{window.location.reload()},1500);
                    }
               });
          } catch (error) {
               console.log(error);
          }
     }

     async function actualizarUsuario() {
          try {
               const response = await authService.editarUsuario(upUser);
               response.json().then(value => {
                    if (parseInt(response.status) !== 200) {
                         alert_error("Error!", value.mensaje);
                    } else {
                         setUsuario(value);
                         alert_success("Exito!", value.mensaje);
                         setTimeout(()=>{window.location.reload()},1500);
                    }
               })
          } catch (error) {
               console.log(error);
          }
     }

     function handleChangeUsuario(e) {
          setUsuario({ ...usuario, [e.target.name]: e.target.value });
     }

     function handleChangeUpUser(e) {
          setUpUser({ ...upUser, [e.target.name]: e.target.value });
     }

     function splitNombre(nombre) {
          return nombre.split("_");
     }

     return (
          <div>
               <nav className="navbar navbar-light bg-light shadow p-3 rounded">
                    <form className="container-fluid">
                         <div className='justify-content-start'>
                              <button className="btn btn-primary me-2" onClick={() => {
                                   document.getElementById("consultarUsuarioForm").hidden = true
                                   document.getElementById("eliminarUsuarioForm").hidden = true
                                   document.getElementById("actualizarUsuarioForm").hidden = true
                                   document.getElementById("guardarUsuarioForm").hidden = false
                              }}
                                   type="button">Nuevo</button>
                         </div>
                         <div className=''>
                              <button className="btn btn-secondary mx-1" type="button" onClick={() => {
                                   document.getElementById("guardarUsuarioForm").hidden = true
                                   document.getElementById("eliminarUsuarioForm").hidden = true
                                   document.getElementById("actualizarUsuarioForm").hidden = true
                                   document.getElementById("consultarUsuarioForm").hidden = false
                                   consultarUsuarios()
                              }}>Consultar</button>
                              <button className="btn btn-success mx-1" type="button">Guardar</button>

                              <button className="btn btn-primary mx-1" type="button" onClick={() => {
                                   document.getElementById("guardarUsuarioForm").hidden = true
                                   document.getElementById("consultarUsuarioForm").hidden = true
                                   document.getElementById("eliminarUsuarioForm").hidden = true
                                   document.getElementById("actualizarUsuarioForm").hidden = false

                              }}>Actualizar</button>

                              <button className="btn btn-danger mx-1" type="button" onClick={() => {
                                   document.getElementById("guardarUsuarioForm").hidden = true
                                   document.getElementById("consultarUsuarioForm").hidden = true
                                   document.getElementById("actualizarUsuarioForm").hidden = true
                                   document.getElementById("eliminarUsuarioForm").hidden = false
                              }}>Eliminar</button>
                         </div>
                    </form>
               </nav>

               <div id='guardarUsuarioForm' name="forms" className='container col-8 mt-5' hidden>
                    <form className='gap-1'>
                         <div className='row gap-1'>
                              <div className="form-floating col-5 ">
                                   <input type="text" name='nombre' value={usuario.nombre} onChange={handleChangeUsuario} className="form-control" id="floatingInput" placeholder="Nombre" required />
                                   <label htmlFor="floatingInput">Nombre</label>
                              </div>
                              <div className="form-floating col-5">
                                   <input type="text" name='apellido' value={usuario.apellido} onChange={handleChangeUsuario} className="form-control" id="floatingPassword" placeholder="Apellido" />
                                   <label htmlFor="floatingPassword">Apellido</label>
                              </div>

                         </div>
                         <div className='row gap-1 mt-2'>
                              <select className="form-floating p-0 col-5" name='tipoDocumento' value={usuario.tipoDocumento} onChange={handleChangeUsuario}>
                                   <option defaultValue={""} hidden value="">Tipo Documento</option>
                                   <option value="C.C">C.C</option>
                                   <option value="T.I">T.I</option>
                              </select>
                              <div className="form-floating col-5">
                                   <input type="number" name='numeroDocumento' value={usuario.numeroDocumento} className="form-control" id="floatingPassword" onChange={handleChangeUsuario} placeholder="Documento" />
                                   <label >Documento</label>
                              </div>
                         </div>
                         <div className='d-flex justify-content-center mt-2'>
                              <button type='button' className='btn btn-primary' onClick={() => { guardarUsuario() }}>Guardar</button>
                         </div>
                    </form>
               </div>

               <div id='consultarUsuarioForm' name="forms" className='container col-7 mt-5 border shadow bg-light' hidden>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th scope="col">#</th>
                                   <th scope="col">Nombre</th>
                                   <th scope="col">Apellido</th>
                                   <th scope="col">Documento</th>
                                   <th scope="col">Acción</th>
                              </tr>
                         </thead>
                         <tbody>
                              {

                                   usuarios.map((value) => (
                                        <tr key={value.id}>
                                             <th scope="row">{value.id}</th>
                                             <td>{splitNombre(value.name)[0]}</td>
                                             <td>{splitNombre(value.name)[1]}</td>
                                             <td>{value.tipoDocumento + " - " + value.documento}</td>
                                             <td className='d-flex justify-content-center'><button className='btn-sm btn-primary' type='button' onClick={() => { alert_user_detail(value) }}>Ver</button></td>
                                        </tr>
                                   ))
                              }
                         </tbody>
                    </table>
               </div>

               <div id='eliminarUsuarioForm' name="forms" className='container col-8 mt-5 border shadow bg-light' hidden>
                    <form className="form-floating p-3">
                         <div className='d-flex align-items-center justify-content-evenly'>
                              <label htmlFor="floatingPassword">Documento</label>
                              <input type="number" name='documento' className="form-control mx-2" id="id_user_delete" placeholder="Documento" />
                         </div>
                         <div className='mt-2 d-flex justify-content-center'>
                              <button type='button' className='btn btn-primary' onClick={() => { eliminarUsuario() }}>Eliminar</button>
                         </div>
                    </form>
               </div>

               <div id='actualizarUsuarioForm' name="forms" className='container col-10 mt-5' hidden>
                    <div id='buscarUsuarioForm' name="forms" className='container col-8 mt-5 border shadow bg-light'>
                         <form className="form-floating p-3">
                              <div className='d-flex align-items-center justify-content-evenly'>
                                   <label htmlFor="floatingPassword">Documento</label>
                                   <input type="number" name='documento' className="form-control mx-2" id="buscar_cedula" placeholder="Documento" />
                              </div>
                              <div className='mt-2 d-flex justify-content-center'>
                                   <button type='button' className='btn btn-primary' onClick={() => { buscarUsuario() }}>Buscar</button>
                              </div>
                         </form>
                    </div>
                    <form id='actualizarUsuario' className='gap-1' hidden>
                         <div className='row gap-1'>
                              <div className="form-floating col-5 ">
                                   <input type="text" name='nombre' value={upUser.nombre} onChange={handleChangeUpUser} className="form-control" id="floatingInput" placeholder="Nombre" required />
                                   <label htmlFor="floatingInput">Nombre</label>
                              </div>
                              <div className="form-floating col-5">
                                   <input type="text" name='apellido' value={upUser.apellido} onChange={handleChangeUpUser} className="form-control" id="floatingPassword" placeholder="Apellido" />
                                   <label htmlFor="floatingPassword">Apellido</label>
                              </div>

                         </div>
                         <div className='row gap-1 mt-2'>
                              <select className="form-floating p-0 col-5" name='tipoDocumento' value={upUser.tipoDocumento} onChange={handleChangeUpUser}>
                                   <option defaultValue={""} hidden value="">Tipo Documento</option>
                                   <option value="C.C">C.C</option>
                                   <option value="T.I">T.I</option>
                              </select>
                              <div className="form-floating col-5">
                                   <input readOnly type="number" name='documento' value={upUser.documento} className="form-control" id="floatingPassword" onChange={handleChangeUpUser} placeholder="Documento" />
                                   <label >Documento</label>
                              </div>
                         </div>
                         <div className='d-flex justify-content-center mt-2'>
                              <button type='button' className='btn btn-primary' onClick={() => { actualizarUsuario() }}>Actualizar</button>
                         </div>
                    </form>
               </div>
          </div>
     );
}

export default Crud_Opcion;