import React from "react";
import styles from './Select.module.css'; 

const Select = ({ name, text, options, value, onChange, error }) => {
    return (
        <div className={styles.select_container}>
            <label htmlFor={name}>{text}</label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                aria-label={text}
                className={error ? styles.error : ''} // Classe para erro, se necessário
            >
                <option value="">Selecione o tamanho</option>
                {
                    options && options.length > 0 ? (
                        options.map((option) => (
                            option.cod_tamanho ? (
                                <option key={option.cod_tamanho} value={option.tamanho_escolhido}>
                                    {option.tamanho_escolhido}
                                </option>
                            ) : null
                        ))
                    ) : (
                        <option value="" disabled>Nenhum tamanho disponível</option>
                    )
                }
            </select>
            {error && <span className={styles.error_message}>{error}</span>} {/* Mensagem de erro */}
        </div>
    );
};

export default Select;
