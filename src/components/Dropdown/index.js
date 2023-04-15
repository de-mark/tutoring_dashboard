import {useState} from "react";
import style from "./dropdown.module.css";

const Dropdown = ({selected, options, setValue}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    const selectOption = (option) => {
        setValue(option);
        setIsOpen(false);
    }

    return (
        <div>
            <div onClick={toggleOpen}>
                {selected}
            </div>
            <div className={isOpen ? style.open : style.closed}>
                {options.map((o, idx) => {
                    return (
                        <p onClick={(e) => selectOption(o)}>
                            {o}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default Dropdown;