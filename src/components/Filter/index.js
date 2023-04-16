import Dropdown from "../Dropdown";
import Multiselect from "../Multiselect";

import style from "./filter.module.css";

const Filter = ({currBootcamp, allBootcamps, setCurrBootcamp, 
                currTopic, allTopics, setCurrTopic}) => {
    return (
        <div className={style.outerContainer}>
            <div className={style.innerContainer}>
                <div className={style.dropdown}>
                <Dropdown
                label="Bootcamp"
                selected={currBootcamp}
                options={allBootcamps}
                setValue={setCurrBootcamp}
                />
                </div>
                
                <div className={style.dropdown}>
                <Multiselect
                label="Topic(s)"
                selected={currTopic} 
                options={allTopics}
                setValue={setCurrTopic}
                />
                </div>
            </div>
        </div>
    )
}

export default Filter;