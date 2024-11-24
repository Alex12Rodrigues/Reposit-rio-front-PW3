import React, { useState, useEffect } from "react";
import style from "./ListarRoupas.module.css"; 
import RoupaCard from "../CardRoupas"; 
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
                    },
                });
                const data = await response.json();

                if (!data.errorStatus) {
                    console.log("ROUPAS: ", data.data);
                    // Inverter a ordem dos dados para exibir os mais recentes primeiro
                    setRoupas(data.data.reverse());
                } else {
                    console.error("Erro ao listar roupas:", data.mensageStatus);
                }
            } catch (err) {
                console.error("Erro na requisição:", err);
            }
        };

        fetchRoupas();
    }, []);

    return (
        <Container>
            <section className={style.list_roupas_container}>
                <h1>Lista de Roupas</h1>

                <ContainerRoupas>
                    {roupas.map((roupa) => (
                        <RoupaCard
                            key={roupa.cod_pedido}
                            cod_pedido={roupa.cod_pedido}
                            nome_marca={roupa.nome_marca}
                            modelo_escolhido={roupa.modelo_escolhido}
                            descricao_escrita={roupa.descricao_escrita}
                            cor_escolhida={roupa.cor_escolhida} 
                            tamanho_escolhido={roupa.tamanho_escolhido} 
                            imagem={null} 
                        />
                    ))}
                </ContainerRoupas>
            </section>
        </Container>
    );
};

export default ListRoupas;
