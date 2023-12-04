
import React, { useState } from 'react'
import Dropdown from '../dropdown/Dropdown'
import style from "./FilterComponent.module.scss"

interface propsFilter {
 headingName : string
 data : Array<any>
 handleChangeFilter : CallableFunction
}

function FilterComponent(props : propsFilter) {
    // const [checkedvalue , setCheckedValue] = useState<string>()
    const handleCheckbox =(name :string , headingName ?:string) => {
        // name === checkedvalue ? setCheckedValue("") : setCheckedValue(name)
        props.handleChangeFilter(headingName , name) 
    }

  return (
    <div className={style.filterComponentWrapper}>
      <p className={style.headingFilter}>{props.headingName}:</p>
      <div className={style.container}>
             <Dropdown
              optionList={props?.data}
              setDataOutside={(value) => handleCheckbox(value, props.headingName)}
              showCross={true}
          />
      
       </div>
    </div>
  )
}

export default FilterComponent