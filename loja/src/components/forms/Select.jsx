import React from "react";
import style from './Select.module.css';

const Select = ({ name, text, options, value, onChange }) => {
    return (
        <div className={style.select_container}>
            <label htmlFor={name}>{text}</label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
            >
                <option value="" disabled>Selecione uma opção</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Select;
