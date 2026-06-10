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

export default function App() {
  const [etapa, setEtapa] = useState("idade"); // "idade" | "nao" | "app"
  const [pagina, setPagina] = useState("inicio");
 
  if (etapa === "idade") return <SimOuNao onSim={() => setEtapa("app")} onNao={() => setEtapa("nao")} />;
  if (etapa === "nao") return <NaoPage onVoltar={() => setEtapa("idade")} />;
 
  const paginasProtegidas = ["cervejas", "clientes", "pedidos", "relatorio"];
 
  const renderPagina = () => {
    if (paginasProtegidas.includes(pagina)) {
      return (
        <RotaProtegida setPagina={setPagina}>
          {pagina === "cervejas" && <CrudCervejas />}
          {pagina === "clientes" && <CrudClientes />}
          {pagina === "pedidos" && <CrudPedidos />}
          {pagina === "relatorio" && <Relatorio />}
        </RotaProtegida>
      );
    }
    if (pagina === "login") return <Login onLogin={() => setPagina("inicio")} />;
    if (pagina === "sobre") return <Sobre />;
    if (pagina === "contatos") return <Contatos />;
    return <Inicio setPagina={setPagina} />;
  };
 
  return (
    <AuthProvider>
      <Layout pagina={pagina} setPagina={setPagina}>
        {renderPagina()}
      </Layout>
    </AuthProvider>
  );
}