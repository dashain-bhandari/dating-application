import React from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import classNames from 'classnames';
import './style.css';

function FilterSelect(props) {

  const animatedComponents = makeAnimated();

  return (
    
    <div className={`my-1 ${props.classes2 && props.classes2}`}>
        {props.label && (<label className={`text-md lg:text-xl xl:text-2xl ${props.classes1 && props.classes1}`} htmlFor="">{props.label && props.label}</label>)}
        <CreatableSelect
        placeholder={props.placeholder && props.placeholder}
        closeMenuOnSelect={true}
        components={animatedComponents}
        defaultValue={[props.default && props.default]}
        isMulti={props.isMulti ? true : false }
        options={props.options && props.options}
        onChange={props.onChange && props.onChange}
        value={props.value && props.name && props.value[props.name]}
        name={props.name && props.name}
        isDisabled={props.isDisabled && props.isDisabled}
        classNamePrefix={classNames({ 'react-select': true })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            // border: 'none',
            // backgroundColor: '#f0efef',
            
            backgroundColor: props.isDisabled && 'transparent',
            // border: props.isDisabled && 'none',
            boxShadow: 'none',
            padding: '2px 5px',
            borderRadius: '20px',
            backgroundColor: 'var(--screen)',
            border: state.isFocused ? '1px solid var(--secondary)' : 'none',
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

export default FilterSelect;