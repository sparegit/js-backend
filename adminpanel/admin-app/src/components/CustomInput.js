import React from 'react'

const CustomInput = (props) => {
    const {type,lable,i_id,i_class,name,val,onCh,onBl}=props
  return (
    <div className='form-floating mb-3'>
        <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={lable}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onCh}
        />
        <lable htmlFor={lable}>{lable}</lable>
    </div>
  )
}

export default CustomInput