import React from "react";
import style from "./CardRoupas.module.css"; // Certifique-se de que o caminho do arquivo CSS esteja correto

const RoupaCard = ({ cod_pedido, nome_marca, modelo_escolhido, descricao_escrita, imagem }) => {
    return (
        <div className={style.card}>
            <img src={imagem || "https://via.placeholder.com/150"} alt={modelo_escolhido} className={style.imagem} />
            <div className={style.info}>
                <h2>{nome_marca}</h2>
                <h3>{modelo_escolhido}</h3>
                <p>{descricao_escrita}</p>
                <p><strong>Código do Pedido:</strong> {cod_pedido}</p>
            </div>
        </div>
    );
};

export default RoupaCard;
