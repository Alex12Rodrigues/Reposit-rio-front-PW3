import styles from '../forms/Select.module.css';

function Select({ text, name, options, value, onChange }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
            >
                <option value="">Selecione um tamanho</option>
                {
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}

export default Select;
