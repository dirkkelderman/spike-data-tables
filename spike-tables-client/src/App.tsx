import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Spike Data Tables</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to="/ag-grid">AG Grid</Link>
        <Link to="/ag-grid-server">AG Grid Server</Link>
        <Link to="/mui-data-table">MUI Data Table</Link>
        <Link to="/ka-table">KA Table</Link>
        <Link to="/handsontable">Handsontable</Link>
      </div>
    </div>
  );
}

export default App;
