import './App.css';
import CompanyPage from './pages/company/CompanyPage';
const companyData = {
  "name": "SAGA tours",
  "logo": "https://scontent.fcvj4-1.fna.fbcdn.net/v/t39.30808-6/299531721_448408783969643_6496318911427299948_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHpLWPBiodI7mI9Z6RB6WvN2U6dJU5wZxnZTp0lTnBnGTFV-BkAPVyEoTQJNPIGyWU68wNV3p6a1m_OTUaJy8P_&_nc_ohc=Z1GH3NNB_EYQ7kNvgEw04ZU&_nc_oc=AdhwBDcL6yhja_b1bnUR6IWr4vtEi-dVersUQTRZDpeFjsLRXCDungdIbiLuqq99jcJfn7EDvN-t6Xt2P-uAsiNK&_nc_zt=23&_nc_ht=scontent.fcvj4-1.fna&_nc_gid=A7ZVHPffxxRXmZxElKn1PVb&oh=00_AYA_cgMgIFuO3-xKZ8gNQCyFr_rufn_Er5rGLMi-ffODLw&oe=67B35AD8",
  "slogan": "Más que viajar, es una experiencia",
  "description": ` SAGA es una empresa líder en el sector turístico mexicano, especializada en crear experiencias únicas e inolvidables a través de excursiones, tours y actividades diversas que abarcan toda la riqueza cultural y natural de la República Mexicana.
Desde las místicas ruinas mayas de la península de Yucatán hasta los majestuosos paisajes desérticos del norte, pasando por las playas paradisíacas del Pacífico y el Caribe, ofrecemos una amplia gama de aventuras diseñadas para todos los gustos y presupuestos.
Nuestros servicios incluyen: <br />
- Tours culturales por ciudades coloniales y pueblos mágicos <br /> 
- Excursiones a zonas arqueológicas y sitios históricos <br />      
- Aventuras ecoturísticas en reservas naturales <br />
- Experiencias gastronómicas regionales <br />
- Actividades deportivas y de aventura <br />
- Recorridos fotográficos por paisajes únicos <br />
- Paquetes personalizados para grupos y eventos especiales <br />`,
  "fb": "https://facebook.com/saga",
  "ig": "https://ig.com/saga",
  "tt": "https://tiktok.com/saga",
  "whatsapp": "7775443825"
}
function App() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      aaaa
    </div>
  );
}

export default App;

/*

const [buses, setBuses] = useState<Bus[]>([]);

  const getBusesFromAPI = async () => {
    const buses = await getBuses();
    setBuses(buses);
  };

  useEffect(() => {
    getBusesFromAPI();
  }, []);

  return (
    <div className="App">
        <h1>Saga App</h1>
        <BusForm onSubmit={getBusesFromAPI} />

      {buses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rows</th>
              <th>Columns</th>
              <th>Seats per column</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.name}</td>
                <td>{bus.rows}</td>
                <td>{bus.columns}</td>
                <td>{bus.seatsPerColumn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No buses found</p>
      )}
    </div>
  );
*/