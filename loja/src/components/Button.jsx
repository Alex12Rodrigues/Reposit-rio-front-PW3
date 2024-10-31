import { Link } from 'react-router-dom';
import style from './Button.module.css';

const Button = ({ label, router, cod_pedido }) => {
    return (
        <div className={style.buttonContainer}>
            <Link to={`${router}${cod_pedido}`}>
                <button>{label}</button>
            </Link>
        </div>
    );
};

export default Button;
