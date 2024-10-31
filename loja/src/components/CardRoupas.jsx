import React from "react";
import style from "./CardRoupas.module.css"; 
import Button from "./Button"; 

const RoupaCard = ({ cod_pedido, nome_marca, modelo_escolhido, descricao_escrita, cor_escolhida, tamanho_escolhido, imagem }) => {
    return (
        <div className={style.card}>
            <img src={imagem || "/logos.png"} alt={modelo_escolhido} className={style.imagem} />
            <div className={style.info}>
                <h2>{nome_marca}</h2>
                <h3><strong>Modelo:</strong> {modelo_escolhido}</h3>
                <p><strong>Descrição:</strong> {descricao_escrita}</p>
                <p><strong>Cor:</strong> {cor_escolhida}</p>
                <p><strong>Tamanho:</strong> {tamanho_escolhido}</p>
                <p><strong>Código do Pedido:</strong> {cod_pedido}</p>
                <Button label='Detalhes' router='/DetailRoupa/' cod_pedido={cod_pedido} />
            </div>
        </div>
    );
};

export default RoupaCard;
