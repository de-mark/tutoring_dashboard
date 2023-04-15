import * as d3 from "d3";
import { useEffect, useState } from "react";

import Dropdown from "./components/Dropdown";

import Bar from './components/graphs/Bar';
import Line from './components/graphs/Line';
import Pie from "./components/graphs/Pie";


import csvData from "./data/clean/full.csv";

function App() {
  const [load, setLoad] = useState(false);
  
  const [currBootcamp, setCurrBootcamp] = useState("ALL");
  const [allBootcamps, setAllBootcamps] = useState(["ALL"]);

  const [data, setData] = useState([]);

  const [totalWeekDurationData, setTotalWeekDurationData] = useState({});
  const [totalWeekCountData, setTotalWeekCountData] = useState({});
  const [bootcampCountData, setBootcampCountData] = useState([])

  const sortDictionary = (dict) => {
    let keys = Object.keys(dict).sort((a, b) => {
      let aDate = new Date(a), bDate = new Date(b);
      
      if (aDate < bDate) {
        return -1;
      } else if (aDate > bDate) {
        return +1;
      } else {
        return 0;
      }
    });

    var res = {};

    for (let i = 0; i < keys.length; i++){
      res[keys[i]] = dict[keys[i]];
      delete dict[keys[i]];
    }

    for (let i = 0; i < keys.length; i++) {
      dict[keys[i]] = res[keys[i]];
    }

    return dict;
  }

  const calculateData = (rawData) => {
    let dateDuration = {}
    let dateCount = {}
    let bootcampCount = {}

    console.log(rawData)

    rawData.forEach((d) => {
      let convertedDate = `${d.DATE.getFullYear()}-${d.DATE.getMonth() + 1}-${d.DATE.getDate()}`
      if (convertedDate in dateDuration){
        dateDuration[convertedDate] += parseInt(d.DURATION);
      } else {
        dateDuration[convertedDate] = parseInt(d.DURATION);
      }
      if (convertedDate in dateCount){
        dateCount[convertedDate]++;
      } else {
        dateCount[convertedDate] = 1;
      }
      if (d.BOOTCAMP in bootcampCount) {
        bootcampCount[d.BOOTCAMP]++;
      } else {
        bootcampCount[d.BOOTCAMP] = 1;
      }
    })

    setTotalWeekDurationData(sortDictionary(dateDuration));
    setTotalWeekCountData(sortDictionary(dateCount));
    setBootcampCountData(bootcampCount);
    if (!load) {
      setAllBootcamps([...allBootcamps, ...Object.keys(bootcampCount)]);
    }
  }

  useEffect(() => {
    d3.csv(csvData).then(rawData => {
      let parsedData = rawData.map(d => {
        d.START = new Date(d.START);
        d.END = new Date(d.END);
        d.DATE = new Date(d.DATE);
        return d;
      })
      setData(parsedData);
      calculateData(parsedData);
      setLoad(true);
    })
  }, []);

  useEffect(() => {
    if (load) {
      if (currBootcamp == "ALL") {
        calculateData(data);
      } else {
        let filteredData = data.filter(d => d.BOOTCAMP == currBootcamp);
        calculateData(filteredData)
      }
    }
  }, [currBootcamp])

  return load ? (
    <div className="App">
      <Dropdown
      selected={currBootcamp}
      options={allBootcamps}
      setValue={setCurrBootcamp}
      />

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
