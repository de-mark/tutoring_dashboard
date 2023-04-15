import {useState} from "react";

import Checkbox from "./Checkbox";

import style from './multiselect.module.css';

const Multiselect = ({selected, options, setValue}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    const selectOption = (option) => {
        if (selected.indexOf(option) == -1){
            setValue([...selected, option]);
            setIsOpen(false);
        } else {
            setValue(selected.filter(s => s != option));
            setIsOpen(false);
        }
    }

    const clearSelect = () => {
        setValue([]);
        setIsOpen(false);
    }

    return (
        <div className={style.container}>
            <div className={style.top} onClick={toggleOpen}>
                <div>
                    {selected.length >= 1 ? selected.map((s, idx) => idx != selected.length - 1 ? 
                                                        `${s.replace("_", " ")}, ` : `${s.replace("_", " ")}`) :"ALL"
                    }
                </div>
                <div className={isOpen ? "" : style.arrow}>
                    {isOpen ? "" : "⮟"}
                </div>
            </div>
            <div className={isOpen ? style.open : style.closed}>
                <Checkbox
                selected={selected.length < 1}
                label={"ALL"} 
                setValue={clearSelect}
                />

                {options.map((o, idx) => {
                    return (
                        <Checkbox
                        key={idx}
                        selected={selected.indexOf(o) != -1}
                        label={o} 
                        setValue={(e) => selectOption(o)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Multiselect;