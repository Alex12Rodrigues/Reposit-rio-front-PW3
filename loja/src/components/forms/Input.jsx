import React from "react";
import style from './Input.module.css';

const Input = ({ type, name, text, placeholder, value, onChange }) => {
    return (
        <div className={style.input_container}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;
