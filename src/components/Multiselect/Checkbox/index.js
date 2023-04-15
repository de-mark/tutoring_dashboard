import style from "./checkbox.module.css";

const Checkbox = ({selected, label, setValue}) => {
    return (
        <div className={style.container} onClick={setValue}>
            <p className={selected ? style.checked : style.empty}></p>
            <p>{label}</p>
        </div>
    )


}

export default Checkbox;