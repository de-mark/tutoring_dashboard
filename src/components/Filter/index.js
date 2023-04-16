import {useState} from 'react';

import Dropdown from "../Dropdown";
import Multiselect from "../Multiselect";

import style from "./filter.module.css";

const Filter = ({currBootcamp, allBootcamps, setCurrBootcamp, 
                currTopic, allTopics, setCurrTopic}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return isOpen ? (
        <div className={style.outerContainer}>
            <div className={style.innerContainer}>
                <div style={{width: "30%"}}>
                <Dropdown
                label="Bootcamp"
                selected={currBootcamp}
                options={allBootcamps}
                setValue={setCurrBootcamp}
                />
                </div>
                
                <div style={{width: "30%"}}>
                <Multiselect
                label="Topic(s)"
                selected={currTopic} 
                options={allTopics}
                setValue={setCurrTopic}
                />
                </div>
            </div>
            <div className={style.bottomContainer}>
                <p className={style.pullUpArrow} onClick={toggle}>▲</p>
            </div>
        </div>
    ) : (
        <div className={style.outerContainer} onClick={toggle}>
            <p className={style.pullDownArrow}>▼</p>
        </div>
    )
}

export default Filter;