import {useState} from "react";

import style from "./dropdown.module.css";
import magnifyingGlassImage from "../../imgs/magnifying_glass_icon.svg";

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
        <div className={style.container}>
            <div className={style.top} onClick={toggleOpen}>
                <div>
                    {selected}
                </div>
                <div className={isOpen ? "" : style.arrow}>
                    {isOpen ? "" : <img src={magnifyingGlassImage}/>}
                </div>
            </div>
            <div className={isOpen ? style.open : style.closed}>
                <hr/>
                {options.map((o, idx) => {
                    return (
                        <p key={idx} onClick={(e) => selectOption(o)}>
                            {o}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default Dropdown;