import React from "react";
import { Link } from "react-router-dom";
import style from "./EmManutencao.module.css";

const EmManutencao = () => {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <img
                    src="/manutenção.jpg" 
                    alt="Página em manutenção"
                    className={style.image}
                />
                <h1 className={style.title}>Estamos em Manutenção</h1>
                <p className={style.message}>
                    Estamos ajustando os detalhes para oferecer uma experiência ainda melhor. Por favor, volte em breve!
                </p>
                <Link to="/" className={style.button}>
                    Voltar para Home
                </Link>
            </div>
        </div>
    );
};

export default EmManutencao;
