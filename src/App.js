import * as d3 from "d3";
import { useEffect, useState } from "react";

// COMPONENTS
import Filter from "./components/Filter";
import Bar from './components/graphs/Bar';
import Line from './components/graphs/Line';
import Summary from './components/graphs/Summary';

// UTILS functions
import sortObjects from "./utils/sortObject";
import getMedian from "./utils/getMedian";
import aggregateColumn from "./utils/aggregateColumn";
import translateTopic from "./utils/translateTopic";

// Data
import csvData from "./data/clean/full.csv";

import style from "./app.module.css";


function App() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);

  const [currBootcamp, setCurrBootcamp] = useState("ALL");
  const [allBootcamps, setAllBootcamps] = useState(["ALL"]);

  const [currTopic, setCurrTopic] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [filteredTopicCount, setFilteredTopicCount] = useState({});

  const [totalWeekDurationData, setTotalWeekDurationData] = useState({});
  const [totalWeekCountData, setTotalWeekCountData] = useState({});
  const [bootcampCountData, setBootcampCountData] = useState([])
  const [countStudents, setCountSudents] = useState([]);

  const calculateData = (rawData) => {
    let dateDuration = aggregateColumn(rawData, "DATE", "sum", "DURATION");
    let dateCount = aggregateColumn(rawData, "DATE", "count");
    let bootcampCount = aggregateColumn(rawData, "BOOTCAMP", "count");
    let topicCount = aggregateColumn(rawData, "TOPIC", "count");
    let studentCount = aggregateColumn(rawData, "ID", "count");

    setTotalWeekDurationData(sortObjects(dateDuration));
    setTotalWeekCountData(sortObjects(dateCount));
    setBootcampCountData(bootcampCount);
    setAllTopics([...Object.keys(topicCount)]);
    setFilteredTopicCount(topicCount);
    setCountSudents(studentCount);

    if (!load) {
      // If this is the initial calculate data, we set the bootcamps for
      // the dropdown.
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

        if (filteredData.length == 0) {
          alert("No data found for filter; resetting filters");
          setCurrTopic([]);
          setCurrBootcamp("ALL");
          filteredData = data;
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

      // It could be that 
      if (currTopic.length == 0) {
        calculateData(currData);
      } else {
        let filteredData = currData.filter(d => currTopic.indexOf(d.TOPIC) != -1);
        console.log(filteredData)
        if (filteredData.length == 0) {
          alert("No data found for filter; resetting filters");
          setCurrTopic([]);
          setCurrBootcamp("ALL");
          calculateData(data);
        }
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
      
      <div className={style.dashTopRow}>
        <div className={style.summaryContainer}>
          <Summary
          bootcamp={currBootcamp}
          totalStudents={Object.keys(countStudents).length}
          totalSessions={Object.values(countStudents).reduce((a,b) => a+b, 0)}
          medianDuration={getMedian(Object.values(totalWeekDurationData))}
          medianStudent={getMedian(Object.values(countStudents))}
          maxStudent={Math.max(...Object.values(countStudents))}
          maxDuration={Math.max(...Object.values(totalWeekDurationData))}
          />
        </div>
        
        <div className={style.barChart}>
          <Bar
          x={Object.keys(filteredTopicCount).map((t) => translateTopic(t))}
          y={Object.values(filteredTopicCount)}
          title="Number of Sessions Held Per Topic"
          />
        </div>
      </div>
      <div style={{width: "100%", textAlign: "center"}}>
        <Line
        x={Object.entries(totalWeekCountData).map(d => d[0])}
        y={Object.entries(totalWeekCountData).map(d => d[1])}
        title="Number of Tutoring Sessions per Day"
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
