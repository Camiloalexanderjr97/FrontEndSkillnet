import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../auth/auth.service';
import { alert_error } from '../../util/functions';

const Empresas = ({id}) => {
     /*const valores_iniciales = [
          {
               id: 1,
               nombre: 'Cocacola',
               funcionalidades: [
                    {
                         id: 1,
                         nombre: "Opcion Funcional 1",
                    },
                    {
                         id: 2,
                         nombre: "Opcion Funcional 2",
                    },
                    {
                         id: 3,
                         nombre: "Opcion Funcional 3",
                    }
               ]
          },
          {
               id: 2,
               nombre: 'Pepsi',
          },
     ]*/

     const navigate = useNavigate();
     const [empresas, setEmpresas] = useState([]);

     async function listarEmpresas(){
          try {
               authService.getUser().then(value=>{
                    authService.getEmpresas(value.id).then(response=>{
                         response.json().then(value=>{
                              if(parseInt(response.status)!==200){
                                   alert_error("Error!", value.mensaje);
                                   setTimeout(()=>{window.location.reload()},1500)
                              }else{
                                   setEmpresas(value);
                              }
                         });
                    });
               })
          } catch (error) {
               console.log(error);
          }
     }

     useEffect(() => {
          listarEmpresas();
     }, []);

     return (
          <div>
               {
                    (() => {
                         if (empresas.length === 0) {
                              return (<p>No hay empresas.</p>)
                         } else {
                              return (
                                   <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                             Empresas
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                             {
                                                  empresas.map((empresa) => (
                                                       <li key={empresa.id}><button className="dropdown-item" type='button' key={empresa.id} onClick={() => {
                                                             navigate("/home/" + empresa.id) 
                                                             sessionStorage.setItem("empresa",empresa.nombre);
                                                            }}>{empresa.nombre}</button></li>
                                                  ))
                                             }
                                        </ul>
                                   </div>
                              )
                         }
                    })()
               }
          </div>
     );
}

export default Empresas;