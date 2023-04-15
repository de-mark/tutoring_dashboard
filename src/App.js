import * as d3 from "d3";
import { useEffect, useState } from "react";
import Bar from './components/graphs/Bar';
import Line from './components/graphs/Line';
import Pie from "./components/graphs/Pie";

import csvData from "./data/clean/full.csv";

function App() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [totalWeekDurationData, setTotalWeekDurationData] = useState({});
  const [totalWeekCountData, setTotalWeekCountData] = useState({});
  const [bootcampCountData, setBootcampCountData] = useState([])

  useEffect(() => {
    d3.csv(csvData).then(rawData => {
      setData(rawData);

      let dateDuration = {}
      let dateCount = {}
      let bootcampCount = {}

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
        if (d.BOOTCAMP in bootcampCount) {
          bootcampCount[d.BOOTCAMP]++;
        } else {
          bootcampCount[d.BOOTCAMP] = 1;
        }
      })

      setTotalWeekDurationData(dateDuration);
      setTotalWeekCountData(dateCount);
      setBootcampCountData(bootcampCount);
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
      <Pie
      x={Object.entries(bootcampCountData).map(d => d[0])}
      y={Object.entries(bootcampCountData).map(d => parseInt(d[1]) / 60)}
      title="Number of Sessions per bootcamp"
      />
    </div>
  ) : (
    <div className="App">
       Loading
    </div>
  );
}

export default App;
