import React, { useState, useEffect } from "react";
import style from "./ListarRoupas.module.css"; // Certifique-se de que o nome do arquivo CSS esteja correto
import RoupaCard from "../CardRoupas"; // Altere o componente de acordo com seu projeto
import Container from "../layout/Container";
import ContainerRoupas from "../layout/ContainerRoupas";

const ListRoupas = () => {
    const [roupas, setRoupas] = useState([]);

    useEffect(() => {
        const fetchRoupas = async () => {
            try {
                const response = await fetch("http://localhost:5000/pedidos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                    },
                });
                const data = await response.json();

                if (!data.errorStatus) {
                    console.log("ROUPAS: ", data.data);
                    setRoupas(data.data);
                } else {
                    console.error("Erro ao listar roupas:", data.mensageStatus);
                }
            } catch (err) {
                console.error("Erro na requisição:", err);
            }
        };

        fetchRoupas();
    }, []); // Executa apenas uma vez ao montar o componente

    return (
        <Container>
            <section className={style.list_roupas_container}>
                <h1>Lista de Roupas</h1>

                <ContainerRoupas>
                    {roupas.map((roupa) => (
                        <RoupaCard
                            key={roupa.cod_pedido} // Usando cod_pedido como chave
                            cod_pedido={roupa.cod_pedido}
                            nome_marca={roupa.nome_marca}
                            modelo_escolhido={roupa.modelo_escolhido}
                            descricao_escrita={roupa.descricao_escrita}
                            imagem={null} // Imagem pode ser definida conforme sua lógica, por enquanto coloquei null
                        />
                    ))}
                </ContainerRoupas>
            </section>
        </Container>
    );
};

export default ListRoupas;
