const Summary = ({ bootcamp, totalStudents, totalSessions }) => {
    return (
        <div>
            <p><b>{bootcamp.replace("_", " ")}</b> Bootcamp{bootcamp == "ALL" ? "s" : ""}</p>
            <p><b>Total Students</b> {totalStudents.toLocaleString()}</p>
            <p><b>Total Sessions</b> {totalSessions.toLocaleString()}</p>
            <p>Median Sessions per Week</p>
            <p>Median Sessions per Student</p>
            
        </div>
    )
}

export default Summary;