import * as d3 from "d3";
import { useEffect, useState } from "react";
import Bar from './components/graphs/Bar';
 
import csvData from "./data/clean/full.csv";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv(csvData).then(rawData => {
      setData(rawData);
    })
  }, [])

  return data.length > 0 ? (
    <div className="App">
      <Bar
      x={data.map(d => new Date(d.DATE))}
      y={data.map(d => parseInt(d.DURATION) / 60)}
      title="Test"
      />
    </div>
  ) : (
    <div className="App">
       Loading
    </div>
  );
}

export default App;
