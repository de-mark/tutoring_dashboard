import style from './summary.module.css';

const Summary = ({ bootcamp, totalStudents, totalSessions }) => {
    return (
        <div className={style.container}>
            <h3><b>{bootcamp.replace("_", " ")}</b> Bootcamp{bootcamp == "ALL" ? "s" : ""}</h3>
            <p><b>Total Students</b> {totalStudents.toLocaleString()}</p>
            <p><b>Total Sessions</b> {totalSessions.toLocaleString()}</p>
            <p>Median Sessions per Week</p>
            <p>Median Sessions per Student</p>
            
        </div>
    )
}

export default Summary;