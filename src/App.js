import * as d3 from "d3";
import { useEffect, useState } from "react";

import Dropdown from "./components/Dropdown";
import Multiselect from "./components/Multiselect";

import Bar from './components/graphs/Bar';
import Line from './components/graphs/Line';
import Pie from "./components/graphs/Pie";


import csvData from "./data/clean/full.csv";
import sortObjects from "./utils/sortObject";

function App() {
  const [load, setLoad] = useState(false);
  
  const [currBootcamp, setCurrBootcamp] = useState("ALL");
  const [allBootcamps, setAllBootcamps] = useState(["ALL"]);

  const [currTopic, setCurrTopic] = useState([]);
  const [allTopics, setAllTopics] = useState([]);

  const [data, setData] = useState([]);

  const [totalWeekDurationData, setTotalWeekDurationData] = useState({});
  const [totalWeekCountData, setTotalWeekCountData] = useState({});
  const [bootcampCountData, setBootcampCountData] = useState([])

  const calculateData = (rawData) => {
    let dateDuration = {}
    let dateCount = {}
    let bootcampCount = {}
    let topicCount = {}

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
      if (d.TOPIC in topicCount){
        topicCount[d.TOPIC]++;
      } else {
        topicCount[d.TOPIC] = 1;
      }
    })

    setTotalWeekDurationData(sortObjects(dateDuration));
    setTotalWeekCountData(sortObjects(dateCount));
    setBootcampCountData(bootcampCount);
    setAllTopics([...Object.keys(topicCount)])

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
        setCurrTopic([]);
        calculateData(data);
      } else {
        let filteredData = data.filter(d => d.BOOTCAMP == currBootcamp);
        calculateData(filteredData)
      }
    }
  }, [currBootcamp])

  useEffect(() => {
    if (load){
      let currData;
      if (currBootcamp == "ALL") {
        currData = data;
      } else {
        currData = data.filter(d => d.BOOTCAMP == currBootcamp);
      }

      if (currTopic.length == 0) {
        calculateData(currData);
      } else {
        let filteredData = currData.filter(d => currTopic.indexOf(d.TOPIC) != -1);
        // currTopic.forEach((topic) => {
        //   filteredData = filteredData.filter(d => d.TOPIC == topic);
        // });
        calculateData(filteredData);
      }
    }
  }, [currTopic]);

  return load ? (
    <div className="App">
      <div style={{display: "flex", justifyContent: "space-evenly", alignContent: "center"}}>
        <div style={{width: "30%"}}>
          <h4>Bootcamp</h4>
          <Dropdown
          selected={currBootcamp}
          options={allBootcamps}
          setValue={setCurrBootcamp}
          />
        </div>
        <div style={{width: "30%"}}>
          <h4>Topic</h4>
          <Multiselect
          selected={currTopic} 
          options={allTopics}
          setValue={setCurrTopic}
          />
        </div>
      </div>
      
      <div style={{marginTop: "50px"}}>
        <div>
          
        </div>
        <Line
        x={Object.entries(totalWeekCountData).map(d => d[0])}
        y={Object.entries(totalWeekCountData).map(d => d[1])}
        title="Number of Tutoring Sessions per Day"
        />
        <Pie
        x={Object.entries(bootcampCountData).map(d => d[0])}
        y={Object.entries(bootcampCountData).map(d => parseInt(d[1]) / 60)}
        title="Number of Sessions per bootcamp"
        />
      </div>
    </div>
  ) : (
    <div className="App">
       Loading
    </div>
  );
}

export default App;
