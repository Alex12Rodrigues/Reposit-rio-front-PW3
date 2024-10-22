import style from './Button.module.css'

const Button = ({label})=> {
    return(
        <div className= {style.button_Container}>
            <Button>{label}</Button>
        </div>
    )
}

export default Button;