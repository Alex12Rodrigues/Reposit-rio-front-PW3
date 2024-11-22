import { Link } from 'react-router-dom';
import style from './Button.module.css';

const Button = ({ label, router, cod_pedido, onClick }) => {
    return (
        <div className={style.buttonContainer}>
            {router ? (
                <Link to={`${router}${cod_pedido}`}>
                    <button>{label}</button>
                </Link>
            ) : (
                <button onClick={onClick}>{label}</button>
            )}
        </div>
    );
};

export default Button;
