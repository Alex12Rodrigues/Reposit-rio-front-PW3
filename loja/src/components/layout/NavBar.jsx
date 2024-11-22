import { Link, Outlet } from 'react-router-dom'
import style from './NavBar.module.css'

const NavBar = () => {

    return (

        <>
            <nav className={style.navbar}>

                <ul className={style.list}>
                    <Link to='/'>
                        <li className={style.item}><img className={style.logo} src='./Logo Loja.jpeg'></img></li>
                    </Link>
                    <Link to='/'>
                        <li className={style.item}>HOME</li>
                    </Link>
                    <Link to='/CadastrarRoupas'>
                        <li className={style.item}>CADASTRAR PEDIDO</li>
                    </Link>
                    <Link to='/ListarRoupas'>
                        <li className={style.item}>LISTAR PEDIDO(S)</li>
                    </Link>
                </ul>

            </nav>

            <Outlet />

        </>
    )
}

export default NavBar