import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetailRoupa.module.css";
import Button from "../Button";
import defaultImage from "/logos.png";

const DetailRoupa = () => {
    const { cod_pedido } = useParams(); // Obtém o cod_pedido da URL
    const [roupa, setRoupa] = useState(null);

    useEffect(() => {
        const fetchRoupa = async () => {
            try {
                const response = await fetch(`http://localhost:5000/pedidos/${cod_pedido}`);
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
    }, [cod_pedido]);


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
                        <Button label="Editar" router="/AtualizarPedido/" cod_pedido={cod_pedido} />
                        <Button label="Excluir" router="/DeletePedido/" cod_pedido={cod_pedido}/>
                    </div>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default DetailRoupa;
