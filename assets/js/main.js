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

            buildPage();
        })
    })
}

const buildPage = () => {
    console.log(sessions);
    console.log(students);
}

gatherData();