import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import * as authService from '../../auth/auth.service'
import LensIcon from '@mui/icons-material/Lens';
import { alert_error } from "../../util/functions";

const Opcion = ({ opcion }) => {
     const navigate = useNavigate();

     return (
          <ListItemButton onClick={() => { navigate('/home/opcion/'+opcion.id) }}>
               <ListItemIcon>
                    <LensIcon />
               </ListItemIcon>
               <ListItemText primary={opcion.nombre} />
          </ListItemButton>
     );
}

export default function MenuList() {
     const [usuario, setUsuario] = React.useState({nombreUser:""});
     // const [empresa, setEmpresa] = React.useState({nombreEmpresa:""});
     const [opciones, setOpciones] = React.useState([]);
     const { id } = useParams();
     const emp="";
     const getOpcionesEmpresa = async () => {
          try {
               
              
               authService.getUser().then(value=>{
                    setUsuario(value);
               });
               const response = await authService.getOpciones(id);
               response.json().then(value=>{
                    if (parseInt(response.status)!==200) {
                         alert_error("Error!",value.mensaje);
                    }else{
                         setOpciones(value);
                    }
               });
          } catch (error) {
               console.log(error);
          }
     }

     React.useEffect(() => {
          getOpcionesEmpresa();
     }, []);

     return (
          <React.Fragment>
               <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                         <ListItemAvatar>
                              <Avatar src="/img/user-solid.svg"/>
                         </ListItemAvatar>
                         <ListItemText
                              primary={usuario.nombre}
                              secondary={
                                   <React.Fragment>
                                        <Typography
                                             sx={{ display: 'inline' }}
                                             component="span"
                                             variant="body2"
                                             color="text.primary"
                                        >
                                             Logueado
                                        </Typography>
                                   </React.Fragment>
                              }
                         />
                    </ListItem>
                    <hr />    
                    <ListItem alignItems="flex-start">
                         <ListItemText
                              primary={<b>Empresa: { sessionStorage.getItem("empresa")}</b>}
                         />
                    </ListItem>
                    <hr />
                    <div>
                         {
                              (()=>{
                                   if(opciones===undefined && opciones.length===0 && opciones==="undefined"){
                                        return (<div>No hay Funcionalidades</div>)
                                   }else{
                                        return(
                                             opciones.map((opcion) => (
                                                  <Opcion key={opcion.id} opcion={opcion} />
                                             ))
                                        )
                                   }
                              })()
                         }
                    </div>
               </List>
          </React.Fragment>
     );
}