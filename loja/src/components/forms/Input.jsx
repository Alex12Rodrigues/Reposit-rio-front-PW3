import React from "react";
import styles from './Input.module.css'; 

function Input({ type, text, name, placeholder, value, onChange, error }) {
    return (
        <div className={styles.form_control}> 
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value} 
                onChange={onChange} 
                aria-label={text}
                className={error ? styles.error : ''} // Classe para erro, se necessário
            />
            {error && <span className={styles.error_message}>{error}</span>} {/* Mensagem de erro */}
        </div>
    );
}

export default Input;
