import React from "react";

import style from './Home.module.css'

const Home = () => {

    return(

        <section className={style.home_container}>
            <h1> Bem vindo a <span>Nice Lingerie</span></h1>
            <p> Sua loja de roupas!</p>
            <img src="./Decoracao-de-loja.png"></img>

        </section>

    )
}

export default Home



