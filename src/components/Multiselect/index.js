import {useState} from "react";

import Checkbox from "./Checkbox";
import translateTopic from "../../utils/translateTopic";
import magnifyingGlassImage from "../../imgs/magnifying_glass_icon.svg";
import cancelImage from "../../imgs/cancel.svg";

import style from './multiselect.module.css';

const Multiselect = ({selected, options, setValue}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localSelected, setLocalSelected] = useState([]);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    const selectOption = (option) => {
        if (localSelected.indexOf(option) == -1){
            setLocalSelected(localSelected.length > 0 ? [...localSelected, option] : [option]);
        } else {
            setLocalSelected(localSelected.filter(s => s != option));
        }
    }

    const clearSelect = () => {
        setValue([]);
        setLocalSelected([]);
        setIsOpen(false);
    }

    const submitSelected = () => {
        setValue(localSelected);
        setIsOpen(false);
    }

    return (
        <div className={style.container}>
            <div className={style.top} onClick={toggleOpen}>
                <div>
                    {selected.length >= 1 ? selected.map((s, idx) => idx != selected.length - 1 ? 
                                                        `${translateTopic(s)}, ` : `${translateTopic(s)}`) :"ALL"
                    }
                </div>
                <div className={isOpen ? "" : style.arrow}>
                    {isOpen ? "" : <img src={magnifyingGlassImage}/>}
                </div>
            </div>
            <div className={isOpen ? style.open : style.closed}>
                <hr/>
                <div className={style.options}>
                    {options.map((o, idx) => {
                        return (
                            <Checkbox
                            key={idx}
                            selected={localSelected.indexOf(o) != -1}
                            label={translateTopic(o)} 
                            setValue={(e) => selectOption(o)}
                            />
                        )
                    })}
                </div>
                <hr/>
                <div className={style.optionsContainer}>
                    <div className={style.clearContainer} onClick={clearSelect}>
                        <img src={cancelImage}/>
                        <p>Clear</p>
                    </div>
                    <div className={style.filterContainer} onClick={submitSelected}>
                        <p>Filter</p>
                        <img src={magnifyingGlassImage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Multiselect;