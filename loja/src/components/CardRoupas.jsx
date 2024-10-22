import React from "react";
import style from "./CardRoupas.module.css"; 

const RoupaCard = ({ cod_pedido, nome_marca, modelo_escolhido, descricao_escrita, cor_escolhida, imagem }) => {
    return (
        <div className={style.card}>
            <img src={imagem || "https://via.placeholder.com/150"} alt={modelo_escolhido} className={style.imagem} />
            <div className={style.info}>
                <h2>{nome_marca}</h2>
                <h3> <strong>Modelo:</strong>{modelo_escolhido}</h3>
                <p><strong>Descrição:</strong> {descricao_escrita}</p>
                <p><strong>Cor:</strong> {cor_escolhida}</p> 
                <p><strong>Código do Pedido:</strong> {cod_pedido}</p>
            </div>
        </div>
    );
};

export default RoupaCard;
