import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import './style.css';

function SearchSelect(props) {

  const animatedComponents = makeAnimated();

  return (
    
    <div className={`my-1 ${props.classes2 && props.classes2}`}>
        {props.label && (<label className={`text-2xl ${props.classes1 && props.classes1}`} htmlFor="">{props.label && props.label}</label>)}
        <CreatableSelect
        placeholder={props.placeholder && props.placeholder}
        closeMenuOnSelect={true}
        id={props.id && props.id}
        name={props.name && props.name}
        defaultValue={[props.default && props.default]}
        isMulti={props.isMulti ? true : false }
        options={props.options && props.options}
        onChange={props.onChange && props.onChange}
        loadOptions={props.loadOptions && props.loadOptions}
         value={props.value && props.value}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            // border: 'none',
            backgroundColor: 'var(--screen)',
            padding: '2px 5px',
            borderRadius: '20px',
            // border: state.isFocused ? 'none' : 'none !important',
            // outline: state.isFocused ? 'none !important' : 'none',
            // borderBottom: '4px solid red',
          }),
        }}
          />
    </div>
  )
}

export default SearchSelect;