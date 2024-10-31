import React, { useState, useEffect } from "react";
import styles from "./DetailRoupa.module.css";
import Button from "../Button";
import defaultImage from "/logos.png";

const DetailRoupa = () => {
    const [roupa, setRoupa] = useState(null);

    useEffect(() => {
        const fetchRoupa = async () => {
            try {
                const response = await fetch("http://localhost:5000/pedidos/1");
                const data = await response.json();
                if (!data.errorStatus) {
                    setRoupa(data.data);
                } else {
                    console.error("Erro ao buscar dados:", data.mensageStatus);
                }
            } catch (err) {
                console.error("Erro na requisição:", err);
            }
        };

        fetchRoupa();
    }, []);

    const handleEdit = () => {
        console.log("Editar roupa:", roupa.cod_pedido);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/pedidos/${roupa.cod_pedido}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (!data.errorStatus) {
                console.log("Roupa excluída com sucesso:", roupa.cod_pedido);
            } else {
                console.error("Erro ao excluir roupa:", data.mensageStatus);
            }
        } catch (err) {
            console.error("Erro na requisição de exclusão:", err);
        }
    };

    return (
        <div className={styles.container}>
            {roupa ? (
                <>
                    <img src={roupa.imagem || defaultImage} alt="Detalhes da roupa" />
                    <h1>Marca : {roupa.nome_marca}</h1>
                    <h3>Modelo escolhido: {roupa.modelo_escolhido}</h3>
                    <p><strong>Descrição:</strong> {roupa.descricao_escrita}</p>
                    <p><strong>Cor:</strong> {roupa.cor_escolhida}</p>
                    <p><strong>Tamanho:</strong> {roupa.tamanho_escolhido}</p>
                    <p><strong>Código do Pedido:</strong> {roupa.cod_pedido}</p>
                    <div className={styles.buttonContainer}>
                        <Button label="Editar" onClick={handleEdit} />
                        <Button label="Excluir" onClick={handleDelete} />
                    </div>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default DetailRoupa;
