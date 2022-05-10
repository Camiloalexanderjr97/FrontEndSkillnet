import Login from '../views/Login';
import Dashboard from '../components/home/Dashboard';
import Crud_Opcion from '../components/empresa/CrudOpcion';

const routes = {
     private: [
          {
               path: "/home/:id",
               name: "home",
               element: <Dashboard />
          },
          {
               path: "/home/opcion/:id",
               name: "opcion",
               element: <Dashboard contenedor={<Crud_Opcion/>}/>
          },
     ],
     public: [
          {
               path: "/",
               name: "login",
               element: <Login/>
          },
     ]
}

export default routes