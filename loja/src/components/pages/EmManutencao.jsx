import React from "react";
import { Link } from "react-router-dom";
import style from "./EmManutencao.module.css";

const EmManutencao = () => {
    return (
        <div className={style.container}>
            <h1>Em Manutenção</h1>
            <p>Estamos trabalhando para melhorar a sua experiência.</p>
            <Link to="/" className={style.button}>
                Voltar para Home
            </Link>
        </div>
    );
};

export default EmManutencao;
