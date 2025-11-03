import './App.css';

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