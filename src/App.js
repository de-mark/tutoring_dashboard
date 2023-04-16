import * as d3 from "d3";
import { useEffect, useState } from "react";

import Filter from "./components/Filter";

import Bar from './components/graphs/Bar';
import Line from './components/graphs/Line';
import Pie from "./components/graphs/Pie";
import Summary from './components/graphs/Summary';


import csvData from "./data/clean/full.csv";
import sortObjects from "./utils/sortObject";
import aggregateColumn from "./utils/aggregateColumn";

function App() {
  const [load, setLoad] = useState(false);
  
  const [currBootcamp, setCurrBootcamp] = useState("ALL");
  const [allBootcamps, setAllBootcamps] = useState(["ALL"]);

  const [currTopic, setCurrTopic] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [filteredTopicCount, setFilteredTopicCount] = useState({});

  const [data, setData] = useState([]);

  const [totalWeekDurationData, setTotalWeekDurationData] = useState({});
  const [totalWeekCountData, setTotalWeekCountData] = useState({});
  const [bootcampCountData, setBootcampCountData] = useState([])

  const calculateData = (rawData) => {
    let dateDuration = aggregateColumn(rawData, "DATE", "sum", "DURATION");
    let dateCount = aggregateColumn(rawData, "DATE", "count");
    let bootcampCount = aggregateColumn(rawData, "BOOTCAMP", "count");
    let topicCount = aggregateColumn(rawData, "TOPIC", "count");

    setTotalWeekDurationData(sortObjects(dateDuration));
    setTotalWeekCountData(sortObjects(dateCount));
    setBootcampCountData(bootcampCount);
    setAllTopics([...Object.keys(topicCount)]);
    setFilteredTopicCount(topicCount);

    if (!load) {
      setAllBootcamps([...allBootcamps, ...Object.keys(bootcampCount)]);
    }
  }

  // Loads in data upon initial component load
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

  // Re-filters data every time the user selects a different bootcamp
  // Resets the topic when user changes bootcamp back to all
  useEffect(() => {
    if (load) {
      if (currBootcamp == "ALL") {
        setCurrTopic([]);
        calculateData(data);
      } else {
        let filteredData = data.filter(d => d.BOOTCAMP == currBootcamp);
        
        // If there is a topic filter, we need to include that as well
        if (currTopic.length != 0) {
          filteredData = filteredData.filter(d => currTopic.indexOf(d.TOPIC) != -1);
        }

        calculateData(filteredData)
      }
    }
  }, [currBootcamp])

  // Refilters the data when a new selection of topics is submitted
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
        calculateData(filteredData);
      }
    }
  }, [currTopic]);


  return load ? (
    <div className="App">
      <Filter
      currBootcamp={currBootcamp}
      allBootcamps={allBootcamps}
      setCurrBootcamp={setCurrBootcamp} 
      currTopic={currTopic} 
      allTopics={allTopics} 
      setCurrTopic={setCurrTopic}
      />
      
      <div style={{marginTop: "50px"}}>
        <Summary
        />
        <Line
        x={Object.entries(totalWeekCountData).map(d => d[0])}
        y={Object.entries(totalWeekCountData).map(d => d[1])}
        title="Number of Tutoring Sessions per Day"
        />
        {/* <Pie
        x={Object.entries(bootcampCountData).map(d => d[0])}
        y={Object.entries(bootcampCountData).map(d => parseInt(d[1]) / 60)}
        title="Number of Sessions per bootcamp"
        /> */}
      </div>
      <div>
        <Bar
        x={Object.keys(filteredTopicCount)}
        y={Object.values(filteredTopicCount)}
        title="Number of Sessions Held Per Topic"
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
