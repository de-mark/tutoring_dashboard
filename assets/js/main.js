var sessions, students;

const gatherData = () => {
    d3.csv("./assets/data/clean/sessions.csv").then(sessionData => {
        sessions = sessionData.map(d => {
            return {
                date: new Date(d.DATE),
                id: d.ID,
                start: new Date(d.START),
                end: new Date(d.END),
                topic: d.TOPIC
            }
        });
    
        d3.csv("./assets/data/clean/students.csv").then(studentData => {
            students = studentData.map(s => {
                return {
                    id: s.ID,
                    bootcamp: s.BOOTCAMP,
                    timezone: s.TIMEZONE
                }
            });

            buildPage(sessions, students);
        })
    })
}

const buildPage = (sessions, students) => {

    document.getElementById("totalSessions").innerHTML = sessions.length;

    var studentsPerBootcamp = [
        students.filter(s => s.bootcamp == "DATA").length,
        students.filter(s => s.bootcamp != "DATA").length
    ]
    
    var studentsPerBootcamp_data = [{
        values: studentsPerBootcamp,
        labels: ["Data", "Full-Stack"],
        hoverinfo: 'label+percent',
        type: 'pie'
      }];
      
    var studentsPerBootcamp_layout = {
        title: "Students Per Bootcamp"
    };

    var plotlyResponsive = {responsive: true}
      
    Plotly.newPlot('studentsPie', studentsPerBootcamp_data, studentsPerBootcamp_layout, plotlyResponsive);

    
    
}

gatherData();