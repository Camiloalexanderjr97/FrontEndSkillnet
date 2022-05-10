import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import Empresas from '../components/empresa/ListaEmpresas';
import * as authService from '../auth/auth.service';
import { alert_error, alert_login } from '../util/functions';

const Login = () => {
     const navigate = useNavigate();

     const valores_iniciales = {
          id:"",
          username: "",
          password: "",
          token: "",
     }

     const [usuario, setUsuario] = React.useState(valores_iniciales);

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               authService.sign_in(usuario).then(response=>{
                    response.json().then(value=>{
                         if (parseInt(response.status)!==200) {
                              alert_error('Error',"Usuario Incorrecto!");
                         } else {
                              authService.userConected(value).then(() => {
                                   
                              });
                              setUsuario({
                                   id: usuario.id,
                                   username: usuario.username,
                                   password: usuario.password,
                                   token: String(value.token).trim(),
                              });
                         }
                    });
               });  
          } catch (error) {
               console.log(error);
          }
     };

     const handleInputChange = (e) => {
          setUsuario({ ...usuario, [e.target.name]: e.target.value });
     };

     useEffect(()=>{

     },[])

     return (
          <div className="outer">
               <div className="inner">
                    <form className='' onSubmit={handleSubmit}>
                         <h3>Sign In</h3>
                         <div className="mt-4 form-group">
                              <label>Usuario</label>
                              <input type="text" className="form-control" placeholder="Enter username" name='username' value={usuario.username} onChange={handleInputChange}/>
                         </div>
                         <div className="mt-4 form-group">
                              <label>Password</label>
                              <input type="password" className="form-control" placeholder="Enter password"  name='password' value={usuario.password} onChange={handleInputChange}/>
                         </div>
                         <div className='mt-4 form-group d-flex justify-content-center'>
                              <button type="submit" className="mt-3 btn btn-primary btn-md btn-block">Login</button>
                         </div>
                    </form>
                    <div className='d-flex justify-content-center mt-3'>
                         {
                              (()=>{
                                   if(usuario.token!==undefined && usuario.token!=="undefined" && usuario.token!==""){
                                        return (
                                             <Empresas/>
                                        )
                                   }
                              })()
                         }
                    </div>
               </div>
          </div>
     );
};

export default Login;
