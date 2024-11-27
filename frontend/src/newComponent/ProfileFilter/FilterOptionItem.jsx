import React from 'react'
import { useState } from 'react'
import './style.css';

function FilterOptionItem({option}) {
    
    const [active, setActive] = useState(false);

  return (
    <div className='flex flex-col mx-2 '>
       <div className='hover:bg-filter' onClick={() => setActive((prev) => !prev)}><h3 className='text-left text-xl pl-4 py-2 rounded-2xl'>{option.label}</h3></div>
       <div className={`flex flex-col justify-start items-center overflow-hidden p-0 m-0 ${active ? 'activeHeight': 'inActiveHeight'}`}>
        {option.options.map((item) => {
            return (
               <div className='w-full hover:bg-screen'>
                
                <h5 className='w-full text-xl pl-4 py-2'>{item.label}</h5>
               </div>
            )
        })}
       </div>

    </div>
  )
}

export default FilterOptionItem