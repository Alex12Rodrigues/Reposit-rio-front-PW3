import styles from './Select.module.css'

function Select({type, text, name}){

    return(

        <div className={styles.form_control}>

        <label htmlFor={name}> {text}</label>
        <select name={name} id={name}>

            <option>Selecione um tamanho</option>
            <option>P</option>
            <option>M</option>
            <option>G</option>
            <option>GG</option>
            <option>Outro</option>

        </select>



        </div>
    )




}


export default Select





