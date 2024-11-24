import React, { useState, useEffect } from "react";
import styles from './CadastroRoupas.module.css';
import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../forms/Button";

const BASE_URL = 'http://localhost:5000';

const CadastroRoupas = () => {
    const [tamanhos, setTamanhos] = useState([]);
    const [roupa, setRoupa] = useState({
        nome_marca: '',
        modelo_escolhido: '',
        descricao_escrita: '',
        cor_escolhida: '',
        tamanho_escolhido: '',
        custom_tamanho: ''
    });

    const handlerChangeRoupa = (event) => {
        const { name, value } = event.target;
        const limits = {
            nome_marca: 30,
            modelo_escolhido: 30,
            descricao_escrita: 55,
            cor_escolhida: 30,
            custom_tamanho: 6
        };
        setRoupa(prevState => ({
            ...prevState,
            [name]: value.slice(0, limits[name] || value.length),
            ...(name === "tamanho_escolhido" && value !== "Outro" ? { custom_tamanho: "" } : {})
        }));
    };

    useEffect(() => {
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
                }
            })
            .catch(error => console.error("Erro ao buscar tamanhos:", error));
    }, []);

    const createRoupa = () => {
        const finalRoupa = {
            ...roupa,
            tamanho_escolhido: roupa.tamanho_escolhido === "Outro" ? roupa.custom_tamanho : roupa.tamanho_escolhido
        };

        if (!finalRoupa.tamanho_escolhido) {
            alert("Por favor, selecione um tamanho.");
            return;
        }

        fetch(`${BASE_URL}/pedidos`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(finalRoupa)
        })
            .then(response => response.json())
            .then(data => {
                if (!data.errorStatus) {
                    alert("Roupa cadastrada com sucesso!");
                    setRoupa({
                        nome_marca: '',
                        modelo_escolhido: '',
                        descricao_escrita: '',
                        cor_escolhida: '',
                        tamanho_escolhido: '',
                        custom_tamanho: ''
                    });
                } else {
                    alert(data.mensageStatus);
                }
            })
            .catch(error => console.error("Erro ao enviar dados:", error));
    };

    const submit = (e) => {
        e.preventDefault();
        createRoupa();
    };

    return (
        <section className={styles.create_roupas_container}>
            <h1>Cadastro de Roupas Desejadas</h1>
            <form onSubmit={submit}>
                <Input
                    type="text"
                    name="nome_marca"
                    text="Marca"
                    placeholder="Digite a marca da roupa"
                    value={roupa.nome_marca}
                    onChange={handlerChangeRoupa}
                    maxLength={15}
                />
                <Input
                    type="text"
                    name="modelo_escolhido"
                    text="Modelo"
                    placeholder="Digite o modelo da roupa"
                    value={roupa.modelo_escolhido}
                    onChange={handlerChangeRoupa}
                    maxLength={30}
                />
                <Input
                    type="text"
                    name="descricao_escrita"
                    text="Descrição"
                    placeholder="Descreva a roupa desejada"
                    value={roupa.descricao_escrita}
                    onChange={handlerChangeRoupa}
                    maxLength={50}
                />
                <Input
                    type="text"
                    name="cor_escolhida"
                    text="Cor"
                    placeholder="Escolha a cor"
                    value={roupa.cor_escolhida}
                    onChange={handlerChangeRoupa}
                    maxLength={15}
                />
                <Select
                    name="tamanho_escolhido"
                    text="Escolha o tamanho"
                    options={tamanhos}
                    value={roupa.tamanho_escolhido}
                    onChange={handlerChangeRoupa}
                />
                {roupa.tamanho_escolhido === "Outro" && (
                    <Input
                        type="text"
                        name="custom_tamanho"
                        text="Informe o tamanho desejado"
                        placeholder="Digite o tamanho desejado"
                        value={roupa.custom_tamanho}
                        onChange={handlerChangeRoupa}
                        maxLength={6}
                    />
                )}
                <Button rotulo="Cadastrar Pedido" />
            </form>
        </section>
    );
};

export default CadastroRoupas;
