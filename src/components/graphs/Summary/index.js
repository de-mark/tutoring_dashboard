import style from './summary.module.css';

const Summary = ({ bootcamp, totalStudents, totalSessions, 
    medianDuration, medianStudent, maxStudent, maxDuration }) => {
    const getHoursMins = (mins) => {
        return {
            hours: Math.floor(mins / 60),
            minutes:mins % 60 
        }
    }
    
    // Time is measured in minutes, so we just have to translate into hours for both
    let {hours:medianHours, minutes:medianMinutes} = getHoursMins(medianDuration);
    let {hours:maxHours, minutes:maxMinutes} = getHoursMins(maxDuration);

    return (
        <div className={style.container}>
            <h3><b>{bootcamp.replace("_", " ")}</b> Bootcamp{bootcamp == "ALL" ? "s" : ""}</h3>
            <p><b>Total Students</b> {totalStudents.toLocaleString()}</p>
            <p><b>Total Sessions</b> {totalSessions.toLocaleString()}</p>
            <p><b>Median Time (Per Day):</b> {medianHours} h. {medianMinutes} min.</p>
            <p><b>Median Sessions (Per Student):</b> {medianStudent}</p>
            <p><b>Max Sessions (Per Student):</b> {maxStudent}</p>
            <p><b>Max Amount Tutored:</b> {maxHours} h. {maxMinutes} min.</p>
        </div>
    )
}

export default Summary;