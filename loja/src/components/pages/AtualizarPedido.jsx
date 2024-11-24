import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './AtualizarPedido.module.css';
import Input from '../forms/Input';
import Select from '../forms/Select';
import Button from '../forms/Button';

const BASE_URL = 'http://localhost:5000';

const AtualizarPedido = () => {
        const { cod_pedido } = useParams();
        const navigate = useNavigate();

        const [pedido, setPedido] = useState({
                nome_marca: '',
                modelo_escolhido: '',
                descricao_escrita: '',
                cor_escolhida: '',
                tamanho_escolhido: '',
                custom_tamanho: '',
        });

        const [cores, setCores] = useState([]);
        const [tamanhos, setTamanhos] = useState([]);

        const handlerChangePedido = (event) => {
                const { name, value } = event.target;
                const limits = {
                        nome_marca: 30,
                        modelo_escolhido: 30,
                        descricao_escrita: 55,
                        cor_escolhida: 30,
                        custom_tamanho: 6
                };

                setPedido(prevState => ({
                        ...prevState,
                        [name]: value.slice(0, limits[name] || value.length), // Limite de caracteres
                        ...(name === "tamanho_escolhido" && value !== "Outro" ? { custom_tamanho: "" } : {}),
                }));
        };

        useEffect(() => {
                fetch(`${BASE_URL}/cores`, {
                        method: "GET",
                        mode: "cors",
                        headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Headers": "*"
                        }
                })
                        .then(response => response.json())
                        .then(data => {
                                if (data.data) {
                                        setCores(data.data);
                                } else {
                                        console.error("Erro ao carregar cores", data);
                                }
                        })
                        .catch(error => console.error("Erro ao buscar cores:", error));

                fetch(`${BASE_URL}/tamanhos`, {
                        method: "GET",
                        mode: "cors",
                        headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Headers": "*"
                        }
                })
                        .then(response => response.json())
                        .then(data => {
                                if (data.data) {
                                        setTamanhos(data.data.map(t => ({ value: t.cod_tamanho, label: t.tamanho_escolhido })));
                                } else {
                                        console.error("Erro ao carregar tamanhos", data);
                                }
                        })
                        .catch(error => console.error("Erro ao buscar tamanhos:", error));

                // Fetch do pedido para edição
                fetch(`${BASE_URL}/pedidos/${cod_pedido}`)
                        .then(response => response.json())
                        .then(data => {
                                if (data.data) {
                                        setPedido(data.data);
                                } else {
                                        console.error("Erro ao carregar dados do pedido", data);
                                }
                        })
                        .catch(error => console.error("Erro ao carregar o pedido:", error));
        }, [cod_pedido]);

        const updatePedido = () => {
                const finalPedido = {
                        ...pedido,
                        tamanho_escolhido: pedido.tamanho_escolhido === "Outro" ? pedido.custom_tamanho : pedido.tamanho_escolhido
                };

                if (!finalPedido.tamanho_escolhido) {
                        alert("Por favor, selecione um tamanho.");
                        return;
                }

                fetch(`${BASE_URL}/pedidos`, {
                        method: 'PUT',
                        mode: 'cors',
                        headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Headers': '*'
                        },
                        body: JSON.stringify(finalPedido)
                })
                        .then(response => response.json())
                        .then(data => {
                                if (!data.errorStatus) {
                                        alert("Pedido atualizado com sucesso!");
                                        navigate('/ListarRoupas');
                                } else {
                                        alert(data.mensageStatus);
                                }
                        })
                        .catch(error => console.error("Erro ao atualizar pedido:", error));
        };

        const submit = (e) => {
                e.preventDefault();
                updatePedido();
        };

        return (
                <section className={styles.atualizar_pedido_container}>
                        <h1>Alteração de Pedido</h1>
                        <form onSubmit={submit}>
                                <Input
                                        type="text"
                                        name="nome_marca"
                                        text="Marca"
                                        placeholder="Digite a marca da roupa"
                                        value={pedido.nome_marca}
                                        onChange={handlerChangePedido}
                                />
                                <Input
                                        type="text"
                                        name="modelo_escolhido"
                                        text="Modelo"
                                        placeholder="Digite o modelo da roupa"
                                        value={pedido.modelo_escolhido}
                                        onChange={handlerChangePedido}
                                />
                                <Input
                                        type="text"
                                        name="descricao_escrita"
                                        text="Descrição"
                                        placeholder="Descreva o pedido"
                                        value={pedido.descricao_escrita}
                                        onChange={handlerChangePedido}
                                />
                                <Input
                                        type="text"
                                        name="cor_escolhida"
                                        text="Cor"
                                        placeholder="Escolha a cor"
                                        value={pedido.cor_escolhida}
                                        onChange={handlerChangePedido}
                                />
                                <Select
                                        name="tamanho_escolhido"
                                        text="Escolha o tamanho"
                                        options={tamanhos}
                                        value={pedido.tamanho_escolhido}
                                        onChange={handlerChangePedido}
                                />
                                {pedido.tamanho_escolhido === "Outro" && (
                                        <Input
                                                type="text"
                                                name="custom_tamanho"
                                                text="Informe o tamanho desejado"
                                                placeholder="Digite o tamanho desejado"
                                                value={pedido.custom_tamanho}
                                                onChange={handlerChangePedido}
                                        />
                                )}
                                <Button rotulo="Atualizar Pedido" />
                        </form>
                </section>
        );
};

export default AtualizarPedido;
