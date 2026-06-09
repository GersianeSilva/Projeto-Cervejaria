import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import useLocalCollection from "./hooks/useLocalCollection";
import { AuthProvider, useAuth } from "./context/AuthContext";
import CrudCervejas from "./crud/CrudCervejas";
import TabelaLista from './components/TabelaLista';
import CrudClientes from './crud/CrudClientes';
import CrudPedidos from './crud/CrudPedidos';
import Relatorio from './crud/Relatorio';

function App() {
  return (
    <AppRoutes />
  );
}

export default App;
 