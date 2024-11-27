import React, { useState } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import './style.css';

function InputSelect(props) {

  const animatedComponents = makeAnimated();
  const isTablet = useMediaQuery({ query: '(max-width: 992px)'})
   const [focused, setFocused] = useState(false)
  return (
    
    <div className={`relative my-1 ${props.classes2 && props.classes2}`}>
       {console.log(props.placeholder)}
        {props.label && (<label className={`text-md lg:text-xl xl:text-2xl ${props.classes1 && props.classes1}`} htmlFor="">{props.label && props.label}</label>)}
        <CreatableSelect
        placeholder={props.placeholder}
        closeMenuOnSelect={true}
        components={animatedComponents}
        defaultValue={[props.default && props.default]}
        isMulti={props.isMulti ? true : false }
        options={props.options && props.options}
        onChange={props.onChange && props.onChange}
        value={props.value && {value: props.value, label: props.value}}
        isDisabled={props.isDisabled && props.isDisabled}
        classNamePrefix={classNames({ 'react-select': true })}
        styles={{
          menuItemSelected: (provided, state) => ({
             ...provided,
             backgroundColor: 'var(--secondary)',
        }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            // border: 'none',
            // backgroundColor: '#f0efef', 
            backgroundColor: props.isDisabled ? 'white' : 'white',
            borderRadius: '20px',
            // border: props.isDisabled && 'none',
            // boxShadow: '0 0 0 1px var(--primary)',
            padding: !props.isDisabled && '2px 5px',
            fontSize: isTablet ? '19px' : '20px',
            textTransform: 'capitalize',
            color: 'rgba(0,0,0,0.8)',
            // border: state.isFocused ? 'none' : 'none !important',
            // outline: state.isFocused ? 'none !important' : 'none',
            // borderBottom: '4px solid red',
              '& .react-select__indicator': {
                  display: props.isDisabled && 'none',
               },
               '& .react-select__indicator-separator': {
                 display: props.isDisabled && 'none',
               },
          }),
        }}
          />
    </div>
  )
}

export default InputSelect;