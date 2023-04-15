import * as d3 from "d3";
import { useEffect, useState } from "react";
import Bar from './components/graphs/Bar';
import Line from './components/graphs/Line';

import csvData from "./data/clean/full.csv";

function App() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [totalWeekDurationData, setTotalWeekDurationData] = useState({});
  const [totalWeekCountData, setTotalWeekCountData] = useState({});

  useEffect(() => {
    d3.csv(csvData).then(rawData => {
      setData(rawData);

      let dateDuration = {}
      let dateCount = {}

      rawData.forEach((d) => {
        if (d.DATE in dateDuration){
          dateDuration[d.DATE] += parseInt(d.DURATION);
        } else {
          dateDuration[d.DATE] = parseInt(d.DURATION);
        }
        if (d.DATE in dateCount){
          dateCount[d.DATE]++;
        } else {
          dateCount[d.DATE] = 1;
        }
      })

      setTotalWeekDurationData(dateDuration);
      setTotalWeekCountData(dateCount);
      setLoad(true);
    })
  }, [])

  return load ? (
    <div className="App">
      <Line
      x={Object.entries(totalWeekCountData).map(d => d[0])}
      y={Object.entries(totalWeekCountData).map(d => d[1])}
      title="Number of Tutoring Sessions per Day"
      />
      <Line
      x={Object.entries(totalWeekDurationData).map(d => d[0])}
      y={Object.entries(totalWeekDurationData).map(d => parseInt(d[1]) / 60)}
      title="Duration of Tutoring Sessions per Day (Hours)"
      />
    </div>
  ) : (
    <div className="App">
       Loading
    </div>
  );
}

export default App;
